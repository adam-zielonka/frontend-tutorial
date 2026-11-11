# 4. MobX in React

React components describe the interface; MobX models hold application state and the operations that change it. This chapter connects those two ideas by building the counter app from the [original mobx-example project](https://github.com/adam-zielonka/mobx-example). Begin with one static counter and the original five controls: −100, −1, Reset, +1 and +100. Then move its state into a model, subscribe React, and grow the app into a collection.

## Follow the lesson path

Each step has its own page, focused starter files, editor, running preview and reference solution. Open the first lesson to begin. Each later starter builds on the preceding solution, with the setup changes explained on that page; your saved editor draft belongs to that individual lesson.

1. [Build the counter layout](./04-mobx/01-counter-layout.mdx) — component markup and controls.
2. [Make the counter interactive](./04-mobx/02-local-state.mdx) — local React state and event handlers.
3. [Create an observable counter store](./04-mobx/03-observable-store.mdx) — `makeAutoObservable`, accumulating actions and binding.
4. [Subscribe React with observer](./04-mobx/04-react-observer.mdx) — replace the temporary state bridge with a render subscription.
5. [Manage multiple counters](./04-mobx/05-counter-collection.mdx) — a parent store, child models and stable IDs.
6. [Derive capacity and the total](./04-mobx/06-computed-capacity.mdx) — a four-counter limit and computed sum.
7. [Remove a counter safely](./04-mobx/07-counter-removal.mdx) — preserve remaining models and recover capacity.
8. [Restore and serialize URL state](./04-mobx/08-url-state.mdx) — validated hydration, `reaction` and cleanup.
9. [Persist counters in localStorage](./04-mobx/09-persistence.mdx) — URL priority, guarded browser storage and `autorun` disposal.

The first two lessons establish the behavior without MobX. The next two separate the original chapter's two central ideas: making a model observable and making a React component observe it. Collection, computed values and removal come next; URL and storage effects are introduced only after the in-memory app works.

## Environment

The embedded exercises supply React 18.3.1, MobX 6.13.7 and `mobx-react-lite` 4.1.0. Work in each page's focused files; supporting styles and completed code are provided. Every starter renders, including the deliberately unsubscribed counter in step 4.

For your own project, continue from the React/TypeScript project in chapter 3, open [Vite's React TypeScript starter](https://vite.new/react-ts), or generate one in a terminal:

```sh
pnpm create vite my-react-app --template react-swc-ts
cd my-react-app
pnpm install
pnpm add mobx@6.13.7 mobx-react-lite@4.1.0
```

The app's lesson files use `/App.tsx`, `/Store.ts` and `/styles.css` at the editor root. In a Vite project, put them under `src/` and import `./styles.css` from `App.tsx`.

## What to watch for

`makeAutoObservable` infers observable fields, actions and computed getters. `observer` subscribes the component that reads those fields during render. A parent that renders the collection and a child that reads a counter value each need the appropriate subscription. Keep models stable for the lifetime of their owner, and use stable keys when deleting items.

The original example also explores editing a value through an input and inspecting a model in the browser console. As an extension, add a number input whose action rejects non-finite values; do not confuse replacing its value with adding a delta. Prefer a local debugger breakpoint over assigning a store to `window`: these lessons keep model ownership inside the mounted app.

Keep persistence outside model constructors. Browser input is untrusted, storage can be unavailable, and subscriptions need disposal. The last two lessons validate complete snapshots before replacement, cap the collection at four counters, and keep effects inside a React effect with cleanup.

## Original project and references

The original project is useful for comparison after completing these steps:

- [Source code](https://github.com/adam-zielonka/mobx-example) and [demo](https://adam-zielonka.github.io/mobx-example/).
- Collection checkpoint: [global-store source](https://github.com/adam-zielonka/mobx-example/tree/global-store) and [StackBlitz](https://stackblitz.com/github/adam-zielonka/mobx-example/tree/global-store).
- Removal checkpoint: [action-for-delete source](https://github.com/adam-zielonka/mobx-example/tree/action-for-delete) and [StackBlitz](https://stackblitz.com/github/adam-zielonka/mobx-example/tree/action-for-delete).
- [Original styles](https://github.com/adam-zielonka/mobx-example/blob/main/src/index.css).
- Official MobX documentation: [observable state](https://mobx.js.org/observable-state.html), [actions](https://mobx.js.org/actions.html), [React integration](https://mobx.js.org/react-integration.html), [computed values](https://mobx.js.org/computeds.html), and [reactions](https://mobx.js.org/reactions.html).
