import { ActivityFeed } from "@opus2-platform/codex";
import type { ActivityFeedItemData } from "@opus2-platform/codex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK,
  DOCS_SECTION_HERO_CLASS,
  DocsSection,
} from "../_docs/docs-preview-code";
import { DocsPageBreadcrumb } from "../_docs/docs-page-breadcrumb";
import { OnThisPageNav, StorybookRootHeaderPortal, StorybookSbdocsTocPortal } from "../_docs/docs-scaffold";
import { CODEX_DOCS_AVATAR_SRC } from "../_docs/docs-assets";
import { ApplicationUiOverview } from "../_docs/application-ui-overview";

const ACTIVITY_FEED_TOC = [
  { id: "activity-feed-overview", label: "Overview" },
  { id: "divided", label: "Divided" },
  { id: "connected", label: "Connected" },
  { id: "spaced", label: "Spaced" },
  { id: "with-content", label: "With content" },
  { id: "with-attachment", label: "With attachment" },
  { id: "messages", label: "Messages" },
  { id: "with-unseen", label: "With unseen" },
] as const;

const demoItems: ActivityFeedItemData[] = [
  {
    id: "1",
    user: { name: "Gokul Krishnan", avatarUrl: CODEX_DOCS_AVATAR_SRC, status: "online" },
    action: "commented on",
    target: "Brand guidelines",
    targetHref: "#",
    date: "2h ago",
  },
  {
    id: "2",
    user: { name: "Lana Steiner", avatarUrl: CODEX_DOCS_AVATAR_SRC },
    action: "uploaded",
    target: "Design system v2.pdf",
    targetHref: "#",
    date: "4h ago",
  },
  {
    id: "3",
    user: { name: "Demi Wilkinson", avatarUrl: CODEX_DOCS_AVATAR_SRC },
    action: "invited you to",
    target: "Project Alpha",
    targetHref: "#",
    date: "Yesterday",
  },
];

const demoItemsWithContent: ActivityFeedItemData[] = [
  {
    id: "1",
    user: { name: "Gokul Krishnan", avatarUrl: CODEX_DOCS_AVATAR_SRC, status: "online" },
    action: "commented on",
    target: "Brand guidelines",
    targetHref: "#",
    content: "Great work on the latest iteration! The color palette looks much more cohesive now.",
    date: "2h ago",
  },
  {
    id: "2",
    user: { name: "Lana Steiner", avatarUrl: CODEX_DOCS_AVATAR_SRC },
    action: "left a note on",
    target: "Homepage design",
    content: "I have a few suggestions for the hero section. Let me know when you're free to chat.",
    date: "4h ago",
  },
];

const demoItemsWithAttachment: ActivityFeedItemData[] = [
  {
    id: "1",
    user: { name: "Gokul Krishnan", avatarUrl: CODEX_DOCS_AVATAR_SRC },
    action: "uploaded",
    target: undefined,
    content: "Here is the latest design file for your review.",
    attachment: { name: "Brand guidelines v3.fig", size: "4.2 MB" },
    date: "2h ago",
  },
  {
    id: "2",
    user: { name: "Lana Steiner", avatarUrl: CODEX_DOCS_AVATAR_SRC },
    action: "shared",
    target: undefined,
    attachment: { name: "Component library.pdf", size: "2.1 MB" },
    date: "Yesterday",
  },
];

const demoMessages: ActivityFeedItemData[] = [
  {
    id: "1",
    user: { name: "Gokul Krishnan", avatarUrl: CODEX_DOCS_AVATAR_SRC, status: "online" },
    content: "Hey! I just pushed the latest changes to the repo. Can you review when you get a chance?",
    date: "2:30 PM",
  },
  {
    id: "2",
    user: { name: "Lana Steiner", avatarUrl: CODEX_DOCS_AVATAR_SRC },
    content: "Sure, I'll take a look this afternoon. Thanks for the heads up!",
    date: "2:45 PM",
  },
  {
    id: "3",
    user: { name: "Demi Wilkinson", avatarUrl: CODEX_DOCS_AVATAR_SRC },
    content: "I left some comments on the PR. Nothing major, just a few small tweaks.",
    date: "3:10 PM",
    unseen: true,
  },
];

const ActivityFeedDocsPage = () => {
  return (
    <div className="docs-sbdocs-with-toc-layout">
      <StorybookRootHeaderPortal>
        <DocsPageBreadcrumb catalog="application" currentLabel="Activity feed" />
      </StorybookRootHeaderPortal>
      <StorybookSbdocsTocPortal>
        <OnThisPageNav items={ACTIVITY_FEED_TOC} />
      </StorybookSbdocsTocPortal>

      <main className="docs-sbdocs-content typography">
        <div id="activity-feed-overview" className={DOCS_SECTION_HERO_CLASS}>
          <h1 className="docs-h1">Activity feed</h1>
          <p>
            Chronological events, comments, or messages. From <code className="text-sm">@opus2-platform/codex</code>, compose <code className="text-sm">ActivityFeed</code>{" "}
            with <code className="text-sm">items</code>, <code className="text-sm">spacing</code>, and optional <code className="text-sm">variant="messages"</code> for
            chat-style rows.
          </p>
          <ApplicationUiOverview
            items={[
              {
                label: "Spacing",
                children: (
                  <>
                    Use <code className="text-xs">divided</code>, <code className="text-xs">connected</code>, or <code className="text-xs">spaced</code> to mirror
                    list density and connector lines.
                  </>
                ),
              },
              {
                label: "Content",
                children: (
                  <>
                    Optional body copy, file attachments, and <code className="text-xs">unseen</code> emphasis on new items.
                  </>
                ),
              },
              {
                label: "Avatars",
                children: (
                  <>
                    Pass <code className="text-xs">user.avatarUrl</code> and <code className="text-xs">status</code> for leading avatars and presence.
                  </>
                ),
              },
            ]}
          />
          <div className={DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK}>
            <div className="w-full max-w-md">
              <ActivityFeed items={demoItems} spacing="divided" />
            </div>
          </div>
        </div>

        <div className="docs-sections-wrap">
          <DocsSection
            id="divided"
            title="Divided"
            code={`import { ActivityFeed } from "@opus2-platform/codex";\n\n<ActivityFeed items={items} spacing="divided" />`}
          >
            <div className="w-full max-w-md">
              <ActivityFeed items={demoItems} spacing="divided" />
            </div>
          </DocsSection>

          <DocsSection
            id="connected"
            title="Connected"
            code={`import { ActivityFeed } from "@opus2-platform/codex";\n\n<ActivityFeed items={items} spacing="connected" />`}
          >
            <div className="w-full max-w-md">
              <ActivityFeed items={demoItems} spacing="connected" />
            </div>
          </DocsSection>

          <DocsSection
            id="spaced"
            title="Spaced"
            code={`import { ActivityFeed } from "@opus2-platform/codex";\n\n<ActivityFeed items={items} spacing="spaced" />`}
          >
            <div className="w-full max-w-md">
              <ActivityFeed items={demoItems} spacing="spaced" />
            </div>
          </DocsSection>

          <DocsSection
            id="with-content"
            title="With content"
            code={`import { ActivityFeed } from "@opus2-platform/codex";\n\n<ActivityFeed items={itemsWithContent} spacing="divided" />`}
          >
            <div className="w-full max-w-md">
              <ActivityFeed items={demoItemsWithContent} spacing="divided" />
            </div>
          </DocsSection>

          <DocsSection
            id="with-attachment"
            title="With attachment"
            code={`import { ActivityFeed } from "@opus2-platform/codex";\n\n<ActivityFeed items={itemsWithAttachment} spacing="divided" />`}
          >
            <div className="w-full max-w-md">
              <ActivityFeed items={demoItemsWithAttachment} spacing="divided" />
            </div>
          </DocsSection>

          <DocsSection
            id="messages"
            title="Messages"
            code={`import { ActivityFeed } from "@opus2-platform/codex";\n\n<ActivityFeed items={messages} spacing="spaced" variant="messages" />`}
          >
            <div className="w-full max-w-md">
              <ActivityFeed items={demoMessages} spacing="spaced" variant="messages" />
            </div>
          </DocsSection>

          <DocsSection
            id="with-unseen"
            title="With unseen"
            code={`import { ActivityFeed } from "@opus2-platform/codex";\n\n// Add unseen: true to any item\n<ActivityFeed items={items} spacing="divided" />`}
          >
            <div className="w-full max-w-md relative pl-4">
              <ActivityFeed
                items={[
                  { id: "1", user: { name: "Gokul Krishnan", avatarUrl: CODEX_DOCS_AVATAR_SRC, status: "online" }, action: "commented on", target: "Brand guidelines", targetHref: "#", date: "2h ago", unseen: true },
                  { id: "2", user: { name: "Lana Steiner", avatarUrl: CODEX_DOCS_AVATAR_SRC }, action: "uploaded", target: "Design system v2.pdf", targetHref: "#", date: "4h ago" },
                  { id: "3", user: { name: "Demi Wilkinson", avatarUrl: CODEX_DOCS_AVATAR_SRC }, action: "invited you to", target: "Project Alpha", targetHref: "#", date: "Yesterday", unseen: true },
                ]}
                spacing="divided"
              />
            </div>
          </DocsSection>
        </div>
      </main>
    </div>
  );
};

const meta = {
  title: "Application UI/Activity feed",
  component: ActivityFeed,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: ActivityFeedDocsPage,
    },
  },
} satisfies Meta<typeof ActivityFeed>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Activity feed",
  args: {
    items: demoItems,
    spacing: "divided",
  },
};
