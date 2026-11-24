import React, {useId, useRef} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import CodeBlock from '@theme/CodeBlock';
import {lessonTag, repository, type Lesson} from '../../lib/course';
import styles from './styles.module.css';

export default function RunActions({lesson, solution}: {lesson: Lesson; solution: boolean}) {
  const base = useBaseUrl('/');
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const tag = lessonTag(lesson.id, solution);
  const counterTests = lesson.chapter === '06';
  const checkpoint = useBaseUrl(`/course/tests/${lesson.id}-${solution ? 'solution' : 'start'}`);
  const onlineEditor = counterTests ? `${checkpoint}.html`
    : `https://stackblitz.com/github/adam-zielonka/frontend-tutorial/tree/${tag}?file=${encodeURIComponent(`src/${lesson.activeFile.slice(1)}`)}`;
  const variant = solution ? 'solution' : 'starter';
  const command = `git clone --branch ${tag} --depth 1 ${repository}.git ${lesson.id}\ncd ${lesson.id}\npnpm install --frozen-lockfile\npnpm dev`;

  return <>
    <button ref={trigger} type="button" className={styles.toolButton} aria-haspopup="dialog"
      aria-controls={`${id}-local`} onClick={() => dialog.current?.showModal()}>Work locally</button>
    <a className={styles.toolButton} target="_blank" rel="noopener noreferrer"
      title={`Open the ${variant} in StackBlitz. Browser edits are not transferred.`}
      aria-label={`Online editor: open ${variant} in StackBlitz in a new tab, without browser edits`}
      href={onlineEditor}>
      Online editor ↗
    </a>
    <dialog ref={dialog} id={`${id}-local`} className={styles.localDialog} aria-labelledby={`${id}-title`}
      onClose={() => trigger.current?.focus()}
      onClick={event => {if (event.target === event.currentTarget) dialog.current?.close();}}>
      <header className={styles.localHeader}>
        <h2 id={`${id}-title`}>Work locally · {variant}</h2>
        <button type="button" className={styles.toolButton} autoFocus onClick={() => dialog.current?.close()}>Close</button>
      </header>
      <div className={styles.localBody}>
        {counterTests ? <>
          <p><a href={`${checkpoint}.zip`} download>Download the {variant} project (.zip)</a> and extract it. Open a terminal in the folder containing <code>package.json</code>. With Node.js 24 and pnpm installed, run the tests:</p>
          <CodeBlock language="bash">{'pnpm install --frozen-lockfile\npnpm test:run'}</CodeBlock>
          <p>Run <code>pnpm dev</code> to open the chapter 4 counter app.</p>
        </> : <><p>Use Node.js 24, pnpm and Git. <Link onClick={() => dialog.current?.close()}
          to={`${base}ch-01-00-explain-the-tool-set#a-first-local-installation-check`}>chapter 1 explains their installation</Link>.
          Clone this step’s {variant} checkpoint:</p>
        <CodeBlock language="bash">{command}</CodeBlock>
        <p>To save your own commits: <code>git switch -c my-work</code>.</p>
        <p><a target="_blank" rel="noopener noreferrer" href={`${repository}/tree/${tag}`}>Browse tagged source ↗</a></p></>}
        <h3>Continue with your browser files</h3>
        <p>Choose <strong>Download {solution ? 'solution' : 'my files'}</strong> in the workspace.
          The download contains JSON source files, not a standalone project. Stop the local server with Ctrl+C,
          copy the download into the project folder, and run:</p>
        <CodeBlock language="bash">{`node import-draft.mjs ./${lesson.id}-${solution ? 'solution' : 'my-files'}.json\n${counterTests ? 'pnpm test:run' : 'pnpm dev'}`}</CodeBlock>
        <p className={styles.note}>The import replaces this project’s exercise files. Back up any local edits first.
          Source links open the checkpoint; they do not include your browser edits.</p>
      </div>
    </dialog>
  </>;
}
