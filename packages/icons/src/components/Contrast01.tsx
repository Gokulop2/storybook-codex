import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const Contrast01: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M12 2c.592 0 1.171.051 1.735.15M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10m0-20v20m5.738-18.191c.954.67 1.786 1.502 2.455 2.456m1.657 4a10.064 10.064 0 0 1 0 3.47m-1.66 4.006c-.67.952-1.5 1.782-2.453 2.45m-4.004 1.66A10.21 10.21 0 0 1 12 22"
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
Contrast01.displayName = "Contrast01";
