# @opus2-platform/codex

**Codex** — the Opus2 Platform React component library: accessible primitives and application patterns built on React Aria Components and Tailwind CSS.

## Features

- Reusable React components
- TypeScript support
- Easy integration with apps in the monorepo

## Installation

If published to npm:

```bash
npm install @opus2-platform/codex
```

## Usage

Import components in your app:

```js
import { Button } from "@opus2-platform/codex";
```

### Styles

Import Codex global styles (theme tokens and component layers):

```css
@import "@opus2-platform/codex/dist/styles.css";
```

### Example

```js
import { Button } from "@opus2-platform/codex";

function App() {
  return <Button onClick={() => alert("Clicked!")}>Save</Button>;
}
```

## Development

See the monorepo root `README.md` for build and Storybook commands.
