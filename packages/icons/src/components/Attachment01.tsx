import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const Attachment01: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="m21.152 10.9-9.015 9.015a5.25 5.25 0 0 1-7.425-7.425l9.016-9.015a3.5 3.5 0 1 1 4.95 4.95l-8.662 8.662a1.75 1.75 0 1 1-2.475-2.475l7.601-7.602"
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
Attachment01.displayName = "Attachment01";
