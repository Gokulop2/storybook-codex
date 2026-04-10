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
      /**
       * Storybook matches the first path segment against top-level `order` entries.
       * Do not wrap `"Base components"` in an extra array — otherwise `indexOf("Base components")` fails,
       * `alphabetical` ties "Application UI" with "Base components", and "Application" sorts first.
       *
       * Leaf arrays use the segment after `Base components/` or `Application UI/` — must stay aligned with
       * `BASE_COMPONENT_STORY_TITLES_ORDERED` and `APPLICATION_UI_STORY_TITLES_ORDERED`.
       */
      storySort: {
        method: "configure",
        order: [
          "Overview",
          "Base components",
          [
            "Avatars",
            "Badge groups",
            "Badges",
            "Button groups",
            "Button",
            "Checkboxes",
            "Credit cards",
            "Dropdowns",
            "Featured icons",
            "Illustrations",
            "Inputs",
            "Mobile app store buttons",
            "Progress indicators",
            "QR codes",
            "Radio buttons",
            "Radio groups",
            "Rating badge and stars",
            "Text editors",
            "Select",
            "Multi-select",
            "Sliders",
            "Social buttons",
            "Tags",
            "Textarea",
            "Toggles",
            "Tooltips",
            "Utility buttons",
            "Verification code inputs",
            "Video players",
          ],
          "Application UI",
          [
            "Activity feed",
            "Alerts",
            "Breadcrumbs",
            "Color picker",
            "Notifications",
            "Progress steps",
            "Sidebar navigations",
          ],
          "*",
        ],
      },
      // Hide Storybook's default preview toolbar; page-level header controls are rendered in docs pages.
      showToolbar: false,
    },
  },
};

export default preview;
