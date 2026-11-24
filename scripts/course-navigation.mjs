import {readdirSync, readFileSync} from 'node:fs';
import path from 'node:path';

// Reading/project continuations belong in the same ordered navigation as editors.
export function buildNavigation(lessons, directory) {
  const pages = [];
  for (const folder of readdirSync(directory, {withFileTypes: true})) {
    if (!folder.isDirectory() || !/^0[1-8]-/.test(folder.name)) continue;
    const chapter = folder.name.slice(0, 2);
    for (const name of readdirSync(path.join(directory, folder.name))) {
      if (!/\.mdx?$/.test(name)) continue;
      const id = `${folder.name}/${name.replace(/\.mdx?$/, '')}`;
      const source = readFileSync(path.join(directory, folder.name, name), 'utf8');
      const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(source)?.[1] ?? '';
      const unquote = value => value.trim().replace(/^(["'])(.*)\1$/, '$2');
      const title = unquote(/^title:\s*(.+)$/m.exec(frontmatter)?.[1] ?? '');
      const number = /^(\d+)\.(\d+)\.\s*/.exec(title);
      if (!number || Number(number[1]) !== Number(chapter)) throw Error(`Missing chapter/step number in ${id} title`);
      const slug = unquote(/^slug:\s*(.+)$/m.exec(frontmatter)?.[1] ?? id).replace(/^\//, '');
      const lesson = lessons.find(item => item.doc === id);
      pages.push({id, path: slug, title: title.slice(number[0].length), chapter,
        step: Number(number[2]), ...(lesson ? {exerciseId: lesson.id} : {})});
    }
  }
  pages.sort((a, b) => a.chapter.localeCompare(b.chapter) || a.step - b.step);
  const numbers = new Set();
  for (const page of pages) {
    const key = `${page.chapter}.${page.step}`;
    if (numbers.has(key)) throw Error(`Duplicate lesson number ${key}`);
    numbers.add(key);
  }
  return pages;
}
