import type { FC } from "react";
import { useState } from "react";
import { RadioButton, RadioGroup } from "@opus2-platform/codex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DocsPageBreadcrumb } from "../_docs/docs-page-breadcrumb";
import {
  DOCS_PREVIEW_HERO_SURFACE_CLASS,
  DOCS_PREVIEW_SURFACE_CLASS,
  DOCS_SECTION_CLASS,
  DOCS_SECTION_HERO_CLASS,
  DocsSection,
  SectionTitle,
} from "../_docs/docs-preview-code";
import { OnThisPageNav, StorybookRootHeaderPortal, StorybookSbdocsTocPortal } from "../_docs/docs-scaffold";

const PLAN_OPTIONS = [
  { id: "basic", label: "Basic plan", hint: "Up to 10 users and 20 GB data." },
  { id: "business", label: "Business plan", hint: "Up to 20 users and 40 GB data." },
  { id: "enterprise", label: "Enterprise plan", hint: "Unlimited users and unlimited data." },
] as const;

/** Storybook typography isolation for preview wells (this page only). */
const PREVIEW_ISOLATE_CLASS = "m-0! text-sm! font-medium!";

const HERO_PREVIEW_SURFACE_CLASS = [DOCS_PREVIEW_HERO_SURFACE_CLASS, PREVIEW_ISOLATE_CLASS].join(" ");

const SECTION_PREVIEW_CLASS = `${DOCS_PREVIEW_SURFACE_CLASS} ${PREVIEW_ISOLATE_CLASS}`.trim();

const IMPORT = `import { useState } from "react";
import { RadioButton, RadioGroup } from "@opus2-platform/codex";`;

const doc = (body: string) => `${IMPORT}\n\n${body.trim()}`;

const radiosWithHints = PLAN_OPTIONS.map(
  (p) => `  <RadioButton value="${p.id}" label="${p.label}" hint="${p.hint}" />`
).join("\n");

const radiosLabelsOnly = PLAN_OPTIONS.map((p) => `  <RadioButton value="${p.id}" label="${p.label}" />`).join("\n");

const groupShell = (inner: string, extraProps = "") =>
  doc(`const [selected, setSelected] = useState("basic");

<RadioGroup value={selected} onChange={setSelected}${extraProps}>
${inner}
</RadioGroup>`);

const CODE = {
  hero: groupShell(radiosWithHints),
  withLabel: groupShell(radiosLabelsOnly),
  withLabelAndHint: groupShell(radiosWithHints),
  disabled: groupShell(radiosWithHints, "\n  isDisabled"),
  disabledOption: groupShell(
    PLAN_OPTIONS.map((p) => {
      const disabled = p.id === "business" ? " isDisabled" : "";
      return `  <RadioButton value="${p.id}" label="${p.label}" hint="${p.hint}"${disabled} />`;
    }).join("\n")
  ),
  sizes: doc(`const [selectedSm, setSelectedSm] = useState("basic");
const [selectedMd, setSelectedMd] = useState("basic");

<div className="flex max-w-md flex-col items-start gap-8">
  <RadioGroup value={selectedSm} onChange={setSelectedSm} size="sm">
${radiosWithHints}
  </RadioGroup>

  <RadioGroup value={selectedMd} onChange={setSelectedMd} size="md">
${radiosWithHints}
  </RadioGroup>
</div>`),
} as const;

const TOC = [
  { id: "radio-button-example", label: "Radio button example" },
  { id: "radio-button-examples", label: "Radio button examples" },
  { id: "with-label", label: "With label" },
  { id: "with-label-and-hint", label: "With label and hint" },
  { id: "disabled", label: "Disabled" },
  { id: "disabled-individual-option", label: "Disabled individual option" },
  { id: "sizes", label: "Sizes" },
] as const;

const codeClass = "text-secondary font-mono text-sm";

type PlanRadiosProps = {
  withHint?: boolean;
  groupDisabled?: boolean;
  disabledOptionId?: (typeof PLAN_OPTIONS)[number]["id"];
  size?: "sm" | "md";
};

const PlanRadios: FC<PlanRadiosProps> = ({
  withHint = true,
  groupDisabled,
  disabledOptionId,
  size = "sm",
}) => {
  const [value, setValue] = useState("basic");

  return (
    <RadioGroup value={value} onChange={setValue} isDisabled={groupDisabled} size={size}>
      {PLAN_OPTIONS.map((p) => (
        <RadioButton
          key={p.id}
          value={p.id}
          label={p.label}
          hint={withHint ? p.hint : undefined}
          isDisabled={disabledOptionId === p.id}
        />
      ))}
    </RadioGroup>
  );
};

const SizesDemo: FC = () => (
  <div className="flex max-w-md flex-col items-start gap-8">
    <PlanRadios size="sm" />
    <PlanRadios size="md" />
  </div>
);

const RadioButtonsDocsPage: FC = () => (
  <div className="bg-primary min-h-screen font-sans" data-codex-docs-radio-buttons>
    <StorybookRootHeaderPortal>
      <DocsPageBreadcrumb currentLabel="Radio buttons" />
    </StorybookRootHeaderPortal>
    <StorybookSbdocsTocPortal>
      <OnThisPageNav items={TOC} />
    </StorybookSbdocsTocPortal>

    <main className="relative mx-auto flex w-full max-w-304 min-w-0 flex-1 flex-col">
      <div className="text-tertiary! w-full min-w-0">
        <div className="mb-10">
          <div className="pb-3">
            <h1 className="text-primary md:text-display-xs max-w-3xl text-xl font-semibold">Radio button components</h1>
          </div>
          <p className="text-md text-tertiary! mt-0 max-w-3xl whitespace-pre-line">
            Radio groups for single selection, built on React Aria and styled with Codex tokens.
          </p>
        </div>

        <DocsSection
          id="radio-button-example"
          title="Radio button example"
          code={CODE.hero}
          sectionClassName={DOCS_SECTION_HERO_CLASS}
          dataPreview
          previewClassName={HERO_PREVIEW_SURFACE_CLASS}
        >
          <div className="flex max-w-md flex-col items-start">
            <PlanRadios />
          </div>
        </DocsSection>

        <section id="radio-button-examples" className={`scroll-mt-20 ${DOCS_SECTION_CLASS}`}>
          <h2 className="text-primary text-lg font-semibold md:text-xl">
            <SectionTitle className="text-lg font-semibold md:text-xl">Radio button examples</SectionTitle>
          </h2>
          <p className="text-md text-tertiary! mt-2 max-w-3xl">Below are examples and variations of the radio button component.</p>
        </section>

        <DocsSection
          id="with-label"
          title="With label"
          previewClassName={SECTION_PREVIEW_CLASS}
          code={CODE.withLabel}
          description={
            <p>
              Pass <code className={codeClass}>label</code> for each <code className={codeClass}>RadioButton</code>.
            </p>
          }
        >
          <div className="flex max-w-md flex-col items-start">
            <PlanRadios withHint={false} />
          </div>
        </DocsSection>

        <DocsSection
          id="with-label-and-hint"
          title="With label and hint"
          previewClassName={SECTION_PREVIEW_CLASS}
          code={CODE.withLabelAndHint}
          description={
            <p>
              Add <code className={codeClass}>hint</code> for supporting text under the label.
            </p>
          }
        >
          <div className="flex max-w-md flex-col items-start">
            <PlanRadios />
          </div>
        </DocsSection>

        <DocsSection
          id="disabled"
          title="Disabled"
          previewClassName={SECTION_PREVIEW_CLASS}
          code={CODE.disabled}
          description={
            <p>
              Set <code className={codeClass}>isDisabled</code> on <code className={codeClass}>RadioGroup</code> to disable the whole group.
            </p>
          }
        >
          <div className="flex max-w-md flex-col items-start">
            <PlanRadios groupDisabled />
          </div>
        </DocsSection>

        <DocsSection
          id="disabled-individual-option"
          title="Disabled individual option"
          previewClassName={SECTION_PREVIEW_CLASS}
          code={CODE.disabledOption}
          description={
            <p>
              Set <code className={codeClass}>isDisabled</code> on a single <code className={codeClass}>RadioButton</code>.
            </p>
          }
        >
          <div className="flex max-w-md flex-col items-start">
            <PlanRadios disabledOptionId="business" />
          </div>
        </DocsSection>

        <DocsSection
          id="sizes"
          title="Sizes"
          previewClassName={SECTION_PREVIEW_CLASS}
          code={CODE.sizes}
          description={
            <p>
              Use <code className={codeClass}>size=&quot;sm&quot;</code> or <code className={codeClass}>size=&quot;md&quot;</code> on{" "}
              <code className={codeClass}>RadioGroup</code> (context applies to all radios).
            </p>
          }
        >
          <SizesDemo />
        </DocsSection>
      </div>
    </main>
  </div>
);

const meta = {
  title: "Base components/Radio buttons",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: RadioButtonsDocsPage,
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Radio buttons",
  args: {
    defaultValue: "basic",
    children: (
      <>
        {PLAN_OPTIONS.map((p) => (
          <RadioButton key={p.id} value={p.id} label={p.label} hint={p.hint} />
        ))}
      </>
    ),
  },
};
