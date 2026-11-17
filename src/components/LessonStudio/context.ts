import {createContext, useContext} from 'react';

export type StudioPanel = 'lesson' | 'code' | 'preview' | 'illustration';
export const LessonStudioContext = createContext<{
  solution: boolean;
  files: string[];
  openFile: (file: string, snippet?: string) => void;
  fileRequest: {file: string; snippet?: string; sequence: number} | null;
} | null>(null);
export const useLessonStudio = () => useContext(LessonStudioContext);
