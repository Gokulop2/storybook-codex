import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const CheckCircleBroken: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path d="M22 11.086v.92a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    {
      width: size,
      height: size,
      fill: color,
      ...props,
    }
  );
CheckCircleBroken.displayName = "CheckCircleBroken";
