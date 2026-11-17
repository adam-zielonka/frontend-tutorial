import { ThemeProvider } from '@ui5/webcomponents-react/ThemeProvider';
import { Button } from '@ui5/webcomponents-react/Button';
import './styles.css';

export default function App() {
  return <ThemeProvider><main>
    <h1>UI5 loading progress</h1>
    <p>Load a ten-pallet shipment using UI5 components.</p>
    <section aria-label="Shipment loading">
      <p>0 / 10 pallets loaded</p>
      <Button>Load pallet</Button>
    </section>
  </main></ThemeProvider>;
}
