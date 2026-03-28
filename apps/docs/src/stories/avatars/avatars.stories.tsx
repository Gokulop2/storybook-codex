import type { CSSProperties, ComponentProps, FC, ReactNode } from "react";
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Avatar, AvatarAddButton, AvatarCompanyIcon, AvatarLabelGroup, AvatarProfilePhoto } from "@opus2-platform/codex";
import { User01 } from "@opus2-platform/icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button as AriaButton, Tab as AriaTab, TabList as AriaTabList, TabPanel as AriaTabPanel, Tabs as AriaTabs } from "react-aria-components";
import { CODEX_DOCS_AVATAR_SRC } from "../_docs/docs-assets";
import {
  DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK,
  DOCS_PREVIEW_P_MARGIN_RESET,
  DOCS_PREVIEW_SURFACE_CLASS,
} from "../_docs/untitled-docs-preview-code";

type AvatarSize = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
const AVATAR_SIZES: AvatarSize[] = ["xxs", "xs", "sm", "md", "lg", "xl", "2xl"];
/** Company mark for badge demos (placeholder CDN). */
const CODEX_DOCS_COMPANY_LOGO_SRC = "https://picsum.photos/seed/codex-company/128/128";
/** Sample email for docs copy (Opus2 / Codex). */
const CODEX_DOCS_SAMPLE_EMAIL = "olivia@opus2.com";
/** Group demo config: fixed avatar count with last 3 hidden on <= md. */
const GROUP_AVATAR_COUNT = 10;
const GROUP_HIDE_ON_MD_COUNT = 3;
const GROUP_ROW_CONFIG = [
  { avatarSize: "xs" as const, addButtonSize: "xs" as const },
  { avatarSize: "sm" as const, addButtonSize: "sm" as const },
  { avatarSize: "md" as const, addButtonSize: "md" as const },
] as const;
const groupAvatarSrc = () => CODEX_DOCS_AVATAR_SRC;
const groupAvatarClassName = (idx: number) =>
  `${idx >= GROUP_AVATAR_COUNT - GROUP_HIDE_ON_MD_COUNT ? "max-md:hidden " : ""}ring-[1.5px] ring-bg-primary`;

function buildGroupCodeRow(avatarSize: "xs" | "sm" | "md", addButtonSize: "xs" | "sm" | "md"): string {
  const avatars = Array.from({ length: GROUP_AVATAR_COUNT }, (_, idx) => {
    const hiddenClass = idx >= GROUP_AVATAR_COUNT - GROUP_HIDE_ON_MD_COUNT ? ` className="max-md:hidden"` : "";
    return `      <Avatar size="${avatarSize}" src="${CODEX_DOCS_AVATAR_SRC}" alt=""${hiddenClass} />`;
  }).join("\n");

  return [
    `  <div className="flex gap-2">`,
    `    <div className="flex -space-x-2!">`,
    avatars,
    `      <Avatar size="${avatarSize}" initials="+5" />`,
    `    </div>`,
    `    <AvatarAddButton size="${addButtonSize}" title="Add user" />`,
    `  </div>`,
  ].join("\n");
}

function buildGroupDocsCode(): string {
  return [
    `import { Avatar, AvatarAddButton } from "@opus2-platform/codex";`,
    ``,
    `<div className="grid grid-cols-1 gap-8">`,
    ...GROUP_ROW_CONFIG.map((row) => buildGroupCodeRow(row.avatarSize, row.addButtonSize)),
    `</div>`,
  ].join("\n");
}

function companyBadgeSize(size: AvatarSize): ComponentProps<typeof AvatarCompanyIcon>["size"] {
  return size === "xxs" ? "xs" : size;
}

/** Hero docs block wrapper: `data-preview` + spacing. */
const HERO_AVATAR_DOCS_SECTION_CLASS = "group not-typography my-8 flex w-full scroll-mt-20 flex-col gap-3";

const DEFAULT_DOCS_SECTION_CLASS = "group my-8 flex w-full scroll-mt-20 flex-col gap-3 md:my-10";

const toolbarIconBtn =
  "group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-fg-quaternary hover:bg-primary_hover hover:text-fg-quaternary_hover *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-4";

const docTabBtnClass =
  "z-10 flex h-max cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold transition duration-100 ease-linear outline-focus-ring";

const docTabSelected = "bg-primary_alt text-secondary shadow-xs ring-1 ring-primary ring-inset";
const docTabIdle = "text-quaternary";

const DOC_CODE_CLASS = "text-secondary font-mono text-sm";

/** `AvatarLabelGroup` defaults to `flex-1` for horizontal toolbars; in docs `flex-col` previews that steals vertical space and breaks layout. */
const AVATAR_LABEL_GROUP_IN_DOCS_CLASS = "flex-none shrink-0";

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

/** Lightweight JSX highlighting for avatar docs snippets (matches Button docs `DocsCodePre` treatment). */
function paintAvatarDocsLine(line: string): ReactNode {
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
          const painted = importLine ?? (line === "" ? <>&nbsp;</> : paintAvatarDocsLine(line));
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

const SectionTitle: FC<{ className?: string; children: ReactNode }> = ({ className = "", children }) => (
  <span className={`docs-section-title ${className}`.trim()}>{children}</span>
);

type DocsSectionProps = {
  id: string;
  title: string;
  code: string;
  description?: ReactNode;
  /** Override outer `<section>` classes (default includes `md:my-10`). */
  sectionClassName?: string;
  /** `data-preview="true"` on the section (catalog-style layout). */
  dataPreview?: boolean;
  /** Section title links to `#id` (in-page scroll; avoids Storybook hash remounts). */
  anchorHeading?: boolean;
  /** Override preview well classes (default `DOCS_PREVIEW_SURFACE_CLASS`). */
  previewClassName?: string;
  children: ReactNode;
};

const PreviewCodeToolbar: FC<{ code: string; isPreviewDark: boolean; onPreviewDarkToggle: () => void }> = ({ code, isPreviewDark, onPreviewDarkToggle }) => (
  <div className="flex items-center justify-between gap-3 md:h-9 md:w-auto">
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

  const basePreview = previewClassName ?? DOCS_PREVIEW_SURFACE_CLASS;
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

const StorybookSbdocsTocPortal: FC<{ children: ReactNode }> = ({ children }) => {
  const [mountNode, setMountNode] = useState<HTMLDivElement | null>(null);

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
      return true;
    };

    if (attach()) return cleanup;

    intervalId = setInterval(() => attach(), 50);
    timeoutId = setTimeout(() => {
      if (intervalId !== undefined) clearInterval(intervalId);
    }, 5000);

    return cleanup;
  }, []);

  if (!mountNode) return null;
  return createPortal(children, mountNode);
};

const AVATARS_DOCS_TOC = [
  { id: "avatar-examples", label: "Avatar examples" },
  { id: "avatar", label: "Avatar" },
  { id: "status-indicator", label: "Status indicator" },
  { id: "company-logo", label: "Company logo" },
  { id: "verified-badge", label: "Verified badge" },
  { id: "placeholder", label: "Placeholder" },
  { id: "initials", label: "Initials" },
  { id: "label-group", label: "Label group" },
  { id: "group", label: "Group" },
  { id: "profile-photo", label: "Profile photo" },
  { id: "profile-photo-placeholder", label: "Profile photo placeholder" },
  { id: "profile-photo-initials", label: "Profile photo initials" },
] as const;

const OnThisPageNav: FC<{ items: readonly { id: string; label: string }[] }> = ({ items }) => {
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
                      // Storybook docs router remounts on hash navigation — scroll in-page only.
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

const AvatarsPageHeader: FC = () => (
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
                <span className="text-fg-tertiary_hover px-1 text-sm font-semibold whitespace-nowrap">Avatars</span>
              </button>
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <div className="mb-10 h-14 shrink-0 md:mb-12" aria-hidden="true" />
  </>
);

const AVATAR_DOCS_CODE = {
  /** Avatar example preview + Code tab (matches live demo; Codex imports). */
  intro: `import { Avatar, AvatarLabelGroup } from "@opus2-platform/codex";
import { User01 } from "@opus2-platform/icons";

<div className="flex flex-wrap items-center justify-center gap-4">
  <Avatar
    src="${CODEX_DOCS_AVATAR_SRC}"
    alt="Olivia Rhye"
    status="online"
    size="md"
  />
  <Avatar initials="OR" verified size="md" />
  <Avatar placeholderIcon={User01} size="md" />
</div>

<AvatarLabelGroup
  size="md"
  src="${CODEX_DOCS_AVATAR_SRC}"
  title="Olivia Rhye"
  subtitle="${CODEX_DOCS_SAMPLE_EMAIL}"
  status="online"
/>`,
  avatar: `import { Avatar } from "@opus2-platform/codex";\n\n<Avatar src="${CODEX_DOCS_AVATAR_SRC}" alt="Olivia Rhye" />`,
  statusIndicator: `import { Avatar } from "@opus2-platform/codex";\n\n<Avatar src="${CODEX_DOCS_AVATAR_SRC}" alt="Olivia Rhye" status="online" />`,
  companyLogo: `import { Avatar } from "@opus2-platform/codex";\nimport { AvatarCompanyIcon } from "@opus2-platform/codex";\n\n<Avatar\n  src="${CODEX_DOCS_AVATAR_SRC}"\n  alt="Olivia Rhye"\n  badge={<AvatarCompanyIcon size="md" src="${CODEX_DOCS_COMPANY_LOGO_SRC}" alt="Company logo" />}\n/>`,
  verifiedBadge: `import { Avatar } from "@opus2-platform/codex";\n\n<Avatar initials="OR" verified />`,
  placeholder: `import { Avatar } from "@opus2-platform/codex";\nimport { User01 } from "@opus2-platform/icons";\n\n<Avatar placeholderIcon={User01} />`,
  initials: `import { Avatar } from "@opus2-platform/codex";\n\n<Avatar initials="OR" />`,
  labelGroup: `import { AvatarLabelGroup } from "@opus2-platform/codex";\n\n<AvatarLabelGroup\n  size="md"\n  src="${CODEX_DOCS_AVATAR_SRC}"\n  title="Olivia Rhye"\n  subtitle="${CODEX_DOCS_SAMPLE_EMAIL}"\n  status="online"\n/>`,
  group: buildGroupDocsCode(),
  profilePhoto: `import { AvatarProfilePhoto } from "@opus2-platform/codex";\n\n<AvatarProfilePhoto\n  size="md"\n  src="${CODEX_DOCS_AVATAR_SRC}"\n  alt="Olivia Rhye"\n/>`,
  profilePhotoPlaceholder: `import { AvatarProfilePhoto } from "@opus2-platform/codex";\nimport { User01 } from "@opus2-platform/icons";\n\n<AvatarProfilePhoto size="md" placeholderIcon={User01} />`,
  profilePhotoInitials: `import { AvatarProfilePhoto } from "@opus2-platform/codex";\n\n<AvatarProfilePhoto size="md" initials="OR" />`,
} as const;

const DESC_STATUS_INDICATOR = (
  <>
    <p>
      Status indicators are a common way to show the online or offline status of a user or connection. Our avatar component provides a{" "}
      <code className={DOC_CODE_CLASS}>status</code> prop with <code className={DOC_CODE_CLASS}>&quot;online&quot;</code> and{" "}
      <code className={DOC_CODE_CLASS}>&quot;offline&quot;</code>.
    </p>
  </>
);

const DESC_COMPANY_LOGO = (
  <p>
    Company logos or avatar badges add context (company, role, etc.). Use the <code className={DOC_CODE_CLASS}>badge</code> prop with{" "}
    <code className={DOC_CODE_CLASS}>AvatarCompanyIcon</code> for consistent sizing and placement in the corner of the avatar.
  </p>
);

const DESC_VERIFIED = (
  <p>
    Verified badges indicate a verified, trustworthy user. Enable the <code className={DOC_CODE_CLASS}>verified</code> boolean prop to show the tick.
  </p>
);

const DESC_PLACEHOLDER = (
  <p>
    When there is no image, or the image fails to load, the avatar shows a fallback. Use <code className={DOC_CODE_CLASS}>placeholderIcon</code> or{" "}
    <code className={DOC_CODE_CLASS}>placeholder</code> to customize it.
  </p>
);

const DESC_INITIALS = (
  <p>
    Use the <code className={DOC_CODE_CLASS}>initials</code> prop to show initials when no image is available, similar to the placeholder behavior.
  </p>
);

const DESC_LABEL_GROUP = (
  <p>Avatar label groups combine the avatar with a title and subtitle—ideal for lists, menus, and profile rows.</p>
);

const DESC_GROUP = (
  <p>
    Stack multiple <code className={DOC_CODE_CLASS}>Avatar</code> instances in a row with negative horizontal spacing. Add an overflow count or add button at
    the end for additional members.
  </p>
);

const DESC_PROFILE_PHOTO = (
  <p>
    <code className={DOC_CODE_CLASS}>AvatarProfilePhoto</code> is a larger circular treatment for profile settings and headers, with the same props for image,
    initials, and placeholders.
  </p>
);

const DESC_PROFILE_PHOTO_PLACEHOLDER = (
  <p>Profile photo placeholders behave like <code className={DOC_CODE_CLASS}>Avatar</code> when no image is provided or loading fails.</p>
);

const DESC_PROFILE_PHOTO_INITIALS = (
  <p>Profile photo initials mirror the <code className={DOC_CODE_CLASS}>Avatar</code> initials behavior for the profile photo variant.</p>
);

const AvatarsDocsPage: FC = () => (
  <div className="bg-primary min-h-screen font-sans">
    <StorybookRootHeaderPortal>
      <AvatarsPageHeader />
    </StorybookRootHeaderPortal>
    <StorybookSbdocsTocPortal>
      <OnThisPageNav items={AVATARS_DOCS_TOC} />
    </StorybookSbdocsTocPortal>

    <main className="relative mx-auto flex w-full max-w-304 min-w-0 flex-1 flex-col">
      <div className="text-tertiary w-full min-w-0">
        <div className="mb-10">
          <div className="pb-3">
            <h1 className="text-primary md:text-display-xs max-w-3xl text-xl font-semibold">Avatar components</h1>
          </div>

          <p className="text-md text-tertiary mt-0 max-w-3xl whitespace-pre-line">
            React avatar components built for modern applications and websites. These avatars are built using React Aria and styled with Tailwind CSS.
          </p>
        </div>

        <DocsSection
          id="avatar-example"
          title="Avatar example"
          code={AVATAR_DOCS_CODE.intro}
          sectionClassName={HERO_AVATAR_DOCS_SECTION_CLASS}
          dataPreview
          previewClassName={DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK}
        >
          <div className="flex flex-row items-center gap-5">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Avatar src={CODEX_DOCS_AVATAR_SRC} alt="Olivia Rhye" status="online" size="md" />
              <Avatar initials="OR" verified size="md" />
              <Avatar placeholderIcon={User01} size="md" />
            </div>
            <AvatarLabelGroup
              className={AVATAR_LABEL_GROUP_IN_DOCS_CLASS}
              size="md"
              src={CODEX_DOCS_AVATAR_SRC}
              title="Olivia Rhye"
              subtitle={CODEX_DOCS_SAMPLE_EMAIL}
              status="online"
            />
          </div>
        </DocsSection>

        <section id="avatar-examples" className="scroll-mt-20 pb-2">
          <h2 className="text-primary text-lg font-semibold md:text-xl">
            <SectionTitle className="text-lg font-semibold md:text-xl">Avatar examples</SectionTitle>
          </h2>
          <p className="text-md text-tertiary mt-2 max-w-3xl">Below are examples and variations of this avatar component:</p>
        </section>

        <DocsSection id="avatar" title="Avatar" code={AVATAR_DOCS_CODE.avatar}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {AVATAR_SIZES.map((size) => (
              <Avatar key={size} size={size} src={CODEX_DOCS_AVATAR_SRC} alt="Olivia Rhye" />
            ))}
          </div>
        </DocsSection>

        <DocsSection id="status-indicator" title="Status indicator example" code={AVATAR_DOCS_CODE.statusIndicator} description={DESC_STATUS_INDICATOR}>
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {AVATAR_SIZES.map((size) => (
                <Avatar key={`on-${size}`} size={size} src={CODEX_DOCS_AVATAR_SRC} alt="Olivia Rhye" status="online" />
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {AVATAR_SIZES.map((size) => (
                <Avatar key={`off-${size}`} size={size} src={CODEX_DOCS_AVATAR_SRC} alt="Olivia Rhye" status="offline" />
              ))}
            </div>
          </div>
        </DocsSection>

        <DocsSection id="company-logo" title="Company logo example" code={AVATAR_DOCS_CODE.companyLogo} description={DESC_COMPANY_LOGO}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {AVATAR_SIZES.map((size) => (
              <Avatar
                key={size}
                size={size}
                src={CODEX_DOCS_AVATAR_SRC}
                alt="Olivia Rhye"
                badge={<AvatarCompanyIcon size={companyBadgeSize(size)} src={CODEX_DOCS_COMPANY_LOGO_SRC} alt="Company logo" />}
              />
            ))}
          </div>
        </DocsSection>

        <DocsSection id="verified-badge" title="Verified badge example" code={AVATAR_DOCS_CODE.verifiedBadge} description={DESC_VERIFIED}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {AVATAR_SIZES.map((size) => (
              <Avatar key={size} initials="OR" verified size={size} />
            ))}
          </div>
        </DocsSection>

        <DocsSection id="placeholder" title="Placeholder example" code={AVATAR_DOCS_CODE.placeholder} description={DESC_PLACEHOLDER}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {AVATAR_SIZES.map((size) => (
              <Avatar key={size} placeholderIcon={User01} size={size} />
            ))}
          </div>
        </DocsSection>

        <DocsSection id="initials" title="Initials example" code={AVATAR_DOCS_CODE.initials} description={DESC_INITIALS}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {AVATAR_SIZES.map((size) => (
              <Avatar key={size} initials="OR" size={size} />
            ))}
          </div>
        </DocsSection>

        <DocsSection id="label-group" title="Label group example" code={AVATAR_DOCS_CODE.labelGroup} description={DESC_LABEL_GROUP}>
          <div className="flex w-full flex-col items-center gap-6">
            {[0, 1, 2].map((i) => (
              <AvatarLabelGroup
                key={i}
                className={AVATAR_LABEL_GROUP_IN_DOCS_CLASS}
                size="md"
                src={CODEX_DOCS_AVATAR_SRC}
                title="Olivia Rhye"
                subtitle={CODEX_DOCS_SAMPLE_EMAIL}
                status="online"
              />
            ))}
          </div>
        </DocsSection>

        <DocsSection id="group" title="Group example" code={AVATAR_DOCS_CODE.group} description={DESC_GROUP}>
          <div className="grid grid-cols-1 gap-8">
            {GROUP_ROW_CONFIG.map(({ avatarSize, addButtonSize }) => (
              <div key={avatarSize} className="flex gap-2">
                <div className="flex -space-x-2!">
                  {Array.from({ length: GROUP_AVATAR_COUNT }, (_, idx) => (
                    <Avatar
                      key={`${avatarSize}-${idx}`}
                      size={avatarSize}
                      src={groupAvatarSrc()}
                      alt=""
                      className={groupAvatarClassName(idx)}
                    />
                  ))}
                  <Avatar size={avatarSize} initials="+5" className="ring-[1.5px] ring-bg-primary" />
                </div>
                <AvatarAddButton size={addButtonSize} title="Add user" />
              </div>
            ))}
          </div>
        </DocsSection>

        <DocsSection id="profile-photo" title="Profile photo example" code={AVATAR_DOCS_CODE.profilePhoto} description={DESC_PROFILE_PHOTO}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <AvatarProfilePhoto size="sm" src={CODEX_DOCS_AVATAR_SRC} alt="Olivia Rhye" />
            <AvatarProfilePhoto size="md" src={CODEX_DOCS_AVATAR_SRC} alt="Olivia Rhye" />
            <AvatarProfilePhoto size="lg" src={CODEX_DOCS_AVATAR_SRC} alt="Olivia Rhye" />
          </div>
        </DocsSection>

        <DocsSection
          id="profile-photo-placeholder"
          title="Profile photo placeholder example"
          code={AVATAR_DOCS_CODE.profilePhotoPlaceholder}
          description={DESC_PROFILE_PHOTO_PLACEHOLDER}
        >
          <div className="flex flex-wrap items-center justify-center gap-4">
            <AvatarProfilePhoto size="md" placeholderIcon={User01} />
          </div>
        </DocsSection>

        <DocsSection
          id="profile-photo-initials"
          title="Profile photo initials example"
          code={AVATAR_DOCS_CODE.profilePhotoInitials}
          description={DESC_PROFILE_PHOTO_INITIALS}
        >
          <div className="flex flex-wrap items-center justify-center gap-4">
            <AvatarProfilePhoto size="sm" initials="OR" />
            <AvatarProfilePhoto size="md" initials="OR" />
            <AvatarProfilePhoto size="lg" initials="OR" />
          </div>
        </DocsSection>
      </div>
    </main>
  </div>
);

const meta = {
  title: "Avatars",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: AvatarsDocsPage,
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Avatars",
};
