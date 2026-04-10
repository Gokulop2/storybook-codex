"use client";

import type { HTMLAttributes } from "react";
import { cx } from "@/utils";

/**
 * Opus 2 product wordmark: “OPUS” + cyan “2”, as used in application sidebars.
 */
export const Opus2Wordmark = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            {...props}
            className={cx("flex items-center justify-center gap-0.5 text-lg font-semibold tracking-[0.02em]", className)}
            aria-label="Opus 2"
        >
            <span className="text-[#5b2d62]">OPUS</span>
            <span className="text-cyan-500">2</span>
        </div>
    );
};
