import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, mkdtempSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {lessons, validateLessons, projectFiles, writeProject, tagFor} from './course-project.mjs';
import {readDraft, writeDraft, draftKey} from '../src/components/LessonExercise/drafts.ts';
const lesson = () => structuredClone(lessons[0]);
const storage = () => {const map = new Map(); return {getItem: k => map.get(k) ?? null, setItem: (k,v) => map.set(k,v)};};

test('each chapter has exactly its exercise, and exports complete runnable projects', () => {
  validateLessons();
  for (const l of lessons) {
    const doc = readFileSync(new URL(`../docs/${l.doc}.md`, import.meta.url), 'utf8');
    assert.ok(doc.includes(`<LessonExercise id="${l.id}" />`));
    for (const variant of ['start', 'solution']) {
      const files = projectFiles(l, variant);
      assert.ok(files['src/App.tsx']);
      assert.ok(files['README.md'].includes(tagFor(l.id, variant)));
      assert.ok(files['import-draft.mjs']);
      const pkg = JSON.parse(files['package.json']);
      assert.equal(pkg.scripts.build, 'tsc --noEmit && vite build');
      assert.ok(pkg.dependencies.react);
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
