# 7. Fetch

## Preparing workspace

To start working on this project you have two option: development using local or online editor:

1. Online Editor
    - Just go to [**stackblitz**](https://stackblitz.com/github/adam-zielonka/shippingboard-lite/tree/create-fetch)
2. Local development
    - Clone repo from [**shippingboard-lite**](https://github.com/adam-zielonka/shippingboard-lite/tree/create-fetch) and set branch to `create-fetch`. You can use this command: 
    ```shell
    git clone --branch create-fetch https://github.com/adam-zielonka/shippingboard-lite.git
    ```
    - Open vs code for this project, if you still in terminal you can use this command:
    ```shell
    code shippingboard-lite
    ```
    - Install dependencies:
    ```
    npm install
    ```
    - Run dev server:
    ```
    npm dev
    ```

## Setup Base URL

So in normal case the api exist in the same domain that web app is available so the base url can be `/api/`, but in our case we get data from github, so what we need to add to `api.ts` file is that line:

```ts title="src/api/api.ts (on the beginning of file after imports)"
const BASE_URL = "https://raw.githubusercontent.com/adam-zielonka/shippingboard-lite/main/src/api/";
```

## Setup types

```ts title="src/api/api.ts (on the beginning of file after imports)"
type CustomerResponse = {
  kunnr: string
  name1: string
  ort01: string
  land1: string
}

type RampResponse = {
  ramp_id: string
  description: string
}
```

## Fetch using await

```ts showLineNumbers title="src/api/api.ts"
export class API {
  async getCustomers(): Promise<Customer[]> {
    const response = await fetch(BASE_URL + "CUSTOMERS.json");

    if (!response.ok) {
      return [];
    }

    if (!response.body) {
      return [];
    }

    const json = await response.json() as CustomerResponse[];

    return json.map(c => new Customer(c.kunnr, c.name1, c.ort01, c.land1));
  }
```

## Fetch using then

```ts showLineNumbers title="src/api/api.ts"
export class API {
  async getRamps(): Promise<Ramp[]> {
    return await fetch(BASE_URL + "RAMPS.json")
      .then(response => {
        if (!response.ok) {
          return [];
        }
    
        if (!response.body) {
          return [];
        }

        return response.json() as Promise<RampResponse[]>;
      }).then(json => {
        return json.map(r => new Ramp(r.ramp_id, r.description));
      });
  }
```

## Fixing store

```ts title="src/store/Store.ts" showLineNumbers
export class Store {
  //...
  init = async () => {
    this.customers = await api.getCustomers();
    this.ramps = await api.getRamps();
    this.loadings = api.getLoadings();
    store.ui.init();
  };
}
```
