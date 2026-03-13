import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "Opus2 Codex",
    brandUrl: "./",
    brandImage: "/opus2-logo.png",
    brandTarget: "_self",
  }),
});
