import type { Preview } from "@storybook/react-vite";
import { create } from "storybook/theming";

import "../src/styles.css";

const codexTheme = create({
  base: "light",
  fontBase: '"Inter", -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
  fontCode: 'ui-monospace, "Roboto Mono", SFMono-Regular, Menlo, Monaco, Consolas, "Courier New", monospace',
});

const preview: Preview = {
  parameters: {
    docs: {
      // Render docs stories inline so docs pages do not use embedded iframes.
      inlineStories: true,
      theme: codexTheme,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      // Overview first in the sidebar (directly under search), then all other roots (e.g. Button).
      storySort: {
        order: ["Overview", "Base components", "*"],
        method: "alphabetical",
      },
      // Hide Storybook's default preview toolbar; page-level header controls are rendered in docs pages.
      showToolbar: false,
    },
  },
};

export default preview;
