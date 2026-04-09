import type { ComponentProps, FC } from "react";
import { FeaturedIcon } from "@opus2-platform/codex";
import { CheckCircle } from "@opus2-platform/icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DocsPageBreadcrumb } from "../_docs/docs-page-breadcrumb";
import { DOCS_SECTION_HERO_CLASS, DocsSection } from "../_docs/docs-preview-code";
import { OnThisPageNav, StorybookRootHeaderPortal, StorybookSbdocsTocPortal } from "../_docs/docs-scaffold";

type FeaturedIconColor = ComponentProps<typeof FeaturedIcon>["color"];
type FeaturedIconTheme = NonNullable<ComponentProps<typeof FeaturedIcon>["theme"]>;
type FullColorTheme = "light" | "gradient" | "dark" | "outline";
type ModernTheme = "modern" | "modern-neue";

const SIZES = ["sm", "md", "lg", "xl"] as const;

const COLOR_ROWS = [
  { color: "brand" as const, icon: CheckCircle, snippetIcon: "CheckCircle" as const },
  { color: "gray" as const, icon: CheckCircle, snippetIcon: "CheckCircle" as const },
  { color: "error" as const, icon: CheckCircle, snippetIcon: "CheckCircle" as const },
  { color: "warning" as const, icon: CheckCircle, snippetIcon: "CheckCircle" as const },
  { color: "success" as const, icon: CheckCircle, snippetIcon: "CheckCircle" as const },
];

const MODERN_ICONS = [CheckCircle, CheckCircle, CheckCircle, CheckCircle] as const;

const VARIANTS = [
  { id: "light", title: "Light", theme: "light" },
  { id: "gradient", title: "Gradient", theme: "gradient" },
  { id: "dark", title: "Dark", theme: "dark" },
  { id: "outline", title: "Outline", theme: "outline" },
  { id: "modern", title: "Modern", theme: "modern" },
  { id: "modern-neue", title: "Modern neue", theme: "modern-neue" },
] as const satisfies readonly { id: string; title: string; theme: FeaturedIconTheme }[];

const HERO_PREVIEW_SURFACE_CLASS =
  "bg-primary relative flex min-h-[min(400px,75vh)] w-full max-w-full flex-col items-center justify-center gap-8 rounded-[20px] px-4 py-12 ring-1 ring-inset ring-secondary focus-visible:outline-2 focus-visible:outline-offset-2 md:min-w-[520px] md:px-8 md:py-16";

const PREVIEW = "flex min-w-0 max-w-full flex-col items-start gap-8 py-4";

const IMPORT_FULL = `import { FeaturedIcon } from "@opus2-platform/codex";
import { CheckCircle } from "@opus2-platform/icons";
`;

const IMPORT_MODERN = `import { FeaturedIcon } from "@opus2-platform/codex";
import { CheckCircle } from "@opus2-platform/icons";
`;

const rowSnippet = (theme: string, color: string, iconVar: string) =>
  `  <div className="flex gap-4">
${SIZES.map((s) => `    <FeaturedIcon icon={${iconVar}} color="${color}" theme="${theme}" size="${s}" />`).join("\n")}
  </div>`;

const snippetFullTheme = (theme: FullColorTheme) =>
  `${IMPORT_FULL}
<div className="flex flex-col gap-8">
${COLOR_ROWS.map((row) => rowSnippet(theme, row.color, row.snippetIcon)).join("\n\n")}
</div>`;

const snippetModern = (theme: ModernTheme) =>
  `${IMPORT_MODERN}
<div className="flex flex-col gap-8">
${["CheckCircle", "CheckCircle", "CheckCircle", "CheckCircle"].map((I) => rowSnippet(theme, "gray", I)).join("\n\n")}
</div>`;

const snippetForTheme = (theme: FeaturedIconTheme): string => {
  if (theme === "modern" || theme === "modern-neue") return snippetModern(theme);
  return snippetFullTheme(theme);
};

const CODE_HERO = `${IMPORT_FULL}
<>
  <div className="flex gap-4">
${SIZES.map((s) => `    <FeaturedIcon icon={CheckCircle} color="brand" theme="light" size="${s}" />`).join("\n")}
  </div>
  <div className="flex flex-wrap gap-4">
${COLOR_ROWS.map((row) => `    <FeaturedIcon icon={${row.snippetIcon}} color="${row.color}" theme="light" size="lg" />`).join("\n")}
  </div>
</>`;

const TOC = [{ id: "featured-icon-example", label: "Featured icon example" }, ...VARIANTS.map((v) => ({ id: v.id, label: v.title }))];

const SizeRow: FC<{
  theme: FeaturedIconTheme;
  color: FeaturedIconColor;
  icon: typeof CheckCircle;
}> = ({ theme, color, icon: Icon }) => (
  <div className="flex items-end gap-4">
    {SIZES.map((size) => (
      <FeaturedIcon key={size} icon={Icon} color={color} theme={theme} size={size} />
    ))}
  </div>
);

const FullThemeGrid: FC<{ theme: FullColorTheme }> = ({ theme }) => (
  <div className={PREVIEW}>
    {COLOR_ROWS.map(({ color, icon }) => (
      <SizeRow key={color} theme={theme} color={color} icon={icon} />
    ))}
  </div>
);

const ModernThemeGrid: FC<{ theme: ModernTheme }> = ({ theme }) => (
  <div className={PREVIEW}>
    {MODERN_ICONS.map((Icon, i) => (
      <SizeRow key={i} theme={theme} color="gray" icon={Icon} />
    ))}
  </div>
);

const ThemePreview: FC<{ theme: FeaturedIconTheme }> = ({ theme }) => {
  if (theme === "modern" || theme === "modern-neue") return <ModernThemeGrid theme={theme} />;
  return <FullThemeGrid theme={theme} />;
};

const HeroPreview: FC = () => (
  <div className="flex w-full min-w-0 flex-col items-start gap-10 md:items-center">
    <div className="flex flex-col items-start gap-3">
      <p className="text-quaternary text-xs font-semibold tracking-wide uppercase">Sizes</p>
      <SizeRow theme="light" color="brand" icon={CheckCircle} />
    </div>
    <div className="flex flex-col items-start gap-3">
      <p className="text-quaternary text-xs font-semibold tracking-wide uppercase">Colors</p>
      <div className="flex flex-wrap items-end gap-4">
        {COLOR_ROWS.map(({ color, icon: Icon }) => (
          <FeaturedIcon key={color} icon={Icon} color={color} theme="light" size="lg" />
        ))}
      </div>
    </div>
  </div>
);

const FeaturedIconsDocsPage: FC = () => (
  <div className="bg-primary min-h-screen font-sans" data-codex-docs-featured-icons>
    <StorybookRootHeaderPortal>
      <DocsPageBreadcrumb currentLabel="Featured icons" />
    </StorybookRootHeaderPortal>
    <StorybookSbdocsTocPortal>
      <OnThisPageNav items={TOC} />
    </StorybookSbdocsTocPortal>

    <main className="relative mx-auto flex w-full max-w-304 min-w-0 flex-1 flex-col">
      <div className="text-tertiary w-full min-w-0">
        <div className="mb-10">
          <div className="pb-3">
            <h1 className="text-primary md:text-display-xs max-w-3xl text-xl font-semibold">Featured icon components</h1>
          </div>
          <p className="text-md text-tertiary mt-0 max-w-3xl whitespace-pre-line">
            React featured icon components for dashboards and marketing surfaces. Built with Tailwind CSS and the Codex design tokens. Sizes are{" "}
            <code className="text-secondary bg-secondary_subtle rounded px-1 py-0.5 text-sm font-medium">sm</code>–
            <code className="text-secondary bg-secondary_subtle rounded px-1 py-0.5 text-sm font-medium">xl</code> (no{" "}
            <code className="text-secondary bg-secondary_subtle rounded px-1 py-0.5 text-sm font-medium">xs</code>).
          </p>
        </div>

        <DocsSection
          id="featured-icon-example"
          title="Featured icon example"
          code={CODE_HERO}
          sectionClassName={DOCS_SECTION_HERO_CLASS}
          dataPreview
          previewClassName={HERO_PREVIEW_SURFACE_CLASS}
        >
          <HeroPreview />
        </DocsSection>

        {VARIANTS.map((v) => (
          <DocsSection key={v.id} id={v.id} title={v.title} code={snippetForTheme(v.theme)}>
            <div className="flex w-full justify-center py-4">
              <ThemePreview theme={v.theme} />
            </div>
          </DocsSection>
        ))}
      </div>
    </main>
  </div>
);

const meta = {
  title: "Base components/Featured icons",
  component: FeaturedIcon,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: FeaturedIconsDocsPage,
    },
  },
} satisfies Meta<typeof FeaturedIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  tags: ["!dev"],
  name: "Featured icons",
  args: {
    icon: CheckCircle,
    color: "brand",
    theme: "light",
    size: "lg",
  },
};
