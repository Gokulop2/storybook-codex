import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const Phone01: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M12 17.5h.01M8.2 22h7.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C19 20.48 19 19.92 19 18.8V5.2c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C17.48 2 16.92 2 15.8 2H8.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C5 3.52 5 4.08 5 5.2v13.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C6.52 22 7.08 22 8.2 22Zm4.3-4.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
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
Phone01.displayName = "Phone01";
