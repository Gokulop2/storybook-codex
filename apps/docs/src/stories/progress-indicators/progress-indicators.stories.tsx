import type { FC } from "react";
import {
  ProgressBar,
  ProgressBarCircle,
  ProgressBarHalfCircle,
  type ProgressIndicatorWithTextProps,
} from "@opus2-platform/codex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { UntitledDocsBreadcrumb } from "../_docs/untitled-docs-breadcrumb";
import {
  DOCS_PREVIEW_HERO_SURFACE_CLASS,
  DOCS_SECTION_CLASS,
  DOCS_SECTION_HERO_CLASS,
  DocsSection,
  SectionTitle,
} from "../_docs/untitled-docs-preview-code";
import { OnThisPageNav, StorybookRootHeaderPortal, StorybookSbdocsTocPortal } from "../_docs/untitled-docs-scaffold";

type LabelPosition = NonNullable<ProgressIndicatorWithTextProps["labelPosition"]>;

const DEMO = 40;
const BAR_WRAP = "w-full max-w-md";
const CIRCLE_ROW = "flex flex-wrap items-end justify-center gap-8";

const IMPORT = `import {
  ProgressBar,
  ProgressBarCircle,
  ProgressBarHalfCircle,
} from "@opus2-platform/codex";`;

const doc = (body: string) => `${IMPORT}\n\n${body}`;

const linearCode = (labelPosition?: LabelPosition) =>
  doc(
    `<div className="${BAR_WRAP}">\n  <ProgressBar value={${DEMO}}${labelPosition ? ` labelPosition="${labelPosition}"` : ""} />\n</div>`
  );

type CircleSize = "xxs" | "xs" | "sm" | "md" | "lg";

const circleFamilyCode = (
  component: "ProgressBarCircle" | "ProgressBarHalfCircle",
  rows: { size: CircleSize; label?: string }[]
) =>
  doc(
    `<div className="${CIRCLE_ROW}">\n${rows
      .map(
        (r) =>
          `  <${component} value={${DEMO}} size="${r.size}"${r.label ? ` label="${r.label}"` : ""} />`
      )
      .join("\n")}\n</div>`
  );

const SIZES_TRIPLE = [{ size: "xs" as const }, { size: "sm" as const }, { size: "md" as const }];
const SIZES_LABELLED: { size: "sm" | "md" | "lg"; label: string }[] = [
  { size: "sm", label: "Users" },
  { size: "md", label: "Active users" },
  { size: "lg", label: "Active users" },
];

const CODE = {
  hero: linearCode(),
  default: linearCode(),
  textRight: linearCode("right"),
  textBottom: linearCode("bottom"),
  textTopFloating: linearCode("top-floating"),
  textBottomFloating: linearCode("bottom-floating"),
  circle: circleFamilyCode("ProgressBarCircle", SIZES_TRIPLE),
  circleLabel: circleFamilyCode("ProgressBarCircle", SIZES_LABELLED),
  halfCircle: circleFamilyCode("ProgressBarHalfCircle", SIZES_TRIPLE),
  halfCircleLabel: circleFamilyCode("ProgressBarHalfCircle", SIZES_LABELLED),
} as const;

const TOC = [
  { id: "progress-indicator-example", label: "Progress indicator example" },
  { id: "progress-indicator-examples", label: "Progress indicator examples" },
  { id: "default", label: "Default" },
  { id: "text-right", label: "Text right" },
  { id: "text-bottom", label: "Text bottom" },
  { id: "text-top-floating", label: "Text top floating" },
  { id: "text-bottom-floating", label: "Text bottom floating" },
  { id: "circle-progress-bar", label: "Circle progress bar" },
  { id: "circle-progress-bar-label", label: "Circle progress bar label" },
  { id: "half-circle-progress-bar", label: "Half circle progress bar" },
  { id: "half-circle-progress-bar-label", label: "Half circle progress bar label" },
] as const;

const LINEAR_SECTIONS: readonly {
  id: string;
  title: string;
  code: string;
  labelPosition?: LabelPosition;
}[] = [
  { id: "default", title: "Default", code: CODE.default },
  { id: "text-right", title: "Text right", code: CODE.textRight, labelPosition: "right" },
  { id: "text-bottom", title: "Text bottom", code: CODE.textBottom, labelPosition: "bottom" },
  { id: "text-top-floating", title: "Text top floating", code: CODE.textTopFloating, labelPosition: "top-floating" },
  { id: "text-bottom-floating", title: "Text bottom floating", code: CODE.textBottomFloating, labelPosition: "bottom-floating" },
];

const LinearBar: FC<{ labelPosition?: LabelPosition }> = ({ labelPosition }) => (
  <div className={BAR_WRAP}>
    <ProgressBar value={DEMO} {...(labelPosition ? { labelPosition } : {})} />
  </div>
);

const CircleRow: FC<{
  component: typeof ProgressBarCircle | typeof ProgressBarHalfCircle;
  items: { size: CircleSize; label?: string }[];
}> = ({ component: C, items }) => (
  <div className={CIRCLE_ROW}>
    {items.map((item) => (
      <C key={`${item.size}-${item.label ?? ""}`} value={DEMO} size={item.size} {...(item.label ? { label: item.label } : {})} />
    ))}
  </div>
);

const ProgressIndicatorsDocsPage: FC = () => (
  <div className="bg-primary min-h-screen font-sans" data-codex-docs-progress-indicators>
    <StorybookRootHeaderPortal>
      <UntitledDocsBreadcrumb currentLabel="Progress indicators" />
    </StorybookRootHeaderPortal>
    <StorybookSbdocsTocPortal>
      <OnThisPageNav items={TOC} />
    </StorybookSbdocsTocPortal>

    <main className="relative mx-auto flex w-full max-w-304 min-w-0 flex-1 flex-col">
      <div className="text-tertiary w-full min-w-0">
        <div className="mb-10">
          <div className="pb-3">
            <h1 className="text-primary md:text-display-xs max-w-3xl text-xl font-semibold">Progress indicator components</h1>
          </div>
          <p className="text-md text-tertiary mt-0 max-w-3xl whitespace-pre-line">
            Linear and circular progress indicators for dashboards and loading states. Built with accessible progress semantics and Codex tokens.
          </p>
        </div>

        <DocsSection
          id="progress-indicator-example"
          title="Progress indicator example"
          code={CODE.hero}
          sectionClassName={DOCS_SECTION_HERO_CLASS}
          dataPreview
          previewClassName={DOCS_PREVIEW_HERO_SURFACE_CLASS}
        >
          <LinearBar />
        </DocsSection>

        <section id="progress-indicator-examples" className={`scroll-mt-20 ${DOCS_SECTION_CLASS}`}>
          <h2 className="text-primary text-lg font-semibold md:text-xl">
            <SectionTitle className="text-lg font-semibold md:text-xl">Progress indicator examples</SectionTitle>
          </h2>
          <p className="text-md text-tertiary mt-2 max-w-3xl">
            Below are examples and variations of the progress indicator components.
          </p>
        </section>

        {LINEAR_SECTIONS.map((s) => (
          <DocsSection key={s.id} id={s.id} title={s.title} code={s.code}>
            <LinearBar labelPosition={s.labelPosition} />
          </DocsSection>
        ))}

        <DocsSection id="circle-progress-bar" title="Circle progress bar" code={CODE.circle}>
          <CircleRow component={ProgressBarCircle} items={SIZES_TRIPLE} />
        </DocsSection>

        <DocsSection id="circle-progress-bar-label" title="Circle progress bar label" code={CODE.circleLabel}>
          <CircleRow component={ProgressBarCircle} items={SIZES_LABELLED} />
        </DocsSection>

        <DocsSection id="half-circle-progress-bar" title="Half circle progress bar" code={CODE.halfCircle}>
          <CircleRow component={ProgressBarHalfCircle} items={SIZES_TRIPLE} />
        </DocsSection>

        <DocsSection id="half-circle-progress-bar-label" title="Half circle progress bar label" code={CODE.halfCircleLabel}>
          <CircleRow component={ProgressBarHalfCircle} items={SIZES_LABELLED} />
        </DocsSection>
      </div>
    </main>
  </div>
);

const meta = {
  title: "Progress indicators",
  component: ProgressBar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: ProgressIndicatorsDocsPage,
    },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Progress indicators",
  args: { value: DEMO },
  render: () => <LinearBar />,
};
