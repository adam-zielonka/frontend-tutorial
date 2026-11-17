export type View = 'loadings' | 'ramps';
export type Status = 'waiting' | 'loading' | 'done';
export type Filter = 'all' | Status;
export const ramps = [
  { id: 'R1', name: 'North ramp' },
  { id: 'R2', name: 'South ramp' },
  { id: 'R3', name: 'Express ramp' },
];
export interface Loading { id: string; customer: string; rampId: string; status: Status }
export const loadings: Loading[] = [
  { id: 'L-101', customer: 'North Market', rampId: 'R1', status: 'waiting' },
  { id: 'L-102', customer: 'Harbour Foods', rampId: 'R2', status: 'loading' },
  { id: 'L-103', customer: 'City Shop', rampId: 'R1', status: 'done' },
];
