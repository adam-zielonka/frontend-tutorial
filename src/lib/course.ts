import lessons from '../../course/lessons.json';

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
export const repository = 'https://github.com/adam-zielonka/frontend-tutorial';
export const release = 'v2';
export function lessonTag(id: string, solution = false) {
  return `lesson-${id}-${solution ? 'solution' : 'start'}-${release}`;
}
