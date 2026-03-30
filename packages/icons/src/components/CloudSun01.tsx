import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const CloudSun01: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M19.368 12.405A5 5 0 1 0 12 8m0 0a5.5 5.5 0 0 0-4.9 3.001L7 11a5 5 0 0 0 0 10h10.5a4.5 4.5 0 1 0-.206-8.995A5.502 5.502 0 0 0 12 8Z"
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
CloudSun01.displayName = "CloudSun01";
