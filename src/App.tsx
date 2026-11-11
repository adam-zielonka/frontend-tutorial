import { useState } from 'react';
import { ramps, loadings, type View, type Filter } from './data';
import './styles.css';

export default function App() {
  const [view, setView] = useState<View>('loadings');
  const [filter, setFilter] = useState<Filter>('all');
  // TODO: apply the selected status, keeping all rows when filter is 'all'.
  const visible = loadings;
  return <main>
    <h1>ShippingBoard Lite</h1>
    <nav className="controls" aria-label="Board view">
      <button aria-pressed={view === 'loadings'} onClick={() => {}}>Loadings</button>
      <button aria-pressed={view === 'ramps'} onClick={() => {}}>Ramps</button>
    </nav>
    <label>Status <select value={filter} onChange={event => setFilter(event.target.value as Filter)}>
      <option value="all">All</option><option value="waiting">Waiting</option>
      <option value="loading">Loading</option><option value="done">Done</option>
    </select></label>
    <p aria-live="polite">{visible.length} matching loadings</p>
    {view === 'loadings' ? <section>
      <h2>Loadings</h2>
      {visible.length === 0 ? <p>No matching loadings.</p> : <table>
        <caption>Loading assignments</caption>
        <thead><tr><th scope="col">Shipment</th><th scope="col">Ramp</th><th scope="col">Status</th></tr></thead>
        <tbody>{visible.map(item => <tr key={item.id}>
          <td>{item.id} · {item.customer}</td><td>{item.rampId}</td><td>{item.status}</td>
        </tr>)}</tbody>
      </table>}
    </section> : <section>
      <h2>Ramp overview</h2>
      {/* TODO: show each ramp with its matching visible loadings and an empty message. */}
      <ul>{ramps.map(ramp => <li key={ramp.id}>{ramp.name} ({ramp.id}) — assignments to implement</li>)}</ul>
    </section>}
  </main>;
}
