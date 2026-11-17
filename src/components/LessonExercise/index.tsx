import React, {lazy, Suspense, useId, useRef, useState} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import {course, type Lesson} from '../../lib/course';
import {useLessonStudio} from '../LessonStudio/context';
import styles from './styles.module.css';
import RunActions from './RunActions';

const Playground = lazy(() => import('./Playground'));
class EditorBoundary extends React.Component<{children: React.ReactNode}, {failed: boolean}> {
  state = {failed: false};
  static getDerivedStateFromError() {return {failed: true};}
  render() {
    if (this.state.failed) return <p className={styles.error} role="alert">The editor could not load. Reload this page, or use Work locally or Online editor below.</p>;
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
  const id = useId();
  const [consoleOpen, setConsoleOpen] = useState(false);
  const consoleToggle = useRef<HTMLButtonElement>(null);
  const closeConsole = () => {
    setConsoleOpen(false);
    consoleToggle.current?.focus();
  };
  return <section className={styles.workspace} data-lesson-workspace aria-label={`${lesson.title}: workspace`}>
    <div className={styles.toolbar}>
      <div className={styles.modeSwitch}>
        <button type="button" aria-pressed={!solution} onClick={event => {event.currentTarget.focus(); onSolutionChange(false);}}>Your code</button>
        <button type="button" aria-pressed={solution} onClick={event => {event.currentTarget.focus(); onSolutionChange(true);}}>Solution</button>
      </div>
      {viewControls}
      {solution && <span className={styles.modeNote}>Read-only · your work is kept</span>}
    </div>
    <div className={styles.playground}>
      <BrowserOnly fallback={<LoadingWorkspace/>}>{() => <EditorBoundary key={lesson.id}><Suspense fallback={<LoadingWorkspace/>}>
        <Playground key={lesson.id} lesson={lesson} solution={solution} view={view}
          consoleOpen={consoleOpen} consoleId={`${id}-console`} closeConsole={closeConsole} />
      </Suspense></EditorBoundary>}</BrowserOnly>
    </div>
    <div className={styles.footer} role="group" aria-label="Workspace tools">
      <button ref={consoleToggle} type="button" className={styles.toolButton} aria-expanded={consoleOpen}
        aria-controls={`${id}-console`} onClick={() => setConsoleOpen(value => !value)}>Console</button>
      <RunActions lesson={lesson} solution={solution} />
      <details className={styles.help}>
        <summary>Preview help</summary>
        <div className={styles.helpBody}>
          <p>The preview compiles TypeScript but does not type-check it. Run <code>pnpm build</code> locally for type checks.</p>
          <p>After editing a store constructor or method, use Refresh preview if an existing model still has its old behavior. Your source edits are kept.</p>
          <p>If the preview cannot connect, choose <strong>Work locally</strong> or <strong>Online editor</strong> below.</p>
          <p>Online editor opens the selected starter or solution in StackBlitz, without your browser edits. Support files are read-only.</p>
          <p>Downloads contain the lesson’s files as JSON. <strong>Work locally</strong> explains how to import them.</p>
        </div>
      </details>
    </div>
  </section>;
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
    {!studio && <div className={styles.standalone}><CodeWorkspace lesson={lesson} solution={solution} onSolutionChange={setStandaloneSolution} /></div>}
  </section>;
}
