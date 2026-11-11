import { makeAutoObservable } from 'mobx';

export class CounterStore {
  value = 0;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  add(delta: number) {
    const next = this.value + delta;
    if (Number.isFinite(delta) && Number.isFinite(next)) this.value = next;
  }

  reset() {
    this.value = 0;
  }
}
