import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const WatchCircle: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="m7 17 .486 2.428c.183.916.274 1.374.514 1.717a2 2 0 0 0 .839.688c.383.167.85.167 1.784.167h2.754c.934 0 1.401 0 1.784-.167a2 2 0 0 0 .84-.688c.239-.343.33-.801.514-1.717L17 17M7 7l.486-2.428c.183-.916.274-1.374.514-1.717a2 2 0 0 1 .839-.688C9.222 2 9.689 2 10.623 2h2.754c.934 0 1.401 0 1.784.167a2 2 0 0 1 .84.688c.239.343.33.801.514 1.717L17 7m-5 2v3l1.5 1.5M19 12a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
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
WatchCircle.displayName = "WatchCircle";
