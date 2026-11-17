import {createContext, useContext} from 'react';

export type StudioPanel = 'lesson' | 'code' | 'preview' | 'illustration';
export const LessonStudioContext = createContext<{
  solution: boolean;
} | null>(null);
export const useLessonStudio = () => useContext(LessonStudioContext);
