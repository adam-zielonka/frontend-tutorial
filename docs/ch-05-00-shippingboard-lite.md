# 5. ShippingBoard Lite

```mdx-code-block
import LessonExercise from '@site/src/components/LessonExercise';
```

<LessonExercise id="05-shippingboard" />

## Goals

Apply components, state, lists, and derived values to a small shipping board. The interactive exercise uses React state for view/filter selection and fixed loading records. The additional walkthrough below demonstrates how a growing board can move into a MobX model.

## Model the board

In the chapter 3 sandbox with MobX installed, create `src/BoardStore.ts`:

```ts
import { makeAutoObservable } from 'mobx';

type Loading = { id: number; destination: string; complete: boolean };

export class BoardStore {
  loadings: Loading[] = [];
  nextId = 1;

  constructor() { makeAutoObservable(this); }

  add(destination: string) {
    const name = destination.trim();
    if (!name) return;
    this.loadings.push({ id: this.nextId++, destination: name, complete: false });
  }

  toggle(id: number) {
    const loading = this.loadings.find(item => item.id === id);
    if (loading) loading.complete = !loading.complete;
  }

  get remaining() {
    return this.loadings.filter(item => !item.complete).length;
  }
}
```

The getter is derived from the list, so there is no second count to synchronize. Each loading has a stable ID for React's list key.

## Display and update it

Replace `src/App.tsx`:

```tsx
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { BoardStore } from './BoardStore';

const board = new BoardStore();

const App = observer(function App() {
  const [destination, setDestination] = useState('');
  return (
    <main>
      <h1>Shipping board</h1>
      <form onSubmit={event => {
        event.preventDefault();
        board.add(destination);
        setDestination('');
      }}>
        <label>Destination <input value={destination} onChange={event => setDestination(event.target.value)} /></label>
        <button type="submit">Add loading</button>
      </form>
      <p>Remaining: {board.remaining}</p>
      <ul>{board.loadings.map(item => (
        <li key={item.id}>
          <label><input type="checkbox" checked={item.complete} onChange={() => board.toggle(item.id)} /> {item.destination}</label>
        </li>
      ))}</ul>
    </main>
  );
});
export default App;
```

Run `npm run dev`, add a destination, and mark it complete. Refreshing clears this in-memory example. Extend it with removal or a filter, then test empty names and repeated toggles. Real shipping systems need server-side validation and durable storage; browser state alone is not a source of truth.

## Official references

[React rendering lists](https://react.dev/learn/rendering-lists), [MobX computed values](https://mobx.js.org/computeds.html), [React forms and inputs](https://react.dev/reference/react-dom/components/input).

## From a list to a ramp dashboard

The interactive exercise adds ramps and a dashboard/table view. Treat a ramp's
loadings as a filtered view of the same data, not a copy that can become stale.
Match by a stable `rampId`, use stable loading IDs as React keys, and display an
explicit empty state for ramps with no loadings.

When you derive progress, guard against zero pallets before dividing. A completed
loading has loaded at least its planned quantity. For ramp status, check whether
the ramp is empty before using `every`: `[].every(...)` returns `true`, which does
not mean an empty ramp has completed a shipment.

Keep view selection separate from business data. Switching from a table to a
dashboard should change presentation while preserving assignments and progress.
Check the result by moving a loading between ramps and switching views: the loading
should appear exactly once and both views should agree.

For an additional challenge, serialize the selected view with `URLSearchParams`.
Allow only known view names when restoring it. Updating the URL with
`history.replaceState` does not implement Back/Forward handling automatically;
a full navigation feature also needs a `popstate` listener or a router.

The [original ShippingBoard Lite project](https://github.com/adam-zielonka/shippingboard-lite)
contains a larger business UI. These exercises isolate its ramp/view concepts so
students can run them without that project's backend or older UI dependencies.
