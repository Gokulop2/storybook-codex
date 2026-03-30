import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const Toggle03Right: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path d="M2 12a6 6 0 0 1 6-6h8a6 6 0 0 1 0 12H8a6 6 0 0 1-6-6Z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    {
      width: size,
      height: size,
      fill: color,
      ...props,
    }
  );
Toggle03Right.displayName = "Toggle03Right";
