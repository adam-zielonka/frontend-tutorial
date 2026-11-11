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
    // TODO: subtract 2 and assert the resulting value.
  });

  // TODO: replace each todo with an executable test and specific value assertions.
  it.todo('clamps large positive and negative changes to 10 and 0');
  it.todo('resets a changed counter to zero');
  it.todo('keeps two store instances independent');
});
