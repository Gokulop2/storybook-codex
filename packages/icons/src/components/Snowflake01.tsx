import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const Snowflake01: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="m18.062 8.5-12.124 7m12.124-7 1.098-4.098M18.062 8.5l4.098 1.098M5.938 15.5 1.84 14.402M5.938 15.5 4.84 19.598M18.062 15.5l-12.124-7m12.124 7 4.098-1.098M18.062 15.5l1.098 4.098M5.938 8.5 4.84 4.402M5.938 8.5 1.84 9.598M12 5v14m0-14L9 2m3 3 3-3m-3 17-3 3m3-3 3 3"
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
Snowflake01.displayName = "Snowflake01";
