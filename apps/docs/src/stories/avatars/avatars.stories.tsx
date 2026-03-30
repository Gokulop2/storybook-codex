import type { ComponentProps, FC } from "react";
import { Avatar, AvatarAddButton, AvatarCompanyIcon, AvatarLabelGroup, AvatarProfilePhoto } from "@opus2-platform/codex";
import { User01 } from "@opus2-platform/icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CODEX_DOCS_AVATAR_SRC } from "../_docs/docs-assets";
import {
  DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK,
  DOCS_SECTION_HERO_CLASS,
  DocsSection,
  SectionTitle,
} from "../_docs/docs-preview-code";
import { DocsPageBreadcrumb } from "../_docs/docs-page-breadcrumb";
import { OnThisPageNav, StorybookRootHeaderPortal, StorybookSbdocsTocPortal } from "../_docs/docs-scaffold";

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

const DOC_CODE_CLASS = "text-secondary font-mono text-sm";

/** `AvatarLabelGroup` defaults to `flex-1` for horizontal toolbars; in docs `flex-col` previews that steals vertical space and breaks layout. */
const AVATAR_LABEL_GROUP_IN_DOCS_CLASS = "flex-none shrink-0";

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
      <DocsPageBreadcrumb currentLabel="Avatars" />
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
          sectionClassName={DOCS_SECTION_HERO_CLASS}
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
  title: "Base components/Avatars",
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
  tags: ["!dev"],
  name: "Avatars",
};
