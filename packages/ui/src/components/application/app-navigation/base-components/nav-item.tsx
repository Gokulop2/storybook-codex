"use client";

import type { FC, HTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { ChevronDown, Share04 } from "@opus2-platform/icons";
import { Link as AriaLink } from "react-aria-components";
import { Badge } from "@/components/base/badges/badges";
import { cx } from "@/utils";

/** Untitled UI — top-level nav link (default). */
const navLinkIdle =
    "group/item p-2 group relative flex max-h-9 w-full cursor-pointer items-center rounded-md bg-primary outline-focus-ring transition duration-100 ease-linear select-none hover:bg-primary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2";

/** Untitled UI — top-level nav link (current). */
const navLinkCurrent =
    "group/item p-2 group relative flex max-h-9 w-full cursor-pointer items-center rounded-md outline-focus-ring transition duration-100 ease-linear select-none focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 bg-secondary hover:bg-secondary_hover";

/** Untitled UI — collapsible summary (uses `group`, not `group/item`). */
const navSummary =
    "p-2 group relative flex max-h-9 w-full cursor-pointer items-center rounded-md bg-primary outline-focus-ring transition duration-100 ease-linear select-none hover:bg-primary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2";

/** Untitled UI — nested link under collapsible. */
const navChildIdle =
    "py-2 pr-3 pl-10 group relative flex max-h-9 w-full cursor-pointer items-center rounded-md bg-primary outline-focus-ring transition duration-100 ease-linear select-none hover:bg-primary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2";

const navChildCurrent =
    "py-2 pr-3 pl-10 group relative flex max-h-9 w-full cursor-pointer items-center rounded-md outline-focus-ring transition duration-100 ease-linear select-none focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 bg-secondary hover:bg-secondary_hover";

/** Slim rail — icon-only hit target (Untitled: `size-9`). */
const navRowIconOnly =
    "group/item relative flex size-9 cursor-pointer items-center justify-center gap-1 rounded-md bg-primary p-0 outline-focus-ring transition duration-100 ease-linear select-none hover:bg-primary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2";

interface NavItemBaseProps {
    /** Whether the nav item shows only an icon. */
    iconOnly?: boolean;
    /** Whether the collapsible nav item is open. */
    open?: boolean;
    /** URL to navigate to when the nav item is clicked. */
    href?: string;
    /** Type of the nav item. */
    type: "link" | "collapsible" | "collapsible-child";
    /** Icon component to display. */
    icon?: FC<HTMLAttributes<HTMLOrSVGElement>>;
    /** Badge to display. */
    badge?: ReactNode;
    /** Whether the nav item is currently active. */
    current?: boolean;
    /** Whether to truncate the label text. */
    truncate?: boolean;
    /** Handler for click events. */
    onClick?: MouseEventHandler;
    /** Content to display. */
    children?: ReactNode;
}

export const NavItemBase = ({ current, type, badge, href, icon: Icon, children, truncate = true, onClick, iconOnly }: NavItemBaseProps) => {
    const useNamedGroup = type === "link" && !iconOnly;
    const iconHover =
        type === "link" && iconOnly
            ? "group-hover/item:text-fg-quaternary_hover"
            : useNamedGroup
              ? "group-hover/item:text-fg-quaternary_hover"
              : "group-hover:text-fg-quaternary_hover";
    const labelHover = useNamedGroup ? "group-hover/item:text-secondary_hover" : "group-hover:text-secondary_hover";

    const iconElement = Icon && (
        <Icon
            aria-hidden="true"
            className={cx(
                !iconOnly && "mr-2",
                "size-5 shrink-0 transition-inherit-all",
                iconHover,
                current && "text-fg-quaternary_hover",
                !current && "text-fg-quaternary",
            )}
        />
    );

    const badgeElement =
        badge && (typeof badge === "string" || typeof badge === "number") ? (
            <Badge className="ml-3" color="gray" type="pill-color" size="sm">
                {badge}
            </Badge>
        ) : (
            badge
        );

    const labelElement = (
        <span
            className={cx(
                "flex-1 text-sm font-semibold transition-inherit-all",
                labelHover,
                truncate && "truncate",
                current ? "text-secondary_hover" : "text-secondary",
            )}
        >
            {children}
        </span>
    );

    const isExternal = href && href.startsWith("http");
    const externalIcon = isExternal && <Share04 className="size-4 stroke-[2.5px] text-fg-quaternary" />;

    if (type === "collapsible") {
        return (
            <summary className={navSummary} onClick={onClick}>
                {iconElement}
                {labelElement}
                {badgeElement}
                <ChevronDown aria-hidden="true" className="ml-3 size-4 shrink-0 stroke-[2.5px] text-fg-quaternary in-open:-scale-y-100" />
            </summary>
        );
    }

    if (type === "collapsible-child") {
        const childIcon = Icon ? (
            <Icon
                aria-hidden="true"
                className={cx(
                    "mr-2 size-5 shrink-0 text-fg-quaternary transition-inherit-all group-hover:text-fg-quaternary_hover",
                    current && "text-fg-quaternary_hover",
                )}
            />
        ) : null;

        return (
            <AriaLink
                href={href!}
                target={isExternal ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className={current ? navChildCurrent : navChildIdle}
                onClick={onClick}
                aria-current={current ? "page" : undefined}
            >
                {childIcon}
                {labelElement}
                {externalIcon}
                {badgeElement}
            </AriaLink>
        );
    }

    if (type === "link" && iconOnly) {
        const ariaLabel = typeof children === "string" ? children : undefined;
        return (
            <AriaLink
                href={href!}
                target={isExternal ? "_blank" : "_self"}
                rel="noopener noreferrer"
                aria-label={ariaLabel}
                className={cx(navRowIconOnly, current && "bg-secondary hover:bg-secondary_hover")}
                onClick={onClick}
                aria-current={current ? "page" : undefined}
            >
                {iconElement}
                {externalIcon}
                {badgeElement}
            </AriaLink>
        );
    }

    return (
        <AriaLink
            href={href!}
            target={isExternal ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className={current ? navLinkCurrent : navLinkIdle}
            onClick={onClick}
            aria-current={current ? "page" : undefined}
        >
            {iconElement}
            {labelElement}
            {externalIcon}
            {badgeElement}
        </AriaLink>
    );
};
