"use client";

import type { ComponentPropsWithRef, FC, ReactNode } from "react";
import { Check } from "@opus2-platform/icons";
import { cx } from "@/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ProgressStepStatus = "complete" | "current" | "upcoming";
export type ProgressStepsVariant = "circles" | "circles-text" | "dots" | "progress-bar" | "arrows" | "panels" | "bullet";
export type ProgressStepsOrientation = "horizontal" | "vertical";

export interface ProgressStepItem {
  id: string;
  label: string;
  description?: string;
  href?: string;
  status: ProgressStepStatus;
}

// ---------------------------------------------------------------------------
// Helper — step number / check icon
// ---------------------------------------------------------------------------

const StepIcon = ({ step, status }: { step: number; status: ProgressStepStatus }) => {
  if (status === "complete") {
    return (
      <span className="flex size-full items-center justify-center">
        <Check className="size-4" />
      </span>
    );
  }
  if (status === "current") {
    return <span className="text-sm font-semibold">{step}</span>;
  }
  return <span className="text-sm font-semibold text-quaternary">{step}</span>;
};

// ---------------------------------------------------------------------------
// Circles variant (numbered circles with connector line)
// ---------------------------------------------------------------------------

interface CircleStepsProps extends ComponentPropsWithRef<"nav"> {
  items: ProgressStepItem[];
}

const CircleSteps = ({ items, className, ...props }: CircleStepsProps) => (
  <nav aria-label="Progress" {...props} className={cx("flex items-center", className)}>
    <ol className="flex items-center">
      {items.map((item, index) => (
        <li key={item.id} className="flex items-center">
          {/* Connector before (not first) */}
          {index > 0 && (
            <div
              className={cx(
                "h-px w-12 shrink-0",
                item.status === "upcoming" ? "bg-tertiary" : "bg-brand-solid",
              )}
            />
          )}

          <StepCircle item={item} step={index + 1} />
        </li>
      ))}
    </ol>
  </nav>
);

const StepCircle = ({ item, step }: { item: ProgressStepItem; step: number }) => {
  const inner = (
    <>
      <div
        className={cx(
          "flex size-8 shrink-0 items-center justify-center rounded-full",
          item.status === "complete" && "bg-brand-solid text-white",
          item.status === "current" && "border-brand ring-brand-solid/30 border-2 text-brand-secondary ring-4 bg-primary",
          item.status === "upcoming" && "border-secondary border-2 text-quaternary bg-primary",
        )}
      >
        <StepIcon step={step} status={item.status} />
      </div>
      {item.label && (
        <span
          className={cx(
            "mt-2 text-sm font-semibold",
            item.status === "current" ? "text-brand-secondary" : item.status === "complete" ? "text-secondary" : "text-quaternary",
          )}
        >
          {item.label}
        </span>
      )}
    </>
  );

  const base = "flex flex-col items-center gap-0";

  return item.href ? (
    <a href={item.href} className={base}>
      {inner}
    </a>
  ) : (
    <div className={base}>{inner}</div>
  );
};

// ---------------------------------------------------------------------------
// Circles + text variant (label beside circle)
// ---------------------------------------------------------------------------

const CircleTextSteps = ({ items, className, ...props }: CircleStepsProps) => (
  <nav aria-label="Progress" {...props} className={cx("flex items-center", className)}>
    <ol className="flex items-center">
      {items.map((item, index) => (
        <li key={item.id} className="flex items-center">
          {index > 0 && (
            <div
              className={cx(
                "h-px w-12 shrink-0",
                item.status === "upcoming" ? "bg-tertiary" : "bg-brand-solid",
              )}
            />
          )}
          <div className="flex items-center gap-2">
            <div
              className={cx(
                "flex size-8 shrink-0 items-center justify-center rounded-full",
                item.status === "complete" && "bg-brand-solid text-white",
                item.status === "current" && "border-brand ring-brand-solid/30 border-2 text-brand-secondary ring-4 bg-primary",
                item.status === "upcoming" && "border-secondary border-2 text-quaternary bg-primary",
              )}
            >
              <StepIcon step={index + 1} status={item.status} />
            </div>
            <span
              className={cx(
                "text-sm font-semibold whitespace-nowrap",
                item.status === "current" ? "text-brand-secondary" : item.status === "complete" ? "text-secondary" : "text-quaternary",
              )}
            >
              {item.label}
            </span>
          </div>
        </li>
      ))}
    </ol>
  </nav>
);

// ---------------------------------------------------------------------------
// Dots variant
// ---------------------------------------------------------------------------

const DotSteps = ({ items, className, ...props }: CircleStepsProps) => (
  <nav aria-label="Progress" {...props} className={cx(className)}>
    <ol className="flex items-center gap-2">
      {items.map((item) => (
        <li key={item.id}>
          {item.href ? (
            <a
              href={item.href}
              aria-label={item.label}
              className={cx(
                "block size-2.5 rounded-full transition duration-100 ease-linear",
                item.status === "complete" && "bg-brand-solid",
                item.status === "current" && "bg-brand-solid ring-brand-solid/30 ring-4",
                item.status === "upcoming" && "bg-tertiary hover:bg-secondary",
              )}
            />
          ) : (
            <div
              aria-label={item.label}
              className={cx(
                "size-2.5 rounded-full",
                item.status === "complete" && "bg-brand-solid",
                item.status === "current" && "bg-brand-solid ring-brand-solid/30 ring-4",
                item.status === "upcoming" && "bg-tertiary",
              )}
            />
          )}
        </li>
      ))}
    </ol>
  </nav>
);

// ---------------------------------------------------------------------------
// Progress bar variant
// ---------------------------------------------------------------------------

const ProgressBarSteps = ({ items, className, ...props }: CircleStepsProps) => {
  const total = items.length;
  const currentIndex = items.findIndex((i) => i.status === "current");
  const completed = currentIndex === -1 ? items.filter((i) => i.status === "complete").length : currentIndex;

  return (
    <nav aria-label="Progress" {...props} className={cx("w-full", className)}>
      <p className="mb-2 text-sm font-medium text-secondary">
        Step {completed + 1} of {total}
      </p>
      <ol className="flex gap-1">
        {items.map((item) => (
          <li key={item.id} className="flex-1">
            <div
              className={cx(
                "h-2 w-full rounded-full",
                item.status === "complete" || item.status === "current" ? "bg-brand-solid" : "bg-tertiary",
              )}
            />
          </li>
        ))}
      </ol>
    </nav>
  );
};

// ---------------------------------------------------------------------------
// Arrows variant (breadcrumb-style arrow panels)
// ---------------------------------------------------------------------------

const ArrowSteps = ({ items, className, ...props }: CircleStepsProps) => (
  <nav aria-label="Progress" {...props} className={cx(className)}>
    <ol className="flex overflow-hidden rounded-md border border-secondary divide-x divide-secondary">
      {items.map((item, index) => {
        const inner = (
          <span className="flex items-center gap-2 px-4 py-3 text-sm font-semibold">
            <span
              className={cx(
                "flex size-5 shrink-0 items-center justify-center rounded-full text-xs",
                item.status === "complete" && "bg-brand-solid text-white",
                item.status === "current" && "bg-brand-secondary text-brand-secondary border border-brand",
                item.status === "upcoming" && "text-quaternary border border-secondary",
              )}
            >
              {item.status === "complete" ? <Check className="size-3" /> : index + 1}
            </span>
            <span
              className={cx(
                item.status === "current" ? "text-brand-secondary" : item.status === "complete" ? "text-secondary" : "text-quaternary",
              )}
            >
              {item.label}
            </span>
          </span>
        );

        const base = cx(
          "flex flex-1 items-center",
          item.status === "current" && "bg-brand-primary_alt",
          item.status === "complete" && "bg-primary hover:bg-primary_hover transition duration-100 ease-linear",
          item.status === "upcoming" && "bg-primary",
        );

        return item.href ? (
          <li key={item.id} className={base}>
            <a href={item.href} className="w-full">{inner}</a>
          </li>
        ) : (
          <li key={item.id} className={base}>
            {inner}
          </li>
        );
      })}
    </ol>
  </nav>
);

// ---------------------------------------------------------------------------
// Panels variant (full-width tab-style panels)
// ---------------------------------------------------------------------------

const PanelSteps = ({ items, className, ...props }: CircleStepsProps) => (
  <nav aria-label="Progress" {...props} className={cx(className)}>
    <ol className="flex overflow-hidden rounded-xl border border-secondary divide-x divide-secondary">
      {items.map((item, index) => {
        const inner = (
          <div className="flex flex-col px-4 py-4 gap-1">
            <div className="flex items-center gap-2">
              <span
                className={cx(
                  "flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                  item.status === "complete" && "bg-brand-solid text-white",
                  item.status === "current" && "bg-brand-secondary text-brand-secondary border border-brand",
                  item.status === "upcoming" && "text-quaternary border border-secondary",
                )}
              >
                {item.status === "complete" ? <Check className="size-3.5" /> : index + 1}
              </span>
              <span
                className={cx(
                  "text-sm font-semibold",
                  item.status === "current" ? "text-brand-secondary" : item.status === "complete" ? "text-secondary" : "text-quaternary",
                )}
              >
                {item.label}
              </span>
            </div>
            {item.description && (
              <p className="text-xs text-tertiary">{item.description}</p>
            )}
          </div>
        );

        const base = cx(
          "flex flex-1",
          item.status === "current" && "bg-brand-primary_alt",
          item.status === "complete" && "bg-primary",
          item.status === "upcoming" && "bg-primary",
        );

        return item.href ? (
          <li key={item.id} className={base}>
            <a href={item.href} className="w-full hover:bg-primary_hover transition duration-100 ease-linear">{inner}</a>
          </li>
        ) : (
          <li key={item.id} className={base}>{inner}</li>
        );
      })}
    </ol>
  </nav>
);

// ---------------------------------------------------------------------------
// Bullet variant (vertical with bullet dots)
// ---------------------------------------------------------------------------

const BulletSteps = ({ items, className, ...props }: CircleStepsProps) => (
  <nav aria-label="Progress" {...props} className={cx(className)}>
    <ol className="flex flex-col gap-4">
      {items.map((item) => {
        const inner = (
          <div className="flex items-start gap-3">
            <div className="relative mt-1.5 flex shrink-0 items-center justify-center">
              <div
                className={cx(
                  "size-2.5 rounded-full",
                  item.status === "complete" && "bg-brand-solid",
                  item.status === "current" && "bg-brand-solid ring-brand-solid/30 ring-4",
                  item.status === "upcoming" && "border-secondary border-2 bg-primary",
                )}
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <span
                className={cx(
                  "text-sm font-semibold",
                  item.status === "current" ? "text-brand-secondary" : item.status === "complete" ? "text-secondary" : "text-quaternary",
                )}
              >
                {item.label}
              </span>
              {item.description && <p className="text-sm text-tertiary">{item.description}</p>}
            </div>
          </div>
        );

        return item.href ? (
          <li key={item.id}>
            <a href={item.href} className="group">{inner}</a>
          </li>
        ) : (
          <li key={item.id}>{inner}</li>
        );
      })}
    </ol>
  </nav>
);

// ---------------------------------------------------------------------------
// Vertical circles variant (circles stacked with connector)
// ---------------------------------------------------------------------------

const VerticalCircleSteps = ({ items, className, ...props }: CircleStepsProps) => (
  <nav aria-label="Progress" {...props} className={cx(className)}>
    <ol className="flex flex-col">
      {items.map((item, index) => (
        <li key={item.id} className="relative flex gap-4">
          {/* Connector line */}
          {index < items.length - 1 && (
            <div
              className={cx(
                "absolute left-4 top-8 bottom-0 w-px -translate-x-1/2",
                item.status === "complete" ? "bg-brand-solid" : "bg-border-secondary",
              )}
            />
          )}

          {/* Circle */}
          <div
            className={cx(
              "relative flex size-8 shrink-0 items-center justify-center rounded-full",
              item.status === "complete" && "bg-brand-solid text-white",
              item.status === "current" && "border-brand ring-brand-solid/30 border-2 text-brand-secondary ring-4 bg-primary",
              item.status === "upcoming" && "border-secondary border-2 text-quaternary bg-primary",
            )}
          >
            <StepIcon step={index + 1} status={item.status} />
          </div>

          {/* Text */}
          <div className={cx("flex flex-col pb-8", index === items.length - 1 && "pb-0")}>
            <span
              className={cx(
                "text-sm font-semibold",
                item.status === "current" ? "text-brand-secondary" : item.status === "complete" ? "text-secondary" : "text-quaternary",
              )}
            >
              {item.label}
            </span>
            {item.description && <p className="mt-0.5 text-sm text-tertiary">{item.description}</p>}
          </div>
        </li>
      ))}
    </ol>
  </nav>
);

// ---------------------------------------------------------------------------
// ProgressSteps root — selects variant
// ---------------------------------------------------------------------------

interface ProgressStepsRootProps extends ComponentPropsWithRef<"nav"> {
  items: ProgressStepItem[];
  variant?: ProgressStepsVariant;
  orientation?: ProgressStepsOrientation;
}

const ProgressStepsRoot = ({
  items,
  variant = "circles",
  orientation = "horizontal",
  className,
  ...props
}: ProgressStepsRootProps) => {
  if (variant === "dots") return <DotSteps items={items} className={className} {...props} />;
  if (variant === "progress-bar") return <ProgressBarSteps items={items} className={className} {...props} />;
  if (variant === "arrows") return <ArrowSteps items={items} className={className} {...props} />;
  if (variant === "panels") return <PanelSteps items={items} className={className} {...props} />;
  if (variant === "bullet") return <BulletSteps items={items} className={className} {...props} />;
  if (variant === "circles-text") return <CircleTextSteps items={items} className={className} {...props} />;
  if (orientation === "vertical") return <VerticalCircleSteps items={items} className={className} {...props} />;
  return <CircleSteps items={items} className={className} {...props} />;
};

// ---------------------------------------------------------------------------
// Compound export
// ---------------------------------------------------------------------------

export const ProgressSteps = ProgressStepsRoot as typeof ProgressStepsRoot & {
  Circles: typeof CircleSteps;
  CirclesText: typeof CircleTextSteps;
  Dots: typeof DotSteps;
  ProgressBar: typeof ProgressBarSteps;
  Arrows: typeof ArrowSteps;
  Panels: typeof PanelSteps;
  Bullet: typeof BulletSteps;
  Vertical: typeof VerticalCircleSteps;
};

ProgressSteps.Circles = CircleSteps;
ProgressSteps.CirclesText = CircleTextSteps;
ProgressSteps.Dots = DotSteps;
ProgressSteps.ProgressBar = ProgressBarSteps;
ProgressSteps.Arrows = ArrowSteps;
ProgressSteps.Panels = PanelSteps;
ProgressSteps.Bullet = BulletSteps;
ProgressSteps.Vertical = VerticalCircleSteps;
