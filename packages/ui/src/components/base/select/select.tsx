import type { FC, ReactNode, Ref, RefAttributes } from "react";
import { isValidElement } from "react";
import { ChevronDown } from "@opus2-platform/icons";
import type { SelectProps as AriaSelectProps } from "react-aria-components";
import { Button as AriaButton, ListBox as AriaListBox, Select as AriaSelect, SelectValue as AriaSelectValue } from "react-aria-components";
import { cx, isReactComponent } from "@/utils";
import { Avatar } from "../avatar/avatar";
import { HintText } from "../input/hint-text";
import { Label } from "../input/label";
import { ComboBox } from "./combobox";
import { Popover } from "./popover";
import { SelectItem } from "./select-item";
import { type CommonSelectProps, SelectContext, type SelectItemType, sizes } from "./select-shared";

export type { CommonSelectProps, SelectItemType } from "./select-shared";

interface SelectProps extends Omit<AriaSelectProps<SelectItemType>, "children" | "items">, RefAttributes<HTMLDivElement>, CommonSelectProps {
  items?: SelectItemType[];
  popoverClassName?: string;
  placeholderIcon?: FC | ReactNode;
  children: ReactNode | ((item: SelectItemType) => ReactNode);
}

interface SelectValueProps {
  isOpen: boolean;
  size: "sm" | "md";
  isFocused: boolean;
  isDisabled: boolean;
  placeholder?: string;
  ref?: Ref<HTMLButtonElement>;
  placeholderIcon?: FC | ReactNode;
}

const SelectValue = ({ isOpen, isFocused, isDisabled, size, placeholder, placeholderIcon, ref }: SelectValueProps) => {
  return (
    <AriaButton
      ref={ref}
      className={cx(
        "bg-primary ring-primary relative flex w-full cursor-pointer items-center rounded-lg shadow-xs ring-1 outline-hidden transition duration-100 ease-linear ring-inset",
        (isFocused || isOpen) && "ring-brand ring-2",
        isDisabled && "bg-disabled_subtle text-disabled cursor-not-allowed"
      )}
    >
      <AriaSelectValue<SelectItemType>
        className={cx(
          "flex h-max w-full items-center justify-start gap-2 truncate text-left align-middle",

          // Icon styles
          "*:data-icon:text-fg-quaternary in-disabled:*:data-icon:text-fg-disabled *:data-icon:size-5 *:data-icon:shrink-0",

          sizes[size].root
        )}
      >
        {(state) => {
          const Icon = state.selectedItem?.icon || placeholderIcon;
          return (
            <>
              {state.selectedItem?.avatarUrl ? (
                <Avatar size="xs" src={state.selectedItem.avatarUrl} alt={state.selectedItem.label} />
              ) : isReactComponent(Icon) ? (
                <Icon data-icon aria-hidden="true" />
              ) : isValidElement(Icon) ? (
                Icon
              ) : null}

              {state.selectedItem ? (
                <section className="flex w-full gap-2 truncate">
                  <p className="text-md text-primary truncate font-medium">{state.selectedItem?.label}</p>
                  {state.selectedItem?.supportingText && <p className="text-md text-tertiary">{state.selectedItem?.supportingText}</p>}
                </section>
              ) : (
                <p className={cx("text-md text-placeholder", isDisabled && "text-disabled")}>{placeholder}</p>
              )}

              <ChevronDown aria-hidden="true" className={cx("text-fg-quaternary ml-auto shrink-0", size === "sm" ? "size-4 stroke-[2.5px]" : "size-5")} />
            </>
          );
        }}
      </AriaSelectValue>
    </AriaButton>
  );
};

const Select = ({ placeholder = "Select", placeholderIcon, size = "sm", children, items, label, hint, tooltip, className, ...rest }: SelectProps) => {
  return (
    <SelectContext.Provider value={{ size }}>
      <AriaSelect {...rest} className={(state) => cx("flex flex-col gap-1.5", typeof className === "function" ? className(state) : className)}>
        {(state) => (
          <>
            {label && (
              <Label isRequired={state.isRequired} tooltip={tooltip}>
                {label}
              </Label>
            )}

            <SelectValue {...state} {...{ size, placeholder }} placeholderIcon={placeholderIcon} />

            <Popover size={size} className={rest.popoverClassName}>
              <AriaListBox items={items} className="size-full outline-hidden">
                {children}
              </AriaListBox>
            </Popover>

            {hint && <HintText isInvalid={state.isInvalid}>{hint}</HintText>}
          </>
        )}
      </AriaSelect>
    </SelectContext.Provider>
  );
};

const _Select = Select as typeof Select & {
  ComboBox: typeof ComboBox;
  Item: typeof SelectItem;
};
_Select.ComboBox = ComboBox;
_Select.Item = SelectItem;

export { _Select as Select };
