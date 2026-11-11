# 3. Create a base for your app

```mdx-code-block
import LessonExercise from '@site/src/components/LessonExercise';
```

<LessonExercise id="03-react-basics" />

## Goals

Create a TypeScript React app, understand its entry points, and update a component with state.

## Create the sandbox

With Node 24, run these commands outside the tutorial website checkout. The current Vite `react-ts` template uses `@vitejs/plugin-react`. Pin React for this course; this does not change the website's dependencies.

```bash
npm create vite@latest my-react-app -- --template react-ts
cd my-react-app
npm install
npm install react@18.3.1 react-dom@18.3.1
npm install -D @types/react@^18 @types/react-dom@^18
npm run dev
```

Open the local address printed by Vite. Save edits to see updates. Use `npm run build` to check TypeScript and create a production build, and `npm run preview` to preview that build locally.

## Understand the files

`index.html` contains the root element. `src/main.tsx` imports styles and mounts `App` using `createRoot`. `src/App.tsx` contains a component; `.tsx` permits JSX and TypeScript. `vite.config.ts` configures Vite and the React plugin. `public` holds assets served as-is. Do not add a proxy until you have a real API target; Vite's `server.proxy` is for development and does not configure your production server.

## Build a counter

Replace `src/App.tsx` with:

```tsx
import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <main>
      <h1>Counter</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(previous => previous + 1)}>Add one</button>
    </main>
  );
}
```

The event handler requests a new render. The updater receives the previous value, which is useful when updates are queued. Try adding a subtract button and a reset button. For objects and arrays in React state, create updated copies rather than mutating the existing value.

## Official references

[Vite getting started](https://vite.dev/guide/), [Vite proxy](https://vite.dev/config/server-options#server-proxy), [React state](https://react.dev/reference/react/useState), [updating objects](https://react.dev/learn/updating-objects-in-state).
