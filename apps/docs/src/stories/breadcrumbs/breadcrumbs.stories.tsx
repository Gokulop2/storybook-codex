import { Breadcrumbs } from "@opus2-platform/codex";
import { Home01 } from "@opus2-platform/icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK,
  DOCS_SECTION_HERO_CLASS,
  DocsSection,
} from "../_docs/docs-preview-code";
import { DocsPageBreadcrumb } from "../_docs/docs-page-breadcrumb";
import { OnThisPageNav, StorybookRootHeaderPortal, StorybookSbdocsTocPortal } from "../_docs/docs-scaffold";
import { CODEX_DOCS_AVATAR_SRC } from "../_docs/docs-assets";
import { ApplicationUiOverview } from "../_docs/application-ui-overview";

const BREADCRUMBS_TOC = [
  { id: "breadcrumbs-overview", label: "Overview" },
  { id: "text-chevron", label: "Text — chevron" },
  { id: "text-slash", label: "Text — slash" },
  { id: "text-with-line", label: "Text with line" },
  { id: "button-chevron", label: "Button — chevron" },
  { id: "button-with-icon", label: "Button with icon" },
  { id: "account-chevron", label: "Account — chevron" },
  { id: "account-slash", label: "Account — slash" },
] as const;

const BreadcrumbsDocsPage = () => {
  return (
    <div className="docs-sbdocs-with-toc-layout">
      <StorybookRootHeaderPortal>
        <DocsPageBreadcrumb catalog="application" currentLabel="Breadcrumbs" />
      </StorybookRootHeaderPortal>
      <StorybookSbdocsTocPortal>
        <OnThisPageNav items={BREADCRUMBS_TOC} />
      </StorybookSbdocsTocPortal>

      <main className="docs-sbdocs-content typography">
        <div id="breadcrumbs-overview" className={DOCS_SECTION_HERO_CLASS}>
          <h1 className="docs-h1">Breadcrumbs</h1>
          <p>
            Show where the user is in a hierarchy. From <code className="text-sm">@opus2-platform/codex</code>, use <code className="text-sm">Breadcrumbs</code>,{" "}
            <code className="text-sm">Breadcrumbs.Button</code>, and <code className="text-sm">Breadcrumbs.WithLine</code> with chevron or slash separators and
            optional account-leading items.
          </p>
          <ApplicationUiOverview
            items={[
              {
                label: "Separators",
                children: (
                  <>
                    Match chevron vs slash density via <code className="text-xs">separator</code> on the root and{" "}
                    <code className="text-xs">Breadcrumbs.Sep</code>.
                  </>
                ),
              },
              {
                label: "Current page",
                children: (
                  <>
                    End the trail with <code className="text-xs">isCurrent</code> on the final item for bold, non-link styling.
                  </>
                ),
              },
              {
                label: "Variants",
                children: (
                  <>
                    Plain text row, button pill row (<code className="text-xs">Breadcrumbs.Button</code>), and underline rule row (
                    <code className="text-xs">Breadcrumbs.WithLine</code>).
                  </>
                ),
              },
            ]}
          />
          <div className={DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK}>
            <Breadcrumbs separator="chevron">
              <Breadcrumbs.Item href="#">Home</Breadcrumbs.Item>
              <Breadcrumbs.Sep />
              <Breadcrumbs.Item href="#">Projects</Breadcrumbs.Item>
              <Breadcrumbs.Sep />
              <Breadcrumbs.Item isCurrent>Project Alpha</Breadcrumbs.Item>
            </Breadcrumbs>
          </div>
        </div>

        <div className="docs-sections-wrap">
          <DocsSection
            id="text-chevron"
            title="Text — chevron"
            code={`import { Breadcrumbs } from "@opus2-platform/codex";\n\n<Breadcrumbs separator="chevron">\n  <Breadcrumbs.Item href="#">Home</Breadcrumbs.Item>\n  <Breadcrumbs.Sep />\n  <Breadcrumbs.Item href="#">Projects</Breadcrumbs.Item>\n  <Breadcrumbs.Sep />\n  <Breadcrumbs.Item isCurrent>Project Alpha</Breadcrumbs.Item>\n</Breadcrumbs>`}
          >
            <Breadcrumbs separator="chevron">
              <Breadcrumbs.Item href="#">Home</Breadcrumbs.Item>
              <Breadcrumbs.Sep />
              <Breadcrumbs.Item href="#">Projects</Breadcrumbs.Item>
              <Breadcrumbs.Sep />
              <Breadcrumbs.Item isCurrent>Project Alpha</Breadcrumbs.Item>
            </Breadcrumbs>
          </DocsSection>

          <DocsSection
            id="text-slash"
            title="Text — slash"
            code={`import { Breadcrumbs } from "@opus2-platform/codex";\n\n<Breadcrumbs separator="slash">\n  <Breadcrumbs.Item href="#">Home</Breadcrumbs.Item>\n  <Breadcrumbs.Sep separator="slash" />\n  <Breadcrumbs.Item href="#">Projects</Breadcrumbs.Item>\n  <Breadcrumbs.Sep separator="slash" />\n  <Breadcrumbs.Item isCurrent>Project Alpha</Breadcrumbs.Item>\n</Breadcrumbs>`}
          >
            <Breadcrumbs separator="slash">
              <Breadcrumbs.Item href="#">Home</Breadcrumbs.Item>
              <Breadcrumbs.Sep separator="slash" />
              <Breadcrumbs.Item href="#">Projects</Breadcrumbs.Item>
              <Breadcrumbs.Sep separator="slash" />
              <Breadcrumbs.Item isCurrent>Project Alpha</Breadcrumbs.Item>
            </Breadcrumbs>
          </DocsSection>

          <DocsSection
            id="text-with-line"
            title="Text with line"
            code={`import { Breadcrumbs } from "@opus2-platform/codex";\n\n<Breadcrumbs.WithLine>\n  <Breadcrumbs.Item href="#">Home</Breadcrumbs.Item>\n  <Breadcrumbs.Sep />\n  <Breadcrumbs.Item href="#">Projects</Breadcrumbs.Item>\n  <Breadcrumbs.Sep />\n  <Breadcrumbs.Item isCurrent>Project Alpha</Breadcrumbs.Item>\n</Breadcrumbs.WithLine>`}
          >
            <Breadcrumbs.WithLine>
              <Breadcrumbs.Item href="#">Home</Breadcrumbs.Item>
              <Breadcrumbs.Sep />
              <Breadcrumbs.Item href="#">Projects</Breadcrumbs.Item>
              <Breadcrumbs.Sep />
              <Breadcrumbs.Item isCurrent>Project Alpha</Breadcrumbs.Item>
            </Breadcrumbs.WithLine>
          </DocsSection>

          <DocsSection
            id="button-chevron"
            title="Button — chevron"
            code={`import { Breadcrumbs } from "@opus2-platform/codex";\n\n<Breadcrumbs.Button>\n  <Breadcrumbs.ButtonItem href="#">Home</Breadcrumbs.ButtonItem>\n  <Breadcrumbs.Sep />\n  <Breadcrumbs.ButtonItem href="#">Projects</Breadcrumbs.ButtonItem>\n  <Breadcrumbs.Sep />\n  <Breadcrumbs.ButtonItem isCurrent>Project Alpha</Breadcrumbs.ButtonItem>\n</Breadcrumbs.Button>`}
          >
            <Breadcrumbs.Button>
              <Breadcrumbs.ButtonItem href="#">Home</Breadcrumbs.ButtonItem>
              <Breadcrumbs.Sep />
              <Breadcrumbs.ButtonItem href="#">Projects</Breadcrumbs.ButtonItem>
              <Breadcrumbs.Sep />
              <Breadcrumbs.ButtonItem isCurrent>Project Alpha</Breadcrumbs.ButtonItem>
            </Breadcrumbs.Button>
          </DocsSection>

          <DocsSection
            id="button-with-icon"
            title="Button with icon"
            code={`import { Breadcrumbs } from "@opus2-platform/codex";\nimport { Home01 } from "@opus2-platform/icons";\n\n<Breadcrumbs.Button>\n  <Breadcrumbs.ButtonItem href="#" icon={Home01}>Home</Breadcrumbs.ButtonItem>\n  <Breadcrumbs.Sep />\n  <Breadcrumbs.ButtonItem href="#">Projects</Breadcrumbs.ButtonItem>\n  <Breadcrumbs.Sep />\n  <Breadcrumbs.ButtonItem isCurrent>Project Alpha</Breadcrumbs.ButtonItem>\n</Breadcrumbs.Button>`}
          >
            <Breadcrumbs.Button>
              <Breadcrumbs.ButtonItem href="#" icon={Home01}>Home</Breadcrumbs.ButtonItem>
              <Breadcrumbs.Sep />
              <Breadcrumbs.ButtonItem href="#">Projects</Breadcrumbs.ButtonItem>
              <Breadcrumbs.Sep />
              <Breadcrumbs.ButtonItem isCurrent>Project Alpha</Breadcrumbs.ButtonItem>
            </Breadcrumbs.Button>
          </DocsSection>

          <DocsSection
            id="account-chevron"
            title="Account — chevron"
            code={`import { Breadcrumbs } from "@opus2-platform/codex";\n\n<Breadcrumbs.Button>\n  <Breadcrumbs.AccountItem href="#" avatarSrc="${CODEX_DOCS_AVATAR_SRC}" avatarInitials="GK">Gokul Krishnan</Breadcrumbs.AccountItem>\n  <Breadcrumbs.Sep />\n  <Breadcrumbs.ButtonItem href="#">Projects</Breadcrumbs.ButtonItem>\n  <Breadcrumbs.Sep />\n  <Breadcrumbs.ButtonItem isCurrent>Project Alpha</Breadcrumbs.ButtonItem>\n</Breadcrumbs.Button>`}
          >
            <Breadcrumbs.Button>
              <Breadcrumbs.AccountItem href="#" avatarSrc={CODEX_DOCS_AVATAR_SRC} avatarInitials="GK">Gokul Krishnan</Breadcrumbs.AccountItem>
              <Breadcrumbs.Sep />
              <Breadcrumbs.ButtonItem href="#">Projects</Breadcrumbs.ButtonItem>
              <Breadcrumbs.Sep />
              <Breadcrumbs.ButtonItem isCurrent>Project Alpha</Breadcrumbs.ButtonItem>
            </Breadcrumbs.Button>
          </DocsSection>

          <DocsSection
            id="account-slash"
            title="Account — slash"
            code={`import { Breadcrumbs } from "@opus2-platform/codex";\n\n<Breadcrumbs.Button>\n  <Breadcrumbs.AccountItem href="#" avatarInitials="GK">Gokul Krishnan</Breadcrumbs.AccountItem>\n  <Breadcrumbs.Sep separator="slash" />\n  <Breadcrumbs.ButtonItem href="#">Projects</Breadcrumbs.ButtonItem>\n  <Breadcrumbs.Sep separator="slash" />\n  <Breadcrumbs.ButtonItem isCurrent>Project Alpha</Breadcrumbs.ButtonItem>\n</Breadcrumbs.Button>`}
          >
            <Breadcrumbs.Button>
              <Breadcrumbs.AccountItem href="#" avatarSrc={CODEX_DOCS_AVATAR_SRC} avatarInitials="GK">Gokul Krishnan</Breadcrumbs.AccountItem>
              <Breadcrumbs.Sep separator="slash" />
              <Breadcrumbs.ButtonItem href="#">Projects</Breadcrumbs.ButtonItem>
              <Breadcrumbs.Sep separator="slash" />
              <Breadcrumbs.ButtonItem isCurrent>Project Alpha</Breadcrumbs.ButtonItem>
            </Breadcrumbs.Button>
          </DocsSection>
        </div>
      </main>
    </div>
  );
};

const meta = {
  title: "Application UI/Breadcrumbs",
  component: Breadcrumbs,
  tags: ["autodocs", "hidden"],
  parameters: {
    docs: {
      page: BreadcrumbsDocsPage,
    },
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Breadcrumbs",
  args: {
    children: (
      <>
        <Breadcrumbs.Item href="#">Home</Breadcrumbs.Item>
        <Breadcrumbs.Sep />
        <Breadcrumbs.Item isCurrent>Projects</Breadcrumbs.Item>
      </>
    ),
  },
};
