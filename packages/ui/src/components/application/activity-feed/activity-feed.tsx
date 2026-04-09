"use client";

import type { ComponentPropsWithRef, ReactNode } from "react";
import { Avatar } from "@/components/base/avatar/avatar";
import { cx } from "@/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ActivityFeedSpacing = "divided" | "connected" | "spaced";

export interface ActivityFeedUser {
  name: string;
  avatarUrl?: string;
  href?: string;
  status?: "online" | "offline";
}

export interface ActivityFeedAttachment {
  type?: string;
  name: string;
  size?: string;
}

export interface ActivityFeedItemData {
  id: string;
  user: ActivityFeedUser;
  /** Primary action text, e.g. "commented on" */
  action?: string;
  /** Target of the action, e.g. the document title */
  target?: string;
  targetHref?: string;
  /** Optional body content (e.g. message text or comment body) */
  content?: ReactNode;
  date: string;
  unseen?: boolean;
  attachment?: ActivityFeedAttachment;
}

// ---------------------------------------------------------------------------
// FeedItem
// ---------------------------------------------------------------------------

interface FeedItemProps {
  item: ActivityFeedItemData;
  spacing: ActivityFeedSpacing;
  /** Show vertical connector line below avatar (for "connected" spacing) */
  showConnector?: boolean;
}

const FeedItem = ({ item, spacing, showConnector }: FeedItemProps) => {
  const { user, action, target, targetHref, content, date, unseen, attachment } = item;

  return (
    <li
      className={cx(
        "flex gap-3",
        spacing === "divided" && "py-4 first:pt-0 last:pb-0",
        spacing === "connected" && "relative pb-6 last:pb-0",
        spacing === "spaced" && "py-3 first:pt-0 last:pb-0",
        unseen && "before:bg-brand-solid before:absolute before:left-0 before:top-1/2 before:size-1.5 before:-translate-y-1/2 before:rounded-full",
      )}
    >
      {/* Avatar column */}
      <div className="relative flex shrink-0 flex-col items-center">
        <Avatar
          size="md"
          src={user.avatarUrl}
          initials={user.name?.slice(0, 2).toUpperCase()}
          status={user.status}
        />
        {showConnector && spacing === "connected" && (
          <div className="bg-border-secondary absolute top-10 bottom-0 w-px" />
        )}
      </div>

      {/* Content column */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-1 gap-y-0.5">
          {user.href ? (
            <a href={user.href} className="text-sm font-semibold text-secondary hover:underline">
              {user.name}
            </a>
          ) : (
            <span className="text-sm font-semibold text-secondary">{user.name}</span>
          )}

          {action && <span className="text-sm text-tertiary">{action}</span>}

          {target && (
            targetHref ? (
              <a href={targetHref} className="text-sm font-semibold text-secondary hover:underline">
                {target}
              </a>
            ) : (
              <span className="text-sm font-semibold text-secondary">{target}</span>
            )
          )}

          <span className="ml-auto shrink-0 text-xs text-quaternary">{date}</span>
        </div>

        {content && (
          <div className="mt-1 text-sm text-tertiary">{content}</div>
        )}

        {attachment && (
          <div className="ring-secondary mt-2 flex items-center gap-2 rounded-lg px-3 py-2 ring-1">
            <span className="text-xs font-medium text-secondary">{attachment.name}</span>
            {attachment.size && (
              <span className="text-xs text-quaternary">{attachment.size}</span>
            )}
          </div>
        )}
      </div>
    </li>
  );
};

// ---------------------------------------------------------------------------
// MessageItem — chat-style feed variant
// ---------------------------------------------------------------------------

interface MessageItemProps {
  item: ActivityFeedItemData;
  spacing: ActivityFeedSpacing;
  showConnector?: boolean;
}

const MessageItem = ({ item, spacing, showConnector }: MessageItemProps) => {
  const { user, content, date, unseen } = item;

  return (
    <li
      className={cx(
        "flex gap-3",
        spacing === "divided" && "py-4 first:pt-0 last:pb-0",
        spacing === "connected" && "relative pb-6 last:pb-0",
        spacing === "spaced" && "py-3 first:pt-0 last:pb-0",
      )}
    >
      <div className="relative flex shrink-0 flex-col items-center">
        <Avatar
          size="md"
          src={user.avatarUrl}
          initials={user.name?.slice(0, 2).toUpperCase()}
          status={user.status}
        />
        {showConnector && spacing === "connected" && (
          <div className="bg-border-secondary absolute top-10 bottom-0 w-px" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          {user.href ? (
            <a href={user.href} className="text-sm font-semibold text-secondary hover:underline">
              {user.name}
            </a>
          ) : (
            <span className="text-sm font-semibold text-secondary">{user.name}</span>
          )}
          <span className="text-xs text-quaternary">{date}</span>
          {unseen && <span className="bg-brand-solid ml-auto size-2 rounded-full" />}
        </div>

        {content && (
          <div className="bg-secondary rounded-lg rounded-tl-none px-3.5 py-2.5 text-sm text-secondary">
            {content}
          </div>
        )}
      </div>
    </li>
  );
};

// ---------------------------------------------------------------------------
// ActivityFeed root
// ---------------------------------------------------------------------------

interface ActivityFeedRootProps extends ComponentPropsWithRef<"ul"> {
  items: ActivityFeedItemData[];
  spacing?: ActivityFeedSpacing;
  /** Use message-style items instead of action-style items */
  variant?: "feed" | "messages";
}

const ActivityFeedRoot = ({
  items,
  spacing = "divided",
  variant = "feed",
  className,
  ...props
}: ActivityFeedRootProps) => {
  return (
    <ul
      {...props}
      className={cx(
        "w-full",
        spacing === "divided" && "divide-y divide-secondary",
        className,
      )}
    >
      {items.map((item, index) => {
        const showConnector = index < items.length - 1;
        return variant === "messages" ? (
          <MessageItem key={item.id} item={item} spacing={spacing} showConnector={showConnector} />
        ) : (
          <FeedItem key={item.id} item={item} spacing={spacing} showConnector={showConnector} />
        );
      })}
    </ul>
  );
};

export const ActivityFeed = ActivityFeedRoot as typeof ActivityFeedRoot & {
  Item: typeof FeedItem;
  MessageItem: typeof MessageItem;
};

ActivityFeed.Item = FeedItem;
ActivityFeed.MessageItem = MessageItem;
