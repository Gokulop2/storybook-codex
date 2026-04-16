"use client";

import type { FC } from "react";
import { AlertCircle, CheckCircle, InfoCircle } from "@opus2-platform/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { cx } from "@/utils";

type NotificationActionColor = "brand" | "default" | "gray" | "error" | "warning" | "success";

interface NotificationAction {
  label: string;
  color?: NotificationActionColor;
  onClick?: () => void;
}

export interface NotificationItemData {
  id: string | number;
  title: string;
  description?: string;
  date?: string;
  unread?: boolean;
  user?: { name: string; avatarUrl?: string };
  icon?: FC<{ className?: string }>;
  actions?: NotificationAction[];
}

type NotificationVariant = "base" | "avatar" | "icon" | "featured-icon";

interface NotificationItemProps extends NotificationItemData {
  variant?: NotificationVariant;
}

const defaultIconMap: Record<string, FC<{ className?: string }>> = {
  default: InfoCircle,
  brand: InfoCircle,
  gray: InfoCircle,
  error: AlertCircle,
  warning: AlertCircle,
  success: CheckCircle,
};

const NotificationItem: FC<NotificationItemProps> = ({ title, description, date, unread, user, icon: Icon, actions, variant = "base" }) => {
  const DefaultIcon = (defaultIconMap.default ?? InfoCircle) as FC<{ className?: string }>;

  return (
    <div className={cx("relative flex gap-3 p-4", unread && "bg-brand-primary_alt")}>
      {unread && <span className="absolute top-4 left-1.5 size-2 rounded-full bg-fg-brand-primary" />}

      {/* Leading element */}
      {variant === "avatar" && user && <Avatar src={user.avatarUrl} alt={user.name} size="md" className="shrink-0" />}
      {variant === "icon" && (
        <div className="shrink-0">{Icon ? <Icon className="size-5 text-fg-secondary" /> : <DefaultIcon className="size-5 text-fg-secondary" />}</div>
      )}
      {variant === "featured-icon" && <FeaturedIcon icon={Icon ?? DefaultIcon} color="gray" theme="modern" size="sm" className="shrink-0" />}

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-secondary">{title}</p>
          {date && <time className="shrink-0 text-xs text-tertiary">{date}</time>}
        </div>
        {description && <p className="text-sm text-tertiary">{description}</p>}
        {actions && actions.length > 0 && (
          <div className="mt-2 flex gap-3">
            {actions.map((action) => (
              <Button key={action.label} size="sm" color={action.color === "brand" ? "link-color" : "link-gray"} onClick={action.onClick}>
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export interface NotificationsProps {
  items: NotificationItemData[];
  /** Visual treatment for the leading element of each item. */
  variant?: NotificationVariant;
  /** Optional panel title (renders header). */
  title?: string;
  /** Callback for "Mark all as read" button. */
  onMarkAllRead?: () => void;
  /** Href for a "View all" link. */
  viewAllHref?: string;
  className?: string;
}

export const Notifications: FC<NotificationsProps> = ({ items, variant = "base", title, onMarkAllRead, viewAllHref, className }) => {
  const hasHeader = title || onMarkAllRead;
  const hasFooter = viewAllHref;

  return (
    <div className={cx("overflow-hidden rounded-xl bg-primary shadow-lg ring-1 ring-secondary_alt", className)}>
      {hasHeader && (
        <div className="flex items-center justify-between border-b border-secondary px-4 py-3">
          {title && <p className="text-sm font-semibold text-primary">{title}</p>}
          {onMarkAllRead && (
            <Button size="xs" color="link-color" onClick={onMarkAllRead}>
              Mark all as read
            </Button>
          )}
        </div>
      )}

      <div className="divide-y divide-secondary">
        {items.map((item) => (
          <NotificationItem key={item.id} {...item} variant={variant} />
        ))}
      </div>

      {hasFooter && (
        <div className="border-t border-secondary px-4 py-3 text-center">
          <Button href={viewAllHref} size="sm" color="link-color">
            View all notifications
          </Button>
        </div>
      )}
    </div>
  );
};
