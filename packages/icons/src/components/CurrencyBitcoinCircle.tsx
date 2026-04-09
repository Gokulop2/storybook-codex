import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const CurrencyBitcoinCircle: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M9.5 7.5h4.25a2.25 2.25 0 0 1 0 4.5H9.5h4.75a2.25 2.25 0 0 1 0 4.5H9.5m0-9H8m1.5 0v9m0 0H8M10 6v1.5m0 9V18m3-12v1.5m0 9V18m9-6c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Z"
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
CurrencyBitcoinCircle.displayName = "CurrencyBitcoinCircle";
