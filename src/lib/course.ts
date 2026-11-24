import lessons from '../../course/lessons.json';
import pages from '../../course/navigation.json';

export type Lesson = {
  id: string;
  chapter: string;
  chapterTitle: string;
  focusFiles: string[];
  title: string;
  doc: string;
  objective: string;
  tasks: string[];
  hints: string[];
  activeFile: string;
  files: Record<string, string>;
  solution: Record<string, string>;
  dependencies: Record<string, string>;
};
export const course = lessons as Lesson[];
export const coursePages = pages;
export const lastLessonKey = 'frontend-tutorial:last-lesson';
export const repository = 'https://github.com/adam-zielonka/frontend-tutorial';
// Work locally and Online editor link to published checkpoints.
export const release = 'v5';
export function lessonTag(id: string, solution = false) {
  return `lesson-${id}-${solution ? 'solution' : 'start'}-${release}`;
}
