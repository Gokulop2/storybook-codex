import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/** Repo root (codex/). `.storybook` → `apps/docs/.storybook`, so three levels up to the monorepo root. */
const monorepoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
/** `apps/docs` — Storybook package root. */
const docsPackageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

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
    config.resolve.alias = [
      ...(Array.isArray(config.resolve.alias) ? config.resolve.alias : []),
      {
        find: "@opus2-platform/icons",
        replacement: resolve(monorepoRoot, "packages/icons/src/index.ts"),
      },
    ];

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
