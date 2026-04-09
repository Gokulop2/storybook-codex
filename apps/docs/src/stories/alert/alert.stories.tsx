import { Alert } from "@opus2-platform/codex";
import { InfoCircle } from "@opus2-platform/icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK,
  DOCS_SECTION_HERO_CLASS,
  DocsSection,
} from "../_docs/docs-preview-code";
import { DocsPageBreadcrumb } from "../_docs/docs-page-breadcrumb";
import { OnThisPageNav, StorybookRootHeaderPortal, StorybookSbdocsTocPortal } from "../_docs/docs-scaffold";

const ALERT_TOC = [
  { id: "alert-examples", label: "Alert examples" },
  { id: "default", label: "Default" },
  { id: "brand", label: "Brand" },
  { id: "gray", label: "Gray" },
  { id: "error", label: "Error" },
  { id: "warning", label: "Warning" },
  { id: "success", label: "Success" },
  { id: "full-width", label: "Full width" },
  { id: "with-actions", label: "With actions" },
  { id: "dismissible", label: "Dismissible" },
  { id: "custom-icon", label: "Custom icon" },
  { id: "no-icon", label: "No icon" },
] as const;

const previewWrap = "flex flex-col gap-3 w-full max-w-lg";

const AlertDocsPage = () => {
  return (
    <div className="docs-sbdocs-with-toc-layout">
      <StorybookRootHeaderPortal>
        <DocsPageBreadcrumb currentLabel="Alerts" />
      </StorybookRootHeaderPortal>
      <StorybookSbdocsTocPortal>
        <OnThisPageNav items={ALERT_TOC} />
      </StorybookSbdocsTocPortal>

      <main className="docs-sbdocs-content typography">
        <div id="alert-examples" className={DOCS_SECTION_HERO_CLASS}>
          <h1 className="docs-h1">Alerts</h1>
          <p>Alert banners notify users about important information or status changes.</p>
          <div className={DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK}>
            <div className={previewWrap}>
              <Alert color="default" title="Default alert" description="This is a default alert message." />
              <Alert color="error" title="Error alert" description="Something went wrong. Please try again." />
              <Alert color="success" title="Success alert" description="Your changes have been saved." />
            </div>
          </div>
        </div>

        <div className="docs-sections-wrap">
          <DocsSection
            id="default"
            title="Default"
            code={`import { Alert } from "@opus2-platform/codex";\n\n<Alert color="default" title="Alert title" description="Supporting description goes here." />`}
          >
            <div className={previewWrap}>
              <Alert color="default" title="Alert title" description="Supporting description goes here." />
            </div>
          </DocsSection>

          <DocsSection
            id="brand"
            title="Brand"
            code={`import { Alert } from "@opus2-platform/codex";\n\n<Alert color="brand" title="Alert title" description="Supporting description goes here." />`}
          >
            <div className={previewWrap}>
              <Alert color="brand" title="Alert title" description="Supporting description goes here." />
            </div>
          </DocsSection>

          <DocsSection
            id="gray"
            title="Gray"
            code={`import { Alert } from "@opus2-platform/codex";\n\n<Alert color="gray" title="Alert title" description="Supporting description goes here." />`}
          >
            <div className={previewWrap}>
              <Alert color="gray" title="Alert title" description="Supporting description goes here." />
            </div>
          </DocsSection>

          <DocsSection
            id="error"
            title="Error"
            code={`import { Alert } from "@opus2-platform/codex";\n\n<Alert color="error" title="Alert title" description="Something went wrong. Please try again." />`}
          >
            <div className={previewWrap}>
              <Alert color="error" title="Alert title" description="Something went wrong. Please try again." />
            </div>
          </DocsSection>

          <DocsSection
            id="warning"
            title="Warning"
            code={`import { Alert } from "@opus2-platform/codex";\n\n<Alert color="warning" title="Alert title" description="Please review before continuing." />`}
          >
            <div className={previewWrap}>
              <Alert color="warning" title="Alert title" description="Please review before continuing." />
            </div>
          </DocsSection>

          <DocsSection
            id="success"
            title="Success"
            code={`import { Alert } from "@opus2-platform/codex";\n\n<Alert color="success" title="Alert title" description="Your changes have been saved." />`}
          >
            <div className={previewWrap}>
              <Alert color="success" title="Alert title" description="Your changes have been saved." />
            </div>
          </DocsSection>

          <DocsSection
            id="full-width"
            title="Full width"
            code={`import { Alert } from "@opus2-platform/codex";\n\n<Alert layout="full-width" color="default" title="Full width alert" description="This alert spans the full container width." />`}
            previewClassName="p-0! overflow-hidden rounded-xl"
          >
            <Alert layout="full-width" color="default" title="Full width alert" description="This alert spans the full container width." />
          </DocsSection>

          <DocsSection
            id="with-actions"
            title="With actions"
            code={`import { Alert, Button } from "@opus2-platform/codex";\n\n<Alert\n  color="brand"\n  title="Update available"\n  description="A new version is ready to install."\n  actions={\n    <>\n      <Button size="sm" color="link-color">View changelog</Button>\n      <Button size="sm" color="link-gray">Dismiss</Button>\n    </>\n  }\n/>`}
          >
            <div className={previewWrap}>
              <Alert
                color="brand"
                title="Update available"
                description="A new version is ready to install."
                actions={
                  <div className="flex gap-3">
                    <button type="button" className="text-sm font-semibold text-utility-brand-700 hover:opacity-70 cursor-pointer">View changelog</button>
                    <button type="button" className="text-sm font-semibold text-utility-brand-600 hover:opacity-70 cursor-pointer">Dismiss</button>
                  </div>
                }
              />
            </div>
          </DocsSection>

          <DocsSection
            id="dismissible"
            title="Dismissible"
            code={`import { Alert } from "@opus2-platform/codex";\n\n<Alert\n  color="default"\n  title="Dismissible alert"\n  description="Click the × to dismiss this alert."\n  dismissible\n  onDismiss={() => console.log("dismissed")}\n/>`}
          >
            <div className={previewWrap}>
              <Alert
                color="default"
                title="Dismissible alert"
                description="Click the × to dismiss this alert."
                dismissible
              />
              <Alert
                color="error"
                title="Error alert"
                description="This can be dismissed."
                dismissible
              />
              <Alert
                color="success"
                title="Success alert"
                description="This can be dismissed."
                dismissible
              />
            </div>
          </DocsSection>

          <DocsSection
            id="custom-icon"
            title="Custom icon"
            code={`import { Alert } from "@opus2-platform/codex";\nimport { InfoCircle } from "@opus2-platform/icons";\n\n<Alert color="brand" icon={InfoCircle} title="Custom icon" description="Using a custom icon component." />`}
          >
            <div className={previewWrap}>
              <Alert color="brand" icon={InfoCircle} title="Custom icon" description="Using a custom icon component." />
            </div>
          </DocsSection>

          <DocsSection
            id="no-icon"
            title="No icon"
            code={`import { Alert } from "@opus2-platform/codex";\n\n<Alert color="success" icon={null} title="No icon" description="This alert has no icon." />`}
          >
            <div className={previewWrap}>
              <Alert color="success" icon={null} title="No icon" description="This alert has no icon." />
            </div>
          </DocsSection>
        </div>
      </main>
    </div>
  );
};

const meta = {
  title: "Application UI/Alerts",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: AlertDocsPage,
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  tags: ["!dev"],
  name: "Alerts",
  args: {
    title: "Alert title",
    description: "Supporting description goes here.",
    color: "default",
  },
};
