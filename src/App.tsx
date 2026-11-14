import './styles.css';

export default function App() {
  return <main>
    <h1>UI5 loading progress</h1>
    <p>Load a ten-pallet shipment using UI5 components.</p>
    <section aria-label="Shipment loading">
      <p>0 / 10 pallets loaded</p>
      <button>Load pallet</button>
    </section>
  </main>;
}
