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
npm install @ui5/webcomponents-react@2.15.0 @ui5/webcomponents@2.15.0 @ui5/webcomponents-base@2.15.0 @ui5/webcomponents-fiori@2.15.0 @ui5/webcomponents-icons@2.15.0
```

When building from scratch, wrap the app in `src/main.tsx` (use your own stylesheet name). The exercise already places this provider inside `App.tsx`, so do not wrap it twice:

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@ui5/webcomponents-react';
import App from './App';
import './styles.css';

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

## Complete the progress exercise

`ProgressIndicator` in this pinned UI5 v2 release uses `value` for a percentage
from 0 to 100. Convert the pallet count with `(loaded / 10) * 100`; passing the
raw count would show only 10% when the shipment is full. Keep the limit in the
state updater as well as in the button's `disabled` prop. Reset both the count
and the derived display by resetting the single source of truth.

Use Tab to focus the buttons and Enter or Space to activate them. At capacity,
loading should be unavailable while Reset remains accessible. Both icons need
their registration imports; an icon should supplement the button's text rather
than replace its accessible name.
