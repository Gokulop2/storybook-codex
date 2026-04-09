import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const CoinsStacked04: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M20 5c0 1.657-3.582 3-8 3S4 6.657 4 5m16 0c0-1.657-3.582-3-8-3S4 3.343 4 5m16 0v14c0 1.657-3.582 3-8 3s-8-1.343-8-3V5m16 4.667c0 1.656-3.582 3-8 3s-8-1.344-8-3m16 4.663c0 1.657-3.582 3-8 3s-8-1.343-8-3"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>,
    {
      width: size,
      height: size,
      fill: color,
      ...props,
    }
  );
CoinsStacked04.displayName = "CoinsStacked04";
