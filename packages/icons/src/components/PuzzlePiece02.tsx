import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const PuzzlePiece02: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="m12 2 3.6 3.6c2.4-6.3 9.1.4 2.8 2.8L22 12l-3.6 3.6c-2.4-6.3-9.1.4-2.8 2.8L12 22l-3.6-3.6C6 24.7-.7 18 5.6 15.6L2 12l3.6-3.6C8 14.7 14.7 8 8.4 5.6L12 2Z"
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
PuzzlePiece02.displayName = "PuzzlePiece02";
