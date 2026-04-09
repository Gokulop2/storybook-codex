import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const AlarmClockOff: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M10.5 5.142a7.999 7.999 0 0 1 9.358 9.358m-1.722 3.634A8 8 0 1 1 6.862 6.869M4 4 2 6m20 0-3-3M6 19l-2 2m17 0L3 3"
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
AlarmClockOff.displayName = "AlarmClockOff";
