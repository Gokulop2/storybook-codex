"use client";

import type { FC } from "react";
import { FileIcon } from "@untitledui/file-icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils";

export interface ActivityFeedItemData {
    id: string | number;
    user: {
        name: string;
        avatarUrl?: string;
        status?: "online" | "offline";
    };
    /** Verb describing what the user did (e.g. "commented on"). */
    action?: string;
    /** Target resource the action was performed on. */
    target?: string;
    /** Optional href for the target resource. */
    targetHref?: string;
    /** Optional body text / comment content. */
    content?: string;
    /** Optional file attachment. */
    attachment?: { name: string; size: string; type?: string };
    date?: string;
    unseen?: boolean;
}

interface ActivityFeedItemProps extends ActivityFeedItemData {
    showConnector?: boolean;
    variant?: "default" | "messages";
}

const ActivityFeedItem: FC<ActivityFeedItemProps> = ({ user, action, target, targetHref, content, attachment, date, unseen, showConnector, variant = "default" }) => {
    const isMessage = variant === "messages";

    return (
        <article className="relative flex gap-3">
            {unseen && (
                <span className="absolute top-1 -left-4 size-2 rounded-full bg-fg-success-secondary" />
            )}
            <div className="flex shrink-0 flex-col items-center">
                <Avatar src={user.avatarUrl} alt={user.name} size="md" status={user.status} />
                {showConnector && (
                    <div className="relative my-1 flex h-full w-full justify-center overflow-hidden">
                        <svg className="absolute" width="2.4">
                            <line
                                x1="1.2"
                                y1="1.2"
                                x2="1.2"
                                y2="100%"
                                className="stroke-border-primary"
                                stroke="currentColor"
                                strokeWidth="2.4"
                                strokeDasharray="0,6"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                )}
            </div>
            <div className={cx("flex flex-1 flex-col gap-2", showConnector && "pb-6")}>
                <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-semibold text-secondary">{user.name}</span>
                    {date && <time className="text-xs text-tertiary">{date}</time>}
                </div>
                {(action || target) && (
                    <p className="text-sm text-tertiary">
                        {action}{action && target ? " " : ""}
                        {target && targetHref ? (
                            <Button href={targetHref} color="link-color" size="sm" className="inline whitespace-normal text-sm font-medium">
                                {target}
                            </Button>
                        ) : (
                            target
                        )}
                    </p>
                )}
                {content && (
                    isMessage ? (
                        <div className="rounded-lg rounded-tl-none bg-secondary p-3 ring-1 ring-secondary ring-inset">
                            <p className="text-sm text-secondary">{content}</p>
                        </div>
                    ) : (
                        <p className="text-sm text-tertiary">{content}</p>
                    )
                )}
                {attachment && (
                    <div className="flex items-center gap-3 rounded-lg border border-secondary p-3">
                        <FileIcon type={(attachment.type as "pdf" | "jpg" | "txt" | "mp4") ?? "txt"} theme="light" className="size-8 dark:hidden" />
                        <FileIcon type={(attachment.type as "pdf" | "jpg" | "txt" | "mp4") ?? "txt"} theme="dark" className="size-8 not-dark:hidden" />
                        <div>
                            <p className="text-sm font-medium text-secondary">{attachment.name}</p>
                            <p className="text-xs text-tertiary">{attachment.size}</p>
                        </div>
                    </div>
                )}
            </div>
        </article>
    );
};

export interface ActivityFeedProps {
    items: ActivityFeedItemData[];
    /** Visual spacing between items. */
    spacing?: "divided" | "connected" | "spaced";
    /** "messages" renders content in a chat bubble style. */
    variant?: "default" | "messages";
    className?: string;
}

export const ActivityFeed: FC<ActivityFeedProps> = ({ items, spacing = "divided", variant = "default", className }) => {
    const isDivided = spacing === "divided";
    const isConnected = spacing === "connected";

    return (
        <div className={cx("flex flex-col", isDivided && "divide-y divide-secondary", !isDivided && !isConnected && "gap-6", className)}>
            {items.map((item, index) => (
                <div key={item.id} className={cx(isDivided && "py-4 first:pt-0 last:pb-0")}>
                    <ActivityFeedItem
                        {...item}
                        showConnector={isConnected && index !== items.length - 1}
                        variant={variant}
                    />
                </div>
            ))}
        </div>
    );
};
