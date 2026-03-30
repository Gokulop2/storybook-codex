import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const CoinsStacked02: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M13 5c0 1.105-2.462 2-5.5 2S2 6.105 2 5m11 0c0-1.105-2.462-2-5.5-2S2 3.895 2 5m11 0v4.457c-1.222.367-2 .922-2 1.543M2 5v12c0 1.105 2.462 2 5.5 2 1.33 0 2.55-.172 3.5-.457V11M2 9c0 1.105 2.462 2 5.5 2 1.33 0 2.55-.172 3.5-.457M2 13c0 1.105 2.462 2 5.5 2 1.33 0 2.55-.172 3.5-.457M22 11c0 1.105-2.462 2-5.5 2s-5.5-.895-5.5-2m11 0c0-1.105-2.462-2-5.5-2s-5.5.895-5.5 2m11 0v8c0 1.105-2.462 2-5.5 2s-5.5-.895-5.5-2v-8m11 4c0 1.105-2.462 2-5.5 2s-5.5-.895-5.5-2"
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
CoinsStacked02.displayName = "CoinsStacked02";
