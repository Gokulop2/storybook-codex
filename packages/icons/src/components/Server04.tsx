import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const Server04: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="m22 10.5-.474-3.795c-.186-1.489-.28-2.233-.63-2.794a3 3 0 0 0-1.283-1.133c-.6-.278-1.35-.278-2.85-.278H7.237c-1.5 0-2.25 0-2.85.278a3 3 0 0 0-1.283 1.133c-.35.56-.444 1.305-.63 2.794L2 10.5m3.5 4h13m-13 0a3.5 3.5 0 1 1 0-7h13a3.5 3.5 0 1 1 0 7m-13 0a3.5 3.5 0 1 0 0 7h13a3.5 3.5 0 1 0 0-7M6 11h.01M6 18h.01M12 11h6m-6 7h6"
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
Server04.displayName = "Server04";
