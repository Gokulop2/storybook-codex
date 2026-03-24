import type { CSSProperties, FC, ReactNode } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@opus2-platform/codex";
import { Check } from "@opus2-platform/icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button as AriaButton, Tab as AriaTab, TabList as AriaTabList, TabPanel as AriaTabPanel, Tabs as AriaTabs } from "react-aria-components";

type ButtonSize = "sm" | "md" | "lg" | "xl";
const sizes: ButtonSize[] = ["sm", "md", "lg", "xl"];

/** Icon-only toolbar controls — aligned with Untitled UI docs header actions (react-aria `Button`). */
const toolbarIconBtn =
  "group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-fg-quaternary hover:bg-primary_hover hover:text-fg-quaternary_hover *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-4";

const docTabBtnClass =
  "z-10 flex h-max cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold transition duration-100 ease-linear outline-focus-ring";

const docTabSelected = "bg-primary_alt text-secondary shadow-xs ring-1 ring-primary ring-inset";
const docTabIdle = "text-quaternary";

/** Rounded preview well shared by hero + every `DocsSection` (aligned with Untitled UI button docs). */
const PREVIEW_DEMO_SURFACE_CLASS =
  "outline-focus-ring ring-secondary bg-primary relative flex min-h-[304px] max-w-full items-center justify-center rounded-[20px] px-6 py-10 ring-1 ring-inset focus-visible:outline-2 focus-visible:outline-offset-2 md:min-w-130";

function previewSurfaceClassName(base: string, isPreviewDark: boolean): string {
  return [base, isPreviewDark && "dark-mode"].filter(Boolean).join(" ");
}

/** Class for inline `code` snippets in docs body copy. */
const DOC_CODE_CLASS = "text-secondary font-mono text-sm";

const CODE_IMPORT = 'import { Button } from "@opus2-platform/codex";\n';
const CODE_IMPORT_WITH_ICON = 'import { Check } from "@opus2-platform/icons";\nimport { Button } from "@opus2-platform/codex";\n';

const ArrowRightIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M5 10h7.5M10 5l4.5 5L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ICON_SAMPLE = "<Check data-icon />";

/** Example `href` for link-style buttons (same URL pattern as untitledui.com/react/components/buttons). */
const LINK_HREF_EXAMPLE = "https://www.untitledui.com/";

const BUTTON_DOCS_CODE = {
  hero: `import { Check } from "@opus2-platform/icons";
import { Button } from "@opus2-platform/codex";

<Button size="md" color="primary-destructive">Delete project</Button>
<Button size="md" color="secondary">Stage for publish</Button>
<Button size="md" color="primary" iconLeading={<Check data-icon />}>Publish now</Button>`,
  primary: `${CODE_IMPORT}${sizes.map((s) => `<Button size="${s}" color="primary">Button ${s}</Button>`).join("\n")}`,
  secondary: `${CODE_IMPORT}${sizes.map((s) => `<Button size="${s}" color="secondary">Button ${s}</Button>`).join("\n")}`,
  tertiary: `${CODE_IMPORT}${sizes.map((s) => `<Button size="${s}" color="tertiary">Button ${s}</Button>`).join("\n")}`,
  linkColor: `${CODE_IMPORT}${sizes.map((s) => `<Button size="${s}" color="link-color" href="${LINK_HREF_EXAMPLE}">Button ${s}</Button>`).join("\n")}`,
  linkGray: `${CODE_IMPORT}${sizes.map((s) => `<Button size="${s}" color="link-gray" href="${LINK_HREF_EXAMPLE}">Button ${s}</Button>`).join("\n")}`,
  linkDestructive: `${CODE_IMPORT}${sizes.map((s) => `<Button size="${s}" color="link-destructive" href="${LINK_HREF_EXAMPLE}">Button ${s}</Button>`).join("\n")}`,
  iconLeading: `${CODE_IMPORT_WITH_ICON}<>
  <div className="flex flex-wrap gap-3">
    ${sizes.map((s) => `<Button size="${s}" color="primary" iconLeading={${ICON_SAMPLE}}>Button ${s}</Button>`).join("\n    ")}
  </div>
  <div className="flex flex-wrap gap-3">
    ${sizes.map((s) => `<Button size="${s}" color="secondary" iconLeading={${ICON_SAMPLE}}>Button ${s}</Button>`).join("\n    ")}
  </div>
  <div className="flex flex-wrap gap-3">
    ${sizes.map((s) => `<Button size="${s}" color="tertiary" iconLeading={${ICON_SAMPLE}}>Button ${s}</Button>`).join("\n    ")}
  </div>
</>`,
  iconTrailing: `${CODE_IMPORT_WITH_ICON}<>
  <div className="flex flex-wrap gap-3">
    ${sizes.map((s) => `<Button size="${s}" color="primary" iconTrailing={${ICON_SAMPLE}}>Button ${s}</Button>`).join("\n    ")}
  </div>
  <div className="flex flex-wrap gap-3">
    ${sizes.map((s) => `<Button size="${s}" color="secondary" iconTrailing={${ICON_SAMPLE}}>Button ${s}</Button>`).join("\n    ")}
  </div>
  <div className="flex flex-wrap gap-3">
    ${sizes.map((s) => `<Button size="${s}" color="tertiary" iconTrailing={${ICON_SAMPLE}}>Button ${s}</Button>`).join("\n    ")}
  </div>
</>`,
  iconOnly: `${CODE_IMPORT_WITH_ICON}${sizes.map((s) => `<Button size="${s}" color="primary" iconLeading={${ICON_SAMPLE}} aria-label={\`Button ${s}\`} />`).join("\n")}`,
  loading: `${CODE_IMPORT}
${sizes.map((s) => `<Button size="${s}" color="primary" isLoading>Button ${s}</Button>`).join("\n")}

${sizes.map((s) => `<Button size="${s}" color="secondary" isLoading showTextWhileLoading>Button ${s}</Button>`).join("\n")}

${sizes.map((s) => `<Button size="${s}" color="tertiary" isLoading showTextWhileLoading>Button ${s}</Button>`).join("\n")}`,
  disabled: `${CODE_IMPORT}
${sizes.map((s) => `<Button isDisabled color="primary" size="${s}">Button ${s}</Button>`).join("\n")}

${sizes.map((s) => `<Button isDisabled color="secondary" size="${s}">Button ${s}</Button>`).join("\n")}

${sizes.map((s) => `<Button isDisabled color="tertiary" size="${s}">Button ${s}</Button>`).join("\n")}`,
  primaryDestructive: `${CODE_IMPORT}${sizes.map((s) => `<Button size="${s}" color="primary-destructive">Button ${s}</Button>`).join("\n")}`,
  secondaryDestructive: `${CODE_IMPORT}${sizes.map((s) => `<Button size="${s}" color="secondary-destructive">Button ${s}</Button>`).join("\n")}`,
  tertiaryDestructive: `${CODE_IMPORT}${sizes.map((s) => `<Button size="${s}" color="tertiary-destructive">Button ${s}</Button>`).join("\n")}`,
} as const;

const codeColor = {
  gray: "var(--color-utility-gray-700)",
  pink: "var(--color-utility-pink-600)",
  blue: "var(--color-utility-blue-600)",
  brand: "var(--color-utility-brand-600)",
  primary: "var(--color-primary)",
} as const;

const codeTokenStyle = (color: string): CSSProperties => ({ color });

const renderImportLine = (line: string) => {
  const m = line.match(/^import\s+\{([^}]*)\}\s+from\s+"([^"]+)";?$/);
  if (!m) return null;
  const imported = (m[1] ?? "").trim();
  const source = m[2] ?? "";
  return (
    <>
      <span style={codeTokenStyle(codeColor.pink)}>import</span>
      <span style={codeTokenStyle(codeColor.gray)}>{` { ${imported} } `}</span>
      <span style={codeTokenStyle(codeColor.pink)}>from</span>
      <span style={codeTokenStyle(codeColor.primary)}>{` "${source}"`}</span>
      <span style={codeTokenStyle(codeColor.gray)}>;</span>
    </>
  );
};

const renderJsxButtonLine = (line: string) => {
  if (!line.includes("<Button")) return null;
  const sizeMatch = line.match(/size="([^"]+)"/);
  const colorMatch = line.match(/color="([^"]+)"/);
  const textMatch = line.match(/>([^<]+)</);
  const hrefMatch = line.match(/href="([^"]+)"/);
  const ariaLabelMatch = line.match(/aria-label=\{`([^`]*)`\}/);
  const hasIconLeading = line.includes("iconLeading");
  const hasIconTrailing = line.includes("iconTrailing");
  const iconProp = hasIconLeading ? "iconLeading" : hasIconTrailing ? "iconTrailing" : null;
  const hasDisabled = line.includes("isDisabled");
  const hasLoading = line.includes("isLoading");
  const hasShowTextWhileLoading = line.includes("showTextWhileLoading");
  const isSelfClosing = />\s*$/.test(line.trim());
  const sizeValue = sizeMatch?.[1] ?? "md";
  const colorValue = colorMatch?.[1] ?? "primary";
  const textValue = textMatch?.[1] ?? "Button";

  const sizeAttr = (
    <>
      <span style={codeTokenStyle(codeColor.brand)}> size</span>
      <span style={codeTokenStyle(codeColor.pink)}>=</span>
      <span style={codeTokenStyle(codeColor.primary)}>{`"${sizeValue}"`}</span>
    </>
  );
  const colorAttr = (
    <>
      <span style={codeTokenStyle(codeColor.brand)}> color</span>
      <span style={codeTokenStyle(codeColor.pink)}>=</span>
      <span style={codeTokenStyle(codeColor.primary)}>{`"${colorValue}"`}</span>
    </>
  );

  const coreProps = hasDisabled ? (
    <>
      <span style={codeTokenStyle(codeColor.brand)}> isDisabled</span>
      {colorAttr}
      {sizeAttr}
    </>
  ) : (
    <>
      {sizeAttr}
      {colorAttr}
      {hrefMatch ? (
        <>
          <span style={codeTokenStyle(codeColor.brand)}> href</span>
          <span style={codeTokenStyle(codeColor.pink)}>=</span>
          <span style={codeTokenStyle(codeColor.primary)}>{`"${hrefMatch[1]}"`}</span>
        </>
      ) : null}
      {hasLoading ? <span style={codeTokenStyle(codeColor.brand)}> isLoading</span> : null}
      {hasShowTextWhileLoading ? <span style={codeTokenStyle(codeColor.brand)}> showTextWhileLoading</span> : null}
    </>
  );

  const iconBlock = iconProp ? (
    <>
      <span style={codeTokenStyle(codeColor.brand)}>{` ${iconProp}`}</span>
      <span style={codeTokenStyle(codeColor.pink)}>=</span>
      <span style={codeTokenStyle(codeColor.gray)}>{"{<"}</span>
      <span style={codeTokenStyle(codeColor.blue)}>Check</span>
      <span style={codeTokenStyle(codeColor.brand)}> data-icon</span>
      <span style={codeTokenStyle(codeColor.gray)}>{isSelfClosing ? "{ />}" : "{ />}>"}</span>
    </>
  ) : null;

  const ariaLabelBlock = ariaLabelMatch ? (
    <>
      <span style={codeTokenStyle(codeColor.brand)}> aria-label</span>
      <span style={codeTokenStyle(codeColor.pink)}>=</span>
      <span style={codeTokenStyle(codeColor.gray)}>{"{`"}</span>
      <span style={codeTokenStyle(codeColor.primary)}>{ariaLabelMatch[1]}</span>
      <span style={codeTokenStyle(codeColor.gray)}>{"`}"}</span>
    </>
  ) : null;

  if (isSelfClosing) {
    return (
      <>
        <span style={codeTokenStyle(codeColor.gray)}>&lt;</span>
        <span style={codeTokenStyle(codeColor.blue)}>Button</span>
        {coreProps}
        {iconBlock}
        {ariaLabelBlock}
        <span style={codeTokenStyle(codeColor.gray)}> /&gt;</span>
      </>
    );
  }

  return (
    <>
      <span style={codeTokenStyle(codeColor.gray)}>&lt;</span>
      <span style={codeTokenStyle(codeColor.blue)}>Button</span>
      {coreProps}
      {iconBlock ?? <span style={codeTokenStyle(codeColor.gray)}>&gt;</span>}
      <span style={codeTokenStyle(codeColor.gray)}>{textValue}</span>
      <span style={codeTokenStyle(codeColor.gray)}>&lt;/</span>
      <span style={codeTokenStyle(codeColor.blue)}>Button</span>
      <span style={codeTokenStyle(codeColor.gray)}>&gt;</span>
    </>
  );
};

/** Syntax-colored code readout for the Code tab (manual token spans, not Shiki). */
const DocsCodePre: FC<{ code: string; className?: string }> = ({ code, className = "" }) => {
  const lines = code.split("\n");
  return (
    <pre
      className={className.trim()}
      tabIndex={0}
      style={
        {
          backgroundColor: "rgb(255, 255, 255)",
          color: codeColor.gray,
          /* Em-based padding — avoids fighting Tailwind pre resets inside the code panel. */
          padding: "calc(0.25em * 5)",
        } as CSSProperties
      }
    >
      <code className="flex flex-col">
        {lines.map((line, idx) => {
          const importLine = renderImportLine(line);
          const jsxLine = renderJsxButtonLine(line);
          return (
            <span key={`${line}-${idx}`} className="line min-h-6">
              {line === "" ? <>&nbsp;</> : (importLine ?? jsxLine ?? <span style={codeTokenStyle(codeColor.gray)}>{line}</span>)}
              {"\n"}
            </span>
          );
        })}
      </code>
    </pre>
  );
};

const DarkModeToggle: FC<{ isDark: boolean; onToggle: () => void }> = ({ isDark, onToggle }) => (
  <AriaButton type="button" aria-label={isDark ? "Light mode" : "Dark mode"} onPress={onToggle} className={toolbarIconBtn}>
    {isDark ? (
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
        data-icon="true"
      >
        <path d="M12 2v2m0 16v2M4 12H2m4.314-5.686L4.9 4.9m12.786 1.414L19.1 4.9M6.314 17.69 4.9 19.104m12.786-1.414 1.414 1.414M22 12h-2m-3 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z" />
      </svg>
    ) : (
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
        data-icon="true"
      >
        <path d="M22 15.844a10.424 10.424 0 0 1-4.306.925c-5.779 0-10.463-4.684-10.463-10.462 0-1.536.33-2.994.925-4.307A10.464 10.464 0 0 0 2 11.538C2 17.316 6.684 22 12.462 22c4.243 0 7.896-2.526 9.538-6.156Z" />
      </svg>
    )}
  </AriaButton>
);

const CopyToolbarButton: FC<{ code: string }> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    void navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <AriaButton type="button" aria-label={copied ? "Copied" : "Copy"} onPress={onCopy} className={toolbarIconBtn}>
      {copied ? (
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
          data-icon="true"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      ) : (
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
          data-icon="true"
        >
          <path d="M5 15c-.932 0-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C2 13.398 2 12.932 2 12V5.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C3.52 2 4.08 2 5.2 2H12c.932 0 1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C15 3.602 15 4.068 15 5m-2.8 17h6.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C22 20.48 22 19.92 22 18.8v-6.6c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C20.48 9 19.92 9 18.8 9h-6.6c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C9 10.52 9 11.08 9 12.2v6.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C10.52 22 11.08 22 12.2 22Z" />
        </svg>
      )}
    </AriaButton>
  );
};

const DocsCodePanel: FC<{ code: string }> = ({ code }) => (
  <section className="group/pre not-typography bg-secondary_alt ring-secondary relative w-full rounded-[20px] p-2 ring-1 ring-inset">
    <div className="bg-primary ring-secondary_alt relative flex h-full max-h-[304px] min-h-[304px] w-full flex-col overflow-hidden rounded-xl shadow-lg ring-1">
      {/* Single <pre> only — nested <pre> is invalid HTML and makes the outer p-5 apply to an empty element. */}
      <DocsCodePre
        code={code}
        className="bg-primary flex h-full min-h-0 max-w-full flex-1 flex-col overflow-auto font-mono text-sm leading-[24px] font-medium"
      />
    </div>
  </section>
);

/** Plain section title (no anchor) — color via `.docs-section-title` in `apps/docs/src/styles.css`. */
const SectionTitle: FC<{ className?: string; children: ReactNode }> = ({ className = "", children }) => (
  <span className={`docs-section-title ${className}`.trim()}>{children}</span>
);

type DocsSectionProps = {
  id: string;
  title: string;
  code: string;
  description?: ReactNode;
  previewClassName?: string;
  children: ReactNode;
};

const PreviewCodeToolbar: FC<{
  code: string;
  isPreviewDark: boolean;
  onPreviewDarkToggle: () => void;
}> = ({ code, isPreviewDark, onPreviewDarkToggle }) => (
  <div className="flex w-full items-center justify-between gap-3 md:h-9 md:w-auto">
    <div className="flex">
      <DarkModeToggle isDark={isPreviewDark} onToggle={onPreviewDarkToggle} />
      <CopyToolbarButton code={code} />
    </div>
    <AriaTabList
      aria-label="Preview or code"
      className="group bg-secondary_alt ring-secondary order-first flex gap-0 rounded-lg ring-1 ring-inset md:order-last"
    >
      <AriaTab id="preview" className={({ isSelected }) => `${docTabBtnClass} ${isSelected ? docTabSelected : docTabIdle}`}>
        Preview
      </AriaTab>
      <AriaTab id="code" className={({ isSelected }) => `${docTabBtnClass} ${isSelected ? docTabSelected : docTabIdle}`}>
        Code
      </AriaTab>
    </AriaTabList>
  </div>
);

const DocsSection: FC<DocsSectionProps> = ({ id, title, code, description, previewClassName, children }) => {
  const [isPreviewDark, setIsPreviewDark] = useState(false);
  const boxClass = previewClassName ?? PREVIEW_DEMO_SURFACE_CLASS;
  const previewSurfaceClass = previewSurfaceClassName(boxClass, isPreviewDark);

  return (
    <section id={id} className="group my-8 flex w-full scroll-mt-20 flex-col gap-3 md:my-10">
      <AriaTabs defaultSelectedKey="preview" className="not-typography flex flex-col gap-3">
        <header className="flex w-full flex-col justify-between gap-3 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <h3 className="text-md text-primary font-semibold">
              <SectionTitle>{title}</SectionTitle>
            </h3>
          </div>
          <PreviewCodeToolbar code={code} isPreviewDark={isPreviewDark} onPreviewDarkToggle={() => setIsPreviewDark((d) => !d)} />
        </header>
        {description ? <div className="typography text-md text-tertiary max-w-3xl space-y-3">{description}</div> : null}
        <AriaTabPanel id="preview" className="outline-none focus:outline-none">
          <div className={previewSurfaceClass}>{children}</div>
        </AriaTabPanel>
        <AriaTabPanel id="code" className="outline-none focus:outline-none">
          <DocsCodePanel code={code} />
        </AriaTabPanel>
      </AriaTabs>
    </section>
  );
};

const BreadcrumbChevron: FC = () => (
  <div className="text-fg-quaternary shrink-0">
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" aria-hidden="true" className="size-4">
      <path d="m9 18 6-6-6-6" />
    </svg>
  </div>
);

const ButtonsPageHeader: FC = () => (
  <>
    <div className="bg-primary border-secondary fixed inset-x-0 top-0 z-30 w-full border-b">
      <div className="mx-auto flex size-full flex-1 items-center py-3 pr-3 pl-4 md:py-3 lg:px-5 lg:py-2.5">
        <nav aria-label="Breadcrumbs" className="min-w-0 max-lg:hidden">
          <ol aria-label="Breadcrumbs" className="relative flex gap-0.5 lg:gap-1">
            <li className="flex items-center gap-0.5 lg:gap-1">
              <a className="group outline-focus-ring hover:bg-primary_hover inline-flex cursor-pointer items-center justify-center gap-1 rounded-md p-1 transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 lg:p-1.5">
                <span className="text-quaternary group-hover:text-tertiary_hover px-1 text-sm font-semibold whitespace-nowrap">Base components</span>
              </a>
              <BreadcrumbChevron />
            </li>
            <li className="flex items-center gap-0.5 lg:gap-1">
              <a className="group outline-focus-ring hover:bg-primary_hover inline-flex cursor-pointer items-center justify-center gap-1 rounded-md p-1 transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 lg:p-1.5">
                <span className="text-quaternary group-hover:text-tertiary_hover px-1 text-sm font-semibold whitespace-nowrap">Components</span>
              </a>
              <BreadcrumbChevron />
            </li>
            <li className="flex items-center gap-0.5 lg:gap-1">
              <button type="button" className="bg-primary_hover cursor-default rounded-md p-1 lg:p-1.5">
                <span className="text-fg-tertiary_hover px-1 text-sm font-semibold whitespace-nowrap">Buttons</span>
              </button>
            </li>
          </ol>
        </nav>
        {/* Header has no theme toggle — each preview panel’s moon icon scopes `dark-mode` to that rounded surface only. */}
      </div>
    </div>
    {/* Fixed header is out of flow; reserve its height + spacing below (matches previous sticky mb-10 / md:mb-12). */}
    <div className="mb-10 h-14 shrink-0 md:mb-12" aria-hidden="true" />
  </>
);

const StorybookRootHeaderPortal: FC<{ children: ReactNode }> = ({ children }) => {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const storybookDocs = document.getElementById("storybook-docs");
    const storybookRoot = document.getElementById("storybook-root");
    const portalNode = document.createElement("div");
    portalNode.setAttribute("data-docs-sticky-header", "true");

    if (storybookDocs?.parentElement) {
      storybookDocs.insertAdjacentElement("beforebegin", portalNode);
    } else if (storybookRoot?.parentElement) {
      storybookRoot.insertAdjacentElement("afterend", portalNode);
    } else {
      document.body.prepend(portalNode);
    }

    setMountNode(portalNode);

    return () => {
      portalNode.remove();
    };
  }, []);

  if (!mountNode) return null;
  return createPortal(children, mountNode);
};

/** Mount TOC after Storybook’s `.sbdocs-wrapper` (sibling in DOM), not inside the page `main`. */
const StorybookSbdocsTocPortal: FC<{ children: ReactNode }> = ({ children }) => {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const layoutClass = "docs-sbdocs-with-toc-layout";
    let portalHost: HTMLDivElement | null = null;
    let layoutParent: HTMLElement | null = null;
    let intervalId: ReturnType<typeof setInterval> | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const cleanup = () => {
      if (intervalId !== undefined) clearInterval(intervalId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      portalHost?.remove();
      portalHost = null;
      layoutParent?.classList.remove(layoutClass);
      layoutParent = null;
      setMountNode(null);
    };

    const attach = (): boolean => {
      if (portalHost) return true;
      const wrapper = document.querySelector<HTMLElement>("#storybook-docs .sbdocs-wrapper") ?? document.querySelector<HTMLElement>(".sbdocs-wrapper");
      if (!wrapper?.parentElement) return false;

      portalHost = document.createElement("div");
      portalHost.setAttribute("data-docs-on-this-page", "true");
      portalHost.className = "docs-on-this-page-host";
      wrapper.insertAdjacentElement("afterend", portalHost);
      layoutParent = wrapper.parentElement;
      layoutParent.classList.add(layoutClass);
      setMountNode(portalHost);
      if (intervalId !== undefined) {
        clearInterval(intervalId);
        intervalId = undefined;
      }
      return true;
    };

    if (attach()) {
      return cleanup;
    }

    intervalId = setInterval(() => {
      attach();
    }, 50);

    timeoutId = setTimeout(() => {
      if (intervalId !== undefined) clearInterval(intervalId);
    }, 5000);

    return cleanup;
  }, []);

  if (!mountNode) return null;
  return createPortal(children, mountNode);
};

const BUTTON_DOCS_TOC = [
  { id: "button-example", label: "Button example" },
  { id: "primary-buttons", label: "Primary buttons" },
  { id: "secondary-buttons", label: "Secondary buttons" },
  { id: "tertiary-buttons", label: "Tertiary buttons" },
  { id: "link-color-buttons", label: "Link color buttons" },
  { id: "link-gray-buttons", label: "Link gray buttons" },
  { id: "link-destructive-buttons", label: "Link destructive buttons" },
  { id: "icon-leading-buttons", label: "Icon leading buttons" },
  { id: "icon-trailing-buttons", label: "Icon trailing buttons" },
  { id: "icon-only-buttons", label: "Icon only buttons" },
  { id: "loading-buttons", label: "Loading buttons" },
  { id: "disabled-buttons", label: "Disabled buttons" },
  { id: "primary-buttons-destructive", label: "Primary buttons destructive" },
  { id: "secondary-buttons-destructive", label: "Secondary buttons destructive" },
  { id: "tertiary-buttons-destructive", label: "Tertiary buttons destructive" },
] as const;

const OnThisPageNav: FC<{ items: readonly { readonly id: string; readonly label: string }[] }> = ({ items }) => {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const trackRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [indicator, setIndicator] = useState({ top: 0, height: 0 });

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = visible[0]?.target.id;
        if (id) setActiveId(id);
      },
      { root: null, rootMargin: "-10% 0px -50% 0px", threshold: [0, 0.1, 0.25, 0.5, 1] }
    );
    for (const { id } of items) {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, [items]);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const link = linkRefs.current.get(activeId);
    if (!track || !link) return;
    const trackRect = track.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    setIndicator({ top: linkRect.top - trackRect.top, height: linkRect.height });
  }, [activeId]);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  };

  return (
    <nav aria-label="On this page" className="w-54 pb-10 text-sm">
      <div className="lg:max-w-auto flex max-h-[calc(100vh-calc(var(--spacing)*19))] flex-col pb-8">
        <div className="flex items-center gap-1.5">
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
            className="text-fg-quaternary size-4"
          >
            <path d="M3 12h18M3 6h18M3 18h12" />
          </svg>
          <p className="text-primary text-xs font-semibold">On this page</p>
        </div>
        <div className="relative min-h-40 overflow-auto">
          <div className="sticky inset-x-0 top-0 z-1 h-0 max-h-0">
            <div
              className="from-bg-primary pointer-events-none z-1 h-6 w-full bg-linear-to-b to-transparent opacity-0 transition-opacity duration-100 ease-linear"
              aria-hidden
            />
          </div>
          <div ref={trackRef} className="relative flex overflow-auto pt-4 pb-8">
            <div className="bg-border-secondary w-0.5 shrink-0" aria-hidden />
            <div
              className="bg-fg-brand-primary_alt absolute left-0 w-0.5 transition-all duration-150 ease-linear"
              style={{
                top: indicator.top,
                height: indicator.height,
                opacity: indicator.height > 0 ? 1 : 0,
              }}
              aria-hidden
            />
            <ul className="relative flex h-full flex-col gap-2 pl-3">
              {items.map(({ id, label }) => (
                <li key={id} className="flex">
                  <a
                    ref={(el) => {
                      if (el) linkRefs.current.set(id, el);
                      else linkRefs.current.delete(id);
                    }}
                    href={`#${id}`}
                    data-id={id}
                    className={`outline-focus-ring rounded-xs text-sm font-semibold transition-colors duration-150 ease-linear focus:outline-2 focus:outline-offset-2 ${
                      activeId === id ? "text-brand-secondary" : "text-quaternary hover:text-tertiary_hover"
                    }`}
                    onClick={(e) => {
                      /* Storybook docs router remounts on hash navigation — scroll in-page only. */
                      e.preventDefault();
                      scrollToSection(id);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        scrollToSection(id);
                      }
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="sticky inset-x-0 bottom-0 z-1 flex h-0 max-h-0 items-end">
            <div className="from-bg-primary pointer-events-none z-1 h-8 w-full bg-linear-to-t to-transparent" aria-hidden />
          </div>
        </div>
      </div>
    </nav>
  );
};

const ButtonDocsPage: FC = () => {
  const [isHeroPreviewDark, setIsHeroPreviewDark] = useState(false);

  const heroPreviewSurfaceClass = previewSurfaceClassName(PREVIEW_DEMO_SURFACE_CLASS, isHeroPreviewDark);

  return (
    <div className="bg-primary min-h-screen font-sans">
      <StorybookRootHeaderPortal>
        <ButtonsPageHeader />
      </StorybookRootHeaderPortal>
      <StorybookSbdocsTocPortal>
        <OnThisPageNav items={BUTTON_DOCS_TOC} />
      </StorybookSbdocsTocPortal>
      <main className="relative mx-auto flex w-full max-w-304 min-w-0 flex-1 flex-col">
        <div className="text-tertiary w-full min-w-0">
          <div className="mb-10">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-primary md:text-display-xs max-w-3xl text-xl font-semibold">Button components</h1>
            </div>

            <p className="text-md text-tertiary mt-0 max-w-3xl whitespace-pre-line">
              React button components for modern applications and websites, built with React Aria Components and styled with Tailwind CSS — provided as{" "}
              <code className={DOC_CODE_CLASS}>@opus2-platform/codex</code>.
            </p>
          </div>

          <section id="button-example" className="group not-typography my-8 flex w-full scroll-mt-20 flex-col gap-3">
            <AriaTabs defaultSelectedKey="preview" className="not-typography flex flex-col gap-3">
              <header className="flex w-full flex-col justify-between gap-3 md:flex-row md:items-center">
                <div className="flex items-center gap-3">
                  <h3 className="text-md text-primary font-semibold">
                    <SectionTitle>Button example</SectionTitle>
                  </h3>
                </div>
                <PreviewCodeToolbar
                  code={BUTTON_DOCS_CODE.hero}
                  isPreviewDark={isHeroPreviewDark}
                  onPreviewDarkToggle={() => setIsHeroPreviewDark((d) => !d)}
                />
              </header>

              <AriaTabPanel id="preview" className="outline-none focus:outline-none">
                <div className={heroPreviewSurfaceClass}>
                  <div className="flex flex-col items-start gap-3 md:flex-row">
                    <Button size="md" color="primary-destructive">
                      Delete project
                    </Button>
                    <Button size="md" color="secondary">
                      Stage for publish
                    </Button>
                    <Button size="md" color="primary" iconLeading={<Check data-icon />}>
                      Publish now
                    </Button>
                  </div>
                </div>
              </AriaTabPanel>
              <AriaTabPanel id="code" className="outline-none focus:outline-none">
                <DocsCodePanel code={BUTTON_DOCS_CODE.hero} />
              </AriaTabPanel>
            </AriaTabs>
          </section>

          <DocsSection id="primary-buttons" title="Primary buttons" code={BUTTON_DOCS_CODE.primary}>
            <div className="flex flex-wrap items-center gap-3">
              {sizes.map((size) => (
                <Button key={size} size={size} color="primary">
                  Button {size}
                </Button>
              ))}
            </div>
          </DocsSection>

          <DocsSection id="secondary-buttons" title="Secondary buttons" code={BUTTON_DOCS_CODE.secondary}>
            <div className="flex flex-wrap items-center gap-3">
              {sizes.map((size) => (
                <Button key={size} size={size} color="secondary">
                  Button {size}
                </Button>
              ))}
            </div>
          </DocsSection>

          <DocsSection id="tertiary-buttons" title="Tertiary buttons" code={BUTTON_DOCS_CODE.tertiary}>
            <div className="flex flex-wrap items-center gap-3">
              {sizes.map((size) => (
                <Button key={size} size={size} color="tertiary">
                  Button {size}
                </Button>
              ))}
            </div>
          </DocsSection>

          <DocsSection
            id="link-color-buttons"
            title="Link color buttons"
            code={BUTTON_DOCS_CODE.linkColor}
            description={
              <p>
                We designed our buttons to be hybrid: they can function as either a link or a standard button. Pass an{" "}
                <code className={DOC_CODE_CLASS}>href</code> prop to render an anchor while keeping the same sizes, colors, and icons; when{" "}
                <code className={DOC_CODE_CLASS}>href</code> is set, standard anchor attributes apply.
              </p>
            }
          >
            <div className="flex flex-wrap items-center gap-3">
              {sizes.map((size) => (
                <Button key={`brand-${size}`} size={size} color="link-color" href={LINK_HREF_EXAMPLE}>
                  Button {size}
                </Button>
              ))}
            </div>
          </DocsSection>

          <DocsSection
            id="link-gray-buttons"
            title="Link gray buttons"
            code={BUTTON_DOCS_CODE.linkGray}
            description={<p>Link gray uses neutral text for secondary or de-emphasized inline actions.</p>}
          >
            <div className="flex flex-wrap items-center gap-3">
              {sizes.map((size) => (
                <Button key={size} size={size} color="link-gray" href={LINK_HREF_EXAMPLE}>
                  Button {size}
                </Button>
              ))}
            </div>
          </DocsSection>

          <DocsSection
            id="link-destructive-buttons"
            title="Link destructive buttons"
            code={BUTTON_DOCS_CODE.linkDestructive}
            description={<p>Link destructive uses error-colored text for dangerous inline actions, such as removing an item.</p>}
          >
            <div className="flex flex-wrap items-center gap-3">
              {sizes.map((size) => (
                <Button key={size} size={size} color="link-destructive" href={LINK_HREF_EXAMPLE}>
                  Button {size}
                </Button>
              ))}
            </div>
          </DocsSection>

          <DocsSection
            id="icon-leading-buttons"
            title="Icon leading buttons"
            code={BUTTON_DOCS_CODE.iconLeading}
            description={
              <>
                <p>
                  Use <code className={DOC_CODE_CLASS}>iconLeading</code> and <code className={DOC_CODE_CLASS}>iconTrailing</code> to add icons. Pass a
                  component that accepts <code className={DOC_CODE_CLASS}>className</code>, or a JSX element with a{" "}
                  <code className={DOC_CODE_CLASS}>data-icon</code> attribute.
                </p>
                <p>
                  When you pass a JSX element instead of a component reference, include <code className={DOC_CODE_CLASS}>data-icon</code> so Codex can apply the
                  correct icon sizing and color.
                </p>
              </>
            }
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                {sizes.map((size) => (
                  <Button key={`primary-${size}`} size={size} color="primary" iconLeading={ArrowRightIcon}>
                    Button {size}
                  </Button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {sizes.map((size) => (
                  <Button key={`secondary-${size}`} size={size} color="secondary" iconLeading={ArrowRightIcon}>
                    Button {size}
                  </Button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {sizes.map((size) => (
                  <Button key={`tertiary-${size}`} size={size} color="tertiary" iconLeading={ArrowRightIcon}>
                    Button {size}
                  </Button>
                ))}
              </div>
            </div>
          </DocsSection>

          <DocsSection
            id="icon-trailing-buttons"
            title="Icon trailing buttons"
            code={BUTTON_DOCS_CODE.iconTrailing}
            description={
              <p>
                Same as <code className={DOC_CODE_CLASS}>iconLeading</code>, but use <code className={DOC_CODE_CLASS}>iconTrailing</code> for an icon after the
                label.
              </p>
            }
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                {sizes.map((size) => (
                  <Button key={`primary-${size}`} size={size} color="primary" iconTrailing={ArrowRightIcon}>
                    Button {size}
                  </Button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {sizes.map((size) => (
                  <Button key={`secondary-${size}`} size={size} color="secondary" iconTrailing={ArrowRightIcon}>
                    Button {size}
                  </Button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {sizes.map((size) => (
                  <Button key={`tertiary-${size}`} size={size} color="tertiary" iconTrailing={ArrowRightIcon}>
                    Button {size}
                  </Button>
                ))}
              </div>
            </div>
          </DocsSection>

          <DocsSection
            id="icon-only-buttons"
            title="Icon only buttons"
            code={BUTTON_DOCS_CODE.iconOnly}
            description={
              <>
                <p>
                  Omit children and pass an icon to <code className={DOC_CODE_CLASS}>iconLeading</code> or <code className={DOC_CODE_CLASS}>iconTrailing</code>.
                </p>
                <p>
                  Use an <code className={DOC_CODE_CLASS}>aria-label</code> for icon-only buttons so assistive technologies get a clear name.
                </p>
              </>
            }
          >
            <div className="flex flex-wrap items-center gap-3">
              {sizes.map((size) => (
                <Button key={size} size={size} color="primary" iconLeading={ArrowRightIcon} aria-label={`Button ${size}`} />
              ))}
            </div>
          </DocsSection>

          <DocsSection
            id="loading-buttons"
            title="Loading buttons"
            code={BUTTON_DOCS_CODE.loading}
            description={
              <p>
                The <code className={DOC_CODE_CLASS}>isLoading</code> prop shows a spinner and blocks interaction. Use{" "}
                <code className={DOC_CODE_CLASS}>showTextWhileLoading</code> to keep the label visible. The spinner follows the active size and color variant.
              </p>
            }
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                {sizes.map((size) => (
                  <Button key={`primary-${size}`} size={size} color="primary" isLoading>
                    Button {size}
                  </Button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {sizes.map((size) => (
                  <Button key={`secondary-${size}`} size={size} color="secondary" isLoading showTextWhileLoading>
                    Button {size}
                  </Button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {sizes.map((size) => (
                  <Button key={`tertiary-${size}`} size={size} color="tertiary" isLoading showTextWhileLoading>
                    Button {size}
                  </Button>
                ))}
              </div>
            </div>
          </DocsSection>

          <DocsSection
            id="disabled-buttons"
            title="Disabled buttons"
            code={BUTTON_DOCS_CODE.disabled}
            description={
              <p>
                The <code className={DOC_CODE_CLASS}>isDisabled</code> prop applies disabled styles, uses a not-allowed cursor, and prevents actions and
                navigation. Styling is consistent across variants and sizes.
              </p>
            }
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                {sizes.map((size) => (
                  <Button key={`primary-${size}`} isDisabled color="primary" size={size}>
                    Button {size}
                  </Button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {sizes.map((size) => (
                  <Button key={`secondary-${size}`} isDisabled color="secondary" size={size}>
                    Button {size}
                  </Button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {sizes.map((size) => (
                  <Button key={`tertiary-${size}`} isDisabled color="tertiary" size={size}>
                    Button {size}
                  </Button>
                ))}
              </div>
            </div>
          </DocsSection>

          <DocsSection
            id="primary-buttons-destructive"
            title="Primary buttons destructive"
            code={BUTTON_DOCS_CODE.primaryDestructive}
            description={
              <p>
                Codex exposes <code className={DOC_CODE_CLASS}>primary-destructive</code>, <code className={DOC_CODE_CLASS}>secondary-destructive</code>, and{" "}
                <code className={DOC_CODE_CLASS}>tertiary-destructive</code>. They mirror non-destructive behavior with warning colors and support icons,
                loading, and disabled states.
              </p>
            }
          >
            <div className="flex flex-wrap items-center gap-3">
              {sizes.map((size) => (
                <Button key={size} size={size} color="primary-destructive">
                  Button {size}
                </Button>
              ))}
            </div>
          </DocsSection>

          <DocsSection id="secondary-buttons-destructive" title="Secondary buttons destructive" code={BUTTON_DOCS_CODE.secondaryDestructive}>
            <div className="flex flex-wrap items-center gap-3">
              {sizes.map((size) => (
                <Button key={size} size={size} color="secondary-destructive">
                  Button {size}
                </Button>
              ))}
            </div>
          </DocsSection>

          <DocsSection id="tertiary-buttons-destructive" title="Tertiary buttons destructive" code={BUTTON_DOCS_CODE.tertiaryDestructive}>
            <div className="flex flex-wrap items-center gap-3">
              {sizes.map((size) => (
                <Button key={size} size={size} color="tertiary-destructive">
                  Button {size}
                </Button>
              ))}
            </div>
          </DocsSection>
        </div>
      </main>
    </div>
  );
};

const meta = {
  title: "Button",
  component: Button,
  // Storybook 10 only registers a docs page when `autodocs` is present; `docs.page` replaces the autodocs template.
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: ButtonDocsPage,
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Same sidebar shape as Overview: one row labeled “Button”, custom content on the Docs tab. */
export const Default: Story = {
  name: "Button",
};
