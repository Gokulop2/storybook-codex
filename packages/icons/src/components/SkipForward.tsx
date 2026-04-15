import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const SkipForward: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M19 5v14M7.6 17.92l5.838-4.67c.534-.428.801-.641.898-.9a1 1 0 0 0 0-.7c-.097-.259-.364-.472-.898-.9L7.6 6.08c-.833-.666-1.25-1-1.6-1a1 1 0 0 0-.783.377C5 5.73 5 6.263 5 7.329v9.342c0 1.066 0 1.599.218 1.872a1 1 0 0 0 .783.376c.35 0 .766-.333 1.599-.999Z"
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
SkipForward.displayName = "SkipForward";
