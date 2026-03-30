import type { FC, ReactNode } from "react";

import { STORYBOOK_OVERVIEW_HREF } from "./storybook-manager-urls";

const Chevron = () => (
  <div className="text-fg-quaternary shrink-0">
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" aria-hidden="true" className="size-4">
      <path d="m9 18 6-6-6-6" />
    </svg>
  </div>
);

const crumbLinkClass =
  "group outline-focus-ring hover:bg-primary_hover inline-flex cursor-pointer items-center justify-center gap-1 rounded-md p-1 transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 lg:p-1.5";

/** `href` → manager shell (`/` not iframe). Omit for non-navigable crumbs (same styles, no link). */
const CrumbLink: FC<{ children: ReactNode; href?: string }> = ({ children, href }) =>
  href ? (
    <a href={href} className={crumbLinkClass}>
      {children}
    </a>
  ) : (
    <span className={crumbLinkClass}>{children}</span>
  );

/** Sticky docs breadcrumb: Base components → Components → current page. */
export const DocsPageBreadcrumb: FC<{ currentLabel: string }> = ({ currentLabel }) => (
  <>
    <div className="bg-primary border-secondary fixed inset-x-0 top-0 z-30 w-full border-b">
      <div className="mx-auto flex size-full flex-1 items-center py-3 pr-3 pl-4 md:py-3 lg:px-5 lg:py-2.5">
        <nav aria-label="Breadcrumbs" className="min-w-0 max-lg:hidden">
          <ol aria-label="Breadcrumbs" className="relative flex gap-0.5 lg:gap-1">
            <li className="flex items-center gap-0.5 lg:gap-1">
              <CrumbLink href={STORYBOOK_OVERVIEW_HREF}>
                <span className="text-quaternary group-hover:text-tertiary_hover px-1 text-sm font-semibold whitespace-nowrap">Base components</span>
              </CrumbLink>
              <Chevron />
            </li>
            <li className="flex items-center gap-0.5 lg:gap-1">
              <CrumbLink>
                <span className="text-quaternary group-hover:text-tertiary_hover px-1 text-sm font-semibold whitespace-nowrap">Components</span>
              </CrumbLink>
              <Chevron />
            </li>
            <li className="flex items-center gap-0.5 lg:gap-1">
              <button type="button" className="bg-primary_hover cursor-default rounded-md p-1 lg:p-1.5">
                <span className="text-fg-tertiary_hover px-1 text-sm font-semibold whitespace-nowrap">{currentLabel}</span>
              </button>
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <div className="mb-10 h-14 shrink-0 md:mb-12" aria-hidden="true" />
  </>
);
