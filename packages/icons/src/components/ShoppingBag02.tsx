import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const ShoppingBag02: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M16 9V6a4 4 0 0 0-8 0v3m-4.408 1.352-.6 6.4c-.17 1.82-.256 2.73.046 3.432a3 3 0 0 0 1.32 1.45C5.03 22 5.944 22 7.771 22h8.458c1.828 0 2.742 0 3.413-.366a3 3 0 0 0 1.32-1.45c.302-.703.217-1.612.046-3.432l-.6-6.4c-.144-1.537-.216-2.305-.561-2.886a3 3 0 0 0-1.292-1.176C17.945 6 17.173 6 15.629 6H8.371c-1.543 0-2.315 0-2.925.29a3 3 0 0 0-1.292 1.176c-.346.581-.418 1.35-.562 2.886Z"
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
ShoppingBag02.displayName = "ShoppingBag02";
