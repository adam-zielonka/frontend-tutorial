# 8. UI5 Web Components for React

To not invent everything from scratch, we can use prepared components by different entities. In this chapter we focus on components prepared by SAP. SAP prepared web components that can be used directly in html, but also there is library for React, that wrap this web components to React components.

Url to docs: https://sap.github.io/ui5-webcomponents-react/

## Preparing workspace

### Generate new empty project

1. Use web editor: [vite.new/react-ts](https://vite.new/react-ts)
2. Or generate project using this command:

```bash
pnpm create vite app-with-ui5-wc --template react-swc-ts
cd app-with-ui5-wc
pnpm install
pnpm run dev
```

### Install UI5 deps

```bash
pnpm install @ui5/webcomponents @ui5/webcomponents-react @ui5/webcomponents-fiori
```

### Apply Theme Provider

In file `src/main.tsx` we need to wrap `App` component with `ThemeProvider`

```tsx showLineNumbers title="src/main.tsx"
// highlight-next-line
import { ThemeProvider } from '@ui5/webcomponents-react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    // highlight-start
    <ThemeProvider>
      <App />
    </ThemeProvider>
    // highlight-end
  </StrictMode>,
)
```
