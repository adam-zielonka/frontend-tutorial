import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, mkdtempSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {lessons, validateLessons, projectFiles, writeProject, tagFor} from './course-project.mjs';
import {readDraft, writeDraft, draftKey, previousDraft} from '../src/components/LessonExercise/drafts.ts';
import {lessonFile, snippetSelection} from '../src/lib/lessonCode.ts';
import {testProject, supportsTestEmbed} from '../src/lib/testProject.ts';
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

test('Vitest receives the current files and matching UI version, not the reference solution', () => {
  const l = lessons.find(item => item.chapter === '06');
  const files = {...l.files, '/Store.test.ts': 'expect(1).toBe(2);', '/outside': 'ignore me'};
  const project = testProject(l, files, 1);
  const pkg = JSON.parse(project.files['package.json']);
  assert.equal(project.template, 'node');
  assert.equal(project.files['src/Store.test.ts'], 'expect(1).toBe(2);');
  assert.equal(project.files['src/outside'], undefined);
  assert.equal(pkg.dependencies.vitest, l.dependencies.vitest);
  assert.equal(pkg.dependencies['@vitest/ui'], l.dependencies.vitest);
  assert.match(pkg.scripts.start, /^vitest --ui/);
  assert.notEqual(project.files['vitest.config.ts'], testProject(l, files, 2).files['vitest.config.ts']);
  assert.equal(supportsTestEmbed('Mozilla/5.0 Chrome/130.0.0.0 Safari/537.36'), true);
  assert.equal(supportsTestEmbed('Mozilla/5.0 (iPhone) CriOS/130.0 Mobile Safari/604.1'), false);
  assert.equal(supportsTestEmbed('Mozilla/5.0 Firefox/132.0'), false);
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
