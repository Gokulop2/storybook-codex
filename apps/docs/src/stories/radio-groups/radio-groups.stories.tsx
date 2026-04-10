import type { FC, ReactNode } from "react";
import { useState } from "react";
import { Avatar, Checkbox, FeaturedIcon, MastercardIcon, PayPalIcon, RadioButton, RadioGroup, StripeIcon, VisaIcon, cx } from "@opus2-platform/codex";
import { CheckCircle, LayersTwo01, Star01, Users01, Zap } from "@opus2-platform/icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CODEX_DOCS_AVATAR_SRC } from "../_docs/docs-assets";
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

const SECTION_PREVIEW_WIDE = `${DOCS_PREVIEW_SURFACE_CLASS} items-start! justify-start!`.trim();

const RADIO_GROUP_LAYOUT = "w-full max-w-lg gap-3";

/** Beats Storybook docs typography on preview panels. */
const DOC_LINE_PRIMARY = "text-sm! font-medium!";
const DOC_LINE_SECONDARY = "text-sm! [color:var(--color-text-tertiary)]!";

const IMPORT_RADIO = `import { useState } from "react";
import { RadioButton, RadioGroup } from "@opus2-platform/codex";`;

const IMPORT_ICON = `${IMPORT_RADIO}
import { FeaturedIcon } from "@opus2-platform/codex";
import { CheckCircle, LayersTwo01, Star01, Users01, Zap } from "@opus2-platform/icons";`;

const IMPORT_AVATAR = `${IMPORT_RADIO}
import { Avatar } from "@opus2-platform/codex";`;

const IMPORT_PAYMENT = `${IMPORT_RADIO}
import { MastercardIcon, PayPalIcon, StripeIcon, VisaIcon } from "@opus2-platform/codex";`;

const IMPORT_CHECKBOX = `import { Checkbox } from "@opus2-platform/codex";`;

const PLANS = [
  {
    id: "basic",
    title: "Basic plan",
    price: "$10/month",
    hint: "Includes up to 10 users, 20 GB individual data and access to all features.",
  },
  {
    id: "business",
    title: "Business plan",
    price: "$20/month",
    hint: "Includes up to 20 users, 40 GB individual data and access to all features.",
  },
  {
    id: "enterprise",
    title: "Enterprise plan",
    price: "$40/month",
    hint: "Unlimited users, unlimited individual data and access to all features.",
  },
  {
    id: "ultimate",
    title: "Ultimate plan",
    price: "$60/month",
    hint: "Unlimited users, unlimited individual data and access to all features.",
  },
  {
    id: "secret",
    title: "Secret plan",
    price: "$80/month",
    hint: "Unlimited users, unlimited individual data and access to all features.",
  },
] as const;

const ICON_SIMPLE_ICONS = [Zap, Users01, Star01, CheckCircle, LayersTwo01] as const;

const AVATAR_ROWS = [
  { id: "olivia", name: "Gokul Krishnan", subtitle: "@olivia · Product Manager, Integrations" },
  { id: "phoenix", name: "Phoenix Baker", subtitle: "@phoenix · Frontend Developer, Payments" },
  { id: "lori", name: "Lori Bryson", subtitle: "@lori · Backend Developer, Payments" },
  { id: "orlando", name: "Orlando Diggs", subtitle: "@orlando · Sales Manager, Enterprise" },
  { id: "kate", name: "Kate Morrison", subtitle: "@kate · Product Designer, Dashboard" },
] as const;

const PAYMENT_ROWS = [
  { id: "visa1", brand: "visa" as const, line1: "Visa ending in 1234", line2: "Expiry 06/2028" },
  { id: "mc1", brand: "mastercard" as const, line1: "Mastercard ending in 1234", line2: "Expiry 06/2028" },
  { id: "visa2", brand: "visa" as const, line1: "Visa ending in 1234", line2: "Expiry 06/2028" },
  { id: "stripe", brand: "stripe" as const, line1: "Stripe (Visa ending 1234)", line2: "Expiry 06/2028" },
  { id: "paypal", brand: "paypal" as const, line1: "PayPal (Visa ending 1234)", line2: "Expiry 06/2028" },
] as const;

type PaymentBrand = (typeof PAYMENT_ROWS)[number]["brand"];

const PAYMENT_ICONS = {
  visa: VisaIcon,
  mastercard: MastercardIcon,
  stripe: StripeIcon,
  paypal: PayPalIcon,
} as const satisfies Record<PaymentBrand, FC<{ className?: string }>>;

const PaymentBrandIcon: FC<{ brand: PaymentBrand }> = ({ brand }) => {
  const Icon = PAYMENT_ICONS[brand];
  return <Icon className="size-10 shrink-0" />;
};

const TwoLineLabel: FC<{ primary: string; secondary: string }> = ({ primary, secondary }) => (
  <span className="inline-flex min-w-0 flex-col gap-0.5">
    <span className={DOC_LINE_PRIMARY}>{primary}</span>
    <span className={DOC_LINE_SECONDARY}>{secondary}</span>
  </span>
);

/** Leading visual + two-line text (avatar, payment mark, featured icon). */
const RichRadioLabel: FC<{
  leading: ReactNode;
  primary: string;
  secondary: string;
  align?: "start" | "center";
}> = ({ leading, primary, secondary, align = "start" }) => (
  <span className={cx("inline-flex gap-3", align === "start" ? "items-start" : "items-center")}>
    {leading}
    <TwoLineLabel primary={primary} secondary={secondary} />
  </span>
);

const IconPlanLabel: FC<{ title: string; price: string; Icon: (typeof ICON_SIMPLE_ICONS)[number] }> = ({ title, price, Icon }) => (
  <RichRadioLabel align="start" leading={<FeaturedIcon icon={Icon} color="gray" theme="light" size="sm" />} primary={title} secondary={price} />
);

const cardRadioClass = ({ isSelected, isDisabled }: { isSelected: boolean; isDisabled: boolean }) =>
  cx(
    "w-full max-w-lg rounded-xl p-4 ring-1 transition-colors duration-100 ease-linear ring-inset",
    isDisabled && "cursor-not-allowed opacity-50",
    isSelected ? "bg-brand-primary_alt ring-brand" : "bg-primary_alt ring-border-secondary"
  );

type PlanGroupVariant = "plain" | "icon" | "card";

const PlanRadioGroupDemo: FC<{ variant: PlanGroupVariant }> = ({ variant }) => {
  const [value, setValue] = useState<string>(PLANS[0].id);
  const showCard = variant === "card";
  const showIcon = variant === "icon" || showCard;

  return (
    <RadioGroup value={value} onChange={setValue} className={RADIO_GROUP_LAYOUT}>
      {PLANS.map((p, i) => (
        <RadioButton
          key={p.id}
          value={p.id}
          className={showCard ? cardRadioClass : undefined}
          label={showIcon ? <IconPlanLabel Icon={ICON_SIMPLE_ICONS[i]!} title={p.title} price={p.price} /> : p.title}
          hint={p.hint}
        />
      ))}
    </RadioGroup>
  );
};

const RadioAvatarDemo: FC = () => {
  const [value, setValue] = useState<string>(AVATAR_ROWS[0].id);
  return (
    <RadioGroup value={value} onChange={setValue} className={RADIO_GROUP_LAYOUT}>
      {AVATAR_ROWS.map((row) => (
        <RadioButton
          key={row.id}
          value={row.id}
          label={
            <RichRadioLabel align="center" leading={<Avatar src={CODEX_DOCS_AVATAR_SRC} alt="" size="md" />} primary={row.name} secondary={row.subtitle} />
          }
        />
      ))}
    </RadioGroup>
  );
};

const RadioPaymentDemo: FC = () => {
  const [value, setValue] = useState<string>(PAYMENT_ROWS[0].id);
  return (
    <RadioGroup value={value} onChange={setValue} className={RADIO_GROUP_LAYOUT}>
      {PAYMENT_ROWS.map((row) => (
        <RadioButton
          key={row.id}
          value={row.id}
          label={<RichRadioLabel align="start" leading={<PaymentBrandIcon brand={row.brand} />} primary={row.line1} secondary={row.line2} />}
        />
      ))}
    </RadioGroup>
  );
};

const CheckboxPlansDemo: FC = () => (
  <div className={cx("flex flex-col", RADIO_GROUP_LAYOUT)}>
    {PLANS.map((p) => (
      <Checkbox key={p.id} label={p.title} hint={p.hint} />
    ))}
  </div>
);

const CODE = {
  iconSimple: `${IMPORT_ICON}

<RadioGroup className="gap-3">
  <RadioButton
    value="basic"
    label={
      <span className="inline-flex items-start gap-3">
        <FeaturedIcon icon={Zap} color="gray" theme="light" size="sm" />
        <span className="inline-flex flex-col gap-0.5">
          <span className="text-sm! font-medium!">Basic plan</span>
          <span className="text-sm! [color:var(--color-text-tertiary)]!">$10/month</span>
        </span>
      </span>
    }
    hint="Includes up to 10 users…"
  />
</RadioGroup>`,
  iconCard: `${IMPORT_ICON}

<RadioGroup className="gap-3">
  <RadioButton
    value="basic"
    className={(state) =>
      \`w-full rounded-xl p-4 ring-1 \${state.isSelected ? "ring-brand bg-brand-primary_alt" : "ring-border-secondary bg-primary_alt"}\`
    }
    label={/* icon + title + price */}
    hint="…"
  />
  {/* … */}
</RadioGroup>`,
  avatar: `${IMPORT_AVATAR}

<RadioGroup className="gap-3">
  <RadioButton
    value="olivia"
    label={
      <span className="inline-flex items-center gap-3">
        <Avatar src="…" alt="" size="md" />
        <span className="inline-flex flex-col gap-0.5">
          <span className="text-sm! font-medium!">Gokul Krishnan</span>
          <span className="text-sm! [color:var(--color-text-tertiary)]!">@olivia · Product Manager</span>
        </span>
      </span>
    }
  />
</RadioGroup>`,
  payment: `${IMPORT_PAYMENT}

<RadioGroup className="gap-3">
  <RadioButton
    value="visa"
    label={
      <span className="inline-flex items-start gap-3">
        <VisaIcon className="size-10 shrink-0" />
        <span className="inline-flex flex-col gap-0.5">
          <span className="text-sm! font-medium!">Visa ending in 1234</span>
          <span className="text-sm! [color:var(--color-text-tertiary)]!">Expiry 06/2028</span>
        </span>
      </span>
    }
  />
</RadioGroup>`,
  radioPlain: `${IMPORT_RADIO}

<RadioGroup className="gap-3">
  <RadioButton value="basic" label="Basic plan" hint="Includes up to 10 users…" />
</RadioGroup>`,
  checkbox: `${IMPORT_CHECKBOX}

<div className="flex flex-col gap-3">
  <Checkbox label="Basic plan" hint="Includes up to 10 users…" />
</div>`,
} as const;

const TOC = [
  { id: "icon-simple", label: "Icon simple" },
  { id: "icon-card", label: "Icon card" },
  { id: "avatar", label: "Avatar" },
  { id: "payment-icon", label: "Payment icon" },
  { id: "radio-button", label: "Radio button" },
  { id: "checkbox", label: "Checkbox" },
] as const;

const codeClass = "text-secondary font-mono text-sm";

const SectionPreview: FC<{ children: ReactNode }> = ({ children }) => <div className="flex w-full justify-center px-2">{children}</div>;

type DocsSubsection = {
  id: (typeof TOC)[number]["id"];
  title: string;
  code: string;
  description: ReactNode;
  Demo: FC;
};

const SUBSECTIONS: DocsSubsection[] = [
  {
    id: "icon-card",
    title: "Icon card",
    code: CODE.iconCard,
    Demo: () => <PlanRadioGroupDemo variant="card" />,
    description: (
      <p>
        Use <code className={codeClass}>className</code> on <code className={codeClass}>RadioButton</code> to add a card surface (ring, padding, selected fill)
        while keeping the same <code className={codeClass}>label</code> / <code className={codeClass}>hint</code> API.
      </p>
    ),
  },
  {
    id: "avatar",
    title: "Avatar",
    code: CODE.avatar,
    Demo: RadioAvatarDemo,
    description: (
      <p>
        Pass rich JSX to <code className={codeClass}>label</code>—for example <code className={codeClass}>Avatar</code> with a stacked name and role line.
      </p>
    ),
  },
  {
    id: "payment-icon",
    title: "Payment icon",
    code: CODE.payment,
    Demo: RadioPaymentDemo,
    description: (
      <p>
        Leading payment marks from <code className={codeClass}>@opus2-platform/codex</code> (e.g. <code className={codeClass}>VisaIcon</code>) pair with
        two-line labels.
      </p>
    ),
  },
  {
    id: "radio-button",
    title: "Radio button",
    code: CODE.radioPlain,
    Demo: () => <PlanRadioGroupDemo variant="plain" />,
    description: (
      <p>
        Standard <code className={codeClass}>RadioButton</code> text label with optional <code className={codeClass}>hint</code>—best for dense plan lists.
      </p>
    ),
  },
  {
    id: "checkbox",
    title: "Checkbox",
    code: CODE.checkbox,
    Demo: CheckboxPlansDemo,
    description: (
      <p>
        For multi-select plans, use <code className={codeClass}>Checkbox</code> instead of a single-select <code className={codeClass}>RadioGroup</code>.
      </p>
    ),
  },
];

const RadioGroupsDocsPage: FC = () => (
  <div className="bg-primary min-h-screen font-sans" data-codex-docs-radio-groups>
    <StorybookRootHeaderPortal>
      <DocsPageBreadcrumb currentLabel="Radio groups" />
    </StorybookRootHeaderPortal>
    <StorybookSbdocsTocPortal>
      <OnThisPageNav items={TOC} />
    </StorybookSbdocsTocPortal>

    <main className="relative mx-auto flex w-full max-w-304 min-w-0 flex-1 flex-col">
      <div className="text-tertiary w-full min-w-0">
        <div className="mb-10">
          <div className="pb-3">
            <h1 className="text-primary md:text-display-xs max-w-3xl text-xl font-semibold">Radio group components</h1>
          </div>
          <p className="text-md text-tertiary mt-0 max-w-3xl whitespace-pre-line">
            Powerful and customizable React radio group components built for modern applications and websites. These radio groups are built using React Aria and
            styled with Tailwind CSS.
          </p>
        </div>

        <DocsSection
          id="icon-simple"
          title="Icon simple"
          code={CODE.iconSimple}
          sectionClassName={DOCS_SECTION_HERO_CLASS}
          dataPreview
          previewClassName={DOCS_PREVIEW_HERO_SURFACE_CLASS}
        >
          <SectionPreview>
            <PlanRadioGroupDemo variant="icon" />
          </SectionPreview>
        </DocsSection>

        <section id="radio-group-examples" className={`scroll-mt-20 ${DOCS_SECTION_CLASS}`}>
          <h2 className="text-primary text-lg font-semibold md:text-xl">
            <SectionTitle className="text-lg font-semibold md:text-xl">Radio group examples</SectionTitle>
          </h2>
          <p className="text-md text-tertiary mt-2 max-w-3xl">
            Below are examples and variations of common radio group layouts.
          </p>
        </section>

        {SUBSECTIONS.map(({ id, title, code, description, Demo }) => (
          <DocsSection key={id} id={id} title={title} code={code} previewClassName={SECTION_PREVIEW_WIDE} description={description}>
            <SectionPreview>
              <Demo />
            </SectionPreview>
          </DocsSection>
        ))}
      </div>
    </main>
  </div>
);

const meta = {
  title: "Base components/Radio groups",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: RadioGroupsDocsPage,
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  tags: ["!dev"],
  name: "Radio groups",
  args: {
    defaultValue: PLANS[0].id,
    className: RADIO_GROUP_LAYOUT,
    children: (
      <>
        {PLANS.map((p) => (
          <RadioButton key={p.id} value={p.id} label={p.title} hint={p.hint} />
        ))}
      </>
    ),
  },
};
