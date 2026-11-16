# 4. MobX in React

React components describe the interface; MobX models hold application state and the operations that change it. This chapter connects those two ideas by building the counter app from the [original mobx-example project](https://github.com/adam-zielonka/mobx-example). Begin with one static counter and the original five controls: −100, −1, Reset, +1 and +100. Then move its state into a model, subscribe React, and grow the app into a collection.

The original chapter showed the counter before and after adding styles. Compare the [unstyled counter](./img/img-02-01-counter-start.png) with the [styled counter](./img/img-02-02-counter-with-css.png); the exercise adapts those styles to a narrower preview.

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

## Optional continuation: edit a value and inspect the model

The original project replaces its display with an input and exposes its store in the browser console. The nine mini exercises use a read-only `output` and models owned by `App`; these changes are an optional continuation of the completed local step 9 project, not files already present in the embedded exercises.

1. In `src/Store.ts`, add a method to `CounterStore`, alongside `add` and `reset`:

   ```ts
   setValue(value: number) {
     if (Number.isFinite(value)) this.value = value;
   }
   ```

   `makeAutoObservable` infers this method as an action. Unlike `add`, it replaces the value. This corrects the original's confusing use of `add` for assignment.
2. In `src/App.tsx`, inside the observed `Counter`, replace the value `output` with:

   ```tsx
   <input aria-label="Counter value" type="number" value={counter.value}
     onChange={event => {
       const value = event.currentTarget.valueAsNumber;
       if (Number.isFinite(value)) counter.setValue(value);
     }} />
   ```

   Enter 42 and the total should reflect 42. A controlled input gets its value from the model; invalid or empty input is rejected, so it will not stay blank. A production editor that permits intermediate text such as a minus sign should keep a separate text draft and validate on commit. See [React's input reference](https://react.dev/reference/react-dom/components/input).
3. To inspect without making the store global, set a browser debugger breakpoint in `add` or `setValue`, click a control, and inspect `this.value` and the call stack. The original instead exported a singleton and assigned `window.store = store`; this local version creates its store inside `App`, so copying that statement would refer to a different ownership pattern. For a deliberate temporary singleton experiment, export an instance from `src/Store.ts`, import and use that same instance in `App`, and declare `Window.store` before assigning it. Remove the exposure after debugging: any page script can access that global.


Keep persistence outside model constructors. Browser input is untrusted, storage can be unavailable, and subscriptions need disposal. The last two lessons validate complete snapshots before replacement, cap the collection at four counters, and keep effects inside a React effect with cleanup.

## Original project and references

The original project is useful for comparison after completing these steps:

- [Source code](https://github.com/adam-zielonka/mobx-example) and [demo](https://adam-zielonka.github.io/mobx-example/).
- Collection checkpoint: [global-store source](https://github.com/adam-zielonka/mobx-example/tree/global-store) and [StackBlitz](https://stackblitz.com/github/adam-zielonka/mobx-example/tree/global-store).
- Removal checkpoint: [action-for-delete source](https://github.com/adam-zielonka/mobx-example/tree/action-for-delete) and [StackBlitz](https://stackblitz.com/github/adam-zielonka/mobx-example/tree/action-for-delete).
- [Original styles](https://github.com/adam-zielonka/mobx-example/blob/main/src/index.css).
- Official MobX documentation: [observable state](https://mobx.js.org/observable-state.html), [actions](https://mobx.js.org/actions.html), [React integration](https://mobx.js.org/react-integration.html), [computed values](https://mobx.js.org/computeds.html), and [reactions](https://mobx.js.org/reactions.html).
