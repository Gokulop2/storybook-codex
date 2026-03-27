import type { ReactNode } from "react";
import { cx } from "@/utils";

/** Checkbox / Radio: label + hint layout and typography (semantic CSS vars beat Storybook globals). */
export const selectionControlSizing = {
  sm: {
    root: "gap-2",
    textWrapper: "",
    label: "text-sm! font-medium!",
    hint: "text-sm! font-normal!",
  },
  md: {
    root: "gap-3",
    textWrapper: "gap-0.5",
    label: "text-md! font-medium!",
    hint: "text-md! font-normal!",
  },
} as const;

export type SelectionControlSize = keyof typeof selectionControlSizing;

export interface SelectionControlCopyProps {
  size: SelectionControlSize;
  label?: ReactNode;
  hint?: ReactNode;
}

export function SelectionControlCopy({ size, label, hint }: SelectionControlCopyProps) {
  if (!label && !hint) return null;

  const s = selectionControlSizing[size];

  return (
    <div className={cx("inline-flex flex-col", s.textWrapper)}>
      {label && <p className={cx("m-0! [color:var(--color-text-secondary)]! select-none", s.label)}>{label}</p>}
      {hint && (
        <span className={cx("[color:var(--color-text-tertiary)]!", s.hint)} onClick={(e) => e.stopPropagation()}>
          {hint}
        </span>
      )}
    </div>
  );
}
