import type { FC, ReactNode } from "react";
import {
  Button,
  DateInput,
  FileTrigger,
  HintText,
  Input,
  InputBase,
  InputGroup,
  InputTags,
  InputTagsOuter,
  Label,
  NativeSelect,
  PaymentInput,
} from "@opus2-platform/codex";
import { ChevronDown, ChevronUp, Copy01, Mail01, Minus, Plus } from "@opus2-platform/icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button as AriaButton, DateField, Group, Input as NumberFieldInput, NumberField } from "react-aria-components";
import { DocsPageBreadcrumb } from "../_docs/docs-page-breadcrumb";
import { DOCS_PREVIEW_HERO_SURFACE_CLASS, DOCS_SECTION_HERO_CLASS, DocsSection } from "../_docs/docs-preview-code";
import { OnThisPageNav, StorybookRootHeaderPortal, StorybookSbdocsTocPortal } from "../_docs/docs-scaffold";
import {
  NUMBER_FIELD_INPUT_CLASS,
  NUMBER_FIELD_LAYOUT,
  NUMBER_HORIZONTAL_GROUP_CLASS,
  NUMBER_VERTICAL_GROUP_SNIPPET,
  NATIVE_SELECT_CURRENCY_OPTIONS,
  NATIVE_SELECT_REGION_OPTIONS,
  formatNativeSelectOptionsForCode,
  numberVerticalGroupClassName,
  TAG_INPUT_SEED_LABELS,
} from "./inputs-docs-shared";

const HINT = "This is a hint text to help user.";
const ERROR_HINT = "This is an error message.";
/** Drives the trailing help control (`Tooltip` + HelpCircle) on `Input` / `InputBase`. */
const TOOLTIP = "We’ll use this to respond to your request.";

const IMPORT = `import {
  Button,
  FileTrigger,
  Input,
  InputBase,
  InputGroup,
  NativeSelect,
  PaymentInput,
} from "@opus2-platform/codex";
import { Copy01, Mail01 } from "@opus2-platform/icons";
`;

/** Snippet for segmented date/time field, not native `type="date"`. */
const IMPORT_DATE = `import { DateField } from "react-aria-components";
import { DateInput, HintText, Label } from "@opus2-platform/codex";
`;

/** Snippet for React Aria `NumberField` steppers (horizontal / vertical number inputs). */
const IMPORT_NUMBER = `import { Button as AriaButton, Group, Input as NumberFieldInput, NumberField } from "react-aria-components";
import { ChevronDown, ChevronUp, Minus, Plus } from "@opus2-platform/icons";
import { Button, HintText, Label } from "@opus2-platform/codex";
`;

const IMPORT_TAG_INPUT = `import { InputTags } from "@opus2-platform/codex";
`;

const IMPORT_TAG_INPUT_OUTER = `import { InputTagsOuter } from "@opus2-platform/codex";
`;

const PreviewWell: FC<{ children: ReactNode }> = ({ children }) => <div className="flex w-full max-w-md justify-center py-4">{children}</div>;

/** Segmented date + time (mm/dd/yyyy + 12h clock). */
const DateInputDemo = () => (
  <DateField className="group flex w-full max-w-md flex-col gap-1.5" granularity="minute" hourCycle={12}>
    <Label isRequired tooltip={TOOLTIP}>
      Date
    </Label>
    <DateInput className="w-full min-w-0" />
    <HintText>{HINT}</HintText>
  </DateField>
);

/** [−] [value] [+] — horizontal number field with grouped steppers. */
const NumberInputHorizontalDemo = () => (
  <NumberField className={NUMBER_FIELD_LAYOUT} defaultValue={0}>
    <Label isRequired tooltip={TOOLTIP}>
      Number
    </Label>
    <Group className={NUMBER_HORIZONTAL_GROUP_CLASS}>
      <Button
        slot="decrement"
        color="tertiary"
        size="sm"
        aria-label="Decrease"
        iconLeading={Minus}
        className="!h-auto min-h-10 w-10 shrink-0 !rounded-none !rounded-l-lg !rounded-r-none !px-0 shadow-none ring-0"
      />
      <NumberFieldInput className={NUMBER_FIELD_INPUT_CLASS} />
      <Button
        slot="increment"
        color="tertiary"
        size="sm"
        aria-label="Increase"
        iconLeading={Plus}
        className="!h-auto min-h-10 w-10 shrink-0 !rounded-none !rounded-l-none !rounded-r-lg !px-0 shadow-none ring-0"
      />
    </Group>
    <HintText>{HINT}</HintText>
  </NumberField>
);

/** Input + stacked chevrons — vertical number field (`AriaButton` + `w-7`, not Codex `Button`). */
const NumberInputVerticalDemo = () => (
  <NumberField className={NUMBER_FIELD_LAYOUT} defaultValue={0}>
    <Label isRequired tooltip={TOOLTIP}>
      Number
    </Label>
    <Group className={numberVerticalGroupClassName}>
      <NumberFieldInput className={NUMBER_FIELD_INPUT_CLASS} />
      <div className="flex w-7 shrink-0 flex-col border-l border-primary">
        <AriaButton
          slot="increment"
          aria-label="Increase"
          className="outline-brand flex flex-1 cursor-pointer items-center justify-center text-fg-quaternary transition duration-100 ease-linear hover:bg-primary_hover hover:text-fg-quaternary_hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronUp aria-hidden className="size-3 stroke-3" />
        </AriaButton>
        <AriaButton
          slot="decrement"
          aria-label="Decrease"
          className="outline-brand flex flex-1 cursor-pointer items-center justify-center border-t border-primary text-fg-quaternary transition duration-100 ease-linear hover:bg-primary_hover hover:text-fg-quaternary_hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronDown aria-hidden className="size-3 stroke-3" />
        </AriaButton>
      </div>
    </Group>
    <HintText>{HINT}</HintText>
  </NumberField>
);

/** Tags inside the field. */
const TagInputDemo = () => (
  <InputTags
    className="w-full max-w-md"
    label="Tags"
    isRequired
    tooltip={TOOLTIP}
    hint={HINT}
    placeholder="Add a tag"
    defaultValue={[...TAG_INPUT_SEED_LABELS]}
  />
);

/** Tags below the field (“tag input outer”). */
const TagInputOuterDemo = () => (
  <InputTagsOuter
    className="w-full max-w-md"
    label="Tags"
    isRequired
    tooltip={TOOLTIP}
    hint={HINT}
    placeholder="Add a tag"
    defaultValue={[...TAG_INPUT_SEED_LABELS]}
  />
);

const EmailDefault = () => <Input label="Email" isRequired placeholder="olivia@opus2.com" hint={HINT} tooltip={TOOLTIP} />;

const CODE_HERO = `${IMPORT}

<Input label="Email" isRequired placeholder="olivia@opus2.com" hint="${HINT}" tooltip="${TOOLTIP}" />`;

const SECTIONS = [
  {
    id: "default",
    title: "Default",
    code: `${IMPORT}

<Input label="Email" isRequired placeholder="olivia@opus2.com" hint="${HINT}" tooltip="${TOOLTIP}" />`,
    Demo: EmailDefault,
  },
  {
    id: "disabled",
    title: "Disabled",
    code: `${IMPORT}

<Input label="Email" isRequired isDisabled placeholder="olivia@opus2.com" hint="${HINT}" tooltip="${TOOLTIP}" />`,
    Demo: () => <Input label="Email" isRequired isDisabled placeholder="olivia@opus2.com" hint={HINT} tooltip={TOOLTIP} />,
  },
  {
    id: "invalid",
    title: "Invalid",
    code: `${IMPORT}

<Input label="Email" isRequired isInvalid hint="${ERROR_HINT}" placeholder="olivia@opus2.com" />`,
    Demo: () => <Input label="Email" isRequired isInvalid hint={ERROR_HINT} placeholder="olivia@opus2.com" />,
  },
  {
    id: "sizes",
    title: "Sizes",
    code: `${IMPORT}

<div className="flex w-full max-w-md flex-col gap-5">
  <Input size="sm" label="Email" isRequired placeholder="olivia@opus2.com" hint="${HINT}" tooltip="${TOOLTIP}" />
  <Input size="md" label="Email" isRequired placeholder="olivia@opus2.com" hint="${HINT}" tooltip="${TOOLTIP}" />
</div>`,
    Demo: () => (
      <div className="flex w-full max-w-md flex-col gap-5">
        <Input size="sm" label="Email" isRequired placeholder="olivia@opus2.com" hint={HINT} tooltip={TOOLTIP} />
        <Input size="md" label="Email" isRequired placeholder="olivia@opus2.com" hint={HINT} tooltip={TOOLTIP} />
      </div>
    ),
  },
  {
    id: "leading-icon",
    title: "Leading icon",
    code: `${IMPORT}

<Input label="Email" isRequired icon={Mail01} placeholder="olivia@opus2.com" hint="${HINT}" tooltip="${TOOLTIP}" />`,
    Demo: () => <Input label="Email" isRequired icon={Mail01} placeholder="olivia@opus2.com" hint={HINT} tooltip={TOOLTIP} />,
  },
  {
    id: "leading-dropdown",
    title: "Leading dropdown",
    code: `${IMPORT}

<InputGroup
  label="Phone number"
  isRequired
  hint="${HINT}"
  leadingAddon={
    <NativeSelect
      aria-label="Region"
      defaultValue="US"
      options={[
${formatNativeSelectOptionsForCode(NATIVE_SELECT_REGION_OPTIONS)}
      ]}
    />
  }
>
  <InputBase placeholder="(555) 000-0000" tooltip="${TOOLTIP}" />
</InputGroup>`,
    Demo: () => (
      <InputGroup
        label="Phone number"
        isRequired
        hint={HINT}
        leadingAddon={<NativeSelect aria-label="Region" defaultValue="US" options={[...NATIVE_SELECT_REGION_OPTIONS]} />}
      >
        <InputBase placeholder="(555) 000-0000" tooltip={TOOLTIP} />
      </InputGroup>
    ),
  },
  {
    id: "trailing-dropdown",
    title: "Trailing dropdown",
    code: `${IMPORT}

<InputGroup
  label="Sale amount"
  isRequired
  hint="${HINT}"
  prefix="$"
  prefixClassName="!my-[8px]"
  trailingAddon={
    <NativeSelect
      aria-label="Currency"
      defaultValue="USD"
      options={[
${formatNativeSelectOptionsForCode(NATIVE_SELECT_CURRENCY_OPTIONS)}
      ]}
    />
  }
>
  <InputBase placeholder="0.00" tooltip="${TOOLTIP}" />
</InputGroup>`,
    Demo: () => (
      <InputGroup
        label="Sale amount"
        isRequired
        hint={HINT}
        prefix="$"
        prefixClassName="!my-[8px]"
        trailingAddon={<NativeSelect aria-label="Currency" defaultValue="USD" options={[...NATIVE_SELECT_CURRENCY_OPTIONS]} />}
      >
        <InputBase placeholder="0.00" tooltip={TOOLTIP} />
      </InputGroup>
    ),
  },
  {
    id: "leading-text",
    title: "Leading text",
    code: `${IMPORT}

<InputGroup label="Website" isRequired hint="${HINT}" prefix="https://">
  <InputBase placeholder="example.com" tooltip="${TOOLTIP}" />
</InputGroup>`,
    Demo: () => (
      <InputGroup label="Website" isRequired hint={HINT} prefix="https://">
        <InputBase placeholder="example.com" tooltip={TOOLTIP} />
      </InputGroup>
    ),
  },
  {
    id: "payment-input",
    title: "Payment input",
    code: `${IMPORT}

<PaymentInput label="Card number" isRequired hint="${HINT}" placeholder="1234 1234 1234 1234" tooltip="${TOOLTIP}" />`,
    Demo: () => <PaymentInput label="Card number" isRequired hint={HINT} placeholder="1234 1234 1234 1234" tooltip={TOOLTIP} />,
  },
  {
    id: "trailing-button",
    title: "Trailing button",
    code: `${IMPORT}

<InputGroup
  label="Website"
  isRequired
  hint="${HINT}"
  trailingAddon={<Button color="secondary" iconLeading={Copy01}>Copy</Button>}
>
  <InputBase placeholder="www.opus2.com" tooltip="${TOOLTIP}" />
</InputGroup>`,
    Demo: () => (
      <InputGroup
        label="Website"
        isRequired
        hint={HINT}
        trailingAddon={
          <Button color="secondary" iconLeading={Copy01}>
            Copy
          </Button>
        }
      >
        <InputBase placeholder="www.opus2.com" tooltip={TOOLTIP} />
      </InputGroup>
    ),
  },
  {
    id: "file-upload",
    title: "File upload",
    code: `${IMPORT}

<InputGroup
  label="Upload file"
  isRequired
  hint="SVG, PNG, JPG or GIF (max. 800x400px)."
  trailingAddon={
    <FileTrigger onSelect={() => {}}>
      <Button color="secondary">Upload</Button>
    </FileTrigger>
  }
>
  <InputBase placeholder="No file chosen" isReadOnly tooltip="${TOOLTIP}" />
</InputGroup>`,
    Demo: () => (
      <InputGroup
        label="Upload file"
        isRequired
        hint="SVG, PNG, JPG or GIF (max. 800x400px)."
        trailingAddon={
          <FileTrigger onSelect={() => {}}>
            <Button color="secondary">Upload</Button>
          </FileTrigger>
        }
      >
        <InputBase placeholder="No file chosen" isReadOnly tooltip={TOOLTIP} />
      </InputGroup>
    ),
  },
  {
    id: "password-input",
    title: "Password input",
    code: `${IMPORT}

<InputGroup label="Password" isRequired hint="Must be at least 8 characters.">
  <InputBase type="password" placeholder="••••••••" autoComplete="new-password" tooltip="${TOOLTIP}" />
</InputGroup>`,
    Demo: () => (
      <InputGroup label="Password" isRequired hint="Must be at least 8 characters.">
        <InputBase type="password" placeholder="••••••••" autoComplete="new-password" tooltip={TOOLTIP} />
      </InputGroup>
    ),
  },
  {
    id: "date-input",
    title: "Date input",
    code: `${IMPORT_DATE}

<DateField className="group flex w-full flex-col gap-1.5" granularity="minute" hourCycle={12}>
  <Label isRequired tooltip="${TOOLTIP}">
    Date
  </Label>
  <DateInput className="w-full min-w-0" />
  <HintText>${HINT}</HintText>
</DateField>`,
    Demo: DateInputDemo,
  },
  {
    id: "number-input-horizontal",
    title: "Number input horizontal",
    code: `${IMPORT_NUMBER}

<NumberField className="${NUMBER_FIELD_LAYOUT}" defaultValue={0}>
  <Label isRequired tooltip="${TOOLTIP}">
    Number
  </Label>
  <Group className="${NUMBER_HORIZONTAL_GROUP_CLASS}">
    <Button
      slot="decrement"
      color="tertiary"
      size="sm"
      aria-label="Decrease"
      iconLeading={Minus}
      className="!h-auto min-h-10 w-10 shrink-0 !rounded-none !rounded-l-lg !rounded-r-none !px-0 shadow-none ring-0"
    />
    <NumberFieldInput className="${NUMBER_FIELD_INPUT_CLASS}" />
    <Button
      slot="increment"
      color="tertiary"
      size="sm"
      aria-label="Increase"
      iconLeading={Plus}
      className="!h-auto min-h-10 w-10 shrink-0 !rounded-none !rounded-l-none !rounded-r-lg !px-0 shadow-none ring-0"
    />
  </Group>
  <HintText>${HINT}</HintText>
</NumberField>`,
    Demo: NumberInputHorizontalDemo,
  },
  {
    id: "number-input-vertical",
    title: "Number input vertical",
    code: `${IMPORT_NUMBER}

${NUMBER_VERTICAL_GROUP_SNIPPET}

<NumberField className="${NUMBER_FIELD_LAYOUT}" defaultValue={0}>
  <Label isRequired tooltip="${TOOLTIP}">
    Number
  </Label>
  <Group className={numberVerticalGroupClassName}>
    <NumberFieldInput className="${NUMBER_FIELD_INPUT_CLASS}" />
    <div className="flex w-7 shrink-0 flex-col border-l border-primary">
      <AriaButton
        slot="increment"
        aria-label="Increase"
        className="outline-brand flex flex-1 cursor-pointer items-center justify-center text-fg-quaternary transition duration-100 ease-linear hover:bg-primary_hover hover:text-fg-quaternary_hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronUp aria-hidden className="size-3 stroke-3" />
      </AriaButton>
      <AriaButton
        slot="decrement"
        aria-label="Decrease"
        className="outline-brand flex flex-1 cursor-pointer items-center justify-center border-t border-primary text-fg-quaternary transition duration-100 ease-linear hover:bg-primary_hover hover:text-fg-quaternary_hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronDown aria-hidden className="size-3 stroke-3" />
      </AriaButton>
    </div>
  </Group>
  <HintText>${HINT}</HintText>
</NumberField>`,
    Demo: NumberInputVerticalDemo,
  },
  {
    id: "tag-input",
    title: "Tag input",
    code: `${IMPORT_TAG_INPUT}

<InputTags
  className="w-full max-w-md"
  label="Tags"
  isRequired
  tooltip="${TOOLTIP}"
  hint="${HINT}"
  placeholder="Add a tag"
  defaultValue={${JSON.stringify([...TAG_INPUT_SEED_LABELS])}}
/>`,
    Demo: TagInputDemo,
  },
  {
    id: "tag-input-outer",
    title: "Tag input outer",
    code: `${IMPORT_TAG_INPUT_OUTER}

<InputTagsOuter
  className="w-full max-w-md"
  label="Tags"
  isRequired
  tooltip="${TOOLTIP}"
  hint="${HINT}"
  placeholder="Add a tag"
  defaultValue={${JSON.stringify([...TAG_INPUT_SEED_LABELS])}}
/>`,
    Demo: TagInputOuterDemo,
  },
];

const TOC = [{ id: "input-example", label: "Input example" }, ...SECTIONS.map((s) => ({ id: s.id, label: s.title }))];

const InputsDocsPage: FC = () => (
  <div className="bg-primary min-h-screen font-sans" data-codex-docs-inputs>
    <StorybookRootHeaderPortal>
      <DocsPageBreadcrumb currentLabel="Inputs" />
    </StorybookRootHeaderPortal>
    <StorybookSbdocsTocPortal>
      <OnThisPageNav items={TOC} />
    </StorybookSbdocsTocPortal>

    <main className="relative mx-auto flex w-full max-w-304 min-w-0 flex-1 flex-col">
      <div className="text-tertiary w-full min-w-0">
        <div className="mb-10">
          <div className="pb-3">
            <h1 className="text-primary md:text-display-xs max-w-3xl text-xl font-semibold">Input field</h1>
          </div>
          <p className="text-md text-tertiary mt-0 max-w-3xl whitespace-pre-line">
            React input field components for forms and data entry. Built with React Aria, Tailwind CSS, and the Codex design tokens.
          </p>
        </div>

        <DocsSection
          id="input-example"
          title="Input example"
          code={CODE_HERO}
          sectionClassName={DOCS_SECTION_HERO_CLASS}
          dataPreview
          previewClassName={DOCS_PREVIEW_HERO_SURFACE_CLASS}
        >
          <div className="flex w-full max-w-md justify-center">
            <EmailDefault />
          </div>
        </DocsSection>

        {SECTIONS.map((s) => {
          const Demo = s.Demo;
          return (
            <DocsSection key={s.id} id={s.id} title={s.title} code={s.code}>
              <PreviewWell>
                <Demo />
              </PreviewWell>
            </DocsSection>
          );
        })}
      </div>
    </main>
  </div>
);

const meta = {
  title: "Base components/Inputs",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: InputsDocsPage,
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  tags: ["!dev"],
  name: "Inputs",
  args: {
    label: "Email",
    isRequired: true,
    placeholder: "olivia@opus2.com",
    hint: HINT,
    tooltip: TOOLTIP,
  },
};
