import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { CounterStore, Store } from './Store';
import './styles.css';

const Counter = observer(function Counter({ counter }: { counter: CounterStore }) {
  return <section className="counter" aria-label={`Counter ${counter.id}`}>
    <h2>Counter {counter.id}</h2>
    <output aria-live="polite">{counter.value}</output>
    <div className="controls">
      <button type="button" onClick={() => counter.add(-100)}>-100</button>
      <button type="button" onClick={() => counter.add(-1)}>-1</button>
      <button type="button" onClick={counter.reset}>Reset</button>
      <button type="button" onClick={() => counter.add(1)}>+1</button>
      <button type="button" onClick={() => counter.add(100)}>+100</button>
    </div>
  </section>;
});

const App = observer(function App() {
  const [store] = useState(() => new Store());
  return <main className="app">
    <h1>MobX counters</h1>
    {/* TODO: map store.counters into Counter elements using counter.id as key. */}
    <Counter counter={store.counters[0]} />
    <button type="button" onClick={store.addCounter}>Add counter</button>
  </main>;
});

export default App;
