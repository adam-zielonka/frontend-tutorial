import { shipments } from './shipments';
import './styles.css';

export default function App() {
  return <main>
    <h1>Typed shipment manifest</h1>
    <p>Node runs the tools; TypeScript checks this data; React renders it; Vite serves the exported project.</p>
    <ul>{shipments.map(shipment => <li key={shipment.id}>
      <strong>{shipment.id}</strong>: {shipment.customer} — {shipment.pallets} pallets ({shipment.status})
      {/* TODO: display the typed priority here. */}
    </li>)}</ul>
  </main>;
}
