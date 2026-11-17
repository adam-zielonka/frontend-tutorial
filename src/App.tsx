import { project } from './project';
import './styles.css';

export default function App() {
  const checks = [
    { label: 'Format on save', ready: project.formatOnSave },
    { label: 'Strict types', ready: project.strict },
    { label: 'Network preview', ready: project.scripts.dev === 'vite --host 0.0.0.0' },
    { label: 'Typecheck command', ready: project.scripts.typecheck === 'tsc --noEmit' },
  ];
  return <main>
    <h1>Development workspace checklist</h1>
    <p>Edit the typed configuration in /project.ts and watch the checklist update.</p>
    <section><h2>{project.editor} + {project.versionControl}</h2>
      <p>{checks.filter(check => check.ready).length} / {checks.length} settings ready</p>
      <ul>{checks.map(check => <li key={check.label}>{check.ready ? 'Ready' : 'To configure'}: {check.label}</li>)}</ul>
      <p>Dev command: <code>{project.scripts.dev}</code></p>
      <p>Typecheck: <code>{project.scripts.typecheck || '(not configured)'}</code></p>
    </section>
    <h2>Practice on your own computer</h2>
    <p>This page does not execute terminal commands or change VS Code, Git, or TypeScript settings.</p>
    <ol>
      <li>Export the project, open it in VS Code, and enable editor.formatOnSave in your editor settings.</li>
      <li>Open a real terminal: run <code>git init</code> and then <code>git status</code>.</li>
      <li>Inspect the exported tsconfig.json and its strict setting, then run <code>pnpm install</code> and <code>pnpm exec tsc --noEmit</code>.</li>
      <li>Run <code>pnpm exec vite --host 0.0.0.0</code> to start the real development server.</li>
    </ol>
  </main>;
}
