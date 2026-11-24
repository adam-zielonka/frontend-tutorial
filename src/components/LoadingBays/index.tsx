import React, {useId, useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

function BayScene({labels, truckOnRight = false, alt}: {
  labels: [string, string]; truckOnRight?: boolean; alt: string;
}) {
  const image = useBaseUrl('/course/shippingboard/loading-bays.webp');
  return <div className={styles.scene}>
    <img src={image} alt={alt} width={960} height={640} loading="lazy"
      className={truckOnRight ? styles.mirrored : undefined} />
    <div className={styles.signs}>
      {labels.map(label => <span key={label}>{label}</span>)}
    </div>
  </div>;
}

const filteredBays = [
  {id: 'R2', assigned: [{id: 'L-102', customer: 'Harbour Foods', status: 'loading'}]},
  {id: 'R3', assigned: []},
];

export function FilteredBays() {
  const [filter, setFilter] = useState('all');
  const title = useId();
  return <figure className={styles.example} aria-labelledby={title}>
    <figcaption id={title}>Two ramps from the mini board</figcaption>
    <BayScene labels={['R2 · South', 'R3 · Express']}
      alt="A truck is loading at R2. R3 has no truck." />
    <label className={styles.control}>Loading filter
      <select value={filter} onChange={event => setFilter(event.target.value)}>
        <option value="all">All</option><option value="done">Done</option>
      </select>
    </label>
    <div className={styles.bays} aria-live="polite" aria-atomic="true">
      {filteredBays.map(({id, assigned}) => {
        const visible = assigned.filter(item => filter === 'all' || item.status === filter);
        return <div key={id}>
          <strong>{id} · {assigned.length ? 'Loading' : 'Available'}</strong>
          {visible.length ? visible.map(item =>
            <p key={item.id}>{item.id} · {item.customer} ({item.status})</p>)
            : <p>{assigned.length ? 'No matching loadings at this ramp.' : 'No loadings assigned.'}</p>}
        </div>;
      })}
    </div>
  </figure>;
}

export function AssignedBays() {
  const [ramp, setRamp] = useState('C');
  const title = useId();
  const loading = '0007703';
  return <figure className={styles.example} aria-labelledby={title}>
    <figcaption id={title}>Track loading {loading}</figcaption>
    <BayScene labels={['Ramp C', 'Ramp A']} truckOnRight={ramp === 'A'}
      alt={`The truck represents loading ${loading}, currently assigned to ramp ${ramp}.`} />
    <label className={styles.control}>Assign in Details
      <select value={ramp} onChange={event => setRamp(event.target.value)}>
        <option value="C">Ramp C</option><option value="A">Ramp A</option>
      </select>
    </label>
    <div aria-live="polite" aria-atomic="true">
      <div className={styles.bays}>
        {['C', 'A'].map(id => <div key={id}>
          <strong>Ramp {id}</strong>
          {id === 'C' && <p>0007702</p>}
          {ramp === id ? <p className={styles.selected}>{loading}</p> : id === 'A' && <p>No loadings assigned.</p>}
        </div>)}
      </div>
      <table className={styles.row}><caption>Loadings · selected row</caption>
        <thead><tr><th scope="col">Loading</th><th scope="col">Ramp</th></tr></thead>
        <tbody><tr><td>{loading}</td><td>{ramp}</td></tr></tbody>
      </table>
    </div>
  </figure>;
}
