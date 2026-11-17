import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { CounterStore } from './Store';
import './styles.css';

const App = observer(function App() {
  const [store] = useState(() => new CounterStore());
  return <main>
    <h1>Test a CounterStore</h1>
    <p>This manual harness exercises the real store. It does not execute Vitest.</p>
    <section aria-label="Manual counter harness">
      <p>Current value: <output aria-live="polite">{store.value}</output> (allowed: 0–10)</p>
      <div className="controls">
        <button onClick={() => store.change(4)}>+4</button>
        <button onClick={() => store.change(-2)}>−2</button>
        <button onClick={() => store.change(100)}>+100</button>
        <button onClick={() => store.change(-100)}>−100</button>
        <button onClick={store.reset}>Reset</button>
      </div>
      <p>Try Reset → +4 → −2 (expect 2), +100 (expect 10), −100 (expect 0).</p>
    </section>
    <h2>Write repeatable checks</h2>
    <p>Edit /Store.test.ts. Export to Vite or open the export in StackBlitz, install dependencies,
      then run <code>pnpm exec vitest run</code> in its real terminal.</p>
    <p>Each lesson adds assertions in the test file. This preview only exercises Store.ts manually; it does not show your Vitest results.</p>
    <p>These store-only tests use Vitest’s default Node environment; no browser emulator is needed.</p>
  </main>;
});

export default App;
