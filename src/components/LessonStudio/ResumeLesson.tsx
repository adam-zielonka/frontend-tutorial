import React, {useEffect, useState} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {coursePages, lastLessonKey} from '../../lib/course';

export default function ResumeLesson() {
  const base = useBaseUrl('/');
  const [page, setPage] = useState<(typeof coursePages)[number]>();
  useEffect(() => {
    try {
      const id = window.localStorage.getItem(lastLessonKey);
      setPage(coursePages.find(item => item.id === id));
    } catch { /* The course introduction also works without local storage. */ }
  }, []);
  if (!page) return null;
  return <p><Link to={`${base}${page.path}`}>
    Resume your last lesson: {Number(page.chapter)}.{page.step}. {page.title}
  </Link></p>;
}
