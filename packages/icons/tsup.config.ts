import baseConfig from "../../tsup.config.base";
import { defineConfig } from "tsup";

export default defineConfig({
  ...baseConfig,
  dts: false,
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["esm", "cjs"],
  outExtension({ format }) {
    return format === "esm" ? { js: ".es.js" } : { js: ".cjs.js" };
  },
});
