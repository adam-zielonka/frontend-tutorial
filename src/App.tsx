import { useState } from 'react';
import { CounterStore } from './Store';
import './styles.css';

function Counter({ counter }: { counter: CounterStore }) {
  // Temporary bridge: read the store after each action; observer replaces this next.
  const [value, setValue] = useState(counter.value);
  function add(delta: number) {
    counter.add(delta);
    setValue(counter.value);
  }
  function reset() {
    counter.reset();
    setValue(counter.value);
  }
  return <section className="counter" aria-label="Counter">
    <h2>Counter</h2>
    <output aria-live="polite">{value}</output>
    <div className="controls">
      <button type="button" onClick={() => add(-100)}>-100</button>
      <button type="button" onClick={() => add(-1)}>-1</button>
      <button type="button" aria-label="Reset" onClick={reset}>0</button>
      <button type="button" onClick={() => add(1)}>+1</button>
      <button type="button" onClick={() => add(100)}>+100</button>
    </div>
  </section>;
}

export default function App() {
  const [counter] = useState(() => new CounterStore());
  return <main className="app">
    <h1>MobX counters</h1>
    <Counter counter={counter} />
  </main>;
}
