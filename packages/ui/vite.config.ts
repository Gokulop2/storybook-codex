
import dts from "vite-plugin-dts";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "@opus2-platform/icons"],
    },
    outDir: "dist",
    emptyOutDir: true,
  },
  plugins: [
    react(),
    tailwindcss(),
    dts({ entryRoot: "src", outDir: "dist" }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
