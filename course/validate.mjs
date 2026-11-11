#!/usr/bin/env node
/** No root dependencies needed. --build installs tools only in an OS temp directory. */
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, mkdir, rm, symlink, access } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const repo = fileURLToPath(new URL('../', import.meta.url));
const lessons = JSON.parse(await readFile(new URL('./lessons.json', import.meta.url), 'utf8'));
const ids = ['01-tool-set', '02-development-tools', '03-react-basics', '04-mobx', '05-shippingboard', '06-tests', '07-fetch', '08-ui5'];
const fields = ['id', 'title', 'doc', 'objective', 'tasks', 'hints', 'activeFile', 'files', 'solution', 'dependencies'].sort();
const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value);
assert.ok(Array.isArray(lessons));
assert.deepEqual(lessons.map(lesson => lesson.id), ids);
for (const lesson of lessons) {
  assert.deepEqual(Object.keys(lesson).sort(), fields, `${lesson.id}: exact schema`);
  for (const field of ['id', 'title', 'doc', 'objective', 'activeFile']) {
    assert.equal(typeof lesson[field], 'string');
    assert.ok(lesson[field].trim(), `${lesson.id}: ${field} must not be empty`);
  }
  assert.match(lesson.doc, new RegExp(`^ch-${lesson.id.slice(0, 2)}-[a-z0-9-]+$`));
  await access(path.join(repo, 'docs', `${lesson.doc}.md`));
  for (const field of ['tasks', 'hints']) {
    assert.ok(Array.isArray(lesson[field]) && lesson[field].length > 0);
    assert.ok(lesson[field].every(item => typeof item === 'string' && item.trim()));
  }
  assert.ok(isRecord(lesson.dependencies));
  for (const [name, version] of Object.entries(lesson.dependencies)) {
    assert.ok(!['react', 'react-dom'].includes(name), 'React is supplied centrally');
    assert.match(version, /^\d+\.\d+\.\d+$/, `${name}: use exact stable versions`);
  }
  assert.deepEqual(Object.keys(lesson.files).sort(), Object.keys(lesson.solution).sort(), 'Full solution file map required');
  assert.notDeepEqual(lesson.files, lesson.solution, `${lesson.id}: solution must change the starter`);
  for (const field of ['files', 'solution']) {
    assert.ok(isRecord(lesson[field]));
    const files = lesson[field];
    assert.ok(lesson.activeFile in files, `${lesson.id}: active file exists`);
    assert.ok('/App.tsx' in files && '/styles.css' in files);
    assert.match(files['/App.tsx'], /import ['"]\.\/styles\.css['"]/);
    assert.doesNotMatch(files['/App.tsx'], /from ['"]vitest['"]/);
    for (const [file, content] of Object.entries(files)) {
      assert.match(file, /^\/[\w./-]+$/);
      assert.equal(path.posix.normalize(file), file);
      assert.ok(!file.includes('..') && !file.slice(1).split('/').includes('node_modules'));
      assert.ok(!/^\/(index|main)\.[jt]sx?$/.test(file), 'Entrypoint is supplied centrally');
      assert.ok(!['/package.json', '/index.html', '/tsconfig.json', '/vite.config.ts'].includes(file), 'Host owns export configuration');
      assert.equal(typeof content, 'string');
      assert.ok(content.trim());
      if (file.endsWith('.json')) JSON.parse(content);
      if (field === 'solution') assert.doesNotMatch(content, /\bTODO\b|\bit\.todo\(/, `${lesson.id}: unfinished solution`);
    }
  }
}
assert.ok('/Store.test.ts' in lessons[5].files && '/Store.test.ts' in lessons[5].solution);
assert.equal(JSON.parse(lessons[6].files['/public/ramps.json']).length, 3);
console.log('Schema, chapter links, exact dependencies, and full file maps: 8 lessons passed.');

if (!process.argv.includes('--build')) process.exit(0);

const temp = await mkdtemp(path.join(tmpdir(), 'frontend-course-'));
const keep = process.argv.includes('--keep');
console.log(`Isolated validation directory: ${temp}`);
const tools = {
  react: '18.3.1', 'react-dom': '18.3.1',
  '@types/react': '18.3.18', '@types/react-dom': '18.3.5', '@types/node': '22.10.2',
  typescript: '5.6.3', vite: '6.4.1',
  ...Object.assign({}, ...lessons.map(lesson => lesson.dependencies)),
};
function run(command, args, cwd) {
  const result = spawnSync(command, args, { cwd, encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} ${args.join(' ')} failed in ${cwd}\n${result.stdout}\n${result.stderr}`);
  return result.stdout;
}
const bin = name => path.join(temp, 'node_modules', '.bin', name);
async function save(directory, file, content) {
  const target = path.join(directory, file.replace(/^\//, ''));
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, content);
}
try {
  await save(temp, 'package.json', JSON.stringify({ private: true, type: 'module', dependencies: tools }, null, 2));
  // pnpm 10+ requires explicit permission for esbuild's install script in this disposable project.
  await save(temp, 'pnpm-workspace.yaml', 'onlyBuiltDependencies:\n  - esbuild\n');
  const manager = process.env.COURSE_PACKAGE_MANAGER || 'pnpm';
  run(manager, ['install', '--ignore-scripts'], temp);
  for (const lesson of lessons) {
    for (const variant of ['files', 'solution']) {
      const directory = path.join(temp, lesson.id, variant);
      await mkdir(directory, { recursive: true });
      await symlink(path.join(temp, 'node_modules'), path.join(directory, 'node_modules'), 'dir');
      await save(directory, 'package.json', JSON.stringify({
        private: true, type: 'module',
        dependencies: { react: tools.react, 'react-dom': tools['react-dom'], ...lesson.dependencies },
        devDependencies: { vite: tools.vite, typescript: tools.typescript },
      }));
      for (const [file, content] of Object.entries(lesson[variant])) await save(directory, file, content);
      await save(directory, 'index.html', '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Course validation</title></head><body><div id="root"></div><script type="module" src="/main.tsx"></script></body></html>');
      // React import covers the classic JSX transform used by Sandpack as well as Vite's transform.
      await save(directory, 'main.tsx', "import React from 'react';\nimport { createRoot } from 'react-dom/client';\nimport App from './App';\ncreateRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);\n");
      await save(directory, 'vite.config.ts', "import { defineConfig } from 'vite';\nexport default defineConfig({ esbuild: { jsx: 'automatic' } });\n");
      await save(directory, 'tsconfig.json', JSON.stringify({
        compilerOptions: {
          target: 'ES2022', lib: ['ES2022', 'DOM', 'DOM.Iterable'], module: 'ESNext',
          moduleResolution: 'Bundler', jsx: 'react-jsx', strict: true,
          skipLibCheck: true, noEmit: true, esModuleInterop: true, types: ['vite/client', 'node'],
        }, include: ['./**/*.ts', './**/*.tsx'], exclude: ['node_modules', 'dist'],
      }));
      run(bin('tsc'), ['--project', directory], directory);
      run(bin('vite'), ['build'], directory);
      console.log(`${lesson.id} ${variant}: strict TypeScript + Vite build passed`);
      if (lesson.id === '06-tests') {
        const output = run(bin('vitest'), ['run', '--maxWorkers=1', '--no-file-parallelism'], directory);
        assert.match(output, variant === 'files' ? /2 passed.*3 todo/ : /5 passed/);
        console.log(`${lesson.id} ${variant}: ${variant === 'files' ? '2 passing + 3 pending' : '5 passing'} Vitest tests`);
      }
    }
  }
  // Additional contract tests exercise the completed store and fetch helper without a browser.
  const checks = path.join(temp, 'checks');
  await mkdir(checks);
  await save(checks, 'contracts.test.ts', `
import { afterEach, describe, expect, it, vi } from 'vitest';
import { autorun } from 'mobx';
import { CounterStore } from '../04-mobx/solution/Store';
import { loadRamps, loadLocalRamps } from '../07-fetch/solution/api';

afterEach(() => vi.unstubAllGlobals());
describe('MobX collection', () => {
  it('clamps each counter, enforces capacity, updates the observed sum, and reuses capacity', () => {
    const store = new CounterStore();
    const totals: number[] = [];
    const dispose = autorun(() => totals.push(store.total));
    try {
      store.change(1, 100);
      expect(store.counters[0].value).toBe(10);
      store.change(1, -100);
      expect(store.counters[0].value).toBe(-10);
      store.addCounter(); store.addCounter(); store.addCounter();
      expect(store.counters).toHaveLength(3);
      store.change(2, 7);
      expect(store.total).toBe(-3);
      store.removeCounter(1);
      expect(store.total).toBe(7);
      store.addCounter();
      expect(store.counters).toHaveLength(3);
      expect(new Set(store.counters.map(item => item.id)).size).toBe(3);
      expect(totals).toEqual([0, 10, -10, -3, 7]);
    } finally { dispose(); }
  });
});
describe('local fetch helper', () => {
  it('forwards the signal and parses the local fixture', async () => {
    const data = [{ id: 'R1', name: 'North ramp' }];
    const fetcher = vi.fn().mockResolvedValue({ ok: true, json: async () => data });
    vi.stubGlobal('fetch', fetcher);
    const controller = new AbortController();
    await expect(loadRamps('/ramps.json', controller.signal)).resolves.toEqual(data);
    expect(fetcher).toHaveBeenCalledWith('/ramps.json', { signal: controller.signal });
  });
  it('rejects an HTTP error before attempting to parse JSON', async () => {
    const json = vi.fn();
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 503, json }));
    await expect(loadRamps('/ramps.json')).rejects.toThrow('HTTP 503');
    expect(json).not.toHaveBeenCalled();
  });
  it('rejects malformed data and accepts an empty list', async () => {
    const fetcher = vi.fn().mockResolvedValueOnce({ ok: true, json: async () => [{ id: 1 }] })
      .mockResolvedValueOnce({ ok: true, json: async () => [] });
    vi.stubGlobal('fetch', fetcher);
    await expect(loadRamps('/ramps.json')).rejects.toThrow('Invalid ramp data');
    await expect(loadRamps('/ramps.json')).resolves.toEqual([]);
  });
  it('falls back to the Sandpack public URL when the Vite URL is unavailable', async () => {
    const data = [{ id: 'R2', name: 'South ramp' }];
    const fetcher = vi.fn().mockResolvedValueOnce({ ok: false, status: 404 })
      .mockResolvedValueOnce({ ok: true, json: async () => data });
    vi.stubGlobal('fetch', fetcher);
    await expect(loadLocalRamps('/ramps.json')).resolves.toEqual(data);
    expect(fetcher.mock.calls.map(call => call[0])).toEqual(['/ramps.json', '/public/ramps.json']);
  });
  it('does not fall back for a missing-fixture exercise or intentional abort', async () => {
    const controller = new AbortController();
    const fetcher = vi.fn().mockResolvedValueOnce({ ok: false, status: 404 })
      .mockImplementationOnce(async () => {
        controller.abort();
        throw new DOMException('Cancelled', 'AbortError');
      });
    vi.stubGlobal('fetch', fetcher);
    await expect(loadLocalRamps('/missing-ramps.json')).rejects.toThrow('HTTP 404');
    expect(fetcher).toHaveBeenCalledTimes(1);
    await expect(loadLocalRamps('/ramps.json', controller.signal)).rejects.toMatchObject({ name: 'AbortError' });
    expect(fetcher).toHaveBeenCalledTimes(2);
  });
  it('propagates network, invalid JSON, and abort errors to the effect', async () => {
    const aborted = new DOMException('Cancelled', 'AbortError');
    vi.stubGlobal('fetch', vi.fn()
      .mockRejectedValueOnce(new Error('Offline'))
      .mockResolvedValueOnce({ ok: true, json: async () => { throw new SyntaxError('Invalid JSON'); } })
      .mockRejectedValueOnce(aborted));
    await expect(loadRamps('/ramps.json')).rejects.toThrow('Offline');
    await expect(loadRamps('/ramps.json')).rejects.toThrow('Invalid JSON');
    await expect(loadRamps('/ramps.json')).rejects.toBe(aborted);
  });
});
`);
  const output = run(bin('vitest'), ['run', '--root', checks, '--maxWorkers=1', '--no-file-parallelism'], temp);
  assert.match(output, /7 passed/);
  console.log('MobX reactivity/bounds/capacity and fetch success/HTTP/schema/network/abort contracts: 7 tests passed.');
  console.log('All 16 starter/solution TypeScript checks and production builds passed.');
} finally {
  if (keep) console.log(`Kept temporary projects at ${temp}`);
  else await rm(temp, { recursive: true, force: true });
}
