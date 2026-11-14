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
  readonly safetyLimit = 20;

  constructor() {
    makeAutoObservable(this, { nextId: false, safetyLimit: false }, { autoBind: true });
  }

  addCounter() {
    if (this.counters.length >= this.safetyLimit) return;
    this.counters.push(new CounterStore(this.nextId++));
  }
}
