import React, {lazy, Suspense, useState} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
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
function LoadingWorkspace() {
  return <div className={styles.loading} role="status"><div>Loading this step’s code…</div><div>Starting the live preview…</div></div>;
}

export default function LessonExercise({id}: {id: string}) {
  const lesson = course.find(item => item.id === id);
  const [solution, setSolution] = useState(false);
  const base = useBaseUrl('/');
  if (!lesson) throw new Error(`Unknown lesson: ${id}`);
  const steps = course.filter(item => item.chapter === lesson.chapter);
  const index = steps.findIndex(item => item.id === id);
  const globalIndex = course.findIndex(item => item.id === id);
  const previous = course[globalIndex - 1];
  const next = course[globalIndex + 1];
  const tag = lessonTag(id, solution);
  const command = `git clone --branch ${tag} --depth 1 ${repository}.git ${id}\ncd ${id}\nnpm install\nnpm run dev`;

  return <section className={styles.exercise} data-lesson-workspace aria-label={`${lesson.title}: workspace`}>
    <div className={styles.heading}>
      <span className={styles.eyebrow}>{lesson.chapterTitle} · Step {index + 1} of {steps.length}</span>
      <p>{lesson.objective}</p>
    </div>
    <nav className={styles.steps} aria-label="Steps in this chapter">
      {steps.map((step, i) => <Link key={step.id} to={`${base}${step.doc}`} title={step.title}
        aria-current={id === step.id ? 'step' : undefined}>
        <span>{i + 1}</span> {step.title}
      </Link>)}
    </nav>
    <div className={styles.taskArea}>
      <div><strong>Your task</strong><ol>{lesson.tasks.map(task => <li key={task}>{task}</li>)}</ol></div>
      <details className={styles.hints}>
        <summary>Need a hint?</summary>
        <ul>{lesson.hints.map(hint => <li key={hint}>{hint}</li>)}</ul>
      </details>
    </div>
    <div className={styles.toolbar}>
      <div className={styles.modeSwitch}>
        <button type="button" className={`button button--sm ${solution ? 'button--secondary' : 'button--primary'}`}
          aria-pressed={!solution} onClick={() => setSolution(false)}>Your code</button>
        <button type="button" className={`button button--sm ${solution ? 'button--primary' : 'button--secondary'}`}
          aria-pressed={solution} onClick={() => setSolution(true)}>This step’s solution</button>
      </div>
      <span className={styles.note}>{solution ? 'Read-only. Your edits are kept separately.' : `Work in ${lesson.focusFiles.map(file => file.slice(1)).join(', ')}. Changes update the preview.`}</span>
    </div>
    <BrowserOnly fallback={<LoadingWorkspace/>}>{() => <EditorBoundary key={id}><Suspense fallback={<LoadingWorkspace/>}>
      <Playground key={id} lesson={lesson} solution={solution} />
    </Suspense></EditorBoundary>}</BrowserOnly>
    <nav className={styles.nextSteps} aria-label="Continue learning">
      {previous ? <Link to={`${base}${previous.doc}`}>← {previous.title}</Link> : <span/>}
      {next && <Link className="button button--primary" to={`${base}${next.doc}`}>Next: {next.title} →</Link>}
    </nav>
    <p className={styles.note}>Each step starts from its prepared checkpoint. Your edits are saved separately for each step in this browser.
      The preview uses CodeSandbox and needs internet access. Do not enter private data.</p>
    <details className={styles.local}>
      <summary>Run this step locally or in an online editor</summary>
      <p>Use Node.js 24 and Git. This tag contains only the project for this step:</p>
      <CodeBlock language="bash">{command}</CodeBlock>
      <p>To save your own commits: <code>git switch -c my-work</code>.
        {lesson.chapter === '06' && <> Run <code>npm test</code> in another terminal for Vitest.</>}</p>
      <div className={styles.links}>
        <a className="button button--outline button--primary" target="_blank" rel="noopener noreferrer"
          href={`https://stackblitz.com/github/adam-zielonka/frontend-tutorial/tree/${tag}?file=src/${lesson.activeFile.slice(1)}`}>
          Open this {solution ? 'solution' : 'step'} in StackBlitz ↗
        </a>
        <a target="_blank" rel="noopener noreferrer" href={`${repository}/tree/${tag}`}>Browse tagged source ↗</a>
      </div>
      <p className={styles.note}>Links open the checkpoint, not browser edits. Download your files below the editor to continue your work locally.</p>
    </details>
  </section>;
}
