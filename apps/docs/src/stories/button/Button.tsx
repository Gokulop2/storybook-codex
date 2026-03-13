import type { ComponentProps } from "react";
import { Button as CodexButton } from "@opus2-platform/codex";

export type ButtonProps = ComponentProps<typeof CodexButton>;

/**
 * Thin wrapper around the Codex design system `Button`.
 *
 * This ensures Storybook uses the exact Untitled UI–style button implementation
 * without any additional Storybook-specific styling.
 */
export const Button = (props: ButtonProps) => {
  return <CodexButton {...props} />;
};
