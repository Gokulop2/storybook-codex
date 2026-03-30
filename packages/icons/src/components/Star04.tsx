import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const Star04: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="m12 2 2.012 5.231c.282.733.423 1.1.642 1.408.195.274.433.512.707.707.308.219.675.36 1.408.642L22 12l-5.231 2.012c-.733.282-1.1.423-1.408.642a3.003 3.003 0 0 0-.707.707c-.219.308-.36.675-.642 1.408L12 22l-2.012-5.231c-.282-.733-.423-1.1-.642-1.408a3.002 3.002 0 0 0-.707-.707c-.308-.219-.675-.36-1.408-.642L2 12l5.231-2.012c.733-.282 1.1-.423 1.408-.642a3 3 0 0 0 .707-.707c.219-.308.36-.675.642-1.408L12 2Z"
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
Star04.displayName = "Star04";
