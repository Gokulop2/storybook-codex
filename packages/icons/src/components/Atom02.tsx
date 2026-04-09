import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const Atom02: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M17.115 15.358c-.27.306-.554.608-.851.905-4.296 4.296-9.678 5.88-12.021 3.536-1.607-1.606-1.368-4.641.325-7.775M6.89 8.725c.281-.32.578-.636.888-.947C12.074 3.482 17.456 1.9 19.8 4.243c1.608 1.607 1.367 4.645-.33 7.781m-3.206-4.246c4.296 4.296 5.88 9.678 3.536 12.021-2.343 2.343-7.725.76-12.02-3.535C3.483 11.968 1.9 6.586 4.244 4.243c2.343-2.343 7.725-.76 12.02 3.535ZM13 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
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
Atom02.displayName = "Atom02";
