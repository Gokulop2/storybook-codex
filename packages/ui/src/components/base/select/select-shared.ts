import type { FC, ReactNode } from "react";
import { createContext } from "react";

/** When set by `MultiSelect`, list rows use leading checkboxes instead of a trailing checkmark. */
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
  /** Unique identifier for the item. */
  id: string | number;
  /** The primary display text. */
  label?: string;
  /** Avatar image URL. */
  avatarUrl?: string;
  /** Whether the item is disabled. */
  isDisabled?: boolean;
  /** Secondary text displayed alongside the label. */
  supportingText?: string;
  /** Headcount for this row; used in `MultiSelect` summary mode to sum checked teams. Falls back to the leading number in `supportingText` (e.g. `"4 members"`). */
  memberCount?: number;
  /** Leading icon component or element. */
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

export interface CommonProps {
  /** Helper text displayed below the input. */
  hint?: string;
  /** Field label displayed above the input. */
  label?: string;
  /** Tooltip text for the help icon next to the label. */
  tooltip?: string;
  /**
   * The size of the component.
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /** Placeholder text when no value is selected. */
  placeholder?: string;
  /** Whether to hide the required indicator from the label. */
  hideRequiredIndicator?: boolean;
}

/** @deprecated Use `CommonProps` instead. */
export type CommonSelectProps = CommonProps;

export const sizes = {
  sm: {
    root: "py-2 pl-3 pr-2.5 gap-2 *:data-icon:size-4 *:data-icon:stroke-[2.25px]",
    withIcon: "",
    text: "text-sm",
    textContainer: "gap-x-1.5",
    shortcut: "pr-2.5",
  },
  md: { root: "py-2 px-3 gap-2 *:data-icon:size-5", withIcon: "", text: "text-md", textContainer: "gap-x-1.5", shortcut: "pr-2.5" },
  lg: { root: "py-2.5 px-3.5 gap-2 *:data-icon:size-5", withIcon: "", text: "text-md", textContainer: "gap-x-1.5", shortcut: "pr-3" },
};

export const SelectContext = createContext<{ size: "sm" | "md" | "lg" }>({ size: "md" });
