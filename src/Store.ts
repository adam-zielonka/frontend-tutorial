import { makeAutoObservable } from 'mobx';

export class CounterStore {
  counters = [{ id: 1, value: 0 }];
  nextId = 2;
  readonly min = -10;
  readonly max = 10;
  readonly limit = 3;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get total() {
    return this.counters.reduce((sum, counter) => sum + counter.value, 0);
  }

  change(id: number, delta: number) {
    const counter = this.counters.find(item => item.id === id);
    if (counter) counter.value = Math.min(this.max, Math.max(this.min, counter.value + delta));
  }

  addCounter() {
    if (this.counters.length >= this.limit) return;
    this.counters.push({ id: this.nextId++, value: 0 });
  }

  removeCounter(id: number) {
    this.counters = this.counters.filter(counter => counter.id !== id);
  }
}
