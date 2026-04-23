"use client";

import type { SVGProps } from "react";
import { cx } from "@/utils";

/** Opus “O” mark only (from `opus-logo-small.svg`), for slim / icon-only rails. */
export const OpusLogoSmall = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props} className={cx("shrink-0", props.className)}>
    <path
      d="M6.92319 -0.0264854C3.09875 -0.0264854 0 3.06167 0 6.89141C0 10.7212 3.09875 13.804 6.92319 13.804C10.7476 13.804 13.857 10.7053 13.857 6.89141C13.857 3.07756 10.7529 -0.0264854 6.92319 -0.0264854ZM6.92319 11.2932C4.48657 11.2932 2.51608 9.32274 2.51608 6.88611C2.51608 4.44949 4.48657 2.46841 6.92319 2.46841C9.35982 2.46841 11.3462 4.4389 11.3462 6.88611C11.3462 9.33333 9.37571 11.2932 6.92319 11.2932Z"
      fill="#572258"
    />
  </svg>
);
