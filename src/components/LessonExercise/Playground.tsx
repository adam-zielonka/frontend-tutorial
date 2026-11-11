import React, {useEffect, useRef, useState} from 'react';
import {SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview, SandpackConsole, useSandpack} from '@codesandbox/sandpack-react';
import {useColorMode} from '@docusaurus/theme-common';
import type {Lesson} from '../../lib/course';
import {readDraft, writeDraft, draftKey} from './drafts';
import styles from './styles.module.css';

function DraftTools({lesson, solution, reset}: {lesson: Lesson; solution: boolean; reset: () => void}) {
  const {sandpack} = useSandpack();
  const [status, setStatus] = useState('');
  const first = useRef(true);
  useEffect(() => {
    if (solution) return;
    if (first.current) {first.current = false; return;}
    const timer = window.setTimeout(() => {
      const files = Object.fromEntries(Object.keys(lesson.files).map(path => [path, sandpack.files[path].code]));
      let saved = false;
      try {saved = writeDraft(window.localStorage, lesson, files);} catch { /* Storage access can be blocked. */ }
      setStatus(saved ? 'Saved in this browser.' : 'Browser storage unavailable. Download your files to keep your work.');
    }, 700);
    return () => window.clearTimeout(timer);
  }, [sandpack.files, lesson, solution]);
  // Save synchronously on unmount/page exit, including a rapid switch to the reference.
  const latest = useRef(sandpack.files);
  latest.current = sandpack.files;
  useEffect(() => {
    if (solution) return;
    const save = () => {
      try {writeDraft(window.localStorage, lesson, Object.fromEntries(Object.keys(lesson.files).map(path => [path, latest.current[path].code])));} catch { /* Download remains available. */ }
    };
    window.addEventListener('pagehide', save);
    return () => {window.removeEventListener('pagehide', save); save();};
  }, [lesson, solution]);
  function download() {
    const files = Object.fromEntries(Object.keys(lesson.files).map(path => [path, sandpack.files[path].code]));
    const blob = new Blob([JSON.stringify({lesson: lesson.id, files}, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = `${lesson.id}-${solution ? 'solution' : 'my-files'}.json`; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus('Downloaded files as JSON. The tagged project README explains how to import them.');
  }
  return <div className={styles.draftTools}>
    <button className="button button--secondary button--sm" onClick={download}>Download {solution ? 'solution' : 'my files'}</button>
    {!solution && <button className="button button--secondary button--sm" onClick={() => {
      if (window.confirm('Reset this exercise? Your saved edits for this lesson will be replaced by the starter.')) reset();
    }}>Reset exercise</button>}
    <span role="status" aria-live="polite">{status}</span>
  </div>;
}

function Editor({lesson, solution, reset}: {lesson: Lesson; solution: boolean; reset: () => void}) {
  const {colorMode} = useColorMode();
  const [initial] = useState(() => {
    if (solution) return lesson.solution;
    try {return readDraft(window.localStorage, lesson) ?? lesson.files;} catch {return lesson.files;}
  });
  return <SandpackProvider template="react-ts" theme={colorMode === 'dark' ? 'dark' : 'light'}
    files={{...initial, '/index.tsx': {code: `import React from 'react';\nimport {createRoot} from 'react-dom/client';\nimport App from './App';\ncreateRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);`, hidden: true}}}
    customSetup={{dependencies: {...lesson.dependencies, react: '18.3.1', 'react-dom': '18.3.1'}}}
    options={{activeFile: lesson.activeFile, visibleFiles: Object.keys(initial), recompileMode: 'delayed', recompileDelay: 800, experimental_enableServiceWorker: true}}>
    <DraftTools lesson={lesson} solution={solution} reset={reset}/>
    <SandpackLayout>
      <SandpackCodeEditor showTabs showLineNumbers showInlineErrors wrapContent readOnly={solution} style={{height: 480}} />
      <SandpackPreview showOpenInCodeSandbox={false} showRefreshButton style={{height: 480}} />
    </SandpackLayout>
    <details className={styles.console}><summary>Console and runtime errors</summary><SandpackConsole /></details>
    <p className={styles.note}>The preview compiles TypeScript but does not type-check it. Run <code>npm run build</code> locally for type checks.
      If the preview cannot connect, use StackBlitz or clone the project above.</p>
  </SandpackProvider>;
}

export default function Playground({lesson, solution}: {lesson: Lesson; solution: boolean}) {
  const [generation, setGeneration] = useState(0);
  const [resetting, setResetting] = useState(false);
  // Unmount first so the old editor flushes its edits before the draft is cleared.
  useEffect(() => {
    if (!resetting) return;
    try {localStorage.removeItem(draftKey(lesson));} catch { /* In-memory reset still works. */ }
    setGeneration(value => value + 1);
    setResetting(false);
  }, [resetting, lesson]);
  if (resetting) return <p role="status">Restoring the starter…</p>;
  return <Editor key={`${solution}-${generation}`} lesson={lesson} solution={solution} reset={() => setResetting(true)}/>;
}
