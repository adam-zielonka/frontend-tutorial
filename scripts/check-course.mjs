import {mkdtempSync, readFileSync, writeFileSync, mkdirSync, rmSync, existsSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {lessons, validateLessons, projectFiles, writeProject, lockfileFor} from './course-project.mjs';
validateLessons();
const update = process.argv.includes('--update-locks');
const npm = process.argv.includes('--npm');
const chapter = process.argv.find(arg => arg.startsWith('--chapter='))?.split('=')[1];
if (chapter && !/^0[1-8]$/.test(chapter)) throw Error('Use --chapter=01 through --chapter=08');
if (npm && update) throw Error('Update pnpm lockfiles using the default pnpm check');
const updatedLocks = new Set();
const checkedProfiles = new Set();
let checked = 0;
for (const lesson of lessons) {
  if (chapter && lesson.chapter !== chapter) continue;
  const lock = lockfileFor(lesson);
  // The pnpm check covers every source variant; npm checks each installer profile.
  if (npm && checkedProfiles.has(lock.href)) continue;
  const directory = mkdtempSync(path.join(tmpdir(), `training-${lesson.id}-`));
  const run = args => execFileSync(npm ? 'npm' : 'pnpm', args, {cwd: directory, stdio: 'inherit'});
  try {
    writeProject(directory, projectFiles(lesson, 'start'));
    mkdirSync(new URL(".", lock), {recursive: true});
    if ((!update || updatedLocks.has(lock.href)) && existsSync(lock)) writeFileSync(path.join(directory, 'pnpm-lock.yaml'), readFileSync(lock));
    run(['install', ...(npm || update ? [] : ['--frozen-lockfile'])]);
    if (update) {writeFileSync(lock, readFileSync(path.join(directory, 'pnpm-lock.yaml'))); updatedLocks.add(lock.href);}
    console.log(`Checking ${lesson.id} START`);
    run(['run', 'build']);
    writeProject(directory, projectFiles(lesson, 'solution'));
    console.log(`Checking ${lesson.id} SOLUTION`);
    run(['run', 'build']);
    if (Object.keys(lesson.solution).some(name => /\.test\.tsx?$/.test(name))) run(['run', 'test:run']);
    checked += 2;
    checkedProfiles.add(lock.href);
  } finally {rmSync(directory, {recursive: true, force: true});}
}
console.log(`${checked} lesson projects across ${checkedProfiles.size} dependency profiles type-check and build with ${npm ? 'npm' : 'pnpm'}; solution tests pass.`);
