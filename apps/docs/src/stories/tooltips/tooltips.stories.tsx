import type { ComponentProps, FC, ReactNode } from "react";
import { Fragment } from "react";
import { Tooltip, TooltipTrigger } from "@opus2-platform/codex";
import { HelpCircle } from "@opus2-platform/icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { Placement } from "@react-types/overlays";
import { UntitledDocsBreadcrumb } from "../_docs/untitled-docs-breadcrumb";
import {
  DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK_TIGHT,
  DOCS_PREVIEW_UNTITLED_SECTION_CENTER_CLASS,
  DOCS_SECTION_HERO_CLASS,
  type DocsSectionProps,
  DocsSection,
  SectionTitle,
} from "../_docs/untitled-docs-preview-code";
import { OnThisPageNav, StorybookRootHeaderPortal, StorybookSbdocsTocPortal } from "../_docs/untitled-docs-scaffold";

const DOC_CODE_CLASS = "text-secondary font-mono text-sm";

const PREVIEW_WELL = `${DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK_TIGHT} items-start! justify-center!`.trim();

const PREVIEW_PLACEMENTS = `${DOCS_PREVIEW_UNTITLED_SECTION_CENTER_CLASS} items-center! justify-center!`.trim();

const PREVIEW_INNER = "mx-auto! flex max-w-md flex-col items-stretch";

const IMPORTS = `import { Tooltip, TooltipTrigger } from "@opus2-platform/codex";
import { HelpCircle } from "@opus2-platform/icons";`;

const TRIGGER_CLASS =
  "text-fg-quaternary hover:text-fg-quaternary_hover focus:text-fg-quaternary_hover cursor-pointer transition duration-200";

const LABEL_TRIGGER_CLASS = `${TRIGGER_CLASS} rounded-md px-2 py-1.5`;

const TOOLTIP_TITLE = "This is a tooltip";
const TOOLTIP_TITLE_LONG = "This is a tooltip title";
const TOOLTIP_DESCRIPTION = "This is tooltip supporting text.";

const codeBlock = (body: string) => `${IMPORTS}\n\n${body}`;

const TRIGGER_SNIPPET = `<TooltipTrigger className="${TRIGGER_CLASS}" aria-label="Show tooltip">
  <HelpCircle className="size-4" />
</TooltipTrigger>`;

const CODE_BASIC = codeBlock(`<Tooltip title="${TOOLTIP_TITLE}" placement="top">
${TRIGGER_SNIPPET}
</Tooltip>`);

const CODE = {
  withArrow: codeBlock(`<Tooltip title="${TOOLTIP_TITLE}" placement="top" arrow>
${TRIGGER_SNIPPET}
</Tooltip>`),
  withSupportingText: codeBlock(`<Tooltip
  title="${TOOLTIP_TITLE_LONG}"
  description="${TOOLTIP_DESCRIPTION}"
  placement="top"
>
${TRIGGER_SNIPPET}
</Tooltip>`),
  placements: codeBlock(`// placement uses React Aria Placement (e.g. "top left", "bottom", "left", …)
<Tooltip title="${TOOLTIP_TITLE}" placement="top left">
${TRIGGER_SNIPPET}
</Tooltip>`),
} as const;

const PLACEMENT_DEMO: { placement: Placement; label: string }[] = [
  { placement: "top left", label: "Top left" },
  { placement: "top", label: "Top" },
  { placement: "top right", label: "Top right" },
  { placement: "bottom left", label: "Bottom left" },
  { placement: "bottom", label: "Bottom" },
  { placement: "bottom right", label: "Bottom right" },
  { placement: "left", label: "Left" },
  { placement: "right", label: "Right" },
];

const TooltipDocsSection: FC<DocsSectionProps> = ({ previewClassName, ...rest }) => (
  <DocsSection {...rest} previewClassName={previewClassName ?? PREVIEW_WELL} />
);

const TooltipPreview: FC<{ children: ReactNode }> = ({ children }) => <div className={PREVIEW_INNER}>{children}</div>;

const HelpTrigger: FC = () => (
  <TooltipTrigger className={TRIGGER_CLASS} aria-label="Show tooltip">
    <HelpCircle className="size-4" />
  </TooltipTrigger>
);

type TooltipPreviewDemoProps = Omit<ComponentProps<typeof Tooltip>, "children">;

/** Standard docs preview: icon trigger + `placement="top"` unless overridden. */
const TooltipPreviewDemo: FC<TooltipPreviewDemoProps> = (props) => (
  <TooltipPreview>
    <Tooltip placement="top" {...props}>
      <HelpTrigger />
    </Tooltip>
  </TooltipPreview>
);

const DocCode: FC<{ children: ReactNode }> = ({ children }) => <code className={DOC_CODE_CLASS}>{children}</code>;

const PlacementsGrid: FC = () => (
  <div className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-8 px-2 py-4">
    {PLACEMENT_DEMO.map(({ placement, label }) => (
      <Tooltip key={placement} title={TOOLTIP_TITLE} placement={placement}>
        <TooltipTrigger className={LABEL_TRIGGER_CLASS} type="button">
          <span className="text-sm font-medium text-secondary select-none">{label}</span>
        </TooltipTrigger>
      </Tooltip>
    ))}
  </div>
);

const TOC = [
  { id: "tooltip-example", label: "Tooltip example" },
  { id: "tooltip-examples", label: "Tooltip examples" },
  { id: "default", label: "Default" },
  { id: "with-arrow", label: "With arrow" },
  { id: "with-supporting-text", label: "With supporting text" },
  { id: "placements", label: "Placements" },
] as const;

type TooltipDocSection = {
  id: string;
  title: string;
  code: string;
  hero?: boolean;
  description?: ReactNode;
  previewClassName?: string;
  render: () => ReactNode;
};

const basicDemo = () => <TooltipPreviewDemo title={TOOLTIP_TITLE} />;

const TOOLTIP_DOC_SECTIONS: TooltipDocSection[] = [
  {
    id: "tooltip-example",
    title: "Tooltip example",
    code: CODE_BASIC,
    hero: true,
    render: basicDemo,
  },
  {
    id: "default",
    title: "Default example",
    code: CODE_BASIC,
    description: (
      <p>
        Tooltips are used to display additional information when hovering over an element. This is how our tooltip component looks by default:
      </p>
    ),
    render: basicDemo,
  },
  {
    id: "with-arrow",
    title: "With arrow example",
    code: CODE.withArrow,
    description: (
      <p>
        You can add an arrow to the tooltip by passing the <DocCode>arrow</DocCode> boolean prop to the <DocCode>Tooltip</DocCode> component. This will add an
        arrow to the tooltip that points to the element being hovered over.
      </p>
    ),
    render: () => <TooltipPreviewDemo title={TOOLTIP_TITLE} arrow />,
  },
  {
    id: "with-supporting-text",
    title: "With supporting text example",
    code: CODE.withSupportingText,
    description: (
      <p>
        In situations where you want to provide more context for the tooltip, you can pass a description to the <DocCode>Tooltip</DocCode> component. This will
        display the description below the tooltip title.
      </p>
    ),
    render: () => <TooltipPreviewDemo title={TOOLTIP_TITLE_LONG} description={TOOLTIP_DESCRIPTION} />,
  },
  {
    id: "placements",
    title: "Placements example",
    code: CODE.placements,
    previewClassName: PREVIEW_PLACEMENTS,
    description: (
      <p>
        Since our tooltip component is built with React Aria, it supports the placements that React Aria supports. You can set the placement using the{" "}
        <DocCode>placement</DocCode> prop on the <DocCode>Tooltip</DocCode> component. To see the full list of placements, check the tooltip props in the{" "}
        <a
          href="https://react-spectrum.adobe.com/react-aria/Tooltip.html"
          className="text-brand-secondary font-semibold underline underline-offset-2"
          target="_blank"
          rel="noreferrer"
        >
          React Aria documentation
        </a>
        .
      </p>
    ),
    render: () => <PlacementsGrid />,
  },
];

const ExamplesIntro: FC = () => (
  <section id="tooltip-examples" className="scroll-mt-20 pb-2">
    <h2 className="text-primary text-lg font-semibold md:text-xl">
      <SectionTitle className="text-lg font-semibold md:text-xl">Tooltip examples</SectionTitle>
    </h2>
    <p className="text-md text-tertiary mt-2 max-w-3xl">Below are examples and variations of this tooltip component:</p>
  </section>
);

const TooltipDocsPage: FC = () => (
  <div className="bg-primary min-h-screen font-sans" data-codex-docs-tooltips>
    <StorybookRootHeaderPortal>
      <UntitledDocsBreadcrumb currentLabel="Tooltips" />
    </StorybookRootHeaderPortal>
    <StorybookSbdocsTocPortal>
      <OnThisPageNav items={TOC} />
    </StorybookSbdocsTocPortal>

    <main className="relative mx-auto flex w-full max-w-304 min-w-0 flex-1 flex-col">
      <div className="text-tertiary w-full min-w-0">
        <div className="mb-10">
          <div className="pb-3">
            <h1 className="text-primary md:text-display-xs max-w-3xl text-xl font-semibold">Tooltip components</h1>
          </div>
          <p className="text-md text-tertiary mt-0 max-w-3xl whitespace-pre-line">
            React tooltip components built for modern applications and websites. These tooltips are built using React Aria and styled with Tailwind CSS.
          </p>
        </div>

        {TOOLTIP_DOC_SECTIONS.map((section, index) => (
          <Fragment key={section.id}>
            {index === 1 ? <ExamplesIntro /> : null}
            <TooltipDocsSection
              id={section.id}
              title={section.title}
              code={section.code}
              description={section.description}
              sectionClassName={section.hero ? DOCS_SECTION_HERO_CLASS : undefined}
              dataPreview={section.hero}
              previewClassName={section.previewClassName}
            >
              {section.render()}
            </TooltipDocsSection>
          </Fragment>
        ))}
      </div>
    </main>
  </div>
);

const meta = {
  title: "Tooltips",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: TooltipDocsPage,
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Tooltips",
  args: {
    title: TOOLTIP_TITLE,
    placement: "top",
    children: <HelpTrigger />,
  },
  render: (args) => <Tooltip {...args} />,
};
