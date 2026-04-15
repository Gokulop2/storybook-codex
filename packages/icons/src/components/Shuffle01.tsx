import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const Shuffle01: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="m18 15 3 3m0 0-3 3m3-3h-2.431c-.94 0-1.409 0-1.835-.13a2.998 2.998 0 0 1-1.033-.552c-.345-.283-.605-.674-1.126-1.455l-.242-.363M18 3l3 3m0 0-3 3m3-3h-2.431c-.94 0-1.409 0-1.835.13a3 3 0 0 0-1.033.552c-.345.283-.605.674-1.126 1.455l-5.15 7.726c-.521.781-.782 1.172-1.126 1.455-.304.25-.655.438-1.033.552-.426.13-.896.13-1.835.13H3M3 6h2.431c.94 0 1.409 0 1.835.13a3 3 0 0 1 1.033.552c.344.283.605.674 1.126 1.455l.242.363"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>,
    {
      width: size,
      height: size,
      fill: "none",
      stroke: color,
      ...props,
    }
  );
Shuffle01.displayName = "Shuffle01";
