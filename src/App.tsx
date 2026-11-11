import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { CounterStore } from './Store';
import './styles.css';

const App = observer(function App() {
  const [store] = useState(() => new CounterStore());
  return <main>
    <h1>Observable counter collection</h1>
    <p>Up to {store.limit} counters; each stays between {store.min} and {store.max}.</p>
    <p aria-live="polite">Total: <output>{store.total}</output></p>
    <button onClick={store.addCounter}>Add counter</button>
    {store.counters.length === 0 && <p>No counters. Add one to start.</p>}
    {store.counters.map(counter => <section key={counter.id} aria-label={`Counter ${counter.id}`}>
      <h2>Counter {counter.id}</h2>
      <output aria-live="polite">{counter.value}</output>
      <div className="controls">
        <button onClick={() => store.change(counter.id, -100)}>−100</button>
        <button onClick={() => store.change(counter.id, -1)}>−1</button>
        <button onClick={() => store.change(counter.id, 1)}>+1</button>
        <button onClick={() => store.change(counter.id, 100)}>+100</button>
        <button onClick={() => store.removeCounter(counter.id)}>Remove counter {counter.id}</button>
      </div>
    </section>)}
  </main>;
});

export default App;
