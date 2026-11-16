import {createContext, useContext} from 'react';

export type StudioPanel = 'lesson' | 'code' | 'preview';
export const LessonStudioContext = createContext<{
  solution: boolean;
  openCode: () => void;
} | null>(null);
export const useLessonStudio = () => useContext(LessonStudioContext);
