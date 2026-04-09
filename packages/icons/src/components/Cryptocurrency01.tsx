import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const Cryptocurrency01: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M17.878 20.09a10 10 0 0 1-11.756 0M16.384 3.012a10 10 0 0 1 5.519 10.38m-19.806 0a10 10 0 0 1 5.52-10.38M17.5 12a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z"
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
Cryptocurrency01.displayName = "Cryptocurrency01";
