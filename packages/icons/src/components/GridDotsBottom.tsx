import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const GridDotsBottom: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M3 3h.01M3 12h.01M3 16.5h.01M3 7.5h.01M7.5 3h.01m-.01 9h.01m8.99-9h.01m-.01 9h.01M12 3h.01M12 12h.01M12 16.5h.01m-.01-9h.01M21 3h.01M21 12h.01M21 16.5h.01m-.01-9h.01M21 21H3"
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
GridDotsBottom.displayName = "GridDotsBottom";
