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
} from "../_docs/untitled-docs-preview-code";
import { OnThisPageNav, StorybookRootHeaderPortal, StorybookSbdocsTocPortal } from "../_docs/untitled-docs-scaffold";

/** Checkbox docs: centered preview well (Storybook flex overrides). */
const CHECKBOX_PREVIEW_SURFACE_CLASS = `${DOCS_PREVIEW_SURFACE_CLASS} items-center! justify-center!`.trim();

const CheckboxDocsSection: FC<DocsSectionProps> = ({ previewClassName, ...rest }) => (
  <DocsSection {...rest} previewClassName={previewClassName ?? CHECKBOX_PREVIEW_SURFACE_CLASS} />
);

const PageHeader: FC = () => (
  <>
    <div className="bg-primary border-secondary fixed inset-x-0 top-0 z-30 w-full border-b">
      <div className="mx-auto flex size-full flex-1 items-center py-3 pr-3 pl-4 md:py-3 lg:px-5 lg:py-2.5">
        <nav aria-label="Breadcrumbs" className="min-w-0 max-lg:hidden">
          <ol aria-label="Breadcrumbs" className="relative flex gap-0.5 lg:gap-1">
            <li className="flex items-center gap-0.5 lg:gap-1">
              <a className="group outline-focus-ring hover:bg-primary_hover inline-flex cursor-pointer items-center justify-center gap-1 rounded-md p-1 transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 lg:p-1.5">
                <span className="text-quaternary group-hover:text-tertiary_hover px-1 text-sm font-semibold whitespace-nowrap">Base components</span>
              </a>
              <div className="text-fg-quaternary shrink-0">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" aria-hidden="true" className="size-4">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            </li>
            <li className="flex items-center gap-0.5 lg:gap-1">
              <a className="group outline-focus-ring hover:bg-primary_hover inline-flex cursor-pointer items-center justify-center gap-1 rounded-md p-1 transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 lg:p-1.5">
                <span className="text-quaternary group-hover:text-tertiary_hover px-1 text-sm font-semibold whitespace-nowrap">Components</span>
              </a>
              <div className="text-fg-quaternary shrink-0">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" aria-hidden="true" className="size-4">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            </li>
            <li className="flex items-center gap-0.5 lg:gap-1">
              <button type="button" className="bg-primary_hover cursor-default rounded-md p-1 lg:p-1.5">
                <span className="text-fg-tertiary_hover px-1 text-sm font-semibold whitespace-nowrap">Checkboxes</span>
              </button>
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <div className="mb-10 h-14 shrink-0 md:mb-12" aria-hidden="true" />
  </>
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
      <PageHeader />
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
  title: "Checkboxes",
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
  name: "Checkboxes",
  args: {
    label: "Remember me",
    hint: "Save my login details for next time.",
  },
};

