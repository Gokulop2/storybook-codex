import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const Palette: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M2 12c0 5.523 4.477 10 10 10a3 3 0 0 0 3-3v-.5c0-.464 0-.697.026-.892a3 3 0 0 1 2.582-2.582c.195-.026.428-.026.892-.026h.5a3 3 0 0 0 3-3c0-5.523-4.477-10-10-10S2 6.477 2 12Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm9-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-6-1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
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
Palette.displayName = "Palette";
