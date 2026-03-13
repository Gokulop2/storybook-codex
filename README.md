# Monorepo Setup

This monorepo contains:

- `apps/docs`: Custom documentation site app
- `packages/ui`: UI components library (publishable to npm)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run development server:
   ```bash
   npm run dev
   ```
3. Build all packages/apps:
   ```bash
   npm run build
   ```

## UI Library

- Located in `packages/ui`
- Build: `npm run build` (outputs to `dist`)
- Peer dependencies: React, ReactDOM

## Linting

- ESLint is set up for TypeScript, React, and Prettier
- Run lint:
  ```bash
  npx eslint .
  ```

## Example Usage

To use the UI library in the docs app:

```js
import { Button } from "@opus2-platform/codex";
```

## Structure

- Root configs: `package.json`, `tsconfig.base.json`, `turbo.json`, `.eslintrc.json`
- Workspaces: `apps/*`, `packages/*`

---

For more details, see each package/app README.
