import './styles.css';

function Counter() {
  return <section className="counter" aria-label="Counter">
    <h2>Counter</h2>
    <output aria-live="polite">0</output>
    {/* TODO: add a controls container with -100, -1, 0 (Reset), +1, +100 buttons. */}
  </section>;
}

export default function App() {
  return <main className="app">
    <h1>MobX counters</h1>
    <Counter />
  </main>;
}
