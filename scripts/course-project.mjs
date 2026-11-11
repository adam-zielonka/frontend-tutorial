import {readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';

export const release = 'v2';
export const branch = 'course-examples-v2';
export const repo = 'https://github.com/adam-zielonka/frontend-tutorial';
export const lessons = JSON.parse(readFileSync(new URL('../course/lessons.json', import.meta.url), 'utf8'));
export const tagFor = (id, variant) => `lesson-${id}-${variant}-${release}`;
export function validateLessons(items = lessons) {
  const ids = new Set();
  for (const lesson of items) {
    if (!/^0[1-8]-[0-9]{2}-[a-z0-9-]+$/.test(lesson.id) || ids.has(lesson.id)) throw Error(`Invalid/duplicate id: ${lesson.id}`);
    ids.add(lesson.id);
    if (!Array.isArray(lesson.focusFiles) || !lesson.focusFiles.includes(lesson.activeFile)) throw Error(`${lesson.id}: active file must be a focus file`);
    for (const file of lesson.focusFiles) if (!(file in lesson.files)) throw Error(`${lesson.id}: unknown focus file ${file}`);
    for (const file of Object.keys(lesson.solution)) {
      if (lesson.solution[file] !== lesson.files[file] && !lesson.focusFiles.includes(file)) throw Error(`${lesson.id}: changed supporting file ${file} must be editable`);
    }
    for (const key of ['title', 'objective', 'doc', 'activeFile']) if (typeof lesson[key] !== 'string' || !lesson[key]) throw Error(`${lesson.id}: missing ${key}`);
    for (const key of ['tasks', 'hints']) if (!Array.isArray(lesson[key]) || !lesson[key].length) throw Error(`${lesson.id}: missing ${key}`);
    for (const files of [lesson.files, lesson.solution]) {
      if (!files['/App.tsx'] || !files[lesson.activeFile]) throw Error(`${lesson.id}: missing app/active file`);
      for (const [file, code] of Object.entries(files)) {
        if (!/^\/[a-zA-Z0-9_.\-/]+$/.test(file) || file.includes('..') || file.includes('//') || typeof code !== 'string') throw Error(`Unsafe file ${file}`);
      }
    }
    if (JSON.stringify(Object.keys(lesson.files).sort()) !== JSON.stringify(Object.keys(lesson.solution).sort())) throw Error(`${lesson.id}: file sets differ`);
    if (JSON.stringify(lesson.files) === JSON.stringify(lesson.solution)) throw Error(`${lesson.id}: solution identical to starter`);
  }
  for (let chapter = 1; chapter <= 8; chapter++) {
    const steps = items.filter(item => item.chapter === String(chapter).padStart(2, '0'));
    if (steps.length < 2) throw Error(`Chapter ${chapter} must contain separate steps`);
    steps.forEach((step, i) => {
      if (!step.id.startsWith(`${step.chapter}-${String(i + 1).padStart(2, '0')}-`)) throw Error(`Invalid step order ${step.id}`);
    });
  }
}
export function projectFiles(lesson, variant) {
  const source = variant === 'start' ? lesson.files : lesson.solution;
  const files = Object.fromEntries(Object.entries(source).map(([name, content]) => [name.startsWith('/public/') ? name.slice(1) : `src${name}`, content]));
  const dependencies = {react: '18.3.1', 'react-dom': '18.3.1', ...lesson.dependencies};
  const devDependencies = {vite: '8.3.7', '@vitejs/plugin-react': '6.3.0', typescript: '5.6.3', '@types/react': '18.3.31', '@types/react-dom': '18.3.7', vitest: '5.1.0'};
  // Some exercises use a pinned test runner; keep one version in the project.
  if (dependencies.vitest) {devDependencies.vitest = dependencies.vitest; delete dependencies.vitest;}
  files['package.json'] = JSON.stringify({name: `frontend-${lesson.id}`, version: '1.0.0', private: true, type: 'module', engines: {node: '>=24'}, packageManager: 'pnpm@12.14.0', scripts: {dev: 'vite --host 0.0.0.0', build: 'tsc --noEmit && vite build', preview: 'vite preview', test: 'vitest', 'test:run': 'vitest run', 'import-draft': 'node import-draft.mjs'}, dependencies, devDependencies}, null, 2) + '\n';
  files['index.html'] = '<!doctype html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>Frontend practice</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>\n';
  files['src/main.tsx'] = "import React from 'react';\nimport {createRoot} from 'react-dom/client';\nimport App from './App';\ncreateRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);\n";
  files['vite.config.ts'] = "import {defineConfig} from 'vite';\nimport react from '@vitejs/plugin-react';\nexport default defineConfig({plugins: [react()]});\n";
  files['tsconfig.json'] = JSON.stringify({compilerOptions: {target: 'ES2022', lib: ['ES2022', 'DOM', 'DOM.Iterable'], module: 'ESNext', moduleResolution: 'Bundler', jsx: 'react-jsx', strict: true, skipLibCheck: true, esModuleInterop: true, resolveJsonModule: true, noEmit: true}, include: ['src']}, null, 2);
  files['.gitignore'] = 'node_modules/\ndist/\ncoverage/\n*.local\n';
  files['.node-version'] = '24\n';
  files['pnpm-workspace.yaml'] = 'allowBuilds:\n  esbuild: true\n';
  files['.stackblitzrc'] = JSON.stringify({startCommand: 'npm run dev'}, null, 2);
  files['lesson.json'] = JSON.stringify({id: lesson.id, variant, release, tasks: lesson.tasks}, null, 2);
  files['import-draft.mjs'] = `import {readFileSync,writeFileSync} from 'node:fs';\nconst draft = JSON.parse(readFileSync(process.argv[2], 'utf8'));\nif (draft.lesson !== ${JSON.stringify(lesson.id)}) throw Error('This download belongs to another lesson');\nconst allowed = ${JSON.stringify(Object.keys(source))};\nfor (const name of allowed) {\n  if (typeof draft.files?.[name] !== 'string') throw Error('Missing file: ' + name);\n}\nfor (const name of allowed) writeFileSync(name.startsWith('/public/') ? name.slice(1) : 'src' + name, draft.files[name]);\nconsole.log('Imported exercise files. Run npm run dev.');\n`;
  files['README.md'] = `# ${lesson.title} — ${variant}\n\n${lesson.objective}\n\n## Run\n\nUse Node.js 24.\n\n\`\`\`sh\nnpm install\nnpm run dev\n\`\`\`\n\nOr use the pinned pnpm version and lockfile: \`pnpm install --frozen-lockfile\`, then \`pnpm dev\`. Run \`npm run build\` to type-check and bundle. Lesson 6 also uses \`npm test\` (watch mode) or \`npm run test:run\`. Its starter tests are deliberately incomplete; finish the pending cases and assertions.\n\n## Tasks\n\n${lesson.tasks.map(t => '- ' + t).join('\n')}\n\n## Continue your work\n\nA tag checkout is detached: run \`git switch -c my-work\` before making your own commits. To import a JSON download from the lesson editor, copy it here and run \`npm run import-draft -- ./download.json\` (this replaces your exercise files).\n\n[Read the lesson](https://adam-zielonka.github.io/frontend-tutorial/${lesson.doc}) · [Starter](${repo}/tree/${tagFor(lesson.id, 'start')}) · [Solution](${repo}/tree/${tagFor(lesson.id, 'solution')})\n\n## All checkpoints\n\n${lessons.map(l => `- ${l.title}: [start](${repo}/tree/${tagFor(l.id, 'start')}) · [solution](${repo}/tree/${tagFor(l.id, 'solution')})`).join('\n')}\n\nThese are self-contained teaching projects. The documentation website has its own dependency versions.\n`;
  return files;
}
// Identical dependency sets share one lockfile even when the lesson name differs.
export function lockfileFor(lesson) {
  const pkg = JSON.parse(projectFiles(lesson, 'start')['package.json']);
  const sorted = object => Object.fromEntries(Object.entries(object).sort(([a], [b]) => a.localeCompare(b)));
  const key = createHash('sha256').update(JSON.stringify([sorted(pkg.dependencies), sorted(pkg.devDependencies)])).digest('hex').slice(0, 16);
  return new URL(`../course/locks/${release}/${key}.yaml`, import.meta.url);
}
export function writeProject(directory, files) {
  for (const [name, content] of Object.entries(files)) {
    const file = path.join(directory, name);
    mkdirSync(path.dirname(file), {recursive: true});
    writeFileSync(file, content);
  }
}
