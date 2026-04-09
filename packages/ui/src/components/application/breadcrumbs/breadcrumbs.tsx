"use client";

import type { ComponentPropsWithRef, FC, ReactNode } from "react";
import { isValidElement } from "react";
import { ChevronRight, SlashDivider } from "@opus2-platform/icons";
import { cx, isReactComponent } from "@/utils";
import { Avatar } from "@/components/base/avatar/avatar";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type BreadcrumbSeparator = "chevron" | "slash";

// ---------------------------------------------------------------------------
// BreadcrumbItem
// ---------------------------------------------------------------------------

export interface BreadcrumbItemProps extends ComponentPropsWithRef<"li"> {
  /** Render as a link when provided. */
  href?: string;
  /** Whether this is the current / active crumb. */
  isCurrent?: boolean;
  children: ReactNode;
}

const BreadcrumbItem = ({ href, isCurrent, children, className, ...props }: BreadcrumbItemProps) => {
  const base = cx(
    "text-sm font-semibold transition duration-100 ease-linear",
    isCurrent ? "text-secondary" : "text-quaternary hover:text-secondary cursor-pointer",
  );

  return (
    <li {...props} className={cx("flex items-center", className)}>
      {href && !isCurrent ? (
        <a href={href} className={base} aria-current={undefined}>
          {children}
        </a>
      ) : (
        <span className={base} aria-current={isCurrent ? "page" : undefined}>
          {children}
        </span>
      )}
    </li>
  );
};

// ---------------------------------------------------------------------------
// BreadcrumbSep (internal separator)
// ---------------------------------------------------------------------------

const BreadcrumbSep = ({ separator = "chevron" }: { separator?: BreadcrumbSeparator }) => {
  const Icon = separator === "slash" ? SlashDivider : ChevronRight;
  return <Icon className="text-fg-quaternary mx-1 size-4 shrink-0" aria-hidden="true" />;
};

// ---------------------------------------------------------------------------
// Breadcrumbs (root — text variant)
// ---------------------------------------------------------------------------

export interface BreadcrumbsProps extends ComponentPropsWithRef<"nav"> {
  /** Separator style between crumbs. */
  separator?: BreadcrumbSeparator;
  children: ReactNode;
}

const BreadcrumbsRoot = ({ separator = "chevron", children, className, ...props }: BreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumb" {...props} className={cx("flex items-center", className)}>
      <ol className="flex flex-wrap items-center gap-0.5">{children}</ol>
    </nav>
  );
};

// ---------------------------------------------------------------------------
// BreadcrumbsWithLine — adds a left border line visual
// ---------------------------------------------------------------------------

const BreadcrumbsWithLine = ({ separator = "chevron", children, className, ...props }: BreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumb" {...props} className={cx("flex items-center", className)}>
      <ol className="border-secondary flex flex-wrap items-center gap-0.5 border-l pl-3">
        {children}
      </ol>
    </nav>
  );
};

// ---------------------------------------------------------------------------
// BreadcrumbButton — button-style crumb item
// ---------------------------------------------------------------------------

export interface BreadcrumbButtonItemProps extends ComponentPropsWithRef<"li"> {
  href?: string;
  isCurrent?: boolean;
  icon?: FC<{ className?: string }> | ReactNode;
  children: ReactNode;
}

const BreadcrumbButtonItem = ({ href, isCurrent, icon: Icon, children, className, ...props }: BreadcrumbButtonItemProps) => {
  const base = cx(
    "flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-semibold transition duration-100 ease-linear",
    isCurrent
      ? "bg-active text-secondary cursor-default"
      : "text-quaternary hover:bg-primary_hover hover:text-secondary cursor-pointer",
  );

  const content = (
    <>
      {isReactComponent(Icon) && <Icon className="size-4 shrink-0" />}
      {isValidElement(Icon) && Icon}
      {children}
    </>
  );

  return (
    <li {...props} className={cx("flex items-center", className)}>
      {href && !isCurrent ? (
        <a href={href} className={base}>
          {content}
        </a>
      ) : (
        <span className={base} aria-current={isCurrent ? "page" : undefined}>
          {content}
        </span>
      )}
    </li>
  );
};

const BreadcrumbsButton = ({ separator = "chevron", children, className, ...props }: BreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumb" {...props} className={cx("flex items-center", className)}>
      <ol className="flex flex-wrap items-center gap-0.5">{children}</ol>
    </nav>
  );
};

// ---------------------------------------------------------------------------
// BreadcrumbAccountItem — avatar + name crumb (account button variants)
// ---------------------------------------------------------------------------

export interface BreadcrumbAccountItemProps extends ComponentPropsWithRef<"li"> {
  href?: string;
  isCurrent?: boolean;
  /** Avatar image URL. */
  avatarSrc?: string;
  /** Avatar initials fallback. */
  avatarInitials?: string;
  /** Separator style shown after this item. */
  separator?: BreadcrumbSeparator;
  children: ReactNode;
}

const BreadcrumbAccountItem = ({
  href,
  isCurrent,
  avatarSrc,
  avatarInitials,
  children,
  className,
  ...props
}: BreadcrumbAccountItemProps) => {
  const base = cx(
    "flex items-center gap-1.5 rounded-md px-1.5 py-1 text-sm font-semibold transition duration-100 ease-linear",
    isCurrent
      ? "bg-active text-secondary cursor-default"
      : "text-quaternary hover:bg-primary_hover hover:text-secondary cursor-pointer",
  );

  const content = (
    <>
      {(avatarSrc || avatarInitials) && (
        <Avatar size="xxs" src={avatarSrc} initials={avatarInitials} contrastBorder={false} />
      )}
      {children}
    </>
  );

  return (
    <li {...props} className={cx("flex items-center", className)}>
      {href && !isCurrent ? (
        <a href={href} className={base}>
          {content}
        </a>
      ) : (
        <span className={base} aria-current={isCurrent ? "page" : undefined}>
          {content}
        </span>
      )}
    </li>
  );
};

// ---------------------------------------------------------------------------
// Compound export
// ---------------------------------------------------------------------------

export const Breadcrumbs = BreadcrumbsRoot as typeof BreadcrumbsRoot & {
  /** Separator element — place between BreadcrumbItem/BreadcrumbButtonItem/BreadcrumbAccountItem. */
  Sep: typeof BreadcrumbSep;
  /** Standard text crumb item. */
  Item: typeof BreadcrumbItem;
  /** Button-style crumb item (with optional icon). */
  ButtonItem: typeof BreadcrumbButtonItem;
  /** Account/avatar crumb item. */
  AccountItem: typeof BreadcrumbAccountItem;
  /** Breadcrumbs with a left-line visual. */
  WithLine: typeof BreadcrumbsWithLine;
  /** Breadcrumbs using button-style items. */
  Button: typeof BreadcrumbsButton;
};

Breadcrumbs.Sep = BreadcrumbSep;
Breadcrumbs.Item = BreadcrumbItem;
Breadcrumbs.ButtonItem = BreadcrumbButtonItem;
Breadcrumbs.AccountItem = BreadcrumbAccountItem;
Breadcrumbs.WithLine = BreadcrumbsWithLine;
Breadcrumbs.Button = BreadcrumbsButton;
