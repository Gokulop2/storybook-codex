import type { ComponentProps, FC, ReactNode } from "react";
import { Fragment } from "react";
import { ButtonUtility, CloseButton } from "@opus2-platform/codex";
import { Copy01, DownloadCloud02, Edit01, Trash01 } from "@opus2-platform/icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { UntitledDocsBreadcrumb } from "../_docs/untitled-docs-breadcrumb";
import {
  DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK_TIGHT,
  DOCS_SECTION_HERO_CLASS,
  type DocsSectionProps,
  DocsSection,
  SectionTitle,
} from "../_docs/untitled-docs-preview-code";
import { OnThisPageNav, StorybookRootHeaderPortal, StorybookSbdocsTocPortal } from "../_docs/untitled-docs-scaffold";

type UtilityColor = NonNullable<ComponentProps<typeof ButtonUtility>["color"]>;
type UtilitySize = NonNullable<ComponentProps<typeof ButtonUtility>["size"]>;
type RowGap = "gap-1" | "gap-3";

/** Matches [Untitled `UtilityButton*Demo`](https://github.com/untitleduico/react/blob/main/components/base/buttons/buttons.demo.tsx): Copy, Download, Delete, Edit. */
const UTILITY_ICONS = [
  { Icon: Copy01, iconName: "Copy01", tooltip: "Copy" },
  { Icon: DownloadCloud02, iconName: "DownloadCloud02", tooltip: "Download" },
  { Icon: Trash01, iconName: "Trash01", tooltip: "Delete" },
  { Icon: Edit01, iconName: "Edit01", tooltip: "Edit" },
] as const;

const ICON_IMPORTS = `import { Copy01, DownloadCloud02, Edit01, Trash01 } from "@opus2-platform/icons";`;

const IMPORT_UTIL = `import { ButtonUtility } from "@opus2-platform/codex";
${ICON_IMPORTS}`;

const IMPORT_CLOSE = `import { CloseButton } from "@opus2-platform/codex";`;

const PREVIEW_WELL = `${DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK_TIGHT} items-center! justify-center!`.trim();

/** Shared horizontal layout for utility rows and close-button strips. */
const ROW_WRAP = "mx-auto! flex w-full max-w-3xl flex-wrap items-start justify-center";

const withUtilImport = (body: string) => `${IMPORT_UTIL}\n\n${body}`;
const withCloseImport = (body: string) => `${IMPORT_CLOSE}\n\n${body}`;

function utilityButtonSnippet(opts: { color: UtilityColor; size: UtilitySize; isDisabled?: boolean }): string {
  const disabled = opts.isDisabled ? " isDisabled" : "";
  return UTILITY_ICONS.map(
    ({ tooltip, iconName }) =>
      `<ButtonUtility size="${opts.size}" color="${opts.color}" tooltip="${tooltip}" icon={${iconName}}${disabled} />`,
  ).join("\n");
}

const CLOSE_SIZES = ["sm", "md", "lg"] as const;

function closeButtonSnippet(theme: "light" | "dark"): string {
  return CLOSE_SIZES.map((size) => `<CloseButton size="${size}" theme="${theme}" />`).join("\n");
}

/** Hero and “Tertiary” sections share the same markup and snippet (Untitled default row). */
const CODE_TERTIARY_ROW = withUtilImport(utilityButtonSnippet({ color: "tertiary", size: "sm" }));

const CODE = {
  tertiaryRow: CODE_TERTIARY_ROW,
  secondary: withUtilImport(utilityButtonSnippet({ color: "secondary", size: "sm" })),
  sizes: withUtilImport(
    `${utilityButtonSnippet({ color: "secondary", size: "xs" })}\n\n${utilityButtonSnippet({ color: "secondary", size: "sm" })}`,
  ),
  disabled: withUtilImport(utilityButtonSnippet({ color: "secondary", size: "sm", isDisabled: true })),
  closeLight: withCloseImport(closeButtonSnippet("light")),
  closeDark: withCloseImport(closeButtonSnippet("dark")),
} as const;

const UtilityDocsSection: FC<DocsSectionProps> = ({ previewClassName, ...rest }) => (
  <DocsSection {...rest} previewClassName={previewClassName ?? PREVIEW_WELL} />
);

const UtilityIconRow: FC<{
  color: UtilityColor;
  size: UtilitySize;
  isDisabled?: boolean;
  gapClass: RowGap;
}> = ({ color, size, isDisabled, gapClass }) => (
  <div className={`${ROW_WRAP} ${gapClass}`}>
    {UTILITY_ICONS.map(({ Icon, tooltip }) => (
      <ButtonUtility key={tooltip} color={color} size={size} icon={Icon} tooltip={tooltip} isDisabled={isDisabled} />
    ))}
  </div>
);

const TertiaryRowDemo: FC<{ gapClass: RowGap }> = ({ gapClass }) => (
  <UtilityIconRow color="tertiary" size="sm" gapClass={gapClass} />
);

const CLOSE_STRIP: Record<"light" | "dark", string> = {
  light: "p-12",
  dark: "rounded-2xl bg-neutral-950 p-12",
};

const CloseButtonStrip: FC<{ variant: "light" | "dark" }> = ({ variant }) => (
  <div className={`${ROW_WRAP} gap-3 ${CLOSE_STRIP[variant]}`}>
    {CLOSE_SIZES.map((size) => (
      <CloseButton key={size} size={size} theme={variant} />
    ))}
  </div>
);

const TOC = [
  { id: "utility-buttons-example", label: "Utility buttons example" },
  { id: "utility-buttons-examples", label: "Utility button examples" },
  { id: "secondary", label: "Secondary" },
  { id: "tertiary", label: "Tertiary" },
  { id: "sizes", label: "Sizes" },
  { id: "disabled", label: "Disabled" },
  { id: "close-x", label: "Close X" },
  { id: "close-x-dark", label: "Close X dark" },
] as const;

type UtilityDocSection = {
  id: string;
  title: string;
  code: string;
  hero?: boolean;
  defaultPreviewDark?: boolean;
  render: () => ReactNode;
};

const UTILITY_DOC_SECTIONS: UtilityDocSection[] = [
  {
    id: "utility-buttons-example",
    title: "Utility buttons example",
    code: CODE.tertiaryRow,
    hero: true,
    render: () => <TertiaryRowDemo gapClass="gap-1" />,
  },
  {
    id: "secondary",
    title: "Secondary",
    code: CODE.secondary,
    render: () => <UtilityIconRow color="secondary" size="sm" gapClass="gap-3" />,
  },
  {
    id: "tertiary",
    title: "Tertiary",
    code: CODE.tertiaryRow,
    render: () => <TertiaryRowDemo gapClass="gap-1" />,
  },
  {
    id: "sizes",
    title: "Sizes",
    code: CODE.sizes,
    render: () => (
      <div className="mx-auto! flex w-full max-w-3xl flex-col gap-8">
        <UtilityIconRow color="secondary" size="xs" gapClass="gap-3" />
        <UtilityIconRow color="secondary" size="sm" gapClass="gap-3" />
      </div>
    ),
  },
  {
    id: "disabled",
    title: "Disabled",
    code: CODE.disabled,
    render: () => <UtilityIconRow color="secondary" size="sm" isDisabled gapClass="gap-3" />,
  },
  {
    id: "close-x",
    title: "Close X",
    code: CODE.closeLight,
    render: () => <CloseButtonStrip variant="light" />,
  },
  {
    id: "close-x-dark",
    title: "Close X dark",
    code: CODE.closeDark,
    defaultPreviewDark: true,
    render: () => <CloseButtonStrip variant="dark" />,
  },
];

const ExamplesIntro: FC = () => (
  <section id="utility-buttons-examples" className="scroll-mt-20 pb-2">
    <h2 className="text-primary text-lg font-semibold md:text-xl">
      <SectionTitle className="text-lg font-semibold md:text-xl">Utility button examples</SectionTitle>
    </h2>
    <p className="text-md text-tertiary mt-2 max-w-3xl">Below are examples and variations of this utility button component:</p>
  </section>
);

const UtilityButtonsDocsPage: FC = () => (
  <div className="bg-primary min-h-screen font-sans" data-codex-docs-utility-buttons>
    <StorybookRootHeaderPortal>
      <UntitledDocsBreadcrumb currentLabel="Utility buttons" />
    </StorybookRootHeaderPortal>
    <StorybookSbdocsTocPortal>
      <OnThisPageNav items={TOC} />
    </StorybookSbdocsTocPortal>

    <main className="relative mx-auto flex w-full max-w-304 min-w-0 flex-1 flex-col">
      <div className="text-tertiary w-full min-w-0">
        <div className="mb-10">
          <div className="pb-3">
            <h1 className="text-primary md:text-display-xs max-w-3xl text-xl font-semibold">Utility button components</h1>
          </div>
          <p className="text-md text-tertiary mt-0 max-w-3xl whitespace-pre-line">
            React utility button components built for modern applications and websites. These utility buttons are built using React Aria and styled with Tailwind CSS.
          </p>
        </div>

        {UTILITY_DOC_SECTIONS.map((section, index) => (
          <Fragment key={section.id}>
            {index === 1 ? <ExamplesIntro /> : null}
            <UtilityDocsSection
              id={section.id}
              title={section.title}
              code={section.code}
              sectionClassName={section.hero ? DOCS_SECTION_HERO_CLASS : undefined}
              dataPreview={section.hero}
              defaultPreviewDark={section.defaultPreviewDark}
            >
              {section.render()}
            </UtilityDocsSection>
          </Fragment>
        ))}
      </div>
    </main>
  </div>
);

const meta = {
  title: "Utility buttons",
  component: ButtonUtility,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: UtilityButtonsDocsPage,
    },
  },
} satisfies Meta<typeof ButtonUtility>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Utility buttons",
  args: {
    color: "secondary",
    icon: Copy01,
    tooltip: "Copy",
  },
};
