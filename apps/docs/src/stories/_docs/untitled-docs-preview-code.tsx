import type { CSSProperties, FC, ReactNode } from "react";
import { Fragment, useState } from "react";
import { Button as AriaButton, Tab as AriaTab, TabList as AriaTabList, TabPanel as AriaTabPanel, Tabs as AriaTabs } from "react-aria-components";

export const DOCS_SECTION_CLASS = "group my-8 flex w-full scroll-mt-20 flex-col gap-3 md:my-10";
export const DOCS_SECTION_HERO_CLASS = "group not-typography my-8 flex w-full scroll-mt-20 flex-col gap-3";

/**
 * Untitled UI hero preview well (matches untitledui.com Preview tab: px-4/md:px-8, py-32, min-h 320, md min-w 520).
 */
export const DOCS_PREVIEW_HERO_SURFACE_CLASS =
  "outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2 relative flex max-w-full min-h-[320px] items-center justify-center gap-3 rounded-[20px] bg-primary px-4 py-32 ring-1 ring-inset ring-secondary md:min-w-[520px] md:px-8";

/** Hero well for stacked column demos (badges, checkbox groups, etc.). */
export const DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK =
  "outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2 relative flex max-w-full min-h-[320px] flex-col items-center justify-center gap-3 rounded-[20px] bg-primary px-4 py-32 ring-1 ring-inset ring-secondary md:min-w-[520px] md:px-8";

/** Tighter checkbox / alignment-sensitive hero (keeps Untitled padding; `!` beats Storybook flex overrides). */
export const DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK_TIGHT =
  "outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2 relative flex max-w-full min-h-[320px] flex-col items-center! justify-center! gap-3 rounded-[20px] bg-primary px-4 py-32 ring-1 ring-inset ring-secondary md:min-w-[520px] md:px-8";

/** Inner width cap for hero + many section previews (Untitled uses max-w-xs for form demos). */
export const DOCS_PREVIEW_INNER_MAX_XS_CLASS = "w-full max-w-xs";

export const DOCS_PREVIEW_SURFACE_CLASS =
  "outline-focus-ring ring-secondary bg-primary relative flex min-h-[304px] max-w-full items-center justify-center gap-3 rounded-[20px] px-4 py-10 ring-1 ring-inset focus-visible:outline-2 focus-visible:outline-offset-2 md:min-w-130 md:px-8";

/** Untitled text-editor section preview wells (overflow + alignment match untitledui.com). */
export const DOCS_PREVIEW_UNTITLED_SECTION_CLASS =
  "outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2 relative max-w-full md:min-w-[520px] flex px-4 md:px-8 py-32 overflow-auto items-center rounded-[20px] ring-1 ring-inset ring-secondary bg-primary";

/** Default `md` text-editor preview tab (Untitled uses `overflow-x-auto`, not `overflow-auto`). */
export const DOCS_PREVIEW_UNTITLED_SECTION_OVERFLOW_X_CLASS =
  "outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2 relative max-w-full md:min-w-[520px] flex px-4 md:px-8 py-32 overflow-x-auto items-center rounded-[20px] ring-1 ring-inset ring-secondary bg-primary";

/** Hero / “with tooltip” preview: `items-center gap-3` + horizontal scroll like Untitled. */
export const DOCS_PREVIEW_UNTITLED_SECTION_CENTER_CLASS =
  "outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2 relative max-w-full md:min-w-[520px] flex px-4 md:px-8 py-32 overflow-x-auto items-center gap-3 rounded-[20px] ring-1 ring-inset ring-secondary bg-primary";

/** Neutralize Storybook/typography `p` margins inside preview wells. */
export const DOCS_PREVIEW_P_MARGIN_RESET = "[&_p]:m-0!";

export const DOCS_PREVIEW_BOX_MX_AUTO = "mx-auto!";

const toolbarIconBtn =
  "group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-fg-quaternary hover:bg-primary_hover hover:text-fg-quaternary_hover *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-4";

const docTabBtnClass =
  "z-10 flex h-max cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold transition duration-100 ease-linear outline-focus-ring";
const docTabSelected = "bg-primary_alt text-secondary shadow-xs ring-1 ring-primary ring-inset";
const docTabIdle = "text-quaternary";

const codeColor = {
  gray: "var(--color-utility-gray-700)",
  pink: "var(--color-utility-pink-600)",
  blue: "var(--color-utility-blue-600)",
  brand: "var(--color-utility-brand-600)",
  primary: "var(--color-primary)",
} as const;

/** JSX boolean props highlighted like attributes in `paintDocsLine` (e.g. avatar `verified`). */
const JSX_BOOLEAN_PROPS = new Set(["verified"]);

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

function paintDocsLine(line: string): ReactNode {
  if (line.includes("{<")) {
    return <span style={codeTokenStyle(codeColor.gray)}>{line}</span>;
  }

  const out: ReactNode[] = [];
  let i = 0;
  let key = 0;
  const push = (el: ReactNode) => out.push(<Fragment key={key++}>{el}</Fragment>);

  while (i < line.length) {
    const c = line[i];
    if (c === " " || c === "\t") {
      let j = i;
      while (j < line.length && (line[j] === " " || line[j] === "\t")) j++;
      push(<span style={codeTokenStyle(codeColor.gray)}>{line.slice(i, j)}</span>);
      i = j;
      continue;
    }
    if (c === '"') {
      let j = i + 1;
      while (j < line.length && line[j] !== '"') j++;
      j = Math.min(j + 1, line.length);
      push(<span style={codeTokenStyle(codeColor.primary)}>{line.slice(i, j)}</span>);
      i = j;
      continue;
    }
    if (c === "<") {
      let j = i + 1;
      if (line[j] === "/") j++;
      const bracketEnd = j;
      while (j < line.length && /[A-Za-z0-9]/.test(line.charAt(j))) j++;
      push(<span style={codeTokenStyle(codeColor.gray)}>{line.slice(i, bracketEnd)}</span>);
      push(<span style={codeTokenStyle(codeColor.blue)}>{line.slice(bracketEnd, j)}</span>);
      i = j;
      continue;
    }
    if (c === "/" && line[i + 1] === ">") {
      push(<span style={codeTokenStyle(codeColor.gray)}>{"/>"}</span>);
      i += 2;
      continue;
    }
    if (c === ">") {
      push(<span style={codeTokenStyle(codeColor.gray)}>&gt;</span>);
      i++;
      continue;
    }
    if (c === "{") {
      if (line.slice(i, i + 3) === "{/*") {
        const end = line.indexOf("*/}", i);
        const j = end === -1 ? line.length : end + 3;
        push(<span style={codeTokenStyle(codeColor.gray)}>{line.slice(i, j)}</span>);
        i = j;
        continue;
      }
      let j = i + 1;
      while (j < line.length && /[A-Za-z0-9_]/.test(line.charAt(j))) j++;
      const ident = line.slice(i + 1, j);
      push(<span style={codeTokenStyle(codeColor.gray)}>{"{"}</span>);
      if (ident) push(<span style={codeTokenStyle(codeColor.blue)}>{ident}</span>);
      if (line[j] === "}") {
        push(<span style={codeTokenStyle(codeColor.gray)}>{"}"}</span>);
        j++;
      }
      i = j;
      continue;
    }

    let j = i;
    while (j < line.length && /[A-Za-z0-9_-]/.test(line.charAt(j))) j++;
    if (j === i) {
      push(<span style={codeTokenStyle(codeColor.gray)}>{line.charAt(i)}</span>);
      i++;
      continue;
    }

    const word = line.slice(i, j);
    const next = line[j] ?? "";
    if (JSX_BOOLEAN_PROPS.has(word) && (next === "" || /[\s/>]/.test(next))) {
      push(<span style={codeTokenStyle(codeColor.brand)}>{word}</span>);
      i = j;
      continue;
    }
    if (line[j] === "=") {
      push(<span style={codeTokenStyle(codeColor.brand)}>{word}</span>);
      push(<span style={codeTokenStyle(codeColor.pink)}>=</span>);
      i = j + 1;
      while (i < line.length && line[i] === " ") i++;
      continue;
    }

    push(<span style={codeTokenStyle(codeColor.gray)}>{word}</span>);
    i = j;
  }

  return <>{out}</>;
}

export const DocsCodePre: FC<{ code: string; className?: string }> = ({ code, className = "" }) => {
  const lines = code.split("\n");
  return (
    <pre
      className={className.trim()}
      tabIndex={0}
      style={
        {
          backgroundColor: "rgb(255, 255, 255)",
          color: codeColor.gray,
          padding: "calc(0.25em * 5)",
        } as CSSProperties
      }
    >
      <code className="flex flex-col">
        {lines.map((line, idx) => {
          const importLine = renderImportLine(line);
          const painted = importLine ?? (line === "" ? <>&nbsp;</> : paintDocsLine(line));
          return (
            <span key={`${line}-${idx}`} className="line min-h-6">
              {painted}
              {"\n"}
            </span>
          );
        })}
      </code>
    </pre>
  );
};

export const DocsCodePanel: FC<{ code: string }> = ({ code }) => (
  <section className="group/pre not-typography bg-secondary_alt ring-secondary relative w-full rounded-[20px] p-2 ring-1 ring-inset">
    <div className="bg-primary ring-secondary_alt relative flex h-full max-h-[304px] min-h-[304px] w-full flex-col overflow-hidden rounded-xl shadow-lg ring-1">
      <DocsCodePre
        code={code}
        className="bg-primary flex h-full min-h-0 max-w-full flex-1 flex-col overflow-auto font-mono text-sm leading-[24px] font-medium"
      />
    </div>
  </section>
);

const DarkModeToggle: FC<{ isDark: boolean; onToggle: () => void }> = ({ isDark, onToggle }) => (
  <AriaButton type="button" aria-label={isDark ? "Light mode" : "Dark mode"} onPress={onToggle} className={toolbarIconBtn}>
    {isDark ? (
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-icon="true">
        <path d="M12 2v2m0 16v2M4 12H2m4.314-5.686L4.9 4.9m12.786 1.414L19.1 4.9M6.314 17.69 4.9 19.104m12.786-1.414 1.414 1.414M22 12h-2m-3 0a5 5 0 0 1-10 0 5 5 0 0 1 10 0Z" />
      </svg>
    ) : (
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-icon="true">
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
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-icon="true">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-icon="true">
          <path d="M5 15c-.932 0-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C2 13.398 2 12.932 2 12V5.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C3.52 2 4.08 2 5.2 2H12c.932 0 1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C15 3.602 15 4.068 15 5m-2.8 17h6.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C22 20.48 22 19.92 22 18.8v-6.6c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C20.48 9 19.92 9 18.8 9h-6.6c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C9 10.52 9 11.08 9 12.2v6.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C10.52 22 11.08 22 12.2 22Z" />
        </svg>
      )}
    </AriaButton>
  );
};

const previewCodeTabListClass =
  "group bg-secondary_alt ring-secondary flex gap-0 rounded-lg ring-1 ring-inset";

const PreviewCodeTabs: FC<{ sectionId: string }> = ({ sectionId }) => (
  <AriaTabList aria-label="Preview or code" className={previewCodeTabListClass}>
    <AriaTab id={`${sectionId}-preview`} className={({ isSelected }) => `${docTabBtnClass} ${isSelected ? docTabSelected : docTabIdle}`}>
      Preview
    </AriaTab>
    <AriaTab id={`${sectionId}-code`} className={({ isSelected }) => `${docTabBtnClass} ${isSelected ? docTabSelected : docTabIdle}`}>
      Code
    </AriaTab>
  </AriaTabList>
);

const PreviewCodeToolbar: FC<{ code: string; sectionId: string; isPreviewDark: boolean; onPreviewDarkToggle: () => void }> = ({
  code,
  sectionId,
  isPreviewDark,
  onPreviewDarkToggle,
}) => (
  <div className="flex items-center justify-between gap-3 md:h-9 md:w-auto">
    <div className="flex">
      <DarkModeToggle isDark={isPreviewDark} onToggle={onPreviewDarkToggle} />
      <CopyToolbarButton code={code} />
    </div>
    <div className="order-first md:order-last">
      <PreviewCodeTabs sectionId={sectionId} />
    </div>
  </div>
);

export const SectionTitle: FC<{ className?: string; children: ReactNode }> = ({ className = "", children }) => (
  <span className={`docs-section-title ${className}`.trim()}>{children}</span>
);

/** Preview well classes: surface + layout + primary text + optional scoped dark tokens. */
export function buildDocsPreviewPanelClassName(previewClassName: string | undefined, isPreviewDark: boolean): string {
  return [
    previewClassName ?? DOCS_PREVIEW_SURFACE_CLASS,
    DOCS_PREVIEW_BOX_MX_AUTO,
    DOCS_PREVIEW_P_MARGIN_RESET,
    "text-primary",
    isPreviewDark && "dark-mode",
  ]
    .filter(Boolean)
    .join(" ");
}

export type DocsSectionProps = {
  id: string;
  title: string;
  code: string;
  description?: ReactNode;
  sectionClassName?: string;
  dataPreview?: boolean;
  previewClassName?: string;
  children: ReactNode;
  /** Inline `--preview-height` for section `style` (Untitled sets per-block height). */
  previewHeight?: string;
  /** Custom Code tab content; default is syntax-highlighted `DocsCodePanel`. */
  codePanel?: ReactNode;
};

export const DocsSection: FC<DocsSectionProps> = ({
  id,
  title,
  code,
  description,
  sectionClassName,
  dataPreview,
  previewClassName,
  children,
  previewHeight,
  codePanel,
}) => {
  const [isPreviewDark, setIsPreviewDark] = useState(false);
  const panelClassName = buildDocsPreviewPanelClassName(previewClassName, isPreviewDark);

  const heading = <SectionTitle>{title}</SectionTitle>;

  const previewStyle = (dataPreview ? { "--preview-height": previewHeight ?? "320px" } : undefined) as CSSProperties | undefined;

  return (
    <section
      id={id}
      className={sectionClassName ?? DOCS_SECTION_CLASS}
      data-preview={dataPreview ? "true" : undefined}
      style={previewStyle}
    >
      <AriaTabs id={`${id}-docs-tabs`} defaultSelectedKey={`${id}-preview`} className="not-typography group flex w-full scroll-mt-20 flex-col gap-3 in-data-docs:my-8">
        <header className="flex w-full flex-col justify-between gap-3 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <h3 className="text-md font-semibold text-primary">{heading}</h3>
          </div>
          <PreviewCodeToolbar
            code={code}
            sectionId={id}
            isPreviewDark={isPreviewDark}
            onPreviewDarkToggle={() => setIsPreviewDark((d) => !d)}
          />
        </header>
        {description ? <div className="typography text-md text-tertiary max-w-3xl space-y-3">{description}</div> : null}
        <AriaTabPanel id={`${id}-preview`} className="outline-none focus:outline-none">
          <div
            className={panelClassName}
            style={{ colorScheme: isPreviewDark ? "dark" : "light" }}
            data-codex-preview-surface
          >
            {children}
          </div>
        </AriaTabPanel>
        <AriaTabPanel id={`${id}-code`} className="outline-none focus:outline-none">
          {codePanel ?? <DocsCodePanel code={code} />}
        </AriaTabPanel>
      </AriaTabs>
    </section>
  );
};

