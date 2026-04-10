import type { ReactNode } from "react";

export type ApplicationUiOverviewItem = {
  label: string;
  children: ReactNode;
};

/**
 * Shared usage callout for Application UI docs — implementation notes for Codex (`@opus2-platform/codex`).
 */
export function ApplicationUiOverview({ items }: { items: ApplicationUiOverviewItem[] }) {
  return (
    <div className="not-prose mt-4 rounded-xl border border-secondary bg-secondary_alt px-4 py-3 text-sm text-secondary">
      <p className="m-0 font-semibold">Codex usage guide</p>
      <ul className="mt-2 mb-0 list-disc space-y-1 pl-5 text-tertiary">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            <strong className="text-secondary">{item.label}:</strong> {item.children}
          </li>
        ))}
      </ul>
    </div>
  );
}
