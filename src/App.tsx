import { useState } from 'react';
import './styles.css';

function Counter() {
  const [value, setValue] = useState(0);
  return <section className="counter" aria-label="Counter">
    <h2>Counter</h2>
    <output aria-live="polite">{value}</output>
    <div className="controls">
      <button type="button" onClick={() => setValue(current => current - 100)}>-100</button>
      <button type="button" onClick={() => setValue(current => current - 1)}>-1</button>
      <button type="button" onClick={() => setValue(0)}>Reset</button>
      <button type="button" onClick={() => setValue(current => current + 1)}>+1</button>
      <button type="button" onClick={() => setValue(current => current + 100)}>+100</button>
    </div>
  </section>;
}

export default function App() {
  return <main className="app">
    <h1>MobX counters</h1>
    <Counter />
  </main>;
}
