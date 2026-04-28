/**
 * Base components overview grid + sidebar order.
 * Order and variant blurbs align with the public React base catalog (same grouping and sequence as that index).
 * Story `title` must match each file’s `meta.title` exactly so `storyIdPrefix` matches Storybook IDs.
 */

export type BaseComponentOverviewCard = {
  storyIdPrefix: string;
  name: string;
  variants: string;
  /** Filename in `public/`; omit for placeholder preview. */
  image?: string;
};

/** Mirrors Storybook’s id segment for `meta.title` (e.g. `Base components/Button` → `base-components-button`). */
export function baseComponentTitleToStoryIdPrefix(title: string): string {
  return title
    .split("/")
    .map((part) => part.trim().toLowerCase().replace(/\s+/g, "-"))
    .join("-");
}

const BASE_COMPONENT_CATALOG_ENTRIES = [
  { title: "Base components/Avatars", name: "Avatars", variants: "3 components + 11 variants", image: "Avatars.png" },
  { title: "Base components/Badge groups", name: "Badge groups", variants: "1 component + 20 variants", image: "Badge groups.png" },
  { title: "Base components/Badges", name: "Badges", variants: "1 component + 25 variants", image: "Badges.png" },
  { title: "Base components/Button groups", name: "Button groups", variants: "1 component + 6 variants", image: "Button groups.png" },
  { title: "Base components/Button", name: "Buttons", variants: "1 component + 13 variants", image: "Buttons.png" },
  { title: "Base components/Checkboxes", name: "Checkboxes", variants: "1 component + 5 variants", image: "Checkboxes.png" },
  { title: "Base components/Credit cards", name: "Credit cards", variants: "1 component + 13 variants", image: "Credit cards.png" },
  { title: "Base components/Dropdowns", name: "Dropdowns", variants: "1 component + 3 variants", image: "Dropdowns.png" },
  { title: "Base components/Featured icons", name: "Featured icons", variants: "1 component + 6 variants", image: "Featured icons.png" },
  { title: "Base components/Illustrations", name: "Illustrations", variants: "1 component + 13 variants", image: "Illustrations.png" },
  { title: "Base components/Inputs", name: "Inputs", variants: "1 component + 10 variants", image: "Inputs.png" },
  {
    title: "Base components/Mobile app store buttons",
    name: "Mobile app store buttons",
    variants: "1 component + 8 variants",
    image: "Mobile app store buttons.png",
  },
  { title: "Base components/Progress indicators", name: "Progress indicators", variants: "2 components + 9 variants", image: "Progress indicators.png" },
  { title: "Base components/QR codes", name: "QR codes", variants: "1 component + 4 variants", image: "QR codes.png" },
  { title: "Base components/Radio buttons", name: "Radio buttons", variants: "1 component + 5 variants", image: "Radio buttons.png" },
  { title: "Base components/Radio groups", name: "Radio groups", variants: "5 components", image: "Radio groups.png" },
  { title: "Base components/Rating badge and stars", name: "Rating badge and stars", variants: "3 components", image: "Rating badge and stars.png" },
  { title: "Base components/Text editors", name: "Rich text editors", variants: "1 component + 5 variants", image: "Text editors.png" },
  { title: "Base components/Select", name: "Select", variants: "1 component + 7 variants", image: "Select.png" },
  { title: "Base components/Multi-select", name: "Multi select", variants: "1 component + 4 variants", image: undefined },
  { title: "Base components/Sliders", name: "Sliders", variants: "1 component + 4 variants", image: "Sliders.png" },
  { title: "Base components/Social buttons", name: "Social buttons", variants: "1 component + 12 variants", image: "Social buttons.png" },
  { title: "Base components/Tags", name: "Tags", variants: "1 component + variants", image: "Tags.png" },
  { title: "Base components/Textarea", name: "Textareas", variants: "1 component + 3 variants", image: "Textarea.png" },
  { title: "Base components/Toggles", name: "Toggles", variants: "1 component + 7 variants", image: "Toggles.png" },
  { title: "Base components/Tooltips", name: "Tooltips", variants: "1 component + 11 variants", image: "Tooltips.png" },
  { title: "Base components/Utility buttons", name: "Utility buttons", variants: "2 components + 5 variants", image: "Utility buttons.png" },
  {
    title: "Base components/Verification code inputs",
    name: "Verification code inputs",
    variants: "1 component + 4 variants",
    image: "Verification code inputs.png",
  },
  { title: "Base components/Video players", name: "Video players", variants: "1 component + 3 variants", image: "Video players.png" },
] as const;

/**
 * Ordered `meta.title` values — drives sidebar order via `storySort` in `apps/docs/.storybook/preview.tsx`
 * (leaf segment list under `Base components`) and must stay aligned with `BASE_COMPONENT_CATALOG_ENTRIES` below.
 */
export const BASE_COMPONENT_STORY_TITLES_ORDERED: readonly string[] = BASE_COMPONENT_CATALOG_ENTRIES.map((e) => e.title);

/**
 * Keep overview cards aligned with visible docs catalog (exclude stories tagged as `hidden`).
 * Sidebar visibility is handled by Storybook tags in story files; this prevents static overview cards
 * from showing entries that are intentionally hidden from navigation/search.
 */
const HIDDEN_BASE_COMPONENT_TITLES = new Set<string>([
  "Base components/Credit cards",
  "Base components/Mobile app store buttons",
  "Base components/QR codes",
  "Base components/Rating badge and stars",
  "Base components/Social buttons",
  "Base components/Verification code inputs",
  "Base components/Video players",
]);

export const BASE_COMPONENT_OVERVIEW_CARDS: readonly BaseComponentOverviewCard[] = BASE_COMPONENT_CATALOG_ENTRIES
  .filter((e) => !HIDDEN_BASE_COMPONENT_TITLES.has(e.title))
  .map((e) => ({
    storyIdPrefix: baseComponentTitleToStoryIdPrefix(e.title),
    name: e.name,
    variants: e.variants,
    image: e.image,
  }));
