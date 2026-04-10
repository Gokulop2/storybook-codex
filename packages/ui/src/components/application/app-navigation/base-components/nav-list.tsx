"use client";

import { useEffect, useState } from "react";
import { cx } from "@/utils";
import type { NavItemDividerType, NavItemType } from "../config";
import { NavItemBase } from "./nav-item";

interface NavListProps {
    /** URL of the currently active item. */
    activeUrl?: string;
    /** Additional CSS classes to apply to the mobile list (dual-tier) or the single list (default). */
    className?: string;
    /** List of items to display. */
    items: (NavItemType | NavItemDividerType)[];
    /**
     * Untitled dual-tier layout: nested `details` on small screens (`lg:hidden`), flat top-level
     * links at `lg+` (`hidden lg:flex`) for a secondary pane / routing pattern.
     */
    dualTier?: boolean;
}

function getActiveItem(items: (NavItemType | NavItemDividerType)[], activeUrl: string | undefined): NavItemType | undefined {
    for (const item of items) {
        if ("divider" in item && item.divider) continue;
        const nav = item as NavItemType;
        if (nav.href === activeUrl || nav.items?.some((subItem) => subItem.href === activeUrl)) {
            return nav;
        }
    }
    return undefined;
}

function buildCollapsibleOpenState(items: (NavItemType | NavItemDividerType)[], activeUrl: string | undefined): Record<string, boolean> {
    const activeItem = getActiveItem(items, activeUrl);
    const next: Record<string, boolean> = {};
    for (const row of items) {
        if ("divider" in row && row.divider) continue;
        const nav = row as NavItemType;
        if (!nav.items?.length) continue;
        next[nav.label] = nav.href === activeItem?.href || Boolean(nav.items.some((subItem) => subItem.href === activeUrl));
    }
    return next;
}

/** Stable identity for `items` so `useEffect` does not reset open state on every parent render (new array reference). */
function navItemsStructureKey(items: (NavItemType | NavItemDividerType)[]): string {
    return items
        .map((row) => {
            if ("divider" in row && row.divider) return "—";
            const n = row as NavItemType;
            const child = n.items?.map((c) => `${c.label}:${c.href}`).join("|") ?? "";
            return `${n.label}:${n.href ?? ""}:${child}`;
        })
        .join(";");
}

function parentHref(item: NavItemType): string {
    return item.href ?? item.items?.[0]?.href ?? "#";
}

function isBranchCurrent(item: NavItemType, activeUrl: string | undefined): boolean {
    if (activeUrl == null) return false;
    if (item.href === activeUrl) return true;
    return Boolean(item.items?.some((c) => c.href === activeUrl));
}

export const NavList = ({ activeUrl, items, className, dualTier }: NavListProps) => {
    const [openByLabel, setOpenByLabel] = useState<Record<string, boolean>>(() => buildCollapsibleOpenState(items, activeUrl));
    const itemsStructureKey = navItemsStructureKey(items);

    useEffect(() => {
        setOpenByLabel(buildCollapsibleOpenState(items, activeUrl));
        // `items` is read from the latest render; `itemsStructureKey` avoids re-running when only the array reference changes.
    }, [activeUrl, itemsStructureKey]);

    const mapMobileRow = (item: NavItemType | NavItemDividerType, index: number) => {
        if ("divider" in item && item.divider) {
            return (
                <li key={index} className="w-full px-0.5 py-2">
                    <hr data-codex-nav-divider="true" className="h-px min-h-px w-full shrink-0 border-none bg-border-secondary" />
                </li>
            );
        }

        const nav = item as NavItemType;

        if (nav.items?.length) {
            const isOpen = openByLabel[nav.label] ?? false;
            const toggle = () => setOpenByLabel((prev) => ({ ...prev, [nav.label]: !isOpen }));
            return (
                <li key={nav.label} className="py-px">
                    <details open={isOpen} className="appearance-none py-0.25">
                        <NavItemBase
                            href={nav.href}
                            badge={nav.badge}
                            icon={nav.icon}
                            type="collapsible"
                            onClick={(e) => { e.preventDefault(); toggle(); }}
                        >
                            {nav.label}
                        </NavItemBase>
                        <dd className="m-0 p-0">
                            <ul className="list-none pb-1">
                                {nav.items.map((childItem) => (
                                    <li key={childItem.label} className="py-0.25">
                                        <NavItemBase
                                            href={childItem.href}
                                            badge={childItem.badge}
                                            icon={childItem.icon}
                                            type="collapsible-child"
                                            current={activeUrl === childItem.href}
                                        >
                                            {childItem.label}
                                        </NavItemBase>
                                    </li>
                                ))}
                            </ul>
                        </dd>
                    </details>
                </li>
            );
        }

        return (
            <li key={nav.label} className="py-px">
                <NavItemBase
                    type="link"
                    badge={nav.badge}
                    icon={nav.icon}
                    href={nav.href ?? "#"}
                    current={activeUrl === nav.href}
                >
                    {nav.label}
                </NavItemBase>
            </li>
        );
    };

    const mapDesktopFlatRow = (item: NavItemType | NavItemDividerType, index: number) => {
        if ("divider" in item && item.divider) {
            return (
                <li key={index} className="w-full px-0.5 py-2">
                    <hr data-codex-nav-divider="true" className="h-px min-h-px w-full shrink-0 border-none bg-border-secondary" />
                </li>
            );
        }

        const nav = item as NavItemType;

        if (nav.items?.length) {
            return (
                <li key={nav.label} className="py-px">
                    <NavItemBase
                        type="link"
                        badge={nav.badge}
                        icon={nav.icon}
                        href={parentHref(nav)}
                        current={isBranchCurrent(nav, activeUrl)}
                    >
                        {nav.label}
                    </NavItemBase>
                </li>
            );
        }

        return (
            <li key={nav.label} className="py-px">
                <NavItemBase
                    type="link"
                    badge={nav.badge}
                    icon={nav.icon}
                    href={nav.href ?? "#"}
                    current={activeUrl === nav.href}
                >
                    {nav.label}
                </NavItemBase>
            </li>
        );
    };

    if (dualTier) {
        return (
            <>
                <ul data-nav-list className={cx("flex list-none flex-col px-4 pt-5 lg:hidden", className)}>{items.map(mapMobileRow)}</ul>
                <ul data-nav-list className="mt-5 hidden list-none flex-col px-4 lg:flex">{items.map(mapDesktopFlatRow)}</ul>
            </>
        );
    }

    return <ul data-nav-list className={cx("flex list-none flex-col px-4 pt-5", className)}>{items.map(mapMobileRow)}</ul>;
};
