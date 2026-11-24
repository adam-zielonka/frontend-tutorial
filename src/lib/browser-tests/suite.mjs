import {transform} from 'sucrase';
import * as mobx from 'mobx';

// Executed inside a fresh worker for every run. The downloaded test file
// keeps its ordinary Vitest imports so the same source runs locally.
export async function runSuite(files) {
  const cases = [];
  const groups = [];
  function describe(name, body) {
    groups.push(name);
    try { body(); } finally { groups.pop(); }
  }
  function register(name, body, pending) {
    if (!pending && typeof body !== 'function') throw Error('A test needs a callback or it.todo().');
    cases.push({name: [...groups, name].join(' › '), body, pending});
  }
  const it = (name, body) => register(name, body, false);
  it.todo = name => register(name, undefined, true);
  const expect = actual => ({
    toBe(expected) {
      if (!Object.is(actual, expected)) throw Error(`Expected ${String(expected)}, received ${String(actual)}.`);
    },
    toHaveLength(expected) {
      if (actual?.length !== expected) throw Error(`Expected length ${expected}, received ${actual?.length}.`);
    },
  });
  const modules = new Map([['vitest', {describe, it, expect}], ['mobx', mobx]]);
  function load(name) {
    if (modules.has(name)) return modules.get(name);
    const file = name === './Store' || name === './Store.ts' ? '/Store.ts' : name;
    if (!['/Store.ts', '/Store.test.ts'].includes(file)) throw Error(`Unsupported lesson import: ${name}`);
    if (modules.has(file)) return modules.get(file);
    const exports = {};
    modules.set(file, exports);
    try {
      const {code} = transform(files[file], {transforms: ['typescript', 'imports'], filePath: file});
      new Function('exports', 'require', code)(exports, load);
    } catch (error) {
      throw Error(`${file}: ${error?.message ?? error}`);
    }
    return exports;
  }
  load('/Store.test.ts');
  if (!cases.length) throw Error('No tests found. Add an it() or it.todo() case.');
  const results = [];
  for (const {name, body, pending} of cases) {
    if (pending) {
      results.push({name, status: 'pending'});
      continue;
    }
    try {
      await body();
      results.push({name, status: 'passed'});
    } catch (error) {
      results.push({name, status: 'failed', message: String(error?.message ?? error)});
    }
  }
  return results;
}
