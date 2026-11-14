import { describe, expect, it } from 'vitest';
import { CounterStore } from './Store';

describe('CounterStore', () => {
  it('starts at zero', () => {
    expect(new CounterStore().value).toBe(0);
  });

  it('adds and subtracts from the current value', () => {
    const store = new CounterStore();
    store.change(4);
    expect(store.value).toBe(4);
    store.change(-2);
    expect(store.value).toBe(2);
  });

  it('clamps large positive and negative changes to 10 and 0', () => {
    const store = new CounterStore();
    store.change(100);
    expect(store.value).toBe(10);
    store.change(1);
    expect(store.value).toBe(10);
    store.change(-100);
    expect(store.value).toBe(0);
    store.change(-1);
    expect(store.value).toBe(0);
  });

  it('resets a changed counter to zero', () => {
    const store = new CounterStore();
    store.change(7);
    expect(store.value).toBe(7);
    store.reset();
    expect(store.value).toBe(0);
  });

  it('keeps two store instances independent', () => {
    const first = new CounterStore();
    const second = new CounterStore();
    first.change(3);
    expect(first.value).toBe(3);
    expect(second.value).toBe(0);
  });
});
