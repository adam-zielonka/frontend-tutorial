# 5. ShippingBoard Lite

```mdx-code-block
import LessonExercise from '@site/src/components/LessonExercise';
```

<LessonExercise id="05-shippingboard" />

## Goals

Apply components, observable state, lists, and derived values to a small shipping board.

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
