import './styles.css';

export default function App() {
  const count = 0;
  return <main>
    <h1>React pallet counter</h1>
    <p>Count pallets as they arrive. The count must never be negative.</p>
    <section aria-label="Pallet counter">
      <p>Pallets: <output aria-live="polite">{count}</output></p>
    </section>
  </main>;
}
