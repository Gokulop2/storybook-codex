import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const CloudMoon: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M16.5 13a5.502 5.502 0 0 0 5.337-4.164 5.5 5.5 0 0 1-6.673-6.672 5.502 5.502 0 0 0-3.548 7.867M5 7V3M3 5h4M6 22a4 4 0 0 1-.679-7.943 6.003 6.003 0 0 1 10.968-.892A4.5 4.5 0 1 1 17.5 22H6.001Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>,
    {
      width: size,
      height: size,
      ...props,
    }
  );
CloudMoon.displayName = "CloudMoon";
