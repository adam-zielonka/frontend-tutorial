import type {Lesson} from '../../lib/course';

type StorageLike = Pick<Storage, 'getItem' | 'setItem'>;
export const draftKey = (lesson: Lesson) => `frontend-tutorial:v3:${lesson.id}`;
export function readDraft(storage: StorageLike, lesson: Lesson): Record<string, string> | null {
  try {
    const draft = JSON.parse(storage.getItem(draftKey(lesson)) ?? 'null');
    if (!draft || draft.baseline !== JSON.stringify(lesson.files) || typeof draft.files !== 'object') return null;
    if (!Object.keys(lesson.files).every(path => typeof draft.files[path] === 'string')) return null;
    return Object.fromEntries(Object.keys(lesson.files).map(path => [path, draft.files[path]]));
  } catch {return null;}
}
export function writeDraft(storage: StorageLike, lesson: Lesson, files: Record<string, string>): boolean {
  try {storage.setItem(draftKey(lesson), JSON.stringify({baseline: JSON.stringify(lesson.files), files})); return true;}
  catch {return false;}
}
