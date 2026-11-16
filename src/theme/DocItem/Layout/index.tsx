import React from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {HtmlClassNameProvider} from '@docusaurus/theme-common';
import OriginalLayout from '@theme-original/DocItem/Layout';
import DocItemContent from '@theme/DocItem/Content';
import DocItemPaginator from '@theme/DocItem/Paginator';
import type {Props} from '@theme/DocItem/Layout';
import {course} from '../../../lib/course';
import LessonStudio from '../../../components/LessonStudio';

export default function DocItemLayout(props: Props) {
  const {metadata} = useDoc();
  const lesson = course.find(item => item.doc === metadata.id);
  if (!lesson) return <OriginalLayout {...props} />;
  return <HtmlClassNameProvider className="lesson-page">
    <LessonStudio key={lesson.id} lesson={lesson}>
      <article><DocItemContent>{props.children}</DocItemContent></article>
      <DocItemPaginator />
    </LessonStudio>
  </HtmlClassNameProvider>;
}
