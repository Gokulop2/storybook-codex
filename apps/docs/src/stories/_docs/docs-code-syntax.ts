import type { ThemeRegistration } from "@shikijs/types";
import githubLight from "@shikijs/themes/github-light";

/**
 * Hand-painted `DocsCodePre` tokens — same palette Shiki uses via `codexDocsShikiTheme`.
 */
export const DOCS_CODE_SYNTAX_COLORS = {
  gray: "var(--color-utility-gray-700)",
  pink: "var(--color-utility-pink-600)",
  blue: "var(--color-utility-blue-600)",
  brand: "var(--color-utility-brand-600)",
  primary: "var(--color-primary)",
} as const;

/**
 * Map GitHub Light hex values to Codex semantic / utility tokens so highlighted HTML
 * tracks light/dark tokens like the hand-rolled preview.
 */
const GITHUB_LIGHT_HEX_TO_TOKEN: Record<string, string> = {
  "#6a737d": "var(--color-utility-gray-500)",
  "#959da5": "var(--color-utility-gray-400)",
  "#586069": "var(--color-utility-gray-600)",
  "#444d56": "var(--color-utility-gray-700)",
  "#24292e": "var(--color-utility-gray-700)",
  "#2f363d": "var(--color-utility-gray-800)",
  "#1b1f23": "var(--color-utility-gray-900)",
  "#005cc5": "var(--color-utility-blue-600)",
  "#0366d6": "var(--color-utility-blue-600)",
  "#032f62": "var(--color-primary)",
  "#044289": "var(--color-utility-blue-700)",
  "#2188ff": "var(--color-utility-blue-500)",
  "#d73a49": "var(--color-utility-pink-600)",
  "#cb2431": "var(--color-utility-error-600)",
  "#b31d28": "var(--color-utility-error-700)",
  "#e36209": "var(--color-utility-warning-600)",
  "#22863a": "var(--color-utility-success-600)",
  "#28a745": "var(--color-utility-success-500)",
  "#6f42c1": "var(--color-utility-brand-600)",
  "#5a32a3": "var(--color-utility-purple-700)",
  "#fafbfc": "var(--color-utility-gray-50)",
  "#f6f8fa": "var(--color-utility-gray-100)",
  "#fff": "var(--bg-primary)",
  "#dbab09": "var(--color-utility-warning-500)",
  "#b08800": "var(--color-utility-warning-700)",
  "#f9c513": "var(--color-utility-warning-400)",
  "#ffdf5d": "var(--color-utility-warning-200)",
  "#24943e99": "var(--color-utility-success-600)",
  "#24943e50": "var(--color-utility-success-500)",
  "#3192aa": "var(--color-sky-600)",
  "#1b7c83": "var(--color-sky-700)",
};

function mapTokenColor(value: string): string {
  if (!value.startsWith("#")) return value;
  return GITHUB_LIGHT_HEX_TO_TOKEN[value.toLowerCase()] ?? value;
}

function createCodexDocsShikiTheme(): ThemeRegistration {
  const raw = structuredClone(githubLight) as ThemeRegistration;
  raw.name = "codex-docs-github-light";

  raw.tokenColors = (raw.tokenColors ?? []).map((rule) => {
    const s = rule.settings;
    if (!s) return rule;
    const next = { ...s };
    if (typeof s.foreground === "string") next.foreground = mapTokenColor(s.foreground);
    if (typeof s.background === "string") next.background = mapTokenColor(s.background);
    return { ...rule, settings: next };
  });

  return raw;
}

/** Shiki theme: GitHub Light scopes with Codex CSS variables (for `codeToHtml`). */
export const codexDocsShikiTheme = createCodexDocsShikiTheme();
