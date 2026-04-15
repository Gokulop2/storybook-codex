import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const Star07: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M22 12h-2m-.929 7.071-1.414-1.414M4 12H2m4.343-5.657L4.929 4.93M12 4V2m5.657 4.343L19.07 4.93M12 22v-2m-7.071-.929 1.414-1.414M12 7l1.545 3.13 3.455.505-2.5 2.435.59 3.44L12 14.885 8.91 16.51l.59-3.44L7 10.635l3.455-.505L12 7Z"
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
Star07.displayName = "Star07";
