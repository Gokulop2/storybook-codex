import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const Sale02: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M9 9h.01M15 15h.01M16 8l-8 8M7.334 3.819a3.832 3.832 0 0 0 2.18-.904 3.832 3.832 0 0 1 4.972 0c.613.523 1.376.84 2.18.904a3.832 3.832 0 0 1 3.515 3.515 3.82 3.82 0 0 0 .904 2.18 3.832 3.832 0 0 1 0 4.972 3.832 3.832 0 0 0-.904 2.18 3.832 3.832 0 0 1-3.515 3.515 3.832 3.832 0 0 0-2.18.904 3.832 3.832 0 0 1-4.972 0 3.832 3.832 0 0 0-2.18-.904 3.832 3.832 0 0 1-3.515-3.515 3.832 3.832 0 0 0-.904-2.18 3.832 3.832 0 0 1 0-4.972c.523-.613.84-1.376.904-2.18a3.832 3.832 0 0 1 3.515-3.515ZM9.5 9a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm6 6a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
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
Sale02.displayName = "Sale02";
