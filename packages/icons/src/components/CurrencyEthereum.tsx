import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const CurrencyEthereum: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="m4 11 8 2 8-2M4 11l8-9m-8 9 8-2m8 2-8-9m8 9-8-2m0-7v7m-6.5 6 6.5 7 6.5-7-6.5 1.5L5.5 15Z"
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
CurrencyEthereum.displayName = "CurrencyEthereum";
