import { useState } from 'react';
import { ramps, loadings, type View, type Filter } from './data';
import './styles.css';

export default function App() {
  const [view, setView] = useState<View>('loadings');
  const [filter, setFilter] = useState<Filter>('all');
  const visible = loadings.filter(item => filter === 'all' || item.status === filter);
  return <main>
    <h1>ShippingBoard Lite</h1>
    <nav className="controls" aria-label="Board view">
      <button aria-pressed={view === 'loadings'} onClick={() => setView('loadings')}>Loadings</button>
      <button aria-pressed={view === 'ramps'} onClick={() => setView('ramps')}>Ramps</button>
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
      {ramps.map(ramp => {
        const assigned = visible.filter(item => item.rampId === ramp.id);
        const allAssigned = loadings.filter(item => item.rampId === ramp.id);
        const rampStatus = allAssigned.length === 0 ? 'Available'
          : allAssigned.every(item => item.status === 'done') ? 'Complete'
          : allAssigned.some(item => item.status === 'loading') ? 'Loading' : 'Waiting';
        return <article key={ramp.id}>
          <h3>{ramp.name} ({ramp.id})</h3>
          <p>Ramp status: {rampStatus}</p>
          {assigned.length === 0 ? <p>{allAssigned.length === 0 ? 'No loadings assigned.' : 'No matching loadings at this ramp.'}</p> : <ul>
            {assigned.map(item => <li key={item.id}>{item.id} · {item.customer} · {item.status}</li>)}
          </ul>}
        </article>;
      })}
    </section>}
  </main>;
}
