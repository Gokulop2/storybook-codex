import { defineConfig } from 'tsup';

export default defineConfig({
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  skipNodeModulesBundle: true,
  splitting: false,
  sourcemap: false,
  minify: false,
  external: ['react', 'react-dom'],
});
