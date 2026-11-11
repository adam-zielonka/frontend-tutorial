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
    // TODO: derive the sum from the observable collection.
    return 0;
  }

  change(id: number, delta: number) {
    const counter = this.counters.find(item => item.id === id);
    // TODO: clamp the result between min and max.
    if (counter) counter.value += delta;
  }

  addCounter() {
    // TODO: stop adding when counters.length reaches limit.
    this.counters.push({ id: this.nextId++, value: 0 });
  }

  removeCounter(id: number) {
    this.counters = this.counters.filter(counter => counter.id !== id);
  }
}
