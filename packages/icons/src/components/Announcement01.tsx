import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const Announcement01: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M22 8v4M10.25 5.5H6.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.31C2 7.78 2 8.62 2 10.3v1.2c0 .932 0 1.398.152 1.765a2 2 0 0 0 1.083 1.083c.367.152.833.152 1.765.152v4.25c0 .232 0 .348.01.446a2 2 0 0 0 1.794 1.794c.098.01.214.01.446.01s.348 0 .446-.01a2 2 0 0 0 1.794-1.794c.01-.098.01-.214.01-.446V14.5h.75c1.766 0 3.927.947 5.594 1.856.973.53 1.46.795 1.778.756a.946.946 0 0 0 .691-.411c.187-.26.187-.783.187-1.827V5.126c0-1.044 0-1.566-.187-1.827a.946.946 0 0 0-.691-.411c-.319-.039-.805.226-1.778.756-1.667.909-3.828 1.856-5.594 1.856Z"
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
Announcement01.displayName = "Announcement01";
