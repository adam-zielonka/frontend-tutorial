import { makeAutoObservable } from 'mobx';

export class CounterStore {
  value = 0;
  readonly min = 0;
  readonly max = 10;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  change(delta: number) {
    this.value = Math.min(this.max, Math.max(this.min, this.value + delta));
  }

  reset() {
    this.value = 0;
  }
}
