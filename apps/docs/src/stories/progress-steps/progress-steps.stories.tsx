import { ProgressSteps } from "@opus2-platform/codex";
import type { ProgressStepItem } from "@opus2-platform/codex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK,
  DOCS_SECTION_HERO_CLASS,
  DocsSection,
} from "../_docs/docs-preview-code";
import { DocsPageBreadcrumb } from "../_docs/docs-page-breadcrumb";
import { OnThisPageNav, StorybookRootHeaderPortal, StorybookSbdocsTocPortal } from "../_docs/docs-scaffold";

const PROGRESS_STEPS_TOC = [
  { id: "progress-steps-examples", label: "Progress steps examples" },
  { id: "circles", label: "Circles" },
  { id: "circles-text", label: "Circles with text" },
  { id: "dots", label: "Dots" },
  { id: "progress-bar", label: "Progress bar" },
  { id: "arrows", label: "Arrows" },
  { id: "panels", label: "Panels" },
  { id: "bullet", label: "Bullet" },
  { id: "vertical", label: "Vertical" },
] as const;

const steps: ProgressStepItem[] = [
  { id: "1", label: "Details", status: "complete" },
  { id: "2", label: "Billing", status: "current" },
  { id: "3", label: "Review", status: "upcoming" },
  { id: "4", label: "Confirm", status: "upcoming" },
];

const stepsWithDesc: ProgressStepItem[] = [
  { id: "1", label: "Personal info", description: "Name and contact details", status: "complete" },
  { id: "2", label: "Billing", description: "Payment method", status: "current" },
  { id: "3", label: "Review", description: "Check your order", status: "upcoming" },
];

const ProgressStepsDocsPage = () => {
  return (
    <div className="docs-sbdocs-with-toc-layout">
      <StorybookRootHeaderPortal>
        <DocsPageBreadcrumb currentLabel="Progress steps" />
      </StorybookRootHeaderPortal>
      <StorybookSbdocsTocPortal>
        <OnThisPageNav items={PROGRESS_STEPS_TOC} />
      </StorybookSbdocsTocPortal>

      <main className="docs-sbdocs-content typography">
        <div id="progress-steps-examples" className={DOCS_SECTION_HERO_CLASS}>
          <h1 className="docs-h1">Progress steps</h1>
          <p>Progress indicators guide users through multi-step flows.</p>
          <div className={DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK}>
            <ProgressSteps items={steps} variant="circles" />
          </div>
        </div>

        <div className="docs-sections-wrap">
          <DocsSection
            id="circles"
            title="Circles"
            code={`import { ProgressSteps } from "@opus2-platform/codex";\n\n<ProgressSteps variant="circles" items={steps} />`}
          >
            <ProgressSteps items={steps} variant="circles" />
          </DocsSection>

          <DocsSection
            id="circles-text"
            title="Circles with text"
            code={`import { ProgressSteps } from "@opus2-platform/codex";\n\n<ProgressSteps variant="circles-text" items={steps} />`}
          >
            <ProgressSteps items={steps} variant="circles-text" />
          </DocsSection>

          <DocsSection
            id="dots"
            title="Dots"
            code={`import { ProgressSteps } from "@opus2-platform/codex";\n\n<ProgressSteps variant="dots" items={steps} />`}
          >
            <ProgressSteps items={steps} variant="dots" />
          </DocsSection>

          <DocsSection
            id="progress-bar"
            title="Progress bar"
            code={`import { ProgressSteps } from "@opus2-platform/codex";\n\n<ProgressSteps variant="progress-bar" items={steps} />`}
          >
            <div className="w-full max-w-sm">
              <ProgressSteps items={steps} variant="progress-bar" />
            </div>
          </DocsSection>

          <DocsSection
            id="arrows"
            title="Arrows"
            code={`import { ProgressSteps } from "@opus2-platform/codex";\n\n<ProgressSteps variant="arrows" items={steps} />`}
          >
            <ProgressSteps items={steps} variant="arrows" />
          </DocsSection>

          <DocsSection
            id="panels"
            title="Panels"
            code={`import { ProgressSteps } from "@opus2-platform/codex";\n\n<ProgressSteps variant="panels" items={stepsWithDesc} />`}
          >
            <ProgressSteps items={stepsWithDesc} variant="panels" />
          </DocsSection>

          <DocsSection
            id="bullet"
            title="Bullet"
            code={`import { ProgressSteps } from "@opus2-platform/codex";\n\n<ProgressSteps variant="bullet" items={stepsWithDesc} />`}
          >
            <ProgressSteps items={stepsWithDesc} variant="bullet" />
          </DocsSection>

          <DocsSection
            id="vertical"
            title="Vertical"
            code={`import { ProgressSteps } from "@opus2-platform/codex";\n\n<ProgressSteps orientation="vertical" items={stepsWithDesc} />`}
          >
            <ProgressSteps items={stepsWithDesc} orientation="vertical" />
          </DocsSection>
        </div>
      </main>
    </div>
  );
};

const meta = {
  title: "Application UI/Progress steps",
  component: ProgressSteps,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: ProgressStepsDocsPage,
    },
  },
} satisfies Meta<typeof ProgressSteps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  tags: ["!dev"],
  name: "Progress steps",
  args: {
    items: steps,
    variant: "circles",
  },
};
