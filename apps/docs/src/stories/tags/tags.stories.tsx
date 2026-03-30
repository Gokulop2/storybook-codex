import type { FC, ReactNode } from "react";
import { useCallback, useState } from "react";
import { Tag, TagGroup, TagList } from "@opus2-platform/codex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { Key, Selection } from "react-aria-components";
import { useListData } from "react-stately";
import { CODEX_DOCS_AVATAR_SRC, CODEX_DOCS_FLAG_SRC } from "../_docs/docs-assets";
import { UntitledDocsBreadcrumb } from "../_docs/untitled-docs-breadcrumb";
import {
  DOCS_PREVIEW_HERO_SURFACE_CLASS,
  DOCS_PREVIEW_SURFACE_CLASS,
  DOCS_SECTION_HERO_CLASS,
  DocsSection,
  SectionTitle,
} from "../_docs/untitled-docs-preview-code";
import { OnThisPageNav, StorybookRootHeaderPortal, StorybookSbdocsTocPortal } from "../_docs/untitled-docs-scaffold";

const SECTION_PREVIEW = `${DOCS_PREVIEW_SURFACE_CLASS} flex-col! items-center! justify-center! gap-8! py-12!`.trim();

const TAG_GROUP_LABEL = "Tags";

const TAG_LIST_CLASS = "flex flex-wrap gap-1.5 focus:outline-hidden";

const IMPORT = `import { Tag, TagGroup, TagList } from "@opus2-platform/codex";
`;

const codeClass = "text-secondary font-mono text-sm";

type TagDemoItem = { id: string; label: string; avatarSrc?: string; dot?: boolean; count?: number };

/**
 * Untitled-style mix: text-only, region (flag) avatar, text, portrait avatar, text, status dot.
 * `dot` and `avatarSrc` are mutually exclusive in `Tag` (avatar wins if both are set).
 */
const BASE_ITEMS: readonly TagDemoItem[] = [
  { id: "t1", label: "Label" },
  { id: "t2", label: "Label", avatarSrc: CODEX_DOCS_FLAG_SRC },
  { id: "t3", label: "Label" },
  { id: "t4", label: "Label", avatarSrc: CODEX_DOCS_AVATAR_SRC },
  { id: "t5", label: "Label" },
  { id: "t6", label: "Label", dot: true },
];

/** Copy-panel literal: stays in sync with `BASE_ITEMS`. */
const ITEMS_CODE = JSON.stringify([...BASE_ITEMS], null, 2);

const COUNT_ITEMS: TagDemoItem[] = BASE_ITEMS.map((row) => ({ ...row, count: 5 }));

const DEFAULT_CHECKBOX_SELECTION = new Set<Key>(["t1", "t3"]);

function stripKeysFromSelection(prev: Selection, keys: readonly Key[]): Selection {
  if (prev === "all") return prev;
  const next = new Set(prev);
  keys.forEach((k) => next.delete(k));
  return next;
}

/** JSX snippet for `<TagList>` + `<Tag>` map (docs code panel). */
function tagListSnippet(variant: "basic" | "withCount"): string {
  const tagProps =
    variant === "withCount" ? "avatarSrc={item.avatarSrc} dot={item.dot} count={5}" : "avatarSrc={item.avatarSrc} dot={item.dot}";
  return `  <TagList className="${TAG_LIST_CLASS}" items={items}>
    {(item) => (
      <Tag id={item.id} ${tagProps}>
        {item.label}
      </Tag>
    )}
  </TagList>`;
}

const CODE = {
  hero: `${IMPORT}

const items = ${ITEMS_CODE};

<TagGroup label="${TAG_GROUP_LABEL}" size="sm">
${tagListSnippet("basic")}
</TagGroup>`,

  sizes: `${IMPORT}

const items = ${ITEMS_CODE};

const renderTagList = () => (
${tagListSnippet("basic")}
);

<div className="flex flex-col items-center gap-8">
  <TagGroup label="${TAG_GROUP_LABEL}" size="sm">{renderTagList()}</TagGroup>
  <TagGroup label="${TAG_GROUP_LABEL}" size="md">{renderTagList()}</TagGroup>
  <TagGroup label="${TAG_GROUP_LABEL}" size="lg">{renderTagList()}</TagGroup>
</div>`,

  closeX: `${IMPORT}

const items = ${ITEMS_CODE};

<TagGroup label="${TAG_GROUP_LABEL}" size="sm" onRemove={(keys) => { /* remove keys from your items */ }}>
${tagListSnippet("basic")}
</TagGroup>`,

  count: `${IMPORT}

const items = ${ITEMS_CODE};

<TagGroup label="${TAG_GROUP_LABEL}" size="sm">
${tagListSnippet("withCount")}
</TagGroup>`,

  checkbox: `${IMPORT}

const items = ${ITEMS_CODE};

<TagGroup label="${TAG_GROUP_LABEL}" size="sm" selectionMode="multiple" selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
${tagListSnippet("basic")}
</TagGroup>`,

  checkboxCloseX: `${IMPORT}

const items = ${ITEMS_CODE};

<TagGroup
  label="${TAG_GROUP_LABEL}"
  size="sm"
  selectionMode="multiple"
  selectedKeys={selectedKeys}
  onSelectionChange={setSelectedKeys}
  onRemove={(keys) => { /* remove + update selection */ }}
>
${tagListSnippet("basic")}
</TagGroup>`,

  checkboxCount: `${IMPORT}

const items = ${ITEMS_CODE};

<TagGroup label="${TAG_GROUP_LABEL}" size="sm" selectionMode="multiple" selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
${tagListSnippet("withCount")}
</TagGroup>`,
} as const;

const DESC = {
  sizes: (
    <p>
      Our tags component comes with three predefined sizes: <code className={codeClass}>sm</code>, <code className={codeClass}>md</code>, and{" "}
      <code className={codeClass}>lg</code>. You can set the size using the <code className={codeClass}>size</code> prop on the{" "}
      <code className={codeClass}>TagGroup</code> component, which will apply to all tags within that group.
    </p>
  ),
  closeX: (
    <p>
      Tags can be dismissible by using the <code className={codeClass}>onRemove</code> prop on the <code className={codeClass}>TagGroup</code> component or the{" "}
      <code className={codeClass}>onClose</code> prop on individual <code className={codeClass}>Tag</code> components. This adds a remove control that calls your
      callback with the key of the removed tag.
    </p>
  ),
  count: (
    <p>
      Tags can show a count next to the label by passing a number to the <code className={codeClass}>count</code> prop on the <code className={codeClass}>Tag</code>{" "}
      component.
    </p>
  ),
  checkbox: (
    <p>
      Make tags selectable by passing <code className={codeClass}>&quot;single&quot;</code> or <code className={codeClass}>&quot;multiple&quot;</code> to the{" "}
      <code className={codeClass}>selectionMode</code> prop on <code className={codeClass}>TagGroup</code>.
    </p>
  ),
  checkboxCloseX: (
    <p>
      For selectable, dismissible tags, pass <code className={codeClass}>onRemove</code> on <code className={codeClass}>TagGroup</code> so each tag shows a remove
      control.
    </p>
  ),
  checkboxCount: (
    <p>
      Selectable tags can also show a <code className={codeClass}>count</code> next to the label, same as non-selectable tags.
    </p>
  ),
} as const;

const TOC = [
  { id: "tags-example", label: "Tags example" },
  { id: "tags-examples-intro", label: "Tags examples" },
  { id: "sizes", label: "Sizes" },
  { id: "close-x", label: "Close X" },
  { id: "count", label: "Count" },
  { id: "checkbox", label: "Checkbox" },
  { id: "checkbox-close-x", label: "Checkbox close X" },
  { id: "checkbox-count", label: "Checkbox count" },
] as const;

const TagItems: FC<{ items: Iterable<TagDemoItem> }> = ({ items }) => (
  <TagList className={TAG_LIST_CLASS} items={items}>
    {(item) => (
      <Tag id={item.id} avatarSrc={item.avatarSrc} dot={item.dot} count={item.count}>
        {item.label}
      </Tag>
    )}
  </TagList>
);

const PreviewCenter: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="flex w-full justify-center">{children}</div>
);

const TagsHero: FC = () => (
  <PreviewCenter>
    <TagGroup label={TAG_GROUP_LABEL} size="sm">
      <TagItems items={BASE_ITEMS} />
    </TagGroup>
  </PreviewCenter>
);

const TagsSizes: FC = () => (
  <div className="flex w-full flex-col items-center gap-8">
    {(["sm", "md", "lg"] as const).map((size) => (
      <TagGroup key={size} label={TAG_GROUP_LABEL} size={size}>
        <TagItems items={BASE_ITEMS} />
      </TagGroup>
    ))}
  </div>
);

const TagsCloseX: FC = () => {
  const list = useListData<TagDemoItem>({ initialItems: [...BASE_ITEMS] });
  const onRemove = useCallback(
    (keys: Set<Key>) => {
      list.remove(...Array.from(keys));
    },
    [list],
  );
  return (
    <PreviewCenter>
      <TagGroup label={TAG_GROUP_LABEL} size="sm" onRemove={onRemove}>
        <TagItems items={list.items} />
      </TagGroup>
    </PreviewCenter>
  );
};

const TagsCount: FC = () => (
  <PreviewCenter>
    <TagGroup label={TAG_GROUP_LABEL} size="sm">
      <TagItems items={COUNT_ITEMS} />
    </TagGroup>
  </PreviewCenter>
);

const TagsCheckbox: FC = () => {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(() => DEFAULT_CHECKBOX_SELECTION);
  return (
    <PreviewCenter>
      <TagGroup label={TAG_GROUP_LABEL} size="sm" selectionMode="multiple" selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
        <TagItems items={BASE_ITEMS} />
      </TagGroup>
    </PreviewCenter>
  );
};

const TagsCheckboxCloseX: FC = () => {
  const list = useListData<TagDemoItem>({ initialItems: [...BASE_ITEMS] });
  const [selectedKeys, setSelectedKeys] = useState<Selection>(() => DEFAULT_CHECKBOX_SELECTION);

  const onRemove = useCallback(
    (keys: Set<Key>) => {
      const arr = Array.from(keys);
      list.remove(...arr);
      setSelectedKeys((prev) => stripKeysFromSelection(prev, arr));
    },
    [list],
  );

  return (
    <PreviewCenter>
      <TagGroup
        label={TAG_GROUP_LABEL}
        size="sm"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        onRemove={onRemove}
      >
        <TagItems items={list.items} />
      </TagGroup>
    </PreviewCenter>
  );
};

const TagsCheckboxCount: FC = () => {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(() => DEFAULT_CHECKBOX_SELECTION);
  return (
    <PreviewCenter>
      <TagGroup label={TAG_GROUP_LABEL} size="sm" selectionMode="multiple" selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
        <TagItems items={COUNT_ITEMS} />
      </TagGroup>
    </PreviewCenter>
  );
};

const DocsIntro: FC<{ id: string; title: string; description: string }> = ({ id, title, description }) => (
  <section id={id} className="scroll-mt-20 pb-2">
    <h2 className="text-primary text-lg font-semibold md:text-xl">
      <SectionTitle className="text-lg font-semibold md:text-xl">{title}</SectionTitle>
    </h2>
    <p className="text-md text-tertiary mt-2 max-w-3xl">{description}</p>
  </section>
);

const SECTIONS = [
  { id: "sizes", title: "Sizes example", code: CODE.sizes, description: DESC.sizes, Preview: TagsSizes },
  { id: "close-x", title: "Close X example", code: CODE.closeX, description: DESC.closeX, Preview: TagsCloseX },
  { id: "count", title: "Count example", code: CODE.count, description: DESC.count, Preview: TagsCount },
  { id: "checkbox", title: "Checkbox example", code: CODE.checkbox, description: DESC.checkbox, Preview: TagsCheckbox },
  { id: "checkbox-close-x", title: "Checkbox close X example", code: CODE.checkboxCloseX, description: DESC.checkboxCloseX, Preview: TagsCheckboxCloseX },
  { id: "checkbox-count", title: "Checkbox count example", code: CODE.checkboxCount, description: DESC.checkboxCount, Preview: TagsCheckboxCount },
] as const;

const TagsDocsPage: FC = () => (
  <div className="bg-primary min-h-screen font-sans" data-codex-docs-tags>
    <StorybookRootHeaderPortal>
      <UntitledDocsBreadcrumb currentLabel="Tags" />
    </StorybookRootHeaderPortal>
    <StorybookSbdocsTocPortal>
      <OnThisPageNav items={TOC} />
    </StorybookSbdocsTocPortal>

    <main className="relative mx-auto flex w-full max-w-304 min-w-0 flex-1 flex-col">
      <div className="text-tertiary w-full min-w-0">
        <div className="mb-10">
          <div className="pb-3">
            <h1 className="text-primary md:text-display-xs max-w-3xl text-xl font-semibold">Tag components</h1>
          </div>
          <p className="text-md text-tertiary mt-0 max-w-3xl whitespace-pre-line">
            React tag components built for modern applications and websites. Built on React Aria and styled with Tailwind CSS.
          </p>
        </div>

        <DocsSection
          id="tags-example"
          title="Tags example"
          code={CODE.hero}
          sectionClassName={DOCS_SECTION_HERO_CLASS}
          dataPreview
          previewClassName={DOCS_PREVIEW_HERO_SURFACE_CLASS}
        >
          <TagsHero />
        </DocsSection>

        <DocsIntro
          id="tags-examples-intro"
          title="Tags examples"
          description="Below are examples and variations of this tags component:"
        />

        {SECTIONS.map(({ id, title, code, description, Preview }) => (
          <DocsSection key={id} id={id} title={title} code={code} description={description} previewClassName={SECTION_PREVIEW}>
            <Preview />
          </DocsSection>
        ))}
      </div>
    </main>
  </div>
);

const meta = {
  title: "Tags",
  component: TagGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: TagsDocsPage,
    },
  },
} satisfies Meta<typeof TagGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Tags",
  args: {
    label: TAG_GROUP_LABEL,
    size: "sm",
  },
  render: () => (
    <div className="bg-primary p-6 font-sans">
      <TagsHero />
    </div>
  ),
};
