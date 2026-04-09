import type { FC, RefAttributes } from "react";
import { Check, ChevronRight, DotsVertical } from "@opus2-platform/icons";
import type {
  ButtonProps as AriaButtonProps,
  MenuItemProps as AriaMenuItemProps,
  MenuProps as AriaMenuProps,
  PopoverProps as AriaPopoverProps,
  SeparatorProps as AriaSeparatorProps,
} from "react-aria-components";
import {
  Button as AriaButton,
  Header as AriaHeader,
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  MenuSection as AriaMenuSection,
  MenuTrigger as AriaMenuTrigger,
  Popover as AriaPopover,
  Separator as AriaSeparator,
  SubmenuTrigger as AriaSubmenuTrigger,
} from "react-aria-components";
import { cx } from "@/utils";

/** Submenu trigger rows set `hasSubmenu` on the render state (RAC; not always surfaced in public types). */
function menuItemHasSubmenu(state: unknown): boolean {
  if (typeof state !== "object" || state === null) return false;
  return "hasSubmenu" in state && Boolean((state as { hasSubmenu?: boolean }).hasSubmenu);
}

interface DropdownItemProps extends AriaMenuItemProps {
  /** The label of the item to be displayed. */
  label?: string;
  /** An addon to be displayed on the right side of the item. */
  addon?: string;
  /** If true, the item will not have any styles. */
  unstyled?: boolean;
  /** An icon to be displayed on the left side of the item. */
  icon?: FC<{ className?: string }>;
}

const DropdownItem = ({ label, children, addon, icon: Icon, unstyled, ...props }: DropdownItemProps) => {
  if (unstyled) {
    return (
      <AriaMenuItem
        {...props}
        id={props.id ?? label}
        textValue={props.textValue ?? label}
        className={(state) =>
          cx(
            "group block cursor-pointer px-1.5 py-px outline-hidden",
            state.isDisabled && "cursor-not-allowed",
            typeof props.className === "function" ? props.className(state) : props.className
          )
        }
      >
        {children}
      </AriaMenuItem>
    );
  }

  return (
    <AriaMenuItem
      {...props}
      className={(state) =>
        cx(
          // Menu gutter: `px-1.5 py-px`.
          "group block cursor-pointer px-1.5 py-px outline-hidden",
          state.isDisabled && "cursor-not-allowed",
          typeof props.className === "function" ? props.className(state) : props.className
        )
      }
    >
      {(state) =>
        menuItemHasSubmenu(state) ? (
          <div
            className={cx(
              // Submenu row: inner flex + outline on same node as transition/hover.
              "relative flex items-center rounded-md px-2.5 py-2 pr-1.5 outline-hidden transition duration-100 ease-linear",
              !state.isDisabled && "group-hover:bg-primary_hover",
              state.isFocused && "bg-primary_hover",
              state.isFocusVisible && "outline-2 -outline-offset-2"
            )}
          >
            {/* Selection indicator for submenu rows in multi-select menus (minus when selected, check hidden). */}
            {state.selectionMode === "multiple" && !Icon ? (
              <div
                aria-hidden="true"
                className={cx(
                  "relative flex size-4 shrink-0 cursor-pointer appearance-none items-center justify-center rounded ring-1 ring-inset mr-2",
                  state.isSelected ? "bg-brand-solid ring-brand-solid" : "bg-primary ring-primary"
                )}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 14 14"
                  fill="none"
                  className={cx(
                    "pointer-events-none absolute h-3 w-2.5 text-fg-white transition-inherit-all",
                    state.isSelected ? "opacity-100" : "opacity-0"
                  )}
                >
                  <path d="M2.91675 7H11.0834" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="pointer-events-none absolute size-3 text-fg-white opacity-0 transition-inherit-all"
                >
                  <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ) : null}

            {Icon && (
              <span className="mr-2 inline-flex shrink-0 items-center justify-center">
                <Icon
                  aria-hidden="true"
                  className={cx("size-4 shrink-0 stroke-[2.25px]", state.isDisabled ? "text-fg-disabled" : "text-fg-quaternary")}
                />
              </span>
            )}

            <span
              className={cx(
                "grow truncate text-sm font-semibold",
                state.isDisabled ? "text-disabled" : "text-secondary",
                state.isFocused && "text-secondary_hover"
              )}
            >
              {label || (typeof children === "function" ? children(state) : children)}
            </span>

            {addon && (
              <span className={cx("ml-1 shrink-0 pr-1 text-xs font-medium", state.isDisabled ? "text-disabled" : "text-quaternary")}>{addon}</span>
            )}

            <ChevronRight aria-hidden="true" className="ml-auto size-4 shrink-0 stroke-[2.25px] text-fg-quaternary" />
          </div>
        ) : (
          <div
          className={cx(
            // Row padding: `px-2.5 py-2`.
            "outline-hidden relative flex items-center rounded-md px-2.5 py-2 transition duration-100 ease-linear",
            !state.isDisabled && "group-hover:bg-primary_hover",
            // React Aria uses focused for keyboard roving; keep hover+focus visuals identical.
            state.isFocused && "bg-primary_hover",
            state.isFocusVisible && "outline-2 -outline-offset-2"
          )}
        >
          {/* Selection indicator for radio/checkbox menuitems */}
          {!menuItemHasSubmenu(state) && state.selectionMode === "single" && !Icon ? (
            <Check
              aria-hidden="true"
              className={cx(
                "mr-2 size-4 shrink-0 stroke-[2.25px] text-fg-brand-primary",
                !state.isSelected && "hidden"
              )}
            />
          ) : null}

          {!menuItemHasSubmenu(state) && state.selectionMode === "multiple" && !Icon ? (
            <span
              aria-hidden="true"
              className={cx(
                "relative flex size-4 shrink-0 items-center justify-center rounded ring-1 ring-inset mr-2",
                state.isSelected ? "bg-brand-solid ring-brand-solid" : "bg-primary ring-primary"
              )}
            >
              <svg aria-hidden="true" viewBox="0 0 14 14" fill="none" className={cx("pointer-events-none absolute size-3 text-fg-white transition-inherit-all", state.isSelected ? "opacity-100" : "opacity-0")}>
                <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg aria-hidden="true" viewBox="0 0 14 14" fill="none" className="pointer-events-none absolute h-3 w-2.5 text-fg-white opacity-0 transition-inherit-all">
                <path d="M2.91675 7H11.0834" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          ) : null}

          {Icon ? (
            <span className="mr-2 inline-flex shrink-0 items-center justify-center">
              <Icon
                aria-hidden="true"
                className={cx("size-4 shrink-0 stroke-[2.25px]", state.isDisabled ? "text-fg-disabled" : "text-fg-quaternary")}
              />
            </span>
          ) : null}

          <span
            className={cx(
              "grow truncate text-sm font-semibold",
              state.isDisabled ? "text-disabled" : "text-secondary",
              state.isFocused && "text-secondary_hover"
            )}
          >
            {label || (typeof children === "function" ? children(state) : children)}
          </span>

          {addon && (
            <span
              className={cx(
                // Shortcut addon: `ml-1 shrink-0 pr-1 text-xs font-medium text-quaternary`.
                "ml-1 shrink-0 pr-1 text-xs font-medium",
                state.isDisabled ? "text-disabled" : "text-quaternary"
              )}
            >
              {addon}
            </span>
          )}
        </div>
        )
      }
    </AriaMenuItem>
  );
};

interface DropdownMenuProps<T extends object> extends AriaMenuProps<T> {}

const DropdownMenu = <T extends object>(props: DropdownMenuProps<T>) => {
  const selectionMode = props.selectionMode ?? "single";
  const disallowEmptySelection = props.disallowEmptySelection ?? (selectionMode === "single");
  return (
    <AriaMenu
      disallowEmptySelection={disallowEmptySelection}
      selectionMode={selectionMode}
      {...props}
      className={(state) =>
        cx(
          // List region: `h-min overflow-y-auto py-1 outline-hidden select-none`.
          "h-min overflow-y-auto py-1 outline-hidden select-none",
          typeof props.className === "function" ? props.className(state) : props.className
        )
      }
    />
  );
};

interface DropdownPopoverProps extends AriaPopoverProps {}

const DropdownPopover = (props: DropdownPopoverProps) => {
  return (
    <AriaPopover
      placement="bottom right"
      {...props}
      className={(state) =>
        cx(
          // Panel: rounded-lg, subtle border, strong shadow, comfortable min width.
          "bg-primary ring-secondary_alt w-54 origin-(--trigger-anchor-point) overflow-auto rounded-lg shadow-lg ring-1 ring-inset will-change-transform",
          state.isEntering &&
            "animate-in fade-in placement-right:slide-in-from-left-0.5 placement-top:slide-in-from-bottom-0.5 placement-bottom:slide-in-from-top-0.5 duration-150 ease-out",
          state.isExiting &&
            "animate-out fade-out placement-right:slide-out-to-left-0.5 placement-top:slide-out-to-bottom-0.5 placement-bottom:slide-out-to-top-0.5 duration-100 ease-in",
          typeof props.className === "function" ? props.className(state) : props.className
        )
      }
    >
      {props.children}
    </AriaPopover>
  );
};

const DropdownSeparator = (props: AriaSeparatorProps) => {
  return <AriaSeparator {...props} className={cx("bg-border-secondary my-1 h-px w-full", props.className)} />;
};

const DropdownDotsButton = (props: AriaButtonProps & RefAttributes<HTMLButtonElement>) => {
  return (
    <AriaButton
      {...props}
      aria-label="Open menu"
      className={(state) =>
        cx(
          "text-fg-quaternary outline-hidden cursor-pointer rounded-md transition duration-100 ease-linear",
          (state.isPressed || state.isHovered) && "text-fg-quaternary_hover",
          state.isFocusVisible && "outline-2 outline-offset-2",
          typeof props.className === "function" ? props.className(state) : props.className
        )
      }
    >
      <DotsVertical className="transition-inherit-all size-5" />
    </AriaButton>
  );
};

const DropdownSectionHeader = ({ className, ...props }: Parameters<typeof AriaHeader>[0]) => (
  <AriaHeader {...props} className={cx("px-4 pt-1.5 pb-0.5 text-xs font-semibold text-brand-secondary", className)} />
);

export const Dropdown = {
  Root: AriaMenuTrigger,
  Submenu: AriaSubmenuTrigger,
  Popover: DropdownPopover,
  Menu: DropdownMenu,
  Section: AriaMenuSection,
  SectionHeader: DropdownSectionHeader,
  Item: DropdownItem,
  Separator: DropdownSeparator,
  DotsButton: DropdownDotsButton,
};
