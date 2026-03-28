import type { FC } from "react";
import { GradientScan, QRCode } from "@opus2-platform/codex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CODEX_DOCS_AVATAR_SRC } from "../_docs/docs-assets";
import { UntitledDocsBreadcrumb } from "../_docs/untitled-docs-breadcrumb";
import {
  DOCS_PREVIEW_HERO_SURFACE_CLASS,
  DOCS_SECTION_CLASS,
  DOCS_SECTION_HERO_CLASS,
  DocsSection,
  SectionTitle,
} from "../_docs/untitled-docs-preview-code";
import { OnThisPageNav, StorybookRootHeaderPortal, StorybookSbdocsTocPortal } from "../_docs/untitled-docs-scaffold";

const DEMO_URL = "https://www.opus2.com";

const IMPORT = `import { GradientScan, QRCode } from "@opus2-platform/codex";`;

const doc = (body: string) => `${IMPORT}\n\n${body.trim()}`;

const CODE = {
  hero: doc(`<QRCode value="${DEMO_URL}" />`),
  default: doc(`<QRCode value="${DEMO_URL}" />`),
  large: doc(`<QRCode value="${DEMO_URL}" size="lg" />`),
  gradientScan: doc(`<div className="relative inline-block">
  <QRCode value="${DEMO_URL}" />
  <GradientScan />
</div>`),
  customOptions: doc(`<QRCode
  value="${DEMO_URL}"
  options={{
    image: "${CODEX_DOCS_AVATAR_SRC}",
    imageOptions: {
      hideBackgroundDots: true,
      margin: 4,
    },
  }}
/>`),
} as const;

const TOC = [
  { id: "qr-code-example", label: "QR code example" },
  { id: "qr-code-examples", label: "QR code examples" },
  { id: "default", label: "Default" },
  { id: "large", label: "Large" },
  { id: "with-gradient-scan", label: "With gradient scan" },
  { id: "with-custom-options", label: "With custom options" },
] as const;

const codeClass = "text-secondary font-mono text-sm";

const QRCodesDocsPage: FC = () => (
  <div className="bg-primary min-h-screen font-sans" data-codex-docs-qr-codes>
    <StorybookRootHeaderPortal>
      <UntitledDocsBreadcrumb currentLabel="QR codes" />
    </StorybookRootHeaderPortal>
    <StorybookSbdocsTocPortal>
      <OnThisPageNav items={TOC} />
    </StorybookSbdocsTocPortal>

    <main className="relative mx-auto flex w-full max-w-304 min-w-0 flex-1 flex-col">
      <div className="text-tertiary w-full min-w-0">
        <div className="mb-10">
          <div className="pb-3">
            <h1 className="text-primary md:text-display-xs max-w-3xl text-xl font-semibold">QR code components</h1>
          </div>
          <p className="text-md text-tertiary mt-0 max-w-3xl whitespace-pre-line">
            QR codes for links and deep links, powered by QR Code Styling and Codex tokens.
          </p>
        </div>

        <DocsSection
          id="qr-code-example"
          title="QR code example"
          code={CODE.hero}
          sectionClassName={DOCS_SECTION_HERO_CLASS}
          dataPreview
          previewClassName={DOCS_PREVIEW_HERO_SURFACE_CLASS}
        >
          <QRCode value={DEMO_URL} />
        </DocsSection>

        <section id="qr-code-examples" className={`scroll-mt-20 ${DOCS_SECTION_CLASS}`}>
          <h2 className="text-primary text-lg font-semibold md:text-xl">
            <SectionTitle className="text-lg font-semibold md:text-xl">QR code examples</SectionTitle>
          </h2>
          <p className="text-md text-tertiary mt-2 max-w-3xl">
            Below are examples and variations of the QR code component.
          </p>
        </section>

        <DocsSection
          id="default"
          title="Default example"
          code={CODE.default}
          description={
            <p>
              Import <code className={codeClass}>QRCode</code> and pass the string to encode with the{" "}
              <code className={codeClass}>value</code> prop.
            </p>
          }
        >
          <QRCode value={DEMO_URL} />
        </DocsSection>

        <DocsSection
          id="large"
          title="Large example"
          code={CODE.large}
          description={
            <p>
              Set <code className={codeClass}>size=&quot;lg&quot;</code> for a larger QR (128×128 px canvas vs default 96×96).
            </p>
          }
        >
          <QRCode value={DEMO_URL} size="lg" />
        </DocsSection>

        <DocsSection
          id="with-gradient-scan"
          title="With gradient scan example"
          code={CODE.gradientScan}
          description={
            <p>
              Render <code className={codeClass}>GradientScan</code> as a sibling of <code className={codeClass}>QRCode</code>{" "}
              inside a <code className={codeClass}>relative</code> wrapper to add the scan effect.
            </p>
          }
        >
          <div className="relative inline-block">
            <QRCode value={DEMO_URL} />
            <GradientScan />
          </div>
        </DocsSection>

        <DocsSection
          id="with-custom-options"
          title="With custom options example"
          code={CODE.customOptions}
          description={
            <p>
              Pass <code className={codeClass}>options</code> through to QR Code Styling—for example{" "}
              <code className={codeClass}>options.image</code> for a center logo. See the library docs for the full option set.
            </p>
          }
        >
          <QRCode
            value={DEMO_URL}
            options={{
              image: CODEX_DOCS_AVATAR_SRC,
              imageOptions: {
                hideBackgroundDots: true,
                margin: 4,
              },
            }}
          />
        </DocsSection>
      </div>
    </main>
  </div>
);

const meta = {
  title: "QR codes",
  component: QRCode,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: QRCodesDocsPage,
    },
  },
} satisfies Meta<typeof QRCode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "QR codes",
  args: { value: DEMO_URL },
  render: () => <QRCode value={DEMO_URL} />,
};
