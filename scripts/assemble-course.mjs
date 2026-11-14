import {readdirSync, readFileSync, writeFileSync} from 'node:fs';
const directory = new URL('../course/chapters/', import.meta.url);
const chapters = readdirSync(directory).filter(file => file.endsWith('.json')).sort();
if (chapters.length !== 8) throw Error('Expected all eight chapter files before assembling');
const lessons = chapters.flatMap(file => JSON.parse(readFileSync(new URL(file, directory), 'utf8')));
const serialized = JSON.stringify(lessons, null, 2) + '\n';
const output = new URL('../course/lessons.json', import.meta.url);
if (process.argv.includes('--check')) {
  if (readFileSync(output, 'utf8') !== serialized) throw Error('Run pnpm course:assemble to update the generated lesson manifest');
} else {
  writeFileSync(output, serialized);
  console.log(`Assembled ${lessons.length} step lessons in ${chapters.length} chapters`);
}
