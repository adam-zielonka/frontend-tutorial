import { makeAutoObservable, reaction } from 'mobx';

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
    // TODO: serialize just the counter values using semicolons.
    return '';
  }

  hydrate(raw: string): boolean {
    // TODO: validate the entire payload before replacing counters. Empty means [].
    return false;
  }

  removeCounter(id: number) {
    this.counters = this.counters.filter(counter => counter.id !== id);
  }
}

// Browser effects are owned by App's effect, never started at module import time.
export function restoreUrl(store: Store): boolean {
  // TODO: read the value query parameter; hydrate when present. Catch URL failures.
  return false;
}

export function syncUrl(store: Store): () => void {
  // TODO: return a reaction disposer; preserve unrelated query parameters and hash.
  return () => {};
}
