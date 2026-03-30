# @opus2-platform/icons

Icon wrapper library for Opus2 Platform.

## Features

- Re-export of the upstream icon and file icon packages (see `package.json` dependencies)
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

File icons are available from the same package using the original named exports from `@untitledui/file-icons`.

### Wrapper Behavior

This package re-exports icons from `@untitledui/icons` and `@untitledui/file-icons` through `@opus2-platform/icons`.

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
