/**
 * Storybook manager links must be root-relative (`/…`) so they resolve from the preview iframe
 * (`iframe.html`) to the shell (`/?path=…`), not `iframe.html?path=…`.
 */

export const STORYBOOK_OVERVIEW_HREF = "/?path=/story/overview--overview" as const;

/** Autodocs entry for a CSF title prefix, e.g. `base-components-button` → `…--docs`. */
export function storybookManagerAutodocsHref(storyIdPrefix: string): string {
  return `/?path=/story/${storyIdPrefix}--docs`;
}
