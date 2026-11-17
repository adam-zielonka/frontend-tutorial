import type {Lesson} from './course';
import {testServer, resultsPage} from './testRunner.mjs';

// StackBlitz currently supports embedded WebContainers only in Chromium.
// Safari/Firefox can use the same generated project in a separate tab.
export function supportsTestEmbed(userAgent: string): boolean {
  return /(?:Chrome|Chromium|Edg|OPR)\//.test(userAgent) && !/iPhone|iPad|iPod/.test(userAgent);
}

/** A real Node/Vitest project, built from the student's current Sandpack files. */
export function testProject(lesson: Lesson, files: Record<string, string>, run = 0) {
  const version = lesson.dependencies.vitest;
  if (!version) throw new Error('This lesson does not define a Vitest version.');
  const source = Object.fromEntries(Object.keys(lesson.files).map(path => [
    path.startsWith('/public/') ? path.slice(1) : `src${path}`, files[path] ?? lesson.files[path],
  ]));
  return {
    title: `${lesson.title} — Vitest`,
    description: 'Run the files from your frontend tutorial editor with Vitest.',
    template: 'node' as const,
    files: {
      ...source,
      'package.json': JSON.stringify({
        name: `tests-${lesson.id}`, private: true, type: 'module',
        scripts: {start: 'node test-server.mjs', test: 'vitest run'},
        dependencies: {react: '18.3.1', 'react-dom': '18.3.1', ...lesson.dependencies},
        stackblitz: {installDependencies: true, startCommand: 'npm start'},
      }, null, 2),
      'vitest.config.ts': `import {defineConfig} from 'vitest/config';\nexport default defineConfig({test: {include: ['src/**/*.test.ts'], pool: 'forks', maxWorkers: 1, fileParallelism: false}});\n`,
      'test-server.mjs': testServer,
      'results.html': resultsPage,
      '.test-request': String(run),
    },
  };
}
