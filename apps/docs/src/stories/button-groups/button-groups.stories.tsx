import type { FC } from "react";
import { ButtonGroup, ButtonGroupItem, Dot } from "@opus2-platform/codex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK,
  DOCS_SECTION_HERO_CLASS,
  DocsSection,
  SectionTitle,
} from "../_docs/docs-preview-code";
import { DocsPageBreadcrumb } from "../_docs/docs-page-breadcrumb";
import { OnThisPageNav, StorybookRootHeaderPortal, StorybookSbdocsTocPortal } from "../_docs/docs-scaffold";

const ArchiveIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M4 7.5h16M10.5 11h3M6.5 7.5V19a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7.5M6 3h12a2 2 0 0 1 2 2v2.5H4V5a2 2 0 0 1 2-2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EditIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L8 18l-4 1 1-4 11.5-11.5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TrashIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-1 0v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6h10Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TOC = [
  { id: "button-group-example", label: "Button group example" },
  { id: "button-group-examples", label: "Button group examples" },
  { id: "leading-icon", label: "Leading icon" },
  { id: "with-dot", label: "With dot" },
  { id: "disabled", label: "Disabled" },
  { id: "disabled-individual-item", label: "Disabled individual item" },
  { id: "selection", label: "Selection" },
  { id: "multiple-selection", label: "Multiple selection" },
] as const;

const buttonGroupCode = {
  hero: `import { ButtonGroup, ButtonGroupItem } from "@opus2-platform/codex";\n\n<ButtonGroup>\n  <ButtonGroupItem id="archive">Archive</ButtonGroupItem>\n  <ButtonGroupItem id="edit">Edit</ButtonGroupItem>\n  <ButtonGroupItem id="delete">Delete</ButtonGroupItem>\n</ButtonGroup>`,
  leadingIcon: `import { ButtonGroup, ButtonGroupItem } from "@opus2-platform/codex";\n\n<ButtonGroup>\n  <ButtonGroupItem id="archive" iconLeading={Icon}>Archive</ButtonGroupItem>\n  <ButtonGroupItem id="edit" iconLeading={Icon}>Edit</ButtonGroupItem>\n  <ButtonGroupItem id="delete" iconLeading={Icon}>Delete</ButtonGroupItem>\n</ButtonGroup>`,
  withDot: `import { ButtonGroup, ButtonGroupItem, Dot } from "@opus2-platform/codex";\n\n<ButtonGroup>\n  <ButtonGroupItem id="a" iconLeading={<Dot size="sm" />}>Text</ButtonGroupItem>\n  <ButtonGroupItem id="b" iconLeading={<Dot size="sm" />}>Text</ButtonGroupItem>\n  <ButtonGroupItem id="c" iconLeading={<Dot size="sm" />}>Text</ButtonGroupItem>\n</ButtonGroup>`,
  disabled: `import { ButtonGroup, ButtonGroupItem } from "@opus2-platform/codex";\n\n<ButtonGroup isDisabled>\n  <ButtonGroupItem id="archive">Archive</ButtonGroupItem>\n  <ButtonGroupItem id="edit">Edit</ButtonGroupItem>\n  <ButtonGroupItem id="delete">Delete</ButtonGroupItem>\n</ButtonGroup>`,
  disabledIndividual: `import { ButtonGroup, ButtonGroupItem } from "@opus2-platform/codex";\n\n<ButtonGroup>\n  <ButtonGroupItem id="archive">Archive</ButtonGroupItem>\n  <ButtonGroupItem id="edit" isDisabled>Edit</ButtonGroupItem>\n  <ButtonGroupItem id="delete">Delete</ButtonGroupItem>\n</ButtonGroup>`,
  selection: `import { ButtonGroup, ButtonGroupItem } from "@opus2-platform/codex";\n\n<ButtonGroup defaultSelectedKeys={["today"]}>\n  <ButtonGroupItem id="today">Today</ButtonGroupItem>\n  <ButtonGroupItem id="tomorrow">Tomorrow</ButtonGroupItem>\n  <ButtonGroupItem id="week">This week</ButtonGroupItem>\n</ButtonGroup>`,
  multipleSelection: `import { ButtonGroup, ButtonGroupItem } from "@opus2-platform/codex";\n\n<ButtonGroup selectionMode="multiple" defaultSelectedKeys={["today", "week"]}>\n  <ButtonGroupItem id="today">Today</ButtonGroupItem>\n  <ButtonGroupItem id="tomorrow">Tomorrow</ButtonGroupItem>\n  <ButtonGroupItem id="week">This week</ButtonGroupItem>\n</ButtonGroup>`,
} as const;

const previewStack = "flex flex-col items-start gap-4";

const ButtonGroupsDocsPage: FC = () => {
  return (
    <div className="bg-primary min-h-screen font-sans" data-codex-docs-button-groups>
      <StorybookRootHeaderPortal>
        <DocsPageBreadcrumb currentLabel="Button groups" />
      </StorybookRootHeaderPortal>
      <StorybookSbdocsTocPortal>
        <OnThisPageNav items={TOC} />
      </StorybookSbdocsTocPortal>

      <main className="relative mx-auto flex w-full max-w-304 min-w-0 flex-1 flex-col">
        <div className="text-tertiary w-full min-w-0">
          <div className="mb-10">
            <div className="pb-3">
              <h1 className="text-primary md:text-display-xs max-w-3xl text-xl font-semibold">Button group components</h1>
            </div>
            <p className="text-md text-tertiary mt-0 max-w-3xl whitespace-pre-line">
              React button group components built for modern applications and websites. These button groups are built using React Aria and styled with Tailwind
              CSS.
            </p>
          </div>

          <DocsSection
            id="button-group-example"
            title="Button group example"
            code={buttonGroupCode.hero}
            sectionClassName={DOCS_SECTION_HERO_CLASS}
            dataPreview
            previewClassName={DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK}
          >
            <div className={previewStack}>
              <ButtonGroup>
                <ButtonGroupItem id="archive">Archive</ButtonGroupItem>
                <ButtonGroupItem id="edit">Edit</ButtonGroupItem>
                <ButtonGroupItem id="delete">Delete</ButtonGroupItem>
              </ButtonGroup>
            </div>
          </DocsSection>

          <section id="button-group-examples" className="scroll-mt-20 pb-2">
            <h2 className="text-primary text-lg font-semibold md:text-xl">
              <SectionTitle className="text-lg font-semibold md:text-xl">Button group examples</SectionTitle>
            </h2>
            <p className="text-md text-tertiary mt-2 max-w-3xl">Below are examples and variations of this button group component:</p>
          </section>

          <DocsSection id="leading-icon" title="Leading icon" code={buttonGroupCode.leadingIcon}>
            <div className={previewStack}>
              <ButtonGroup>
                <ButtonGroupItem id="archive" iconLeading={ArchiveIcon}>
                  Archive
                </ButtonGroupItem>
                <ButtonGroupItem id="edit" iconLeading={EditIcon}>
                  Edit
                </ButtonGroupItem>
                <ButtonGroupItem id="delete" iconLeading={TrashIcon}>
                  Delete
                </ButtonGroupItem>
              </ButtonGroup>
            </div>
          </DocsSection>

          <DocsSection id="with-dot" title="With dot" code={buttonGroupCode.withDot}>
            <div className={previewStack}>
              <ButtonGroup>
                <ButtonGroupItem id="a" iconLeading={<Dot size="sm" className="text-utility-success-500" />}>
                  Text
                </ButtonGroupItem>
                <ButtonGroupItem id="b" iconLeading={<Dot size="sm" className="text-utility-warning-500" />}>
                  Text
                </ButtonGroupItem>
                <ButtonGroupItem id="c" iconLeading={<Dot size="sm" className="text-utility-error-500" />}>
                  Text
                </ButtonGroupItem>
              </ButtonGroup>
            </div>
          </DocsSection>

          <DocsSection id="disabled" title="Disabled" code={buttonGroupCode.disabled}>
            <div className={previewStack}>
              <ButtonGroup isDisabled>
                <ButtonGroupItem id="archive">Archive</ButtonGroupItem>
                <ButtonGroupItem id="edit">Edit</ButtonGroupItem>
                <ButtonGroupItem id="delete">Delete</ButtonGroupItem>
              </ButtonGroup>
            </div>
          </DocsSection>

          <DocsSection id="disabled-individual-item" title="Disabled individual item" code={buttonGroupCode.disabledIndividual}>
            <div className={previewStack}>
              <ButtonGroup>
                <ButtonGroupItem id="archive">Archive</ButtonGroupItem>
                <ButtonGroupItem id="edit" isDisabled>
                  Edit
                </ButtonGroupItem>
                <ButtonGroupItem id="delete">Delete</ButtonGroupItem>
              </ButtonGroup>
            </div>
          </DocsSection>

          <DocsSection id="selection" title="Selection" code={buttonGroupCode.selection}>
            <div className={previewStack}>
              <ButtonGroup defaultSelectedKeys={["today"]}>
                <ButtonGroupItem id="today">Today</ButtonGroupItem>
                <ButtonGroupItem id="tomorrow">Tomorrow</ButtonGroupItem>
                <ButtonGroupItem id="week">This week</ButtonGroupItem>
              </ButtonGroup>
            </div>
          </DocsSection>

          <DocsSection id="multiple-selection" title="Multiple selection" code={buttonGroupCode.multipleSelection}>
            <div className={previewStack}>
              <ButtonGroup selectionMode="multiple" defaultSelectedKeys={["today", "week"]}>
                <ButtonGroupItem id="today">Today</ButtonGroupItem>
                <ButtonGroupItem id="tomorrow">Tomorrow</ButtonGroupItem>
                <ButtonGroupItem id="week">This week</ButtonGroupItem>
              </ButtonGroup>
            </div>
          </DocsSection>
        </div>
      </main>
    </div>
  );
};

const meta = {
  title: "Base components/Button groups",
  component: ButtonGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: ButtonGroupsDocsPage,
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Button groups",
  args: {
    children: (
      <>
        <ButtonGroupItem id="archive">Archive</ButtonGroupItem>
        <ButtonGroupItem id="edit">Edit</ButtonGroupItem>
        <ButtonGroupItem id="delete">Delete</ButtonGroupItem>
      </>
    ),
  },
};

