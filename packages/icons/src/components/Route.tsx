import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const Route: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M11.5 5h.434c3.048 0 4.571 0 5.15.547a2 2 0 0 1 .586 1.845c-.156.781-1.4 1.66-3.888 3.42l-4.064 2.876c-2.488 1.76-3.732 2.639-3.888 3.42a2 2 0 0 0 .586 1.845c.579.547 2.102.547 5.15.547h.934M8 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm14 14a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
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
Route.displayName = "Route";
