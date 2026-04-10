/**
 * Overview grid: story id prefix (Storybook index), display name, variant blurb, optional static preview filename in `apps/docs/public/`.
 * Order matches sidebar / `index.json` sort for Application UI components.
 */
import { baseComponentTitleToStoryIdPrefix } from "./base-components-overview-data";

export type ApplicationUiOverviewCard = {
  storyIdPrefix: string;
  name: string;
  variants: string;
  /** Filename in `public/`; omit for placeholder preview. */
  image?: string;
};

const APPLICATION_UI_CATALOG_ENTRIES = [
  {
    title: "Application UI/Activity feed",
    name: "Activity feed",
    variants: "1 component + 3 spacing variants",
    image: "Activity feeds.webp",
  },
  { title: "Application UI/Alerts", name: "Alerts", variants: "1 component + 4 variants", image: "Alerts.webp" },
  {
    title: "Application UI/Breadcrumbs",
    name: "Breadcrumbs",
    variants: "1 component + 4 variants",
    image: "Breadcrumbs.webp",
  },
  {
    title: "Application UI/Color picker",
    name: "Color picker",
    variants: "1 component + variants",
    image: "Color pickers.webp",
  },
  {
    title: "Application UI/Notifications",
    name: "Notifications",
    variants: "1 component + 4 variants",
    image: "Messaging.webp",
  },
  {
    title: "Application UI/Progress steps",
    name: "Progress steps",
    variants: "1 component + 6 variants",
    image: "Loading indicators.webp",
  },
  {
    title: "Application UI/Sidebar navigations",
    name: "Sidebar navigations",
    variants: "Compose + 6 variants",
    image: "Header navigations.webp",
  },
] as const;

/**
 * Ordered `meta.title` values — drives Application UI sidebar order via `storySort` in `apps/docs/.storybook/preview.tsx`
 * (leaf segment list under `Application UI`).
 */
export const APPLICATION_UI_STORY_TITLES_ORDERED: readonly string[] = APPLICATION_UI_CATALOG_ENTRIES.map((e) => e.title);

export const APPLICATION_UI_OVERVIEW_CARDS: readonly ApplicationUiOverviewCard[] = APPLICATION_UI_CATALOG_ENTRIES.map((e) => ({
  storyIdPrefix: baseComponentTitleToStoryIdPrefix(e.title),
  name: e.name,
  variants: e.variants,
  image: e.image,
}));
