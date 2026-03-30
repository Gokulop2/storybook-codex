/**
 * Overview grid: story id prefix (Storybook index), display name, variant blurb, optional static preview filename in `apps/docs/public/`.
 * Order matches sidebar / `index.json` sort for Base components.
 */
export type BaseComponentOverviewCard = {
  storyIdPrefix: string;
  name: string;
  variants: string;
  /** Filename in `public/`; omit for placeholder preview. */
  image?: string;
};

export const BASE_COMPONENT_OVERVIEW_CARDS: readonly BaseComponentOverviewCard[] = [
  { storyIdPrefix: "base-components-avatars", name: "Avatars", variants: "3 components + 11 variants", image: "Avatars.png" },
  { storyIdPrefix: "base-components-badge-groups", name: "Badge groups", variants: "1 component + 20 variants", image: "Badge groups.png" },
  { storyIdPrefix: "base-components-badges", name: "Badges", variants: "1 component + 25 variants", image: "Badges.png" },
  { storyIdPrefix: "base-components-button", name: "Buttons", variants: "1 component + 13 variants", image: "Buttons.png" },
  { storyIdPrefix: "base-components-button-groups", name: "Button groups", variants: "1 component + 6 variants", image: "Button groups.png" },
  { storyIdPrefix: "base-components-checkboxes", name: "Checkboxes", variants: "1 component + 5 variants", image: "Checkboxes.png" },
  { storyIdPrefix: "base-components-credit-cards", name: "Credit cards", variants: "1 component + variants", image: "Credit cards.png" },
  { storyIdPrefix: "base-components-dropdowns", name: "Dropdowns", variants: "1 component + 3 variants", image: "Dropdowns.png" },
  { storyIdPrefix: "base-components-featured-icons", name: "Featured icons", variants: "1 component + 6 variants", image: "Featured icons.png" },
  { storyIdPrefix: "base-components-illustrations", name: "Illustrations", variants: "Illustrations + variants", image: "Illustrations.png" },
  { storyIdPrefix: "base-components-inputs", name: "Inputs", variants: "1 component + 10 variants", image: "Inputs.png" },
  { storyIdPrefix: "base-components-mobile-app-store-buttons", name: "Mobile app store buttons", variants: "Store badges + variants", image: "Mobile app store buttons.png" },
  { storyIdPrefix: "base-components-multi-select", name: "Multi-select", variants: "1 component + variants", image: undefined },
  { storyIdPrefix: "base-components-progress-indicators", name: "Progress indicators", variants: "2 components + 9 variants", image: "Progress indicators.png" },
  { storyIdPrefix: "base-components-qr-codes", name: "QR codes", variants: "1 component + variants", image: "QR codes.png" },
  { storyIdPrefix: "base-components-radio-buttons", name: "Radio buttons", variants: "1 component + 5 variants", image: "Radio buttons.png" },
  { storyIdPrefix: "base-components-radio-groups", name: "Radio groups", variants: "1 component + variants", image: "Radio groups.png" },
  { storyIdPrefix: "base-components-rating-badge-and-stars", name: "Rating badge and stars", variants: "1 component + variants", image: "Rating badge and stars.png" },
  { storyIdPrefix: "base-components-select", name: "Select", variants: "1 component + variants", image: "Select.png" },
  { storyIdPrefix: "base-components-sliders", name: "Sliders", variants: "1 component + 4 variants", image: "Sliders.png" },
  { storyIdPrefix: "base-components-social-buttons", name: "Social buttons", variants: "1 component + variants", image: "Social buttons.png" },
  { storyIdPrefix: "base-components-tags", name: "Tags", variants: "1 component + variants", image: "Tags.png" },
  { storyIdPrefix: "base-components-text-editors", name: "Text editors", variants: "1 component + variants", image: "Text editors.png" },
  { storyIdPrefix: "base-components-textarea", name: "Textareas", variants: "1 component + 3 variants", image: "Textarea.png" },
  { storyIdPrefix: "base-components-toggles", name: "Toggles", variants: "1 component + 7 variants", image: "Toggles.png" },
  { storyIdPrefix: "base-components-tooltips", name: "Tooltips", variants: "1 component + 11 variants", image: "Tooltips.png" },
  { storyIdPrefix: "base-components-utility-buttons", name: "Utility buttons", variants: "1 component + variants", image: "Utility buttons.png" },
  { storyIdPrefix: "base-components-verification-code-inputs", name: "Verification code inputs", variants: "1 component + variants", image: "Verification code inputs.png" },
  { storyIdPrefix: "base-components-video-players", name: "Video players", variants: "1 component + variants", image: "Video players.png" },
];
