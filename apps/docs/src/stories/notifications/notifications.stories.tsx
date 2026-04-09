import { Notifications } from "@opus2-platform/codex";
import type { NotificationItemData } from "@opus2-platform/codex";
import { Bell01, MessageCircle01, CheckCircle } from "@opus2-platform/icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK,
  DOCS_SECTION_HERO_CLASS,
  DocsSection,
} from "../_docs/docs-preview-code";
import { DocsPageBreadcrumb } from "../_docs/docs-page-breadcrumb";
import { OnThisPageNav, StorybookRootHeaderPortal, StorybookSbdocsTocPortal } from "../_docs/docs-scaffold";
import { CODEX_DOCS_AVATAR_SRC } from "../_docs/docs-assets";

const NOTIFICATIONS_TOC = [
  { id: "notification-examples", label: "Notification examples" },
  { id: "base", label: "Base" },
  { id: "with-avatar", label: "With avatar" },
  { id: "with-icon", label: "With icon" },
  { id: "with-featured-icon", label: "With featured icon" },
  { id: "with-actions", label: "With actions" },
  { id: "with-unread", label: "With unread" },
  { id: "dropdown-panel", label: "Dropdown panel" },
] as const;

const baseItems: NotificationItemData[] = [
  {
    id: "1",
    title: "New message from Olivia Rhye",
    description: "Hey, can you review the latest design files?",
    date: "2 min ago",
  },
  {
    id: "2",
    title: "Project Alpha was updated",
    description: "Lana Steiner made changes to the project settings.",
    date: "1h ago",
  },
  {
    id: "3",
    title: "Your export is ready",
    description: "The CSV export you requested is ready to download.",
    date: "3h ago",
  },
];

const avatarItems: NotificationItemData[] = [
  {
    id: "1",
    title: "Olivia Rhye commented on your post",
    description: "Great work on the latest iteration!",
    date: "2 min ago",
    user: { name: "Olivia Rhye", avatarUrl: CODEX_DOCS_AVATAR_SRC },
    unread: true,
  },
  {
    id: "2",
    title: "Lana Steiner invited you to a project",
    description: "You've been added to Project Alpha.",
    date: "1h ago",
    user: { name: "Lana Steiner", avatarUrl: CODEX_DOCS_AVATAR_SRC },
  },
];

const iconItems: NotificationItemData[] = [
  {
    id: "1",
    title: "New message received",
    description: "You have 3 unread messages.",
    date: "Just now",
    icon: MessageCircle01,
    unread: true,
  },
  {
    id: "2",
    title: "Task completed",
    description: "Your background task has finished.",
    date: "5 min ago",
    icon: CheckCircle,
  },
];

const actionItems: NotificationItemData[] = [
  {
    id: "1",
    title: "Olivia Rhye wants to join your team",
    description: "olivia@opus2.com",
    date: "2 min ago",
    user: { name: "Olivia Rhye", avatarUrl: CODEX_DOCS_AVATAR_SRC },
    actions: [
      { label: "Accept", color: "brand" },
      { label: "Decline", color: "default" },
    ],
  },
];

const NotificationsDocsPage = () => {
  return (
    <div className="docs-sbdocs-with-toc-layout">
      <StorybookRootHeaderPortal>
        <DocsPageBreadcrumb currentLabel="Notifications" />
      </StorybookRootHeaderPortal>
      <StorybookSbdocsTocPortal>
        <OnThisPageNav items={NOTIFICATIONS_TOC} />
      </StorybookSbdocsTocPortal>

      <main className="docs-sbdocs-content typography">
        <div id="notification-examples" className={DOCS_SECTION_HERO_CLASS}>
          <h1 className="docs-h1">Notifications</h1>
          <p>Notification panels display a list of system or user-driven alerts.</p>
          <div className={DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK}>
            <div className="w-full max-w-sm">
              <Notifications items={avatarItems} variant="avatar" title="Notifications" />
            </div>
          </div>
        </div>

        <div className="docs-sections-wrap">
          <DocsSection
            id="base"
            title="Base"
            code={`import { Notifications } from "@opus2-platform/codex";\n\n<Notifications items={items} />`}
          >
            <div className="w-full max-w-sm">
              <Notifications items={baseItems} />
            </div>
          </DocsSection>

          <DocsSection
            id="with-avatar"
            title="With avatar"
            code={`import { Notifications } from "@opus2-platform/codex";\n\n<Notifications items={items} variant="avatar" />`}
          >
            <div className="w-full max-w-sm">
              <Notifications items={avatarItems} variant="avatar" />
            </div>
          </DocsSection>

          <DocsSection
            id="with-icon"
            title="With icon"
            code={`import { Notifications } from "@opus2-platform/codex";\nimport { MessageCircle01, CheckCircle } from "@opus2-platform/icons";\n\n<Notifications items={items} variant="icon" />`}
          >
            <div className="w-full max-w-sm">
              <Notifications items={iconItems} variant="icon" />
            </div>
          </DocsSection>

          <DocsSection
            id="with-featured-icon"
            title="With featured icon"
            code={`import { Notifications } from "@opus2-platform/codex";\nimport { Bell01 } from "@opus2-platform/icons";\n\n<Notifications items={items} variant="featured-icon" />`}
          >
            <div className="w-full max-w-sm">
              <Notifications
                items={[
                  { id: "1", title: "New message received", description: "You have 3 unread messages.", date: "Just now", icon: Bell01, unread: true },
                  { id: "2", title: "Task completed", description: "Your background task has finished.", date: "5 min ago", icon: CheckCircle },
                ]}
                variant="featured-icon"
              />
            </div>
          </DocsSection>

          <DocsSection
            id="with-actions"
            title="With actions"
            code={`import { Notifications } from "@opus2-platform/codex";\n\n<Notifications\n  items={[\n    {\n      id: "1",\n      title: "Olivia Rhye wants to join your team",\n      user: { name: "Olivia Rhye" },\n      actions: [\n        { label: "Accept", color: "brand" },\n        { label: "Decline" },\n      ],\n    },\n  ]}\n  variant="avatar"\n/>`}
          >
            <div className="w-full max-w-sm">
              <Notifications items={actionItems} variant="avatar" />
            </div>
          </DocsSection>

          <DocsSection
            id="with-unread"
            title="With unread"
            code={`import { Notifications } from "@opus2-platform/codex";\n\n// Set unread: true on items to show the unread indicator\n<Notifications items={items} variant="avatar" />`}
          >
            <div className="w-full max-w-sm">
              <Notifications
                items={[
                  { id: "1", title: "Olivia Rhye commented on your post", description: "Great work on the latest iteration!", date: "2 min ago", user: { name: "Olivia Rhye", avatarUrl: CODEX_DOCS_AVATAR_SRC }, unread: true },
                  { id: "2", title: "Project Alpha was updated", description: "Lana Steiner made changes to the project settings.", date: "1h ago", unread: false },
                  { id: "3", title: "Your export is ready", description: "The CSV export you requested is ready to download.", date: "3h ago", unread: true },
                ]}
                variant="avatar"
              />
            </div>
          </DocsSection>

          <DocsSection
            id="dropdown-panel"
            title="Dropdown panel"
            code={`import { Notifications } from "@opus2-platform/codex";\n\n<Notifications\n  items={items}\n  variant="avatar"\n  title="Notifications"\n  onMarkAllRead={() => {}}\n  viewAllHref="#"\n/>`}
          >
            <div className="w-full max-w-sm">
              <Notifications
                items={avatarItems}
                variant="avatar"
                title="Notifications"
                onMarkAllRead={() => {}}
                viewAllHref="#"
              />
            </div>
          </DocsSection>
        </div>
      </main>
    </div>
  );
};

const meta = {
  title: "Application UI/Notifications",
  component: Notifications,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: NotificationsDocsPage,
    },
  },
} satisfies Meta<typeof Notifications>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  tags: ["!dev"],
  name: "Notifications",
  args: {
    items: avatarItems,
    variant: "avatar",
  },
};
