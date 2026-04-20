"use client";

import React, { type ReactNode, createContext, useState } from "react";
import { Breadcrumbs as AriaBreadcrumbs } from "react-aria-components";
import { BreadcrumbItem } from "@/components/application/breadcrumbs/breadcrumb-item";
import { cx } from "@/utils";

export type BreadcrumbType = "text" | "text-line" | "button";

export const BreadcrumbsContext = createContext<{ divider: "chevron" | "slash"; type: BreadcrumbType }>({
  divider: "chevron",
  type: "text",
});

export interface BreadcrumbsProps {
  divider?: "chevron" | "slash";
  /** Alias for divider — use "chevron" or "slash". */
  separator?: "chevron" | "slash";
  children: ReactNode;
  type?: BreadcrumbType;
  className?: string;
  /**
   * The maximum number of visible items. If the number of items
   * exceeds this value, the breadcrumbs will collapse into a single
   * item with an ellipsis that can be expanded.
   */
  maxVisibleItems?: number;
}

const styles = {
  text: "gap-1.5 md:gap-2",
  "text-line": "pl-2 gap-1.5 md:gap-2 py-2 after:pointer-events-none after:absolute after:inset-0 after:border-b after:border-t after:border-secondary",
  button: "gap-0.5 md:gap-1",
};

const Breadcrumbs = ({ children, divider, separator, type = "text", className, maxVisibleItems = 4 }: BreadcrumbsProps) => {
  const resolvedDivider = divider ?? separator ?? "chevron";
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleItems = (() => {
    // Filter out standalone Sep nodes (data-breadcrumb-sep) — BreadcrumbItem already renders its own separator
    const childrenArray = React.Children.toArray(children).filter((child) => {
      if (React.isValidElement(child)) {
        const props = (child as React.ReactElement<{ "data-breadcrumb-sep"?: boolean }>).props;
        return !props["data-breadcrumb-sep"];
      }
      return true;
    });

    if (!maxVisibleItems || childrenArray.length <= maxVisibleItems || isExpanded) {
      return childrenArray;
    }

    const firstItems = childrenArray.slice(0, Math.ceil(maxVisibleItems / 2));
    const lastItems = childrenArray.slice(-Math.floor((maxVisibleItems - 1) / 2));
    const ellipsisItem = <BreadcrumbItem isEllipsis divider={resolvedDivider} type={type} onClick={() => setIsExpanded(true)} key="ellipsis" />;

    return [...firstItems, ellipsisItem, ...lastItems];
  })();

  return (
    <nav aria-label="Breadcrumbs" className={cx("min-w-0", className)}>
      <BreadcrumbsContext.Provider value={{ divider: resolvedDivider, type }}>
        <AriaBreadcrumbs className={cx("relative flex", styles[type])}>{visibleItems}</AriaBreadcrumbs>
      </BreadcrumbsContext.Provider>
    </nav>
  );
};

/** Standalone separator rendered between breadcrumb items. Filtered out when used inside `<Breadcrumbs>` since items render their own separators. */
const BreadcrumbSep = ({ separator = "chevron", className, ...rest }: { separator?: "chevron" | "slash"; className?: string; [key: string]: unknown }) => {
  if (separator === "slash") {
    return (
      <span aria-hidden="true" data-breadcrumb-sep className={cx("select-none text-sm text-utility-neutral-300", className)} {...rest}>
        /
      </span>
    );
  }
  return (
    <span aria-hidden="true" data-breadcrumb-sep className={cx("select-none text-sm text-utility-neutral-300", className)} {...rest}>
      ›
    </span>
  );
};

/** `Breadcrumbs` wrapper that applies the `text-line` style (bottom border). */
const BreadcrumbsWithLine = ({ children, className, ...props }: Omit<BreadcrumbsProps, "type">) => (
  <Breadcrumbs type="text-line" className={className} {...props}>
    {children}
  </Breadcrumbs>
);

/** `Breadcrumbs` wrapper that applies the `button` style (pill items). */
const BreadcrumbsButton = ({ children, className, ...props }: Omit<BreadcrumbsProps, "type">) => (
  <Breadcrumbs type="button" className={className} {...props}>
    {children}
  </Breadcrumbs>
);

/** A simple account breadcrumb item that renders an avatar + label link. */
const BreadcrumbSimpleAccountItem = ({
  href,
  avatarSrc,
  children,
  isCurrent,
  className,
  ...props
}: {
  href?: string;
  avatarSrc?: string;
  avatarInitials?: string;
  children?: ReactNode;
  isCurrent?: boolean;
  className?: string;
  [key: string]: unknown;
}) => (
  <BreadcrumbItem href={href} avatarSrc={avatarSrc} isCurrent={isCurrent} className={className} {...(props as Parameters<typeof BreadcrumbItem>[0])}>
    {children}
  </BreadcrumbItem>
);

Breadcrumbs.Item = BreadcrumbItem;
Breadcrumbs.AccountItem = BreadcrumbSimpleAccountItem;
Breadcrumbs.Sep = BreadcrumbSep;
Breadcrumbs.WithLine = BreadcrumbsWithLine;
Breadcrumbs.Button = BreadcrumbsButton;
Breadcrumbs.ButtonItem = BreadcrumbItem;

export { Breadcrumbs };
