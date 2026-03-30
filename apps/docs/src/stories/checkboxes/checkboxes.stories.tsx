import type { FC } from "react";
import { Checkbox } from "@opus2-platform/codex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK_TIGHT,
  DOCS_PREVIEW_SURFACE_CLASS,
  DOCS_SECTION_HERO_CLASS,
  type DocsSectionProps,
  DocsSection,
  SectionTitle,
} from "../_docs/docs-preview-code";
import { DocsPageBreadcrumb } from "../_docs/docs-page-breadcrumb";
import { OnThisPageNav, StorybookRootHeaderPortal, StorybookSbdocsTocPortal } from "../_docs/docs-scaffold";

/** Checkbox docs: centered preview well (Storybook flex overrides). */
const CHECKBOX_PREVIEW_SURFACE_CLASS = `${DOCS_PREVIEW_SURFACE_CLASS} items-center! justify-center!`.trim();

const CheckboxDocsSection: FC<DocsSectionProps> = ({ previewClassName, ...rest }) => (
  <DocsSection {...rest} previewClassName={previewClassName ?? CHECKBOX_PREVIEW_SURFACE_CLASS} />
);

const TOC = [
  { id: "checkbox-example", label: "Checkbox example" },
  { id: "checkbox-examples", label: "Checkbox examples" },
  { id: "base", label: "Base" },
  { id: "with-label", label: "With label" },
  { id: "with-label-and-hint", label: "With label and hint" },
  { id: "disabled", label: "Disabled" },
  { id: "sizes", label: "Sizes" },
] as const;

const CODE = {
  hero: `import { Checkbox } from "@opus2-platform/codex";\n\n<Checkbox\n  label="Remember me"\n  hint="Save my login details for next time."\n/>`,
  base: `import { Checkbox } from "@opus2-platform/codex";\n\n<Checkbox />`,
  withLabel: `import { Checkbox } from "@opus2-platform/codex";\n\n<Checkbox label="Remember me" />`,
  withLabelHint: `import { Checkbox } from "@opus2-platform/codex";\n\n<Checkbox\n  label="Remember me"\n  hint="Save my login details for next time."\n/>`,
  disabled: `import { Checkbox } from "@opus2-platform/codex";\n\n<Checkbox\n  label="Remember me"\n  hint="Save my login details for next time."\n  isDisabled\n/>`,
  sizes: `import { Checkbox } from "@opus2-platform/codex";\n\n<Checkbox size="sm" label="Remember me" hint="Save my login details for next time." />\n<Checkbox size="md" label="Remember me" hint="Save my login details for next time." />`,
} as const;

const CheckboxDocsPage: FC = () => (
  <div className="bg-primary min-h-screen font-sans" data-codex-docs-checkboxes>
    <StorybookRootHeaderPortal>
      <DocsPageBreadcrumb currentLabel="Checkboxes" />
    </StorybookRootHeaderPortal>
    <StorybookSbdocsTocPortal>
      <OnThisPageNav items={TOC} />
    </StorybookSbdocsTocPortal>

    <main className="relative mx-auto flex w-full max-w-304 min-w-0 flex-1 flex-col">
      <div className="text-tertiary w-full min-w-0">
        <div className="mb-10">
          <div className="pb-3">
            <h1 className="text-primary md:text-display-xs max-w-3xl text-xl font-semibold">Checkbox components</h1>
          </div>
          <p className="text-md text-tertiary mt-0 max-w-3xl whitespace-pre-line">
            React checkbox components built for modern applications and websites. These checkboxes are built using React Aria and styled with Tailwind CSS.
          </p>
        </div>

        <CheckboxDocsSection
          id="checkbox-example"
          title="Checkbox example"
          code={CODE.hero}
          sectionClassName={DOCS_SECTION_HERO_CLASS}
          dataPreview
          previewClassName={DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK_TIGHT}
        >
          <div className="flex flex-col items-start gap-2">
            <Checkbox label="Remember me" hint="Save my login details for next time." />
          </div>
        </CheckboxDocsSection>

        <section id="checkbox-examples" className="scroll-mt-20 pb-2">
          <h2 className="text-primary text-lg font-semibold md:text-xl">
            <SectionTitle className="text-lg font-semibold md:text-xl">Checkbox examples</SectionTitle>
          </h2>
          <p className="text-md text-tertiary mt-2 max-w-3xl">Below are examples and variations of this checkbox component:</p>
        </section>

        <CheckboxDocsSection id="base" title="Base" code={CODE.base}>
          <div className="flex items-start">
            <Checkbox aria-label="Checkbox" />
          </div>
        </CheckboxDocsSection>

        <CheckboxDocsSection id="with-label" title="With label" code={CODE.withLabel}>
          <div className="flex items-start">
            <Checkbox label="Remember me" />
          </div>
        </CheckboxDocsSection>

        <CheckboxDocsSection id="with-label-and-hint" title="With label and hint" code={CODE.withLabelHint}>
          <div className="flex items-start">
            <Checkbox label="Remember me" hint="Save my login details for next time." />
          </div>
        </CheckboxDocsSection>

        <CheckboxDocsSection id="disabled" title="Disabled" code={CODE.disabled}>
          <div className="flex items-start">
            <Checkbox label="Remember me" hint="Save my login details for next time." isDisabled />
          </div>
        </CheckboxDocsSection>

        <CheckboxDocsSection id="sizes" title="Sizes" code={CODE.sizes}>
          <div className="flex flex-col items-start gap-6">
            <Checkbox size="sm" label="Remember me" hint="Save my login details for next time." />
            <Checkbox size="md" label="Remember me" hint="Save my login details for next time." />
          </div>
        </CheckboxDocsSection>
      </div>
    </main>
  </div>
);

const meta = {
  title: "Base components/Checkboxes",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: CheckboxDocsPage,
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  tags: ["!dev"],
  name: "Checkboxes",
  args: {
    label: "Remember me",
    hint: "Save my login details for next time.",
  },
};

