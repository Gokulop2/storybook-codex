"use client";

import type { HTMLAttributes } from "react";
import { cx } from "@/utils";
import { CodexLogoMark } from "./brand-logo-minimal";

/** Full Codex logo for app shells: mark + wordmark (text). */
export const CodexLogo = (props: HTMLAttributes<HTMLOrSVGElement>) => {
    return (
        <div {...props} className={cx("flex h-8 w-max items-center justify-start overflow-visible", props.className)}>
            <CodexLogoMark className="aspect-square h-full w-auto shrink-0" />

            {/* Gap that adjusts to the height of the container */}
            <div className="aspect-[0.3] h-full" />

            <span className="text-display-xs text-primary flex h-full shrink-0 items-center font-semibold tracking-tight">Codex</span>
        </div>
    );
};

