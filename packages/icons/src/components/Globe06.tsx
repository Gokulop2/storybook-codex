import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const Globe06: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="m2.687 15.645 1.908-1.101a.5.5 0 0 1 .342-.059l3.754.703a.5.5 0 0 0 .592-.494l-.014-3.29a.5.5 0 0 1 .068-.254l1.895-3.244a.5.5 0 0 0-.023-.54l-3.19-4.54M19 4.859C13.5 7.5 16.5 11 17.5 11.5c1.877.938 4.488 1 4.488 1 .008-.166.012-.332.012-.5 0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10c.168 0 .334-.004.5-.012m4.258-.048-3.168-8.35 8.349 3.167-3.702 1.48-1.48 3.702Z"
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
Globe06.displayName = "Globe06";
