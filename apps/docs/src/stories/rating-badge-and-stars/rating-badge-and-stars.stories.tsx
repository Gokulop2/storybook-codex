import type { FC, ReactNode } from "react";
import { RatingBadge, RatingStars } from "@opus2-platform/codex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { UntitledDocsBreadcrumb } from "../_docs/untitled-docs-breadcrumb";
import { DOCS_PREVIEW_SURFACE_CLASS, DOCS_SECTION_HERO_CLASS, DocsSection, SectionTitle } from "../_docs/untitled-docs-preview-code";
import { OnThisPageNav, StorybookRootHeaderPortal, StorybookSbdocsTocPortal } from "../_docs/untitled-docs-scaffold";

const HERO_PREVIEW_SURFACE_CLASS =
  "outline-focus-ring bg-primary relative flex min-h-[320px] max-w-full items-center justify-center rounded-[20px] py-32 ring-1 ring-inset ring-secondary focus-visible:outline-2 focus-visible:outline-offset-2 md:min-w-[520px]";

const SECTION_PREVIEW = `${DOCS_PREVIEW_SURFACE_CLASS} items-start! justify-start! px-6 py-10 md:min-w-130`.trim();

const IMPORT_STARS = `import { RatingStars } from "@opus2-platform/codex";`;
const IMPORT_BADGE = `import { RatingBadge } from "@opus2-platform/codex";`;

const CODE = {
  hero: `${IMPORT_BADGE}

<RatingBadge />`,
  ratingStars: `${IMPORT_STARS}

<RatingStars rating={4} />`,
  ratingBadge: `${IMPORT_BADGE}

<RatingBadge
  title="Best Design Tool"
  subtitle="2,000+ reviews"
  rating={5}
/>`,
} as const;

const TOC = [
  { id: "rating-badge-example", label: "Rating badge example" },
  { id: "rating-examples-intro", label: "Rating badge and stars examples" },
  { id: "rating-stars", label: "Rating stars" },
  { id: "rating-badge", label: "Rating badge" },
] as const;

const codeClass = "text-secondary font-mono text-sm";

const SectionPreview: FC<{ children: ReactNode }> = ({ children }) => <div className="flex w-full justify-center px-2">{children}</div>;

const RatingStarsVariantsDemo: FC = () => (
  <div className="flex flex-col items-start gap-6">
    <RatingStars rating={0} />
    <RatingStars rating={2.5} />
    <RatingStars rating={4} />
    <RatingStars rating={5} />
  </div>
);

const RatingBadgeDocsPage: FC = () => (
  <div className="bg-primary min-h-screen font-sans" data-codex-docs-rating-badge-and-stars>
    <StorybookRootHeaderPortal>
      <UntitledDocsBreadcrumb currentLabel="Rating badge and stars" />
    </StorybookRootHeaderPortal>
    <StorybookSbdocsTocPortal>
      <OnThisPageNav items={TOC} />
    </StorybookSbdocsTocPortal>

    <main className="relative mx-auto flex w-full max-w-304 min-w-0 flex-1 flex-col">
      <div className="text-tertiary w-full min-w-0">
        <div className="mb-10">
          <div className="pb-3">
            <h1 className="text-primary md:text-display-xs max-w-3xl text-xl font-semibold">Rating badge and stars</h1>
          </div>
          <p className="text-md text-tertiary mt-0 max-w-3xl whitespace-pre-line">
            React rating badge and star components built for modern applications and websites. These components are styled with Tailwind CSS and work with Codex
            tokens.
          </p>
        </div>

        <DocsSection
          id="rating-badge-example"
          title="Rating badge example"
          code={CODE.hero}
          sectionClassName={DOCS_SECTION_HERO_CLASS}
          dataPreview
          previewClassName={HERO_PREVIEW_SURFACE_CLASS}
        >
          <SectionPreview>
            <RatingBadge />
          </SectionPreview>
        </DocsSection>

        <section id="rating-examples-intro" className="scroll-mt-20 pb-2">
          <h2 className="text-primary text-lg font-semibold md:text-xl">
            <SectionTitle className="text-lg font-semibold md:text-xl">Rating badge and stars examples</SectionTitle>
          </h2>
          <p className="text-md text-tertiary mt-2 max-w-3xl">Below are examples and variations of this rating badge and stars component:</p>
        </section>

        <DocsSection
          id="rating-stars"
          title="Rating stars"
          code={CODE.ratingStars}
          previewClassName={SECTION_PREVIEW}
          description={
            <p>
              Rating stars show a score out of five. Set <code className={codeClass}>rating</code> between <code className={codeClass}>0</code> and{" "}
              <code className={codeClass}>5</code> (fractional values are supported).
            </p>
          }
        >
          <SectionPreview>
            <RatingStarsVariantsDemo />
          </SectionPreview>
        </DocsSection>

        <DocsSection
          id="rating-badge"
          title="Rating badge"
          code={CODE.ratingBadge}
          previewClassName={SECTION_PREVIEW}
          description={
            <p>
              The rating badge combines laurels, stars, and copy—ideal for awards and review summaries. Customize <code className={codeClass}>title</code>,{" "}
              <code className={codeClass}>subtitle</code>, and <code className={codeClass}>rating</code>.
            </p>
          }
        >
          <SectionPreview>
            <div className="flex w-full max-w-lg flex-col items-center gap-10">
              <RatingBadge title="Best Design Tool" subtitle="2,000+ reviews" rating={5} />
              <div className="bg-brand-solid rounded-xl px-8 py-6">
                <RatingBadge theme="light" title="Best Design Tool" subtitle="2,000+ reviews" rating={4.5} />
              </div>
            </div>
          </SectionPreview>
        </DocsSection>
      </div>
    </main>
  </div>
);

const meta = {
  title: "Rating badge and stars",
  component: RatingStars,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: RatingBadgeDocsPage,
    },
  },
} satisfies Meta<typeof RatingStars>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Rating badge and stars",
  args: {
    rating: 4,
  },
};
