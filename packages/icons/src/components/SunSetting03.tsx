import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const SunSetting03: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M6.06 20.913c1.21.55 2.75.55 3.96 0s2.75-.55 3.96 0 2.75.55 3.96 0M12 3v2m-8 8H2m4.314-5.686L4.9 5.9m12.786 1.414L19.1 5.9M22 13h-2M7 13a5 5 0 0 1 10 0M2.1 17.413c1.21-.55 2.75-.55 3.96 0s2.75.55 3.96 0 2.75-.55 3.96 0 2.75.55 3.96 0 2.75-.55 3.96 0"
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
SunSetting03.displayName = "SunSetting03";
