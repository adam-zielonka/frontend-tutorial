import { useEffect, useState } from 'react';
import { loadLocalRamps, type Ramp } from './api';
import './styles.css';

type Status = 'loading' | 'success' | 'error';

export default function App() {
  const [ramps, setRamps] = useState<Ramp[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [error, setError] = useState('');
  const [broken, setBroken] = useState(false);
  const [request, setRequest] = useState(0);
  const url = broken ? '/missing-ramps.json' : '/ramps.json';

  useEffect(() => {
    let active = true;
    setStatus('loading');
    setError('');
    const controller = new AbortController();
    loadLocalRamps(url, controller.signal).then(data => {
      if (active) { setRamps(data); setStatus('success'); }
    }).catch((reason: unknown) => {
      if (active) {
        setError(reason instanceof Error ? reason.message : 'Request failed');
        setStatus('error');
      }
    });
    return () => {
      active = false;
      controller.abort();
    };
  }, [url, request]);

  return <main>
    <h1>Fetch local ramp data</h1>
    <p>Fetch the bundled /public/ramps.json fixture from this preview. No remote API is used.</p>
    <div className="controls">
      <label><input type="checkbox" checked={broken} onChange={event => setBroken(event.target.checked)} />Use a missing fixture (error practice)</label>
      <button onClick={() => setRequest(current => current + 1)}>Retry request</button>
    </div>
    <section aria-label="Ramp results" aria-busy={status === 'loading'}>
      {status === 'loading' && <p role="status">Loading ramps…</p>}
      {status === 'error' && <p role="alert">Could not load ramps: {error}</p>}
      {status === 'success' && (ramps.length === 0 ? <p>No ramps found.</p> : <ul>
        {ramps.map(ramp => <li key={ramp.id}>{ramp.id} · {ramp.name}</li>)}
      </ul>)}
    </section>
  </main>;
}
