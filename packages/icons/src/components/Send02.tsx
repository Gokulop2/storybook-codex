import * as React from "react";
import type { SVGProps, FC } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}
export const Send02: FC<Props> = ({ size = 24, color = "currentColor", ...props }) =>
  React.cloneElement(
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M12 19v-7m.292 7.084 6.978 2.337c.547.183.82.274.99.209a.5.5 0 0 0 .3-.331c.048-.175-.07-.438-.305-.964l-7.49-16.713c-.23-.514-.346-.772-.507-.852a.5.5 0 0 0-.443 0c-.16.079-.277.336-.51.85L3.753 20.336c-.237.526-.356.789-.308.963a.5.5 0 0 0 .3.332c.168.066.442-.025.99-.206l7.052-2.341c.094-.031.14-.047.189-.053a.5.5 0 0 1 .128 0c.048.006.095.022.189.053Z"
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
Send02.displayName = "Send02";
