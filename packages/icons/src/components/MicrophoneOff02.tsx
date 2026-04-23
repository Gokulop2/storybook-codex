import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const MicrophoneOff02: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M4 12v1a8 8 0 0 0 14.138 5.132M2 2l20 20m-6-11.6V7a4 4 0 0 0-6.53-3.1M12 17a4 4 0 0 1-4-4V8l7.281 7.288A3.995 3.995 0 0 1 12 17Z"
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
MicrophoneOff02.displayName = "MicrophoneOff02";
