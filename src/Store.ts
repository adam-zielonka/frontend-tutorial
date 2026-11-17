import { makeAutoObservable } from 'mobx';

export class CounterStore {
  value = 0;

  constructor() {
    // TODO: infer observable fields and bound actions with makeAutoObservable.
  }

  add(delta: number) {
    // TODO: accumulate delta only if delta and the resulting value are finite.
  }

  reset() {
    // TODO: restore value to zero.
  }
}
