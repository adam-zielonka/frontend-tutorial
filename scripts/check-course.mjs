import {mkdtempSync, readFileSync, writeFileSync, mkdirSync, rmSync, existsSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {lessons, validateLessons, projectFiles, writeProject} from './course-project.mjs';
validateLessons();
const update = process.argv.includes('--update-locks');
const root = new URL('../course/locks/', import.meta.url);
mkdirSync(root, {recursive: true});
for (const lesson of lessons) {
  const directory = mkdtempSync(path.join(tmpdir(), `training-${lesson.id}-`));
  const run = args => execFileSync('pnpm', args, {cwd: directory, stdio: 'inherit'});
  try {
    writeProject(directory, projectFiles(lesson, 'start'));
    const lock = new URL(`${lesson.id}.yaml`, root);
    if (!update && existsSync(lock)) writeFileSync(path.join(directory, 'pnpm-lock.yaml'), readFileSync(lock));
    run(['install', ...(update ? [] : ['--frozen-lockfile'])]);
    if (update) writeFileSync(lock, readFileSync(path.join(directory, 'pnpm-lock.yaml')));
    console.log(`Checking ${lesson.id} START`);
    run(['build']);
    writeProject(directory, projectFiles(lesson, 'solution'));
    console.log(`Checking ${lesson.id} SOLUTION`);
    run(['build']);
    if (Object.keys(lesson.solution).some(name => /\.test\.tsx?$/.test(name))) run(['test:run']);
  } finally {rmSync(directory, {recursive: true, force: true});}
}
console.log('All 16 lesson projects type-check and build; solution tests pass.');
