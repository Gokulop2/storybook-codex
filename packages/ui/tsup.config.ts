import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*@(ts|tsx)"],
  dts: false,
  format: ["esm"],
  outDir: "dist",
  treeshake: true
});
