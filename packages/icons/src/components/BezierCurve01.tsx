import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const BezierCurve01: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M10 7H3m18 0h-7m0 .252c3.45.888 6 4.02 6 7.748M4 15c0-3.728 2.55-6.86 6-7.748M3.6 19h.8c.56 0 .84 0 1.054-.109a1 1 0 0 0 .437-.437C6 18.24 6 17.96 6 17.4v-.8c0-.56 0-.84-.109-1.054a1 1 0 0 0-.437-.437C5.24 15 4.96 15 4.4 15h-.8c-.56 0-.84 0-1.054.109a1 1 0 0 0-.437.437C2 15.76 2 16.04 2 16.6v.8c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437C2.76 19 3.04 19 3.6 19Zm8-10h.8c.56 0 .84 0 1.054-.109a1 1 0 0 0 .437-.437C14 8.24 14 7.96 14 7.4v-.8c0-.56 0-.84-.109-1.054a1 1 0 0 0-.437-.437C13.24 5 12.96 5 12.4 5h-.8c-.56 0-.84 0-1.054.109a1 1 0 0 0-.437.437C10 5.76 10 6.04 10 6.6v.8c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437C10.76 9 11.04 9 11.6 9Zm8 10h.8c.56 0 .84 0 1.054-.109a1 1 0 0 0 .437-.437C22 18.24 22 17.96 22 17.4v-.8c0-.56 0-.84-.109-1.054a1 1 0 0 0-.437-.437C21.24 15 20.96 15 20.4 15h-.8c-.56 0-.84 0-1.054.109a1 1 0 0 0-.437.437C18 15.76 18 16.04 18 16.6v.8c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437C18.76 19 19.04 19 19.6 19ZM22 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM4 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
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
BezierCurve01.displayName = "BezierCurve01";
