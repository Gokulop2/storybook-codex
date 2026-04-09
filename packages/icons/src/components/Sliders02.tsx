import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const Sliders02: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M5 21v-6m0 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0-8V3m7 18v-6m0-8V3m0 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm7 14v-4m0 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0-8V3"
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
Sliders02.displayName = "Sliders02";
