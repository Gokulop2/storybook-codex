import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
/**
 * Direction-aware icon pointing "backward". Renders as ArrowLeft in LTR and mirrors in RTL.
 *
 * Uses the `data-rtl-flip` attribute to flip via CSS. Add this rule to your global styles:
 * ```css
 * [data-rtl-flip]:dir(rtl) { transform: scaleX(-1); }
 * ```
 */
export const ArrowPrevious: FC<Props> = ({ size = 24, color = "currentColor", ...props }) => (
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
    <path d="M19 12H5m0 0 7 7m-7-7 7-7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
ArrowPrevious.displayName = "ArrowPrevious";
