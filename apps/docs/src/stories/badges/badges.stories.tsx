import type { CSSProperties, FC, ReactNode } from "react";
import { Fragment, useState } from "react";
import {
  Badge,
  BadgeIcon,
  BadgeWithButton,
  BadgeWithDot,
  BadgeWithFlag,
  BadgeWithIcon,
  BadgeWithImage,
} from "@opus2-platform/codex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button as AriaButton, Tab as AriaTab, TabList as AriaTabList, TabPanel as AriaTabPanel, Tabs as AriaTabs } from "react-aria-components";
import { CODEX_DOCS_AVATAR_SRC } from "../_docs/docs-assets";
import { DOCS_PREVIEW_P_MARGIN_RESET } from "../_docs/untitled-docs-preview-code";
import { OnThisPageNav, StorybookRootHeaderPortal, StorybookSbdocsTocPortal } from "../_docs/untitled-docs-scaffold";

const CODEX_DOCS_BADGE_LABEL = "Label";

const HERO_DOCS_SECTION_CLASS = "group not-typography my-8 flex w-full scroll-mt-20 flex-col gap-3";
const DEFAULT_DOCS_SECTION_CLASS = "group my-8 flex w-full scroll-mt-20 flex-col gap-3 md:my-10";

const PREVIEW_DEMO_SURFACE_CLASS =
  "outline-focus-ring ring-secondary bg-primary relative flex min-h-[304px] max-w-full items-center justify-center rounded-[20px] px-6 py-10 ring-1 ring-inset focus-visible:outline-2 focus-visible:outline-offset-2 md:min-w-130";
const HERO_PREVIEW_SURFACE_CLASS =
  "outline-focus-ring bg-primary relative flex min-h-[320px] max-w-full flex-col items-center justify-center gap-3 rounded-[20px] py-32 ring-1 ring-inset ring-secondary focus-visible:outline-2 focus-visible:outline-offset-2 md:min-w-[520px]";

const toolbarIconBtn =
  "group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-fg-quaternary hover:bg-primary_hover hover:text-fg-quaternary_hover *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-4";

const docTabBtnClass =
  "z-10 flex h-max cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold transition duration-100 ease-linear outline-focus-ring";
const docTabSelected = "bg-primary_alt text-secondary shadow-xs ring-1 ring-primary ring-inset";
const docTabIdle = "text-quaternary";

const DarkModeToggle: FC<{ isDark: boolean; onToggle: () => void }> = ({ isDark, onToggle }) => (
  <AriaButton type="button" aria-label={isDark ? "Light mode" : "Dark mode"} onPress={onToggle} className={toolbarIconBtn}>
    {isDark ? (
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-icon="true">
        <path d="M12 2v2m0 16v2M4 12H2m4.314-5.686L4.9 4.9m12.786 1.414L19.1 4.9M6.314 17.69 4.9 19.104m12.786-1.414 1.414 1.414M22 12h-2m-3 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z" />
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

const JSX_BOOLEAN_PROPS = new Set(["verified"]);

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
    if (line[j] === "=") {
      push(<span style={codeTokenStyle(codeColor.brand)}>{word}</span>);
      push(<span style={codeTokenStyle(codeColor.pink)}>=</span>);
      i = j + 1;
      while (i < line.length && line[i] === " ") i++;
      continue;
    }

    const next = line[j] ?? "";
    if (JSX_BOOLEAN_PROPS.has(word) && (next === "" || /[\s/>]/.test(next))) {
      push(<span style={codeTokenStyle(codeColor.brand)}>{word}</span>);
      i = j;
      continue;
    }

    push(<span style={codeTokenStyle(codeColor.gray)}>{word}</span>);
    i = j;
  }

  return <>{out}</>;
}

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

const DocsCodePanel: FC<{ code: string }> = ({ code }) => (
  <section className="group/pre not-typography bg-secondary_alt ring-secondary relative w-full rounded-[20px] p-2 ring-1 ring-inset">
    <div className="bg-primary ring-secondary_alt relative flex h-full max-h-[304px] min-h-[304px] w-full flex-col overflow-hidden rounded-xl shadow-lg ring-1">
      <DocsCodePre
        code={code}
        className="bg-primary flex h-full min-h-0 max-w-full flex-1 flex-col overflow-auto font-mono text-sm leading-[24px] font-medium"
      />
    </div>
  </section>
);

const PreviewCodeToolbar: FC<{ code: string; isPreviewDark: boolean; onPreviewDarkToggle: () => void }> = ({ code, isPreviewDark, onPreviewDarkToggle }) => (
  <div className="flex items-center justify-between gap-3 md:h-9 md:w-auto">
    <div className="flex">
      <DarkModeToggle isDark={isPreviewDark} onToggle={onPreviewDarkToggle} />
      <CopyToolbarButton code={code} />
    </div>
    <AriaTabList aria-label="Preview or code" className="group bg-secondary_alt ring-secondary order-first flex gap-0 rounded-lg ring-1 ring-inset md:order-last">
      <AriaTab id="preview" className={({ isSelected }) => `${docTabBtnClass} ${isSelected ? docTabSelected : docTabIdle}`}>
        Preview
      </AriaTab>
      <AriaTab id="code" className={({ isSelected }) => `${docTabBtnClass} ${isSelected ? docTabSelected : docTabIdle}`}>
        Code
      </AriaTab>
    </AriaTabList>
  </div>
);

const SectionTitle: FC<{ className?: string; children: ReactNode }> = ({ className = "", children }) => (
  <span className={`docs-section-title ${className}`.trim()}>{children}</span>
);

type DocsSectionProps = {
  id: string;
  title: string;
  code: string;
  description?: ReactNode;
  sectionClassName?: string;
  dataPreview?: boolean;
  previewClassName?: string;
  anchorHeading?: boolean;
  children: ReactNode;
};

const DocsSection: FC<DocsSectionProps> = ({
  id,
  title,
  code,
  description,
  sectionClassName,
  dataPreview,
  anchorHeading,
  previewClassName,
  children,
}) => {
  const [isPreviewDark, setIsPreviewDark] = useState(false);

  const basePreview = previewClassName ?? PREVIEW_DEMO_SURFACE_CLASS;
  const previewSurfaceClassName = [basePreview, DOCS_PREVIEW_P_MARGIN_RESET, isPreviewDark && "dark-mode"].filter(Boolean).join(" ");

  const heading = anchorHeading ? (
    <a
      href={`#${id}`}
      className="rounded-xs outline-focus-ring focus:outline-2 focus:outline-offset-2"
      onClick={(e) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      <SectionTitle>{title}</SectionTitle>
    </a>
  ) : (
    <SectionTitle>{title}</SectionTitle>
  );

  return (
    <section
      id={id}
      className={sectionClassName ?? DEFAULT_DOCS_SECTION_CLASS}
      data-preview={dataPreview ? "true" : undefined}
      style={dataPreview ? ({ "--preview-height": "320px" } as CSSProperties) : undefined}
    >
      <AriaTabs id={`${id}-docs-tabs`} defaultSelectedKey="preview" className="not-typography flex flex-col gap-3">
        <header className="flex w-full flex-col justify-between gap-3 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <h3 className="text-md font-semibold text-primary">{heading}</h3>
          </div>
          <PreviewCodeToolbar code={code} isPreviewDark={isPreviewDark} onPreviewDarkToggle={() => setIsPreviewDark((d) => !d)} />
        </header>
        {description ? <div className="typography text-md text-tertiary max-w-3xl space-y-3">{description}</div> : null}
        <AriaTabPanel id="preview" className="outline-none focus:outline-none">
          <div className={previewSurfaceClassName}>{children}</div>
        </AriaTabPanel>
        <AriaTabPanel id="code" className="outline-none focus:outline-none">
          <DocsCodePanel code={code} />
        </AriaTabPanel>
      </AriaTabs>
    </section>
  );
};


const BADGES_TOC = [
  { id: "badge-examples", label: "Badge examples" },
  { id: "pill-color", label: "Pill color" },
  { id: "color", label: "Color" },
  { id: "modern", label: "Modern" },
  { id: "with-dot", label: "With dot" },
  { id: "with-dot-badge-color", label: "With dot badge color" },
  { id: "with-dot-badge-modern", label: "With dot badge modern" },
  { id: "with-flag", label: "With flag" },
  { id: "with-flag-badge-color", label: "With flag badge color" },
  { id: "with-flag-badge-modern", label: "With flag badge modern" },
  { id: "with-avatar", label: "With avatar" },
  { id: "with-avatar-badge-color", label: "With avatar badge color" },
  { id: "with-avatar-badge-modern", label: "With avatar badge modern" },
  { id: "with-close-x", label: "With close X" },
  { id: "with-close-x-badge-color", label: "With close X badge color" },
  { id: "with-close-x-badge-modern", label: "With close X badge modern" },
  { id: "with-icon-leading", label: "With icon leading" },
  { id: "color-with-icon-leading", label: "Color with icon leading" },
  { id: "modern-with-icon-leading", label: "Modern with icon leading" },
  { id: "with-icon-trailing", label: "With icon trailing" },
  { id: "color-with-icon-trailing", label: "Color with icon trailing" },
  { id: "modern-with-icon-trailing", label: "Modern with icon trailing" },
  { id: "with-icon-only", label: "With icon only" },
  { id: "color-with-icon-only", label: "Color with icon only" },
  { id: "modern-with-icon-only", label: "Modern with icon only" },
] as const;

const BadgesPageHeader: FC = () => (
  <>
    <div className="bg-primary border-secondary fixed inset-x-0 top-0 z-30 w-full border-b">
      <div className="mx-auto flex size-full flex-1 items-center py-3 pr-3 pl-4 md:py-3 lg:px-5 lg:py-2.5">
        <nav aria-label="Breadcrumbs" className="min-w-0 max-lg:hidden">
          <ol aria-label="Breadcrumbs" className="relative flex gap-0.5 lg:gap-1">
            <li className="flex items-center gap-0.5 lg:gap-1">
              <a className="group outline-focus-ring hover:bg-primary_hover inline-flex cursor-pointer items-center justify-center gap-1 rounded-md p-1 transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 lg:p-1.5">
                <span className="text-quaternary group-hover:text-tertiary_hover px-1 text-sm font-semibold whitespace-nowrap">Base components</span>
              </a>
              <div className="text-fg-quaternary shrink-0">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" aria-hidden="true" className="size-4">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            </li>
            <li className="flex items-center gap-0.5 lg:gap-1">
              <a className="group outline-focus-ring hover:bg-primary_hover inline-flex cursor-pointer items-center justify-center gap-1 rounded-md p-1 transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 lg:p-1.5">
                <span className="text-quaternary group-hover:text-tertiary_hover px-1 text-sm font-semibold whitespace-nowrap">Components</span>
              </a>
              <div className="text-fg-quaternary shrink-0">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" aria-hidden="true" className="size-4">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            </li>
            <li className="flex items-center gap-0.5 lg:gap-1">
              <button type="button" className="bg-primary_hover cursor-default rounded-md p-1 lg:p-1.5">
                <span className="text-fg-tertiary_hover px-1 text-sm font-semibold whitespace-nowrap">Badges</span>
              </button>
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <div className="mb-10 h-14 shrink-0 md:mb-12" aria-hidden="true" />
  </>
);

const previewWrap = "flex flex-wrap items-center justify-center gap-2";

const ArrowRightDocIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M5 10h7.5M10 5l4.5 5L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const badgeDocsCode = {
  hero: `import { Badge } from "@opus2-platform/codex";\n\n<Badge color="gray" type="pill-color">Label</Badge>\n<Badge color="brand" type="pill-color">Label</Badge>\n<Badge color="error" type="pill-color">Label</Badge>\n<Badge color="success" type="badge-modern">Label</Badge>`,
  pillColor: `import { Badge } from "@opus2-platform/codex";\n\n<Badge color="gray" type="pill-color">Label</Badge>\n<Badge color="brand" type="pill-color">Label</Badge>\n<Badge color="warning" type="pill-color">Label</Badge>`,
  color: `import { Badge } from "@opus2-platform/codex";\n\n<Badge color="gray" type="badge-color">Label</Badge>\n<Badge color="brand" type="badge-color">Label</Badge>\n<Badge color="error" type="badge-color">Label</Badge>`,
  modern: `import { Badge } from "@opus2-platform/codex";\n\n<Badge color="gray" type="badge-modern">Label</Badge>\n<Badge color="brand" type="badge-modern">Label</Badge>\n<Badge color="error" type="badge-modern">Label</Badge>`,
  withDot: `import { BadgeWithDot } from "@opus2-platform/codex";\n\n<BadgeWithDot color="gray" type="pill-color">Label</BadgeWithDot>\n<BadgeWithDot color="brand" type="pill-color">Label</BadgeWithDot>\n<BadgeWithDot color="success" type="pill-color">Label</BadgeWithDot>`,
  withDotBadgeColor: `import { BadgeWithDot } from "@opus2-platform/codex";\n\n<BadgeWithDot color="gray" type="badge-color">Label</BadgeWithDot>\n<BadgeWithDot color="brand" type="badge-color">Label</BadgeWithDot>\n<BadgeWithDot color="success" type="badge-color">Label</BadgeWithDot>`,
  withDotBadgeModern: `import { BadgeWithDot } from "@opus2-platform/codex";\n\n<BadgeWithDot color="gray" type="badge-modern">Label</BadgeWithDot>\n<BadgeWithDot color="brand" type="badge-modern">Label</BadgeWithDot>\n<BadgeWithDot color="success" type="badge-modern">Label</BadgeWithDot>`,
  withFlag: `import { BadgeWithFlag } from "@opus2-platform/codex";\n\n<BadgeWithFlag flag="AU" type="pill-color">Label</BadgeWithFlag>\n<BadgeWithFlag flag="BR" type="pill-color">Label</BadgeWithFlag>\n<BadgeWithFlag flag="IN" type="pill-color">Label</BadgeWithFlag>`,
  withFlagBadgeColor: `import { BadgeWithFlag } from "@opus2-platform/codex";\n\n<BadgeWithFlag flag="AU" type="badge-color">Label</BadgeWithFlag>\n<BadgeWithFlag flag="BR" type="badge-color">Label</BadgeWithFlag>\n<BadgeWithFlag flag="IN" type="badge-color">Label</BadgeWithFlag>`,
  withFlagBadgeModern: `import { BadgeWithFlag } from "@opus2-platform/codex";\n\n<BadgeWithFlag flag="AU" type="badge-modern">Label</BadgeWithFlag>\n<BadgeWithFlag flag="BR" type="badge-modern">Label</BadgeWithFlag>\n<BadgeWithFlag flag="IN" type="badge-modern">Label</BadgeWithFlag>`,
  withAvatar: `import { BadgeWithImage } from "@opus2-platform/codex";\n\n<BadgeWithImage imgSrc="${CODEX_DOCS_AVATAR_SRC}" type="pill-color">Label</BadgeWithImage>\n<BadgeWithImage imgSrc="${CODEX_DOCS_AVATAR_SRC}" type="pill-color">Label</BadgeWithImage>\n<BadgeWithImage imgSrc="${CODEX_DOCS_AVATAR_SRC}" type="pill-color">Label</BadgeWithImage>`,
  withAvatarBadgeColor: `import { BadgeWithImage } from "@opus2-platform/codex";\n\n<BadgeWithImage imgSrc="${CODEX_DOCS_AVATAR_SRC}" type="badge-color">Label</BadgeWithImage>\n<BadgeWithImage imgSrc="${CODEX_DOCS_AVATAR_SRC}" type="badge-color">Label</BadgeWithImage>\n<BadgeWithImage imgSrc="${CODEX_DOCS_AVATAR_SRC}" type="badge-color">Label</BadgeWithImage>`,
  withAvatarBadgeModern: `import { BadgeWithImage } from "@opus2-platform/codex";\n\n<BadgeWithImage imgSrc="${CODEX_DOCS_AVATAR_SRC}" type="badge-modern">Label</BadgeWithImage>\n<BadgeWithImage imgSrc="${CODEX_DOCS_AVATAR_SRC}" type="badge-modern">Label</BadgeWithImage>\n<BadgeWithImage imgSrc="${CODEX_DOCS_AVATAR_SRC}" type="badge-modern">Label</BadgeWithImage>`,
  withCloseX: `import { BadgeWithButton } from "@opus2-platform/codex";\n\n<BadgeWithButton type="pill-color" buttonLabel="Remove">Label</BadgeWithButton>`,
  withCloseXBadgeColor: `import { BadgeWithButton } from "@opus2-platform/codex";\n\n<BadgeWithButton type="badge-color" buttonLabel="Remove">Label</BadgeWithButton>`,
  withCloseXBadgeModern: `import { BadgeWithButton } from "@opus2-platform/codex";\n\n<BadgeWithButton type="badge-modern" buttonLabel="Remove">Label</BadgeWithButton>`,
  withIconLeading: `import { BadgeWithIcon } from "@opus2-platform/codex";\n\n<BadgeWithIcon type="pill-color" iconLeading={Icon}>Label</BadgeWithIcon>`,
  colorWithIconLeading: `import { BadgeWithIcon } from "@opus2-platform/codex";\n\n<BadgeWithIcon type="pill-color" color="brand" iconLeading={Icon}>Label</BadgeWithIcon>\n<BadgeWithIcon type="pill-color" color="error" iconLeading={Icon}>Label</BadgeWithIcon>`,
  modernWithIconLeading: `import { BadgeWithIcon } from "@opus2-platform/codex";\n\n<BadgeWithIcon type="badge-modern" iconLeading={Icon}>Label</BadgeWithIcon>`,
  withIconTrailing: `import { BadgeWithIcon } from "@opus2-platform/codex";\n\n<BadgeWithIcon type="pill-color" iconTrailing={Icon}>Label</BadgeWithIcon>`,
  colorWithIconTrailing: `import { BadgeWithIcon } from "@opus2-platform/codex";\n\n<BadgeWithIcon type="pill-color" color="brand" iconTrailing={Icon}>Label</BadgeWithIcon>\n<BadgeWithIcon type="pill-color" color="error" iconTrailing={Icon}>Label</BadgeWithIcon>`,
  modernWithIconTrailing: `import { BadgeWithIcon } from "@opus2-platform/codex";\n\n<BadgeWithIcon type="badge-modern" iconTrailing={Icon}>Label</BadgeWithIcon>`,
  withIconOnly: `import { BadgeIcon } from "@opus2-platform/codex";\n\n<BadgeIcon type="pill-color" size="md" icon={Icon} />`,
  colorWithIconOnly: `import { BadgeIcon } from "@opus2-platform/codex";\n\n<BadgeIcon type="pill-color" color="brand" size="md" icon={Icon} />\n<BadgeIcon type="pill-color" color="error" size="md" icon={Icon} />`,
  modernWithIconOnly: `import { BadgeIcon } from "@opus2-platform/codex";\n\n<BadgeIcon type="badge-modern" size="md" icon={Icon} />`,
} as const;

const BadgesPage: FC = () => {
  return (
    <div className="bg-primary min-h-screen font-sans" data-codex-docs-badges>
      <StorybookRootHeaderPortal>
        <BadgesPageHeader />
      </StorybookRootHeaderPortal>
      <StorybookSbdocsTocPortal>
        <OnThisPageNav items={BADGES_TOC} />
      </StorybookSbdocsTocPortal>

      <main className="relative mx-auto flex w-full max-w-304 min-w-0 flex-1 flex-col">
        <div className="text-tertiary w-full min-w-0">
          <div className="mb-10">
            <div className="pb-3">
              <h1 className="text-primary md:text-display-xs max-w-3xl text-xl font-semibold">Badge components</h1>
            </div>
            <p className="text-md text-tertiary mt-0 max-w-3xl whitespace-pre-line">
              React badge components built for modern applications and websites, styled with Tailwind CSS and powered by React Aria.
            </p>
          </div>

          <DocsSection
            id="badge-examples"
            title="Badge examples"
            code={badgeDocsCode.hero}
            sectionClassName={HERO_DOCS_SECTION_CLASS}
            dataPreview
            previewClassName={HERO_PREVIEW_SURFACE_CLASS}
          >
            <div className={previewWrap}>
              <Badge color="gray" type="pill-color">
                {CODEX_DOCS_BADGE_LABEL}
              </Badge>
              <Badge color="brand" type="pill-color">
                {CODEX_DOCS_BADGE_LABEL}
              </Badge>
              <Badge color="error" type="pill-color">
                {CODEX_DOCS_BADGE_LABEL}
              </Badge>
              <Badge color="gray" type="modern">
                {CODEX_DOCS_BADGE_LABEL}
              </Badge>
              <Badge color="warning" type="color">
                {CODEX_DOCS_BADGE_LABEL}
              </Badge>
            </div>
          </DocsSection>

          <DocsSection id="pill-color" title="Pill color" code={badgeDocsCode.pillColor}>
            <div className={previewWrap}>
              <Badge color="gray" type="pill-color">
                {CODEX_DOCS_BADGE_LABEL}
              </Badge>
              <Badge color="brand" type="pill-color">
                {CODEX_DOCS_BADGE_LABEL}
              </Badge>
              <Badge color="warning" type="pill-color">
                {CODEX_DOCS_BADGE_LABEL}
              </Badge>
              <Badge color="error" type="pill-color">
                {CODEX_DOCS_BADGE_LABEL}
              </Badge>
              <Badge color="success" type="pill-color">
                {CODEX_DOCS_BADGE_LABEL}
              </Badge>
            </div>
          </DocsSection>

          <DocsSection id="color" title="Color" code={badgeDocsCode.color}>
            <div className={previewWrap}>
              <Badge color="gray" type="color">
                {CODEX_DOCS_BADGE_LABEL}
              </Badge>
              <Badge color="brand" type="color">
                {CODEX_DOCS_BADGE_LABEL}
              </Badge>
              <Badge color="error" type="color">
                {CODEX_DOCS_BADGE_LABEL}
              </Badge>
              <Badge color="warning" type="color">
                {CODEX_DOCS_BADGE_LABEL}
              </Badge>
              <Badge color="success" type="color">
                {CODEX_DOCS_BADGE_LABEL}
              </Badge>
            </div>
          </DocsSection>

          <DocsSection id="modern" title="Modern" code={badgeDocsCode.modern}>
            <div className={previewWrap}>
              <Badge color="gray" type="modern" size="sm">
                {CODEX_DOCS_BADGE_LABEL}
              </Badge>
              <Badge color="gray" type="modern" size="md">
                {CODEX_DOCS_BADGE_LABEL}
              </Badge>
              <Badge color="gray" type="modern" size="lg">
                {CODEX_DOCS_BADGE_LABEL}
              </Badge>
            </div>
          </DocsSection>

          <DocsSection id="with-dot" title="With dot" code={badgeDocsCode.withDot}>
            <div className={previewWrap}>
              <BadgeWithDot color="gray" type="pill-color">
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithDot>
              <BadgeWithDot color="brand" type="pill-color">
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithDot>
              <BadgeWithDot color="success" type="pill-color">
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithDot>
              <BadgeWithDot color="warning" type="pill-color">
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithDot>
              <BadgeWithDot color="error" type="pill-color">
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithDot>
            </div>
          </DocsSection>

          <DocsSection id="with-dot-badge-color" title="With dot badge color" code={badgeDocsCode.withDotBadgeColor}>
            <div className={previewWrap}>
              <BadgeWithDot color="gray" type="color">
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithDot>
              <BadgeWithDot color="brand" type="color">
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithDot>
              <BadgeWithDot color="success" type="color">
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithDot>
              <BadgeWithDot color="warning" type="color">
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithDot>
              <BadgeWithDot color="error" type="color">
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithDot>
            </div>
          </DocsSection>

          <DocsSection id="with-dot-badge-modern" title="With dot badge modern" code={badgeDocsCode.withDotBadgeModern}>
            <div className={previewWrap}>
              <BadgeWithDot color="gray" type="modern">
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithDot>
              <BadgeWithDot color="brand" type="modern">
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithDot>
              <BadgeWithDot color="success" type="modern">
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithDot>
              <BadgeWithDot color="warning" type="modern">
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithDot>
              <BadgeWithDot color="error" type="modern">
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithDot>
            </div>
          </DocsSection>

          <DocsSection id="with-flag" title="With flag" code={badgeDocsCode.withFlag}>
            <div className={previewWrap}>
              <BadgeWithFlag flag="AU" type="pill-color">
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithFlag>
              <BadgeWithFlag flag="BR" type="pill-color">
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithFlag>
              <BadgeWithFlag flag="IN" type="pill-color">
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithFlag>
            </div>
          </DocsSection>

          <DocsSection id="with-flag-badge-color" title="With flag badge color" code={badgeDocsCode.withFlagBadgeColor}>
            <div className={previewWrap}>
              <BadgeWithFlag flag="AU" type="color">
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithFlag>
              <BadgeWithFlag flag="BR" type="color">
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithFlag>
              <BadgeWithFlag flag="IN" type="color">
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithFlag>
            </div>
          </DocsSection>

          <DocsSection id="with-flag-badge-modern" title="With flag badge modern" code={badgeDocsCode.withFlagBadgeModern}>
            <div className={previewWrap}>
              <BadgeWithFlag flag="AU" type="modern">
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithFlag>
              <BadgeWithFlag flag="BR" type="modern">
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithFlag>
              <BadgeWithFlag flag="IN" type="modern">
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithFlag>
            </div>
          </DocsSection>

          <DocsSection id="with-avatar" title="With avatar" code={badgeDocsCode.withAvatar}>
            <div className={previewWrap}>
              <BadgeWithImage imgSrc={CODEX_DOCS_AVATAR_SRC} type="pill-color">
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithImage>
              <BadgeWithImage imgSrc={CODEX_DOCS_AVATAR_SRC} type="pill-color">
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithImage>
              <BadgeWithImage imgSrc={CODEX_DOCS_AVATAR_SRC} type="pill-color">
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithImage>
            </div>
          </DocsSection>

          <DocsSection id="with-avatar-badge-color" title="With avatar badge color" code={badgeDocsCode.withAvatarBadgeColor}>
            <div className={previewWrap}>
              <BadgeWithImage imgSrc={CODEX_DOCS_AVATAR_SRC} type="color">
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithImage>
              <BadgeWithImage imgSrc={CODEX_DOCS_AVATAR_SRC} type="color">
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithImage>
              <BadgeWithImage imgSrc={CODEX_DOCS_AVATAR_SRC} type="color">
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithImage>
            </div>
          </DocsSection>

          <DocsSection id="with-avatar-badge-modern" title="With avatar badge modern" code={badgeDocsCode.withAvatarBadgeModern}>
            <div className={previewWrap}>
              <BadgeWithImage imgSrc={CODEX_DOCS_AVATAR_SRC} type="modern">
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithImage>
              <BadgeWithImage imgSrc={CODEX_DOCS_AVATAR_SRC} type="modern">
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithImage>
              <BadgeWithImage imgSrc={CODEX_DOCS_AVATAR_SRC} type="modern">
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithImage>
            </div>
          </DocsSection>

          <DocsSection
            id="with-close-x"
            title="With close X"
            code={badgeDocsCode.withCloseX}
          >
            <div className={previewWrap}>
              <BadgeWithButton type="pill-color" buttonLabel="Remove">
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithButton>
            </div>
          </DocsSection>

          <DocsSection id="with-close-x-badge-color" title="With close X badge color" code={badgeDocsCode.withCloseXBadgeColor}>
            <div className={previewWrap}>
              <BadgeWithButton type="color" buttonLabel="Remove">
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithButton>
            </div>
          </DocsSection>

          <DocsSection id="with-close-x-badge-modern" title="With close X badge modern" code={badgeDocsCode.withCloseXBadgeModern}>
            <div className={previewWrap}>
              <BadgeWithButton type="modern" buttonLabel="Remove">
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithButton>
            </div>
          </DocsSection>

          <DocsSection id="with-icon-leading" title="With icon leading" code={badgeDocsCode.withIconLeading}>
            <div className={previewWrap}>
              <BadgeWithIcon type="pill-color" iconLeading={ArrowRightDocIcon}>
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithIcon>
            </div>
          </DocsSection>

          <DocsSection id="color-with-icon-leading" title="Color with icon leading" code={badgeDocsCode.colorWithIconLeading}>
            <div className={previewWrap}>
              <BadgeWithIcon type="pill-color" color="brand" iconLeading={ArrowRightDocIcon}>
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithIcon>
              <BadgeWithIcon type="pill-color" color="error" iconLeading={ArrowRightDocIcon}>
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithIcon>
            </div>
          </DocsSection>

          <DocsSection id="modern-with-icon-leading" title="Modern with icon leading" code={badgeDocsCode.modernWithIconLeading}>
            <div className={previewWrap}>
              <BadgeWithIcon type="modern" iconLeading={ArrowRightDocIcon}>
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithIcon>
            </div>
          </DocsSection>

          <DocsSection id="with-icon-trailing" title="With icon trailing" code={badgeDocsCode.withIconTrailing}>
            <div className={previewWrap}>
              <BadgeWithIcon type="pill-color" iconTrailing={ArrowRightDocIcon}>
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithIcon>
            </div>
          </DocsSection>

          <DocsSection id="color-with-icon-trailing" title="Color with icon trailing" code={badgeDocsCode.colorWithIconTrailing}>
            <div className={previewWrap}>
              <BadgeWithIcon type="pill-color" color="brand" iconTrailing={ArrowRightDocIcon}>
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithIcon>
              <BadgeWithIcon type="pill-color" color="error" iconTrailing={ArrowRightDocIcon}>
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithIcon>
            </div>
          </DocsSection>

          <DocsSection id="modern-with-icon-trailing" title="Modern with icon trailing" code={badgeDocsCode.modernWithIconTrailing}>
            <div className={previewWrap}>
              <BadgeWithIcon type="modern" iconTrailing={ArrowRightDocIcon}>
                {CODEX_DOCS_BADGE_LABEL}
              </BadgeWithIcon>
            </div>
          </DocsSection>

          <DocsSection id="with-icon-only" title="With icon only" code={badgeDocsCode.withIconOnly}>
            <div className={previewWrap}>
              <BadgeIcon type="pill-color" size="md" icon={ArrowRightDocIcon} />
            </div>
          </DocsSection>

          <DocsSection id="color-with-icon-only" title="Color with icon only" code={badgeDocsCode.colorWithIconOnly}>
            <div className={previewWrap}>
              <BadgeIcon type="pill-color" size="md" color="brand" icon={ArrowRightDocIcon} />
              <BadgeIcon type="pill-color" size="md" color="error" icon={ArrowRightDocIcon} />
            </div>
          </DocsSection>

          <DocsSection id="modern-with-icon-only" title="Modern with icon only" code={badgeDocsCode.modernWithIconOnly}>
            <div className={previewWrap}>
              <BadgeIcon type="modern" size="md" icon={ArrowRightDocIcon} />
            </div>
          </DocsSection>
        </div>
      </main>
    </div>
  );
};

const meta = {
  title: "Badges",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: BadgesPage,
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Badges",
  args: {
    children: "Label",
  },
};

