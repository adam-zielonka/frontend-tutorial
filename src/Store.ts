import { makeAutoObservable } from 'mobx';

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

  removeCounter(id: number) {
    this.counters = this.counters.filter(counter => counter.id !== id);
  }
}
