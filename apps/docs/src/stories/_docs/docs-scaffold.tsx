import type { FC, ReactNode } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export const DOCS_SB_LAYOUT_CLASS = "docs-sbdocs-with-toc-layout";
export const DOCS_ON_THIS_PAGE_HOST_ATTR = "data-docs-on-this-page";
export const DOCS_ON_THIS_PAGE_HOST_CLASS = "docs-on-this-page-host";

export const StorybookRootHeaderPortal: FC<{ children: ReactNode }> = ({ children }) => {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const storybookDocs = document.getElementById("storybook-docs");
    const storybookRoot = document.getElementById("storybook-root");
    const portalNode = document.createElement("div");
    portalNode.setAttribute("data-docs-sticky-header", "true");

    if (storybookDocs?.parentElement) {
      storybookDocs.insertAdjacentElement("beforebegin", portalNode);
    } else if (storybookRoot?.parentElement) {
      storybookRoot.insertAdjacentElement("afterend", portalNode);
    } else {
      document.body.prepend(portalNode);
    }

    setMountNode(portalNode);
    return () => portalNode.remove();
  }, []);

  return mountNode ? createPortal(children, mountNode) : null;
};

/** Mount TOC after Storybook’s `.sbdocs-wrapper` (sibling in DOM), not inside the page `main`. */
export const StorybookSbdocsTocPortal: FC<{ children: ReactNode }> = ({ children }) => {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let portalHost: HTMLDivElement | null = null;
    let layoutParent: HTMLElement | null = null;
    let intervalId: ReturnType<typeof setInterval> | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const cleanup = () => {
      if (intervalId !== undefined) clearInterval(intervalId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      portalHost?.remove();
      portalHost = null;
      layoutParent?.classList.remove(DOCS_SB_LAYOUT_CLASS);
      layoutParent = null;
      setMountNode(null);
    };

    const attach = (): boolean => {
      if (portalHost) return true;
      const wrapper = document.querySelector<HTMLElement>("#storybook-docs .sbdocs-wrapper") ?? document.querySelector<HTMLElement>(".sbdocs-wrapper");
      if (!wrapper?.parentElement) return false;

      portalHost = document.createElement("div");
      portalHost.setAttribute(DOCS_ON_THIS_PAGE_HOST_ATTR, "true");
      portalHost.className = DOCS_ON_THIS_PAGE_HOST_CLASS;
      wrapper.insertAdjacentElement("afterend", portalHost);

      layoutParent = wrapper.parentElement;
      layoutParent.classList.add(DOCS_SB_LAYOUT_CLASS);
      setMountNode(portalHost);

      if (intervalId !== undefined) {
        clearInterval(intervalId);
        intervalId = undefined;
      }

      return true;
    };

    if (attach()) return cleanup;

    intervalId = setInterval(() => {
      attach();
    }, 50);

    timeoutId = setTimeout(() => {
      if (intervalId !== undefined) clearInterval(intervalId);
    }, 5000);

    return cleanup;
  }, []);

  return mountNode ? createPortal(children, mountNode) : null;
};

export type OnThisPageItem = { id: string; label: string };

/** Right-side “On this page” nav, matching the Avatars/Button pages exactly. */
export const OnThisPageNav: FC<{ items: readonly OnThisPageItem[] }> = ({ items }) => {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const trackRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [indicator, setIndicator] = useState({ top: 0, height: 0 });

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = visible[0]?.target.id;
        if (id) setActiveId(id);
      },
      { root: null, rootMargin: "-10% 0px -50% 0px", threshold: [0, 0.1, 0.25, 0.5, 1] }
    );

    for (const { id } of items) {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    }

    return () => obs.disconnect();
  }, [items]);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const link = linkRefs.current.get(activeId);
    if (!track || !link) return;
    const trackRect = track.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    setIndicator({ top: linkRect.top - trackRect.top, height: linkRect.height });
  }, [activeId]);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  };

  return (
    <nav aria-label="On this page" className="w-54 pb-10 text-sm">
      <div className="lg:max-w-auto flex max-h-[calc(100vh-calc(var(--spacing)*19))] flex-col pb-8">
        <div className="flex items-center gap-1.5">
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="text-fg-quaternary size-4"
          >
            <path d="M3 12h18M3 6h18M3 18h12" />
          </svg>
          <p className="text-primary text-xs font-semibold">On this page</p>
        </div>
        <div className="relative min-h-40 overflow-auto">
          <div className="sticky inset-x-0 top-0 z-1 h-0 max-h-0">
            <div
              className="from-bg-primary pointer-events-none z-1 h-6 w-full bg-linear-to-b to-transparent opacity-0 transition-opacity duration-100 ease-linear"
              aria-hidden
            />
          </div>
          <div ref={trackRef} className="relative flex overflow-auto pt-4 pb-8">
            <div className="bg-border-secondary w-0.5 shrink-0" aria-hidden />
            <div
              className="bg-fg-brand-primary_alt absolute left-0 w-0.5 transition-all duration-150 ease-linear"
              style={{
                top: indicator.top,
                height: indicator.height,
                opacity: indicator.height > 0 ? 1 : 0,
              }}
              aria-hidden
            />
            <ul className="relative flex h-full flex-col gap-2 pl-3">
              {items.map(({ id, label }) => (
                <li key={id} className="flex">
                  <a
                    ref={(el) => {
                      if (el) linkRefs.current.set(id, el);
                      else linkRefs.current.delete(id);
                    }}
                    href={`#${id}`}
                    data-id={id}
                    className={`outline-focus-ring rounded-xs text-sm font-semibold transition-colors duration-150 ease-linear focus:outline-2 focus:outline-offset-2 ${
                      activeId === id ? "text-brand-secondary" : "text-quaternary hover:text-tertiary_hover"
                    }`}
                    onClick={(e) => {
                      // Storybook docs router remounts on hash navigation — scroll in-page only.
                      e.preventDefault();
                      scrollToSection(id);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        scrollToSection(id);
                      }
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="sticky inset-x-0 bottom-0 z-1 flex h-0 max-h-0 items-end">
            <div className="from-bg-primary pointer-events-none z-1 h-8 w-full bg-linear-to-t to-transparent" aria-hidden />
          </div>
        </div>
      </div>
    </nav>
  );
};

