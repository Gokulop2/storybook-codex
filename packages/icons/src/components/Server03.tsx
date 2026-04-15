import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const Server03: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="m22 17.5-.692-10.03c-.108-1.575-.163-2.362-.504-2.96a3 3 0 0 0-1.298-1.21C18.887 3 18.098 3 16.52 3H7.48c-1.578 0-2.367 0-2.986.3a3 3 0 0 0-1.298 1.21c-.341.598-.396 1.385-.504 2.96L2 17.5m20 0a3.5 3.5 0 0 1-3.5 3.5h-13A3.5 3.5 0 0 1 2 17.5m20 0a3.5 3.5 0 0 0-3.5-3.5h-13A3.5 3.5 0 0 0 2 17.5m4 0h.01m5.99 0h6"
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
Server03.displayName = "Server03";
