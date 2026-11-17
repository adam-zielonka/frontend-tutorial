import React, {useCallback, useEffect, useRef, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useLocation} from '@docusaurus/router';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {course, coursePages, type Lesson} from '../../lib/course';
import {CodeWorkspace} from '../LessonExercise';
import CourseIllustration from '../CourseIllustration';
import {LessonStudioContext, type StudioPanel} from './context';
import styles from './styles.module.css';

const overviewPaths = [
  'ch-01-00-explain-the-tool-set', 'ch-02-00-tools-around-development',
  'ch-03-00-create-base-for-your-app', 'ch-04-00-mobx-and-react',
  'ch-05-00-shippingboard-lite', 'ch-06-00-tests',
  'ch-07-00-fetch', 'ch-08-00-ui5-web-components',
];

type IllustrationTopic = React.ComponentProps<typeof CourseIllustration>['topic'];

export default function LessonStudio({lesson, children}: {lesson?: Lesson; children: ReactNode}) {
  const {metadata, toc, frontMatter} = useDoc();
  const location = useLocation();
  const base = useBaseUrl('/');
  const [panel, setPanel] = useState<StudioPanel>('lesson');
  const [menuOpen, setMenuOpen] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const [solution, setSolution] = useState(false);
  const [fileRequest, setFileRequest] = useState<{file: string; snippet?: string; sequence: number} | null>(null);
  const [readingWidth, setReadingWidth] = useState(38);
  const [dragging, setDragging] = useState(false);
  const [desktopView, setDesktopView] = useState<'split' | 'code' | 'preview'>('split');
  const body = useRef<HTMLDivElement>(null);
  const resizePointer = useRef<{element: HTMLDivElement; id: number} | null>(null);
  const menu = useRef<HTMLDivElement>(null);
  const menuAnchor = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const tabButtons = useRef<Array<HTMLButtonElement | null>>([]);
  const firstLocation = useRef(true);
  const currentPage = coursePages.find(page => page.id === metadata.id);
  const chapterIndex = currentPage ? Number(currentPage.chapter) - 1 : overviewPaths.indexOf(metadata.id);
  const chapterSteps = course.filter(item => Number(item.chapter) === chapterIndex + 1);
  const chapterPages = coursePages.filter(item => Number(item.chapter) === chapterIndex + 1);
  const chapterTitle = chapterSteps[0]?.chapterTitle;
  const step = currentPage?.step;
  const topic: IllustrationTopic = chapterIndex < 0 ? 'intro' : String(chapterIndex + 1).padStart(2, '0') as IllustrationTopic;
  const panels: StudioPanel[] = lesson ? ['lesson', 'code', 'preview'] : ['lesson', 'illustration'];
  const illustration = typeof frontMatter.course_illustration === 'string' ? {
    src: frontMatter.course_illustration,
    title: currentPage?.title ?? metadata.title,
    alt: String(frontMatter.course_illustration_alt ?? metadata.title),
    description: String(frontMatter.course_illustration_description ?? ''),
  } : undefined;
  const endResize = useCallback(() => {
    const pointer = resizePointer.current;
    resizePointer.current = null;
    if (pointer?.element.hasPointerCapture(pointer.id)) pointer.element.releasePointerCapture(pointer.id);
    setDragging(false);
  }, []);

  useEffect(() => {
    window.addEventListener('blur', endResize);
    return () => {window.removeEventListener('blur', endResize); endResize();};
  }, [endResize]);
  useEffect(() => {if (narrow) endResize();}, [narrow, endResize]);

  useEffect(() => {
    setMenuOpen(false);
    const initial = firstLocation.current;
    firstLocation.current = false;
    // Initial hydration must not steal focus from someone already typing in Search.
    if (initial && !location.hash) return;
    // Search can navigate to a heading in the same document while Code is open.
    // Reveal the reading pane before scrolling; keep Sandpack mounted.
    setPanel('lesson');
    const frame = requestAnimationFrame(() => {
      let id = '';
      try {id = decodeURIComponent(location.hash.slice(1));} catch { /* Invalid external anchor. */ }
      const heading = id ? document.getElementById(id) : document.querySelector<HTMLElement>('#lesson-reading h1');
      if (!heading || !document.getElementById('lesson-reading')?.contains(heading)) return;
      heading.scrollIntoView({block: 'start'});
      heading.setAttribute('tabindex', '-1');
      heading.focus({preventScroll: true});
    });
    return () => cancelAnimationFrame(frame);
  }, [location.key, location.hash]);

  useEffect(() => {
    try {
      const saved = Number(window.localStorage.getItem('frontend-tutorial:reading-width'));
      if (saved >= 28 && saved <= 55) setReadingWidth(saved);
    } catch { /* Layout remains usable when storage is blocked. */ }
    const query = window.matchMedia('(max-width: 999px)');
    const update = () => {
      setNarrow(query.matches);
      // Rotation must not leave keyboard focus in a pane hidden by mobile CSS.
      if (query.matches && document.getElementById('lesson-workspace')?.contains(document.activeElement)) {
        setPanel(lesson ? 'code' : 'illustration');
        requestAnimationFrame(() => tabButtons.current[1]?.focus());
      }
    };
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, [lesson]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOutside = (event: Event) => {
      if (event.target instanceof Node && !menuAnchor.current?.contains(event.target)) setMenuOpen(false);
    };
    // Iframe clicks do not bubble to this document; losing window focus closes the list too.
    const closeOnBlur = () => setMenuOpen(false);
    document.addEventListener('pointerdown', closeOutside, true);
    document.addEventListener('focusin', closeOutside);
    window.addEventListener('blur', closeOnBlur);

    const current = menu.current?.querySelector<HTMLElement>('[aria-current="page"]');
    if (current && menu.current) {
      const chapter = current.closest('details');
      if (chapter) chapter.open = true;
      // Scroll only the dropdown, preserving the reading pane and editor positions.
      menu.current.scrollTop += current.getBoundingClientRect().top
        - menu.current.getBoundingClientRect().top - menu.current.clientHeight / 2;
    }
    return () => {
      document.removeEventListener('pointerdown', closeOutside, true);
      document.removeEventListener('focusin', closeOutside);
      window.removeEventListener('blur', closeOnBlur);
    };
  }, [menuOpen]);

  const changeWidth = (value: number) => {
    const width = Math.max(28, Math.min(55, value));
    setReadingWidth(width);
    try {window.localStorage.setItem('frontend-tutorial:reading-width', String(width));} catch { /* Optional preference. */ }
  };
  const closeMenu = () => setMenuOpen(false);
  const closeMenuAndFocus = () => {
    closeMenu();
    menuButton.current?.focus();
  };

  function jumpToHeading(id: string) {
    setPanel('lesson');
    // Defer until a hidden mobile reading pane has become visible.
    requestAnimationFrame(() => {
      const heading = document.getElementById(id);
      heading?.scrollIntoView({block: 'start'});
      heading?.setAttribute('tabindex', '-1');
      heading?.focus({preventScroll: true});
      const url = new URL(window.location.href);
      url.hash = id;
      window.history.replaceState(window.history.state, '', url);
    });
  }

  return <LessonStudioContext.Provider value={{solution, files: Object.keys(lesson?.files ?? {}), fileRequest,
    openFile: (file, snippet) => {
      setPanel('code');
      if (desktopView === 'preview') setDesktopView('split');
      setFileRequest(previous => ({file, snippet, sequence: (previous?.sequence ?? 0) + 1}));
    }}}>
    <div className={styles.studio} data-lesson-studio data-panel={panel} data-page-kind={lesson ? 'exercise' : 'introduction'}>
      <header className={styles.header}>
        <div ref={menuAnchor} className={styles.menuAnchor} onKeyDown={event => {
          if (menuOpen && event.key === 'Escape') {
            event.preventDefault();
            event.stopPropagation();
            closeMenuAndFocus();
          }
        }}>
          <button ref={menuButton} type="button" className={styles.menuButton}
            aria-expanded={menuOpen} aria-controls="course-menu" onClick={event => {
              // Safari does not focus buttons on pointer clicks by default.
              event.currentTarget.focus({preventScroll: true});
              setMenuOpen(open => !open);
            }}>
            <span aria-hidden="true">☰</span> Lessons
          </button>
          <div ref={menu} id="course-menu" className={styles.courseMenu} hidden={!menuOpen}>
            <nav aria-label="Course lessons">
              <Link className={styles.courseHome} to={base} aria-current={metadata.id === 'README' ? 'page' : undefined}
                onClick={closeMenu}>Course introduction</Link>
              {overviewPaths.map((overview, index) => {
                const steps = coursePages.filter(item => Number(item.chapter) === index + 1);
                return <details key={overview} open={index === chapterIndex}>
                  <summary>{index + 1}. {course.find(item => Number(item.chapter) === index + 1)?.chapterTitle}</summary>
                  <Link className={styles.overviewLink} to={`${base}${overview}`} aria-current={metadata.id === overview ? 'page' : undefined}
                    onClick={closeMenu}>Chapter introduction</Link>
                  <ol role="list">{steps.map(item => <li key={item.id}>
                    <Link to={`${base}${item.path}`} aria-current={item.id === metadata.id ? 'page' : undefined}
                      onClick={closeMenu}>{Number(item.chapter)}.{item.step}. {item.title}</Link>
                  </li>)}</ol>
                </details>;
              })}
              <Link className={styles.courseHome} to={`${base}course-help`} onClick={closeMenu}
                aria-current={metadata.id === 'course-help' ? 'page' : undefined}>Course help</Link>
            </nav>
          </div>
        </div>
        <div className={styles.location}>
          <Link to={currentPage ? `${base}${overviewPaths[chapterIndex]}` : base}>
            {currentPage ? chapterTitle : 'Frontend tutorial'}
          </Link>
          <span className={styles.lessonName}>{currentPage?.title ?? chapterTitle ?? metadata.title}</span>
        </div>
        <span className={styles.step}>{currentPage ? `Step ${step} / ${chapterPages.length}` : 'Introduction'}</span>
        <nav className={styles.arrows} aria-label="Adjacent lessons">
          {metadata.previous && <Link to={metadata.previous.permalink} title={metadata.previous.title}
            aria-label={`Previous: ${metadata.previous.title}`}>←</Link>}
          {metadata.next && <Link to={metadata.next.permalink} title={metadata.next.title}
            aria-label={`Next: ${metadata.next.title}`}>→</Link>}
        </nav>
      </header>

      <div className={styles.mobileTabs} role="tablist" aria-label="Lesson panels">
        {panels.map((name, index) => <button
          key={name} ref={element => {tabButtons.current[index] = element;}}
          id={`tab-${name}`} type="button" role="tab" aria-selected={panel === name}
          aria-controls={name === 'lesson' ? 'lesson-reading' : 'lesson-workspace'}
          tabIndex={panel === name ? 0 : -1} onClick={() => setPanel(name)}
          onKeyDown={event => {
            const target = event.key === 'ArrowRight' ? (index + 1) % panels.length
              : event.key === 'ArrowLeft' ? (index + panels.length - 1) % panels.length
                : event.key === 'Home' ? 0 : event.key === 'End' ? panels.length - 1 : -1;
            if (target >= 0) {
              event.preventDefault();
              setPanel(panels[target]);
              tabButtons.current[target]?.focus();
            }
          }}>
          {name === 'lesson' ? 'Lesson' : name === 'code' ? 'Code' : name === 'preview' ? lesson?.chapter === '06' ? 'Tests' : 'Preview' : 'Illustration'}
        </button>)}
      </div>

      <div ref={body} className={styles.body} style={{'--reading-width': `${readingWidth}%`} as React.CSSProperties}>
        <section id="lesson-reading" className={styles.readingPane}
          role={narrow ? 'tabpanel' : 'region'} aria-label={narrow ? undefined : 'Lesson instructions'}
          aria-labelledby={narrow ? 'tab-lesson' : undefined}>
          <div className={styles.readingTools}>
            <span>{lesson ? 'Read, then try it' : 'Explore the topic'}</span>
            {toc.length > 0 && <label className={styles.contents}>
              <select aria-label="Jump to lesson section" value="" onChange={event => jumpToHeading(event.target.value)}>
                <option value="" disabled>On this page</option>
                {toc.filter(heading => heading.level <= 3).map(heading =>
                  <option key={heading.id} value={heading.id}>{heading.value.replace(/<[^>]+>/g, '')}</option>)}
              </select>
            </label>}
          </div>
          <div className={styles.reading} tabIndex={0} aria-label="Read the lesson">
            {children}
          </div>
        </section>

        <div className={styles.divider} role="separator" aria-label="Instruction pane width"
          aria-orientation="vertical" aria-valuemin={28} aria-valuemax={55}
          aria-valuenow={Math.round(readingWidth)} aria-valuetext={`${Math.round(readingWidth)}% instructions`}
          aria-controls="lesson-reading" tabIndex={0}
          onDoubleClick={() => changeWidth(38)}
          onKeyDown={event => {
            if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
            event.preventDefault();
            changeWidth(event.key === 'Home' ? 28 : event.key === 'End' ? 55
              : readingWidth + (event.key === 'ArrowLeft' ? -2 : 2));
          }}
          onPointerDown={event => {
            if (!event.isPrimary || event.button !== 0) return;
            event.preventDefault();
            event.currentTarget.focus();
            event.currentTarget.setPointerCapture(event.pointerId);
            resizePointer.current = {element: event.currentTarget, id: event.pointerId};
            setDragging(true);
          }}
          onPointerMove={event => {
            if (!event.currentTarget.hasPointerCapture(event.pointerId) || !body.current) return;
            const rect = body.current.getBoundingClientRect();
            changeWidth((event.clientX - rect.left) / rect.width * 100);
          }}
          onPointerUp={endResize} onLostPointerCapture={endResize} onPointerCancel={endResize}><span /></div>

        <section id="lesson-workspace" className={styles.workspace}
          role={narrow ? 'tabpanel' : 'region'} aria-label={narrow ? undefined : lesson ? 'Practice workspace' : 'Topic illustration'}
          aria-labelledby={narrow ? `tab-${lesson ? panel === 'preview' ? 'preview' : 'code' : 'illustration'}` : undefined}>
          {lesson ? <CodeWorkspace lesson={lesson} solution={solution} onSolutionChange={setSolution}
            view={narrow ? panel === 'preview' ? 'preview' : 'code' : desktopView}
            viewControls={<div className={styles.viewButtons} role="group" aria-label="Workspace view">
              {(['split', 'code', 'preview'] as const).map(view => <button type="button" key={view}
                aria-pressed={desktopView === view} onClick={() => setDesktopView(view)}>
                {view === 'code' ? 'Code' : view === 'split' ? lesson.chapter === '06' ? 'Code + tests' : 'Code + preview' : lesson.chapter === '06' ? 'Tests' : 'Preview'}
              </button>)}
            </div>} /> : <CourseIllustration topic={topic} illustration={illustration} />}
        </section>
        {dragging && <div className={styles.dragShield} />}
      </div>
    </div>
  </LessonStudioContext.Provider>;
}
