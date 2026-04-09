import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const ImageIndentRight: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M21 4H3m18 16H3M9 9.25H3m6 5.5H3M14.6 16h4.8c.56 0 .84 0 1.054-.109a1 1 0 0 0 .437-.437C21 15.24 21 14.96 21 14.4V9.6c0-.56 0-.84-.109-1.054a1 1 0 0 0-.437-.437C20.24 8 19.96 8 19.4 8h-4.8c-.56 0-.84 0-1.054.109a1 1 0 0 0-.437.437C13 8.76 13 9.04 13 9.6v4.8c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437C13.76 16 14.04 16 14.6 16Z"
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
ImageIndentRight.displayName = "ImageIndentRight";
