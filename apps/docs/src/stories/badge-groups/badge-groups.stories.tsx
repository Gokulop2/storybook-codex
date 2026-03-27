import type { CSSProperties, ComponentProps, FC, ReactNode } from "react";
import { useMemo, useState } from "react";
import { Fragment } from "react";
import { BadgeGroup } from "@opus2-platform/codex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button as AriaButton, Tab as AriaTab, TabList as AriaTabList, TabPanel as AriaTabPanel, Tabs as AriaTabs } from "react-aria-components";
import { DOCS_PREVIEW_P_MARGIN_RESET } from "../_docs/untitled-docs-preview-code";
import { OnThisPageNav, StorybookRootHeaderPortal, StorybookSbdocsTocPortal } from "../_docs/untitled-docs-scaffold";

type BadgeGroupColor = NonNullable<ComponentProps<typeof BadgeGroup>["color"]>;
type BadgeGroupTheme = NonNullable<ComponentProps<typeof BadgeGroup>["theme"]>;
type BadgeGroupAlign = NonNullable<ComponentProps<typeof BadgeGroup>["align"]>;

const toolbarIconBtn =
  "group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-fg-quaternary hover:bg-primary_hover hover:text-fg-quaternary_hover *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-4";
const docTabBtnClass =
  "z-10 flex h-max cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold transition duration-100 ease-linear outline-focus-ring";
const docTabSelected = "bg-primary_alt text-secondary shadow-xs ring-1 ring-primary ring-inset";
const docTabIdle = "text-quaternary";

const DEFAULT_DOCS_SECTION_CLASS = "group my-8 flex w-full scroll-mt-20 flex-col gap-3 md:my-10";
const HERO_DOCS_SECTION_CLASS = "group not-typography my-8 flex w-full scroll-mt-20 flex-col gap-3";

const PREVIEW_DEMO_SURFACE_CLASS =
  "outline-focus-ring ring-secondary bg-primary relative flex min-h-[304px] max-w-full items-center justify-center rounded-[20px] px-6 py-10 ring-1 ring-inset focus-visible:outline-2 focus-visible:outline-offset-2 md:min-w-130";
const HERO_PREVIEW_SURFACE_CLASS =
  "outline-focus-ring bg-primary relative flex min-h-[320px] max-w-full items-center justify-center rounded-[20px] py-32 ring-1 ring-inset ring-secondary focus-visible:outline-2 focus-visible:outline-offset-2 md:min-w-[520px]";

const DOC_CODE_CLASS = "text-secondary font-mono text-sm";

const BADGE_GROUP_TOC = [
  { id: "badge-group-examples", label: "Badge group examples" },
  { id: "pill-color-leading-gray", label: "Pill color leading gray" },
  { id: "pill-color-leading-brand", label: "Pill color leading brand" },
  { id: "pill-color-leading-error", label: "Pill color leading error" },
  { id: "pill-color-leading-warning", label: "Pill color leading warning" },
  { id: "pill-color-leading-success", label: "Pill color leading success" },
  { id: "pill-color-trailing-gray", label: "Pill color trailing gray" },
  { id: "pill-color-trailing-brand", label: "Pill color trailing brand" },
  { id: "pill-color-trailing-error", label: "Pill color trailing error" },
  { id: "pill-color-trailing-warning", label: "Pill color trailing warning" },
  { id: "pill-color-trailing-success", label: "Pill color trailing success" },
  { id: "modern-leading-gray", label: "Modern leading gray" },
  { id: "modern-leading-brand", label: "Modern leading brand" },
  { id: "modern-leading-error", label: "Modern leading error" },
  { id: "modern-leading-warning", label: "Modern leading warning" },
  { id: "modern-leading-success", label: "Modern leading success" },
  { id: "modern-trailing-gray", label: "Modern trailing gray" },
  { id: "modern-trailing-brand", label: "Modern trailing brand" },
  { id: "modern-trailing-error", label: "Modern trailing error" },
  { id: "modern-trailing-warning", label: "Modern trailing warning" },
  { id: "modern-trailing-success", label: "Modern trailing success" },
] as const;

type BadgeGroupDocDef = {
  id: string;
  title: string;
  theme: BadgeGroupTheme;
  align: BadgeGroupAlign;
  color: BadgeGroupColor;
  addonText: string;
  children: string;
};

const MESSAGE_BY_COLOR: Record<BadgeGroupColor, string> = {
  gray: "We've just released a new feature",
  brand: "We've just released a new feature",
  error: "There was a problem with that action",
  warning: "Just to let you know this might be a problem",
  success: "You've updated your profile and details",
};

const LABEL_BY_COLOR: Record<BadgeGroupColor, string> = {
  gray: "New feature",
  brand: "New feature",
  error: "Error",
  warning: "Warning",
  success: "Success",
};

const COLORS: readonly BadgeGroupColor[] = ["gray", "brand", "error", "warning", "success"] as const;

const BADGE_GROUP_SECTION_DEFS: readonly BadgeGroupDocDef[] = [
  ...COLORS.map((color) => ({
    id: `pill-color-leading-${color}`,
    title: `Pill color leading ${color}`,
    theme: "light" as const,
    align: "leading" as const,
    color,
    addonText: LABEL_BY_COLOR[color],
    children: MESSAGE_BY_COLOR[color],
  })),
  ...COLORS.map((color) => ({
    id: `pill-color-trailing-${color}`,
    title: `Pill color trailing ${color}`,
    theme: "light" as const,
    align: "trailing" as const,
    color,
    addonText: LABEL_BY_COLOR[color],
    children: MESSAGE_BY_COLOR[color],
  })),
  ...COLORS.map((color) => ({
    id: `modern-leading-${color}`,
    title: `Modern leading ${color}`,
    theme: "modern" as const,
    align: "leading" as const,
    color,
    addonText: LABEL_BY_COLOR[color],
    children: MESSAGE_BY_COLOR[color],
  })),
  ...COLORS.map((color) => ({
    id: `modern-trailing-${color}`,
    title: `Modern trailing ${color}`,
    theme: "modern" as const,
    align: "trailing" as const,
    color,
    addonText: LABEL_BY_COLOR[color],
    children: MESSAGE_BY_COLOR[color],
  })),
];

function badgeGroupCode(def: BadgeGroupDocDef): string {
  return [
    `import { BadgeGroup } from "@opus2-platform/codex";`,
    ``,
    `<BadgeGroup`,
    `  theme="${def.theme}"`,
    `  align="${def.align}"`,
    `  color="${def.color}"`,
    `  addonText="${def.addonText}"`,
    `>`,
    `  ${def.children}`,
    `</BadgeGroup>`,
  ].join("\n");
}

const BADGE_GROUP_DOCS_CODE = {
  hero: badgeGroupCode({
    id: "badge-group-example",
    title: "Badge group example",
    theme: "light",
    align: "leading",
    color: "gray",
    addonText: "New feature",
    children: "We've just released a new feature",
  }),
  byId: Object.fromEntries(BADGE_GROUP_SECTION_DEFS.map((def) => [def.id, badgeGroupCode(def)])) as Record<string, string>,
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

function paintBadgeDocsLine(line: string): ReactNode {
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
          const painted = importLine ?? (line === "" ? <>&nbsp;</> : paintBadgeDocsLine(line));
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

const SectionTitle: FC<{ className?: string; children: ReactNode }> = ({ className = "", children }) => (
  <span className={`docs-section-title ${className}`.trim()}>{children}</span>
);

const DarkModeToggle: FC<{ isDark: boolean; onToggle: () => void }> = ({ isDark, onToggle }) => (
  <AriaButton type="button" aria-label={isDark ? "Light mode" : "Dark mode"} onPress={onToggle} className={toolbarIconBtn}>
    {isDark ? (
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden data-icon="true">
        <path d="M12 2v2m0 16v2M4 12H2m4.314-5.686L4.9 4.9m12.786 1.414L19.1 4.9M6.314 17.69 4.9 19.104m12.786-1.414 1.414 1.414M22 12h-2m-3 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z" />
      </svg>
    ) : (
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden data-icon="true">
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
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden data-icon="true">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden data-icon="true">
          <path d="M5 15c-.932 0-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C2 13.398 2 12.932 2 12V5.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C3.52 2 4.08 2 5.2 2H12c.932 0 1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C15 3.602 15 4.068 15 5m-2.8 17h6.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C22 20.48 22 19.92 22 18.8v-6.6c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C20.48 9 19.92 9 18.8 9h-6.6c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C9 10.52 9 11.08 9 12.2v6.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C10.52 22 11.08 22 12.2 22Z" />
        </svg>
      )}
    </AriaButton>
  );
};

const DocsCodePanel: FC<{ code: string }> = ({ code }) => (
  <section className="group/pre not-typography bg-secondary_alt ring-secondary relative w-full rounded-[20px] p-2 ring-1 ring-inset">
    <div className="bg-primary ring-secondary_alt relative flex h-full max-h-[304px] min-h-[304px] w-full flex-col overflow-hidden rounded-xl shadow-lg ring-1">
      <DocsCodePre code={code} className="bg-primary flex h-full min-h-0 max-w-full flex-1 flex-col overflow-auto font-mono text-sm leading-[24px] font-medium" />
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

type DocsSectionProps = {
  id: string;
  title: string;
  code: string;
  description?: ReactNode;
  sectionClassName?: string;
  dataPreview?: boolean;
  previewClassName?: string;
  children: ReactNode;
};

const DocsSection: FC<DocsSectionProps> = ({ id, title, code, description, sectionClassName, dataPreview, previewClassName, children }) => {
  const [isPreviewDark, setIsPreviewDark] = useState(false);
  const panelClassName = [previewClassName ?? PREVIEW_DEMO_SURFACE_CLASS, DOCS_PREVIEW_P_MARGIN_RESET, isPreviewDark && "dark-mode"].filter(Boolean).join(" ");

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
            <h3 className="text-md font-semibold text-primary">
              <SectionTitle>{title}</SectionTitle>
            </h3>
          </div>
          <PreviewCodeToolbar code={code} isPreviewDark={isPreviewDark} onPreviewDarkToggle={() => setIsPreviewDark((d) => !d)} />
        </header>
        {description ? <div className="typography text-md text-tertiary max-w-3xl space-y-3">{description}</div> : null}
        <AriaTabPanel id="preview" className="outline-none focus:outline-none">
          <div className={panelClassName}>{children}</div>
        </AriaTabPanel>
        <AriaTabPanel id="code" className="outline-none focus:outline-none">
          <DocsCodePanel code={code} />
        </AriaTabPanel>
      </AriaTabs>
    </section>
  );
};

const BadgeGroupsPageHeader: FC = () => (
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
                <span className="text-fg-tertiary_hover px-1 text-sm font-semibold whitespace-nowrap">Badge groups</span>
              </button>
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <div className="mb-10 h-14 shrink-0 md:mb-12" aria-hidden />
  </>
);

const BadgeGroupsDocsPage: FC = () => {
  const heroDef = useMemo<BadgeGroupDocDef>(
    () => ({
      id: "badge-group-example",
      title: "Badge group example",
      theme: "modern",
      align: "leading",
      color: "brand",
      addonText: "New feature",
      children: "We've just released a new feature",
    }),
    []
  );

  return (
    <div data-codex-docs-badge-groups className="bg-primary min-h-screen font-sans">
      <StorybookRootHeaderPortal>
        <BadgeGroupsPageHeader />
      </StorybookRootHeaderPortal>
      <StorybookSbdocsTocPortal>
        <OnThisPageNav items={BADGE_GROUP_TOC} />
      </StorybookSbdocsTocPortal>

      <main className="relative mx-auto flex w-full max-w-304 min-w-0 flex-1 flex-col">
        <div className="text-tertiary w-full min-w-0">
          <div className="mb-10">
            <div className="pb-3">
              <h1 className="text-primary md:text-display-xs max-w-3xl text-xl font-semibold">Badge group components</h1>
            </div>
            <p className="text-md text-tertiary mt-0 max-w-3xl whitespace-pre-line">
              React badge group components built for modern applications and websites. These badge groups are built using React Aria and styled with Tailwind CSS.
            </p>
          </div>

          <DocsSection
            id="badge-group-example"
            title="Badge group example"
            code={BADGE_GROUP_DOCS_CODE.hero}
            sectionClassName={HERO_DOCS_SECTION_CLASS}
            dataPreview
            previewClassName={HERO_PREVIEW_SURFACE_CLASS}
          >
            <div className="flex flex-col items-start gap-4">
              <BadgeGroup theme={heroDef.theme} align={heroDef.align} color={heroDef.color} addonText={heroDef.addonText} size="md">
                {heroDef.children}
              </BadgeGroup>
              <BadgeGroup theme={heroDef.theme} align={heroDef.align} color={heroDef.color} addonText={heroDef.addonText} size="lg">
                {heroDef.children}
              </BadgeGroup>
            </div>
          </DocsSection>

          <section id="badge-group-examples" className="scroll-mt-20 pb-2">
            <h2 className="text-primary text-lg font-semibold md:text-xl">
              <SectionTitle className="text-lg font-semibold md:text-xl">Badge group examples</SectionTitle>
            </h2>
            <p className="text-md text-tertiary mt-2 max-w-3xl">Below are examples and variations of this badge group component:</p>
          </section>

          {BADGE_GROUP_SECTION_DEFS.map((def) => (
            <DocsSection key={def.id} id={def.id} title={def.title} code={BADGE_GROUP_DOCS_CODE.byId[def.id] ?? ""}>
              <div className="flex flex-col items-center justify-center gap-4">
                <BadgeGroup theme={def.theme} align={def.align} color={def.color} addonText={def.addonText}>
                  {def.children}
                </BadgeGroup>
              </div>
            </DocsSection>
          ))}

          <div className="typography text-md text-tertiary mt-10 max-w-3xl space-y-2">
            <p>
              Use <code className={DOC_CODE_CLASS}>theme</code>, <code className={DOC_CODE_CLASS}>align</code>, and <code className={DOC_CODE_CLASS}>color</code>{" "}
              to create badge group variants for product updates, warnings, and status messaging.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

const meta = {
  title: "Badge groups",
  component: BadgeGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: BadgeGroupsDocsPage,
    },
  },
} satisfies Meta<typeof BadgeGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Badge groups",
  args: {
    addonText: "New feature",
    color: "gray",
    children: "We've just released a new feature",
  },
};
