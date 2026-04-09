"use client";

import type { ComponentPropsWithRef, FC, ReactNode } from "react";
import { isValidElement } from "react";
import { X } from "@opus2-platform/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { cx, isReactComponent } from "@/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type NotificationVariant = "base" | "avatar" | "icon" | "featured-icon";

export interface NotificationUser {
  name: string;
  avatarUrl?: string;
}

export interface NotificationAction {
  label: string;
  onClick?: () => void;
  href?: string;
  color?: "brand" | "default";
}

export interface NotificationItemData {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  date?: string;
  unread?: boolean;
  user?: NotificationUser;
  icon?: FC<{ className?: string }> | ReactNode;
  actions?: NotificationAction[];
}

// ---------------------------------------------------------------------------
// NotificationItem — single notification row
// ---------------------------------------------------------------------------

interface NotificationItemProps {
  item: NotificationItemData;
  variant?: NotificationVariant;
  onDismiss?: (id: string) => void;
  showDivider?: boolean;
}

const NotificationItem = ({ item, variant = "base", onDismiss, showDivider }: NotificationItemProps) => {
  const { title, description, date, unread, user, icon, actions } = item;

  return (
    <div
      className={cx(
        "relative flex gap-3 px-4 py-4",
        unread && "bg-brand-primary_alt",
        showDivider && "border-b border-secondary",
      )}
    >
      {/* Unread dot */}
      {unread && (
        <div className="absolute left-4 top-5 size-2 rounded-full bg-brand-solid" />
      )}

      {/* Leading visual */}
      {(variant === "avatar" && user) && (
        <div className={cx("shrink-0", unread && "ml-4")}>
          <Avatar
            size="md"
            src={user.avatarUrl}
            initials={user.name?.slice(0, 2).toUpperCase()}
          />
        </div>
      )}

      {(variant === "icon" || variant === "featured-icon") && icon && (
        <div className={cx("shrink-0", unread && "ml-4")}>
          <NotificationIconSlot icon={icon} variant={variant} />
        </div>
      )}

      {/* Content */}
      <div className={cx("min-w-0 flex-1", unread && variant === "base" && "ml-4")}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <p className="text-sm font-semibold text-secondary">{title}</p>
            {description && (
              <p className="mt-0.5 text-sm text-tertiary">{description}</p>
            )}
            {date && (
              <p className="mt-1 text-xs text-quaternary">{date}</p>
            )}
          </div>
          {onDismiss && (
            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={() => onDismiss(item.id)}
              className="shrink-0 cursor-pointer rounded-md p-0.5 text-fg-quaternary transition duration-100 ease-linear hover:text-fg-secondary focus:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {actions && actions.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-3">
            {actions.map((action, i) =>
              action.href ? (
                <a
                  key={i}
                  href={action.href}
                  className={cx(
                    "text-sm font-semibold transition duration-100 ease-linear",
                    action.color === "brand" ? "text-brand-secondary hover:text-brand-secondary_hover" : "text-secondary hover:text-secondary_hover",
                  )}
                >
                  {action.label}
                </a>
              ) : (
                <button
                  key={i}
                  type="button"
                  onClick={action.onClick}
                  className={cx(
                    "cursor-pointer text-sm font-semibold transition duration-100 ease-linear",
                    action.color === "brand" ? "text-brand-secondary hover:text-brand-secondary_hover" : "text-secondary hover:text-secondary_hover",
                  )}
                >
                  {action.label}
                </button>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// NotificationIconSlot — renders FC or element
// ---------------------------------------------------------------------------

const NotificationIconSlot = ({
  icon,
  variant,
}: {
  icon: FC<{ className?: string }> | ReactNode;
  variant: NotificationVariant;
}) => {
  const IconComponent = icon as FC<{ className?: string }>;
  if (variant === "featured-icon") {
    return (
      <div className="flex size-10 items-center justify-center rounded-xl border border-secondary bg-primary shadow-xs">
        {isReactComponent(icon) && <IconComponent className="size-5 text-fg-secondary" />}
        {isValidElement(icon) && icon}
      </div>
    );
  }
  // plain icon
  return (
    <div className="flex size-10 items-center justify-center">
      {isReactComponent(icon) && <IconComponent className="size-5 text-fg-secondary" />}
      {isValidElement(icon) && icon}
    </div>
  );
};

// ---------------------------------------------------------------------------
// NotificationList — renders a list of notifications
// ---------------------------------------------------------------------------

interface NotificationListProps extends ComponentPropsWithRef<"div"> {
  items: NotificationItemData[];
  variant?: NotificationVariant;
  onDismiss?: (id: string) => void;
}

const NotificationList = ({ items, variant = "base", onDismiss, className, ...props }: NotificationListProps) => (
  <div {...props} className={cx("w-full divide-y divide-secondary", className)}>
    {items.map((item, index) => (
      <NotificationItem
        key={item.id}
        item={item}
        variant={variant}
        onDismiss={onDismiss}
        showDivider={false}
      />
    ))}
  </div>
);

// ---------------------------------------------------------------------------
// NotificationDropdown — panel with header + list
// ---------------------------------------------------------------------------

interface NotificationDropdownProps extends ComponentPropsWithRef<"div"> {
  items: NotificationItemData[];
  variant?: NotificationVariant;
  title?: string;
  onDismiss?: (id: string) => void;
  onMarkAllRead?: () => void;
  onViewAll?: () => void;
  viewAllHref?: string;
}

const NotificationDropdown = ({
  items,
  variant = "base",
  title = "Notifications",
  onDismiss,
  onMarkAllRead,
  onViewAll,
  viewAllHref,
  className,
  ...props
}: NotificationDropdownProps) => (
  <div
    {...props}
    className={cx(
      "w-full max-w-sm overflow-hidden rounded-xl border border-secondary bg-primary shadow-lg",
      className,
    )}
  >
    {/* Header */}
    <div className="flex items-center justify-between border-b border-secondary px-4 py-3">
      <p className="text-sm font-semibold text-secondary">{title}</p>
      {onMarkAllRead && (
        <button
          type="button"
          onClick={onMarkAllRead}
          className="cursor-pointer text-xs font-semibold text-brand-secondary transition duration-100 ease-linear hover:text-brand-secondary_hover"
        >
          Mark all as read
        </button>
      )}
    </div>

    {/* Items */}
    <NotificationList items={items} variant={variant} onDismiss={onDismiss} />

    {/* Footer */}
    {(onViewAll || viewAllHref) && (
      <div className="border-t border-secondary px-4 py-3 text-center">
        {viewAllHref ? (
          <a href={viewAllHref} className="text-sm font-semibold text-brand-secondary transition duration-100 ease-linear hover:text-brand-secondary_hover">
            View all notifications
          </a>
        ) : (
          <button
            type="button"
            onClick={onViewAll}
            className="cursor-pointer text-sm font-semibold text-brand-secondary transition duration-100 ease-linear hover:text-brand-secondary_hover"
          >
            View all notifications
          </button>
        )}
      </div>
    )}
  </div>
);

// ---------------------------------------------------------------------------
// Compound export
// ---------------------------------------------------------------------------

export const Notifications = NotificationDropdown as typeof NotificationDropdown & {
  List: typeof NotificationList;
  Item: typeof NotificationItem;
};

Notifications.List = NotificationList;
Notifications.Item = NotificationItem;
