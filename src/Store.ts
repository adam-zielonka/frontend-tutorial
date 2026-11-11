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
    // TODO: derive whether the collection has room.
    return true;
  }

  get sum(): number {
    // TODO: derive the total from every counter value.
    return 0;
  }

  addCounter() {
    // TODO: use canAddMoreCounters instead of repeating this length comparison.
    if (this.counters.length >= this.limit) return;
    this.counters.push(new CounterStore(this.nextId++));
  }
}
