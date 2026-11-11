export interface Shipment {
  id: string;
  customer: string;
  pallets: number;
  status: 'ready' | 'loading';
  // TODO: add priority: 'standard' | 'express'.
}

export const shipments: Shipment[] = [
  { id: 'S-101', customer: 'North Market', pallets: 8, status: 'ready' },
  { id: 'S-102', customer: 'Harbour Foods', pallets: 5, status: 'loading' },
  { id: 'S-103', customer: 'City Shop', pallets: 3, status: 'ready' },
];
