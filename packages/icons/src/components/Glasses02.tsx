import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const Glasses02: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M10 14.535a4.008 4.008 0 0 1 4 0M2 15l.701-7.015c.027-.266.04-.399.06-.513A3 3 0 0 1 5.485 5.01C5.599 5 5.733 5 6 5m16 10-.701-7.015c-.027-.266-.04-.399-.06-.513a3 3 0 0 0-2.723-2.463C18.402 5 18.268 5 18 5m-9.172 7.172a4 4 0 1 1-5.656 5.656 4 4 0 0 1 5.656-5.656Zm12 0a4 4 0 1 1-5.656 5.656 4 4 0 0 1 5.656-5.656Z"
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
Glasses02.displayName = "Glasses02";
