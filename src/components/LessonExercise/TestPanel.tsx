import React, {useEffect, useRef, useState} from 'react';
import {useSandpack} from '@codesandbox/sandpack-react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {runBrowserTests, type TestReport} from '../../lib/browser-tests/run';
import styles from './TestPanel.module.css';

export default function TestPanel() {
  const {sandpack} = useSandpack();
  const base = useBaseUrl('/course/tests/');
  const active = useRef<AbortController | null>(null);
  const [running, setRunning] = useState(false);
  const [submitted, setSubmitted] = useState('');
  const [report, setReport] = useState<TestReport | null>(null);
  const files = {'/Store.ts': sandpack.files['/Store.ts'].code, '/Store.test.ts': sandpack.files['/Store.test.ts'].code};
  const signature = JSON.stringify(files);
  useEffect(() => () => {active.current?.abort(); active.current = null;}, []);

  async function run() {
    const controller = new AbortController();
    active.current = controller;
    setSubmitted(signature);
    setReport(null);
    setRunning(true);
    const timer = window.setTimeout(() => controller.abort(), 15_000);
    try {
      const result = await runBrowserTests(base, files, controller.signal);
      if (active.current === controller) setReport(result);
    } catch (error) {
      if (active.current === controller) setReport({error: controller.signal.aborted
        ? 'Run timed out. Check for unfinished promises or loops and try again.' : String(error)});
    } finally {
      window.clearTimeout(timer);
      if (active.current === controller) {active.current = null; setRunning(false);}
    }
  }

  const results = report && 'results' in report ? report.results : null;
  return <div className={styles.panel}>
    <div className={styles.controls}>
      <button type="button" onClick={run} disabled={running} className={styles.run}>{running ? 'Running…' : 'Run tests'}</button>
      <span role="status" className={styles.status}>{running ? 'Running current files…' : results
        ? ['passed', 'failed', 'pending'].map(status => `${results.filter(test => test.status === status).length} ${status}`).join(' · ')
        : report && 'error' in report ? report.error : 'Run your tests here with the lesson’s Vitest simulator.'}</span>
    </div>
    {submitted && submitted !== signature && <p role="status" className={styles.intro}>Code changed. Run again for current results.</p>}
    {results && <ul className={styles.results}>{results.map((test, index) => <li key={index}>
      <strong>{test.status}</strong> · {test.name}
      {test.message && <div>{test.message}</div>}
    </li>)}</ul>}
  </div>;
}
