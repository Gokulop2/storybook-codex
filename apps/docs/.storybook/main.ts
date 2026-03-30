import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/** Repo root (codex/). `.storybook` → `apps/docs/.storybook`, so three levels up to the monorepo root. */
const monorepoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
/** `apps/docs` — Storybook package root. */
const docsPackageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
/** UI package source — alias here so Storybook uses `src/` + HMR without `npm run build` on `@opus2-platform/codex`. */
const codexUiSrc = resolve(monorepoRoot, "packages/ui/src");

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  /** Docs demos: `/avatars/...` etc. */
  staticDirs: ["../public"],
  addons: [getAbsolutePath("@storybook/addon-docs")],
  framework: getAbsolutePath("@storybook/react-vite"),
  viteFinal: async (config) => {
    config.plugins = [...(config.plugins ?? []), tailwindcss()];

    config.resolve ??= {};
    const existingAlias = config.resolve.alias;
    const aliasTail =
      Array.isArray(existingAlias)
        ? existingAlias
        : existingAlias && typeof existingAlias === "object"
          ? Object.entries(existingAlias).map(([find, replacement]) => ({
              find,
              replacement: replacement as string,
            }))
          : [];
    /** Exact package entry only — subpaths like `@opus2-platform/codex/src/styles/...` must resolve via the workspace package. */
    config.resolve.alias = [
      { find: /^@opus2-platform\/codex$/, replacement: resolve(codexUiSrc, "index.tsx") },
      /** Internal `@/…` imports in `packages/ui` (same as `tsconfig` paths). */
      { find: /^@\/(.*)/, replacement: `${codexUiSrc}/$1` },
      {
        find: "@opus2-platform/icons",
        replacement: resolve(monorepoRoot, "packages/icons/src/index.ts"),
      },
      ...aliasTail,
    ];

    config.optimizeDeps ??= {};
    config.optimizeDeps.exclude = [...(config.optimizeDeps.exclude ?? []), "@opus2-platform/codex"];

    config.server ??= {};
    config.server.fs ??= {};
    const allow = new Set<string>([
      ...(Array.isArray(config.server.fs.allow) ? config.server.fs.allow : []),
      monorepoRoot,
      docsPackageRoot,
      resolve(monorepoRoot, "packages/ui"),
      resolve(monorepoRoot, "packages/icons"),
    ]);
    config.server.fs.allow = [...allow];

    config.build = {
      ...(config.build ?? {}),
      chunkSizeWarningLimit: 1500,
    };
    return config;
  },
};
export default config;
