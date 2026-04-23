import { Alert, AlertFloating, AlertFullWidth } from "@opus2-platform/codex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK,
  DOCS_PREVIEW_SB_ISOLATION,
  DOCS_SECTION_HERO_CLASS,
  DocsSection,
} from "../_docs/docs-preview-code";
import { DocsPageBreadcrumb } from "../_docs/docs-page-breadcrumb";
import { OnThisPageNav, StorybookRootHeaderPortal, StorybookSbdocsTocPortal } from "../_docs/docs-scaffold";
import { ApplicationUiOverview } from "../_docs/application-ui-overview";

const ALERT_TOC = [
  { id: "alerts-overview", label: "Overview" },
  { id: "installation", label: "Installation" },
  { id: "alert-examples", label: "Alert examples" },
  { id: "floating-default", label: "Floating — default" },
  { id: "floating-brand", label: "Floating — brand" },
  { id: "floating-gray", label: "Floating — gray" },
  { id: "floating-error", label: "Floating — error" },
  { id: "floating-warning", label: "Floating — warning" },
  { id: "floating-success", label: "Floating — success" },
  { id: "full-width-default", label: "Full width — default" },
  { id: "full-width-brand", label: "Full width — brand" },
  { id: "full-width-gray", label: "Full width — gray" },
  { id: "full-width-error", label: "Full width — error" },
  { id: "full-width-warning", label: "Full width — warning" },
  { id: "full-width-success", label: "Full width — success" },
] as const;

const previewWrap = "flex flex-col gap-3 w-full max-w-xl";

const FLOATING_IMPORT = `import { AlertFloating } from "@opus2-platform/codex";`;
const FULL_WIDTH_IMPORT = `import { AlertFullWidth } from "@opus2-platform/codex";`;

const AlertDocsPage = () => {
  return (
    <div className="docs-sbdocs-with-toc-layout">
      <StorybookRootHeaderPortal>
        <DocsPageBreadcrumb catalog="application" currentLabel="Alerts" />
      </StorybookRootHeaderPortal>
      <StorybookSbdocsTocPortal>
        <OnThisPageNav items={ALERT_TOC} />
      </StorybookSbdocsTocPortal>

      <main className="docs-sbdocs-content typography">
        <div id="alerts-overview" className={DOCS_SECTION_HERO_CLASS}>
          <h1 className="docs-h1">Alerts</h1>
          <p>
            Notification banners for status and messaging. Two layout variants —{" "}
            <code className="text-sm">AlertFloating</code> (contained card) and{" "}
            <code className="text-sm">AlertFullWidth</code> (edge-to-edge banner) — both from{" "}
            <code className="text-sm">@opus2-platform/codex</code>.
          </p>
          <ApplicationUiOverview
            items={[
              {
                label: "Components",
                children: (
                  <>
                    <code className="text-xs">AlertFloating</code> for contained card alerts;{" "}
                    <code className="text-xs">AlertFullWidth</code> for edge-to-edge banners.
                  </>
                ),
              },
              {
                label: "Colors",
                children: (
                  <>
                    <code className="text-xs">default</code>, <code className="text-xs">brand</code>,{" "}
                    <code className="text-xs">gray</code>, <code className="text-xs">error</code>,{" "}
                    <code className="text-xs">warning</code>, <code className="text-xs">success</code>.
                  </>
                ),
              },
              {
                label: "Actions",
                children: (
                  <>
                    Pass <code className="text-xs">confirmLabel</code> + <code className="text-xs">onConfirm</code> and/or{" "}
                    <code className="text-xs">dismissLabel</code> + <code className="text-xs">onClose</code>.{" "}
                    <code className="text-xs">AlertFullWidth</code> also accepts{" "}
                    <code className="text-xs">actionType="link"</code> for link-style buttons.
                  </>
                ),
              },
            ]}
          />
          <div className={DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK}>
            <div className={previewWrap}>
              <AlertFloating
                color="default"
                title="We've just released a new feature"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                confirmLabel="View changes"
                onConfirm={() => {}}
                onClose={() => {}}
              />
              <AlertFloating
                color="error"
                title="There was a problem with that action"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                confirmLabel="Try again"
                onConfirm={() => {}}
                onClose={() => {}}
              />
              <AlertFloating
                color="success"
                title="Your changes have been saved"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                confirmLabel="View changes"
                onConfirm={() => {}}
                onClose={() => {}}
              />
            </div>
          </div>
        </div>

        <div className="docs-sections-wrap">

          {/* ── Installation ── */}
          <DocsSection
            id="installation"
            title="Installation"
            code={`import { AlertFloating, AlertFullWidth } from "@opus2-platform/codex";`}
          >
            <div className={previewWrap}>
              <AlertFloating
                color="gray"
                title="We've just released a new feature"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor."
                confirmLabel="View changes"
                onConfirm={() => {}}
                onClose={() => {}}
              />
            </div>
          </DocsSection>

          {/* ── Alert examples ── */}
          <DocsSection
            id="alert-examples"
            title="Alert examples"
            code={`${FLOATING_IMPORT}\n\n<AlertFloating\n  color="default"\n  title="We've just released a new feature"\n  description="Lorem ipsum dolor sit amet consectetur adipisicing elit."\n  confirmLabel="View changes"\n  onConfirm={() => {}}\n  onClose={() => {}}\n/>\n\n<AlertFloating\n  color="error"\n  title="There was a problem with that action"\n  description="Lorem ipsum dolor sit amet consectetur adipisicing elit."\n  confirmLabel="Try again"\n  onConfirm={() => {}}\n  onClose={() => {}}\n/>`}
          >
            <div className={previewWrap}>
              <AlertFloating
                color="default"
                title="We've just released a new feature"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor."
                confirmLabel="View changes"
                onConfirm={() => {}}
                onClose={() => {}}
              />
              <AlertFloating
                color="brand"
                title="We've just released a new feature"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor."
                confirmLabel="View changes"
                onConfirm={() => {}}
                onClose={() => {}}
              />
              <AlertFloating
                color="gray"
                title="We've just released a new feature"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor."
                confirmLabel="View changes"
                onConfirm={() => {}}
                onClose={() => {}}
              />
              <AlertFloating
                color="error"
                title="There was a problem with that action"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor."
                confirmLabel="Try again"
                onConfirm={() => {}}
                onClose={() => {}}
              />
              <AlertFloating
                color="warning"
                title="Your free trial is expiring soon"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor."
                confirmLabel="Upgrade plan"
                onConfirm={() => {}}
                onClose={() => {}}
              />
              <AlertFloating
                color="success"
                title="Your changes have been saved"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor."
                confirmLabel="View changes"
                onConfirm={() => {}}
                onClose={() => {}}
              />
            </div>
          </DocsSection>

          {/* ── Floating variants ── */}

          <DocsSection
            id="floating-default"
            title="Floating — default"
            code={`${FLOATING_IMPORT}\n\n<AlertFloating\n  color="default"\n  title="We've just released a new feature"\n  description="Lorem ipsum dolor sit amet consectetur adipisicing elit."\n  confirmLabel="View changes"\n  onConfirm={() => {}}\n  onClose={() => {}}\n/>`}
          >
            <div className={previewWrap}>
              <AlertFloating
                color="default"
                title="We've just released a new feature"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor."
                confirmLabel="View changes"
                onConfirm={() => {}}
                onClose={() => {}}
              />
            </div>
          </DocsSection>

          <DocsSection
            id="floating-brand"
            title="Floating — brand"
            code={`${FLOATING_IMPORT}\n\n<AlertFloating\n  color="brand"\n  title="We've just released a new feature"\n  description="Lorem ipsum dolor sit amet consectetur adipisicing elit."\n  confirmLabel="View changes"\n  onConfirm={() => {}}\n  onClose={() => {}}\n/>`}
          >
            <div className={previewWrap}>
              <AlertFloating
                color="brand"
                title="We've just released a new feature"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor."
                confirmLabel="View changes"
                onConfirm={() => {}}
                onClose={() => {}}
              />
            </div>
          </DocsSection>

          <DocsSection
            id="floating-gray"
            title="Floating — gray"
            code={`${FLOATING_IMPORT}\n\n<AlertFloating\n  color="gray"\n  title="We've just released a new feature"\n  description="Lorem ipsum dolor sit amet consectetur adipisicing elit."\n  confirmLabel="View changes"\n  onConfirm={() => {}}\n  onClose={() => {}}\n/>`}
          >
            <div className={previewWrap}>
              <AlertFloating
                color="gray"
                title="We've just released a new feature"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor."
                confirmLabel="View changes"
                onConfirm={() => {}}
                onClose={() => {}}
              />
            </div>
          </DocsSection>

          <DocsSection
            id="floating-error"
            title="Floating — error"
            code={`${FLOATING_IMPORT}\n\n<AlertFloating\n  color="error"\n  title="There was a problem with that action"\n  description="Lorem ipsum dolor sit amet consectetur adipisicing elit."\n  confirmLabel="Try again"\n  onConfirm={() => {}}\n  onClose={() => {}}\n/>`}
          >
            <div className={previewWrap}>
              <AlertFloating
                color="error"
                title="There was a problem with that action"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor."
                confirmLabel="Try again"
                onConfirm={() => {}}
                onClose={() => {}}
              />
            </div>
          </DocsSection>

          <DocsSection
            id="floating-warning"
            title="Floating — warning"
            code={`${FLOATING_IMPORT}\n\n<AlertFloating\n  color="warning"\n  title="Your free trial is expiring soon"\n  description="Lorem ipsum dolor sit amet consectetur adipisicing elit."\n  confirmLabel="Upgrade plan"\n  onConfirm={() => {}}\n  onClose={() => {}}\n/>`}
          >
            <div className={previewWrap}>
              <AlertFloating
                color="warning"
                title="Your free trial is expiring soon"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor."
                confirmLabel="Upgrade plan"
                onConfirm={() => {}}
                onClose={() => {}}
              />
            </div>
          </DocsSection>

          <DocsSection
            id="floating-success"
            title="Floating — success"
            code={`${FLOATING_IMPORT}\n\n<AlertFloating\n  color="success"\n  title="Your changes have been saved"\n  description="Lorem ipsum dolor sit amet consectetur adipisicing elit."\n  confirmLabel="View changes"\n  onConfirm={() => {}}\n  onClose={() => {}}\n/>`}
          >
            <div className={previewWrap}>
              <AlertFloating
                color="success"
                title="Your changes have been saved"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor."
                confirmLabel="View changes"
                onConfirm={() => {}}
                onClose={() => {}}
              />
            </div>
          </DocsSection>

          {/* ── Full-width variants ── */}

          <DocsSection
            id="full-width-default"
            title="Full width — default"
            code={`${FULL_WIDTH_IMPORT}\n\n<AlertFullWidth\n  color="default"\n  title="We've just released a new feature"\n  description="Lorem ipsum dolor sit amet consectetur."\n  confirmLabel="View changes"\n  onConfirm={() => {}}\n  onClose={() => {}}\n/>`}
            previewClassName={`p-0! overflow-hidden rounded-xl ${DOCS_PREVIEW_SB_ISOLATION}`}
          >
            <AlertFullWidth
              color="default"
              title="We've just released a new feature"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
              confirmLabel="View changes"
              onConfirm={() => {}}
              onClose={() => {}}
            />
          </DocsSection>

          <DocsSection
            id="full-width-brand"
            title="Full width — brand"
            code={`${FULL_WIDTH_IMPORT}\n\n<AlertFullWidth\n  color="brand"\n  title="We've just released a new feature"\n  description="Lorem ipsum dolor sit amet consectetur."\n  confirmLabel="View changes"\n  onConfirm={() => {}}\n  onClose={() => {}}\n/>`}
            previewClassName={`p-0! overflow-hidden rounded-xl ${DOCS_PREVIEW_SB_ISOLATION}`}
          >
            <AlertFullWidth
              color="brand"
              title="We've just released a new feature"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
              confirmLabel="View changes"
              onConfirm={() => {}}
              onClose={() => {}}
            />
          </DocsSection>

          <DocsSection
            id="full-width-gray"
            title="Full width — gray"
            code={`${FULL_WIDTH_IMPORT}\n\n<AlertFullWidth\n  color="gray"\n  title="We've just released a new feature"\n  description="Lorem ipsum dolor sit amet consectetur."\n  confirmLabel="View changes"\n  onConfirm={() => {}}\n  onClose={() => {}}\n/>`}
            previewClassName={`p-0! overflow-hidden rounded-xl ${DOCS_PREVIEW_SB_ISOLATION}`}
          >
            <AlertFullWidth
              color="gray"
              title="We've just released a new feature"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
              confirmLabel="View changes"
              onConfirm={() => {}}
              onClose={() => {}}
            />
          </DocsSection>

          <DocsSection
            id="full-width-error"
            title="Full width — error"
            code={`${FULL_WIDTH_IMPORT}\n\n<AlertFullWidth\n  color="error"\n  title="There was a problem with that action"\n  description="Lorem ipsum dolor sit amet consectetur."\n  confirmLabel="Try again"\n  onConfirm={() => {}}\n  onClose={() => {}}\n/>`}
            previewClassName={`p-0! overflow-hidden rounded-xl ${DOCS_PREVIEW_SB_ISOLATION}`}
          >
            <AlertFullWidth
              color="error"
              title="There was a problem with that action"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
              confirmLabel="Try again"
              onConfirm={() => {}}
              onClose={() => {}}
            />
          </DocsSection>

          <DocsSection
            id="full-width-warning"
            title="Full width — warning"
            code={`${FULL_WIDTH_IMPORT}\n\n<AlertFullWidth\n  color="warning"\n  title="Your free trial is expiring soon"\n  description="Lorem ipsum dolor sit amet consectetur."\n  confirmLabel="Upgrade plan"\n  onConfirm={() => {}}\n  onClose={() => {}}\n/>`}
            previewClassName={`p-0! overflow-hidden rounded-xl ${DOCS_PREVIEW_SB_ISOLATION}`}
          >
            <AlertFullWidth
              color="warning"
              title="Your free trial is expiring soon"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
              confirmLabel="Upgrade plan"
              onConfirm={() => {}}
              onClose={() => {}}
            />
          </DocsSection>

          <DocsSection
            id="full-width-success"
            title="Full width — success"
            code={`${FULL_WIDTH_IMPORT}\n\n<AlertFullWidth\n  color="success"\n  title="Your changes have been saved"\n  description="Lorem ipsum dolor sit amet consectetur."\n  confirmLabel="View changes"\n  onConfirm={() => {}}\n  onClose={() => {}}\n/>`}
            previewClassName={`p-0! overflow-hidden rounded-xl ${DOCS_PREVIEW_SB_ISOLATION}`}
          >
            <AlertFullWidth
              color="success"
              title="Your changes have been saved"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
              confirmLabel="View changes"
              onConfirm={() => {}}
              onClose={() => {}}
            />
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
  name: "Alerts",
  args: {
    title: "Alert title",
    description: "Supporting description goes here.",
    color: "default",
  },
};
