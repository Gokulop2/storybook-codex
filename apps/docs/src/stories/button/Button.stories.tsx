import type { ComponentProps, CSSProperties, FC, ReactNode } from "react";
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@opus2-platform/codex";
import { Check } from "@opus2-platform/icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button as AriaButton, Tab as AriaTab, TabList as AriaTabList, TabPanel as AriaTabPanel, Tabs as AriaTabs } from "react-aria-components";
import { DOCS_PREVIEW_HERO_SURFACE_CLASS, DOCS_PREVIEW_P_MARGIN_RESET, DOCS_PREVIEW_SURFACE_CLASS } from "../_docs/untitled-docs-preview-code";

type ButtonSize = "sm" | "md" | "lg" | "xl";
const sizes: ButtonSize[] = ["sm", "md", "lg", "xl"];

/** Solid + outline accent variants used in icon / loading / disabled demos. */
const ACCENT_VARIANT_COLORS = ["primary", "secondary", "tertiary"] as const;

/** Loading rows: shared by docs code string + live preview (stay in sync). */
const LOADING_DEMO_ROWS = [
  { color: "primary" as const, showTextWhileLoading: false },
  { color: "secondary" as const, showTextWhileLoading: true },
  { color: "tertiary" as const, showTextWhileLoading: true },
] as const;

const PREVIEW_BUTTON_ROW = "flex flex-wrap items-center gap-3";
const PREVIEW_BUTTON_STACK = "flex flex-col gap-4";

type ButtonColor = NonNullable<ComponentProps<typeof Button>["color"]>;

/** Icon-only toolbar controls — aligned with Untitled UI docs header actions (react-aria `Button`). */
const toolbarIconBtn =
  "group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-fg-quaternary hover:bg-primary_hover hover:text-fg-quaternary_hover *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-4";

const docTabBtnClass =
  "z-10 flex h-max cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold transition duration-100 ease-linear outline-focus-ring";

const docTabSelected = "bg-primary_alt text-secondary shadow-xs ring-1 ring-primary ring-inset";
const docTabIdle = "text-quaternary";

function previewSurfaceClassName(base: string, isPreviewDark: boolean): string {
  return [base, DOCS_PREVIEW_P_MARGIN_RESET, isPreviewDark && "dark-mode"].filter(Boolean).join(" ");
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

/** Code string: one text `<Button>` per size for docs snippets. */
function buttonDocsTextRows(color: string, href?: string): string {
  const hrefAttr = href != null ? ` href="${href}"` : "";
  return sizes.map((s) => `<Button size="${s}" color="${color}"${hrefAttr}>Button ${s}</Button>`).join("\n");
}

function buttonDocsWithImport(rows: string): string {
  return `${CODE_IMPORT}${rows}`;
}

function buttonDocsIconOnlyRows(color: string): string {
  return sizes
    .map((s) => `<Button size="${s}" color="${color}" iconLeading={${ICON_SAMPLE}} aria-label={\`Button ${s}\`} />`)
    .join("\n");
}

function buttonDocsIconStackCode(iconProp: "iconLeading" | "iconTrailing"): string {
  const blocks = ACCENT_VARIANT_COLORS.map((color) => {
    const lines = sizes
      .map((s) => `<Button size="${s}" color="${color}" ${iconProp}={${ICON_SAMPLE}}>Button ${s}</Button>`)
      .join("\n    ");
    return `  <div className="flex flex-wrap gap-3">\n    ${lines}\n  </div>`;
  });
  return `${CODE_IMPORT_WITH_ICON}<>\n${blocks.join("\n")}\n</>`;
}

function buttonDocsLoadingCode(): string {
  const blocks = LOADING_DEMO_ROWS.map(({ color, showTextWhileLoading }) => {
    const extra = showTextWhileLoading ? " showTextWhileLoading" : "";
    return sizes.map((s) => `<Button size="${s}" color="${color}" isLoading${extra}>Button ${s}</Button>`).join("\n");
  });
  return `${CODE_IMPORT}\n${blocks.join("\n\n")}`;
}

function buttonDocsDisabledCode(): string {
  const blocks = ACCENT_VARIANT_COLORS.map((c) =>
    sizes.map((s) => `<Button isDisabled color="${c}" size="${s}">Button ${s}</Button>`).join("\n")
  );
  return `${CODE_IMPORT}\n${blocks.join("\n\n")}`;
}

const BUTTON_DOCS_CODE = {
  hero: `import { Check } from "@opus2-platform/icons";
import { Button } from "@opus2-platform/codex";

<Button size="md" color="primary-destructive">Delete project</Button>
<Button size="md" color="secondary">Stage for publish</Button>
<Button size="md" color="primary" iconLeading={<Check data-icon />}>Publish now</Button>`,
  primary: buttonDocsWithImport(buttonDocsTextRows("primary")),
  secondary: buttonDocsWithImport(buttonDocsTextRows("secondary")),
  tertiary: buttonDocsWithImport(buttonDocsTextRows("tertiary")),
  linkColor: buttonDocsWithImport(buttonDocsTextRows("link-color", LINK_HREF_EXAMPLE)),
  linkGray: buttonDocsWithImport(buttonDocsTextRows("link-gray", LINK_HREF_EXAMPLE)),
  linkDestructive: buttonDocsWithImport(buttonDocsTextRows("link-destructive", LINK_HREF_EXAMPLE)),
  iconLeading: buttonDocsIconStackCode("iconLeading"),
  iconTrailing: buttonDocsIconStackCode("iconTrailing"),
  iconOnly: `${CODE_IMPORT_WITH_ICON}${buttonDocsIconOnlyRows("primary")}`,
  loading: buttonDocsLoadingCode(),
  disabled: buttonDocsDisabledCode(),
  primaryDestructive: buttonDocsWithImport(buttonDocsTextRows("primary-destructive")),
  secondaryDestructive: buttonDocsWithImport(buttonDocsTextRows("secondary-destructive")),
  tertiaryDestructive: buttonDocsWithImport(buttonDocsTextRows("tertiary-destructive")),
} as const;

type ButtonDocsCodeKey = keyof typeof BUTTON_DOCS_CODE;

const HERO_DOCS_SECTION_CLASS = "group not-typography my-8 flex w-full scroll-mt-20 flex-col gap-3";

const DESC_LINK_COLOR = (
  <p>
    We designed our buttons to be hybrid: they can function as either a link or a standard button. Pass an{" "}
    <code className={DOC_CODE_CLASS}>href</code> prop to render an anchor while keeping the same sizes, colors, and icons; when{" "}
    <code className={DOC_CODE_CLASS}>href</code> is set, standard anchor attributes apply.
  </p>
);

const DESC_LINK_GRAY = <p>Link gray uses neutral text for secondary or de-emphasized inline actions.</p>;
const DESC_LINK_DESTRUCTIVE = <p>Link destructive uses error-colored text for dangerous inline actions, such as removing an item.</p>;

const DESC_ICON_LEADING = (
  <>
    <p>
      Use <code className={DOC_CODE_CLASS}>iconLeading</code> and <code className={DOC_CODE_CLASS}>iconTrailing</code> to add icons. Pass a component that
      accepts <code className={DOC_CODE_CLASS}>className</code>, or a JSX element with a <code className={DOC_CODE_CLASS}>data-icon</code> attribute.
    </p>
    <p>
      When you pass a JSX element instead of a component reference, include <code className={DOC_CODE_CLASS}>data-icon</code> so Codex can apply the correct
      icon sizing and color.
    </p>
  </>
);

const DESC_ICON_TRAILING = (
  <p>
    Same as <code className={DOC_CODE_CLASS}>iconLeading</code>, but use <code className={DOC_CODE_CLASS}>iconTrailing</code> for an icon after the label.
  </p>
);

const DESC_ICON_ONLY = (
  <>
    <p>
      Omit children and pass an icon to <code className={DOC_CODE_CLASS}>iconLeading</code> or <code className={DOC_CODE_CLASS}>iconTrailing</code>.
    </p>
    <p>
      Use an <code className={DOC_CODE_CLASS}>aria-label</code> for icon-only buttons so assistive technologies get a clear name.
    </p>
  </>
);

const DESC_LOADING = (
  <p>
    The <code className={DOC_CODE_CLASS}>isLoading</code> prop shows a spinner and blocks interaction. Use{" "}
    <code className={DOC_CODE_CLASS}>showTextWhileLoading</code> to keep the label visible. The spinner follows the active size and color variant.
  </p>
);

const DESC_DISABLED = (
  <p>
    The <code className={DOC_CODE_CLASS}>isDisabled</code> prop applies disabled styles, uses a not-allowed cursor, and prevents actions and navigation. Styling
    is consistent across variants and sizes.
  </p>
);

const DESC_PRIMARY_DESTRUCTIVE = (
  <p>
    Codex exposes <code className={DOC_CODE_CLASS}>primary-destructive</code>, <code className={DOC_CODE_CLASS}>secondary-destructive</code>, and{" "}
    <code className={DOC_CODE_CLASS}>tertiary-destructive</code>. They mirror non-destructive behavior with warning colors and support icons, loading, and
    disabled states.
  </p>
);

type ButtonDocSectionDef =
  | { kind: "hero"; id: string; title: string; sectionClassName: string }
  | { kind: "textRow"; id: string; title: string; color: ButtonColor; codeKey: ButtonDocsCodeKey; description?: ReactNode }
  | { kind: "linkRow"; id: string; title: string; color: ButtonColor; codeKey: ButtonDocsCodeKey; description: ReactNode }
  | { kind: "iconLeading"; id: string; title: string; description: ReactNode }
  | { kind: "iconTrailing"; id: string; title: string; description: ReactNode }
  | { kind: "iconOnly"; id: string; title: string; description: ReactNode }
  | { kind: "loading"; id: string; title: string; description: ReactNode }
  | { kind: "disabled"; id: string; title: string; description: ReactNode };

/** Single source of truth: section order, TOC labels, and which preview to mount. */
const BUTTON_DOC_SECTIONS: readonly ButtonDocSectionDef[] = [
  { kind: "hero", id: "button-example", title: "Button example", sectionClassName: HERO_DOCS_SECTION_CLASS },
  { kind: "textRow", id: "primary-buttons", title: "Primary buttons", color: "primary", codeKey: "primary" },
  { kind: "textRow", id: "secondary-buttons", title: "Secondary buttons", color: "secondary", codeKey: "secondary" },
  { kind: "textRow", id: "tertiary-buttons", title: "Tertiary buttons", color: "tertiary", codeKey: "tertiary" },
  {
    kind: "linkRow",
    id: "link-color-buttons",
    title: "Link color buttons",
    color: "link-color",
    codeKey: "linkColor",
    description: DESC_LINK_COLOR,
  },
  { kind: "linkRow", id: "link-gray-buttons", title: "Link gray buttons", color: "link-gray", codeKey: "linkGray", description: DESC_LINK_GRAY },
  {
    kind: "linkRow",
    id: "link-destructive-buttons",
    title: "Link destructive buttons",
    color: "link-destructive",
    codeKey: "linkDestructive",
    description: DESC_LINK_DESTRUCTIVE,
  },
  { kind: "iconLeading", id: "icon-leading-buttons", title: "Icon leading buttons", description: DESC_ICON_LEADING },
  { kind: "iconTrailing", id: "icon-trailing-buttons", title: "Icon trailing buttons", description: DESC_ICON_TRAILING },
  { kind: "iconOnly", id: "icon-only-buttons", title: "Icon only buttons", description: DESC_ICON_ONLY },
  { kind: "loading", id: "loading-buttons", title: "Loading buttons", description: DESC_LOADING },
  { kind: "disabled", id: "disabled-buttons", title: "Disabled buttons", description: DESC_DISABLED },
  {
    kind: "textRow",
    id: "primary-buttons-destructive",
    title: "Primary buttons destructive",
    color: "primary-destructive",
    codeKey: "primaryDestructive",
    description: DESC_PRIMARY_DESTRUCTIVE,
  },
  { kind: "textRow", id: "secondary-buttons-destructive", title: "Secondary buttons destructive", color: "secondary-destructive", codeKey: "secondaryDestructive" },
  { kind: "textRow", id: "tertiary-buttons-destructive", title: "Tertiary buttons destructive", color: "tertiary-destructive", codeKey: "tertiaryDestructive" },
];

const BUTTON_DOCS_TOC = BUTTON_DOC_SECTIONS.map((s) => ({ id: s.id, label: s.title }));

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
  /** Override outer `<section>` classes (default includes `md:my-10`). */
  sectionClassName?: string;
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

const DEFAULT_DOCS_SECTION_CLASS = "group my-8 flex w-full scroll-mt-20 flex-col gap-3 md:my-10";

const DocsSection: FC<DocsSectionProps> = ({ id, title, code, description, previewClassName, sectionClassName, children }) => {
  const [isPreviewDark, setIsPreviewDark] = useState(false);
  const boxClass = previewClassName ?? DOCS_PREVIEW_SURFACE_CLASS;
  const previewSurfaceClass = previewSurfaceClassName(boxClass, isPreviewDark);

  return (
    <section id={id} className={sectionClassName ?? DEFAULT_DOCS_SECTION_CLASS}>
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

function PreviewTextButtons({ color }: { color: ButtonColor }) {
  return (
    <div className={PREVIEW_BUTTON_ROW}>
      {sizes.map((size) => (
        <Button key={size} size={size} color={color}>
          Button {size}
        </Button>
      ))}
    </div>
  );
}

function PreviewLinkButtons({ color }: { color: ButtonColor }) {
  return (
    <div className={PREVIEW_BUTTON_ROW}>
      {sizes.map((size) => (
        <Button key={size} size={size} color={color} href={LINK_HREF_EXAMPLE}>
          Button {size}
        </Button>
      ))}
    </div>
  );
}

function PreviewIconVariantRows({
  icon: Icon,
  iconProp,
}: {
  icon: FC<{ className?: string }>;
  iconProp: "iconLeading" | "iconTrailing";
}) {
  const iconProps = iconProp === "iconLeading" ? { iconLeading: Icon } : { iconTrailing: Icon };
  return (
    <div className={PREVIEW_BUTTON_STACK}>
      {ACCENT_VARIANT_COLORS.map((color) => (
        <div key={color} className={PREVIEW_BUTTON_ROW}>
          {sizes.map((size) => (
            <Button key={`${color}-${size}`} size={size} color={color} {...iconProps}>
              Button {size}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
}

function PreviewLoadingButtons() {
  return (
    <div className={PREVIEW_BUTTON_STACK}>
      {LOADING_DEMO_ROWS.map(({ color, showTextWhileLoading }) => (
        <div key={color} className={PREVIEW_BUTTON_ROW}>
          {sizes.map((size) => (
            <Button
              key={`${color}-${size}`}
              size={size}
              color={color}
              isLoading
              {...(showTextWhileLoading ? { showTextWhileLoading: true } : {})}
            >
              Button {size}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
}

function PreviewDisabledButtons() {
  return (
    <div className={PREVIEW_BUTTON_STACK}>
      {ACCENT_VARIANT_COLORS.map((color) => (
        <div key={color} className={PREVIEW_BUTTON_ROW}>
          {sizes.map((size) => (
            <Button key={`${color}-${size}`} isDisabled color={color} size={size}>
              Button {size}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
}

function PreviewIconOnlyButtons({ color, icon: Icon }: { color: ButtonColor; icon: FC<{ className?: string }> }) {
  return (
    <div className={PREVIEW_BUTTON_ROW}>
      {sizes.map((size) => (
        <Button key={size} size={size} color={color} iconLeading={Icon} aria-label={`Button ${size}`} />
      ))}
    </div>
  );
}

function renderButtonDocSection(def: ButtonDocSectionDef): ReactNode {
  switch (def.kind) {
    case "hero":
      return (
        <DocsSection
          id={def.id}
          title={def.title}
          code={BUTTON_DOCS_CODE.hero}
          sectionClassName={def.sectionClassName}
          previewClassName={DOCS_PREVIEW_HERO_SURFACE_CLASS}
        >
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
        </DocsSection>
      );
    case "textRow":
      return (
        <DocsSection id={def.id} title={def.title} code={BUTTON_DOCS_CODE[def.codeKey]} description={def.description}>
          <PreviewTextButtons color={def.color} />
        </DocsSection>
      );
    case "linkRow":
      return (
        <DocsSection id={def.id} title={def.title} code={BUTTON_DOCS_CODE[def.codeKey]} description={def.description}>
          <PreviewLinkButtons color={def.color} />
        </DocsSection>
      );
    case "iconLeading":
      return (
        <DocsSection id={def.id} title={def.title} code={BUTTON_DOCS_CODE.iconLeading} description={def.description}>
          <PreviewIconVariantRows icon={ArrowRightIcon} iconProp="iconLeading" />
        </DocsSection>
      );
    case "iconTrailing":
      return (
        <DocsSection id={def.id} title={def.title} code={BUTTON_DOCS_CODE.iconTrailing} description={def.description}>
          <PreviewIconVariantRows icon={ArrowRightIcon} iconProp="iconTrailing" />
        </DocsSection>
      );
    case "iconOnly":
      return (
        <DocsSection id={def.id} title={def.title} code={BUTTON_DOCS_CODE.iconOnly} description={def.description}>
          <PreviewIconOnlyButtons color="primary" icon={ArrowRightIcon} />
        </DocsSection>
      );
    case "loading":
      return (
        <DocsSection id={def.id} title={def.title} code={BUTTON_DOCS_CODE.loading} description={def.description}>
          <PreviewLoadingButtons />
        </DocsSection>
      );
    case "disabled":
      return (
        <DocsSection id={def.id} title={def.title} code={BUTTON_DOCS_CODE.disabled} description={def.description}>
          <PreviewDisabledButtons />
        </DocsSection>
      );
    default: {
      const _exhaustive: never = def;
      return _exhaustive;
    }
  }
}

const ButtonDocsPage: FC = () => {
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

          {BUTTON_DOC_SECTIONS.map((def) => (
            <Fragment key={def.id}>{renderButtonDocSection(def)}</Fragment>
          ))}
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
