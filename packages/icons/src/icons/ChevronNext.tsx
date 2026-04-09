import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
    color?: string;
    size?: number;
}
/**
 * Direction-aware icon pointing "forward". Renders as ChevronRight in LTR and mirrors in RTL.
 *
 * Uses the `data-rtl-flip` attribute to flip via CSS. Add this rule to your global styles:
 * ```css
 * [data-rtl-flip]:dir(rtl) { transform: scaleX(-1); }
 * ```
 */
export const ChevronNext: FC<Props> = ({ size = 24, color = "currentColor", ...props }) => (
    <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        data-rtl-flip=""
        {...props}
    >
        <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
ChevronNext.displayName = "ChevronNext";
