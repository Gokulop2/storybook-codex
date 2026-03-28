import type { RefAttributes } from "react";
import type { PopoverProps as AriaPopoverProps } from "react-aria-components";
import { Popover as AriaPopover } from "react-aria-components";
import { cx } from "@/utils";

interface PopoverProps extends AriaPopoverProps, RefAttributes<HTMLElement> {
  size: "sm" | "md";
  /**
   * `stacked`: column layout with overflow hidden on the panel (scroll lives in the list body).
   * `default`: single scrolling surface (`max-h-64` / `max-h-80` for md).
   */
  variant?: "default" | "stacked";
}

export const Popover = ({ variant = "default", size, className, ...props }: PopoverProps) => {
  return (
    <AriaPopover
      placement="bottom"
      containerPadding={0}
      offset={4}
      {...props}
      className={(state) =>
        cx(
          "bg-primary ring-secondary_alt w-(--trigger-width) origin-(--trigger-anchor-point) overflow-x-hidden rounded-lg shadow-lg ring-1 outline-hidden will-change-transform",

          variant === "default" &&
            "max-h-64! overflow-y-auto py-1",
          variant === "stacked" && "flex max-h-[min(500px,80vh)] flex-col overflow-hidden p-0",

          state.isEntering &&
            "animate-in fade-in placement-right:slide-in-from-left-0.5 placement-top:slide-in-from-bottom-0.5 placement-bottom:slide-in-from-top-0.5 duration-150 ease-out",
          state.isExiting &&
            "animate-out fade-out placement-right:slide-out-to-left-0.5 placement-top:slide-out-to-bottom-0.5 placement-bottom:slide-out-to-top-0.5 duration-100 ease-in",
          variant === "default" && size === "md" && "max-h-80!",

          typeof className === "function" ? className(state) : className
        )
      }
    />
  );
};
