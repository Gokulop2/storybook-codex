import type { FC, ReactNode } from "react";
import { MultiSelect, Select, cx } from "@opus2-platform/codex";
import type { SelectItemType } from "@opus2-platform/codex";
import { User01 } from "@opus2-platform/icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useListData } from "react-stately";
import { CODEX_DOCS_AVATAR_SRC } from "../_docs/docs-assets";
import { DocsPageBreadcrumb } from "../_docs/docs-page-breadcrumb";
import {
  DOCS_PREVIEW_HERO_SURFACE_CLASS,
  DOCS_PREVIEW_INNER_MAX_XS_CLASS,
  DOCS_PREVIEW_SURFACE_CLASS,
  DOCS_SECTION_HERO_CLASS,
  DocsSection,
  SectionTitle,
} from "../_docs/docs-preview-code";
import { OnThisPageNav, StorybookRootHeaderPortal, StorybookSbdocsTocPortal } from "../_docs/docs-scaffold";

const SECTION_PREVIEW = `${DOCS_PREVIEW_SURFACE_CLASS} items-start! justify-start!`.trim();

const HINT = "This is a hint text to help user.";
const LABEL = "Team member";
const PLACEHOLDER = "Select team member";

const TEAM: SelectItemType[] = [
  { id: "phoenix", label: "Phoenix Baker", supportingText: "@phoenix" },
  { id: "olivia", label: "Gokul Krishnan", supportingText: "@olivia" },
  { id: "lana", label: "Lana Steiner", supportingText: "@lana" },
  { id: "demi", label: "Demi Wilkinson", supportingText: "@demi" },
  { id: "candice", label: "Candice Wu", supportingText: "@candice" },
  { id: "natali", label: "Natali Craig", supportingText: "@natali" },
  { id: "abraham", label: "Abraham Baker", supportingText: "@abraham" },
  { id: "adem", label: "Adem Lane", supportingText: "@adem" },
  { id: "jackson", label: "Jackson Reed", supportingText: "@jackson" },
  { id: "jessie", label: "Jessie Meyton", supportingText: "@jessie" },
];

const TEAM_WITH_AVATAR: SelectItemType[] = TEAM.map((t) => ({
  ...t,
  avatarUrl: CODEX_DOCS_AVATAR_SRC,
}));

const DOT_COLORS = ["bg-success-solid", "bg-warning-solid", "bg-error-solid", "bg-brand-solid", "bg-fg-quaternary"] as const;

const TEAM_WITH_DOTS: SelectItemType[] = TEAM.map((t, i) => ({
  ...t,
  icon: () => (
    <span
      aria-hidden
      className={cx("size-2 shrink-0 rounded-full", DOT_COLORS[i % DOT_COLORS.length]!)}
    />
  ),
}));

const IMPORT = `import { Select } from "@opus2-platform/codex";

const items = [
  { id: "phoenix", label: "Phoenix Baker", supportingText: "@phoenix" },
  // …
];`;

const CODE_HERO = `${IMPORT}

<Select
  label="Team member"
  placeholder="Select team member"
  items={items}
  hint="This is a hint text to help user."
  isRequired
>
  {(item) => (
    <Select.Item id={item.id} label={item.label} supportingText={item.supportingText} />
  )}
</Select>`;

const CODE = {
  hero: CODE_HERO,
  default: CODE_HERO,
  disabled: `${IMPORT}

<Select isDisabled label="Team member" placeholder="Select team member" items={items} hint="This is a hint text to help user." isRequired>
  {(item) => <Select.Item id={item.id} label={item.label} supportingText={item.supportingText} />}
</Select>`,
  sizes: `${IMPORT}

<>
  <Select size="sm" label="Team member" placeholder="Select team member" items={items} hint="This is a hint text to help user." isRequired>
    {(item) => <Select.Item id={item.id} label={item.label} supportingText={item.supportingText} />}
  </Select>
  <Select size="md" label="Team member" placeholder="Select team member" items={items} hint="This is a hint text to help user." isRequired>
    {(item) => <Select.Item id={item.id} label={item.label} supportingText={item.supportingText} />}
  </Select>
</>`,
  iconLeading: `import { User01 } from "@opus2-platform/icons";
import { Select } from "@opus2-platform/codex";

<Select
  label="Team member"
  placeholder="Select team member"
  placeholderIcon={User01}
  items={items}
  hint="This is a hint text to help user."
  isRequired
>
  {(item) => <Select.Item id={item.id} label={item.label} supportingText={item.supportingText} />}
</Select>`,
  avatarLeading: `${IMPORT}

<Select label="Team member" placeholder="Select team member" items={itemsWithAvatar} hint="This is a hint text to help user." isRequired>
  {(item) => <Select.Item id={item.id} label={item.label} supportingText={item.supportingText} avatarUrl={item.avatarUrl} />}
</Select>`,
  dotLeading: `${IMPORT}

<Select label="Team member" placeholder="Select team member" items={itemsWithDot} hint="This is a hint text to help user." isRequired>
  {(item) => <Select.Item id={item.id} label={item.label} supportingText={item.supportingText} icon={item.icon} />}
</Select>`,
  search: `import { Select } from "@opus2-platform/codex";

<Select.ComboBox
  label="Search"
  placeholder="Search"
  items={items}
  hint="This is a hint text to help user."
  isRequired
>
  {(item) => <Select.Item id={item.id} label={item.label} supportingText={item.supportingText} />}
</Select.ComboBox>`,
  tags: `import { MultiSelect } from "@opus2-platform/codex";
import { useListData } from "react-stately";

const selectedItems = useListData({ initialItems: [] });

<MultiSelect
  label="Search"
  placeholder="Search"
  items={items}
  selectedItems={selectedItems}
  hint="This is a hint text to help user."
  isRequired
>
  {(item) => <MultiSelect.Item id={item.id} label={item.label} supportingText={item.supportingText} avatarUrl={item.avatarUrl} />}
</MultiSelect>`,
} as const;

const TOC = [
  { id: "select-example", label: "Select example" },
  { id: "select-examples-intro", label: "Select examples" },
  { id: "default", label: "Default" },
  { id: "disabled", label: "Disabled" },
  { id: "sizes", label: "Sizes" },
  { id: "icon-leading", label: "Icon leading" },
  { id: "avatar-leading", label: "Avatar leading" },
  { id: "dot-leading", label: "Dot leading" },
  { id: "search", label: "Search" },
  { id: "tags", label: "Tags" },
] as const;

const codeClass = "text-secondary font-mono text-sm";

const SectionPreview: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="flex w-full justify-center">
    <div className={DOCS_PREVIEW_INNER_MAX_XS_CLASS}>{children}</div>
  </div>
);

const SelectTeamDemo: FC<{
  items?: SelectItemType[];
  placeholderIcon?: typeof User01;
  isDisabled?: boolean;
  size?: "sm" | "md";
}> = ({ items = TEAM, placeholderIcon, isDisabled, size = "sm" }) => (
  <Select
    label={LABEL}
    placeholder={PLACEHOLDER}
    items={items}
    hint={HINT}
    isRequired
    isDisabled={isDisabled}
    size={size}
    placeholderIcon={placeholderIcon}
  >
    {(item) => <Select.Item id={item.id} label={item.label} supportingText={item.supportingText} avatarUrl={item.avatarUrl} icon={item.icon} />}
  </Select>
);

const SelectSearchDemo: FC = () => (
  <Select.ComboBox label="Search" placeholder="Search" items={TEAM} hint={HINT} isRequired>
    {(item) => <Select.Item id={item.id} label={item.label} supportingText={item.supportingText} />}
  </Select.ComboBox>
);

const MultiSelectTagsDemo: FC = () => {
  const selectedItems = useListData<SelectItemType>({
    initialItems: [
      { id: "olivia", label: "Gokul Krishnan", supportingText: "@olivia", avatarUrl: CODEX_DOCS_AVATAR_SRC },
    ],
  });

  return (
    <MultiSelect
      label="Search"
      placeholder="Search"
      items={TEAM_WITH_AVATAR}
      selectedItems={selectedItems}
      hint={HINT}
      isRequired
    >
      {(item) => <MultiSelect.Item id={item.id} label={item.label} supportingText={item.supportingText} avatarUrl={item.avatarUrl} />}
    </MultiSelect>
  );
};

const SelectDocsPage: FC = () => (
  <div className="bg-primary min-h-screen font-sans" data-codex-docs-select>
    <StorybookRootHeaderPortal>
      <DocsPageBreadcrumb currentLabel="Select" />
    </StorybookRootHeaderPortal>
    <StorybookSbdocsTocPortal>
      <OnThisPageNav items={TOC} />
    </StorybookSbdocsTocPortal>

    <main className="relative mx-auto flex w-full max-w-304 min-w-0 flex-1 flex-col">
      <div className="text-tertiary w-full min-w-0">
        <div className="mb-10">
          <div className="pb-3">
            <h1 className="text-primary md:text-display-xs max-w-3xl text-xl font-semibold">Select components</h1>
          </div>
          <p className="text-md text-tertiary mt-0 max-w-3xl whitespace-pre-line">
            React select components built for modern applications and websites. Built on React Aria and styled with Tailwind CSS.
          </p>
        </div>

        <DocsSection
          id="select-example"
          title="Select example"
          code={CODE.hero}
          sectionClassName={DOCS_SECTION_HERO_CLASS}
          dataPreview
          previewClassName={DOCS_PREVIEW_HERO_SURFACE_CLASS}
        >
          <SectionPreview>
            <SelectTeamDemo />
          </SectionPreview>
        </DocsSection>

        <section id="select-examples-intro" className="scroll-mt-20 pb-2">
          <h2 className="text-primary text-lg font-semibold md:text-xl">
            <SectionTitle className="text-lg font-semibold md:text-xl">Select examples</SectionTitle>
          </h2>
          <p className="text-md text-tertiary mt-2 max-w-3xl">Below are examples and variations of this select component:</p>
        </section>

        <DocsSection id="default" title="Default" code={CODE.default} previewClassName={SECTION_PREVIEW}>
          <SectionPreview>
            <SelectTeamDemo />
          </SectionPreview>
        </DocsSection>

        <DocsSection
          id="disabled"
          title="Disabled"
          code={CODE.disabled}
          previewClassName={SECTION_PREVIEW}
          description={
            <p>
              Pass <code className={codeClass}>isDisabled</code> on <code className={codeClass}>Select</code>.
            </p>
          }
        >
          <SectionPreview>
            <SelectTeamDemo isDisabled />
          </SectionPreview>
        </DocsSection>

        <DocsSection
          id="sizes"
          title="Sizes"
          code={CODE.sizes}
          previewClassName={SECTION_PREVIEW}
          description={
            <p>
              Use <code className={codeClass}>size=&quot;sm&quot;</code> or <code className={codeClass}>size=&quot;md&quot;</code> (Codex select supports <code className={codeClass}>sm</code> and{" "}
              <code className={codeClass}>md</code>).
            </p>
          }
        >
          <SectionPreview>
            <div className="flex flex-col gap-6">
              <SelectTeamDemo size="sm" />
              <SelectTeamDemo size="md" />
            </div>
          </SectionPreview>
        </DocsSection>

        <DocsSection
          id="icon-leading"
          title="Icon leading"
          code={CODE.iconLeading}
          previewClassName={SECTION_PREVIEW}
          description={
            <p>
              Set <code className={codeClass}>placeholderIcon</code> on <code className={codeClass}>Select</code> for a leading icon in the trigger when empty.
            </p>
          }
        >
          <SectionPreview>
            <SelectTeamDemo placeholderIcon={User01} />
          </SectionPreview>
        </DocsSection>

        <DocsSection
          id="avatar-leading"
          title="Avatar leading"
          code={CODE.avatarLeading}
          previewClassName={SECTION_PREVIEW}
          description={
            <p>
              Pass <code className={codeClass}>avatarUrl</code> on each <code className={codeClass}>Select.Item</code> (and in your <code className={codeClass}>items</code> data).
            </p>
          }
        >
          <SectionPreview>
            <SelectTeamDemo items={TEAM_WITH_AVATAR} />
          </SectionPreview>
        </DocsSection>

        <DocsSection
          id="dot-leading"
          title="Dot leading"
          code={CODE.dotLeading}
          previewClassName={SECTION_PREVIEW}
          description={
            <p>
              Pass <code className={codeClass}>icon</code> on items for a leading marker (e.g. status dot) in the list and selection.
            </p>
          }
        >
          <SectionPreview>
            <SelectTeamDemo items={TEAM_WITH_DOTS} />
          </SectionPreview>
        </DocsSection>

        <DocsSection
          id="search"
          title="Search"
          code={CODE.search}
          previewClassName={SECTION_PREVIEW}
          description={
            <p>
              Use <code className={codeClass}>Select.ComboBox</code> for filterable options (search). Keyboard shortcut badge is built into the trigger.
            </p>
          }
        >
          <SectionPreview>
            <SelectSearchDemo />
          </SectionPreview>
        </DocsSection>

        <DocsSection
          id="tags"
          title="Tags"
          code={CODE.tags}
          previewClassName={SECTION_PREVIEW}
          description={
            <p>
              Use <code className={codeClass}>MultiSelect</code> with <code className={codeClass}>useListData</code> for selected tags inside the field.
            </p>
          }
        >
          <SectionPreview>
            <MultiSelectTagsDemo />
          </SectionPreview>
        </DocsSection>
      </div>
    </main>
  </div>
);

const meta = {
  title: "Base components/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: SelectDocsPage,
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  tags: ["!dev"],
  name: "Select",
  args: {
    label: LABEL,
    placeholder: PLACEHOLDER,
    items: TEAM,
    hint: HINT,
    isRequired: true,
    children: (item: SelectItemType) => <Select.Item id={item.id} label={item.label} supportingText={item.supportingText} />,
  },
};
