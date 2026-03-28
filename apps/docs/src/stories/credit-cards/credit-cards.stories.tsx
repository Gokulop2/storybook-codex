import type { FC } from "react";
import { CreditCard } from "@opus2-platform/codex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { OnThisPageNav, StorybookRootHeaderPortal, StorybookSbdocsTocPortal } from "../_docs/untitled-docs-scaffold";
import { DOCS_PREVIEW_HERO_SURFACE_CLASS, DOCS_SECTION_HERO_CLASS, DocsSection, SectionTitle } from "../_docs/untitled-docs-preview-code";

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
                <span className="text-fg-tertiary_hover px-1 text-sm font-semibold whitespace-nowrap">Credit cards</span>
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
  { id: "credit-card-example", label: "Credit card example" },
  { id: "customization", label: "Customization" },
  { id: "customization-example", label: "Customization example" },
  { id: "sizes", label: "Sizes" },
  { id: "sizes-example", label: "Sizes example" },
  { id: "credit-card-types", label: "Credit card types" },
  { id: "transparent", label: "Transparent" },
  { id: "transparent-gradient", label: "Transparent gradient" },
  { id: "brand-dark", label: "Brand dark" },
  { id: "brand-light", label: "Brand light" },
  { id: "gray-dark", label: "Gray dark" },
  { id: "gray-light", label: "Gray light" },
  { id: "transparent-strip", label: "Transparent strip" },
  { id: "gray-strip", label: "Gray strip" },
  { id: "gradient-strip", label: "Gradient strip" },
  { id: "salmon-strip", label: "Salmon strip" },
  { id: "gray-strip-vertical", label: "Gray strip vertical" },
  { id: "gradient-strip-vertical", label: "Gradient strip vertical" },
  { id: "salmon-strip-vertical", label: "Salmon strip vertical" },
] as const;

const CODE = {
  hero: `import { CreditCard } from "@opus2-platform/codex";\n\n<CreditCard\n  type="brand-dark"\n  company="Opus2 Codex."\n  cardHolder="OLIVIA RHYE"\n  cardExpiration="06/28"\n  cardNumber="1234 1234 1234 1234"\n/>`,
  customization: `import { CreditCard } from "@opus2-platform/codex";\n\n<CreditCard type="brand-dark" company="Brex" cardHolder="PEDRO FRANCESCHI" cardExpiration="12/28" cardNumber="5678 9012 3456 7890" />\n<CreditCard type="gradient-strip" company="Apple Inc." cardHolder="TIM COOK" cardExpiration="06/29" cardNumber="0987 6543 2109 8765" />`,
  sizes: `import { CreditCard } from "@opus2-platform/codex";\n\n<CreditCard type="brand-dark" width={240} />\n<CreditCard type="brand-dark" width={316} />`,
  transparent: `import { CreditCard } from "@opus2-platform/codex";\n\n<CreditCard type="transparent" />`,
  transparentGradient: `import { CreditCard } from "@opus2-platform/codex";\n\n<CreditCard type="transparent-gradient" />`,
  brandDark: `import { CreditCard } from "@opus2-platform/codex";\n\n<CreditCard type="brand-dark" />`,
  brandLight: `import { CreditCard } from "@opus2-platform/codex";\n\n<CreditCard type="brand-light" />`,
  grayDark: `import { CreditCard } from "@opus2-platform/codex";\n\n<CreditCard type="gray-dark" />`,
  grayLight: `import { CreditCard } from "@opus2-platform/codex";\n\n<CreditCard type="gray-light" />`,
  transparentStrip: `import { CreditCard } from "@opus2-platform/codex";\n\n<CreditCard type="transparent-strip" />`,
  grayStrip: `import { CreditCard } from "@opus2-platform/codex";\n\n<CreditCard type="gray-strip" />`,
  gradientStrip: `import { CreditCard } from "@opus2-platform/codex";\n\n<CreditCard type="gradient-strip" />`,
  salmonStrip: `import { CreditCard } from "@opus2-platform/codex";\n\n<CreditCard type="salmon-strip" />`,
  grayStripVertical: `import { CreditCard } from "@opus2-platform/codex";\n\n<CreditCard type="gray-strip-vertical" />`,
  gradientStripVertical: `import { CreditCard } from "@opus2-platform/codex";\n\n<CreditCard type="gradient-strip-vertical" />`,
  salmonStripVertical: `import { CreditCard } from "@opus2-platform/codex";\n\n<CreditCard type="salmon-strip-vertical" />`,
} as const;

const CreditCardsDocsPage: FC = () => (
  <div className="bg-primary min-h-screen font-sans" data-codex-docs-credit-cards>
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
            <h1 className="text-primary md:text-display-xs max-w-3xl text-xl font-semibold">Credit card components</h1>
          </div>
          <p className="text-md text-tertiary mt-0 max-w-3xl whitespace-pre-line">
            React credit card components built for modern applications and websites. These credit cards are styled with Tailwind CSS.
          </p>
        </div>

        <DocsSection
          id="credit-card-example"
          title="Credit card example"
          code={CODE.hero}
          sectionClassName={DOCS_SECTION_HERO_CLASS}
          dataPreview
          previewClassName={DOCS_PREVIEW_HERO_SURFACE_CLASS}
        >
          <div className="flex items-center justify-center">
            <CreditCard type="brand-dark" company="Opus2 Codex." cardHolder="OLIVIA RHYE" cardExpiration="06/28" cardNumber="1234 1234 1234 1234" />
          </div>
        </DocsSection>

        <section id="customization" className="scroll-mt-20 pb-2">
          <h2 className="text-primary text-lg font-semibold md:text-xl">
            <SectionTitle className="text-lg font-semibold md:text-xl">Customization</SectionTitle>
          </h2>
          <p className="text-md text-tertiary mt-2 max-w-3xl">
            The credit card component has props like <code className="text-secondary font-mono text-sm">type</code>,{" "}
            <code className="text-secondary font-mono text-sm">company</code>, <code className="text-secondary font-mono text-sm">cardNumber</code>,{" "}
            <code className="text-secondary font-mono text-sm">cardHolder</code>, and{" "}
            <code className="text-secondary font-mono text-sm">cardExpiration</code> that can be used to customize the card.
          </p>
        </section>

        <DocsSection id="customization-example" title="Customization example" code={CODE.customization}>
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-center">
              <CreditCard type="brand-dark" company="Brex" cardHolder="PEDRO FRANCESCHI" cardExpiration="12/28" cardNumber="5678 9012 3456 7890" />
            </div>
            <div className="flex items-center justify-center">
              <CreditCard type="gradient-strip" company="Apple Inc." cardHolder="TIM COOK" cardExpiration="06/29" cardNumber="0987 6543 2109 8765" />
            </div>
          </div>
        </DocsSection>

        <section id="sizes" className="scroll-mt-20 pb-2">
          <h2 className="text-primary text-lg font-semibold md:text-xl">
            <SectionTitle className="text-lg font-semibold md:text-xl">Sizes</SectionTitle>
          </h2>
          <p className="text-md text-tertiary mt-2 max-w-3xl">
            The credit card component has a <code className="text-secondary font-mono text-sm">width</code> prop that can be used to set the width of the card.
            Based on the width, the height will be automatically adjusted to maintain the aspect ratio.
          </p>
        </section>

        <DocsSection id="sizes-example" title="Sizes example" code={CODE.sizes}>
          <div className="flex flex-col items-center gap-8">
            <CreditCard type="brand-dark" width={240} />
            <CreditCard type="brand-dark" width={316} />
          </div>
        </DocsSection>

        <section id="credit-card-types" className="scroll-mt-20 pb-2">
          <h2 className="text-primary text-lg font-semibold md:text-xl">
            <SectionTitle className="text-lg font-semibold md:text-xl">Credit card types</SectionTitle>
          </h2>
          <p className="text-md text-tertiary mt-2 max-w-3xl">Below are examples and variations of the credit card component:</p>
        </section>

        <DocsSection id="transparent" title="Transparent" code={CODE.transparent}>
          <div className="flex items-center justify-center">
            <CreditCard type="transparent" />
          </div>
        </DocsSection>

        <DocsSection id="transparent-gradient" title="Transparent gradient" code={CODE.transparentGradient}>
          <div className="flex items-center justify-center">
            <CreditCard type="transparent-gradient" />
          </div>
        </DocsSection>

        <DocsSection id="brand-dark" title="Brand dark" code={CODE.brandDark}>
          <div className="flex items-center justify-center">
            <CreditCard type="brand-dark" />
          </div>
        </DocsSection>

        <DocsSection id="brand-light" title="Brand light" code={CODE.brandLight}>
          <div className="flex items-center justify-center">
            <CreditCard type="brand-light" />
          </div>
        </DocsSection>

        <DocsSection id="gray-dark" title="Gray dark" code={CODE.grayDark}>
          <div className="flex items-center justify-center">
            <CreditCard type="gray-dark" />
          </div>
        </DocsSection>

        <DocsSection id="gray-light" title="Gray light" code={CODE.grayLight}>
          <div className="flex items-center justify-center">
            <CreditCard type="gray-light" />
          </div>
        </DocsSection>

        <DocsSection id="transparent-strip" title="Transparent strip" code={CODE.transparentStrip}>
          <div className="flex items-center justify-center">
            <CreditCard type="transparent-strip" />
          </div>
        </DocsSection>

        <DocsSection id="gray-strip" title="Gray strip" code={CODE.grayStrip}>
          <div className="flex items-center justify-center">
            <CreditCard type="gray-strip" />
          </div>
        </DocsSection>

        <DocsSection id="gradient-strip" title="Gradient strip" code={CODE.gradientStrip}>
          <div className="flex items-center justify-center">
            <CreditCard type="gradient-strip" />
          </div>
        </DocsSection>

        <DocsSection id="salmon-strip" title="Salmon strip" code={CODE.salmonStrip}>
          <div className="flex items-center justify-center">
            <CreditCard type="salmon-strip" />
          </div>
        </DocsSection>

        <DocsSection id="gray-strip-vertical" title="Gray strip vertical" code={CODE.grayStripVertical}>
          <div className="flex items-center justify-center">
            <CreditCard type="gray-strip-vertical" />
          </div>
        </DocsSection>

        <DocsSection id="gradient-strip-vertical" title="Gradient strip vertical" code={CODE.gradientStripVertical}>
          <div className="flex items-center justify-center">
            <CreditCard type="gradient-strip-vertical" />
          </div>
        </DocsSection>

        <DocsSection id="salmon-strip-vertical" title="Salmon strip vertical" code={CODE.salmonStripVertical}>
          <div className="flex items-center justify-center">
            <CreditCard type="salmon-strip-vertical" />
          </div>
        </DocsSection>
      </div>
    </main>
  </div>
);

const meta = {
  title: "Credit cards",
  component: CreditCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: CreditCardsDocsPage,
    },
  },
} satisfies Meta<typeof CreditCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Credit cards",
};

