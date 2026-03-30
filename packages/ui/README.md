# @opus2-platform/codex

UI components library for Opus2 Platform.

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

### Styling

Import the package stylesheet so components receive design tokens and base styles:

```css
@import "@opus2-platform/codex/dist/styles.css";
```

#### Example

```js
import { Button } from "@opus2-platform/codex";

function App() {
  return <Button onClick={() => alert("Clicked!")}>Save</Button>;
}
```

## Development

- Build: `npm run build` (outputs to `dist`)
- Watch: `npm run dev`

## Peer Dependencies

- React
- ReactDOM

## Folder Structure

- `src/`: Component source code
- `dist/`: Build output

---

For more details, see the root README.
