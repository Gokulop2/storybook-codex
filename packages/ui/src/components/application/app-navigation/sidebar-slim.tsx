"use client";

import type { FC } from "react";
import { useState } from "react";
import { DotsVertical, LifeBuoy01, Settings01 } from "@opus2-platform/icons";
import { AnimatePresence, motion } from "motion/react";
import { Button as AriaButton, DialogTrigger as AriaDialogTrigger, Popover as AriaPopover } from "react-aria-components";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { OpusLogoSmall } from "@/components/foundations/logo";
import { codexDemoAvatar } from "@/constants/demo-asset-urls";
import { cx } from "@/utils";
import { MobileNavigationHeader } from "./base-components/mobile-header";
import { NavAccountCard, NavAccountMenu } from "./base-components/nav-account-card";
import { NavButton } from "./base-components/nav-button";
import { NavItemBase } from "./base-components/nav-item";
import { NavList } from "./base-components/nav-list";
import type { NavItemDividerType, NavItemType } from "./config";

export interface SidebarNavigationSlimProps {
    /** URL of the currently active item. */
    activeUrl?: string;
    /** List of items to display. */
    items: (NavItemType & { icon: FC<{ className?: string }> })[];
    /** List of footer items to display. */
    footerItems?: (NavItemType & { icon: FC<{ className?: string }> })[];
    /** Whether to hide the border. */
    hideBorder?: boolean;
    /** Whether to hide the right side border. */
    hideRightBorder?: boolean;
    className?: string;
}

const MAIN_SIDEBAR_WIDTH = 68;
const SECONDARY_SIDEBAR_WIDTH = 256;

export function SidebarNavigationSlim({ activeUrl, items, footerItems = [], hideBorder, hideRightBorder, className }: SidebarNavigationSlimProps) {
    const activeItem = [...items, ...footerItems].find(
        (item) => item.href === activeUrl || item.items?.some((subItem) => subItem.href === activeUrl),
    );
    const [currentItem, setCurrentItem] = useState(activeItem || items[1] || items[0]);
    const [isHovering, setIsHovering] = useState(false);

    const isSecondarySidebarVisible = isHovering && Boolean(currentItem?.items?.length);

    const mainSidebar = (
        <aside
            style={{ width: MAIN_SIDEBAR_WIDTH }}
            className={cx(
                "group flex h-full max-h-full max-w-full overflow-y-auto py-1 pl-1 transition duration-100 ease-linear",
                isSecondarySidebarVisible && "bg-primary",
            )}
        >
            <div
                className={cx(
                    "flex w-auto min-h-0 min-w-0 flex-1 flex-col justify-between rounded-xl bg-primary pt-5 ring-1 ring-secondary ring-inset transition duration-300",
                    hideBorder && !isSecondarySidebarVisible && "ring-transparent",
                )}
            >
                <div className="flex min-h-0 flex-col">
                    <div className="flex justify-center px-3">
                        <a
                            href="#"
                            aria-label="Opus home"
                            className="rounded-xs outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                            <OpusLogoSmall className="size-6 origin-center scale-[1.2]" aria-hidden />
                        </a>
                    </div>

                    <ul data-nav-list-slim className="mt-5 flex list-none flex-col gap-0.5 px-3.5">
                        {items.map((item) => (
                            <li key={item.label}>
                                <NavButton
                                    current={currentItem?.href === item.href}
                                    href={item.href}
                                    label={item.label}
                                    icon={item.icon}
                                    onClick={() => setCurrentItem(item)}
                                />
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-auto flex flex-col items-center gap-3 px-3 py-4">
                    {footerItems.length > 0 && (
                        <ul className="flex list-none flex-col gap-0.5">
                            {footerItems.map((item) => (
                                <li key={item.label}>
                                    <NavButton
                                        current={currentItem?.href === item.href}
                                        label={item.label}
                                        href={item.href}
                                        icon={item.icon}
                                        onClick={() => setCurrentItem(item)}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}

                    <AriaDialogTrigger>
                        <AriaButton
                            className={({ isPressed, isFocused }) =>
                                cx(
                                    "group relative inline-flex rounded-full outline-hidden",
                                    (isPressed || isFocused) && "outline-2 outline-offset-2 outline-focus-ring",
                                )
                            }
                            aria-label="Account menu"
                        >
                            <Avatar
                                src={codexDemoAvatar("codex-caitlyn")}
                                size="md"
                                alt="Caitlyn King"
                                status="online"
                            />
                        </AriaButton>
                        <AriaPopover
                            placement="right bottom"
                            offset={8}
                            crossOffset={6}
                            className={({ isEntering, isExiting }) =>
                                cx(
                                    "will-change-transform",
                                    isEntering &&
                                        "duration-300 ease-out animate-in fade-in placement-right:slide-in-from-left-2 placement-top:slide-in-from-bottom-2 placement-bottom:slide-in-from-top-2",
                                    isExiting &&
                                        "duration-150 ease-in animate-out fade-out placement-right:slide-out-to-left-2 placement-top:slide-out-to-bottom-2 placement-bottom:slide-out-to-top-2",
                                )
                            }
                        >
                            <NavAccountMenu />
                        </AriaPopover>
                    </AriaDialogTrigger>
                </div>
            </div>
        </aside>
    );

    const secondarySidebar = (
        <AnimatePresence initial={false}>
            {isSecondarySidebarVisible && (
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: SECONDARY_SIDEBAR_WIDTH }}
                    exit={{ width: 0, transition: { duration: 0.15 } }}
                    transition={{ type: "spring", damping: 26, stiffness: 220, bounce: 0 }}
                    className={cx(
                        "relative h-full overflow-x-hidden overflow-y-auto bg-primary",
                        !(hideBorder || hideRightBorder) && "box-content border-r border-secondary",
                    )}
                >
                    <div style={{ width: SECONDARY_SIDEBAR_WIDTH }} className="flex h-full flex-col px-4 pt-6">
                        <h3 className="text-sm font-semibold text-brand-secondary">{currentItem?.label}</h3>
                        <ul className="list-none py-2">
                            {currentItem?.items?.map((item) => (
                                <li key={item.label} className="py-px">
                                    <NavItemBase
                                        current={activeUrl === item.href}
                                        href={item.href}
                                        icon={item.icon}
                                        badge={item.badge}
                                        type="link"
                                    >
                                        {item.label}
                                    </NavItemBase>
                                </li>
                            ))}
                        </ul>
                        <div className="sticky bottom-0 mt-auto flex justify-between bg-primary pb-5">
                            <div>
                                <p className="text-sm font-semibold text-secondary">Caitlyn King</p>
                                <p className="text-sm text-tertiary">caitlyn@opus2.com</p>
                            </div>
                            <div className="absolute -top-1 right-0">
                                <Button color="tertiary" size="sm" className="!p-1.5" iconLeading={DotsVertical} aria-label="Options" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <div className={cx("flex h-full min-h-0 w-full max-w-full", className)}>
            {/* Desktop sidebar */}
            <div
                className="hidden h-full lg:flex"
                onPointerEnter={() => setIsHovering(true)}
                onPointerLeave={() => setIsHovering(false)}
            >
                {mainSidebar}
                {secondarySidebar}
            </div>

            {/* Mobile header navigation */}
            <MobileNavigationHeader>
                <aside className="flex h-full max-w-full flex-col justify-between overflow-y-auto bg-primary pt-4">
                    <div className="flex flex-col gap-5 px-4">
                        <a href="#" aria-label="Opus home" className="flex h-6 w-max items-center rounded-xs outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2">
                            <OpusLogoSmall className="size-8 origin-center aspect-square h-full w-auto shrink-0 scale-[1.2]" aria-hidden />
                        </a>
                    </div>

                    <NavList items={items as (NavItemType | NavItemDividerType)[]} activeUrl={activeUrl} />

                    <div className="mt-auto flex flex-col gap-3 p-4">
                        <div className="flex flex-col">
                            <NavItemBase current={activeUrl === "#slim-support"} type="link" href="#slim-support" icon={LifeBuoy01}>
                                Support
                            </NavItemBase>
                            <NavItemBase current={activeUrl === "#slim-settings"} type="link" href="#slim-settings" icon={Settings01}>
                                Settings
                            </NavItemBase>
                        </div>
                        <NavAccountCard />
                    </div>
                </aside>
            </MobileNavigationHeader>
        </div>
    );
}
