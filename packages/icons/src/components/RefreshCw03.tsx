import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const RefreshCw03: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M14 22s.85-.121 4.364-3.636A9 9 0 0 0 14 3.224M14 22h6m-6 0v-6M10 2s-.85.122-4.364 3.636A9 9 0 0 0 10 20.776M10 2H4m6 0v6"
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
RefreshCw03.displayName = "RefreshCw03";
