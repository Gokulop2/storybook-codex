import type { ComponentProps, FC, ReactNode } from "react";
import { Fragment } from "react";
import { TextArea } from "@opus2-platform/codex";
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

/** Same hero well as other docs pages (`py-32`, `min-h-[320px]`, `md:min-w-[520px]`); `!` beats Storybook flex overrides. */
const TEXTAREA_PREVIEW_WELL_CLASS = `${DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK_TIGHT} items-start! justify-center!`.trim();

const PREVIEW_INNER = "mx-auto! flex max-w-md flex-col items-stretch";

const HINT = "This is a hint text to help user.";
const ERROR_HINT = "This is an error message.";

const IMPORT = `import { TextArea } from "@opus2-platform/codex";`;

const codeBlock = (body: string) => `${IMPORT}\n\n${body}`;

const CODE_DEFAULT = codeBlock(`<TextArea\n  label="Description"\n  isRequired\n  hint="${HINT}"\n/>`);

const CODE_BY_VARIANT = {
  default: CODE_DEFAULT,
  disabled: codeBlock(`<TextArea\n  label="Description"\n  isRequired\n  hint="${HINT}"\n  isDisabled\n/>`),
  invalid: codeBlock(`<TextArea\n  label="Description"\n  isRequired\n  hint="${ERROR_HINT}"\n  isInvalid\n/>`),
} as const;

type TextAreaFieldProps = Pick<ComponentProps<typeof TextArea>, "label" | "isRequired" | "hint" | "isDisabled" | "isInvalid">;

const DEFAULT_FIELD_PROPS = {
  label: "Description",
  isRequired: true,
  hint: HINT,
} as const satisfies TextAreaFieldProps;

const TextareaDocsSection: FC<DocsSectionProps> = ({ previewClassName, ...rest }) => (
  <DocsSection {...rest} previewClassName={previewClassName ?? TEXTAREA_PREVIEW_WELL_CLASS} />
);

const TextareaPreview: FC<{ children: ReactNode }> = ({ children }) => <div className={PREVIEW_INNER}>{children}</div>;

const TOC = [
  { id: "textarea-example", label: "Textarea example" },
  { id: "textarea-examples", label: "Textarea examples" },
  { id: "default", label: "Default" },
  { id: "disabled", label: "Disabled" },
  { id: "invalid", label: "Invalid" },
] as const;

type DocBlock = {
  id: string;
  title: string;
  code: string;
  fieldProps: TextAreaFieldProps;
  /** First block: hero layout (`data-preview`, hero section class). */
  hero?: boolean;
};

const DOC_BLOCKS: DocBlock[] = [
  { id: "textarea-example", title: "Textarea example", code: CODE_BY_VARIANT.default, fieldProps: DEFAULT_FIELD_PROPS, hero: true },
  { id: "default", title: "Default", code: CODE_BY_VARIANT.default, fieldProps: DEFAULT_FIELD_PROPS },
  {
    id: "disabled",
    title: "Disabled",
    code: CODE_BY_VARIANT.disabled,
    fieldProps: { ...DEFAULT_FIELD_PROPS, isDisabled: true },
  },
  {
    id: "invalid",
    title: "Invalid",
    code: CODE_BY_VARIANT.invalid,
    fieldProps: { ...DEFAULT_FIELD_PROPS, hint: ERROR_HINT, isInvalid: true },
  },
];

const ExamplesIntro: FC = () => (
  <section id="textarea-examples" className="scroll-mt-20 pb-2">
    <h2 className="text-primary text-lg font-semibold md:text-xl">
      <SectionTitle className="text-lg font-semibold md:text-xl">Textarea examples</SectionTitle>
    </h2>
    <p className="text-md text-tertiary mt-2 max-w-3xl">Below are examples and variations of this textarea component:</p>
  </section>
);

const TextareaDocsPage: FC = () => (
  <div className="bg-primary min-h-screen font-sans" data-codex-docs-textarea>
    <StorybookRootHeaderPortal>
      <DocsPageBreadcrumb currentLabel="Textarea" />
    </StorybookRootHeaderPortal>
    <StorybookSbdocsTocPortal>
      <OnThisPageNav items={TOC} />
    </StorybookSbdocsTocPortal>

    <main className="relative mx-auto flex w-full max-w-304 min-w-0 flex-1 flex-col">
      <div className="text-tertiary w-full min-w-0">
        <div className="mb-10">
          <div className="pb-3">
            <h1 className="text-primary md:text-display-xs max-w-3xl text-xl font-semibold">Textarea input field</h1>
          </div>
          <p className="text-md text-tertiary mt-0 max-w-3xl whitespace-pre-line">
            React textarea input field components built for modern applications and websites. These textarea input fields are built using React Aria and styled with Tailwind CSS.
          </p>
        </div>

        {DOC_BLOCKS.map((block, index) => (
          <Fragment key={block.id}>
            {index === 1 ? <ExamplesIntro /> : null}
            <TextareaDocsSection
              id={block.id}
              title={block.title}
              code={block.code}
              sectionClassName={block.hero ? DOCS_SECTION_HERO_CLASS : undefined}
              dataPreview={block.hero}
            >
              <TextareaPreview>
                <TextArea {...block.fieldProps} />
              </TextareaPreview>
            </TextareaDocsSection>
          </Fragment>
        ))}
      </div>
    </main>
  </div>
);

const meta = {
  title: "Base components/Textarea",
  component: TextArea,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: TextareaDocsPage,
    },
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Textarea",
  args: {
    ...DEFAULT_FIELD_PROPS,
  },
};
