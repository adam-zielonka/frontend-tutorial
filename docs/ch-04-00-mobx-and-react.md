# 4. MobX in React

```mdx-code-block
import LessonExercise from '@site/src/components/LessonExercise';
```

<LessonExercise id="04-mobx" />

## Goals

Model observable state, update it through actions, and render it with `observer`.

## Install and create a store

The short walkthrough below builds a single counter in the chapter 3 sandbox. The interactive exercise above already includes these dependencies and extends the idea to a bounded collection in `Store.ts`:

```bash
npm install mobx@^6 mobx-react-lite
```

Create `src/Store.ts`:

```ts
import { makeAutoObservable } from 'mobx';

export class CounterStore {
  value = 0;

  constructor() {
    makeAutoObservable(this);
  }

  add(amount: number) {
    this.value += amount;
  }

  reset() {
    this.value = 0;
  }
}

export const store = new CounterStore();
```

`makeAutoObservable` infers observable fields and actions. `add` assigns the result back to `value`; an expression such as `this.value + amount` alone changes nothing.

## Render observable state

Replace `src/App.tsx`:

```tsx
import { observer } from 'mobx-react-lite';
import { store } from './Store';

const App = observer(function App() {
  return (
    <main>
      <h1>Counter</h1>
      <p>Count: {store.value}</p>
      <button onClick={() => store.add(-1)}>Subtract</button>
      <button onClick={() => store.add(1)}>Add</button>
      <button onClick={() => store.reset()}>Reset</button>
    </main>
  );
});

export default App;
```

`observer` tracks observable values read while rendering and updates the component when they change. Read values inside an observer component; third-party components may need plain values instead of observable objects. Try adding a computed getter (for example, double the count) and display it.

## Side effects and async work

A `reaction` or `autorun` can perform a side effect when observed data changes. Keep its disposer and call it when no longer needed. Browser storage can fail or contain malformed data: validate values, catch read/write errors, and never store credentials or sensitive data there. Do not assume stored JSON is trustworthy.

An `async` action resumes after `await` in a later tick. Wrap observable changes after `await` in `runInAction`; chapter 7 shows this with an error state.

## Official references

[MobX observable state](https://mobx.js.org/observable-state.html), [actions and async actions](https://mobx.js.org/actions.html), [React integration](https://mobx.js.org/react-integration.html), [reactions and disposal](https://mobx.js.org/reactions.html).

## From one counter to a collection

The exercise stores observable counter records in one collection store. An alternative for a larger domain is one class per counter with a parent store for the collection. A computed value
such as `total` should depend on the counter values; do not keep a separate boolean
that every action must remember to update. Enforce the limit inside `addCounter`,
not only with a disabled button: another caller can still invoke the method. In the exercise, `change(id, delta)` also clamps values between −10 and 10.

The parent component reads the list and needs `observer`. Each child reads its
counter value and needs `observer` too. Give each counter a stable ID so removing
one does not reuse another counter's React identity. With
`makeAutoObservable(this, {}, { autoBind: true })`, methods remain bound when passed
as callbacks; otherwise use `onClick={() => counter.reset()}`.

Try these checks in the exercise:

1. Add and subtract repeatedly; the values should accumulate.
2. Add counters up to the limit; another addition should change nothing.
3. Change one counter and inspect the total; it should update without a separate
   action that recalculates the sum.
4. Remove a counter and confirm the remaining counters keep their own values.

## Extension: save and restore a counter

Keep persistence outside the model. Read once when starting, validate the value,
and dispose the reaction when the owner goes away:

```ts
import { reaction } from 'mobx';

export function persistCounter(counter: CounterStore) {
  try {
    const raw = localStorage.getItem('training-counter');
    const value: unknown = raw === null ? 0 : JSON.parse(raw);
    if (typeof value === 'number' && Number.isFinite(value)) {
      counter.reset();
      counter.add(value);
    }
  } catch {
    // A missing or invalid browser draft should not prevent using the app.
  }
  return reaction(() => counter.value, value => {
    try { localStorage.setItem('training-counter', JSON.stringify(value)); }
    catch { /* Storage can be blocked or full. */ }
  });
}
```

For a component-owned store, return this disposer from `useEffect`. A store shared
by multiple views should have one persistence owner, rather than one reaction per
view. The [original MobX example](https://github.com/adam-zielonka/mobx-example)
remains available as an additional project; the versioned exercises above are the
self-contained checkpoints for this edition.
