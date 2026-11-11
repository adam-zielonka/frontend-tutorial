import React, {lazy, Suspense, useState} from 'react';
import CodeBlock from '@theme/CodeBlock';
import {course, lessonTag, repository} from '../../lib/course';
import styles from './styles.module.css';

const Playground = lazy(() => import('./Playground'));
class EditorBoundary extends React.Component<{children: React.ReactNode}, {failed: boolean}> {
  state = {failed: false};
  static getDerivedStateFromError() {return {failed: true};}
  render() {
    if (this.state.failed) return <p role="alert">The editor could not load. Reload this page, or use the StackBlitz and local project links below.</p>;
    return this.props.children;
  }
}

export default function LessonExercise({id}: {id: string}) {
  const lesson = course.find(item => item.id === id);
  const [started, setStarted] = useState(false);
  const [solution, setSolution] = useState(false);
  if (!lesson) throw new Error(`Unknown lesson: ${id}`);
  const tag = lessonTag(id, solution);
  const command = `git clone --branch ${tag} --depth 1 ${repository}.git ${id}\ncd ${id}\nnpm install\nnpm run dev`;

  return <section className={styles.exercise} aria-label={`${lesson.title}: practice`}>
    <div className={styles.heading}>
      <span className={styles.eyebrow}>LEARNING BY DOING · {id.slice(0, 2)} / 08</span>
      <h2>Try it yourself</h2>
      <p>{lesson.objective}</p>
    </div>
    <ol>{lesson.tasks.map(task => <li key={task}>{task}</li>)}</ol>
    <details className={styles.hints}>
      <summary>Need a hint?</summary>
      <ul>{lesson.hints.map(hint => <li key={hint}>{hint}</li>)}</ul>
    </details>
    <div className={styles.toolbar}>
      <button type="button" className={`button ${solution ? 'button--secondary' : 'button--primary'}`}
        aria-pressed={!solution} onClick={() => setSolution(false)}>Your exercise</button>
      <button type="button" className={`button ${solution ? 'button--primary' : 'button--secondary'}`}
        aria-pressed={solution} onClick={() => setSolution(true)}>Reference solution</button>
    </div>
    <p className={styles.note}>{solution
      ? 'Read-only reference. Your exercise is kept separately; switch back to keep working.'
      : 'Edit the files, try the preview, and check your result against the tasks above.'}</p>
    {started ? <EditorBoundary><Suspense fallback={<p role="status">Loading the editor…</p>}>
      <Playground key={id} lesson={lesson} solution={solution} />
    </Suspense></EditorBoundary> : <div className={styles.launch}>
      <button className="button button--primary button--lg" onClick={() => setStarted(true)}>Start coding on this page</button>
      <p>The editor uses CodeSandbox to run your code. Internet access is required. Do not enter passwords or private data.</p>
    </div>}
    <details className={styles.local}>
      <summary>Run this {solution ? 'solution' : 'exercise'} on your computer</summary>
      <p>Install Node.js 24 and Git first. Each tag is a complete Vite project, ready to run:</p>
      <CodeBlock language="bash">{command}</CodeBlock>
      <p>A tag opens a detached HEAD. To save your own commits: <code>git switch -c my-work</code>.
        For lesson 6, run <code>npm test</code> in another terminal.</p>
    </details>
    <div className={styles.links}>
      <a className="button button--outline button--primary" target="_blank" rel="noopener noreferrer"
        href={`https://stackblitz.com/github/adam-zielonka/frontend-tutorial/tree/${tag}?file=src/${lesson.activeFile.slice(1)}`}>
        Open {solution ? 'solution' : 'starter'} in StackBlitz ↗
      </a>
      <a target="_blank" rel="noopener noreferrer" href={`${repository}/tree/${tag}`}>Browse tagged source ↗</a>
    </div>
    <p className={styles.note}>External links open the original tagged code, not your browser edits.
      Use “Download my files” in the editor to take your changes with you.</p>
  </section>;
}
