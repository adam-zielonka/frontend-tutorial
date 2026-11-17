---
sidebar_position: 30
---

# 3. React basics

Build the counter in three small steps: static JSX, remembered state, and bounded actions. Each lesson begins with the previous solution and opens `App.tsx` beside the preview.

The exercise supplies the entry point. In a local export, `index.html` contains the root element, `src/main.tsx` mounts `App`, and `src/App.tsx` contains the component. Run `pnpm install`, `pnpm dev`, and `pnpm build` in the exported project to install, serve, and type-check/build it. This sandbox uses React 18.3.1 separately from the documentation website.

## Lessons

1. [Render the counter component](./03-react-basics/01-component.mdx) — Build a small semantic component before adding behavior.
2. [Remember the pallet count](./03-react-basics/02-state.mdx) — Use local React state to update the rendered count.
3. [Bound subtraction and reset](./03-react-basics/03-bounded-events.mdx) — Keep a nonnegative counter through every available action.

Work in order; each lesson opens a prepared checkpoint. See [course help](./course-help.mdx) for drafts and local work.

## Official references

[React components](https://react.dev/learn/your-first-component), [React state](https://react.dev/reference/react/useState), [Vite guide](https://vite.dev/guide/).


[Optional continuation: explore a separate Vite project](./03-react-basics/optional-vite-project.mdx).
