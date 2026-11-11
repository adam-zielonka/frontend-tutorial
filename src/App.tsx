import './styles.css';

function Counter() {
  // TODO: useState(0), render value, and connect each button to its setter.
  return <section className="counter" aria-label="Counter">
    <h2>Counter</h2>
    <output aria-live="polite">0</output>
    <div className="controls">
      <button type="button">-100</button>
      <button type="button">-1</button>
      <button type="button">Reset</button>
      <button type="button">+1</button>
      <button type="button">+100</button>
    </div>
  </section>;
}

export default function App() {
  return <main className="app">
    <h1>MobX counters</h1>
    <Counter />
  </main>;
}
