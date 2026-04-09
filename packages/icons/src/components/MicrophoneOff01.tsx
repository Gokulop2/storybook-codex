import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const MicrophoneOff01: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M15 9.4V5a3 3 0 0 0-5.688-1.334M12 19v3m0-3a7 7 0 0 1-7-7v-2m7 9a7 7 0 0 0 7-7v-2M8 22h8M2 2l20 20m-10-7a3 3 0 0 1-3-3V9l5.123 5.12A2.99 2.99 0 0 1 12 15Z"
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
MicrophoneOff01.displayName = "MicrophoneOff01";
