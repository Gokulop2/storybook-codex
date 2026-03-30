import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const ArrowsUp: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path d="M7 20V4m0 0L3 8m4-4 4 4m6 12V9m0 0-4 4m4-4 4 4" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    {
      width: size,
      height: size,
      fill: color,
      ...props,
    }
  );
ArrowsUp.displayName = "ArrowsUp";
