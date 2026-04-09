import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const GitBranch01: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M3 3v10.2c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C5.28 18 6.12 18 7.8 18H15m0 0a3 3 0 1 0 6 0 3 3 0 0 0-6 0ZM3 8h12m0 0a3 3 0 1 0 6 0 3 3 0 0 0-6 0Z"
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
GitBranch01.displayName = "GitBranch01";
