import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, mkdtempSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {runInNewContext} from 'node:vm';
import {lessons, validateLessons, projectFiles, writeProject, tagFor} from './course-project.mjs';
import {readDraft, writeDraft, draftKey, previousDraft} from '../src/components/LessonExercise/drafts.ts';
import {lessonFile, snippetSelection} from '../src/lib/lessonCode.ts';
import {testProject, supportsTestEmbed} from '../src/lib/testProject.ts';
import {reportCounts, resultsPage} from '../src/lib/testRunner.mjs';
const lesson = () => structuredClone(lessons[0]);
const storage = () => {const map = new Map(); return {getItem: k => map.get(k) ?? null, setItem: (k,v) => map.set(k,v)};};

test('each step has its own exercise page, and exports complete runnable projects', () => {
  validateLessons();
  for (const l of lessons) {
    const doc = readFileSync(new URL(`../docs/${l.doc}.mdx`, import.meta.url), 'utf8');
    assert.ok(doc.includes(`<LessonExercise id="${l.id}" />`));
    for (const variant of ['start', 'solution']) {
      const files = projectFiles(l, variant);
      assert.ok(files['src/App.tsx']);
      assert.ok(files['README.md'].includes(tagFor(l.id, variant)));
      assert.ok(files['import-draft.mjs']);
      const pkg = JSON.parse(files['package.json']);
      assert.equal(pkg.scripts.build, 'tsc --noEmit && vite build');
      assert.ok(pkg.dependencies.react);
      const stackblitz = JSON.parse(files['.stackblitzrc']);
      assert.equal(stackblitz.installDependencies, false, 'do not auto-install with StackBlitz pnpm 8');
      assert.equal(stackblitz.startCommand, 'npm install && npm run dev', 'install before starting Vite');
      assert.match(files['pnpm-workspace.yaml'], /packages:\n\s+- ['"]?\.['"]?\n/, 'standalone workspace includes its root');
    }
  }
});
test('drafts survive reload and remain isolated by lesson', () => {
  const s = storage(); const l = lesson();
  const files = {...l.files, '/App.tsx': 'student work'};
  assert.equal(writeDraft(s, l, files), true);
  assert.deepEqual(readDraft(s, l), files);
  assert.equal(readDraft(s, lessons[1]), null);
  assert.notEqual(l.solution['/App.tsx'], 'student work');
});
test('checkpoint packaging updates preserve existing v3 student drafts', () => {
  const s = storage(); const l = lesson();
  const files = {...l.files, '/App.tsx': 'saved before checkpoint packaging update'};
  s.setItem(`frontend-tutorial:v3:${l.id}`, JSON.stringify({baseline: JSON.stringify(l.files), files}));
  assert.deepEqual(readDraft(s, l), files);
});
test('a revised lesson keeps incompatible old drafts available without importing them', () => {
  const s = storage(); const l = lesson();
  const old = JSON.stringify({baseline: 'old starter', files: {'/App.tsx': 'old work'}});
  s.setItem(`frontend-tutorial:v3:${l.id}`, old);
  assert.equal(readDraft(s, l), null);
  assert.equal(JSON.parse(previousDraft(s, l)).files['/App.tsx'], 'old work');
  writeDraft(s, l, l.files);
  assert.equal(s.getItem(`frontend-tutorial:v3:${l.id}`), old);
  assert.deepEqual(readDraft(s, l), l.files);
});
test('renumbering a Fetch lesson preserves the old draft identifier for recovery', () => {
  const s = storage(); const l = lessons.find(item => item.id === '07-04-abort-cleanup');
  s.setItem('frontend-tutorial:v3:07-03-abort-cleanup', JSON.stringify({baseline: JSON.stringify(l.files), files: l.files}));
  assert.deepEqual(readDraft(s, l), l.files);
  s.setItem('frontend-tutorial:v3:07-03-abort-cleanup', JSON.stringify({baseline: 'old', files: {'/api.ts': 'saved work'}}));
  assert.equal(JSON.parse(previousDraft(s, l)).lesson, '07-03-abort-cleanup');
});

test('code labels resolve only real lesson files and locate context without editing code', () => {
  const files = ['/App.tsx', '/Store.ts'];
  assert.equal(lessonFile('src/Store.ts — add members', files), '/Store.ts');
  assert.equal(lessonFile('/App.tsx', files), '/App.tsx');
  assert.equal(lessonFile('pnpm install', files), undefined);
  const code = 'function Counter() {\n  return counter.value;\n}';
  const selection = snippetSelection(code, 'const Counter = observer(function Counter() {');
  assert.equal(code.slice(selection.anchor, selection.head), 'Counter');
  assert.equal(snippetSelection(code, 'totally unrelated example'), undefined);
});

test('Vitest receives the current files and a run signal, not the reference solution', () => {
  const l = lessons.find(item => item.chapter === '06');
  const files = {...l.files, '/Store.test.ts': 'expect(1).toBe(2);', '/outside': 'ignore me'};
  const project = testProject(l, files, 1);
  const pkg = JSON.parse(project.files['package.json']);
  assert.equal(project.template, 'node');
  assert.equal(project.files['src/Store.test.ts'], 'expect(1).toBe(2);');
  assert.equal(project.files['src/outside'], undefined);
  assert.equal(pkg.dependencies.vitest, l.dependencies.vitest);
  assert.equal(pkg.scripts.start, 'node test-server.mjs');
  assert.match(project.files['test-server.mjs'], /vitest\/vitest\.mjs/);
  assert.notEqual(project.files['.test-request'], testProject(l, files, 2).files['.test-request']);
  assert.equal(supportsTestEmbed('Mozilla/5.0 Chrome/130.0.0.0 Safari/537.36'), true);
  assert.equal(supportsTestEmbed('Mozilla/5.0 (iPhone) CriOS/130.0 Mobile Safari/604.1'), false);
  assert.equal(supportsTestEmbed('Mozilla/5.0 Firefox/132.0'), false);
});
test('the test report includes Vitest todo cases in pending counts', () => {
  assert.deepEqual(reportCounts({numPassedTests: 2, numFailedTests: 0, numPendingTests: 0, numTodoTests: 3}),
    [['passed', 2, 'passed'], ['failed', 0, 'failed'], ['pending', 3, 'pending']]);
});
test('a successful poll restores connection status even if the report is unchanged', async () => {
  const elements = new Map();
  const element = () => ({textContent: '', replaceChildren() {}, append() {}});
  let nextPoll;
  let disconnected = false;
  const document = {
    getElementById(id) {if (!elements.has(id)) elements.set(id, element()); return elements.get(id);},
    createElement: element,
    createTextNode: text => ({textContent: text}),
  };
  const script = resultsPage.match(/<script>([\s\S]*?)<\/script>/)[1];
  const context = {
    document,
    fetch: async () => {
      if (disconnected) throw Error('offline');
      return {ok: true, text: async () => JSON.stringify({status: 'complete', report: null, output: ''})};
    },
    setTimeout: callback => {nextPoll = callback;},
  };
  await runInNewContext(script, context);
  assert.equal(elements.get('status').textContent, 'Run finished.');
  disconnected = true;
  await nextPoll();
  assert.match(elements.get('status').textContent, /reconnect/);
  disconnected = false;
  await nextPoll();
  assert.equal(elements.get('status').textContent, 'Run finished.');
});
test('corrupt, incomplete, stale, or inaccessible storage falls back safely', () => {
  const s = storage(); const l = lesson();
  s.setItem(draftKey(l), '{'); assert.equal(readDraft(s,l), null);
  s.setItem(draftKey(l), JSON.stringify({baseline:JSON.stringify(l.files), files:{}})); assert.equal(readDraft(s,l), null);
  writeDraft(s,l,l.files); l.files['/App.tsx'] += '\n// new release'; assert.equal(readDraft(s,l), null);
  const broken = {getItem() {throw Error('blocked');},setItem() {throw Error('full');}};
  assert.equal(readDraft(broken,l), null); assert.equal(writeDraft(broken,l,l.files), false);
});
test('download imports only the current lesson files; rejects wrong lessons without writes', () => {
  const l = lesson(); const directory = mkdtempSync(path.join(tmpdir(), 'course-import-test-'));
  try {
    writeProject(directory, projectFiles(l,'start'));
    const imported = {...l.files, '/App.tsx': 'my edited app', '/../outside': 'ignored'};
    const download = path.join(directory,'download.json');
    writeFileSync(download, JSON.stringify({lesson:l.id, files:imported}));
    execFileSync(process.execPath, ['import-draft.mjs', download], {cwd:directory});
    assert.equal(readFileSync(path.join(directory,'src/App.tsx'),'utf8'), 'my edited app');
    writeFileSync(download, JSON.stringify({lesson:'another',files: l.files}));
    assert.throws(() => execFileSync(process.execPath, ['import-draft.mjs',download], {cwd:directory,stdio:'pipe'}));
    assert.equal(readFileSync(path.join(directory,'src/App.tsx'),'utf8'), 'my edited app');
  } finally {rmSync(directory,{recursive:true,force:true});}
});
test('export rejects unsafe file names', () => {
  const items = structuredClone(lessons);
  items[0].files['/../escape.ts'] = 'bad';
  assert.throws(() => validateLessons(items), /Unsafe file/);
});

test('every step has focused editable files and a unique URL', () => {
  const docs = new Set();
  for (const l of lessons) {
    assert.ok(!docs.has(l.doc)); docs.add(l.doc);
    assert.ok(l.focusFiles.includes(l.activeFile));
    for (const [file, code] of Object.entries(l.solution)) {
      if (code !== l.files[file]) assert.ok(l.focusFiles.includes(file), `${l.id}: ${file} should be editable`);
    }
  }
  assert.ok(lessons.filter(l => l.chapter === '04').length >= 8, 'MobX should progress through individual concepts');
});

test('every exercise follows a visible worked example and has a result check', () => {
  for (const l of lessons) {
    const doc = readFileSync(new URL(`../docs/${l.doc}.mdx`, import.meta.url), 'utf8');
    const marker = `<LessonExercise id="${l.id}" />`;
    const [before, after] = doc.split(marker);
    assert.ok(after, `${l.id}: missing workspace`);
    // A lesson hidden in a closed details element recreated the assignment-only
    // experience. Optional hints may still be collapsed; the teaching may not.
    const visible = before.replace(/<details\b(?![^>]*\bopen\b)[^>]*>[\s\S]*?<\/details>/g, '');
    assert.match(visible, /^\s*```(?:tsx?|jsx?|json|sh|bash)\b/m,
      `${l.id}: show a worked code example before the exercise`);
    assert.match(after, /^## (?:Check|Verify|Observe|Expected|Before|What)/m,
      `${l.id}: add visible result checks after the exercise`);
  }
});

test('the original ShippingBoard and Fetch projects retain their worked steps and result checks', () => {
  const pages = JSON.parse(readFileSync(new URL('../course/navigation.json', import.meta.url), 'utf8'));
  for (const [chapter, first, last] of [['05', 5, 15], ['07', 6, 11]]) {
    for (let step = first; step <= last; step++) {
      const page = pages.find(item => item.chapter === chapter && item.step === step);
      assert.ok(page && !page.exerciseId, `Missing original-project lesson ${chapter}.${step}`);
      const source = readFileSync(new URL(`../docs/${page.id}.mdx`, import.meta.url), 'utf8');
      const body = source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
      const check = /^## (?:Check|Verify|Observe)\b[^\n]*$/m.exec(body);
      assert.ok(check, `${page.id}: missing result check`);
      assert.match(body.slice(0, check.index), /^```(?:tsx?|sh|shell)\b/m, `${page.id}: missing worked example`);
      assert.ok(body.slice(check.index + check[0].length).trim(), `${page.id}: empty result check`);
    }
  }
});
