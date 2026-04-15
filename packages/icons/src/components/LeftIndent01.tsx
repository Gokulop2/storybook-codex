import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const LeftIndent01: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M21 9.25h-9M21 4H3m18 10.75h-9M21 20H3M4.28 8.56l3.867 2.9c.29.217.434.326.486.459a.5.5 0 0 1 0 .362c-.052.133-.197.242-.486.459l-3.867 2.9c-.412.309-.618.463-.79.46a.5.5 0 0 1-.384-.192C3 15.773 3 15.515 3 15V9.2c0-.515 0-.772.106-.908A.5.5 0 0 1 3.49 8.1c.172-.003.378.151.79.46Z"
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
LeftIndent01.displayName = "LeftIndent01";
