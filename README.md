# Opus2 Codex

Opus2 Codex is a monorepo for the component system used across the workspace. It contains the React component library, the local icon package consumed by that library, and the Storybook docs app used for development and previewing components.

## Workspaces

- `packages/ui` - `@opus2-platform/codex`, the React component library
- `packages/icons` - `@opus2-platform/icons`, local icon exports used by the UI package
- `apps/docs` - Storybook docs app

## Stack

- React 19
- TypeScript 5
- Tailwind CSS v4.1
- React Aria Components
- Turbo for monorepo builds

## Getting Started

1. Install dependencies.

```bash
npm install
```

2. Start the full development workflow.

```bash
npm run dev
```

This starts:

- the icons package in watch mode
- the UI package TypeScript and CSS watch build
- the Storybook docs app on `http://localhost:6006`

## Common Commands

```bash
# repo root
npm run dev
npm run build
npm run format
npx eslint .

# package-specific
npm run dev --workspace=@opus2-platform/codex
npm run build --workspace=@opus2-platform/codex
npm run dev --workspace=docs
npm run start --workspace=docs
```

## Repository Layout

```text
apps/
   docs/                  Storybook docs application
packages/
   icons/                 Local icon package
   ui/                    Component library
```

The UI source lives in `packages/ui/src` and is organized into:

- `components/base` - core building blocks such as buttons, inputs, selects, and form controls
- `components/application` - higher-level patterns such as date pickers, tables, tabs, pagination, and modals
- `components/foundations` - foundational visuals such as featured icons, logos, ratings, and social icons
- `components/shared-assets` - reusable illustrations and display assets
- `hooks` - custom hooks
- `providers` - shared providers, currently the theme provider
- `styles` - package stylesheet entrypoint and theme tokens
- `utils` - shared utilities

## UI Package Notes

- The UI package builds TypeScript declarations and JavaScript into `packages/ui/dist`
- The package stylesheet is generated at `packages/ui/dist/styles.css`
- Peer dependencies are React and ReactDOM
- Icons used by the UI package should come from `@opus2-platform/icons`

Example usage:

```tsx
import { Button } from "@opus2-platform/codex";
import "@opus2-platform/codex/dist/styles.css";

export function Example() {
  return <Button>Save</Button>;
}
```

## Documentation

- Root development docs and repo conventions live in `CLAUDE.md`
- Package-specific details live in each workspace README where available

## Root Config

Important root-level config files:

- `package.json`
- `tsconfig.base.json`
- `turbo.json`
- `eslint.config.js`
