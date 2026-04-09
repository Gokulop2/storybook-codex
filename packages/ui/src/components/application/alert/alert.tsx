"use client";

import type { FC, ReactNode } from "react";
import { isValidElement } from "react";
import { AlertCircle, CheckCircle, InfoCircle, XCircle, X } from "@opus2-platform/icons";
import { Button } from "@/components/base/buttons/button";
import { cx, isReactComponent, sortCx } from "@/utils";

type AlertColor = "default" | "brand" | "gray" | "error" | "warning" | "success";
type AlertLayout = "floating" | "full-width";

const colorStyles = sortCx({
  default: {
    root: "bg-primary ring-secondary text-secondary",
    icon: "text-fg-secondary",
    title: "text-secondary",
    description: "text-tertiary",
  },
  brand: {
    root: "bg-brand-secondary ring-utility-brand-200 text-utility-brand-700",
    icon: "text-fg-brand-secondary",
    title: "text-utility-brand-700",
    description: "text-utility-brand-600",
  },
  gray: {
    root: "bg-utility-gray-50 ring-utility-gray-200 text-utility-gray-700",
    icon: "text-utility-gray-500",
    title: "text-utility-gray-700",
    description: "text-utility-gray-600",
  },
  error: {
    root: "bg-error-secondary ring-utility-error-200 text-utility-error-700",
    icon: "text-fg-error-secondary",
    title: "text-utility-error-700",
    description: "text-utility-error-600",
  },
  warning: {
    root: "bg-warning-secondary ring-utility-warning-200 text-utility-warning-700",
    icon: "text-fg-warning-secondary",
    title: "text-utility-warning-700",
    description: "text-utility-warning-600",
  },
  success: {
    root: "bg-success-secondary ring-utility-success-200 text-utility-success-700",
    icon: "text-fg-success-secondary",
    title: "text-utility-success-700",
    description: "text-utility-success-600",
  },
});

const defaultIcons: Record<AlertColor, FC<{ className?: string }>> = {
  default: InfoCircle,
  brand: InfoCircle,
  gray: InfoCircle,
  error: XCircle,
  warning: AlertCircle,
  success: CheckCircle,
};

export interface AlertProps {
  /** Color variant of the alert. */
  color?: AlertColor;
  /** Layout style — floating (contained) or full-width (edge-to-edge). */
  layout?: AlertLayout;
  /** Alert title / heading. */
  title?: ReactNode;
  /** Supporting description text. */
  description?: ReactNode;
  /** Leading icon — defaults to a color-appropriate icon. Pass `null` to suppress. */
  icon?: FC<{ className?: string }> | ReactNode | null;
  /** Actions rendered below the description. */
  actions?: ReactNode;
  /** Whether to show a dismiss (×) button. */
  dismissible?: boolean;
  /** Callback fired when the dismiss button is pressed. */
  onDismiss?: () => void;
  className?: string;
}

export const Alert = ({
  color = "default",
  layout = "floating",
  title,
  description,
  icon,
  actions,
  dismissible,
  onDismiss,
  className,
}: AlertProps) => {
  const colors = colorStyles[color];

  // Resolve icon: explicit null → none; undefined → default; FC/element → use it
  const resolvedIcon: FC<{ className?: string }> | ReactNode | null =
    icon === undefined ? defaultIcons[color] : icon;
  // Capitalize for JSX usage (React requires capitalized component names in JSX)
  const ResolvedIcon = resolvedIcon as FC<{ className?: string }>;

  const isFloating = layout === "floating";

  return (
    <div
      role="alert"
      className={cx(
        "flex w-full gap-3 ring-1 ring-inset",
        isFloating ? "rounded-xl p-4 shadow-sm" : "px-4 py-3 md:px-6",
        colors.root,
        className,
      )}
    >
      {/* Icon */}
      {resolvedIcon !== null && (
        <div className="shrink-0 pt-px">
          {isReactComponent(resolvedIcon) && <ResolvedIcon className={cx("size-5", colors.icon)} />}
          {isValidElement(resolvedIcon) && resolvedIcon}
        </div>
      )}

      {/* Body */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {title && <p className={cx("text-sm font-semibold", colors.title)}>{title}</p>}
        {description && <p className={cx("text-sm", colors.description)}>{description}</p>}
        {actions && <div className="mt-3 flex flex-wrap gap-3">{actions}</div>}
      </div>

      {/* Dismiss */}
      {dismissible && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onDismiss}
          className={cx(
            "shrink-0 cursor-pointer rounded-md p-0.5 transition duration-100 ease-linear hover:opacity-70 focus:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2",
            colors.icon,
          )}
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
};

Alert.displayName = "Alert";
