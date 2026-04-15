import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const DistributeSpacingHorizontal: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M21 21V3M3 21V3m6 5v8c0 .932 0 1.398.152 1.765a2 2 0 0 0 1.083 1.083C10.602 19 11.068 19 12 19c.932 0 1.398 0 1.765-.152a2 2 0 0 0 1.083-1.083C15 17.398 15 16.932 15 16V8c0-.932 0-1.398-.152-1.765a2 2 0 0 0-1.083-1.083C13.398 5 12.932 5 12 5c-.932 0-1.398 0-1.765.152a2 2 0 0 0-1.083 1.083C9 6.602 9 7.068 9 8Z"
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
DistributeSpacingHorizontal.displayName = "DistributeSpacingHorizontal";
