import type { CSSProperties, FC } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { codeToHtml } from "shiki";
import { Button as AriaButton, Tab as AriaTab, TabList as AriaTabList, TabPanel as AriaTabPanel, Tabs as AriaTabs } from "react-aria-components";

export type DocsUntitledCodeFile = {
  /** Tab label, e.g. `page.tsx` or `app-navigation/sidebar-simple.tsx` */
  label: string;
  code: string;
};

const fileTabBtnIdle =
  "z-10 flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md px-2 py-1 text-sm font-semibold whitespace-nowrap text-quaternary transition duration-100 ease-linear outline-focus-ring";
const fileTabBtnSelected =
  "z-10 flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md px-2 py-1 text-sm font-semibold whitespace-nowrap text-primary transition duration-100 ease-linear outline-focus-ring";

const outerTabsClass =
  "group relative w-full min-w-0 max-w-full rounded-t-xl rounded-b-[20px] bg-secondary_alt ring-1 ring-secondary ring-inset in-[.typography]:not-group-data-tabs:not-group-data-preview:mt-5 in-[.typography]:not-group-data-tabs:not-group-data-preview:not-last:mb-5 [[role='tabpanel']>&]:nth-[1]:mt-0! [[role='tabpanel']>&]:nth-[2]:mt-0!";

const fileTabListClass =
  "group not-typography relative flex w-full min-w-0 max-w-full shrink-0 flex-nowrap items-center gap-0 overflow-x-auto overflow-y-hidden mask-r-from-90% mask-r-to-100% pt-2 pb-2 pl-3 pr-20 scrollbar-hide";

/** Matches Untitled UI code-well copy control (catalog DOM). */
const copyBtnFloating =
  "group inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-fg-quaternary hover:bg-primary_hover hover:text-fg-quaternary_hover *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-4 absolute top-4 right-4 z-10 opacity-0 group-hover/pre:opacity-100 focus:opacity-100 group-data-preview:hidden group-data-preview:h-full group-data-tabs:-top-2 group-data-tabs:right-1 group-data-tabs:-translate-y-full group-data-tabs:opacity-100 group-has-[.diff]/pre:hidden";

/** Outer `<pre>` — Untitled catalog / `CodeSnippet` stack (`overflow-y-hidden` omitted to match live Untitled DOM). */
const UNTITLED_OUTER_PRE_CLASS =
  "flex h-full min-h-0 max-w-full flex-1 flex-col overflow-x-auto overflow-y-hidden bg-primary p-5 font-mono text-sm leading-[24px] font-medium [&_.line]:min-h-6 [&_code]:flex [&_code]:flex-col pb-12";

/** Untitled “Show more” secondary button (verbatim class stack from their docs DOM). */
const UNTITLED_SHOW_MORE_BTN_CLASS =
  "group relative inline-flex h-max cursor-pointer items-center justify-center whitespace-nowrap outline-brand transition duration-100 ease-linear before:absolute focus-visible:outline-2 focus-visible:outline-offset-2 in-data-input-wrapper:shadow-xs in-data-input-wrapper:focus:!z-50 in-data-input-wrapper:in-data-leading:-mr-px in-data-input-wrapper:in-data-leading:rounded-r-none in-data-input-wrapper:in-data-leading:before:rounded-r-none in-data-input-wrapper:in-data-trailing:-ml-px in-data-input-wrapper:in-data-trailing:rounded-l-none in-data-input-wrapper:in-data-trailing:before:rounded-l-none disabled:cursor-not-allowed disabled:opacity-50 in-data-input-wrapper:disabled:opacity-100 *:data-icon:pointer-events-none *:data-icon:size-5 *:data-icon:shrink-0 *:data-icon:transition-inherit-all gap-1 rounded-lg px-3 py-2 text-sm font-semibold before:rounded-[7px] data-icon-only:p-2 in-data-input-wrapper:px-3.5 in-data-input-wrapper:py-2.5 in-data-input-wrapper:data-icon-only:p-2.5 bg-primary text-secondary shadow-xs-skeuomorphic ring-1 ring-primary ring-inset hover:bg-primary_hover hover:text-secondary_hover data-loading:bg-primary_hover *:data-icon:text-fg-quaternary hover:*:data-icon:text-fg-quaternary_hover";

const UNTITLED_CODE_FADE_LIGHT =
  "rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.0208296) 4.7%, rgba(255, 255, 255, 0.0439704) 8.9%, rgba(255, 255, 255, 0.0704) 12.8%, rgba(255, 255, 255, 0.101096) 16.56%, rgba(255, 255, 255, 0.137037) 20.37%, rgba(255, 255, 255, 0.1792) 24.4%, rgba(255, 255, 255, 0.228563) 28.83%, rgba(255, 255, 255, 0.286104) 33.84%, rgba(255, 255, 255, 0.3528) 39.6%, rgba(255, 255, 255, 0.42963) 46.3%, rgba(255, 255, 255, 0.51757) 54.1%, rgba(255, 255, 255, 0.6176) 63.2%, rgba(255, 255, 255, 0.730696) 73.76%, rgba(255, 255, 255, 0.857837) 85.97%, #FFFFFF 100%";

const UNTITLED_CODE_FADE_DARK =
  "rgba(12, 14, 18, 0) 0%, rgba(12, 14, 18, 0.0208296) 4.7%, rgba(12, 14, 18, 0.0439704) 8.9%, rgba(12, 14, 18, 0.0704) 12.8%, rgba(12, 14, 18, 0.101096) 16.56%, rgba(12, 14, 18, 0.137037) 20.37%, rgba(12, 14, 18, 0.1792) 24.4%, rgba(12, 14, 18, 0.228563) 28.83%, rgba(12, 14, 18, 0.286104) 33.84%, rgba(12, 14, 18, 0.3528) 39.6%, rgba(12, 14, 18, 0.42963) 46.3%, rgba(12, 14, 18, 0.51757) 54.1%, rgba(12, 14, 18, 0.6176) 63.2%, rgba(12, 14, 18, 0.730696) 73.76%, rgba(12, 14, 18, 0.857837) 85.97%, rgb(12, 14, 18) 100%";

function wrapShikiInUntitledOuterPre(shikiHtml: string): string {
  return `<pre class="${UNTITLED_OUTER_PRE_CLASS}" data-codex-docs-code>${shikiHtml}</pre>`;
}

/** Same section shell class list as Untitled UI docs (sidebar navigations code well). */
const untitledCodeWellSectionClass =
  "group/pre relative w-full not-typography group-data-preview:h-full in-[.typography]:not-group-data-tabs:not-group-data-preview:mt-5 in-[.typography]:not-group-data-tabs:not-group-data-preview:not-last:mb-5 [[role='tabpanel']>&]:first:mt-0! not-group-data-tabs:rounded-[20px] not-group-data-tabs:bg-secondary_alt not-group-data-tabs:p-2 not-group-data-tabs:ring-1 not-group-data-tabs:ring-secondary not-group-data-tabs:ring-inset";

const untitledCodeWellCardClass =
  "relative flex h-full w-full flex-col overflow-hidden rounded-xl bg-primary shadow-lg ring-1 ring-secondary_alt";

/**
 * Untitled UI–style code block: optional file tabs, Shiki (github-light / github-dark), nested `<pre>`,
 * fade + “Show more” / “Show less”, floating copy — DOM aligned with Untitled catalog `Code` tab.
 * See https://www.untitledui.com/react/components/sidebar-navigations
 */
export const DocsUntitledMultiFileCodePanel: FC<{
  files: DocsUntitledCodeFile[];
  /** Which file tab is selected initially (`0` = first). */
  defaultFileIndex?: number;
  /** Fixed content well height (Untitled uses ~904px). */
  panelHeightPx?: number;
  /**
   * When false, hides the file tab row — matches Untitled’s hero “Code” panel (single snippet, no `page.tsx` tabs).
   */
  showFileTabs?: boolean;
}> = ({ files, defaultFileIndex = 0, panelHeightPx = 904, showFileTabs = true }) => {
  const displayFiles = showFileTabs ? files : files[0] ? [files[0]] : [];
  const ids = useMemo(() => displayFiles.map((_, i) => `codex-doc-file-${i}`), [displayFiles]);
  const initialKey =
    ids[Math.min(Math.max(0, defaultFileIndex), ids.length - 1)] ?? "codex-doc-file-0";
  const [selectedKey, setSelectedKey] = useState(initialKey);
  const [htmlById, setHtmlById] = useState<Record<string, string>>({});
  const [showAll, setShowAll] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const next: Record<string, string> = {};
      await Promise.all(
        displayFiles.map(async (f, i) => {
          const id = ids[i]!;
          try {
            const shiki = await codeToHtml(f.code, {
              lang: "tsx",
              themes: {
                light: "github-light",
                dark: "github-dark",
              },
            });
            next[id] = wrapShikiInUntitledOuterPre(shiki);
          } catch {
            next[id] = wrapShikiInUntitledOuterPre(
              `<pre class="shiki p-4 text-sm text-error-primary">Highlight failed for ${f.label}</pre>`,
            );
          }
        }),
      );
      if (!cancelled) setHtmlById(next);
    })();
    return () => {
      cancelled = true;
    };
  }, [displayFiles, ids]);

  useEffect(() => {
    setShowAll(false);
  }, [selectedKey]);

  const onCopy = useCallback((text: string) => {
    void navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  const codeForFid = (fid: string) => {
    const idx = ids.indexOf(fid);
    return idx >= 0 ? displayFiles[idx]?.code ?? "" : "";
  };

  const fadeStyle = {
    "--gradient-light": UNTITLED_CODE_FADE_LIGHT,
    "--gradient-dark": UNTITLED_CODE_FADE_DARK,
  } as CSSProperties;

  const renderWell = (fid: string, sourceCode: string) => (
    <section className={untitledCodeWellSectionClass}>
      <div
        className={untitledCodeWellCardClass}
        style={{
          minHeight: panelHeightPx,
          maxHeight: showAll ? undefined : panelHeightPx,
        }}
      >
        {htmlById[fid] ? (
          <div
            className="contents"
            // eslint-disable-next-line react/no-danger -- trusted local story strings only
            dangerouslySetInnerHTML={{ __html: htmlById[fid] ?? "" }}
          />
        ) : (
          <div className="text-tertiary flex flex-1 items-center justify-center p-8 text-sm">Loading…</div>
        )}

        {htmlById[fid] ? (
          <div
            className={`inset-x-0 bottom-0 z-[1] flex items-end justify-center bg-linear-(--gradient-light) pb-6 dark:bg-linear-(--gradient-dark) ${showAll ? "sticky h-17" : "absolute h-47"}`}
            style={fadeStyle}
          >
            <AriaButton
              type="button"
              aria-label={showAll ? "Show less code" : "Show more code"}
              onPress={() => setShowAll((v) => !v)}
              className={UNTITLED_SHOW_MORE_BTN_CLASS}
            >
              <span data-text="true" className="transition-inherit-all px-0.5">
                {showAll ? "Show less" : "Show more"}
              </span>
            </AriaButton>
          </div>
        ) : null}
      </div>

      <AriaButton
        type="button"
        aria-label={copied ? "Copied" : "Copy"}
        onPress={() => onCopy(sourceCode)}
        className={copyBtnFloating}
      >
        {copied ? (
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-icon="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-icon="true">
            <path d="M5 15c-.932 0-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C2 13.398 2 12.932 2 12V5.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C3.52 2 4.08 2 5.2 2H12c.932 0 1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C15 3.602 15 4.068 15 5m-2.8 17h6.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C22 20.48 22 19.92 22 18.8v-6.6c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C20.48 9 19.92 9 18.8 9h-6.6c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C9 10.52 9 11.08 9 12.2v6.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C10.52 22 11.08 22 12.2 22Z" />
          </svg>
        )}
      </AriaButton>
    </section>
  );

  if (!showFileTabs) {
    const fid = ids[0];
    if (!fid) return null;
    return renderWell(fid, codeForFid(fid));
  }

  return (
    <div data-tabs="true" className={outerTabsClass} data-rac="">
      <AriaTabs selectedKey={selectedKey} onSelectionChange={(k) => setSelectedKey(String(k))} className="flex w-full min-w-0 max-w-full flex-col">
        <div className="relative w-full min-w-0 max-w-full shrink-0 overflow-hidden">
          <AriaTabList aria-label="Source files" className={fileTabListClass}>
            {displayFiles.map((f, i) => (
              <AriaTab
                key={ids[i]}
                id={ids[i]}
                className={({ isSelected }) => (isSelected ? fileTabBtnSelected : fileTabBtnIdle)}
              >
                {f.label}
              </AriaTab>
            ))}
          </AriaTabList>
          <div
            className="pointer-events-none absolute inset-y-px right-px z-10 h-11 w-20 rounded-tr-xl bg-gradient-to-r from-transparent via-bg-secondary/10 to-bg-secondary"
            aria-hidden
          />
        </div>

        {displayFiles.map((_, i) => {
          const fid = ids[i]!;
          return (
            <AriaTabPanel key={fid} id={fid} className="relative z-20 min-w-0 max-w-full px-2 pb-2 outline-none focus:outline-none">
              {renderWell(fid, codeForFid(fid))}
            </AriaTabPanel>
          );
        })}
      </AriaTabs>
    </div>
  );
};
