import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [getAbsolutePath("@storybook/addon-docs")],
  framework: getAbsolutePath("@storybook/react-vite"),
  viteFinal: async (config) => {
    config.plugins = [...(config.plugins ?? []), tailwindcss()];
    config.build = {
      ...(config.build ?? {}),
      chunkSizeWarningLimit: 1500,
    };
    return config;
  },
};
export default config;
