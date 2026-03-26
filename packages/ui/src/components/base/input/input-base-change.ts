import type { ChangeEvent } from "react";
import type { InputBaseProps } from "./input";

/** `InputBase` without `TextField` receives DOM `ChangeEvent`; with `TextField`, value may be a string. */
export function createInputBaseChangeHandler(set: (next: string) => void): NonNullable<InputBaseProps["onChange"]> {
  return (value) => {
    set(typeof value === "string" ? value : (value as ChangeEvent<HTMLInputElement>).currentTarget.value);
  };
}
