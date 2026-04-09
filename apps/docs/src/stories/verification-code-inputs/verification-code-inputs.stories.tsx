import type { ComponentProps, FC, ReactNode } from "react";
import { Fragment } from "react";
import { PinInput } from "@opus2-platform/codex";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DocsPageBreadcrumb } from "../_docs/docs-page-breadcrumb";
import {
  DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK_TIGHT,
  DOCS_PREVIEW_P_MARGIN_RESET,
  DOCS_SECTION_HERO_CLASS,
  type DocsSectionProps,
  DocsSection,
  SectionTitle,
} from "../_docs/docs-preview-code";
import { OnThisPageNav, StorybookRootHeaderPortal, StorybookSbdocsTocPortal } from "../_docs/docs-scaffold";

/** Pin-input layout reference (segmented digits + separators). */
const LABEL = "Secure code";
const HINT = "This is a hint text to help user.";

const DIGITS_4 = [0, 1, 2, 3] as const;
const DIGITS_6_FIRST = [0, 1, 2] as const;
const DIGITS_6_SECOND = [3, 4, 5] as const;

const REGEXP_IMPORT = `import { REGEXP_ONLY_DIGITS } from "input-otp";`;
const PIN_IMPORT = `import { PinInput } from "@opus2-platform/codex";`;

const withPinImports = (body: string) => `${REGEXP_IMPORT}\n${PIN_IMPORT}\n\n${body}`;

/** Code-tab lines for `<PinInput.Slot />` with consistent indentation. */
const slotLines = (indices: readonly number[], indent: number) => {
  const pad = " ".repeat(indent);
  return indices.map((i) => `${pad}<PinInput.Slot index={${i}} />`).join("\n");
};

const snippetPinFour = (rootAttrs: string) => `<PinInput${rootAttrs}>
  <PinInput.Label>${LABEL}</PinInput.Label>
  <PinInput.Group maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
${slotLines(DIGITS_4, 8)}
  </PinInput.Group>
  <PinInput.Description>${HINT}</PinInput.Description>
</PinInput>`;

const snippetSixWithSeparator = `<PinInput size="md">
  <PinInput.Label>${LABEL}</PinInput.Label>
  <PinInput.Group maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
${slotLines(DIGITS_6_FIRST, 8)}
        <PinInput.Separator />
${slotLines(DIGITS_6_SECOND, 8)}
  </PinInput.Group>
  <PinInput.Description>${HINT}</PinInput.Description>
</PinInput>`;

const PIN_SIZES = ["sm", "md", "lg"] as const;

const snippetSizes = `<div className="flex flex-col gap-8">
${PIN_SIZES.map(
  (size) => `  <PinInput size="${size}">
    <PinInput.Label>${LABEL}</PinInput.Label>
    <PinInput.Group maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
${slotLines(DIGITS_4, 6)}
    </PinInput.Group>
    <PinInput.Description>${HINT}</PinInput.Description>
  </PinInput>`,
).join("\n\n")}
</div>`;

const CODE = {
  /** Hero + “With separator” (`VerificationCodeInputMD`). */
  sixWithSeparator: withPinImports(snippetSixWithSeparator),
  fourDigits: withPinImports(snippetPinFour("")),
  disabled: withPinImports(snippetPinFour(" disabled")),
  sizes: withPinImports(snippetSizes),
} as const;

const PREVIEW_WELL = `${DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK_TIGHT} ${DOCS_PREVIEW_P_MARGIN_RESET} items-center! justify-center!`.trim();

const PinDocsSection: FC<DocsSectionProps> = ({ previewClassName, ...rest }) => (
  <DocsSection {...rest} previewClassName={previewClassName ?? PREVIEW_WELL} />
);

type PinSize = NonNullable<ComponentProps<typeof PinInput>["size"]>;

const PIN_INNER_MAX: Record<"narrow" | "wide", string> = {
  narrow: "mx-auto w-full max-w-xs",
  wide: "mx-auto w-full max-w-md",
};

const PinInner: FC<{ children: ReactNode; variant?: "narrow" | "wide" }> = ({ children, variant = "narrow" }) => (
  <div className={PIN_INNER_MAX[variant]}>{children}</div>
);

const FourDigitFields: FC<{ disabled?: boolean; size?: PinSize }> = ({ disabled, size = "md" }) => (
  <PinInput disabled={disabled} size={size}>
    <PinInput.Label>{LABEL}</PinInput.Label>
    <PinInput.Group maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
      {DIGITS_4.map((i) => (
        <PinInput.Slot key={i} index={i} />
      ))}
    </PinInput.Group>
    <PinInput.Description>{HINT}</PinInput.Description>
  </PinInput>
);

const SixWithSeparatorFields: FC<{ size?: PinSize }> = ({ size = "md" }) => (
  <PinInput size={size}>
    <PinInput.Label>{LABEL}</PinInput.Label>
    <PinInput.Group maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
      {DIGITS_6_FIRST.map((i) => (
        <PinInput.Slot key={i} index={i} />
      ))}
      <PinInput.Separator />
      {DIGITS_6_SECOND.map((i) => (
        <PinInput.Slot key={i} index={i} />
      ))}
    </PinInput.Group>
    <PinInput.Description>{HINT}</PinInput.Description>
  </PinInput>
);

/** Shared by hero and “With separator” (identical preview). */
const PreviewSixWithSeparator: FC = () => (
  <PinInner variant="wide">
    <SixWithSeparatorFields />
  </PinInner>
);

const SizesDemo: FC = () => (
  <div className="flex flex-col gap-8">
    {PIN_SIZES.map((size) => (
      <FourDigitFields key={size} size={size} />
    ))}
  </div>
);

const TOC = [
  { id: "verification-code-input-example", label: "Verification code input example" },
  { id: "verification-code-input-examples", label: "Verification code input examples" },
  { id: "four-digits", label: "Four digits" },
  { id: "with-separator", label: "With separator" },
  { id: "disabled", label: "Disabled" },
  { id: "sizes", label: "Sizes" },
] as const;

const INTRO_BEFORE_SECTION_ID = "four-digits";

type VerificationDocSection = {
  id: string;
  title: string;
  code: string;
  hero?: boolean;
  render: () => ReactNode;
};

const VERIFICATION_DOC_SECTIONS: VerificationDocSection[] = [
  {
    id: "verification-code-input-example",
    title: "Verification code input example",
    code: CODE.sixWithSeparator,
    hero: true,
    render: () => <PreviewSixWithSeparator />,
  },
  {
    id: "four-digits",
    title: "Four digits",
    code: CODE.fourDigits,
    render: () => (
      <PinInner>
        <FourDigitFields />
      </PinInner>
    ),
  },
  {
    id: "with-separator",
    title: "With separator",
    code: CODE.sixWithSeparator,
    render: () => <PreviewSixWithSeparator />,
  },
  {
    id: "disabled",
    title: "Disabled",
    code: CODE.disabled,
    render: () => (
      <PinInner>
        <FourDigitFields disabled />
      </PinInner>
    ),
  },
  {
    id: "sizes",
    title: "Sizes",
    code: CODE.sizes,
    render: () => (
      <PinInner variant="wide">
        <SizesDemo />
      </PinInner>
    ),
  },
];

const ExamplesIntro: FC = () => (
  <section id="verification-code-input-examples" className="scroll-mt-20 pb-2">
    <h2 className="text-primary text-lg font-semibold md:text-xl">
      <SectionTitle className="text-lg font-semibold md:text-xl">Verification code input examples</SectionTitle>
    </h2>
    <p className="text-md text-tertiary mt-2 max-w-3xl">Below are examples and variations of this verification code input component:</p>
  </section>
);

const VerificationCodeInputsDocsPage: FC = () => (
  <div className="bg-primary min-h-screen font-sans" data-codex-docs-verification-code-inputs>
    <StorybookRootHeaderPortal>
      <DocsPageBreadcrumb currentLabel="Verification code inputs" />
    </StorybookRootHeaderPortal>
    <StorybookSbdocsTocPortal>
      <OnThisPageNav items={TOC} />
    </StorybookSbdocsTocPortal>

    <main className="relative mx-auto flex w-full max-w-304 min-w-0 flex-1 flex-col">
      <div className="text-tertiary w-full min-w-0">
        <div className="mb-10">
          <div className="pb-3">
            <h1 className="text-primary md:text-display-xs max-w-3xl text-xl font-semibold">Verification code input components</h1>
          </div>
          <p className="text-md text-tertiary mt-0 max-w-3xl whitespace-pre-line">
            React verification code input components built for modern applications and websites. These verification code inputs are built using Input OTP and styled with Tailwind CSS.
          </p>
        </div>

        {VERIFICATION_DOC_SECTIONS.map((section) => (
          <Fragment key={section.id}>
            {section.id === INTRO_BEFORE_SECTION_ID ? <ExamplesIntro /> : null}
            <PinDocsSection
              id={section.id}
              title={section.title}
              code={section.code}
              sectionClassName={section.hero ? DOCS_SECTION_HERO_CLASS : undefined}
              dataPreview={section.hero}
            >
              {section.render()}
            </PinDocsSection>
          </Fragment>
        ))}
      </div>
    </main>
  </div>
);

const meta = {
  title: "Base components/Verification code inputs",
  component: PinInput,
  tags: ["autodocs", "hidden"],
  parameters: {
    docs: {
      page: VerificationCodeInputsDocsPage,
    },
  },
} satisfies Meta<typeof PinInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  tags: ["!dev"],
  name: "Verification code inputs",
  render: () => (
    <PinInner>
      <FourDigitFields />
    </PinInner>
  ),
};
