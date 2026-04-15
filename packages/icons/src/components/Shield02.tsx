import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const Shield02: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M11.302 21.615c.221.13.332.194.488.227.122.026.298.026.42 0 .156-.033.267-.098.488-.227C14.646 20.479 20 16.909 20 12V8.2c0-1.074 0-1.61-.166-1.992a1.746 1.746 0 0 0-.68-.837c-.34-.24-1.005-.378-2.336-.655-1.467-.305-2.594-.856-3.624-1.653-.494-.382-.74-.573-.934-.625a.842.842 0 0 0-.52 0c-.194.052-.44.243-.934.625-1.03.797-2.157 1.348-3.624 1.653-1.33.277-1.996.415-2.336.655-.345.244-.512.45-.68.837C4 6.59 4 7.126 4 8.2V12c0 4.909 5.354 8.479 7.302 9.615Z"
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
Shield02.displayName = "Shield02";
