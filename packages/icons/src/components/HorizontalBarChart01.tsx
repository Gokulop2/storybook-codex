import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const HorizontalBarChart01: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M17 9.5V6.1c0-.56 0-.84-.109-1.054a1 1 0 0 0-.437-.437C16.24 4.5 15.96 4.5 15.4 4.5H3m10 10v3.4c0 .56 0 .84-.109 1.054a1 1 0 0 1-.437.437c-.214.109-.494.109-1.054.109H3M3 2v20m0-7.5h16.4c.56 0 .84 0 1.054-.109a1 1 0 0 0 .437-.437C21 13.74 21 13.46 21 12.9v-1.8c0-.56 0-.84-.109-1.054a1 1 0 0 0-.437-.437C20.24 9.5 19.96 9.5 19.4 9.5H3v5Z"
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
HorizontalBarChart01.displayName = "HorizontalBarChart01";
