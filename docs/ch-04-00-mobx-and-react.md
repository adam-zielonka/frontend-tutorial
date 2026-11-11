# 4. MobX in React

```mdx-code-block
import LessonExercise from '@site/src/components/LessonExercise';
```

<LessonExercise id="04-mobx" />

## Goals

Model observable state, update it through actions, and render it with `observer`.

## Install and create a store

Continue in the sandbox from chapter 3:

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
