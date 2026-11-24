import React from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {HtmlClassNameProvider} from '@docusaurus/theme-common';
import DocItemContent from '@theme/DocItem/Content';
import DocItemPaginator from '@theme/DocItem/Paginator';
import type {Props} from '@theme/DocItem/Layout';
import {course} from '../../../lib/course';
import LessonStudio from '../../../components/LessonStudio';

export default function DocItemLayout(props: Props) {
  const {metadata} = useDoc();
  const lesson = course.find(item => item.doc === metadata.id);
  return <HtmlClassNameProvider className="lesson-page">
    <LessonStudio key={metadata.id} lesson={lesson}>
      <article><DocItemContent>{props.children}</DocItemContent></article>
      <DocItemPaginator />
    </LessonStudio>
  </HtmlClassNameProvider>;
}
