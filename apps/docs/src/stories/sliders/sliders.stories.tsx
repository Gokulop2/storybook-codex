import type { ComponentProps, FC, ReactNode } from "react";
import { Fragment } from "react";
import { Slider } from "@opus2-platform/codex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { UntitledDocsBreadcrumb } from "../_docs/untitled-docs-breadcrumb";
import {
  DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK_TIGHT,
  DOCS_PREVIEW_P_MARGIN_RESET,
  DOCS_SECTION_HERO_CLASS,
  type DocsSectionProps,
  DocsSection,
  SectionTitle,
} from "../_docs/untitled-docs-preview-code";
import { OnThisPageNav, StorybookRootHeaderPortal, StorybookSbdocsTocPortal } from "../_docs/untitled-docs-scaffold";

/** Matches [Untitled slider demos](https://github.com/untitleduico/react/blob/main/components/base/slider/slider.demo.tsx). */
const IMPORT = `import { Slider } from "@opus2-platform/codex";`;

const withImport = (body: string) => `${IMPORT}\n\n${body}`;

const snippetRange = (labelPosition?: "bottom" | "top-floating") => {
  const lp = labelPosition ? ` labelPosition="${labelPosition}"` : "";
  return withImport(`<Slider defaultValue={[0, 25]}${lp} />`);
};

const CODE = {
  rangeDefault: snippetRange(),
  bottomLabel: snippetRange("bottom"),
  topFloating: snippetRange("top-floating"),
  singleThumb: withImport(`<Slider defaultValue={50} labelPosition="top-floating" />`),
} as const;

const PREVIEW_WELL = `${DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK_TIGHT} ${DOCS_PREVIEW_P_MARGIN_RESET} items-center! justify-center!`.trim();

const PREVIEW_INNER = "mx-auto w-full max-w-md";

const SliderDocsSection: FC<DocsSectionProps> = ({ previewClassName, ...rest }) => (
  <DocsSection {...rest} previewClassName={previewClassName ?? PREVIEW_WELL} />
);

const SliderPreview: FC<{ children: ReactNode }> = ({ children }) => <div className={PREVIEW_INNER}>{children}</div>;

type SliderDemoProps = ComponentProps<typeof Slider>;

const SliderInPreview: FC<SliderDemoProps> = (props) => (
  <SliderPreview>
    <Slider {...props} />
  </SliderPreview>
);

/** Shared with Storybook `args` and range-slider sections. */
const RANGE_DEFAULT: [number, number] = [0, 25];

const TOC = [
  { id: "slider-example", label: "Slider example" },
  { id: "slider-examples", label: "Slider examples" },
  { id: "default", label: "Default" },
  { id: "bottom-label", label: "Bottom label" },
  { id: "top-floating", label: "Top floating" },
  { id: "single-thumb", label: "Single thumb" },
] as const;

const INTRO_BEFORE_SECTION_ID = "default";

type SliderDocSection = {
  id: string;
  title: string;
  code: string;
  hero?: boolean;
  render: () => ReactNode;
};

const demo = (props: SliderDemoProps) => () => <SliderInPreview {...props} />;

const SLIDER_DOC_SECTIONS: SliderDocSection[] = [
  {
    id: "slider-example",
    title: "Slider example",
    code: CODE.rangeDefault,
    hero: true,
    render: demo({ defaultValue: RANGE_DEFAULT }),
  },
  {
    id: "default",
    title: "Default",
    code: CODE.rangeDefault,
    render: demo({ defaultValue: RANGE_DEFAULT }),
  },
  {
    id: "bottom-label",
    title: "Bottom label",
    code: CODE.bottomLabel,
    render: demo({ defaultValue: RANGE_DEFAULT, labelPosition: "bottom" }),
  },
  {
    id: "top-floating",
    title: "Top floating",
    code: CODE.topFloating,
    render: demo({ defaultValue: RANGE_DEFAULT, labelPosition: "top-floating" }),
  },
  {
    id: "single-thumb",
    title: "Single thumb",
    code: CODE.singleThumb,
    render: demo({ defaultValue: 50, labelPosition: "top-floating" }),
  },
];

const ExamplesIntro: FC = () => (
  <section id="slider-examples" className="scroll-mt-20 pb-2">
    <h2 className="text-primary text-lg font-semibold md:text-xl">
      <SectionTitle className="text-lg font-semibold md:text-xl">Slider examples</SectionTitle>
    </h2>
    <p className="text-md text-tertiary mt-2 max-w-3xl">Below are examples and variations of this slider component:</p>
  </section>
);

const SlidersDocsPage: FC = () => (
  <div className="bg-primary min-h-screen font-sans" data-codex-docs-sliders>
    <StorybookRootHeaderPortal>
      <UntitledDocsBreadcrumb currentLabel="Sliders" />
    </StorybookRootHeaderPortal>
    <StorybookSbdocsTocPortal>
      <OnThisPageNav items={TOC} />
    </StorybookSbdocsTocPortal>

    <main className="relative mx-auto flex w-full max-w-304 min-w-0 flex-1 flex-col">
      <div className="text-tertiary w-full min-w-0">
        <div className="mb-10">
          <div className="pb-3">
            <h1 className="text-primary md:text-display-xs max-w-3xl text-xl font-semibold">Slider components</h1>
          </div>
          <p className="text-md text-tertiary mt-0 max-w-3xl whitespace-pre-line">
            React slider components built for modern applications and websites. These sliders are built using React Aria and styled with Tailwind CSS.
          </p>
        </div>

        {SLIDER_DOC_SECTIONS.map((section) => (
          <Fragment key={section.id}>
            {section.id === INTRO_BEFORE_SECTION_ID ? <ExamplesIntro /> : null}
            <SliderDocsSection
              id={section.id}
              title={section.title}
              code={section.code}
              sectionClassName={section.hero ? DOCS_SECTION_HERO_CLASS : undefined}
              dataPreview={section.hero}
            >
              {section.render()}
            </SliderDocsSection>
          </Fragment>
        ))}
      </div>
    </main>
  </div>
);

const meta = {
  title: "Sliders",
  component: Slider,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: SlidersDocsPage,
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Sliders",
  args: {
    defaultValue: RANGE_DEFAULT,
  },
};
