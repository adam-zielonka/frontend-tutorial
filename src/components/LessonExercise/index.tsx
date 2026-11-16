import React, {lazy, Suspense, useState} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import CodeBlock from '@theme/CodeBlock';
import {course, lessonTag, repository, type Lesson} from '../../lib/course';
import {useLessonStudio} from '../LessonStudio/context';
import styles from './styles.module.css';

const Playground = lazy(() => import('./Playground'));
class EditorBoundary extends React.Component<{children: React.ReactNode}, {failed: boolean}> {
  state = {failed: false};
  static getDerivedStateFromError() {return {failed: true};}
  render() {
    if (this.state.failed) return <p className={styles.error} role="alert">The editor could not load. Reload this page, or use the StackBlitz and local project links in the lesson.</p>;
    return this.props.children;
  }
}
function LoadingWorkspace() {
  return <div className={styles.loading} role="status"><div>Loading this step’s code…</div><div>Starting the live preview…</div></div>;
}

export function CodeWorkspace({lesson, solution, onSolutionChange, view = 'split', viewControls}: {
  lesson: Lesson;
  solution: boolean;
  onSolutionChange: (value: boolean) => void;
  view?: 'split' | 'code' | 'preview';
  viewControls?: React.ReactNode;
}) {
  return <section className={styles.workspace} data-lesson-workspace aria-label={`${lesson.title}: workspace`}>
    <div className={styles.toolbar}>
      <div className={styles.modeSwitch}>
        <button type="button" aria-pressed={!solution} onClick={() => onSolutionChange(false)}>Your code</button>
        <button type="button" aria-pressed={solution} onClick={() => onSolutionChange(true)}>Solution</button>
      </div>
      {viewControls}
      {solution && <span className={styles.modeNote}>Read-only · your work is kept</span>}
    </div>
    <div className={styles.playground}>
      <BrowserOnly fallback={<LoadingWorkspace/>}>{() => <EditorBoundary key={lesson.id}><Suspense fallback={<LoadingWorkspace/>}>
        <Playground key={lesson.id} lesson={lesson} solution={solution} view={view} />
      </Suspense></EditorBoundary>}</BrowserOnly>
    </div>
  </section>;
}

function LocalProject({lesson, solution}: {lesson: Lesson; solution: boolean}) {
  const base = useBaseUrl('/');
  const tag = lessonTag(lesson.id, solution);
  const command = `git clone --branch ${tag} --depth 1 ${repository}.git ${lesson.id}\ncd ${lesson.id}\npnpm install --frozen-lockfile\npnpm dev`;
  return <details className={styles.local}>
    <summary>Run this step locally or in an online editor</summary>
    <p>Use Node.js 24, pnpm 12.14 and Git; <Link to={`${base}ch-01-00-explain-the-tool-set#a-first-local-installation-check`}>chapter 1 explains their installation</Link>.
      This is the {solution ? 'solution' : 'starter'} checkpoint for this step:</p>
    <CodeBlock language="bash">{command}</CodeBlock>
    <p>To save your own commits: <code>git switch -c my-work</code>.
      {lesson.chapter === '06' && <> Run <code>pnpm exec vitest run</code> in another terminal for Vitest.</>}</p>
    <div className={styles.links}>
      <a target="_blank" rel="noopener noreferrer"
        href={`https://stackblitz.com/github/adam-zielonka/frontend-tutorial/tree/${tag}?file=src/${lesson.activeFile.slice(1)}`}>
        Open {solution ? 'solution' : 'starter'} in StackBlitz ↗
      </a>
      <a target="_blank" rel="noopener noreferrer" href={`${repository}/tree/${tag}`}>Browse tagged source ↗</a>
    </div>
    <p>To continue your browser edits locally, choose <strong>Download {solution ? 'solution' : 'my files'}</strong> in the workspace.
      This downloads a JSON file, not a standalone project. Stop the local server with Ctrl+C, copy the download into the cloned folder, and run:</p>
    <CodeBlock language="bash">{`node import-draft.mjs ./${lesson.id}-${solution ? 'solution' : 'my-files'}.json\npnpm dev`}</CodeBlock>
    <p className={styles.note}>The import replaces this project's exercise files. Back up any local edits first.
      StackBlitz and source links open the checkpoint; they do not transfer browser edits.</p>
  </details>;
}

export default function LessonExercise({id}: {id: string}) {
  const lesson = course.find(item => item.id === id);
  const studio = useLessonStudio();
  const [standaloneSolution, setStandaloneSolution] = useState(false);
  if (!lesson) throw new Error(`Unknown lesson: ${id}`);
  const solution = studio?.solution ?? standaloneSolution;

  return <section className={styles.exercise} data-lesson-exercise aria-label="Practice instructions">
    <h2 id="practice">Now try it yourself</h2>
    <p>{lesson.objective}</p>
    <p className={styles.focus}>Edit {lesson.focusFiles.map((file, index) => <React.Fragment key={file}>
      {index > 0 && ', '}<code>{file.slice(1)}</code>
    </React.Fragment>)}. Make one change at a time and check the preview.</p>
    <ol>{lesson.tasks.map(task => <li key={task}>{task}</li>)}</ol>
    <details className={styles.hints}>
      <summary>Need a hint?</summary>
      <ul>{lesson.hints.map(hint => <li key={hint}>{hint}</li>)}</ul>
    </details>
    {studio && <button type="button" className={styles.openCode} onClick={studio.openCode}>Try it in the code editor →</button>}
    {!studio && <div className={styles.standalone}><CodeWorkspace lesson={lesson} solution={solution} onSolutionChange={setStandaloneSolution} /></div>}
    <p className={styles.note}>Use <strong>Solution</strong> to compare a read-only example; return to <strong>Your code</strong> to continue.
      Each step starts from a prepared checkpoint and keeps its own browser draft. The preview needs internet access; do not enter private data.</p>
    <LocalProject lesson={lesson} solution={solution} />
  </section>;
}
