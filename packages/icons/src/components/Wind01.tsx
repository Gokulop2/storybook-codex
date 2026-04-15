import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const Wind01: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M21 18s-1.19-.47-2-.698c-5.12-1.445-8.88 2.84-14 1.396C4.19 18.469 3 18 3 18m18-6s-1.19-.47-2-.698c-5.12-1.445-8.88 2.84-14 1.396C4.19 12.469 3 12 3 12m18-6s-1.19-.47-2-.698c-5.12-1.445-8.88 2.84-14 1.396C4.19 6.47 3 6 3 6"
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
Wind01.displayName = "Wind01";
