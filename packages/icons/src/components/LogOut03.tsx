import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const LogOut03: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="m16 17 5-5m0 0-5-5m5 5H9m3 5c0 .296 0 .443-.011.571a3 3 0 0 1-2.404 2.686 7.012 7.012 0 0 1-.567.074l-1.021.114c-1.535.17-2.302.256-2.911.06a3 3 0 0 1-1.825-1.633C3 18.288 3 17.516 3 15.972V8.028c0-1.544 0-2.316.261-2.9a3 3 0 0 1 1.825-1.634c.61-.195 1.376-.11 2.91.061l1.022.114c.294.032.441.049.567.074a3 3 0 0 1 2.404 2.686c.011.128.011.275.011.57"
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
LogOut03.displayName = "LogOut03";
