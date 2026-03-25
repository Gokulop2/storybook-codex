import type { Preview } from "@storybook/react-vite";

import "../src/styles.css";

const preview: Preview = {
  parameters: {
    docs: {
      // Render docs stories inline so docs pages do not use embedded iframes.
      inlineStories: true,
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
        order: ["Overview", "*"],
        method: "alphabetical",
      },
      // Hide Storybook's default preview toolbar; page-level header controls are rendered in docs pages.
      showToolbar: false,
    },
  },
};

export default preview;
