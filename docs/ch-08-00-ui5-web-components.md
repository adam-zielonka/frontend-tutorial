# 8. UI5 Web Components for React

```mdx-code-block
import LessonExercise from '@site/src/components/LessonExercise';
```

<LessonExercise id="08-ui5" />

## Goals

Use a UI5 React component, supply its theme provider, and register an icon.

## Install

Continue with the separate React 18 sandbox. Install UI5 Web Components for React v2 and its matching core and icon packages:

```bash
npm install @ui5/webcomponents-react@^2 @ui5/webcomponents@^2 @ui5/webcomponents-icons@^2
```

Wrap the app in `src/main.tsx`:

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@ui5/webcomponents-react';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode><ThemeProvider><App /></ThemeProvider></StrictMode>,
);
```

## Add a button

Replace `src/App.tsx`:

```tsx
import { useState } from 'react';
import { Button } from '@ui5/webcomponents-react';
import '@ui5/webcomponents-icons/dist/add.js';

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <main>
      <h1>UI5 counter</h1>
      <p>Count: {count}</p>
      <Button icon="add" onClick={() => setCount(value => value + 1)}>Add</Button>
    </main>
  );
}
```

Run `npm run dev` and click the button. Importing the individual icon registers its name; naming it in the prop alone does not load it. Add a reset button and check keyboard operation. Consult the component documentation for properties and accessible labels. The UI5 version here belongs to the sandbox, independently of the documentation site's dependencies.

## Official references

[UI5 Web Components for React](https://ui5.github.io/webcomponents-react/), [UI5 first steps](https://ui5.github.io/webcomponents/docs/getting-started/first-steps/), [using icons](https://ui5.github.io/webcomponents/docs/advanced/using-icons/).
