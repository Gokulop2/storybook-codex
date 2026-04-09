import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const Headphones02: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M22 17v-4c0-5.523-4.477-10-10-10S2 7.477 2 13v4m5.5 4A2.5 2.5 0 0 1 5 18.5v-3a2.5 2.5 0 0 1 5 0v3A2.5 2.5 0 0 1 7.5 21Zm9 0a2.5 2.5 0 0 1-2.5-2.5v-3a2.5 2.5 0 0 1 5 0v3a2.5 2.5 0 0 1-2.5 2.5Z"
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
Headphones02.displayName = "Headphones02";
