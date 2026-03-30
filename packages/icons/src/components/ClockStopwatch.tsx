import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const ClockStopwatch: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M12 9.5v4l2.5 1.5M12 5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Zm0 0V2m-2 0h4m6.329 3.592-1.5-1.5.75.75m-15.908.75 1.5-1.5-.75.75"
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
ClockStopwatch.displayName = "ClockStopwatch";
