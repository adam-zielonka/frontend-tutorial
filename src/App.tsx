import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { CounterStore, Store } from './Store';
import './styles.css';

const Counter = observer(function Counter({ counter, onRemove }: { counter: CounterStore; onRemove: () => void }) {
  return <section className="counter" aria-label={`Counter ${counter.id}`}>
    <h2>Counter {counter.id}</h2>
    <output aria-live="polite">{counter.value}</output>
    <div className="controls">
      <button type="button" onClick={() => counter.add(-100)}>-100</button>
      <button type="button" onClick={() => counter.add(-1)}>-1</button>
      <button type="button" aria-label="Reset" onClick={counter.reset}>0</button>
      <button type="button" onClick={() => counter.add(1)}>+1</button>
      <button type="button" onClick={() => counter.add(100)}>+100</button>
      <button type="button" className="remove" aria-label={`Remove counter ${counter.id}`} onClick={onRemove}>X</button>
    </div>
  </section>;
});

const App = observer(function App() {
  const [store] = useState(() => new Store());
  return <main className="app">
    <h1>MobX counters</h1>
    <p>{store.counters.length} / {store.limit} counters</p>
    <aside className="total" aria-label="Total"><output aria-live="polite">{store.sum}</output></aside>
    {store.counters.length === 0 && <p>No counters. Add one to start again.</p>}
    {store.counters.map(counter => <Counter key={counter.id} counter={counter}
      onRemove={() => store.removeCounter(counter.id)} />)}
    <button type="button" aria-label="Add counter" disabled={!store.canAddMoreCounters} onClick={store.addCounter}>+</button>
  </main>;
});

export default App;
