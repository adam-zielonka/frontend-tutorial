import React, {useEffect, useRef, useState} from 'react';
import sdk, {type VM} from '@stackblitz/sdk';
import {useSandpack} from '@codesandbox/sandpack-react';
import {useColorMode} from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import type {Lesson} from '../../lib/course';
import {supportsTestEmbed, testProject} from '../../lib/testProject';
import styles from './TestPanel.module.css';

export default function TestPanel({lesson, solution}: {lesson: Lesson; solution: boolean}) {
  const {sandpack} = useSandpack();
  const {colorMode} = useColorMode();
  const host = useRef<HTMLDivElement>(null);
  const vm = useRef<VM | null>(null);
  const generation = useRef(0);
  const runNumber = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [status, setStatus] = useState<'idle' | 'starting' | 'ready' | 'error'>('idle');
  const [submitted, setSubmitted] = useState('');
  const [canEmbed] = useState(() => supportsTestEmbed(navigator.userAgent));
  const files = Object.fromEntries(Object.keys(lesson.files).map(path => [path, sandpack.files[path].code]));
  const signature = JSON.stringify(files);
  const stale = submitted !== '' && submitted !== signature;

  function openTests() {
    sdk.openProject(testProject(lesson, files), {newWindow: true, view: 'preview', theme: colorMode});
  }

  useEffect(() => () => {
    generation.current++;
    clearTimeout(timer.current);
    vm.current = null;
  }, []);

  async function run() {
    if (!canEmbed) {openTests(); return;}
    const current = ++generation.current;
    const project = testProject(lesson, files, ++runNumber.current);
    setStatus('starting');
    setSubmitted(signature);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (current === generation.current) setStatus('error');
    }, 90_000);
    try {
      if (vm.current) {
        const {'.test-request': request, ...sourceFiles} = project.files;
        // Commit all files before the request signal, so no run sees half an edit.
        await vm.current.applyFsDiff({create: sourceFiles, destroy: []});
        await vm.current.applyFsDiff({create: {'.test-request': request}, destroy: []});
      } else {
        const mount = document.createElement('div');
        host.current!.replaceChildren(mount);
        const connected = await sdk.embedProject(mount, project, {
          view: 'preview', hideExplorer: true, hideNavigation: true, showSidebar: false,
          terminalHeight: 0, theme: colorMode, height: 400,
        });
        if (current !== generation.current) return;
        vm.current = connected;
        const frame = host.current?.querySelector('iframe');
        if (frame) frame.title = `${lesson.title}: live Vitest results`;
      }
      if (current === generation.current) setStatus('ready');
    } catch {
      if (current === generation.current) {
        vm.current = null;
        setStatus('error');
      }
    } finally {
      if (current === generation.current) clearTimeout(timer.current);
    }
  }

  return <div className={styles.panel}>
    <div className={styles.controls}>
      <button type="button" onClick={run} disabled={status === 'starting'} className={styles.run}>
        {status === 'starting' ? 'Starting Vitest…' : 'Run tests'}
      </button>
      <span role="status" className={styles.status}>
        {stale ? 'Code changed. Run tests again for current results.'
          : status === 'idle' ? `Run ${solution ? 'the solution' : 'your current code'} with Vitest.`
            : status === 'starting' ? 'Preparing the test workspace…'
              : status === 'error' ? 'The test workspace could not connect. Retry or open it in a new tab.'
                : 'Vitest runs below. Its results refer to the files from your last run.'}
      </span>
    </div>
    <div ref={host} className={styles.embed} hidden={status === 'idle'} />
    {status === 'idle' && <p className={styles.intro}>Write the test in the editor, then choose <strong>Run tests</strong>.
      {canEmbed ? ' The panel shows Vitest’s passed, failed and pending cases.'
        : ' On this browser, tests open in a new tab with your current files. Embedded tests require a Chromium browser.'}
      {' '}The first run installs its dependencies.</p>}
    <div className={styles.help}>
      <button type="button" onClick={openTests}>Open these tests in a new tab ↗</button>
      <Link to="/course-help#running-tests">Test runner help</Link>
    </div>
  </div>;
}
