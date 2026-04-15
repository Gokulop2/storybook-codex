import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.tsx"],
  dts: false,
  format: ["esm"],
  outDir: "dist",
  treeshake: true
});
