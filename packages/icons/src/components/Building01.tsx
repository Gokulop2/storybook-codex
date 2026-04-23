import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const Building01: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M15 21v-5.4c0-.56 0-.84-.109-1.054a1 1 0 0 0-.437-.437C14.24 14 13.96 14 13.4 14h-2.8c-.56 0-.84 0-1.054.109a1 1 0 0 0-.437.437C9 14.76 9 15.04 9 15.6V21m10 0V6.2c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C17.48 3 16.92 3 15.8 3H8.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C5 4.52 5 5.08 5 6.2V21m16 0H3M9.5 8h.01m4.99 0h.01M10 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm5 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
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
Building01.displayName = "Building01";
