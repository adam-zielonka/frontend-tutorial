import { useState } from 'react';
import { ThemeProvider } from '@ui5/webcomponents-react/ThemeProvider';
import { Button } from '@ui5/webcomponents-react/Button';
import { ProgressIndicator } from '@ui5/webcomponents-react/ProgressIndicator';
import '@ui5/webcomponents-icons/dist/add.js';
import '@ui5/webcomponents-icons/dist/refresh.js';
import './styles.css';

export default function App() {
  const [loaded, setLoaded] = useState(0);
  // TODO: calculate progress from loaded (0–10) as a percentage (0–100).
  const progress = loaded;
  return <ThemeProvider><main>
    <h1>UI5 loading progress</h1>
    <p>Load a ten-pallet shipment using UI5 components.</p>
    <section aria-label="Shipment loading">
      <p aria-live="polite">{loaded} / 10 pallets loaded</p>
      <ProgressIndicator value={progress} displayValue={`${progress}% loaded`} accessibleName="Shipment loading progress" />
      <div className="controls">
        {/* TODO: clamp to ten and disable the action at capacity. */}
        <Button icon="add" onClick={() => setLoaded(current => current + 1)}>Load pallet</Button>
        {/* TODO: reset to zero. */}
        <Button icon="refresh" onClick={() => {}}>Reset shipment</Button>
      </div>
    </section>
    <p>ThemeProvider supplies the UI5 React context. Individual icon modules register the names used on the buttons.</p>
  </main></ThemeProvider>;
}
