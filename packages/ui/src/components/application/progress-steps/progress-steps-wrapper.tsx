"use client";

import { cx } from "@/utils";
import { statuses, IconOnly, TextLine } from "./progress-step-base";
import { Progress } from "./progress-steps";

/** A single step in the progress indicator. */
export interface ProgressStepItem {
    id: string | number;
    label: string;
    description?: string;
    /** "upcoming" maps to "incomplete" in the internal progress-step-base statuses. */
    status: "complete" | "current" | "upcoming";
}

type ProgressStepVariant = "circles" | "circles-text" | "dots" | "progress-bar" | "arrows" | "panels" | "bullet";

export interface ProgressStepsProps {
    items: ProgressStepItem[];
    variant?: ProgressStepVariant;
    orientation?: "horizontal" | "vertical";
    size?: "sm" | "md";
    className?: string;
}

/** Map story status to internal status */
const mapStatus = (s: ProgressStepItem["status"]): "complete" | "current" | "incomplete" =>
    s === "upcoming" ? "incomplete" : s;

/** Map ProgressStepItem to the internal Step shape */
const toStep = (item: ProgressStepItem) => ({
    title: item.label,
    description: item.description ?? "",
    status: mapStatus(item.status),
});

/** Circles — icon-only dots connected by a line */
const CirclesVariant = ({ items, size = "sm", className }: { items: ProgressStepItem[]; size?: "sm" | "md"; className?: string }) => (
    <Progress.MinimalIconsConnected items={items.map(toStep)} size={size} className={className} />
);

/** Circles with text below each step */
const CirclesTextVariant = ({ items, size = "sm", orientation = "horizontal", className }: { items: ProgressStepItem[]; size?: "sm" | "md"; orientation?: "horizontal" | "vertical"; className?: string }) => (
    <Progress.IconsWithText type="icon" items={items.map(toStep)} size={size} orientation={orientation} className={className} />
);

/** Dots — minimal dots without connectors */
const DotsVariant = ({ items, size = "sm", className }: { items: ProgressStepItem[]; size?: "sm" | "md"; className?: string }) => (
    <Progress.MinimalIcons items={items.map(toStep)} size={size} className={className} />
);

/** Progress bar — the percentage-filled bar variant */
const ProgressBarVariant = ({ items, className }: { items: ProgressStepItem[]; className?: string }) => {
    const total = items.length;
    const completed = items.filter((i) => i.status === "complete").length;
    const current = items.findIndex((i) => i.status === "current");
    const pct = total > 0 ? Math.round(((completed + (current >= 0 ? 0.5 : 0)) / total) * 100) : 0;
    const currentItem = items.find((i) => i.status === "current");

    return (
        <div className={cx("flex flex-col gap-2", className)}>
            <div className="flex justify-between text-sm">
                <span className="font-medium text-secondary">{currentItem?.label ?? ""}</span>
                <span className="text-tertiary">
                    {completed} / {total}
                </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-quaternary">
                <div
                    className="h-full rounded-full bg-brand-solid transition-all duration-300"
                    style={{ width: `${pct}%` }}
                    role="progressbar"
                    aria-valuenow={pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                />
            </div>
        </div>
    );
};

/** Arrows — chevron-style breadcrumb steps */
const ArrowsVariant = ({ items, className }: { items: ProgressStepItem[]; className?: string }) => (
    <div className={cx("flex items-center", className)} role="list">
        {items.map((item, i) => {
            const s = mapStatus(item.status);
            return (
                <div
                    key={item.id}
                    role="listitem"
                    className={cx(
                        "relative flex h-10 items-center pl-5 pr-4 text-sm font-medium first:pl-4",
                        i !== 0 && "ml-px",
                        s === "complete" && "bg-brand-solid text-white",
                        s === "current" && "bg-brand-secondary text-white",
                        s === "incomplete" && "bg-secondary text-quaternary",
                    )}
                >
                    {i !== 0 && (
                        <span
                            className={cx(
                                "absolute left-0 top-0 h-0 w-0 border-y-[20px] border-l-[14px] border-y-transparent",
                                s === "complete" && "border-l-brand-solid",
                                s === "current" && "border-l-brand-secondary",
                                s === "incomplete" && "border-l-secondary",
                            )}
                        />
                    )}
                    {item.label}
                    <span
                        className={cx(
                            "absolute right-[-14px] top-0 z-10 h-0 w-0 border-y-[20px] border-l-[14px] border-y-transparent",
                            s === "complete" && "border-l-brand-solid",
                            s === "current" && "border-l-brand-secondary",
                            s === "incomplete" && "border-l-secondary",
                        )}
                    />
                </div>
            );
        })}
    </div>
);

/** Panels — bordered panel with label + description for each step */
const PanelsVariant = ({ items, className }: { items: ProgressStepItem[]; className?: string }) => (
    <Progress.TextWithLine items={items.map(toStep)} className={className} />
);

/** Bullet — list of steps with a dot indicator on the left */
const BulletVariant = ({ items, orientation = "horizontal", className }: { items: ProgressStepItem[]; orientation?: "horizontal" | "vertical"; className?: string }) => (
    <Progress.IconsWithText type="number" items={items.map(toStep)} orientation={orientation} className={className} />
);

/** Vertical — vertical layout using circle icons */
const VerticalVariant = ({ items, size = "sm", className }: { items: ProgressStepItem[]; size?: "sm" | "md"; className?: string }) => (
    <Progress.IconsWithText type="icon" orientation="vertical" items={items.map(toStep)} size={size} className={className} />
);

export const ProgressSteps = ({ items, variant = "circles", orientation = "horizontal", size = "sm", className }: ProgressStepsProps) => {
    if (orientation === "vertical") {
        return <VerticalVariant items={items} size={size} className={className} />;
    }

    switch (variant) {
        case "circles":
            return <CirclesVariant items={items} size={size} className={className} />;
        case "circles-text":
            return <CirclesTextVariant items={items} size={size} orientation={orientation} className={className} />;
        case "dots":
            return <DotsVariant items={items} size={size} className={className} />;
        case "progress-bar":
            return <ProgressBarVariant items={items} className={className} />;
        case "arrows":
            return <ArrowsVariant items={items} className={className} />;
        case "panels":
            return <PanelsVariant items={items} className={className} />;
        case "bullet":
            return <BulletVariant items={items} orientation={orientation} className={className} />;
        default:
            return <CirclesVariant items={items} size={size} className={className} />;
    }
};
