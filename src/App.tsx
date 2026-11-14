import { shipments } from './shipments';
import './styles.css';

export default function App() {
  const totalPallets = shipments.reduce((total, shipment) => total + shipment.pallets, 0);
  const readyCount = shipments.filter(shipment => shipment.status === 'ready').length;
  return <main>
    <h1>Typed shipment manifest</h1>
    <p>Node runs the tools; TypeScript checks this data; React renders it; Vite serves the exported project.</p>
    <section aria-label="Summary">
      <p>{shipments.length} shipments · {totalPallets} pallets · {readyCount} ready</p>
    </section>
    <ul>{shipments.map(shipment => <li key={shipment.id}>
      <strong>{shipment.id}</strong>: {shipment.customer} — {shipment.pallets} pallets ({shipment.status})
      <span> · {shipment.priority}</span>
    </li>)}</ul>
  </main>;
}
