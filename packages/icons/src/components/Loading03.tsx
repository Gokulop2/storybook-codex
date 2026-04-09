import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const Loading03: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M3.34 17a4.773 4.773 0 0 1 1.458-6.34l.002-.002a4.778 4.778 0 0 1 5.484.094l3.432 2.496a4.778 4.778 0 0 0 5.485.094l.002-.002A4.77 4.77 0 0 0 20.66 7m-3.658 13.66a4.774 4.774 0 0 1-6.34-1.458l-.002-.003a4.778 4.778 0 0 1 .095-5.484l2.495-3.432a4.778 4.778 0 0 0 .094-5.484l-.004-.002A4.772 4.772 0 0 0 7 3.34m12.07 1.59c3.906 3.905 3.906 10.236 0 14.141-3.905 3.906-10.236 3.906-14.141 0-3.905-3.905-3.905-10.236 0-14.141 3.905-3.905 10.236-3.905 14.141 0Z"
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
Loading03.displayName = "Loading03";
