import type { FC, ReactNode } from "react";
import { MultiSelect } from "@opus2-platform/codex";
import type { SelectItemType } from "@opus2-platform/codex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ListData } from "react-stately";
import { useListData } from "react-stately";
import { CODEX_DOCS_AVATAR_SRC } from "../_docs/docs-assets";
import { UntitledDocsBreadcrumb } from "../_docs/untitled-docs-breadcrumb";
import {
  DOCS_PREVIEW_HERO_SURFACE_CLASS,
  DOCS_PREVIEW_INNER_MAX_XS_CLASS,
  DOCS_PREVIEW_SURFACE_CLASS,
  DOCS_SECTION_HERO_CLASS,
  DocsSection,
  SectionTitle,
} from "../_docs/untitled-docs-preview-code";
import { OnThisPageNav, StorybookRootHeaderPortal, StorybookSbdocsTocPortal } from "../_docs/untitled-docs-scaffold";

const SECTION_PREVIEW = `${DOCS_PREVIEW_SURFACE_CLASS} items-start! justify-start!`.trim();

const HINT = "This is a hint text to help user.";
const LABEL = "Teams";
const PLACEHOLDER = "Select teams";

const AVATAR = CODEX_DOCS_AVATAR_SRC;

/** Team rows (Untitled-style labels + supporting counts); avatars power tag chips. */
const TEAMS: SelectItemType[] = [
  { id: "design", label: "Design", supportingText: "4 members", avatarUrl: AVATAR },
  { id: "product", label: "Product", supportingText: "8 members", avatarUrl: AVATAR },
  { id: "engineering", label: "Engineering", supportingText: "12 members", avatarUrl: AVATAR },
  { id: "marketing", label: "Marketing", supportingText: "6 members", avatarUrl: AVATAR },
  { id: "sales", label: "Sales", supportingText: "10 members", avatarUrl: AVATAR },
  { id: "support", label: "Support", supportingText: "5 members", avatarUrl: AVATAR },
  { id: "ops", label: "Operations", supportingText: "3 members", avatarUrl: AVATAR },
  { id: "hr", label: "Human resources", supportingText: "2 members", avatarUrl: AVATAR },
];

const INITIAL_TWO: SelectItemType[] = [
  { id: "design", label: "Design", supportingText: "4 members", avatarUrl: AVATAR },
  { id: "product", label: "Product", supportingText: "8 members", avatarUrl: AVATAR },
];

const IMPORT = `import { MultiSelect } from "@opus2-platform/codex";
import { useListData } from "react-stately";

const items = [
  { id: "design", label: "Design", supportingText: "4 members", avatarUrl: "…" },
  // …
];`;

const CODE_HERO = `${IMPORT}

const selectedItems = useListData({
  initialItems: [
    { id: "design", label: "Design", supportingText: "4 members", avatarUrl: "…" },
    { id: "product", label: "Product", supportingText: "8 members", avatarUrl: "…" },
  ],
});

<MultiSelect
  label="Teams"
  placeholder="Select teams"
  items={items}
  selectedItems={selectedItems}
  triggerDisplay="summary"
  hint="This is a hint text to help user."
  isRequired
>
  {(item) => (
    <MultiSelect.Item id={item.id} label={item.label} supportingText={item.supportingText} avatarUrl={item.avatarUrl} />
  )}
</MultiSelect>`;

const CODE = {
  hero: CODE_HERO,
  small: `${IMPORT}

const selectedItems = useListData({
  initialItems: [
    { id: "design", label: "Design", supportingText: "4 members", avatarUrl: "…" },
    { id: "product", label: "Product", supportingText: "8 members", avatarUrl: "…" },
  ],
});

<MultiSelect
  size="sm"
  label="Teams"
  placeholder="Select teams"
  items={items}
  selectedItems={selectedItems}
  triggerDisplay="summary"
  hint="This is a hint text to help user."
  isRequired
>
  {(item) => (
    <MultiSelect.Item id={item.id} label={item.label} supportingText={item.supportingText} avatarUrl={item.avatarUrl} />
  )}
</MultiSelect>`,
  medium: `${IMPORT}

const selectedItems = useListData({
  initialItems: [
    { id: "design", label: "Design", supportingText: "4 members", avatarUrl: "…" },
    { id: "product", label: "Product", supportingText: "8 members", avatarUrl: "…" },
  ],
});

<MultiSelect
  size="md"
  label="Teams"
  placeholder="Select teams"
  items={items}
  selectedItems={selectedItems}
  triggerDisplay="summary"
  hint="This is a hint text to help user."
  isRequired
>
  {(item) => (
    <MultiSelect.Item id={item.id} label={item.label} supportingText={item.supportingText} avatarUrl={item.avatarUrl} />
  )}
</MultiSelect>`,
  large: `${IMPORT}

const selectedItems = useListData({
  initialItems: [
    { id: "design", label: "Design", supportingText: "4 members", avatarUrl: "…" },
    { id: "product", label: "Product", supportingText: "8 members", avatarUrl: "…" },
  ],
});

<MultiSelect
  size="md"
  label="Teams"
  placeholder="Select teams"
  items={items}
  selectedItems={selectedItems}
  triggerDisplay="summary"
  hint="This is a hint text to help user."
  isRequired
>
  {(item) => (
    <MultiSelect.Item id={item.id} label={item.label} supportingText={item.supportingText} avatarUrl={item.avatarUrl} />
  )}
</MultiSelect>`,
  disabled: `${IMPORT}

const selectedItems = useListData({ initialItems: [] });

<MultiSelect
  isDisabled
  label="Teams"
  placeholder="Select teams"
  items={items}
  selectedItems={selectedItems}
  triggerDisplay="summary"
  hint="This is a hint text to help user."
  isRequired
>
  {(item) => (
    <MultiSelect.Item id={item.id} label={item.label} supportingText={item.supportingText} avatarUrl={item.avatarUrl} />
  )}
</MultiSelect>`,
} as const;

const TOC = [
  { id: "multi-select-example", label: "Multi-select example" },
  { id: "multi-select-examples-intro", label: "Multi-select examples" },
  { id: "small", label: "Small" },
  { id: "medium", label: "Medium" },
  { id: "large", label: "Large" },
  { id: "disabled", label: "Disabled" },
] as const;

const codeClass = "text-secondary font-mono text-sm";

const SectionPreview: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="flex w-full justify-center">
    <div className={DOCS_PREVIEW_INNER_MAX_XS_CLASS}>{children}</div>
  </div>
);

const MultiSelectTeamsDemo: FC<{
  size?: "sm" | "md";
  isDisabled?: boolean;
  initialItems?: SelectItemType[];
}> = ({ size = "sm", isDisabled, initialItems = INITIAL_TWO }) => {
  const selectedItems = useListData<SelectItemType>({ initialItems });

  return (
    <MultiSelect
      label={LABEL}
      placeholder={PLACEHOLDER}
      items={TEAMS}
      selectedItems={selectedItems}
      hint={HINT}
      isRequired
      size={size}
      isDisabled={isDisabled}
      triggerDisplay="summary"
    >
      {(item) => (
        <MultiSelect.Item id={item.id} label={item.label} supportingText={item.supportingText} avatarUrl={item.avatarUrl} />
      )}
    </MultiSelect>
  );
};

const MultiSelectDocsPage: FC = () => (
  <div className="bg-primary min-h-screen font-sans" data-codex-docs-multi-select>
    <StorybookRootHeaderPortal>
      <UntitledDocsBreadcrumb currentLabel="Multi-select" />
    </StorybookRootHeaderPortal>
    <StorybookSbdocsTocPortal>
      <OnThisPageNav items={TOC} />
    </StorybookSbdocsTocPortal>

    <main className="relative mx-auto flex w-full max-w-304 min-w-0 flex-1 flex-col">
      <div className="text-tertiary w-full min-w-0">
        <div className="mb-10">
          <div className="pb-3">
            <h1 className="text-primary md:text-display-xs max-w-3xl text-xl font-semibold">Multi-select components</h1>
          </div>
          <p className="text-md text-tertiary mt-0 max-w-3xl whitespace-pre-line">
            React multi-select components built for modern applications and websites. Built on React Aria and styled with Tailwind CSS.
          </p>
        </div>

        <DocsSection
          id="multi-select-example"
          title="Multi-select example"
          code={CODE.hero}
          sectionClassName={DOCS_SECTION_HERO_CLASS}
          dataPreview
          previewClassName={DOCS_PREVIEW_HERO_SURFACE_CLASS}
        >
          <SectionPreview>
            <MultiSelectTeamsDemo />
          </SectionPreview>
        </DocsSection>

        <section id="multi-select-examples-intro" className="scroll-mt-20 pb-2">
          <h2 className="text-primary text-lg font-semibold md:text-xl">
            <SectionTitle className="text-lg font-semibold md:text-xl">Multi-select examples</SectionTitle>
          </h2>
          <p className="text-md text-tertiary mt-2 max-w-3xl">Below are examples and variations of this multi-select component:</p>
        </section>

        <DocsSection id="small" title="Small" code={CODE.small} previewClassName={SECTION_PREVIEW}>
          <SectionPreview>
            <MultiSelectTeamsDemo size="sm" />
          </SectionPreview>
        </DocsSection>

        <DocsSection id="medium" title="Medium" code={CODE.medium} previewClassName={SECTION_PREVIEW}>
          <SectionPreview>
            <MultiSelectTeamsDemo size="md" />
          </SectionPreview>
        </DocsSection>

        <DocsSection
          id="large"
          title="Large"
          code={CODE.large}
          previewClassName={SECTION_PREVIEW}
          description={
            <p>
              Codex <code className={codeClass}>MultiSelect</code> supports <code className={codeClass}>size=&quot;sm&quot;</code> and{" "}
              <code className={codeClass}>size=&quot;md&quot;</code> only. This preview uses <code className={codeClass}>md</code>, the largest trigger size.
            </p>
          }
        >
          <SectionPreview>
            <MultiSelectTeamsDemo size="md" />
          </SectionPreview>
        </DocsSection>

        <DocsSection
          id="disabled"
          title="Disabled"
          code={CODE.disabled}
          previewClassName={SECTION_PREVIEW}
          description={
            <p>
              Pass <code className={codeClass}>isDisabled</code> on <code className={codeClass}>MultiSelect</code>.
            </p>
          }
        >
          <SectionPreview>
            <MultiSelectTeamsDemo isDisabled initialItems={[]} />
          </SectionPreview>
        </DocsSection>
      </div>
    </main>
  </div>
);

const meta = {
  title: "Multi-select",
  component: MultiSelect,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: MultiSelectDocsPage,
    },
  },
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Multi-select",
  render: () => (
    <div className="bg-primary p-6 font-sans">
      <MultiSelectTeamsDemo />
    </div>
  ),
  args: {
    items: TEAMS,
    label: LABEL,
    placeholder: PLACEHOLDER,
    hint: HINT,
    isRequired: true,
    triggerDisplay: "summary" as const,
    selectedItems: {} as ListData<SelectItemType>,
    children: (item: SelectItemType) => (
      <MultiSelect.Item id={item.id} label={item.label} supportingText={item.supportingText} avatarUrl={item.avatarUrl} />
    ),
  },
};
