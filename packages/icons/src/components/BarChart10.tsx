import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const BarChart10: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M9 7H4.6c-.56 0-.84 0-1.054.109a1 1 0 0 0-.437.437C3 7.76 3 8.04 3 8.6v10.8c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437C3.76 21 4.04 21 4.6 21H9m0 0h6m-6 0V4.6c0-.56 0-.84.109-1.054a1 1 0 0 1 .437-.437C9.76 3 10.04 3 10.6 3h2.8c.56 0 .84 0 1.054.109a1 1 0 0 1 .437.437C15 3.76 15 4.04 15 4.6V21m0-10h4.4c.56 0 .84 0 1.054.109a1 1 0 0 1 .437.437C21 11.76 21 12.04 21 12.6v6.8c0 .56 0 .84-.109 1.054a1 1 0 0 1-.437.437C20.24 21 19.96 21 19.4 21H15"
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
BarChart10.displayName = "BarChart10";
