import React, {useCallback, useEffect, useId, useRef, useState} from 'react';
import {SandpackProvider, SandpackCodeEditor, SandpackPreview, SandpackConsole, useSandpack} from '@codesandbox/sandpack-react';
import {useColorMode} from '@docusaurus/theme-common';
import type {Lesson} from '../../lib/course';
import project from '../../../course/project-dependencies.json' with {type: 'json'};
import {readDraft, writeDraft, previousDraft} from './drafts';
import {editorDark, editorLight} from './editorThemes';
import styles from './Playground.module.css';
import {useLessonStudio} from '../LessonStudio/context';
import {snippetSelection} from '../../lib/lessonCode';
import TestPanel from './TestPanel';

type PlaygroundView = 'split' | 'code' | 'preview';
type ConsoleControls = {consoleOpen: boolean; consoleId: string; closeConsole: () => void};
const MIN_SPLIT = 25;
const MAX_SPLIT = 75;
const clampSplit = (value: number) => Math.min(MAX_SPLIT, Math.max(MIN_SPLIT, value));

type DraftMemory = {keepDraft: (files: Record<string, string>) => void; resetSaveFailed: boolean; saved: () => void};
function DraftTools({lesson, solution, reset, keepDraft, resetSaveFailed, saved}: {lesson: Lesson; solution: boolean; reset: () => void} & DraftMemory) {
  const {sandpack} = useSandpack();
  const [status, setStatus] = useState(solution ? 'Read-only solution.' : resetSaveFailed
    ? 'Reset in this tab. Browser storage is unavailable; download your files before leaving.' : 'Edits save in this browser.');
  const [saveFailed, setSaveFailed] = useState(!solution && resetSaveFailed);
  const [oldDraft] = useState(() => {
    try {return previousDraft(window.localStorage, lesson);} catch {return null;}
  });
  const first = useRef(true);
  useEffect(() => {
    if (solution) return;
    keepDraft(Object.fromEntries(Object.keys(lesson.files).map(path => [path, sandpack.files[path].code])));
    if (first.current) {first.current = false; return;}
    const timer = window.setTimeout(() => {
      const files = Object.fromEntries(Object.keys(lesson.files).map(path => [path, sandpack.files[path].code]));
      let persisted = false;
      try {persisted = writeDraft(window.localStorage, lesson, files);} catch { /* Storage access can be blocked. */ }
      if (persisted) saved();
      setSaveFailed(!persisted);
      setStatus(persisted ? 'Saved in this browser.' : 'Browser storage unavailable. Download your files to keep your work.');
    }, 700);
    return () => window.clearTimeout(timer);
  }, [sandpack.files, lesson, solution, keepDraft, saved]);
  // Save synchronously on unmount/page exit, including a rapid switch to the reference.
  const latest = useRef(sandpack.files);
  latest.current = sandpack.files;
  useEffect(() => {
    if (solution) return;
    const save = () => {
      const files = Object.fromEntries(Object.keys(lesson.files).map(path => [path, latest.current[path].code]));
      keepDraft(files);
      try {writeDraft(window.localStorage, lesson, files);} catch { /* Download remains available. */ }
    };
    window.addEventListener('pagehide', save);
    return () => {window.removeEventListener('pagehide', save); save();};
  }, [lesson, solution, keepDraft]);
  function download() {
    const files = Object.fromEntries(Object.keys(lesson.files).map(path => [path, sandpack.files[path].code]));
    const blob = new Blob([JSON.stringify({lesson: lesson.id, files}, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = `${lesson.id}-${solution ? 'solution' : 'my-files'}.json`; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus('Downloaded files as JSON. Choose Work locally below for import commands.');
    setSaveFailed(false);
  }
  return <div className={styles.tools}>
    <div className={styles.toolRow}>
      <ProjectFiles lesson={lesson}/>
      <div className={styles.actions}>
        {!solution && oldDraft && <button type="button" className={styles.toolButton} onClick={() => {
          const url = URL.createObjectURL(new Blob([oldDraft], {type: 'application/json'}));
          const link = document.createElement('a');
          link.href = url; link.download = `${lesson.id}-previous-edition.json`; link.click();
          setTimeout(() => URL.revokeObjectURL(url), 1000);
          setStatus('Downloaded your previous-edition draft. Its starter differs from this lesson.');
        }}>Previous draft</button>}
        <button type="button" className={styles.toolButton} onClick={download}>Download {solution ? 'solution' : 'my files'}</button>
        {!solution && <button type="button" className={styles.toolButton} aria-label="Reset exercise" onClick={() => {
          if (window.confirm('Reset this exercise? Your saved edits for this lesson will be replaced by the starter.')) reset();
        }}>Reset</button>}
      </div>
    </div>
    <span className={styles.saveStatus} data-save-error={saveFailed || undefined} role="status" aria-live="polite" title={status}>{status}</span>
  </div>;
}

function ProjectFiles({lesson}: {lesson: Lesson}) {
  const {sandpack} = useSandpack();
  const [expanded, setExpanded] = useState(false);
  return <label className={styles.projectToggle} title="Show supporting project files (read-only)"><input type="checkbox" checked={expanded} onChange={event => {
    const show = event.target.checked;
    const active = sandpack.activeFile;
    for (const path of Object.keys(lesson.files)) {
      if (!lesson.focusFiles.includes(path)) {
        if (show) sandpack.openFile(path); else sandpack.closeFile(path);
      }
    }
    sandpack.setActiveFile(show || lesson.focusFiles.includes(active) ? active : lesson.activeFile);
    setExpanded(show);
  }}/> Support files<span className={styles.srOnly}> (read-only)</span></label>;
}

function Workspace({lesson, view, solution, consoleOpen, consoleId, closeConsole}: {lesson: Lesson; view: PlaygroundView; solution: boolean} & ConsoleControls) {
  const id = useId();
  const panes = useRef<HTMLDivElement>(null);
  const codePane = useRef<HTMLElement>(null);
  const editor = useRef<React.ComponentRef<typeof SandpackCodeEditor>>(null);
  const [split, setSplit] = useState(60);
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{handle: HTMLDivElement; pointerId: number; startY: number; startSplit: number; height: number} | null>(null);
  const consoleClose = useRef<HTMLButtonElement>(null);
  const {sandpack} = useSandpack();
  const studio = useLessonStudio();
  const handledRequest = useRef(0);
  const request = studio?.fileRequest;
  useEffect(() => {
    if (!request || !sandpack.files[request.file] || handledRequest.current === request.sequence) return;
    if (sandpack.activeFile !== request.file) {
      sandpack.openFile(request.file);
      sandpack.setActiveFile(request.file);
      return;
    }
    const frame = requestAnimationFrame(() => {
      // Sandpack renders read-only files without CodeMirror. Consume the request
      // before optional highlighting so later tab changes remain under user control.
      handledRequest.current = request.sequence;
      const cm = editor.current?.getCodemirror();
      if (!cm) {
        (codePane.current?.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]') ?? codePane.current)?.focus();
        return;
      }
      const selection = snippetSelection(cm.state.doc.toString(), request.snippet);
      if (selection) cm.dispatch({selection, scrollIntoView: true});
      cm.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [request, sandpack.activeFile, sandpack]);

  // A mobile Lesson tab may hide the entire workspace with display:none.
  // Observe the actual pane, rather than only window resizes, and remeasure
  // CodeMirror after it becomes visible. The iframe follows its CSS size.
  useEffect(() => {
    if (!codePane.current || typeof ResizeObserver === 'undefined') return;
    let frame = 0;
    const observer = new ResizeObserver(entries => {
      if (!entries.some(entry => entry.contentRect.width > 0 && entry.contentRect.height > 0)) return;
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => editor.current?.getCodemirror()?.requestMeasure());
    });
    observer.observe(codePane.current);
    return () => {observer.disconnect(); window.cancelAnimationFrame(frame);};
  }, []);

  const releasePointer = useCallback(() => {
    const current = drag.current;
    drag.current = null;
    if (current?.handle.hasPointerCapture(current.pointerId)) current.handle.releasePointerCapture(current.pointerId);
  }, []);

  useEffect(() => {
    const cancel = () => {releasePointer(); setDragging(false);};
    cancel();
    window.addEventListener('blur', cancel);
    return () => {window.removeEventListener('blur', cancel); releasePointer();};
  }, [view, releasePointer]);

  useEffect(() => {
    if (consoleOpen) consoleClose.current?.focus();
  }, [consoleOpen]);

  function startResize(event: React.PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0 || view !== 'split' || !panes.current) return;
    const height = panes.current.getBoundingClientRect().height - event.currentTarget.getBoundingClientRect().height;
    if (height <= 0) return;
    event.preventDefault();
    event.currentTarget.focus();
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = {handle: event.currentTarget, pointerId: event.pointerId, startY: event.clientY, startSplit: split, height};
    setDragging(true);
  }

  function moveResize(event: React.PointerEvent<HTMLDivElement>) {
    const current = drag.current;
    if (!current || current.pointerId !== event.pointerId) return;
    setSplit(clampSplit(current.startSplit + (event.clientY - current.startY) / current.height * 100));
  }

  function endResize(event: React.PointerEvent<HTMLDivElement>) {
    if (drag.current?.pointerId !== event.pointerId) return;
    releasePointer();
    setDragging(false);
  }

  function resizeWithKeyboard(event: React.KeyboardEvent<HTMLDivElement>) {
    const step = event.shiftKey ? 10 : 5;
    switch (event.key) {
      case 'ArrowUp': setSplit(value => clampSplit(value - step)); break;
      case 'ArrowDown': setSplit(value => clampSplit(value + step)); break;
      case 'Home': setSplit(MIN_SPLIT); break;
      case 'End': setSplit(MAX_SPLIT); break;
      default: return;
    }
    event.preventDefault();
  }

  return <>
    <div className={styles.surface}>
      <div ref={panes} className={styles.panes}>
        {/* Hiding a pane must not unmount its editor or restart its sandbox. */}
        <section ref={codePane} tabIndex={-1} id={`${id}-code`} className={styles.pane} hidden={view === 'preview'}
          style={{flexGrow: view === 'split' ? split : 1}} aria-label="Code editor">
          <div className={styles.paneHeading}>Code{solution && <span>Read-only solution</span>}</div>
          <SandpackCodeEditor ref={editor} showTabs showLineNumbers showInlineErrors wrapContent readOnly={solution}/>
        </section>
        <div className={styles.separator} role="separator" tabIndex={0} hidden={view !== 'split'}
          aria-label={`Resize code and ${lesson.chapter === '06' ? 'test results' : 'live preview'}`} aria-orientation="horizontal" aria-controls={`${id}-code`}
          aria-valuemin={MIN_SPLIT} aria-valuemax={MAX_SPLIT} aria-valuenow={Math.round(split)}
          aria-valuetext={`${Math.round(split)}% code, ${100 - Math.round(split)}% preview`}
          aria-describedby={`${id}-resize-help`} title="Drag to resize, or use Arrow Up / Down, Home and End"
          onPointerDown={startResize} onPointerMove={moveResize} onPointerUp={endResize}
          onPointerCancel={endResize} onLostPointerCapture={endResize} onKeyDown={resizeWithKeyboard}/>
        <span id={`${id}-resize-help`} className={styles.srOnly}>Use Arrow Up or Arrow Down to resize. Home minimizes code; End maximizes code.</span>
        <section id={`${id}-preview`} className={styles.pane} hidden={view === 'code'}
          style={{flexGrow: view === 'split' ? 100 - split : 1}} aria-label={lesson.chapter === '06' ? 'Test results' : 'Live preview'}>
          <div className={styles.paneHeading}>{lesson.chapter === '06' ? 'Test results' : 'Live preview'}</div>
          {lesson.chapter === '06' ? <TestPanel lesson={lesson} solution={solution}/> : <SandpackPreview showOpenInCodeSandbox={false} showRefreshButton/>}
        </section>
      </div>
      <section id={consoleId} className={styles.consoleDrawer} hidden={!consoleOpen} aria-label="Console and runtime errors"
        onKeyDown={event => {if (event.key === 'Escape') {event.stopPropagation(); closeConsole();}}}>
        <div className={styles.drawerHeading}>
          <span>Console and runtime errors</span>
          <button ref={consoleClose} type="button" className={styles.toolButton} onClick={closeConsole}>Close console</button>
        </div>
        <SandpackConsole className={styles.consoleOutput} showSyntaxError maxMessageCount={200}/>
      </section>
      {dragging && <div className={styles.dragShield} aria-hidden="true"/>}
    </div>
  </>;
}

function Editor({lesson, solution, reset, view, initialDraft, keepDraft, resetSaveFailed, saved, ...consoleControls}: {
  lesson: Lesson; solution: boolean; reset: () => void; view: PlaygroundView; initialDraft: Record<string, string> | null;
} & ConsoleControls & DraftMemory) {
  const {colorMode} = useColorMode();
  const [initial] = useState(() => {
    if (solution) return lesson.solution;
    if (initialDraft) return initialDraft;
    try {return readDraft(window.localStorage, lesson) ?? lesson.files;} catch {return lesson.files;}
  });
  // Sandpack resets its file state when these prop identities change. Keep them
  // stable so toggling the theme or inspecting support files never loses edits.
  const [files] = useState(() => ({
    ...Object.fromEntries(Object.entries(initial).map(([path, code]) => [path, {code, readOnly: solution || !lesson.focusFiles.includes(path)}])),
    '/index.tsx': {code: `import React from 'react';\nimport {createRoot} from 'react-dom/client';\nimport App from './App';\ncreateRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);`, hidden: true},
  }));
  const [customSetup] = useState(() => {
    const reactProfile = lesson.chapter === '08' ? project.ui5 : project;
    const {'@types/react': reactTypes, '@types/react-dom': reactDomTypes} = reactProfile.devDependencies;
    return {
      dependencies: {...reactProfile.dependencies, ...lesson.dependencies},
      devDependencies: {'@types/react': reactTypes, '@types/react-dom': reactDomTypes},
    };
  });
  const [options] = useState(() => ({activeFile: lesson.activeFile, visibleFiles: lesson.focusFiles, autorun: true,
    initMode: 'immediate' as const, recompileMode: 'delayed' as const, recompileDelay: 800, experimental_enableServiceWorker: true}));
  return <SandpackProvider className={styles.playground} template="react-ts" theme={colorMode === 'dark' ? editorDark : editorLight}
    files={files} customSetup={customSetup}
    options={options}>
    <DraftTools lesson={lesson} solution={solution} reset={reset} keepDraft={keepDraft} resetSaveFailed={resetSaveFailed} saved={saved}/>
    <Workspace lesson={lesson} view={view} solution={solution} {...consoleControls}/>
  </SandpackProvider>;
}

export default function Playground({lesson, solution, view = 'split', ...consoleControls}: {lesson: Lesson; solution: boolean; view?: PlaygroundView} & ConsoleControls) {
  const [generation, setGeneration] = useState(0);
  const [resetting, setResetting] = useState(false);
  const memory = useRef<Record<string, string> | null>(null);
  const [resetSaveFailed, setResetSaveFailed] = useState(false);
  const keepDraft = useCallback((files: Record<string, string>) => {memory.current = files;}, []);
  const saved = useCallback(() => setResetSaveFailed(false), []);
  // Unmount first so the old editor flushes its edits before the draft is cleared.
  useEffect(() => {
    if (!resetting) return;
    // A v5 starter also masks a compatible legacy draft; deleting only the new
    // key would import that old work again on the next mount.
    memory.current = lesson.files;
    let persisted = false;
    try {persisted = writeDraft(localStorage, lesson, lesson.files);} catch { /* Storage may be blocked. */ }
    setResetSaveFailed(!persisted);
    setGeneration(value => value + 1);
    setResetting(false);
  }, [resetting, lesson]);
  if (resetting) return <p role="status">Restoring the starter…</p>;
  return <Editor key={`${solution}-${generation}`} lesson={lesson} solution={solution} view={view}
    initialDraft={memory.current} keepDraft={keepDraft} resetSaveFailed={resetSaveFailed} saved={saved}
    reset={() => setResetting(true)} {...consoleControls}/>;
}
