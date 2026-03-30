import type { ComponentProps, FC } from "react";
import { useMemo } from "react";
import { BadgeGroup } from "@opus2-platform/codex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DOCS_PREVIEW_HERO_SURFACE_CLASS, DOCS_SECTION_HERO_CLASS, DocsSection, SectionTitle } from "../_docs/docs-preview-code";
import { DocsPageBreadcrumb } from "../_docs/docs-page-breadcrumb";
import { OnThisPageNav, StorybookRootHeaderPortal, StorybookSbdocsTocPortal } from "../_docs/docs-scaffold";

type BadgeGroupColor = NonNullable<ComponentProps<typeof BadgeGroup>["color"]>;
type BadgeGroupTheme = NonNullable<ComponentProps<typeof BadgeGroup>["theme"]>;
type BadgeGroupAlign = NonNullable<ComponentProps<typeof BadgeGroup>["align"]>;

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
        <DocsPageBreadcrumb currentLabel="Badge groups" />
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
              React badge group components built for modern applications and websites. These badge groups are built using React Aria and styled with Tailwind
              CSS.
            </p>
          </div>

          <DocsSection
            id="badge-group-example"
            title="Badge group example"
            code={BADGE_GROUP_DOCS_CODE.hero}
            sectionClassName={DOCS_SECTION_HERO_CLASS}
            dataPreview
            previewClassName={DOCS_PREVIEW_HERO_SURFACE_CLASS}
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
              Use <code className={DOC_CODE_CLASS}>theme</code>, <code className={DOC_CODE_CLASS}>align</code>, and{" "}
              <code className={DOC_CODE_CLASS}>color</code> to create badge group variants for product updates, warnings, and status messaging.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

const meta = {
  title: "Base components/Badge groups",
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
  tags: ["!dev"],
  name: "Badge groups",
  args: {
    addonText: "New feature",
    color: "gray",
    children: "We've just released a new feature",
  },
};
