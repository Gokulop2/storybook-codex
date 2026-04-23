import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const ShoppingCart02: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M6.5 17h10.83c.95 0 1.424 0 1.811-.172a2 2 0 0 0 .844-.703c.238-.35.323-.818.493-1.753l1.35-7.429c.06-.324.089-.486.043-.612a.5.5 0 0 0-.22-.264C21.536 6 21.372 6 21.042 6H5.001M2 2h1.316c.243 0 .364 0 .463.044a.5.5 0 0 1 .212.182c.059.09.078.21.116.45l2.786 17.649c.038.24.057.36.116.45a.5.5 0 0 0 .212.18c.099.045.22.045.463.045H19"
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
ShoppingCart02.displayName = "ShoppingCart02";
