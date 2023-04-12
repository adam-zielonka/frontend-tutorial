# 3. Create base for your app

Let's start build React app using Vite and pnpm.

## Create

Firstly, open your terminal and create app using template ([vitejs guide](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)).

```shell
pnpm create vite my-react-app --template react-swc-ts
```

Next, install deps:

```shell
cd my-react-app
pnpm install
```

And start developing app

```shell
pnpm run dev
```

## Understand

### Project structure

What we have in project:

```shell
my-react-app
├── public "Place for global assets like favicon, fonts"
│   └── vite.svg
├── src "Place for your code"
│   ├── App.css
│   ├── App.tsx "4. First component that we render"
│   ├── assets
│   │   └── react.svg
│   ├── index.css
│   ├── main.tsx "3. Main tsx file with Creation of react app in root div"
│   └── vite-env.d.ts
├── index.html "2. Main html file with root div and main script attached"
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts "1. Conf for frontend tool"
```

Of course the structure of folders can be different like this:

```shell
└── src
    ├── components
    ├── hooks
    ├── store
    ├── styles
    ├── tests
    ├── types
    └── utils
```

It always depends what you will use in your project.

### `vite.config.ts`

This the file that we define how frontend tool should work, by default only react plugin is enable:

```ts showLineNumbers
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
```

but we can adjust in this file much more:

```ts showLineNumbers
import { defineConfig, PluginOption } from "vite";
import react from "@vitejs/plugin-react";

const plugins: PluginOption[] = [react()];

export default defineConfig(({ command }) => {
  if (command === "build") {
    return {
      plugins,
      build: {
        // Generate source map for production build is grate for debugging, 
        // but also expose all code for everyone
        sourcemap: true, 
      },
    };
  }

  // We can define different behavior depends of envs
  if (process.env.VITE_FAKE_API) {
    return  {
      plugins,
    };
  }

  return {
    plugins,
    // And we can connect app with real server
    server: {
      proxy: {
        [`/my_service`]: {
          target: `http//example.com/`,
          secure: false,
          auth: "test:test",
        },
        "/sap/bc/apc": {
          target: `ws://example.com/`,
          ws: true,
          secure: false,
        },
      },
    },
  };
});
```

### `index.html`


```html showLineNumbers
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <!-- Place that react app will be rendered -->
    <div id="root"></div> 
    <!-- Script that is responsible to render react app -->
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

```


### `main.tsx`

```tsx showLineNumbers
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css' // importing global styles

// Render react in root div tag
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### `App.tsx`

```tsx showLineNumbers
import { useState } from 'react'
import reactLogo from './assets/react.svg' // Way how you can import assets
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0) // Hook for keeping state of app

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
```
