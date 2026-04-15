import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const Shield01: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M11.302 21.615c.221.129.332.194.488.227.122.026.298.026.42 0 .156-.034.267-.098.488-.227C14.646 20.478 20 16.908 20 12V7.217c0-.799 0-1.199-.13-1.542a2 2 0 0 0-.548-.79c-.275-.243-.65-.383-1.398-.664l-5.362-2.01c-.208-.078-.312-.117-.419-.133a1 1 0 0 0-.286 0c-.107.016-.21.055-.419.133L6.076 4.22c-.748.28-1.122.421-1.398.664a2 2 0 0 0-.547.79C4 6.018 4 6.418 4 7.217V12c0 4.908 5.354 8.478 7.302 9.615Z"
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
Shield01.displayName = "Shield01";
