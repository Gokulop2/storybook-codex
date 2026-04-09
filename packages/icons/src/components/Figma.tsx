import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const Figma: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M12 1.5H8.5a3.5 3.5 0 1 0 0 7m3.5-7v7m0-7h3.5a3.5 3.5 0 1 1 0 7m-3.5 0H8.5m3.5 0v7m0-7h3.5m-7 0a3.5 3.5 0 1 0 0 7m3.5 0H8.5m3.5 0V19a3.5 3.5 0 1 1-3.5-3.5m7-7a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Z"
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
Figma.displayName = "Figma";
