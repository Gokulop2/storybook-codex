import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const ArrowsTriangle: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M13 19h4.294c1.865 0 2.798 0 3.328-.39a2 2 0 0 0 .804-1.436c.058-.655-.429-1.451-1.401-3.043l-.997-1.631M6.13 10.605l-2.155 3.526c-.972 1.592-1.459 2.388-1.401 3.043a2 2 0 0 0 .804 1.435C3.908 19 4.841 19 6.706 19H8.5m8.389-10L14.73 5.468C13.829 3.991 13.377 3.252 12.795 3a2 2 0 0 0-1.59 0c-.581.252-1.033.99-1.935 2.468L8.25 7.137M18 5l-1.098 4.098L12.804 8M2 11.598 6.098 10.5l1.098 4.098M15.5 22l-3-3 3-3"
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
ArrowsTriangle.displayName = "ArrowsTriangle";
