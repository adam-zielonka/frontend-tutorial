import React from 'react';
import {useCodeBlockContext} from '@docusaurus/theme-common/internal';
import type {Props} from '@theme/CodeBlock/Title';
import {useLessonStudio} from '../../../components/LessonStudio/context';
import {lessonFile} from '../../../lib/lessonCode';
import styles from './styles.module.css';

export default function CodeBlockTitle({children}: Props) {
  const studio = useLessonStudio();
  const {metadata} = useCodeBlockContext();
  const file = typeof children === 'string' ? lessonFile(children, studio?.files ?? []) : undefined;
  if (!file || !studio) return <>{children}</>;
  return <button type="button" className={styles.file} title={`Open ${file} in the code editor`}
    onClick={() => studio.openFile(file, metadata.code)}>
    {children}<span aria-hidden="true"> ↗</span><span className={styles.srOnly}> — open in code editor</span>
  </button>;
}
