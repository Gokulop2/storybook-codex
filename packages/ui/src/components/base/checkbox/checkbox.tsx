import type { ReactNode, Ref } from "react";
import { Checkbox as AriaCheckbox, type CheckboxProps as AriaCheckboxProps } from "react-aria-components";
import { SelectionControlCopy, selectionControlSizing } from "@/components/base/selection-control-copy";
import { cx } from "@/utils";

export interface CheckboxBaseProps {
  size?: "sm" | "md";
  className?: string;
  isFocusVisible?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
  isIndeterminate?: boolean;
}

export const CheckboxBase = ({ className, isSelected, isDisabled, isIndeterminate, size = "sm", isFocusVisible = false }: CheckboxBaseProps) => {
  return (
    <div
      className={cx(
        "bg-primary ring-primary relative flex size-4 shrink-0 cursor-pointer appearance-none items-center justify-center rounded ring-1 ring-inset",
        size === "md" && "size-5 rounded-md",
        (isSelected || isIndeterminate) && "bg-brand-solid ring-bg-brand-solid",
        isDisabled && "bg-disabled_subtle ring-disabled cursor-not-allowed",
        isFocusVisible && "outline-focus-ring outline-2 outline-offset-2",
        className
      )}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 14 14"
        fill="none"
        className={cx(
          "text-fg-white transition-inherit-all pointer-events-none absolute h-3 w-2.5 opacity-0",
          size === "md" && "size-3.5",
          isIndeterminate && "opacity-100",
          isDisabled && "text-fg-disabled_subtle"
        )}
      >
        <path d="M2.91675 7H11.0834" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <svg
        aria-hidden="true"
        viewBox="0 0 14 14"
        fill="none"
        className={cx(
          "text-fg-white transition-inherit-all pointer-events-none absolute size-3 opacity-0",
          size === "md" && "size-3.5",
          isSelected && !isIndeterminate && "opacity-100",
          isDisabled && "text-fg-disabled_subtle"
        )}
      >
        <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};
CheckboxBase.displayName = "CheckboxBase";

interface CheckboxProps extends AriaCheckboxProps {
  ref?: Ref<HTMLLabelElement>;
  size?: "sm" | "md";
  label?: ReactNode;
  hint?: ReactNode;
}

export const Checkbox = ({ label, hint, size = "sm", className, ...ariaCheckboxProps }: CheckboxProps) => {
  return (
    <AriaCheckbox
      {...ariaCheckboxProps}
      className={(state) =>
        cx(
          "flex items-start!",
          state.isDisabled && "cursor-not-allowed",
          selectionControlSizing[size].root,
          typeof className === "function" ? className(state) : className
        )
      }
    >
      {({ isSelected, isIndeterminate, isDisabled, isFocusVisible }) => (
        <>
          <CheckboxBase
            size={size}
            isSelected={isSelected}
            isIndeterminate={isIndeterminate}
            isDisabled={isDisabled}
            isFocusVisible={isFocusVisible}
            className={label || hint ? "mt-0.5!" : ""}
          />
          <SelectionControlCopy size={size} label={label} hint={hint} />
        </>
      )}
    </AriaCheckbox>
  );
};
Checkbox.displayName = "Checkbox";
