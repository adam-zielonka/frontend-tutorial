import { useState } from 'react';
import { ThemeProvider } from '@ui5/webcomponents-react/ThemeProvider';
import { Button } from '@ui5/webcomponents-react/Button';
import '@ui5/webcomponents-icons/dist/add.js';
import '@ui5/webcomponents-icons/dist/refresh.js';
import './styles.css';

export default function App() {
  const [loaded, setLoaded] = useState(0);
  return <ThemeProvider><main>
    <h1>UI5 loading progress</h1>
    <p>Load a ten-pallet shipment using UI5 components.</p>
    <section aria-label="Shipment loading">
      <p aria-live="polite">{loaded} / 10 pallets loaded</p>
      <div className="controls">
        <Button icon="add" onClick={() => setLoaded(current => current + 1)}>Load pallet</Button>
        <Button icon="refresh" onClick={() => setLoaded(0)}>Reset shipment</Button>
      </div>
    </section>
  </main></ThemeProvider>;
}
