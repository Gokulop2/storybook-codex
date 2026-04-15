import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const Fingerprint03: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M8.1 21.221a12.16 12.16 0 0 1-2.207-7.002 6.108 6.108 0 0 1 6.106-6.11 6.108 6.108 0 0 1 6.106 6.11"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.1 21.221a12.16 12.16 0 0 1-2.207-7.002 6.108 6.108 0 0 1 6.106-6.11 6.108 6.108 0 0 1 6.106 6.11"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.436 20.312c-.11.006-.218.016-.329.016a6.108 6.108 0 0 1-6.106-6.11"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.436 20.312c-.11.006-.218.016-.329.016a6.108 6.108 0 0 1-6.106-6.11"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.27 22a9.158 9.158 0 0 1-4.323-7.781 3.054 3.054 0 1 1 6.107 0 3.054 3.054 0 1 0 6.108 0c0-5.062-4.102-9.164-9.16-9.164-5.059 0-9.16 4.102-9.16 9.164 0 1.128.126 2.226.358 3.286"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.27 22a9.158 9.158 0 0 1-4.323-7.781 3.054 3.054 0 1 1 6.107 0 3.054 3.054 0 1 0 6.108 0c0-5.062-4.102-9.164-9.16-9.164-5.059 0-9.16 4.102-9.16 9.164 0 1.128.126 2.226.358 3.286"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.526 5.863A11.327 11.327 0 0 0 12 2a11.327 11.327 0 0 0-8.525 3.863"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.526 5.863A11.327 11.327 0 0 0 12 2a11.327 11.327 0 0 0-8.525 3.863"
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
Fingerprint03.displayName = "Fingerprint03";
