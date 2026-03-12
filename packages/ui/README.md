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

### Untitled UI Integration

This library wraps [Untitled UI React](https://www.untitledui.com/react) components for easy use.

#### Theming

To use Untitled UI theming, ensure your app imports the global styles:

```css
@import "@opus2-platform/codex/dist/styles.css";
```

#### Example

```js
import { Button } from "@opus2-platform/codex";

function App() {
  return <Button onClick={() => alert("Clicked!")}>Untitled UI Button</Button>;
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
