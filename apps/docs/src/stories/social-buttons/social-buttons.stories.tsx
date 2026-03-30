import type { FC, ReactNode } from "react";
import { SocialButton } from "@opus2-platform/codex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DocsPageBreadcrumb } from "../_docs/docs-page-breadcrumb";
import {
  DOCS_PREVIEW_HERO_SURFACE_CLASS,
  DOCS_PREVIEW_SURFACE_CLASS,
  DOCS_SECTION_HERO_CLASS,
  DocsSection,
  SectionTitle,
} from "../_docs/docs-preview-code";
import { OnThisPageNav, StorybookRootHeaderPortal, StorybookSbdocsTocPortal } from "../_docs/docs-scaffold";

const SECTION_PREVIEW = `${DOCS_PREVIEW_SURFACE_CLASS} flex-wrap! items-center! justify-center!`.trim();

const IMPORT = `import { SocialButton } from "@opus2-platform/codex";
`;

/** Shared flex row (preview adds `w-full`; code snippets omit it). */
const FLEX_ROW_WRAP = "flex-wrap items-center justify-center gap-3";

const LABEL = {
  google: "Sign in with Google",
  facebook: "Sign in with Facebook",
  apple: "Sign in with Apple",
  twitter: "Sign in with X",
  figma: "Sign in with Figma",
  dribble: "Sign in with Dribble",
} as const;

type SocialKey = keyof typeof LABEL;

const SOCIAL_ALL = ["google", "facebook", "apple", "twitter", "figma", "dribble"] as const satisfies readonly SocialKey[];

const SOCIAL_GAF = ["google", "facebook", "apple"] as const satisfies readonly SocialKey[];

const SIZE_ROW = ["sm", "md", "lg"] as const;

function wrapSnippet(bodyLines: string[]): string {
  return `${IMPORT}\n\n<div className="flex ${FLEX_ROW_WRAP}">\n${bodyLines.join("\n")}\n</div>`;
}

function linesHero(): string[] {
  return SOCIAL_GAF.map((s) => `  <SocialButton social="${s}" theme="brand">${LABEL[s]}</SocialButton>`);
}

function linesSizeRow(social: SocialKey): string[] {
  const label = LABEL[social];
  return SIZE_ROW.map((size) => `  <SocialButton social="${social}" size="${size}" theme="brand">${label}</SocialButton>`);
}

function linesGroupText(theme: "brand" | "color" | "gray"): string[] {
  return SOCIAL_GAF.map((s) => `  <SocialButton social="${s}" theme="${theme}">${LABEL[s]}</SocialButton>`);
}

function linesGroupIcons(theme: "brand" | "color" | "gray"): string[] {
  return SOCIAL_GAF.map((s) => `  <SocialButton social="${s}" theme="${theme}" aria-label="${LABEL[s]}" />`);
}

const CODE = {
  hero: wrapSnippet(linesHero()),
  ...Object.fromEntries(SOCIAL_ALL.map((social) => [social, wrapSnippet(linesSizeRow(social))])) as Record<SocialKey, string>,
  groupBrand: wrapSnippet(linesGroupText("brand")),
  groupIconsBrand: wrapSnippet(linesGroupIcons("brand")),
  groupColor: wrapSnippet(linesGroupText("color")),
  groupIconsColor: wrapSnippet(linesGroupIcons("color")),
  groupGray: wrapSnippet(linesGroupText("gray")),
} as const;

const PROVIDER_SECTIONS = [
  { id: "google-social-buttons", title: "Google social buttons", social: "google" },
  { id: "facebook-social-buttons", title: "Facebook social buttons", social: "facebook" },
  { id: "apple-social-buttons", title: "Apple social buttons", social: "apple" },
  { id: "twitter-social-buttons", title: "Twitter social buttons", social: "twitter" },
  { id: "figma-social-buttons", title: "Figma social buttons", social: "figma" },
  { id: "dribble-social-buttons", title: "Dribble social buttons", social: "dribble" },
] as const satisfies ReadonlyArray<{ id: string; title: string; social: SocialKey }>;

const GROUP_SECTIONS = [
  { id: "brand-social-buttons-group", title: "Brand social buttons group", snippet: CODE.groupBrand, theme: "brand" as const, iconOnly: false },
  { id: "icons-brand-social-buttons-group", title: "Icons brand social buttons group", snippet: CODE.groupIconsBrand, theme: "brand", iconOnly: true },
  { id: "color-social-buttons-group", title: "Color social buttons group", snippet: CODE.groupColor, theme: "color", iconOnly: false },
  { id: "icons-color-social-buttons-group", title: "Icons color social buttons group", snippet: CODE.groupIconsColor, theme: "color", iconOnly: true },
  { id: "gray-social-buttons-group", title: "Gray social buttons group", snippet: CODE.groupGray, theme: "gray", iconOnly: false },
] as const;

const TOC = [
  { id: "social-buttons-example", label: "Social buttons example" },
  { id: "social-buttons-examples-intro", label: "Social button examples" },
  ...PROVIDER_SECTIONS.map((s) => ({ id: s.id, label: s.title })),
  { id: "social-button-groups-intro", label: "Social button group examples" },
  ...GROUP_SECTIONS.map((g) => ({ id: g.id, label: g.title })),
] as const;

const Row: FC<{ children: ReactNode }> = ({ children }) => (
  <div className={`flex w-full ${FLEX_ROW_WRAP}`}>{children}</div>
);

const DocsIntro: FC<{ id: string; title: string; description: string }> = ({ id, title, description }) => (
  <section id={id} className="scroll-mt-20 pb-2">
    <h2 className="text-primary text-lg font-semibold md:text-xl">
      <SectionTitle className="text-lg font-semibold md:text-xl">{title}</SectionTitle>
    </h2>
    <p className="text-md text-tertiary mt-2 max-w-3xl">{description}</p>
  </section>
);

const HeroRow: FC = () => (
  <Row>
    {SOCIAL_GAF.map((s) => (
      <SocialButton key={s} social={s} theme="brand">
        {LABEL[s]}
      </SocialButton>
    ))}
  </Row>
);

const SocialSizeRow: FC<{ social: SocialKey }> = ({ social }) => {
  const text = LABEL[social];
  return (
    <Row>
      {SIZE_ROW.map((size) => (
        <SocialButton key={size} social={social} size={size} theme="brand">
          {text}
        </SocialButton>
      ))}
    </Row>
  );
};

const GroupRow: FC<{ theme: "brand" | "color" | "gray"; iconOnly: boolean }> = ({ theme, iconOnly }) => (
  <Row>
    {SOCIAL_GAF.map((s) =>
      iconOnly ? (
        <SocialButton key={s} social={s} theme={theme} aria-label={LABEL[s]} />
      ) : (
        <SocialButton key={s} social={s} theme={theme}>
          {LABEL[s]}
        </SocialButton>
      ),
    )}
  </Row>
);

const SocialButtonsDocsPage: FC = () => (
  <div className="bg-primary min-h-screen font-sans" data-codex-docs-social-buttons>
    <StorybookRootHeaderPortal>
      <DocsPageBreadcrumb currentLabel="Social buttons" />
    </StorybookRootHeaderPortal>
    <StorybookSbdocsTocPortal>
      <OnThisPageNav items={TOC} />
    </StorybookSbdocsTocPortal>

    <main className="relative mx-auto flex w-full max-w-304 min-w-0 flex-1 flex-col">
      <div className="text-tertiary w-full min-w-0">
        <div className="mb-10">
          <div className="pb-3">
            <h1 className="text-primary md:text-display-xs max-w-3xl text-xl font-semibold">Social button components</h1>
          </div>
          <p className="text-md text-tertiary mt-0 max-w-3xl whitespace-pre-line">
            React social button components built for modern applications and websites. Built on React Aria and styled with Tailwind CSS.
          </p>
        </div>

        <DocsSection
          id="social-buttons-example"
          title="Social buttons example"
          code={CODE.hero}
          sectionClassName={DOCS_SECTION_HERO_CLASS}
          dataPreview
          previewClassName={DOCS_PREVIEW_HERO_SURFACE_CLASS}
        >
          <HeroRow />
        </DocsSection>

        <DocsIntro
          id="social-buttons-examples-intro"
          title="Social button examples"
          description="Below are examples and variations of this social button component:"
        />

        {PROVIDER_SECTIONS.map(({ id, title, social }) => (
          <DocsSection key={id} id={id} title={title} code={CODE[social]} previewClassName={SECTION_PREVIEW}>
            <SocialSizeRow social={social} />
          </DocsSection>
        ))}

        <DocsIntro
          id="social-button-groups-intro"
          title="Social button group examples"
          description="Below are examples and variations of this social button group component:"
        />

        {GROUP_SECTIONS.map(({ id, title, snippet, theme, iconOnly }) => (
          <DocsSection key={id} id={id} title={title} code={snippet} previewClassName={SECTION_PREVIEW}>
            <GroupRow theme={theme} iconOnly={iconOnly} />
          </DocsSection>
        ))}
      </div>
    </main>
  </div>
);

const meta = {
  title: "Base components/Social buttons",
  component: SocialButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: SocialButtonsDocsPage,
    },
  },
} satisfies Meta<typeof SocialButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  tags: ["!dev"],
  name: "Social buttons",
  args: {
    social: "google",
    theme: "brand",
    children: LABEL.google,
  },
  render: () => (
    <div className="bg-primary p-6 font-sans">
      <HeroRow />
    </div>
  ),
};
