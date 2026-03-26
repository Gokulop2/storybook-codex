import type { ComponentType, FC, ReactNode } from "react";
import {
  AppGalleryButton,
  AppGalleryOutlineButton,
  AppStoreButton,
  AppStoreOutlineButton,
  GalaxyStoreButton,
  GalaxyStoreOutlineButton,
  GooglePlayButton,
  GooglePlayOutlineButton,
  GooglePlayWhiteButton,
} from "@opus2-platform/codex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { UntitledDocsBreadcrumb } from "../_docs/untitled-docs-breadcrumb";
import { DOCS_SECTION_CLASS, DOCS_SECTION_HERO_CLASS, DocsSection, SectionTitle } from "../_docs/untitled-docs-preview-code";
import { OnThisPageNav, StorybookRootHeaderPortal, StorybookSbdocsTocPortal } from "../_docs/untitled-docs-scaffold";

const HERO_PREVIEW_SURFACE_CLASS =
  "outline-focus-ring bg-primary relative flex min-h-[320px] max-w-full items-center justify-center rounded-[20px] py-32 ring-1 ring-inset ring-secondary focus-visible:outline-2 focus-visible:outline-offset-2 md:min-w-[520px]";

/** Shared layout for md + lg side-by-side previews */
const FLEX_ROW_GAP4 = "flex flex-wrap items-center justify-center gap-4";

type StoreBadge = ComponentType<{ size?: "md" | "lg" }>;

function MdLgPair({ children }: { children: (size: "md" | "lg") => ReactNode }) {
  return (
    <div className={FLEX_ROW_GAP4}>
      {children("md")}
      {children("lg")}
    </div>
  );
}

const mdLg = (Component: StoreBadge) => () => <MdLgPair>{(s) => <Component size={s} />}</MdLgPair>;

const IMPORT_FILLED = `import {
  AppGalleryButton,
  AppStoreButton,
  GalaxyStoreButton,
  GooglePlayButton,
  GooglePlayWhiteButton,
} from "@opus2-platform/codex";`;

const IMPORT_OUTLINE = `import {
  AppGalleryOutlineButton,
  AppStoreOutlineButton,
  GalaxyStoreOutlineButton,
  GooglePlayOutlineButton,
} from "@opus2-platform/codex";`;

const CODE = {
  hero: `${IMPORT_FILLED}

<div className="flex flex-wrap items-center justify-center gap-3">
  <GooglePlayButton />
  <AppStoreButton />
  <GalaxyStoreButton />
  <AppGalleryButton />
</div>`,
  googlePlay: `${IMPORT_FILLED}

<div className="flex flex-col gap-8">
  <div className="flex flex-wrap items-center justify-center gap-4">
    <GooglePlayButton size="md" />
    <GooglePlayButton size="lg" />
  </div>
  <div className="flex flex-wrap items-center justify-center gap-4">
    <GooglePlayWhiteButton size="md" />
    <GooglePlayWhiteButton size="lg" />
  </div>
</div>`,
  appStore: `${IMPORT_FILLED}

<div className="flex flex-wrap items-center justify-center gap-4">
  <AppStoreButton size="md" />
  <AppStoreButton size="lg" />
</div>`,
  galaxy: `${IMPORT_FILLED}

<div className="flex flex-wrap items-center justify-center gap-4">
  <GalaxyStoreButton size="md" />
  <GalaxyStoreButton size="lg" />
</div>`,
  appGallery: `${IMPORT_FILLED}

<div className="flex flex-wrap items-center justify-center gap-4">
  <AppGalleryButton size="md" />
  <AppGalleryButton size="lg" />
</div>`,
  outlineGoogle: `${IMPORT_OUTLINE}

<div className="flex flex-wrap items-center justify-center gap-4">
  <GooglePlayOutlineButton size="md" />
  <GooglePlayOutlineButton size="lg" />
</div>`,
  outlineAppStore: `${IMPORT_OUTLINE}

<div className="flex flex-wrap items-center justify-center gap-4">
  <AppStoreOutlineButton size="md" />
  <AppStoreOutlineButton size="lg" />
</div>`,
  outlineGalaxy: `${IMPORT_OUTLINE}

<div className="flex flex-wrap items-center justify-center gap-4">
  <GalaxyStoreOutlineButton size="md" />
  <GalaxyStoreOutlineButton size="lg" />
</div>`,
  outlineAppGallery: `${IMPORT_OUTLINE}

<div className="flex flex-wrap items-center justify-center gap-4">
  <AppGalleryOutlineButton size="md" />
  <AppGalleryOutlineButton size="lg" />
</div>`,
} as const;

const TOC = [
  { id: "mobile-app-store-buttons-example", label: "Mobile app store buttons example" },
  { id: "mobile-app-store-buttons-examples", label: "Mobile app store button examples" },
  { id: "google-play-buttons", label: "Google play buttons" },
  { id: "app-store-buttons", label: "App store buttons" },
  { id: "galaxy-store-buttons", label: "Galaxy store buttons" },
  { id: "app-gallery-buttons", label: "App gallery buttons" },
  { id: "outline-button-examples", label: "Outline button examples" },
  { id: "google-play-outline-buttons", label: "Google play outline buttons" },
  { id: "app-store-outline-buttons", label: "App store outline buttons" },
  { id: "galaxy-store-outline-buttons", label: "Galaxy store outline buttons" },
  { id: "app-gallery-outline-buttons", label: "App gallery outline buttons" },
] as const;

const HeroDemo: FC = () => (
  <div className="flex flex-wrap items-center justify-center gap-3">
    <GooglePlayButton />
    <AppStoreButton />
    <GalaxyStoreButton />
    <AppGalleryButton />
  </div>
);

const GooglePlayDemo: FC = () => (
  <div className="flex flex-col gap-8">
    <MdLgPair>{(s) => <GooglePlayButton size={s} />}</MdLgPair>
    <MdLgPair>{(s) => <GooglePlayWhiteButton size={s} />}</MdLgPair>
  </div>
);

const AppStoreDemo = mdLg(AppStoreButton);
const GalaxyDemo = mdLg(GalaxyStoreButton);
const AppGalleryDemo = mdLg(AppGalleryButton);
const OutlineGoogleDemo = mdLg(GooglePlayOutlineButton);
const OutlineAppStoreDemo = mdLg(AppStoreOutlineButton);
const OutlineGalaxyDemo = mdLg(GalaxyStoreOutlineButton);
const OutlineAppGalleryDemo = mdLg(AppGalleryOutlineButton);

const MobileAppStoreButtonsDocsPage: FC = () => (
  <div className="bg-primary min-h-screen font-sans" data-codex-docs-mobile-app-store-buttons>
    <StorybookRootHeaderPortal>
      <UntitledDocsBreadcrumb currentLabel="Mobile app store buttons" />
    </StorybookRootHeaderPortal>
    <StorybookSbdocsTocPortal>
      <OnThisPageNav items={TOC} />
    </StorybookSbdocsTocPortal>

    <main className="relative mx-auto flex w-full max-w-304 min-w-0 flex-1 flex-col">
      <div className="text-tertiary w-full min-w-0">
        <div className="mb-10">
          <div className="pb-3">
            <h1 className="text-primary md:text-display-xs max-w-3xl text-xl font-semibold">Mobile app store button components</h1>
          </div>
          <p className="text-md text-tertiary mt-0 max-w-3xl whitespace-pre-line">
            React mobile app store button components for marketing pages and footers. Built with accessible anchors and Codex design tokens.
          </p>
        </div>

        <DocsSection
          id="mobile-app-store-buttons-example"
          title="Mobile app store buttons example"
          code={CODE.hero}
          sectionClassName={DOCS_SECTION_HERO_CLASS}
          dataPreview
          previewClassName={HERO_PREVIEW_SURFACE_CLASS}
        >
          <HeroDemo />
        </DocsSection>

        <section id="mobile-app-store-buttons-examples" className={`scroll-mt-20 ${DOCS_SECTION_CLASS}`}>
          <h2 className="text-primary text-lg font-semibold md:text-xl">
            <SectionTitle className="text-lg font-semibold md:text-xl">Mobile app store button examples</SectionTitle>
          </h2>
          <p className="text-md text-tertiary mt-2 max-w-3xl">
            Below are examples and variations of the mobile app store button components.
          </p>
        </section>

        <DocsSection id="google-play-buttons" title="Google play buttons" code={CODE.googlePlay}>
          <GooglePlayDemo />
        </DocsSection>

        <DocsSection id="app-store-buttons" title="App store buttons" code={CODE.appStore}>
          <AppStoreDemo />
        </DocsSection>

        <DocsSection id="galaxy-store-buttons" title="Galaxy store buttons" code={CODE.galaxy}>
          <GalaxyDemo />
        </DocsSection>

        <DocsSection id="app-gallery-buttons" title="App gallery buttons" code={CODE.appGallery}>
          <AppGalleryDemo />
        </DocsSection>

        <section id="outline-button-examples" className={`scroll-mt-20 ${DOCS_SECTION_CLASS}`}>
          <h2 className="text-primary text-lg font-semibold md:text-xl">
            <SectionTitle className="text-lg font-semibold md:text-xl">Outline button examples</SectionTitle>
          </h2>
          <p className="text-md text-tertiary mt-2 max-w-3xl">Outline variants for light backgrounds.</p>
        </section>

        <DocsSection id="google-play-outline-buttons" title="Google play outline buttons" code={CODE.outlineGoogle}>
          <OutlineGoogleDemo />
        </DocsSection>

        <DocsSection id="app-store-outline-buttons" title="App store outline buttons" code={CODE.outlineAppStore}>
          <OutlineAppStoreDemo />
        </DocsSection>

        <DocsSection id="galaxy-store-outline-buttons" title="Galaxy store outline buttons" code={CODE.outlineGalaxy}>
          <OutlineGalaxyDemo />
        </DocsSection>

        <DocsSection id="app-gallery-outline-buttons" title="App gallery outline buttons" code={CODE.outlineAppGallery}>
          <OutlineAppGalleryDemo />
        </DocsSection>
      </div>
    </main>
  </div>
);

const meta = {
  title: "Mobile app store buttons",
  component: GooglePlayButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: MobileAppStoreButtonsDocsPage,
    },
  },
} satisfies Meta<typeof GooglePlayButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Mobile app store buttons",
  render: () => <HeroDemo />,
};
