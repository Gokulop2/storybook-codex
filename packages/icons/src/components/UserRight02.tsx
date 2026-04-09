import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const UserRight02: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="m19 9 3-3m0 0-3-3m3 3h-6m0 15v-1.2c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C13.72 15 12.88 15 11.2 15H6.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C2 17.28 2 18.12 2 19.8V21M12.5 7.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
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
UserRight02.displayName = "UserRight02";
