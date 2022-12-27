# 3. Mobx in React

React for me it is functions that can render user interface and Mobx is classes that contains state of application. In this chapter I try to show you how easy and power full is that connection.

During this chapter the app that I create will be counters, with some buttons that will be change counter value.

## Setup the environment

If you prepared in last chapter empty project react project, you need to add two libraries to your project `mobx` and `mobx-react-lite`:

```shell
pnpm install mobx mobx-react-lite
```

You should also delete all thing that we don't need in this project like styles.

Also the `App` component don't need so much elements:

```tsx
function App() {
  return <div>
    Counter
  </div>
}
```

## Create component for counter

Let's start building our counter. Should have place for displaying value and buttons for changing this value (-100,-1,0,+1,+100).

```tsx
const Counter = () => {

  return <div className="counter">
    <span>
      <span>0</span>
    </span>
    <button>-100</button>
    <button>-1</button>
    <button>0</button>
    <button>+1</button>
    <button>+100</button>
  </div>;
};
```

And of course we need to add this component to `App`:

```tsx
function App() {
  return <div>
    <Counter />
  </div>;
}
```

TODO: Show img result and url to styles

## Create store + First spell

We can use `useState` to store value for this component:

```tsx
const Counter = () => {
  const [value, setValue] = useState(0);

  return <div className="counter">
    <span>
      <span>{value}</span>
    </span>
    <button onClick={() => setValue(value - 100)}>-100</button>
    <button onClick={() => setValue(value - 1)}>-1</button>
    <button onClick={() => setValue(0)}>0</button>
    <button onClick={() => setValue(value + 1)}>+1</button>
    <button onClick={() => setValue(value + 100)}>+100</button>
  </div>;
};
```

But in this case we can not access to this value outside component. We can move this value level up, but access also will be limited.

In this case we can build store outside react context to provide access everywhere.

```ts title="Store.ts"
export class CounterStore {
  value = 0

  constructor() {
    makeAutoObservable(this)
  }

  reset = (): void => {
    this.value = 0
  }

  add = (value: string | number): number => {
    if (!isNaN(+value)) this.value = +value
    return this.value
  }
}

export const store = new CounterStore()
```

To say Mobx that this class will be store we need to use first spell `makeAutoObservable` in constructor. After construction this object will be not normal object. Fields change to state, methods to actions and getter to computed values.

## Import store to component + Second spell

So, if we have every thing we can just import this store and use in component:

```tsx
import { store } from './Store'

const Counter = () => {
  const [value, add, reset] = store;

  return <div className="counter">
    <span>
      <span>{value}</span>
    </span>
    <button onClick={() => add(100)}>-100</button>
    <button onClick={() => add(-1)}>-1</button>
    <button onClick={() => reset()}>0</button>
    <button onClick={() => add(+1)}>+1</button>
    <button onClick={() => add(+100)}>+100</button>
  </div>;
};
```

But doesn't work, because we need to tell Mobx that this component using our store. We can do that using second spell:

```tsx
const Counter = observer(() => {
  const [value, add, reset] = store;

  return <div className="counter">
    ...
  </div>;
});
```

And this is all magic that you need to know to starting working with mobx. But it isn't everything.

## Global store + Action for adding

## Limit number of counters

## Action for deleting

## Sum of all counters

## Value to input

## Console in browser

## Reaction (Bonus)

TODO: Replace param in url

## Autorun (Bonus)

TODO: Save state in local storage

## Summary and Ending


