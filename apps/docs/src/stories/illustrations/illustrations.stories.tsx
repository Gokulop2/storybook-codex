import type { ComponentProps, FC } from "react";
import { Illustration } from "@opus2-platform/codex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DocsPageBreadcrumb } from "../_docs/docs-page-breadcrumb";
import { DOCS_PREVIEW_HERO_SURFACE_CLASS, DOCS_SECTION_HERO_CLASS, DocsSection } from "../_docs/docs-preview-code";
import { OnThisPageNav, StorybookRootHeaderPortal, StorybookSbdocsTocPortal } from "../_docs/docs-scaffold";

type IllustrationType = NonNullable<ComponentProps<typeof Illustration>["type"]>;
type IllustrationSize = NonNullable<ComponentProps<typeof Illustration>["size"]>;
type IllustrationDemoProps = ComponentProps<typeof Illustration>;

/** Hero + Default story — single source of truth */
const HERO = { type: "box", size: "md" } as const satisfies { type: IllustrationType; size: IllustrationSize };

const VARIANT_DEFS = [
  { type: "box", label: "Box" },
  { type: "cloud", label: "Cloud" },
  { type: "documents", label: "Documents" },
  { type: "credit-card", label: "Credit card" },
] as const satisfies readonly { type: IllustrationType; label: string }[];

const SIZES = ["sm", "md", "lg"] as const satisfies readonly IllustrationSize[];

const SECTIONS = VARIANT_DEFS.flatMap(({ type, label }) =>
  SIZES.map((size) => ({
    id: `${type}-${size}`,
    title: `${label} ${size}`,
    type,
    size,
  }))
);

const snippet = (type: IllustrationType, size: IllustrationSize) =>
  `import { Illustration } from "@/components/shared-assets/illustrations";\n \n<Illustration type="${type}" size="${size}" />`;

const TOC = [{ id: "illustration-example", label: "Illustration example" }, ...SECTIONS.map((s) => ({ id: s.id, label: s.title }))];

const IllustrationWell: FC<IllustrationDemoProps & { variant?: "hero" | "section" }> = ({ variant = "section", ...props }) => (
  <div className={variant === "hero" ? "flex items-center justify-center" : "flex justify-center py-4"}>
    <Illustration {...props} />
  </div>
);

const IllustrationsDocsPage: FC = () => (
  <div className="bg-primary min-h-screen font-sans" data-codex-docs-illustrations>
    <StorybookRootHeaderPortal>
      <DocsPageBreadcrumb currentLabel="Illustrations" />
    </StorybookRootHeaderPortal>
    <StorybookSbdocsTocPortal>
      <OnThisPageNav items={TOC} />
    </StorybookSbdocsTocPortal>

    <main className="relative mx-auto flex w-full max-w-304 min-w-0 flex-1 flex-col">
      <div className="text-tertiary w-full min-w-0">
        <div className="mb-10">
          <div className="pb-3">
            <h1 className="text-primary md:text-display-xs max-w-3xl text-xl font-semibold">Illustration components</h1>
          </div>
          <p className="text-md text-tertiary mt-0 max-w-3xl whitespace-pre-line">
            React illustration components for empty states, onboarding, and marketing layouts. Built with Tailwind CSS and the Codex design tokens.
          </p>
        </div>

        <DocsSection
          id="illustration-example"
          title="Illustration example"
          code={snippet(HERO.type, HERO.size)}
          sectionClassName={DOCS_SECTION_HERO_CLASS}
          dataPreview
          previewClassName={DOCS_PREVIEW_HERO_SURFACE_CLASS}
        >
          <IllustrationWell variant="hero" type={HERO.type} size={HERO.size} />
        </DocsSection>

        {SECTIONS.map((s) => (
          <DocsSection key={s.id} id={s.id} title={s.title} code={snippet(s.type, s.size)}>
            <IllustrationWell type={s.type} size={s.size} />
          </DocsSection>
        ))}
      </div>
    </main>
  </div>
);

const meta = {
  title: "Base components/Illustrations",
  component: Illustration,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: IllustrationsDocsPage,
    },
  },
} satisfies Meta<typeof Illustration>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  tags: ["!dev"],
  name: "Illustrations",
  args: { ...HERO },
};
