export interface Shipment {
  id: string;
  customer: string;
  pallets: number;
  status: 'ready' | 'loading';
  priority: 'standard' | 'express';
}

export const shipments: Shipment[] = [
  { id: 'S-101', customer: 'North Market', pallets: 8, status: 'ready', priority: 'express' },
  { id: 'S-102', customer: 'Harbour Foods', pallets: 5, status: 'loading', priority: 'standard' },
  { id: 'S-103', customer: 'City Shop', pallets: 3, status: 'ready', priority: 'standard' },
];
