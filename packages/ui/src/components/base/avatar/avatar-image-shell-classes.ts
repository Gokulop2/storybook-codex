/**
 * Shared inner shells for avatar imagery — single outline ring + minimal inset pseudo.
 * Matches the lean Untitled UI avatar well (no gradient mask / stacked pseudo borders).
 */
export const AVATAR_IMAGE_SHELL_FLEX_ROUNDED_FULL =
  "relative inline-flex size-full shrink-0 items-center justify-center overflow-hidden bg-tertiary outline-[0.5px] -outline-offset-[0.5px] outline-black/16 before:inset-[0.5px] rounded-full";

export const AVATAR_IMAGE_SHELL_FLEX_ROUNDED_MD =
  "relative inline-flex size-full shrink-0 items-center justify-center overflow-hidden bg-tertiary outline-[0.5px] -outline-offset-[0.5px] outline-black/16 before:inset-[0.5px] rounded-md";

/** Block wrapper + radius comes from `className` (e.g. `size-8 rounded-md`). */
export const AVATAR_IMAGE_SHELL_BLOCK = "relative shrink-0 overflow-hidden outline-[0.5px] -outline-offset-[0.5px] outline-black/16 before:inset-[0.5px]";

/** Fills a padded outer frame; inner radius from `className`. */
export const AVATAR_IMAGE_SHELL_FILL = "relative size-full overflow-hidden outline-[0.5px] -outline-offset-[0.5px] outline-black/16 before:inset-[0.5px]";
