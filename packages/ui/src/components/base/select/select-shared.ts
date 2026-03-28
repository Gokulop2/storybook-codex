import type { FC, ReactNode } from "react";
import { createContext } from "react";

/** When set by `MultiSelect`, list rows use Untitled-style leading checkboxes instead of a trailing checkmark. */
export const MultiSelectListContext = createContext<{ itemLayout: "default" | "checkbox" } | null>(null);

/** Mirrors `selectedItems` ids so row visuals match; RAC `ListBoxItem` `isSelected` stays false when ComboBox `selectedKey` is fixed to `null`. */
export const MultiSelectSelectionContext = createContext<readonly string[] | null>(null);

export type MultiSelectTriggerDisplay = "tags" | "summary";

/** Row selection for list visuals when using external `selectedItems` (ComboBox keeps `selectedKey` null). */
export function resolveMultiSelectRowSelected(
  multiSelectIds: readonly string[] | null,
  id: string,
  racIsSelected: boolean
): boolean {
  return multiSelectIds !== null ? multiSelectIds.includes(id) : racIsSelected;
}

export type SelectItemType = {
  id: string;
  label?: string;
  avatarUrl?: string;
  isDisabled?: boolean;
  supportingText?: string;
  /** Headcount for this row; used in `MultiSelect` summary mode to sum checked teams. Falls back to the leading number in `supportingText` (e.g. `"4 members"`). */
  memberCount?: number;
  icon?: FC | ReactNode;
};

/** Numeric headcount for summary totals: explicit `memberCount`, else leading integer in `supportingText`. */
export function getMemberCountForSelectItem(item: SelectItemType): number {
  if (typeof item.memberCount === "number" && Number.isFinite(item.memberCount)) {
    return Math.max(0, item.memberCount);
  }
  const t = item.supportingText?.trim();
  if (!t) {
    return 0;
  }
  const m = t.match(/^(\d+)/);
  return m?.[1] ? parseInt(m[1], 10) : 0;
}

export function sumMemberCountsForItems(items: readonly SelectItemType[]): number {
  return items.reduce((sum, item) => sum + getMemberCountForSelectItem(item), 0);
}

export type IconComponentType = FC<{ className?: string; strokeWidth?: string | number }>;

export interface CommonSelectProps {
  hint?: string;
  label?: string;
  tooltip?: string;
  size?: "sm" | "md";
  placeholder?: string;
}

export const sizes = {
  sm: { root: "py-2 px-3", shortcut: "pr-2.5" },
  md: { root: "py-2.5 px-3.5", shortcut: "pr-3" },
};

export const SelectContext = createContext<{ size: "sm" | "md" }>({ size: "sm" });
