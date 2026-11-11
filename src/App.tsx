import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { CounterStore } from './Store';
import './styles.css';

function Counter({ counter }: { counter: CounterStore }) {
  // TODO: wrap this component in observer so reading counter.value subscribes.
  return <section className="counter" aria-label="Counter">
    <h2>Counter</h2>
    <output aria-live="polite">{counter.value}</output>
    <div className="controls">
      <button type="button" onClick={() => counter.add(-100)}>-100</button>
      <button type="button" onClick={() => counter.add(-1)}>-1</button>
      <button type="button" onClick={counter.reset}>Reset</button>
      <button type="button" onClick={() => counter.add(1)}>+1</button>
      <button type="button" onClick={() => counter.add(100)}>+100</button>
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
