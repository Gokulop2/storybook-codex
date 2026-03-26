/** Shared layout + snippets for the Inputs docs page (Storybook). */

export const NUMBER_FIELD_LAYOUT = "group flex w-full max-w-md flex-col gap-1.5";

export type NumberVerticalGroupState = {
  isFocusWithin: boolean;
  isDisabled: boolean;
  isInvalid: boolean;
};

/** Matches Untitled vertical number field outline (see `NumberInputVerticalDemo`). */
export function numberVerticalGroupClassName({
  isFocusWithin,
  isDisabled,
  isInvalid,
}: NumberVerticalGroupState): string {
  return [
    "relative flex w-full flex-row items-stretch rounded-lg bg-primary shadow-xs outline-1 -outline-offset-1 outline-primary transition-all duration-100 ease-linear",
    isFocusWithin && !isDisabled && "outline-2 -outline-offset-2 outline-brand",
    isDisabled && "cursor-not-allowed opacity-50",
    isInvalid && "outline-error_subtle",
    isInvalid && isFocusWithin && "outline-2 -outline-offset-2 outline-error",
  ]
    .filter(Boolean)
    .join(" ");
}

/** Copy/paste snippet for the Code tab (must stay aligned with `numberVerticalGroupClassName`). */
export const NUMBER_VERTICAL_GROUP_SNIPPET = `const numberVerticalGroupClassName = ({
  isFocusWithin,
  isDisabled,
  isInvalid,
}: {
  isFocusWithin: boolean;
  isDisabled: boolean;
  isInvalid: boolean;
}) =>
  [
    "relative flex w-full flex-row items-stretch rounded-lg bg-primary shadow-xs outline-1 -outline-offset-1 outline-primary transition-all duration-100 ease-linear",
    isFocusWithin && !isDisabled && "outline-2 -outline-offset-2 outline-brand",
    isDisabled && "cursor-not-allowed opacity-50",
    isInvalid && "outline-error_subtle",
    isInvalid && isFocusWithin && "outline-2 -outline-offset-2 outline-error",
  ]
    .filter(Boolean)
    .join(" ");`;

export const NATIVE_SELECT_REGION_OPTIONS = [
  { label: "US", value: "US" },
  { label: "CA", value: "CA" },
  { label: "EU", value: "EU" },
] as const;

export const NATIVE_SELECT_CURRENCY_OPTIONS = [
  { label: "USD", value: "USD" },
  { label: "CAD", value: "CAD" },
  { label: "EUR", value: "EUR" },
] as const;

/** Formats options for multiline code strings in docs. */
export function formatNativeSelectOptionsForCode(
  options: readonly { readonly label: string; readonly value: string }[],
): string {
  return options.map((o) => `        { label: "${o.label}", value: "${o.value}" }`).join(",\n");
}

export const NUMBER_HORIZONTAL_GROUP_CLASS =
  "flex w-full flex-row items-stretch divide-x divide-secondary overflow-hidden rounded-lg bg-primary shadow-xs ring-1 ring-inset ring-primary transition-shadow focus-within:ring-brand focus-within:ring-2";

export const NUMBER_FIELD_INPUT_CLASS =
  "text-md text-primary placeholder:text-placeholder m-0 min-w-0 flex-1 border-0 bg-transparent px-3 py-2 outline-hidden ring-0";

/** Seed tags for Tag input / Tag input outer demos and code snippets. */
export const TAG_INPUT_SEED_LABELS = ["Design", "Software", "Marketing"] as const;
