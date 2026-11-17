import type {Lesson} from '../../lib/course';

type StorageLike = Pick<Storage, 'getItem' | 'setItem'>;
export const draftKey = (lesson: Lesson) => `frontend-tutorial:v5:${lesson.id}`;
const legacyKey = (lesson: Lesson) => `frontend-tutorial:v3:${lesson.id}`;
export function readDraft(storage: StorageLike, lesson: Lesson): Record<string, string> | null {
  try {
    const draft = JSON.parse(storage.getItem(draftKey(lesson)) ?? storage.getItem(legacyKey(lesson)) ?? 'null');
    if (!draft || draft.baseline !== JSON.stringify(lesson.files) || typeof draft.files !== 'object') return null;
    if (!Object.keys(lesson.files).every(path => typeof draft.files[path] === 'string')) return null;
    return Object.fromEntries(Object.keys(lesson.files).map(path => [path, draft.files[path]]));
  } catch {return null;}
}

/** Preserve incompatible old work as a download instead of silently overwriting it. */
export function previousDraft(storage: StorageLike, lesson: Lesson): string | null {
  try {
    const raw = storage.getItem(legacyKey(lesson));
    if (!raw) return null;
    const draft = JSON.parse(raw);
    if (draft.baseline === JSON.stringify(lesson.files) || !draft.files || typeof draft.files !== 'object') return null;
    return JSON.stringify({lesson: lesson.id, release: 'v3-v4', files: draft.files}, null, 2);
  } catch {return null;}
}
export function writeDraft(storage: StorageLike, lesson: Lesson, files: Record<string, string>): boolean {
  try {storage.setItem(draftKey(lesson), JSON.stringify({baseline: JSON.stringify(lesson.files), files})); return true;}
  catch {return false;}
}
