---
sidebar_position: 30
---

# 3. React basics

A pallet arrives. You click **Add pallet** and expect the number on screen to go from 0 to 1. You’ll build that interaction in three steps: draw the counter, teach it to remember the count, then handle subtraction and reset so the count stays at or above zero. Each exercise opens `App.tsx` beside the preview with the previous step already in place.

If you work locally, follow the page from the outside in. The browser opens `index.html`, which has an empty root element. Then `src/main.tsx` puts the React component from `src/App.tsx` into that element. The browser exercises already connect those files for you.

In an exported project, run `pnpm install` to get the dependencies and `pnpm dev` to see your edits as you work. Run `pnpm build` to check the types and build the app. These examples use React 18.3.1 with their own dependencies.

## Lessons

1. [Render the counter component](./03-react-basics/01-component.mdx) — Build a small semantic component before adding behavior.
2. [Remember the pallet count](./03-react-basics/02-state.mdx) — Use local React state to update the rendered count.
3. [Bound subtraction and reset](./03-react-basics/03-bounded-events.mdx) — Keep a nonnegative counter through every available action.

For drafts and local setup, see [course help](./course-help.mdx).

## Official references

[React components](https://react.dev/learn/your-first-component), [React state](https://react.dev/reference/react/useState), [Vite guide](https://vite.dev/guide/).

[Optional continuation: explore a separate Vite project](./03-react-basics/optional-vite-project.mdx).
