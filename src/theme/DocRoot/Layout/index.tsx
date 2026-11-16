import React from 'react';
import {useLocation} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import OriginalLayout from '@theme-original/DocRoot/Layout';
import type {Props} from '@theme/DocRoot/Layout';
import {course} from '../../../lib/course';

export default function DocRootLayout(props: Props) {
  const {pathname} = useLocation();
  const base = useBaseUrl('/');
  const path = pathname.replace(/\/$/, '');
  const isLesson = course.some(lesson => path === `${base}${lesson.doc}`);
  if (isLesson) return <main className="lesson-root" id="__docusaurus_skipToContent_fallback">{props.children}</main>;
  return <OriginalLayout {...props} />;
}
