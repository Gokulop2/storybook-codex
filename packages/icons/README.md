# @opus2-platform/icons

This package is a prebuilt icon library for the Opus2 Platform. It is not intended to be run directly, but to be built and published as an npm package.

## Usage

- **Build:**
  - Run `npm run build` in the `packages/icons` directory. This will generate the `dist/` folder with all compiled icons and type definitions.
  - The `dist/` folder is ready to be published or consumed as an npm package.

- **Install:**
  - After publishing, install via npm:
    ```bash
    npm install @opus2-platform/icons
    ```
  - Or use as a local package in your monorepo.

- **Import:**
  ```ts
  import { Home01, Settings01 } from "@opus2-platform/icons";
  ```

## Development

- Do not run this package directly.
- Only build and publish the `dist/` output.
- All source files are in `src/`.
- To add or update icons, place SVGs in `src/icons/` and run the build scripts.

## Scripts

- `npm run build` — Build icons and types to `dist/`
- `npm run gen` — Regenerate icon components and exports

## Notes

- Only the `dist/` folder is needed for npm consumers.
- Do not include unnecessary files in the published package.
