import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const Server06: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M20 12a8 8 0 0 1-8 8m8-8a8 8 0 0 0-8-8m8 8H4m8 8a8 8 0 0 1-8-8m8 8a12.24 12.24 0 0 0 3.2-8A12.24 12.24 0 0 0 12 4m0 16a12.24 12.24 0 0 1-3.2-8A12.24 12.24 0 0 1 12 4m-8 8a8 8 0 0 1 8-8M6 20a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm16 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM6 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm16 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
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
Server06.displayName = "Server06";
