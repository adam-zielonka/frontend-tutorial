import {defaultDark, defaultLight, type SandpackTheme} from '@codesandbox/sandpack-react';

// Stable objects preserve the running editor when only its appearance changes.
export const editorLight: SandpackTheme = {
  ...defaultLight,
  colors: {...defaultLight.colors, disabled: '#626b78', clickable: '#586174', accent: '#6921ce', error: '#b42318'},
  syntax: {...defaultLight.syntax, comment: {color: '#596575', fontStyle: 'italic'},
    definition: '#526800', tag: '#075ab5', keyword: '#6941c6', string: '#215bb6'},
  font: {...defaultLight.font, size: '14px', lineHeight: '22px'},
};
export const editorDark: SandpackTheme = {
  ...defaultDark,
  colors: {...defaultDark.colors, disabled: '#9aa5b8', base: '#a7b0bf', accent: '#d5b1ff'},
  syntax: {...defaultDark.syntax, comment: {color: '#a7b4c8', fontStyle: 'italic'}, static: '#ff9b92'},
  font: {...defaultDark.font, size: '14px', lineHeight: '22px'},
};
