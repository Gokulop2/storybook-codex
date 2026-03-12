import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import storybook from "eslint-plugin-storybook";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";

export default defineConfig([
  globalIgnores(["dist"]),
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: [require("node:path").resolve(__dirname, "tsconfig.base.json"), require("node:path").resolve(__dirname, "packages/ui/tsconfig.json")],
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: globals.browser,
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react,
      import: importPlugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "import/no-unresolved": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  prettier,
  ...storybook.configs["flat/recommended"],
]);
