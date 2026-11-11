import { useState } from 'react';
import './styles.css';

export default function App() {
  const [count, setCount] = useState(0);
  return <main>
    <h1>React pallet counter</h1>
    <p>Count pallets as they arrive. The count must never be negative.</p>
    <section aria-label="Pallet counter">
      <p>Pallets: <output aria-live="polite">{count}</output></p>
      <div className="controls">
        <button onClick={() => setCount(current => current + 1)}>Add pallet</button>
        {/* TODO: subtract using a functional update; disable this button at zero. */}
        <button onClick={() => {}}>Remove pallet</button>
        {/* TODO: reset state to zero. */}
        <button onClick={() => {}}>Reset</button>
      </div>
    </section>
  </main>;
}
