import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const Umbrella03: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M6.25 21.96 12 12m5-8.66C12.687.85 7.29 1.938 4.246 5.683c-.297.366-.446.548-.489.81-.034.209.017.485.123.667.134.23.371.366.845.64l14.55 8.4c.474.274.711.41.976.412a1.1 1.1 0 0 0 .64-.227c.205-.168.289-.388.457-.828C23.07 11.048 21.313 5.83 17 3.34Zm0 0C15.087 2.235 11.297 5.217 8.536 10M17 3.34c1.913 1.105 1.226 5.877-1.536 10.66M22 22H2"
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
Umbrella03.displayName = "Umbrella03";
