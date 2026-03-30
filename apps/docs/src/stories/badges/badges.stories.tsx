import type { FC } from "react";
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
import { CODEX_DOCS_AVATAR_SRC } from "../_docs/docs-assets";
import {
  DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK,
  DOCS_SECTION_HERO_CLASS,
  DocsSection,
} from "../_docs/untitled-docs-preview-code";
import { OnThisPageNav, StorybookRootHeaderPortal, StorybookSbdocsTocPortal } from "../_docs/untitled-docs-scaffold";

const CODEX_DOCS_BADGE_LABEL = "Label";

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
            sectionClassName={DOCS_SECTION_HERO_CLASS}
            dataPreview
            previewClassName={DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK}
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

