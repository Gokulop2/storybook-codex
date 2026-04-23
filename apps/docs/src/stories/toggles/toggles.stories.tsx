import type { FC, ReactNode } from "react";
import { Fragment } from "react";
import { Toggle } from "@opus2-platform/codex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DocsPageBreadcrumb } from "../_docs/docs-page-breadcrumb";
import {
  DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK_TIGHT,
  DOCS_SECTION_HERO_CLASS,
  type DocsSectionProps,
  DocsSection,
  SectionTitle,
} from "../_docs/docs-preview-code";
import { OnThisPageNav, StorybookRootHeaderPortal, StorybookSbdocsTocPortal } from "../_docs/docs-scaffold";

const PREVIEW_WELL = `${DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK_TIGHT} items-start! justify-center!`.trim();

const PREVIEW_INNER = "mx-auto! flex max-w-md flex-col items-stretch";

const LABEL = "Remember me";
const HINT = "Save my login details for next time.";

const IMPORT = `import { Toggle } from "@opus2-platform/codex";`;

const codeBlock = (body: string) => `${IMPORT}\n\n${body}`;

const CODE = {
  hero: codeBlock(`<Toggle\n  label="${LABEL}"\n  hint="${HINT}"\n/>`),
  base: codeBlock(`<Toggle />`),
  withLabel: codeBlock(`<Toggle label="${LABEL}" />`),
  withLabelHint: codeBlock(`<Toggle\n  label="${LABEL}"\n  hint="${HINT}"\n/>`),
  disabled: codeBlock(`<Toggle\n  label="${LABEL}"\n  hint="${HINT}"\n  isDisabled\n/>`),
  sizes: codeBlock(
    `<Toggle size="sm" label="${LABEL}" hint="${HINT}" />\n<Toggle size="md" label="${LABEL}" hint="${HINT}" />`,
  ),
  slim: codeBlock(`<Toggle slim />`),
  slimWithLabelHint: codeBlock(`<Toggle slim\n  label="${LABEL}"\n  hint="${HINT}"\n/>`),
} as const;

const ToggleDocsSection: FC<DocsSectionProps> = ({ previewClassName, ...rest }) => (
  <DocsSection {...rest} previewClassName={previewClassName ?? PREVIEW_WELL} />
);

const TogglePreview: FC<{ children: ReactNode }> = ({ children }) => <div className={PREVIEW_INNER}>{children}</div>;

const TOC = [
  { id: "toggle-example", label: "Toggle example" },
  { id: "toggle-examples", label: "Toggle examples" },
  { id: "base", label: "Base" },
  { id: "with-label", label: "With label" },
  { id: "with-label-and-hint", label: "With label and hint" },
  { id: "disabled", label: "Disabled" },
  { id: "sizes", label: "Sizes" },
  { id: "slim", label: "Slim" },
  { id: "slim-with-label-and-hint", label: "Slim with label and hint" },
] as const;

type ToggleDocSection = {
  id: string;
  title: string;
  code: string;
  hero?: boolean;
  render: () => ReactNode;
};

const TOGGLE_DOC_SECTIONS: ToggleDocSection[] = [
  {
    id: "toggle-example",
    title: "Toggle example",
    code: CODE.hero,
    hero: true,
    render: () => (
      <TogglePreview>
        <Toggle label={LABEL} hint={HINT} />
      </TogglePreview>
    ),
  },
  {
    id: "base",
    title: "Base",
    code: CODE.base,
    render: () => (
      <TogglePreview>
        <Toggle />
      </TogglePreview>
    ),
  },
  {
    id: "with-label",
    title: "With label",
    code: CODE.withLabel,
    render: () => (
      <TogglePreview>
        <Toggle label={LABEL} />
      </TogglePreview>
    ),
  },
  {
    id: "with-label-and-hint",
    title: "With label and hint",
    code: CODE.withLabelHint,
    render: () => (
      <TogglePreview>
        <Toggle label={LABEL} hint={HINT} />
      </TogglePreview>
    ),
  },
  {
    id: "disabled",
    title: "Disabled",
    code: CODE.disabled,
    render: () => (
      <TogglePreview>
        <Toggle label={LABEL} hint={HINT} isDisabled />
      </TogglePreview>
    ),
  },
  {
    id: "sizes",
    title: "Sizes",
    code: CODE.sizes,
    render: () => (
      <TogglePreview>
        <div className="flex flex-col gap-6">
          <Toggle size="sm" label={LABEL} hint={HINT} />
          <Toggle size="md" label={LABEL} hint={HINT} />
        </div>
      </TogglePreview>
    ),
  },
  {
    id: "slim",
    title: "Slim",
    code: CODE.slim,
    render: () => (
      <TogglePreview>
        <Toggle slim />
      </TogglePreview>
    ),
  },
  {
    id: "slim-with-label-and-hint",
    title: "Slim with label and hint",
    code: CODE.slimWithLabelHint,
    render: () => (
      <TogglePreview>
        <Toggle slim label={LABEL} hint={HINT} />
      </TogglePreview>
    ),
  },
];

const ExamplesIntro: FC = () => (
  <section id="toggle-examples" className="scroll-mt-20 pb-2">
    <h2 className="text-primary text-lg font-semibold md:text-xl">
      <SectionTitle className="text-lg font-semibold md:text-xl">Toggle examples</SectionTitle>
    </h2>
    <p className="text-md text-tertiary mt-2 max-w-3xl">Below are examples and variations of this toggle component:</p>
  </section>
);

const ToggleDocsPage: FC = () => (
  <div className="bg-primary min-h-screen font-sans" data-codex-docs-toggles>
    <StorybookRootHeaderPortal>
      <DocsPageBreadcrumb currentLabel="Toggles" />
    </StorybookRootHeaderPortal>
    <StorybookSbdocsTocPortal>
      <OnThisPageNav items={TOC} />
    </StorybookSbdocsTocPortal>

    <main className="relative mx-auto flex w-full max-w-304 min-w-0 flex-1 flex-col">
      <div className="text-tertiary w-full min-w-0">
        <div className="mb-10">
          <div className="pb-3">
            <h1 className="text-primary md:text-display-xs max-w-3xl text-xl font-semibold">Toggle field components</h1>
          </div>
          <p className="text-md text-tertiary mt-0 max-w-3xl whitespace-pre-line">
            React toggle field components built for modern applications and websites. These toggle fields are built using React Aria and styled with Tailwind CSS.
          </p>
        </div>

        {TOGGLE_DOC_SECTIONS.map((section, index) => (
          <Fragment key={section.id}>
            {index === 1 ? <ExamplesIntro /> : null}
            <ToggleDocsSection
              id={section.id}
              title={section.title}
              code={section.code}
              sectionClassName={section.hero ? DOCS_SECTION_HERO_CLASS : undefined}
              dataPreview={section.hero}
            >
              {section.render()}
            </ToggleDocsSection>
          </Fragment>
        ))}
      </div>
    </main>
  </div>
);

const meta = {
  title: "Base components/Toggles",
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: ToggleDocsPage,
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Toggles",
  args: {
    label: LABEL,
    hint: HINT,
  },
};
