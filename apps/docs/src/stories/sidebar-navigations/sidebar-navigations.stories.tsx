import type { CSSProperties, FC, ReactNode } from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Avatar,
  Badge,
  BadgeWithDot,
  Button,
  Input,
  NavAccountCard,
  NavButton,
  NavItemBase,
  NavList,
  Opus2Wordmark,
  ProgressBar,
  ProgressBarCircle,
  QRCode,
  SidebarNavigationSlim,
  type NavItemDividerType,
  type NavItemType,
} from "@opus2-platform/codex";
import {
  Archive,
  BarChartSquare02,
  CheckDone01,
  ClockFastForward,
  CurrencyDollarCircle,
  Folder,
  Grid03,
  HelpCircle,
  Home01,
  HomeLine,
  Inbox01,
  LayersTwo01,
  LayoutAlt01,
  LayoutLeft,
  LayoutRight,
  LifeBuoy01,
  LineChartUp03,
  MessageChatCircle,
  NotificationBox,
  Package,
  PieChart03,
  Rows01,
  SearchLg,
  Settings01,
  Settings03,
  Star01,
  Stars01,
  User01,
  UserSquare,
  Users01,
  UsersPlus,
} from "@opus2-platform/icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  DOCS_PREVIEW_HERO_SURFACE_CLASS_SIDEBAR_NAV,
  DOCS_PREVIEW_SURFACE_CLASS_SIDEBAR_NAV,
  DOCS_SECTION_CLASS,
  DOCS_SECTION_HERO_CLASS,
  DocsSection,
  SectionTitle,
} from "../_docs/docs-preview-code";
import { DocsUntitledMultiFileCodePanel, type DocsUntitledCodeFile } from "../_docs/docs-untitled-multi-file-code";
import { DocsPageBreadcrumb } from "../_docs/docs-page-breadcrumb";
import { CODEX_DOCS_AVATAR_SRC } from "../_docs/docs-assets";
import { OnThisPageNav, StorybookRootHeaderPortal, StorybookSbdocsTocPortal } from "../_docs/docs-scaffold";

// ─── TOC ────────────────────────────────────────────────────────────────────

const SIDEBAR_DOCS_TOC = [
  { id: "sidebar-navigation-example", label: "Sidebar navigation example" },
  { id: "simple", label: "Simple" },
  { id: "dual-tier", label: "Dual-tier" },
  { id: "slim", label: "Slim" },
  { id: "sections-dividers", label: "Sections dividers" },
  { id: "sections-subheadings", label: "Sections subheadings" },
  { id: "featured-cards", label: "Featured cards" },
  { id: "progress-bar", label: "Progress bar" },
  { id: "progress-circle", label: "Progress circle" },
  { id: "featured-image", label: "Image" },
  { id: "cookie-preferences", label: "Cookie preferences" },
  { id: "referral-link", label: "Referral link" },
  { id: "onboarding-steps", label: "Onboarding steps" },
  { id: "upgrade-cta", label: "Upgrade CTA" },
  { id: "support-cta", label: "Support CTA" },
  { id: "event-cta", label: "Event CTA" },
  { id: "message-card", label: "Message" },
  { id: "current-projects", label: "Current projects" },
  { id: "free-trial-cta", label: "Free trial CTA" },
  { id: "qr-code", label: "QR code" },
] as const;

// ─── CODE SNIPPETS ───────────────────────────────────────────────────────────

const SIMPLE_PAGE_CODE = `\
import { BadgeWithDot, type NavItemDividerType, type NavItemType } from "@opus2-platform/codex";
import {
  BarChartSquare02,
  Folder,
  HomeLine,
  LayoutAlt01,
  MessageChatCircle,
  PieChart03,
  Rows01,
  Settings01,
} from "@opus2-platform/icons";
import { SidebarNavigationSimple } from "./app-navigation/sidebar-simple";

const items: (NavItemType | NavItemDividerType)[] = [
  { label: "Home", href: "/", icon: HomeLine },
  { label: "Dashboard", href: "/dashboard", icon: BarChartSquare02 },
  { label: "Projects", href: "/projects", icon: Rows01 },
  { divider: true },
  {
    label: "Folders",
    icon: Folder,
    href: "/folders",
    items: [
      { label: "View all", badge: 18, href: "/folders/view-all" },
      { label: "Recent", badge: 8, href: "/folders/recent" },
      { label: "Favorites", badge: 6, href: "/folders/favorites" },
      { label: "Shared", badge: 4, href: "/folders/shared" },
    ],
  },
  { divider: true },
  { label: "Reporting", href: "/reporting", icon: PieChart03 },
  { label: "Settings", href: "/settings", icon: Settings01 },
  {
    label: "Support",
    href: "/support",
    icon: MessageChatCircle,
    badge: (
      <BadgeWithDot color="success" type="modern" size="sm">
        Online
      </BadgeWithDot>
    ),
  },
  { label: "Open in browser", href: "https://www.untitledui.com/", icon: LayoutAlt01 },
];

export default function Page() {
  return <SidebarNavigationSimple activeUrl="/" items={items} />;
};`;

const SIMPLE_SIDEBAR_CODE = `\
import type { CSSProperties, ReactNode } from "react";
import { SearchLg } from "@opus2-platform/icons";
import {
  cx,
  Input,
  MobileNavigationHeader,
  NavAccountCard,
  NavItemBase,
  NavList,
  Opus2Wordmark,
  type NavItemType,
} from "@opus2-platform/codex";

interface SidebarNavigationProps {
  /** URL of the currently active item. */
  activeUrl?: string;
  /** List of items to display. */
  items: NavItemType[];
  /** List of footer items to display. */
  footerItems?: NavItemType[];
  /** Feature card to display. */
  featureCard?: ReactNode;
  /** Whether to show the account card. */
  showAccountCard?: boolean;
  /** Additional CSS classes to apply to the sidebar. */
  className?: string;
}

export const SidebarNavigationSimple = ({
  activeUrl,
  items,
  footerItems = [],
  featureCard,
  showAccountCard = true,
  className,
}: SidebarNavigationProps) => {
  const MAIN_SIDEBAR_WIDTH = 280;

  const content = (
    <aside
      style={{ "--width": \`\${MAIN_SIDEBAR_WIDTH}px\` } as CSSProperties}
      className={cx(
        "flex h-full w-full max-w-full flex-col justify-between overflow-auto bg-primary pt-4 lg:w-(--width) lg:pt-5 border-secondary md:border-r",
        className,
      )}
    >
      <div className="flex flex-col gap-5 px-4 lg:px-5">
        <a href="#" aria-label="Opus home" className="flex w-max items-center justify-start overflow-visible h-6 rounded-xs outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2">
          <Opus2Wordmark className="h-full shrink-0 justify-start text-sm font-semibold tracking-[0.02em]" aria-hidden />
        </a>
        <Input size="md" className="md:hidden" aria-label="Search" placeholder="Search" icon={SearchLg} />
        <Input size="sm" className="max-md:hidden" shortcut aria-label="Search" placeholder="Search" icon={SearchLg} />
      </div>

      <NavList activeUrl={activeUrl} items={items} />

      <div className="mt-auto flex flex-col gap-3 px-4 py-4 lg:py-5">
        {footerItems.length > 0 && (
          <ul className="flex flex-col">
            {footerItems.map((item) => (
              <li key={item.label} className="py-0.5">
                <NavItemBase badge={item.badge} icon={item.icon} href={item.href} type="link" current={item.href === activeUrl}>
                  {item.label}
                </NavItemBase>
              </li>
            ))}
          </ul>
        )}

        {featureCard}

        {showAccountCard && <NavAccountCard />}
      </div>
    </aside>
  );

  return (
    <>
      <MobileNavigationHeader>{content}</MobileNavigationHeader>
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex">{content}</div>
      <div style={{ paddingLeft: MAIN_SIDEBAR_WIDTH }} className="invisible hidden lg:sticky lg:top-0 lg:bottom-0 lg:left-0 lg:block" />
    </>
  );
};`;

const SIDEBAR_NAVIGATION_EXAMPLE_CODE = `\
import { BarChartSquare02, Folder, HomeLine, LayoutAlt01, MessageChatCircle, PieChart03, Rows01, Settings01 } from "@untitledui/icons";
import type { NavItemDividerType, NavItemType } from "@/components/application/app-navigation/config";
import { SidebarNavigationSectionDividers } from "@/components/application/app-navigation/sidebar-navigation/sidebar-section-dividers";
import { BadgeWithDot } from "@/components/base/badges/badges";

const navItemsWithDividers: (NavItemType | NavItemDividerType)[] = [
    { label: "Home", href: "/", icon: HomeLine },
    { label: "Dashboard", href: "/dashboard", icon: BarChartSquare02 },
    { label: "Projects", href: "/projects", icon: Rows01 },
    { divider: true },
    {
        label: "Folders",
        icon: Folder,
        href: "/folders",
        items: [
            { label: "View all", badge: 18, href: "/folders/view-all" },
            { label: "Recent", badge: 8, href: "/folders/recent" },
            { label: "Favorites", badge: 6, href: "/folders/favorites" },
            { label: "Shared", badge: 4, href: "/folders/shared" },
        ],
    },
    { divider: true },
    { label: "Reporting", href: "/reporting", icon: PieChart03 },
    { label: "Settings", href: "/settings", icon: Settings01 },
    {
        label: "Support",
        href: "/support",
        icon: MessageChatCircle,
        badge: (
            <BadgeWithDot color="success" type="modern" size="sm">
                Online
            </BadgeWithDot>
        ),
    },
    { label: "Open in browser", href: "https://www.untitledui.com/", icon: LayoutAlt01 },
];

export const SidebarSectionDividersDemo = () => <SidebarNavigationSectionDividers activeUrl="/" items={navItemsWithDividers} />;`;

const SIMPLE_DOCS_CODE_FILES: DocsUntitledCodeFile[] = [
  { label: "page.tsx", code: SIMPLE_PAGE_CODE },
  { label: "app-navigation/sidebar-simple.tsx", code: SIMPLE_SIDEBAR_CODE },
];

// ─── SHARED CONSTANTS ────────────────────────────────────────────────────────

const FEATURED_CARD_CLASS = "rounded-xl bg-secondary_alt p-4 ring-1 ring-inset ring-secondary";

const SIDEBAR_FOOTER_CLASS = "mt-auto flex flex-col gap-3 px-4 py-4 lg:py-5";

const TOGGLE_BTN_CLASS =
  "flex size-7 items-center justify-center rounded-md text-fg-quaternary transition duration-100 ease-linear hover:bg-primary_hover hover:text-fg-quaternary_hover outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2";

const DUAL_TIER_EXPANDED_WIDTH = 280;
const DUAL_TIER_COLLAPSED_WIDTH = 68;
const DUAL_TIER_FLYOUT_WIDTH = 200;

// ─── DEMO DATA ───────────────────────────────────────────────────────────────

const accountForDemo = [
  {
    id: "caitlyn",
    name: "Caitlyn King",
    email: "caitlyn@opus2.com",
    avatar: CODEX_DOCS_AVATAR_SRC,
    status: "online" as const,
  },
];

const supportOnlineDot = (
  <BadgeWithDot color="success" type="modern" size="sm">
    Online
  </BadgeWithDot>
);

const opusApplicationNavItems: (NavItemType | NavItemDividerType)[] = [
  { label: "Home", href: "#home", icon: HomeLine },
  { label: "Dashboard", href: "#dashboard", icon: BarChartSquare02 },
  { label: "Projects", href: "#projects", icon: Rows01 },
  { divider: true },
  {
    label: "Folders",
    href: "#folders",
    icon: Folder,
    items: [
      { label: "View all", href: "#folders-view-all", badge: 18 },
      { label: "Recent", href: "#folders-recent", badge: 8 },
      { label: "Favorites", href: "#folders-favorites", badge: 6 },
      { label: "Shared", href: "#folders-shared", badge: 4 },
    ],
  },
  { divider: true },
  { label: "Reporting", href: "#reporting", icon: PieChart03 },
  { label: "Settings", href: "#settings", icon: Settings01 },
  { label: "Support", href: "#support", icon: MessageChatCircle, badge: supportOnlineDot },
  { label: "Open in browser", href: "https://www.opus2.com", icon: LayoutAlt01 },
];

/** Same shape as opusApplicationNavItems — unique hrefs for the dividers demo. */
const navItemsSectionDividers: (NavItemType | NavItemDividerType)[] = opusApplicationNavItems.map((item) => {
  if ("divider" in item) return item;
  return {
    ...item,
    href: item.href?.replace("#", "#div-"),
    items: item.items?.map((child) => ({ ...child, href: child.href?.replace("#", "#div-") })),
  };
});

const dualTierNavItems: NavItemType[] = [
  {
    label: "AI Assist",
    href: "#ai-assist",
    icon: Stars01,
    items: [
      { label: "Matter", href: "#ai-assist-matter" },
      { label: "Documents", href: "#ai-assist-documents" },
      { label: "General", href: "#ai-assist-general" },
    ],
  },
  { label: "Saved conversations", href: "#saved-conversations", icon: MessageChatCircle },
  { label: "Documents Library", href: "#documents-library", icon: LayersTwo01 },
];

const slimNavItems: NavItemType[] = [
  {
    label: "Home",
    href: "#slim-home",
    icon: HomeLine,
    items: [
      { label: "Overview", href: "#slim-home-overview", icon: Grid03 },
      { label: "Products", href: "#slim-home-products", icon: Package },
      { label: "Orders", href: "#slim-home-orders", icon: CurrencyDollarCircle },
      { label: "Customers", href: "#slim-home-customers", icon: Users01 },
      { label: "Inbox", href: "#slim-home-inbox", icon: Inbox01, badge: 4 },
      { label: "What's new?", href: "#slim-home-whats-new", icon: Stars01 },
    ],
  },
  {
    label: "Dashboard",
    href: "#slim-dashboard",
    icon: BarChartSquare02,
    items: [
      { label: "Overview", href: "#slim-dashboard-overview", icon: Grid03 },
      { label: "Notifications", href: "#slim-dashboard-notifications", icon: NotificationBox, badge: 10 },
      { label: "Analytics", href: "#slim-dashboard-analytics", icon: LineChartUp03 },
      { label: "Saved reports", href: "#slim-dashboard-saved-reports", icon: Star01 },
      { label: "Scheduled reports", href: "#slim-dashboard-scheduled-reports", icon: ClockFastForward },
      { label: "User reports", href: "#slim-dashboard-user-reports", icon: UserSquare },
      { label: "Manage notifications", href: "#slim-dashboard-manage-notifications", icon: Settings03 },
    ],
  },
  {
    label: "Projects",
    href: "#slim-projects",
    icon: Rows01,
    items: [
      { label: "View all", href: "#slim-projects-all", icon: Rows01 },
      { label: "Personal", href: "#slim-projects-personal", icon: User01 },
      { label: "Team", href: "#slim-projects-team", icon: Users01 },
      { label: "Shared with me", href: "#slim-projects-shared-with-me", icon: UsersPlus },
      { label: "Archive", href: "#slim-projects-archive", icon: Archive },
    ],
  },
  { label: "Tasks", href: "#slim-tasks", icon: CheckDone01 },
  { label: "Reporting", href: "#slim-reporting", icon: PieChart03 },
  { label: "Users", href: "#slim-users", icon: Users01 },
];

const slimFooterNavItems: NavItemType[] = [
  { label: "Support", href: "#slim-support", icon: LifeBuoy01 },
  { label: "Settings", href: "#slim-settings", icon: Settings01 },
];

const featuredNavItems = opusApplicationNavItems.slice(0, 3) as NavItemType[];

// ─── LAYOUT PRIMITIVES ───────────────────────────────────────────────────────

const sidebarPreviewRailClass = "not-prose flex h-[min(720px,85dvh)] w-full max-w-full justify-start py-1 pl-1";
const slimSidebarPreviewRailClass = "not-prose flex h-[min(720px,85dvh)] w-full max-w-full justify-start";

const sidebarShellClass =
  "codex-docs-surface-reset flex h-full w-full max-w-full shrink-0 flex-col justify-between overflow-auto bg-primary pt-4 shadow-xs ring-secondary ring-inset lg:w-(--width) lg:max-w-none lg:rounded-xl lg:pt-5 lg:ring-1";

const simpleSidebarShellClass =
  "codex-docs-surface-reset flex h-full w-full max-w-full flex-col justify-between overflow-auto bg-primary pt-4 lg:w-(--width) lg:pt-5 border-secondary md:border-r";

const SidebarPreviewRail: FC<{ children: ReactNode }> = ({ children }) => (
  <div className={sidebarPreviewRailClass}>{children}</div>
);

const SidebarAside: FC<{ children: ReactNode; style?: CSSProperties; className?: string }> = ({
  children,
  style = { "--width": "276px" } as CSSProperties,
  className = sidebarShellClass,
}) => (
  <aside className={className} style={style}>
    {children}
  </aside>
);

const SidebarHeader: FC = () => (
  <div className="flex flex-col gap-5 px-4 lg:px-5">
    <a
      href="#"
      aria-label="Opus home"
      className="flex h-6 w-max items-center justify-start overflow-visible rounded-xs outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <Opus2Wordmark className="h-full shrink-0 justify-start text-sm font-semibold tracking-[0.02em]" aria-hidden />
    </a>
    <Input size="md" className="md:hidden" aria-label="Search" placeholder="Search" icon={SearchLg} />
    <Input size="sm" className="max-md:hidden" shortcut aria-label="Search" placeholder="Search" icon={SearchLg} />
  </div>
);

const SidebarFooter: FC<{ children?: ReactNode }> = ({ children }) => (
  <div className={SIDEBAR_FOOTER_CLASS}>
    {children}
    <NavAccountCard selectedAccountId="caitlyn" items={accountForDemo} />
  </div>
);

/** Featured-card rail — used by all sidebar card variants. */
const FeaturedCardRail: FC<{ children: ReactNode }> = ({ children }) => (
  <SidebarAside>
    <SidebarHeader />
    <NavList activeUrl="#home" items={featuredNavItems} />
    <div className="px-4 pb-4">{children}</div>
  </SidebarAside>
);

// ─── SIDEBAR DEMOS ───────────────────────────────────────────────────────────

const SimpleSidebar: FC = () => (
  <SidebarAside
    style={{ "--width": "280px" } as CSSProperties}
    className={simpleSidebarShellClass}
  >
    <SidebarHeader />
    <NavList activeUrl="#home" items={opusApplicationNavItems} />
    <SidebarFooter />
  </SidebarAside>
);

const DualTierSidebar: FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [hoveredItem, setHoveredItem] = useState<NavItemType | undefined>(undefined);

  const activeUrl = "#ai-assist-matter";
  const activeItem = dualTierNavItems.find(
    (item) => item.href === activeUrl || item.items?.some((c) => c.href === activeUrl),
  );
  const [currentItem, setCurrentItem] = useState<NavItemType | undefined>(activeItem ?? dualTierNavItems[0]);

  const flyoutItem = !isExpanded && hoveredItem?.items?.length ? hoveredItem : undefined;

  return (
    <aside className="codex-docs-surface-reset group flex h-full max-h-full max-w-full overflow-y-auto bg-primary">
      <div className="flex h-full" onPointerLeave={() => setHoveredItem(undefined)}>
        {/* Animated rail */}
        <motion.div
          animate={{ width: isExpanded ? DUAL_TIER_EXPANDED_WIDTH : DUAL_TIER_COLLAPSED_WIDTH }}
          transition={{ type: "spring", damping: 26, stiffness: 220, bounce: 0 }}
          className="relative flex h-full flex-col overflow-hidden border-r border-secondary pt-4 lg:pt-5"
        >
          {/* Header */}
          {isExpanded ? (
            <div className="mb-5 flex h-6 items-center justify-between px-3">
              <a
                href="#"
                aria-label="Opus home"
                className="flex h-full min-w-0 items-center rounded-xs outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <Opus2Wordmark className="h-full shrink-0 text-sm font-semibold tracking-[0.02em]" aria-hidden />
              </a>
              <button aria-label="Collapse sidebar" onClick={() => setIsExpanded(false)} className={`ml-1 ${TOGGLE_BTN_CLASS}`}>
                <LayoutLeft className="size-4" aria-hidden />
              </button>
            </div>
          ) : (
            <div className="mb-5 flex h-6 items-center justify-center">
              <button aria-label="Expand sidebar" onClick={() => setIsExpanded(true)} className={TOGGLE_BTN_CLASS}>
                <LayoutRight className="size-4" aria-hidden />
              </button>
            </div>
          )}

          {/* Nav */}
          {isExpanded ? (
            <NavList activeUrl={activeUrl} items={dualTierNavItems} className="flex-1 overflow-y-auto" />
          ) : (
            <ul data-nav-list-slim className="flex flex-1 list-none flex-col gap-0.5 overflow-y-auto px-3.5">
              {dualTierNavItems.map((item) => (
                <li key={item.label} onMouseEnter={() => setHoveredItem(item)} onMouseLeave={() => setHoveredItem(undefined)}>
                  <NavButton
                    label={item.label}
                    href={item.href}
                    icon={item.icon}
                    current={currentItem?.href === item.href}
                    onClick={() => setCurrentItem(item)}
                  />
                </li>
              ))}
            </ul>
          )}

          {/* Footer */}
          <AnimatePresence initial={false}>
            {isExpanded ? (
              <motion.div
                key="expanded-footer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
                className="flex flex-col gap-3 px-4 pb-4 lg:pb-5"
              >
                <Button color="secondary" size="sm" iconLeading={HelpCircle} className="w-full justify-center">
                  Help or support?
                </Button>
                <p className="m-0 px-1 text-xs text-tertiary">© 2026 Opus 2</p>
              </motion.div>
            ) : (
              <motion.div
                key="collapsed-footer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
                className="flex flex-col items-center gap-2 px-3 pb-4 lg:pb-5"
              >
                <NavButton label="Help or support?" icon={HelpCircle} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Flyout pane */}
        <AnimatePresence initial={false}>
          {flyoutItem && (
            <motion.div
              key="flyout"
              initial={{ width: 0 }}
              animate={{ width: DUAL_TIER_FLYOUT_WIDTH }}
              exit={{ width: 0, transition: { duration: 0.15 } }}
              transition={{ type: "spring", damping: 26, stiffness: 220, bounce: 0 }}
              onMouseEnter={() => setHoveredItem(flyoutItem)}
              onMouseLeave={() => setHoveredItem(undefined)}
              className="box-content h-full overflow-x-hidden overflow-y-auto border-r border-secondary bg-primary"
            >
              <div style={{ width: DUAL_TIER_FLYOUT_WIDTH }} className="flex h-full flex-col px-4 pt-4 lg:pt-5">
                {/* Spacer aligns label with rail header row */}
                <div className="mb-5 flex h-6 items-center">
                  <h3 className="text-sm font-semibold text-brand-secondary">{flyoutItem.label}</h3>
                </div>
                <ul className="list-none">
                  {flyoutItem.items?.map((item) => (
                    <li key={item.label} className="py-px">
                      <NavItemBase current={activeUrl === item.href} href={item.href} icon={item.icon} badge={item.badge} type="link">
                        {item.label}
                      </NavItemBase>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
};

const SlimSidebar: FC = () => (
  <div className="codex-docs-surface-reset h-full min-h-0 min-w-0">
    <SidebarNavigationSlim activeUrl="#slim-dashboard-notifications" items={slimNavItems} footerItems={slimFooterNavItems} />
  </div>
);

const DividersSidebar: FC = () => (
  <SidebarAside>
    <SidebarHeader />
    <NavList activeUrl="#div-home" items={navItemsSectionDividers} />
    <SidebarFooter />
  </SidebarAside>
);

const SubheadingsSidebar: FC = () => (
  <SidebarAside>
    <SidebarHeader />
    <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 pb-4 pt-2">
      {[
        {
          label: "Workspace",
          items: [
            { href: "#sub-home", icon: Home01, label: "Home", current: true },
            { href: "#sub-projects", icon: LayersTwo01, label: "Projects" },
          ],
        },
        {
          label: "Account",
          items: [
            { href: "#sub-profile", icon: Users01, label: "Profile" },
            { href: "#sub-settings", icon: Settings01, label: "Settings" },
          ],
        },
      ].map(({ label, items }) => (
        <div key={label}>
          <p className="m-0 px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-tertiary">{label}</p>
          <ul className="flex list-none! flex-col gap-px ps-0">
            {items.map(({ href, icon, label: itemLabel, current }) => (
              <li key={href}>
                <NavItemBase type="link" href={href} icon={icon} current={current}>
                  {itemLabel}
                </NavItemBase>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </SidebarAside>
);

// ─── FEATURED CARD DEMOS ─────────────────────────────────────────────────────

/** Two-button row used in Image, Cookie, Event, Message cards. */
const CardActions: FC<{ primary: string; secondary?: string }> = ({ primary, secondary = "Dismiss" }) => (
  <div className="mt-4 flex gap-2">
    <Button color="secondary" size="sm" className="flex-1">{secondary}</Button>
    <Button color="primary" size="sm" className="flex-1">{primary}</Button>
  </div>
);

// ─── DOCS PAGE ───────────────────────────────────────────────────────────────

/** Shared wrapper for every sidebar DocsSection — avoids repeating previewClassName. */
const SidebarSection: FC<{
  id: string;
  title: string;
  code: string;
  children: ReactNode;
  slim?: boolean;
}> = ({ id, title, code, children, slim = false }) => (
  <DocsSection id={id} title={title} previewClassName={DOCS_PREVIEW_SURFACE_CLASS_SIDEBAR_NAV} code={code}>
    <div className={slim ? slimSidebarPreviewRailClass : sidebarPreviewRailClass}>{children}</div>
  </DocsSection>
);

function SidebarNavigationsOverview() {
  return null;
}

const SidebarNavigationsDocsPage: FC = () => (
  <div className="docs-sbdocs-with-toc-layout">
    <StorybookRootHeaderPortal>
      <DocsPageBreadcrumb catalog="application" currentLabel="Sidebar navigations" />
    </StorybookRootHeaderPortal>
    <StorybookSbdocsTocPortal>
      <OnThisPageNav items={SIDEBAR_DOCS_TOC} />
    </StorybookSbdocsTocPortal>

    <main className="docs-sbdocs-content typography">
      <div className={DOCS_SECTION_HERO_CLASS}>
        <h1 className="docs-h1">Sidebar navigations</h1>
        <p>
          Sidebar navigation patterns for modern applications, built with React Aria primitives and Tailwind in{" "}
          <code className="text-sm">@opus2-platform/codex</code>. Compose <code className="text-sm">NavList</code>,{" "}
          <code className="text-sm">NavItemBase</code>, <code className="text-sm">Input</code>,{" "}
          <code className="text-sm">Opus2Wordmark</code>, and <code className="text-sm">NavAccountCard</code> — there is
          no single <code className="text-sm">SidebarNavigation</code> export.
        </p>
        <DocsSection
          id="sidebar-navigation-example"
          title="Sidebar navigation example"
          sectionClassName="not-typography group flex w-full min-w-0 max-w-full scroll-mt-20 flex-col gap-3"
          previewClassName={DOCS_PREVIEW_HERO_SURFACE_CLASS_SIDEBAR_NAV}
          defaultDocsTab="preview"
          code={SIDEBAR_NAVIGATION_EXAMPLE_CODE}
          codePanel={
            <DocsUntitledMultiFileCodePanel
              showFileTabs={false}
              panelHeightPx={904}
              files={[{ label: "sidebar-section-dividers.tsx", code: SIDEBAR_NAVIGATION_EXAMPLE_CODE }]}
            />
          }
        >
          <SidebarPreviewRail>
            <DividersSidebar />
          </SidebarPreviewRail>
        </DocsSection>
      </div>

      <div className="docs-sections-wrap">
        {/* Simple */}
        <DocsSection
          id="simple"
          title="Simple"
          sectionClassName={`${DOCS_SECTION_CLASS} not-typography`}
          previewClassName={DOCS_PREVIEW_SURFACE_CLASS_SIDEBAR_NAV}
          defaultDocsTab="preview"
          code={SIMPLE_SIDEBAR_CODE}
          codePanel={<DocsUntitledMultiFileCodePanel defaultFileIndex={1} panelHeightPx={904} files={SIMPLE_DOCS_CODE_FILES} />}
        >
          <SidebarPreviewRail>
            <SimpleSidebar />
          </SidebarPreviewRail>
        </DocsSection>

        {/* Dual-tier */}
        <DocsSection
          id="dual-tier"
          title="Dual-tier"
          previewClassName={DOCS_PREVIEW_SURFACE_CLASS_SIDEBAR_NAV}
          code={`// Nested \`items\`: collapsible \`details\` below lg; flat top-level links at lg+ (\`dualTier\`).

const items = [
  {
    label: "Reporting",
    href: "/reporting",
    icon: BarChartSquare02,
    items: [
      { label: "Overview", href: "/reporting/overview" },
      { label: "Schedules", href: "/reporting/schedules" },
    ],
  },
];

<NavList dualTier activeUrl="/reporting/overview" items={items} />

// Shell (Untitled): outer aside \`overflow-y-auto\`, inner column \`lg:w-(--width)\` + \`border-r\`.`}
        >
          <SidebarPreviewRail>
            <DualTierSidebar />
          </SidebarPreviewRail>
        </DocsSection>

        {/* Slim */}
        <DocsSection
          id="slim"
          title="Slim"
          previewClassName={DOCS_PREVIEW_SURFACE_CLASS_SIDEBAR_NAV}
          code={`import { SidebarNavigationSlim, type NavItemType } from "@opus2-platform/codex";
import { BarChartSquare02, Grid03, HomeLine, LifeBuoy01, NotificationBox, Rows01, Settings01 } from "@opus2-platform/icons";

const items: NavItemType[] = [
  {
    label: "Home",
    href: "/",
    icon: HomeLine,
    items: [{ label: "Overview", href: "/overview", icon: Grid03 }, /* … */],
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: BarChartSquare02,
    items: [{ label: "Notifications", href: "/dashboard/notifications", icon: NotificationBox, badge: 10 }, /* … */],
  },
  /* … */
];

<SidebarNavigationSlim
  activeUrl="/dashboard/notifications"
  items={items}
  footerItems={[
    { label: "Support", href: "/support", icon: LifeBuoy01 },
    { label: "Settings", href: "/settings", icon: Settings01 },
  ]}
/>`}
        >
          <div className={slimSidebarPreviewRailClass}>
            <SlimSidebar />
          </div>
        </DocsSection>

        {/* Sections dividers */}
        <SidebarSection
          id="sections-dividers"
          title="Sections dividers"
          code={`import { BadgeWithDot, Input, NavList, Opus2Wordmark } from "@opus2-platform/codex";
import { BarChartSquare02, Folder, HomeLine, LayoutAlt01, MessageChatCircle, PieChart03, Rows01, SearchLg, Settings01 } from "@opus2-platform/icons";

const navItemsWithDividers = [
  { label: "Home", href: "/", icon: HomeLine },
  { label: "Dashboard", href: "/dashboard", icon: BarChartSquare02 },
  { label: "Projects", href: "/projects", icon: Rows01 },
  { divider: true },
  {
    label: "Folders",
    icon: Folder,
    href: "/folders",
    items: [
      { label: "View all", badge: 18, href: "/folders/view-all" },
      { label: "Recent", badge: 8, href: "/folders/recent" },
    ],
  },
  { divider: true },
  { label: "Reporting", href: "/reporting", icon: PieChart03 },
  { label: "Settings", href: "/settings", icon: Settings01 },
  {
    label: "Support",
    href: "/support",
    icon: MessageChatCircle,
    badge: (
      <BadgeWithDot color="success" type="modern" size="sm">
        Online
      </BadgeWithDot>
    ),
  },
  { label: "Open in browser", href: "https://example.com", icon: LayoutAlt01 },
];

<NavList activeUrl="/" items={navItemsWithDividers} />`}
        >
          <DividersSidebar />
        </SidebarSection>

        {/* Sections subheadings */}
        <SidebarSection
          id="sections-subheadings"
          title="Sections subheadings"
          code={`<div>
  <p className="px-2 pb-2 text-xs font-semibold tracking-wide text-tertiary uppercase">Workspace</p>
  <ul className="flex list-none flex-col gap-px ps-0">
    <li>
      <NavItemBase type="link" href="/home" icon={Home01} current>Home</NavItemBase>
    </li>
  </ul>
</div>`}
        >
          <SubheadingsSidebar />
        </SidebarSection>

        {/* Featured cards heading */}
        <section id="featured-cards" className={`${DOCS_SECTION_CLASS} !gap-2`}>
          <h3 className="text-md font-semibold text-primary">
            <SectionTitle>Featured cards</SectionTitle>
          </h3>
          <p className="text-md max-w-3xl text-tertiary">
            Featured cards sit below the main nav list. Use any of the patterns in the following sections inside the sidebar content area.
          </p>
        </section>

        {/* Progress bar */}
        <SidebarSection
          id="progress-bar"
          title="Progress bar"
          code={`import { ProgressBar } from "@opus2-platform/codex";

<div className="rounded-xl bg-secondary_alt p-4 ring-1 ring-inset ring-secondary">
  <p className="text-sm font-semibold text-secondary">Storage</p>
  <p className="mt-1 text-sm text-tertiary">12.4 GB of 20 GB used</p>
  <div className="mt-4">
    <ProgressBar value={62} labelPosition="right" valueFormatter={(v) => \`\${v}%\`} />
  </div>
</div>`}
        >
          <FeaturedCardRail>
            <div className={FEATURED_CARD_CLASS}>
              <p className="m-0 text-sm font-semibold text-secondary">Storage</p>
              <p className="m-0 mt-1 text-sm text-tertiary">12.4 GB of 20 GB used</p>
              <div className="mt-4">
                <ProgressBar value={62} labelPosition="right" valueFormatter={(v) => `${v}%`} />
              </div>
            </div>
          </FeaturedCardRail>
        </SidebarSection>

        {/* Progress circle */}
        <SidebarSection
          id="progress-circle"
          title="Progress circle"
          code={`import { ProgressBarCircle } from "@opus2-platform/codex";

<ProgressBarCircle value={62} size="sm" label="Storage" />`}
        >
          <FeaturedCardRail>
            <div className={`${FEATURED_CARD_CLASS} flex flex-col items-center gap-3`}>
              <ProgressBarCircle value={62} size="sm" label="Storage" />
              <p className="m-0 text-center text-xs text-tertiary">12.4 GB of 20 GB used</p>
            </div>
          </FeaturedCardRail>
        </SidebarSection>

        {/* Image */}
        <SidebarSection
          id="featured-image"
          title="Image"
          code={`// Image + headline + actions inside the featured card shell (rounded-xl bg-secondary_alt …).`}
        >
          <FeaturedCardRail>
            <div className={`${FEATURED_CARD_CLASS} space-y-3`}>
              <img src={CODEX_DOCS_AVATAR_SRC} alt="" className="aspect-video w-full rounded-lg object-cover" />
              <p className="m-0 text-sm font-semibold text-secondary">New features available!</p>
              <p className="m-0 text-sm text-tertiary">Check out the new dashboard view. Pages now load faster.</p>
              <CardActions primary="What's new?" />
            </div>
          </FeaturedCardRail>
        </SidebarSection>

        {/* Cookie preferences */}
        <SidebarSection
          id="cookie-preferences"
          title="Cookie preferences"
          code={`// Short copy + Reject all / Accept all actions in the featured card shell.`}
        >
          <FeaturedCardRail>
            <div className={FEATURED_CARD_CLASS}>
              <p className="m-0 text-sm font-semibold text-secondary">Cookie preferences</p>
              <p className="m-0 mt-2 text-sm text-tertiary">We use cookies to analyze traffic, remember preferences, and improve your experience.</p>
              <CardActions primary="Accept all" secondary="Reject all" />
            </div>
          </FeaturedCardRail>
        </SidebarSection>

        {/* Referral link */}
        <SidebarSection
          id="referral-link"
          title="Referral link"
          code={`// Referral headline, supporting text, primary action.`}
        >
          <FeaturedCardRail>
            <div className={FEATURED_CARD_CLASS}>
              <p className="m-0 text-sm font-semibold text-secondary">Refer a friend</p>
              <p className="m-0 mt-2 text-sm text-tertiary">Earn 50% back for 12 months when someone uses your link.</p>
              <Button color="primary" size="sm" className="mt-4 w-full">Copy link</Button>
            </div>
          </FeaturedCardRail>
        </SidebarSection>

        {/* Onboarding steps */}
        <SidebarSection
          id="onboarding-steps"
          title="Onboarding steps"
          code={`// Step indicator + checklist + continue CTA.`}
        >
          <FeaturedCardRail>
            <div className={FEATURED_CARD_CLASS}>
              <p className="m-0 text-xs font-medium text-tertiary">Complete account</p>
              <p className="m-0 mt-1 text-sm font-semibold text-secondary">Step 3 of 4</p>
              <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-tertiary">
                <li>Complete your profile</li>
                <li>Verify your phone number</li>
                <li>Set up 2FA and backups</li>
                <li>Add payout bank details</li>
              </ul>
              <Button color="primary" size="sm" className="mt-4 w-full">Continue setup</Button>
            </div>
          </FeaturedCardRail>
        </SidebarSection>

        {/* Upgrade CTA */}
        <SidebarSection
          id="upgrade-cta"
          title="Upgrade CTA"
          code={`import { Badge, Button } from "@opus2-platform/codex";`}
        >
          <FeaturedCardRail>
            <div className={FEATURED_CARD_CLASS}>
              <div className="flex items-center gap-2">
                <Badge color="brand" size="sm">Upgrade to PRO</Badge>
                <span className="text-xs font-semibold text-brand-secondary">20% OFF</span>
              </div>
              <p className="m-0 mt-3 text-sm text-tertiary">Unlock 20+ integrations, 40 GB data, and advanced reporting.</p>
              <Button color="primary" size="sm" className="mt-4 w-full">Upgrade now</Button>
            </div>
          </FeaturedCardRail>
        </SidebarSection>

        {/* Support CTA */}
        <SidebarSection
          id="support-cta"
          title="Support CTA"
          code={`import { BadgeWithDot, Button } from "@opus2-platform/codex";`}
        >
          <FeaturedCardRail>
            <div className={FEATURED_CARD_CLASS}>
              <BadgeWithDot color="success" type="modern" size="sm">Online</BadgeWithDot>
              <p className="m-0 mt-3 text-sm font-semibold text-secondary">Need help with something?</p>
              <p className="m-0 mt-1 text-sm text-tertiary">Our experts are ready to help.</p>
              <Button color="primary" size="sm" className="mt-4 w-full">Chat to support</Button>
            </div>
          </FeaturedCardRail>
        </SidebarSection>

        {/* Event CTA */}
        <SidebarSection
          id="event-cta"
          title="Event CTA"
          code={`import { Avatar, Badge, Button } from "@opus2-platform/codex";`}
        >
          <FeaturedCardRail>
            <div className={FEATURED_CARD_CLASS}>
              <div className="flex -space-x-2">
                {[0, 1, 2].map((i) => (
                  <Avatar key={i} size="sm" src={CODEX_DOCS_AVATAR_SRC} alt="" className="ring-2 ring-bg-primary" />
                ))}
                <div className="flex size-8 items-center justify-center rounded-full bg-tertiary text-xs font-semibold text-secondary ring-2 ring-bg-primary">
                  +5
                </div>
              </div>
              <p className="m-0 mt-3 text-sm font-semibold text-secondary">Join our workshop</p>
              <Badge color="success" size="sm" className="mt-1">Live</Badge>
              <p className="m-0 mt-2 text-sm text-tertiary">Learn how to leverage AI to supercharge your workflow.</p>
              <CardActions primary="Join now!" />
            </div>
          </FeaturedCardRail>
        </SidebarSection>

        {/* Message */}
        <SidebarSection
          id="message-card"
          title="Message"
          code={`import { Avatar, Button } from "@opus2-platform/codex";`}
        >
          <FeaturedCardRail>
            <div className={FEATURED_CARD_CLASS}>
              <div className="flex gap-3">
                <Avatar size="md" src={CODEX_DOCS_AVATAR_SRC} alt="" />
                <div className="min-w-0 flex-1">
                  <p className="m-0 text-sm font-semibold text-secondary">Mathilde Lewis</p>
                  <p className="m-0 text-xs text-quaternary">2 mins ago</p>
                </div>
              </div>
              <p className="m-0 mt-3 text-sm text-tertiary">I&apos;ve finished adding my notes. Happy for you to review!</p>
              <CardActions primary="Reply" />
            </div>
          </FeaturedCardRail>
        </SidebarSection>

        {/* Current projects */}
        <SidebarSection
          id="current-projects"
          title="Current projects"
          code={`import { Button } from "@opus2-platform/codex";`}
        >
          <FeaturedCardRail>
            <div className={FEATURED_CARD_CLASS}>
              <p className="m-0 text-sm font-semibold text-secondary">Current projects</p>
              <ul className="mt-3 list-none space-y-2 p-0 text-sm text-tertiary">
                <li>Dashboard design 2.0</li>
                <li>Marketing site CMS</li>
                <li>iOS app prototypes</li>
              </ul>
              <Button color="link-color" size="sm" className="mt-3 px-0">All projects</Button>
            </div>
          </FeaturedCardRail>
        </SidebarSection>

        {/* Free trial CTA */}
        <SidebarSection
          id="free-trial-cta"
          title="Free trial CTA"
          code={`import { Badge, Button } from "@opus2-platform/codex";`}
        >
          <FeaturedCardRail>
            <div className={FEATURED_CARD_CLASS}>
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-secondary">Free trial</span>
                <Badge color="warning" size="sm">24 days left</Badge>
              </div>
              <Button color="primary" size="sm" className="mt-4 w-full">Upgrade now</Button>
            </div>
          </FeaturedCardRail>
        </SidebarSection>

        {/* QR code */}
        <SidebarSection
          id="qr-code"
          title="QR code"
          code={`import { QRCode } from "@opus2-platform/codex";

<QRCode value="https://example.com/verify" size="md" />`}
        >
          <FeaturedCardRail>
            <div className={`${FEATURED_CARD_CLASS} flex flex-col items-center`}>
              <p className="m-0 w-full text-sm font-semibold text-secondary">Verify this device</p>
              <p className="m-0 mt-2 w-full text-sm text-tertiary">Open the app and scan the QR code below to verify this device.</p>
              <div className="mt-4 flex justify-center">
                <QRCode value="https://opus2.com/verify" size="md" />
              </div>
              <Button color="link-color" size="sm" className="mt-4 px-0">Verify another way</Button>
            </div>
          </FeaturedCardRail>
        </SidebarSection>
      </div>
    </main>
  </div>
);

// ─── STORY CONFIG ────────────────────────────────────────────────────────────

const meta = {
  title: "Application UI/Sidebar navigations",
  component: SidebarNavigationsOverview,
  tags: ["autodocs"],
  parameters: {
    docs: { page: SidebarNavigationsDocsPage },
  },
} satisfies Meta<typeof SidebarNavigationsOverview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  tags: ["!dev"],
  name: "Sidebar navigations",
  render: () => (
    <SidebarPreviewRail>
      <SimpleSidebar />
    </SidebarPreviewRail>
  ),
};
