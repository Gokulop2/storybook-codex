import { isValidElement, useContext } from "react";
import { Check } from "@opus2-platform/icons";
import type { ListBoxItemProps as AriaListBoxItemProps } from "react-aria-components";
import { ListBoxItem as AriaListBoxItem, Text as AriaText } from "react-aria-components";
import { cx, isReactComponent } from "@/utils";
import { Avatar } from "../avatar";
import { CheckboxBase } from "../checkbox/checkbox";
import {
  MultiSelectListContext,
  MultiSelectSelectionContext,
  resolveMultiSelectRowSelected,
  SelectContext,
  type SelectItemType,
} from "./select-shared";

const sizes = {
  sm: "p-2 pr-2.5",
  md: "p-2.5 pl-2",
};

const labelClass = (checkboxRows: boolean, isDisabled: boolean) =>
  cx(
    checkboxRows ? "text-sm text-primary! truncate font-medium whitespace-nowrap" : "text-md text-primary! truncate font-medium whitespace-nowrap",
    isDisabled && "text-disabled!"
  );

const descriptionClass = (checkboxRows: boolean, isDisabled: boolean) =>
  cx(
    checkboxRows ? "text-sm text-tertiary! whitespace-nowrap" : "text-md text-tertiary! whitespace-nowrap",
    isDisabled && "text-disabled!"
  );

interface SelectItemProps extends Omit<AriaListBoxItemProps<SelectItemType>, "id">, SelectItemType {}

export const SelectItem = ({ label, id, value, avatarUrl, supportingText, isDisabled, icon: Icon, className, children, ...props }: SelectItemProps) => {
  const { size } = useContext(SelectContext);
  const multiSelectList = useContext(MultiSelectListContext);
  const multiSelectSelectedIds = useContext(MultiSelectSelectionContext);
  const checkboxRows = multiSelectList?.itemLayout === "checkbox";

  const labelOrChildren = label || (typeof children === "string" ? children : "");
  const textValue = supportingText ? labelOrChildren + " " + supportingText : labelOrChildren;

  return (
    <AriaListBoxItem
      id={id}
      value={
        value ?? {
          id,
          label: labelOrChildren,
          avatarUrl,
          supportingText,
          isDisabled,
          icon: Icon,
        }
      }
      textValue={textValue}
      isDisabled={isDisabled}
      {...props}
      className={(state) => cx("w-full px-1.5 py-px outline-hidden", typeof className === "function" ? className(state) : className)}
    >
      {(state) => {
        const rowSelected = resolveMultiSelectRowSelected(multiSelectSelectedIds, id, state.isSelected);

        return (
        <div
          className={cx(
            "flex cursor-pointer items-center rounded-md outline-hidden select-none",
            checkboxRows ? "gap-2 *:data-icon:size-4 *:data-icon:stroke-[2.25px]" : "gap-2",
            !checkboxRows && rowSelected && "bg-active",
            state.isDisabled && "cursor-not-allowed",
            state.isFocused && "bg-primary_hover",
            state.isFocusVisible && "ring-focus-ring ring-2 ring-inset",

            // Icon styles (single-select / trailing-check)
            !checkboxRows && "*:data-icon:text-fg-quaternary *:data-icon:size-5 *:data-icon:shrink-0",
            !checkboxRows && state.isDisabled && "*:data-icon:text-fg-disabled",

            sizes[size]
          )}
        >
          {checkboxRows && (
            <CheckboxBase isSelected={rowSelected} isDisabled={state.isDisabled} isFocusVisible={false} size="sm" className="shrink-0" />
          )}

          {avatarUrl ? (
            <Avatar aria-hidden="true" size="xs" src={avatarUrl} alt={label} />
          ) : isReactComponent(Icon) ? (
            <Icon data-icon aria-hidden="true" />
          ) : isValidElement(Icon) ? (
            Icon
          ) : null}

          <div
            className={cx(
              "flex w-full min-w-0 flex-1 flex-wrap",
              checkboxRows ? "gap-x-1.5" : "gap-x-2"
            )}
          >
            <AriaText slot="label" className={labelClass(checkboxRows, !!state.isDisabled)}>
              {label || (typeof children === "function" ? children(state) : children)}
            </AriaText>

            {supportingText && (
              <AriaText slot="description" className={descriptionClass(checkboxRows, !!state.isDisabled)}>
                {supportingText}
              </AriaText>
            )}
          </div>

          {!checkboxRows && rowSelected && (
            <Check
              aria-hidden="true"
              className={cx("text-fg-brand-primary ml-auto", size === "sm" ? "size-4 stroke-[2.5px]" : "size-5", state.isDisabled && "text-fg-disabled")}
            />
          )}
        </div>
        );
      }}
    </AriaListBoxItem>
  );
};
