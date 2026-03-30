import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

/**
 * Best-effort: Storybook’s sidebar ⋯ uses `globalThis.CONFIG_TYPE === "DEVELOPMENT"`.
 * Primary removal is in `manager-head.html` (runs with HTML, not dependent on bundle order).
 */
type GlobalWithConfig = typeof globalThis & { CONFIG_TYPE?: string };
const g = globalThis as GlobalWithConfig;
if (g.CONFIG_TYPE === "DEVELOPMENT") {
  g.CONFIG_TYPE = "CODEX";
}

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "Opus2 Codex",
    brandUrl: "./",
    brandImage: "/opus2-logo.png",
    brandTarget: "_self",
  }),
});
