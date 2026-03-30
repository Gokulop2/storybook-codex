# @opus2-platform/icons

Icon wrapper library for Opus2 Platform.

## Features

- Single import path for platform projects
- TypeScript support
- Easy integration with apps and packages in this monorepo

## Installation

If published to npm:

```bash
npm install @opus2-platform/icons
```

For this monorepo, use the workspace package directly.

## Usage

Import icons in your app:

```ts
import { ChevronDown, Home01, Settings01 } from "@opus2-platform/icons";
```

#### Example

```tsx
import { Home01 } from "@opus2-platform/icons";

function App() {
  return <Home01 className="size-5" aria-hidden="true" />;
}
```

## Development

- Build: `npm run build` (outputs to `dist`)
- Watch: `npm run dev`

## Folder Structure

- `src/`: Package source code
- `dist/`: Build output

---

For more details, see the root README.
