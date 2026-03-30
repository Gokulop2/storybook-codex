import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const Command: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M9 9V6a3 3 0 1 0-3 3h3Zm0 0v6m0-6h6m-6 6v3a3 3 0 1 1-3-3h3Zm0 0h6m0 0h3a3 3 0 1 1-3 3v-3Zm0 0V9m0 0V6a3 3 0 1 1 3 3h-3Z"
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
Command.displayName = "Command";
