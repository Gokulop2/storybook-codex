import type { FC } from "react";
import { TextEditor } from "@opus2-platform/codex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DocsPageBreadcrumb } from "../_docs/docs-page-breadcrumb";
import {
  DOCS_PREVIEW_TEXT_EDITOR_SECTION_CLASS,
  DOCS_PREVIEW_TEXT_EDITOR_SECTION_CENTER_CLASS,
  DOCS_PREVIEW_TEXT_EDITOR_SECTION_OVERFLOW_X_CLASS,
  DOCS_SECTION_HERO_CLASS,
  DocsSection,
  SectionTitle,
} from "../_docs/docs-preview-code";
import { OnThisPageNav, StorybookRootHeaderPortal, StorybookSbdocsTocPortal } from "../_docs/docs-scaffold";

/** Default demo copy (plain length 852 → `maxLength` 1816 shows “964 characters left”). */
const TEXT_EDITOR_DEFAULT_SAMPLE_HTML = `<p>We need another and a wiser and perhaps a more mystical concept of animals. Remote from universal nature, and living by complicated artifice, man in civilization surveys the creature through the glass of his knowledge and sees thereby a feather magnified and the whole image in distortion.</p><p></p><p>We patronize them for their incompleteness, for their tragic fate of having taken form so far below ourselves. And therein we err, and greatly err. For the animal shall not be measured by man.</p><p></p><p>In a world older and more complete than ours they move finished and complete, gifted with extensions of the senses we have lost or never attained, living by voices we shall never hear. They are not brethren, they are not underlings; they are other nations, caught with ourselves in the net of life and time, fellow prisoners of the splendour and travail of the earth.</p>`;

/** “With tooltip” preview: shorter paragraph + static hint (no character counter). */
const TEXT_EDITOR_TOOLTIP_SAMPLE_HTML = `<p>In a world older and more complete than ours they move finished and complete, gifted with extensions of the senses we have lost or never attained, living by voices we shall never hear. They are not brethren; they are not underlings; they are other nations, caught with ourselves in the net of life and time, fellow prisoners of the splendor and travail of the earth.</p>`;

const IMPORT = `import { TextEditor } from "@opus2-platform/codex";
`;

const CODE = {
  hero: `${IMPORT}

<TextEditor layout="hero" size="md" />`,

  defaultSm: `${IMPORT}
// \`TEXT_EDITOR_DEFAULT_SAMPLE_HTML\`: sample paragraphs string for the preview.

<TextEditor
  size="sm"
  maxLength={1816}
  defaultContent={TEXT_EDITOR_DEFAULT_SAMPLE_HTML}
/>`,

  defaultMd: `${IMPORT}

<TextEditor
  size="md"
  maxLength={1816}
  defaultContent={TEXT_EDITOR_DEFAULT_SAMPLE_HTML}
/>`,

  floatingSm: `${IMPORT}
// Same sample copy + counter as default sm; toolbar uses floating chrome (always visible).

<TextEditor
  size="sm"
  floatingToolbar
  maxLength={1816}
  defaultContent={TEXT_EDITOR_DEFAULT_SAMPLE_HTML}
/>`,

  floatingMd: `${IMPORT}
// Same sample copy + counter as default md; toolbar uses md floating chrome (always visible).

<TextEditor
  size="md"
  floatingToolbar
  maxLength={1816}
  defaultContent={TEXT_EDITOR_DEFAULT_SAMPLE_HTML}
/>`,

  withTooltip: `${IMPORT}
// No fixed toolbar — select text to open the bubble toolbar; showTooltips adds labels on controls.

<TextEditor
  size="md"
  showToolbar={false}
  showTooltips
  hintText="Select a text to show a tooltip."
  defaultContent={TEXT_EDITOR_TOOLTIP_SAMPLE_HTML}
/>`,
} as const;

const codeClass = "text-secondary font-mono text-sm";

const DESC = {
  defaultSm: (
    <p>
      Use <code className={codeClass}>size=&quot;sm&quot;</code> for a compact editor and toolbar.
    </p>
  ),
  defaultMd: (
    <p>
      Use <code className={codeClass}>size=&quot;md&quot;</code> for the default spacing and typography.
    </p>
  ),
  floatingSm: (
    <p>
      Pass <code className={codeClass}>floatingToolbar</code> to use floating toolbar chrome (rounded pill + ring) above the editor at{" "}
      <code className={codeClass}>sm</code>.
    </p>
  ),
  floatingMd: (
    <p>
      <code className={codeClass}>floatingToolbar</code> with <code className={codeClass}>size=&quot;md&quot;</code> uses floating toolbar chrome (<code className={codeClass}>rounded-xl</code> + ring) above the editor.
    </p>
  ),
  withTooltip: (
    <p>
      Use <code className={codeClass}>showToolbar={false}</code> for no fixed toolbar, <code className={codeClass}>hintText</code> for the helper line, and <code className={codeClass}>showTooltips</code> so the selection bubble toolbar shows control tooltips after you select text.
    </p>
  ),
} as const;

const TOC = [
  { id: "text-editor-example", label: "Text editor example" },
  { id: "text-editor-examples-intro", label: "Text editor examples" },
  { id: "default-sm", label: "Default sm" },
  { id: "default-md", label: "Default md" },
  { id: "floating-toolbar-sm", label: "Floating toolbar sm" },
  { id: "floating-toolbar-md", label: "Floating toolbar md" },
  { id: "with-tooltip", label: "With tooltip" },
] as const;

/** TipTap documentation link chip (intro tech link). */
function TipTapDocLink() {
  return (
    <ul className="mt-6 flex list-none items-center gap-2 !pl-0">
      <li className="inline-flex !pl-0">
        <a
          href="https://tiptap.dev/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="flex cursor-pointer items-center gap-[3px] rounded-md bg-primary py-0.5 pr-1.5 text-xs font-semibold !text-[#404040] !no-underline hover:bg-primary_hover hover:!text-[#404040] hover:!no-underline focus:!text-[#404040] focus:!no-underline shadow-xs ring-1 ring-primary outline-focus-ring transition duration-100 ease-linear ring-inset focus-visible:outline-2 focus-visible:outline-offset-2 pl-2"
        >
          TipTap
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="size-3 stroke-[3px] text-current"
          >
            <path d="M7 17 17 7m0 0H7m10 0v10" />
          </svg>
        </a>
      </li>
    </ul>
  );
}

const TextEditorsDocsPage: FC = () => (
  <div className="bg-primary min-h-screen font-sans" data-codex-docs-text-editors>
    <StorybookRootHeaderPortal>
      <DocsPageBreadcrumb currentLabel="Text editors" />
    </StorybookRootHeaderPortal>
    <StorybookSbdocsTocPortal>
      <OnThisPageNav items={TOC} />
    </StorybookSbdocsTocPortal>

    <main className="relative mx-auto flex w-full max-w-304 min-w-0 flex-1 flex-col">
      <div className="typography text-tertiary w-full min-w-0 max-w-none" data-docs="true">
        <div className="mb-10">
          <div className="pb-3">
            <h1 className="text-primary md:text-display-xs max-w-3xl text-xl font-semibold">Text editor components</h1>
          </div>
          <p className="text-md text-tertiary mt-0 max-w-3xl whitespace-pre-line">
            Powerful and customizable React text editor components built for modern applications and websites. These text editors are built using TipTap and styled with Tailwind CSS.
          </p>
          <TipTapDocLink />
        </div>

        <DocsSection
          id="text-editor-example"
          title="Text editor example"
          code={CODE.hero}
          sectionClassName={DOCS_SECTION_HERO_CLASS}
          dataPreview
          previewHeight="450px"
          previewClassName={DOCS_PREVIEW_TEXT_EDITOR_SECTION_CENTER_CLASS}
        >
          <TextEditor layout="hero" size="md" className="w-full" />
        </DocsSection>

        <section id="text-editor-examples-intro" className="scroll-mt-20 pb-2">
          <h2 className="text-primary text-lg font-semibold md:text-xl">
            <SectionTitle className="text-lg font-semibold md:text-xl">Text editor examples</SectionTitle>
          </h2>
          <p className="text-md text-tertiary mt-2 max-w-3xl">Below are examples and variations of this text editor component:</p>
        </section>

        <DocsSection
          id="default-sm"
          title="Default sm"
          code={CODE.defaultSm}
          description={DESC.defaultSm}
          dataPreview
          previewHeight="672px"
          previewClassName={DOCS_PREVIEW_TEXT_EDITOR_SECTION_CLASS}
        >
          <TextEditor size="sm" className="w-full" maxLength={1816} defaultContent={TEXT_EDITOR_DEFAULT_SAMPLE_HTML} />
        </DocsSection>

        <DocsSection
          id="default-md"
          title="Default md"
          code={CODE.defaultMd}
          description={DESC.defaultMd}
          dataPreview
          previewHeight="764px"
          previewClassName={DOCS_PREVIEW_TEXT_EDITOR_SECTION_OVERFLOW_X_CLASS}
        >
          <TextEditor size="md" className="w-full" maxLength={1816} defaultContent={TEXT_EDITOR_DEFAULT_SAMPLE_HTML} />
        </DocsSection>

        <DocsSection
          id="floating-toolbar-sm"
          title="Floating toolbar sm"
          code={CODE.floatingSm}
          description={DESC.floatingSm}
          dataPreview
          previewHeight="680px"
          previewClassName={DOCS_PREVIEW_TEXT_EDITOR_SECTION_OVERFLOW_X_CLASS}
        >
          <TextEditor
            size="sm"
            floatingToolbar
            className="w-full"
            maxLength={1816}
            defaultContent={TEXT_EDITOR_DEFAULT_SAMPLE_HTML}
          />
        </DocsSection>

        <DocsSection
          id="floating-toolbar-md"
          title="Floating toolbar md"
          code={CODE.floatingMd}
          description={DESC.floatingMd}
          dataPreview
          previewHeight="776px"
          previewClassName={DOCS_PREVIEW_TEXT_EDITOR_SECTION_OVERFLOW_X_CLASS}
        >
          <TextEditor
            size="md"
            floatingToolbar
            className="w-full"
            maxLength={1816}
            defaultContent={TEXT_EDITOR_DEFAULT_SAMPLE_HTML}
          />
        </DocsSection>

        <DocsSection
          id="with-tooltip"
          title="With tooltip"
          code={CODE.withTooltip}
          description={DESC.withTooltip}
          dataPreview
          previewHeight="632px"
          previewClassName={DOCS_PREVIEW_TEXT_EDITOR_SECTION_CENTER_CLASS}
        >
          <TextEditor
            size="md"
            showToolbar={false}
            showTooltips
            className="w-full"
            hintText="Select a text to show a tooltip."
            defaultContent={TEXT_EDITOR_TOOLTIP_SAMPLE_HTML}
          />
        </DocsSection>
      </div>
    </main>
  </div>
);

const meta = {
  title: "Base components/Text editors",
  component: TextEditor,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: TextEditorsDocsPage,
    },
  },
} satisfies Meta<typeof TextEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Text editors",
  args: {
    size: "md",
  },
  render: () => (
    <div className="bg-primary p-6 font-sans">
      <TextEditor size="md" className="w-full" />
    </div>
  ),
};
