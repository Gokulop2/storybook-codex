/**
 * Placeholder image URLs for built-in Codex demos (no third-party product CDNs).
 * Uses picsum.photos with fixed seeds so avatars stay stable across loads.
 */
export function codexDemoAvatar(seed: string): string {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/128/128`;
}

/** Flag SVGs via flagcdn (ISO 3166-1 alpha-2 code, e.g. `US`, `AU`). Compound codes use the leading segment. */
export function codexDemoFlagUrl(iso2: string): string {
  const lower = iso2.toLowerCase();
  if (lower === "earth") {
    return "https://upload.wikimedia.org/wikipedia/commons/e/e9/Solid_blue.svg";
  }
  const base = iso2.split("-")[0]?.toLowerCase() ?? lower;
  return `https://flagcdn.com/${base}.svg`;
}
