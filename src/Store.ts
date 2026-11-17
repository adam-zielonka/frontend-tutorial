import { autorun, makeAutoObservable, reaction } from 'mobx';

export class CounterStore {
  constructor(public readonly id = 1, public value = 0) {
    makeAutoObservable(this, { id: false }, { autoBind: true });
  }

  add(delta: number) {
    const next = this.value + delta;
    if (Number.isFinite(delta) && Number.isFinite(next)) this.value = next;
  }

  reset() {
    this.value = 0;
  }
}

export class Store {
  counters: CounterStore[] = [new CounterStore(1)];
  nextId = 2;
  readonly limit = 4;

  constructor() {
    makeAutoObservable(this, { nextId: false, limit: false }, { autoBind: true });
  }

  get canAddMoreCounters(): boolean {
    return this.counters.length < this.limit;
  }

  get sum(): number {
    return this.counters.reduce((total, counter) => total + counter.value, 0);
  }

  addCounter() {
    if (!this.canAddMoreCounters) return;
    this.counters.push(new CounterStore(this.nextId++));
  }

  get serializedValues(): string {
    return this.counters.map(counter => counter.value).join(';');
  }

  hydrate(raw: string): boolean {
    // Reject oversized payloads, empty tokens, non-finite values and excess counters.
    if (raw.length > 512) return false;
    const parts = raw === '' ? [] : raw.split(';');
    if (parts.length > this.limit || parts.some(part => part.trim() === '')) return false;
    const values = parts.map(Number);
    if (!values.every(Number.isFinite)) return false;
    // Only replace state after every value passes. IDs belong to this session.
    this.counters = values.map(value => new CounterStore(this.nextId++, value));
    return true;
  }

  removeCounter(id: number) {
    this.counters = this.counters.filter(counter => counter.id !== id);
  }
}

// Browser effects are owned by App's effect, never started at module import time.
export function restoreUrl(store: Store): boolean {
  try {
    const raw = new URL(window.location.href).searchParams.get('value');
    return raw !== null && store.hydrate(raw);
  } catch {
    return false;
  }
}

export function syncUrl(store: Store): () => void {
  return reaction(() => store.serializedValues, value => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('value', value);
      window.history.replaceState(window.history.state, '', url);
    } catch {
      // A restricted preview must still allow counters to work.
    }
  }, { fireImmediately: true });
}

export const STORAGE_KEY = 'mobx-counter-values-v1';

export function connectPersistence(store: Store): () => void {
  const restoredFromUrl = restoreUrl(store);
  if (!restoredFromUrl) {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw !== null && raw.length <= 1024) {
        const values: unknown = JSON.parse(raw);
        if (Array.isArray(values) && values.length <= store.limit &&
            values.every(value => typeof value === 'number' && Number.isFinite(value))) {
          store.hydrate(values.join(';'));
        }
      }
    } catch {
      // Invalid JSON or blocked browser storage must not prevent using the app.
    }
  }
  // Restore before either effect writes. A valid URL (including value=) wins.
  const stopUrl = syncUrl(store);
  const stopStorage = autorun(() => {
    const snapshot = JSON.stringify(store.counters.map(counter => counter.value));
    try {
      window.localStorage.setItem(STORAGE_KEY, snapshot);
    } catch {
      // Storage may be blocked or full; counters continue to work in memory.
    }
  });
  return () => {
    stopUrl();
    stopStorage();
  };
}
