import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const Hourglass02: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M18.163 2H5.837A.837.837 0 0 0 5 2.837a10.05 10.05 0 0 0 2.943 7.106l1.22 1.22c.12.12.181.181.224.24a1 1 0 0 1 0 1.195 2.508 2.508 0 0 1-.224.24l-1.22 1.219A10.05 10.05 0 0 0 5 21.163c0 .462.375.837.837.837h12.326a.837.837 0 0 0 .837-.837 10.05 10.05 0 0 0-2.943-7.106l-1.22-1.22c-.12-.12-.181-.181-.224-.24a1 1 0 0 1 0-1.195c.043-.058.103-.118.224-.24l1.22-1.219A10.05 10.05 0 0 0 19 2.837.837.837 0 0 0 18.163 2Z"
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
Hourglass02.displayName = "Hourglass02";
