import { useState } from 'react';
import { ramps, loadings, type View, type Filter } from './data';
import './styles.css';

export default function App() {
  const [view, setView] = useState<View>('loadings');
  const [filter, setFilter] = useState<Filter>('all');
  const visible = loadings.filter(item => filter === 'all' || item.status === filter);
  return <div className="App">
    <header className="Header">
      <h1>ShippingBoard Lite</h1>
      <nav className="controls" aria-label="Board view">
        <button aria-pressed={view === 'loadings'} onClick={() => setView('loadings')}><span className="view-icon" aria-hidden="true">▦</span>Loadings</button>
        <button aria-pressed={view === 'ramps'} onClick={() => setView('ramps')}><span className="view-icon" aria-hidden="true">◉</span>Ramps</button>
      </nav>
    </header>
    <main className="Board">
      <div className="filters">
        <label>Status <select value={filter} onChange={event => setFilter(event.target.value as Filter)}>
          <option value="all">All</option><option value="waiting">Waiting</option>
          <option value="loading">Loading</option><option value="done">Done</option>
        </select></label>
        <p aria-live="polite">{visible.length} matching loadings</p>
      </div>
      {view === 'loadings' ? <section>
        <h2 className="visually-hidden">Loadings</h2>
        {visible.length === 0 ? <p className="empty-message">No matching loadings.</p> :
          <div className="LoadingsTableScroll" role="region" aria-label="Loading assignments" tabIndex={0}>
            <table className="LoadingsTable">
              <caption className="visually-hidden">Loading assignments</caption>
              <thead><tr><th scope="col">Shipment</th><th scope="col">Ramp</th><th scope="col">Status</th></tr></thead>
              <tbody>{visible.map(item => <tr className="line" key={item.id}>
                <td><span className="id">{item.id}</span><span className="customer">{item.customer}</span></td>
                <td><span className="ramp-tag">{item.rampId}</span></td>
                <td><span className="LoadingStatus" data-status={item.status}>{item.status}</span></td>
              </tr>)}</tbody>
            </table>
          </div>}
      </section> : <section>
        <h2 className="visually-hidden">Ramp overview</h2>
        <div className="Content">{ramps.map(ramp => {
          const assigned = visible.filter(item => item.rampId === ramp.id);
          const allAssigned = loadings.filter(item => item.rampId === ramp.id);
          const rampStatus = allAssigned.length === 0 ? 'Available'
            : allAssigned.every(item => item.status === 'done') ? 'Complete'
            : allAssigned.some(item => item.status === 'loading') ? 'Loading' : 'Waiting';
          return <article className="Ramp" key={ramp.id}>
            <header>
              <h3>{ramp.name} ({ramp.id})</h3>
              <p className="RampStatus">Ramp status: {rampStatus}</p>
            </header>
            <div className="ramp-loadings" data-status={rampStatus}>
              {assigned.length === 0 ? <p className="empty-message">{allAssigned.length === 0 ? 'No loadings assigned.' : 'No matching loadings at this ramp.'}</p> : <ul>
                {assigned.map(item => <li className="Loading" key={item.id}>
                  <header>{item.id}</header>
                  <div className="customer"><span className="name">{item.customer}</span></div>
                  <footer><span className="LoadingStatus" data-status={item.status}>{item.status}</span></footer>
                </li>)}
              </ul>}
            </div>
          </article>;
        })}</div>
      </section>}
    </main>
  </div>;
}
