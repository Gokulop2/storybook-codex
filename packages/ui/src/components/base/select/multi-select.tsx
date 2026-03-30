import type { FocusEventHandler, KeyboardEvent, MouseEvent, PointerEventHandler, RefAttributes, RefObject } from "react";
import { useCallback, useContext, useRef, useState } from "react";
import { ChevronDown, SearchLg } from "@opus2-platform/icons";
import { FocusScope, useFilter, useFocusManager } from "react-aria";
import type { ComboBoxProps as AriaComboBoxProps, GroupProps as AriaGroupProps, ListBoxProps as AriaListBoxProps, Key } from "react-aria-components";
import { ComboBox as AriaComboBox, Group as AriaGroup, Input as AriaInput, ListBox as AriaListBox, ComboBoxStateContext } from "react-aria-components";
import type { ListData } from "react-stately";
import { useListData } from "react-stately";
import { useResizeObserver } from "@/hooks";
import { cx } from "@/utils";
import { Avatar } from "../avatar/avatar";
import { HintText } from "../input/hint-text";
import { Label } from "../input/label";
import { TagCloseX } from "../tags/base-components/tag-close-x";
import { Popover } from "./popover";
import { SelectItem } from "./select-item";
import { MultiSelectComboboxContext } from "./multi-select-combobox-context";
import { MultiSelectPopoverFooter } from "./multi-select-footer";
import {
  type IconComponentType,
  MultiSelectListContext,
  MultiSelectSelectionContext,
  type MultiSelectTriggerDisplay,
  SelectContext,
  type SelectItemType,
  sizes,
  sumMemberCountsForItems,
} from "./select-shared";

export type { MultiSelectTriggerDisplay } from "./select-shared";

interface ComboBoxValueProps extends AriaGroupProps {
  size: "sm" | "md";
  shortcut?: boolean;
  isDisabled?: boolean;
  placeholder?: string;
  shortcutClassName?: string;
  placeholderIcon?: IconComponentType | null;
  /** When `"summary"`, hides the leading search icon unless `placeholderIcon` is set. */
  triggerDisplay?: MultiSelectTriggerDisplay;
  ref?: RefObject<HTMLDivElement | null>;
  onFocus?: FocusEventHandler;
  onPointerEnter?: PointerEventHandler;
}

interface MultiSelectProps extends Omit<AriaComboBoxProps<SelectItemType>, "children" | "items">, RefAttributes<HTMLDivElement> {
  hint?: string;
  label?: string;
  tooltip?: string;
  size?: "sm" | "md";
  placeholder?: string;
  shortcut?: boolean;
  items?: SelectItemType[];
  popoverClassName?: string;
  shortcutClassName?: string;
  selectedItems: ListData<SelectItemType>;
  placeholderIcon?: IconComponentType | null;
  children: AriaListBoxProps<SelectItemType>["children"];
  onItemCleared?: (key: Key) => void;
  onItemInserted?: (key: Key) => void;
  /**
   * `"tags"` (default): search icon, chips, and filter input.
   * `"summary"`: summary trigger — “N selected” plus optional `summarySupportingText` (e.g. total headcount), no tag chips.
   */
  triggerDisplay?: MultiSelectTriggerDisplay;
  /**
   * Optional static secondary line in summary mode when member totals cannot be derived.
   * Prefer setting `memberCount` on items (or numeric `supportingText` like `"4 members"`); the trigger then shows the **sum** for checked rows (e.g. `"12 users"`).
   */
  summarySupportingText?: string;
  /** Label after the summed count in summary mode. Default `"users"`. */
  summaryMemberLabel?: string;
  /** Pinned footer with Reset / Select all. Default `true`. */
  showPopoverFooter?: boolean;
}

const LISTBOX_SCROLL_CLASS = "max-h-[272px] min-h-0 flex-1 overflow-y-auto py-1 outline-hidden";

export const MultiSelectBase = ({
  items,
  children,
  size = "sm",
  selectedItems,
  onItemCleared,
  onItemInserted,
  shortcut,
  triggerDisplay = "tags",
  summarySupportingText,
  summaryMemberLabel = "users",
  placeholder = "Search",
  placeholderIcon,
  showPopoverFooter = true,
  // Omit these props to avoid conflicts with the `Select` component
  name: _name,
  className: _className,
  ...props
}: MultiSelectProps) => {
  const { contains } = useFilter({ sensitivity: "base" });
  const selectedKeys = selectedItems.items.map((item) => item.id);

  const filter = useCallback(
    (item: SelectItemType, text: string) => contains(item.label || item.supportingText || "", text),
    [contains]
  );

  const accessibleList = useListData({
    initialItems: items,
    filter,
  });

  const onRemove = useCallback(
    (keys: Set<Key>) => {
      const key = keys.values().next().value;

      if (!key) return;

      selectedItems.remove(key);
      onItemCleared?.(key);
    },
    [selectedItems, onItemCleared]
  );

  const onSelectionChange = (id: Key | null) => {
    if (!id) {
      return;
    }

    const item = accessibleList.getItem(id);

    if (!item) {
      return;
    }

    if (selectedKeys.includes(id as string)) {
      selectedItems.remove(id);
      onItemCleared?.(id);
    } else {
      selectedItems.append(item);
      onItemInserted?.(id);
    }

    accessibleList.setFilterText("");
  };

  const onInputChange = (value: string) => {
    accessibleList.setFilterText(value);
  };

  const placeholderRef = useRef<HTMLDivElement>(null);
  const [popoverWidth, setPopoverWidth] = useState("");

  // Resize observer for popover width
  const onResize = useCallback(() => {
    const w = placeholderRef.current?.getBoundingClientRect().width;
    if (w != null) {
      setPopoverWidth(`${w}px`);
    }
  }, []);

  useResizeObserver({
    ref: placeholderRef,
    onResize: onResize,
    box: "border-box",
  });

  return (
    <MultiSelectComboboxContext.Provider
      value={{
        size,
        selectedKeys,
        selectedItems,
        onInputChange,
        onRemove,
        filterText: accessibleList.filterText,
        triggerDisplay,
        summarySupportingText,
        summaryMemberLabel,
      }}
    >
      <AriaComboBox
        allowsEmptyCollection
        menuTrigger="focus"
        items={accessibleList.items}
        onInputChange={onInputChange}
        inputValue={accessibleList.filterText}
        // This keeps the combobox popover open and the input value unchanged when an item is selected.
        selectedKey={null}
        onSelectionChange={onSelectionChange}
        {...props}
      >
        {(state) => (
          <MultiSelectSelectionContext.Provider value={selectedKeys}>
            <div className="flex flex-col gap-1.5">
              {props.label && (
                <Label isRequired={state.isRequired} tooltip={props.tooltip}>
                  {props.label}
                </Label>
              )}

              <MultiSelectTagsValue
                size={size}
                shortcut={shortcut && triggerDisplay !== "summary"}
                triggerDisplay={triggerDisplay}
                placeholderIcon={placeholderIcon}
                ref={placeholderRef}
                placeholder={placeholder}
                // This is a workaround to correctly calculating the trigger width
                // while using ResizeObserver wasn't 100% reliable.
                onFocus={onResize}
                onPointerEnter={onResize}
              />

              <Popover
                variant="stacked"
                size="md"
                triggerRef={placeholderRef}
                style={{ width: popoverWidth }}
                className={props?.popoverClassName}
              >
                <SelectContext.Provider value={{ size }}>
                  <MultiSelectListContext.Provider value={{ itemLayout: "checkbox" }}>
                    <AriaListBox
                      selectionMode="multiple"
                      aria-label={props.label}
                      className={LISTBOX_SCROLL_CLASS}
                    >
                      {children}
                    </AriaListBox>
                  </MultiSelectListContext.Provider>
                </SelectContext.Provider>
                {showPopoverFooter ? (
                  <MultiSelectPopoverFooter
                    items={items}
                    selectedItems={selectedItems}
                    onItemCleared={onItemCleared}
                    onItemInserted={onItemInserted}
                    clearFilter={() => accessibleList.setFilterText("")}
                  />
                ) : null}
              </Popover>

              {props.hint && <HintText isInvalid={state.isInvalid}>{props.hint}</HintText>}
            </div>
          </MultiSelectSelectionContext.Provider>
        )}
      </AriaComboBox>
    </MultiSelectComboboxContext.Provider>
  );
};

const INNER_INPUT_CLASS =
  "text-md text-primary! caret-alpha-black/90 placeholder:text-placeholder! disabled:text-disabled! disabled:placeholder:text-disabled! w-full min-w-0 flex-[1_0_0] appearance-none bg-transparent text-ellipsis outline-none focus:outline-hidden disabled:cursor-not-allowed";

const InnerMultiSelect = ({ isDisabled, shortcut, shortcutClassName, placeholder }: Omit<MultiSelectProps, "selectedItems" | "children">) => {
  const focusManager = useFocusManager();
  const comboBoxContext = useContext(MultiSelectComboboxContext);
  const comboBoxStateContext = useContext(ComboBoxStateContext);

  const triggerDisplay = comboBoxContext?.triggerDisplay ?? "tags";
  const filterText = comboBoxContext?.filterText ?? "";
  const summarySupportingText = comboBoxContext?.summarySupportingText;
  const summaryMemberLabel = comboBoxContext?.summaryMemberLabel ?? "users";
  const size = comboBoxContext?.size ?? "sm";

  const chevronClass = cx("pointer-events-none shrink-0 text-fg-quaternary", size === "sm" ? "size-4 stroke-[2.25px]" : "size-5");

  const caretAtStart = (el: HTMLInputElement) => el.selectionStart === 0 && el.selectionEnd === 0;

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const el = event.currentTarget;
    if (triggerDisplay === "summary" && event.key === "Backspace") {
      if (
        caretAtStart(el) &&
        el.value === "" &&
        (comboBoxContext?.selectedItems?.items?.length ?? 0) > 0
      ) {
        const items = comboBoxContext.selectedItems.items;
        const last = items[items.length - 1];
        if (!last) {
          return;
        }
        comboBoxContext.onRemove(new Set([last.id]));
        event.preventDefault();
        return;
      }
    }

    if (!caretAtStart(el) && el.value !== "") {
      return;
    }

    if (triggerDisplay === "summary") {
      return;
    }

    switch (event.key) {
      case "Backspace":
      case "ArrowLeft":
        focusManager?.focusPrevious({ wrap: false, tabbable: false });
        break;
      case "ArrowRight":
        focusManager?.focusNext({ wrap: false, tabbable: false });
        break;
    }
  };

  // Ensure dropdown opens on click even if input is already focused
  const handleInputMouseDown = (_event: MouseEvent<HTMLInputElement>) => {
    if (comboBoxStateContext && !comboBoxStateContext.isOpen) {
      comboBoxStateContext.open();
    }
  };

  const handleTagKeyDown = (event: KeyboardEvent<HTMLButtonElement>, value: Key) => {
    // Do nothing when tab is clicked to move focus from the tag to the input element.
    if (event.key === "Tab") {
      return;
    }

    event.preventDefault();

    const isFirstTag = comboBoxContext?.selectedItems?.items?.[0]?.id === value;

    switch (event.key) {
      case " ":
      case "Enter":
      case "Backspace":
        if (isFirstTag) {
          focusManager?.focusNext({ wrap: false, tabbable: false });
        } else {
          focusManager?.focusPrevious({ wrap: false, tabbable: false });
        }

        comboBoxContext.onRemove(new Set([value]));
        break;

      case "ArrowLeft":
        focusManager?.focusPrevious({ wrap: false, tabbable: false });
        break;
      case "ArrowRight":
        focusManager?.focusNext({ wrap: false, tabbable: false });
        break;
      case "Escape":
        comboBoxStateContext?.close();
        break;
    }
  };

  const isSelectionEmpty = comboBoxContext?.selectedItems?.items?.length === 0;
  const selectedCount = comboBoxContext?.selectedItems?.items?.length ?? 0;

  const shortcutOverlay =
    shortcut ? (
      <div
        aria-hidden="true"
        className={cx(
          "to-bg-primary absolute inset-y-0.5 right-0.5 z-30 flex items-center rounded-r-[inherit] bg-linear-to-r from-transparent to-40% pl-8",
          shortcutClassName
        )}
      >
        <span
          className={cx(
            "text-quaternary! ring-secondary pointer-events-none rounded px-1 py-px text-xs font-medium ring-1 select-none ring-inset",
            isDisabled && "text-disabled! bg-transparent"
          )}
        >
          ⌘K
        </span>
      </div>
    ) : null;

  if (triggerDisplay === "summary") {
    const showSummaryRow = filterText.length === 0 && selectedCount > 0;

    const memberTotal = sumMemberCountsForItems(comboBoxContext?.selectedItems?.items ?? []);
    const summarySecondary =
      memberTotal > 0 ? `${memberTotal} ${summaryMemberLabel}` : summarySupportingText ?? null;

    if (!showSummaryRow) {
      return (
        <div className="relative flex w-full flex-1 flex-row items-center gap-2">
          <AriaInput
            placeholder={placeholder}
            onKeyDown={handleInputKeyDown}
            onMouseDown={handleInputMouseDown}
            className={cx(INNER_INPUT_CLASS, "text-sm")}
          />
          <ChevronDown aria-hidden="true" className={chevronClass} />
          {shortcutOverlay}
        </div>
      );
    }

    return (
      <div className="relative flex w-full flex-1 items-center">
        <div className="pointer-events-none flex min-w-0 flex-1 items-center gap-x-1.5 truncate">
          <span className="text-sm font-medium text-primary!">
            {selectedCount} selected
          </span>
          {summarySecondary ? <span className="text-sm text-tertiary!">{summarySecondary}</span> : null}
        </div>
        <ChevronDown aria-hidden="true" className={cx(chevronClass, "relative z-20 ml-auto")} />
        <AriaInput
          onKeyDown={handleInputKeyDown}
          onMouseDown={handleInputMouseDown}
          className={cx("absolute inset-0 z-10 cursor-text opacity-0", INNER_INPUT_CLASS)}
        />
        {shortcutOverlay}
      </div>
    );
  }

  return (
    <div className="relative flex w-full flex-1 flex-row flex-wrap items-center justify-start gap-1.5">
      {!isSelectionEmpty &&
        comboBoxContext?.selectedItems?.items?.map((value) => (
          <span key={value.id} className="bg-primary ring-primary flex items-center rounded-md py-0.5 pr-1 pl-1.25 ring-1 ring-inset">
            <Avatar size="xxs" alt={value?.label} src={value?.avatarUrl} />

            <p className="text-secondary! ml-1.25 truncate text-sm font-medium whitespace-nowrap select-none">{value?.label}</p>

            <TagCloseX
              size="md"
              isDisabled={isDisabled}
              className="ml-0.75"
              // For workaround, onKeyDown is added to the button
              onKeyDown={(event) => handleTagKeyDown(event, value.id)}
              onPress={() => comboBoxContext.onRemove(new Set([value.id]))}
            />
          </span>
        ))}

      <div className={cx("relative flex min-w-[20%] flex-1 flex-row items-center", !isSelectionEmpty && "ml-0.5", shortcut && "min-w-[30%]")}>
        <AriaInput
          placeholder={placeholder}
          onKeyDown={handleInputKeyDown}
          onMouseDown={handleInputMouseDown}
          className={INNER_INPUT_CLASS}
        />

        {shortcutOverlay}
      </div>
    </div>
  );
};

export const MultiSelectTagsValue = ({
  size,
  shortcut,
  placeholder,
  shortcutClassName,
  placeholderIcon,
  triggerDisplay = "tags",
  // Omit this prop to avoid invalid HTML attribute warning
  isDisabled: _isDisabled,
  ...otherProps
}: ComboBoxValueProps) => {
  const Icon = placeholderIcon !== undefined ? placeholderIcon : triggerDisplay === "summary" ? null : SearchLg;

  return (
    <AriaGroup
      {...otherProps}
      className={({ isFocusWithin, isDisabled }) =>
        cx(
          "bg-primary ring-primary relative flex w-full items-center gap-2 rounded-lg shadow-xs ring-1 outline-hidden transition duration-100 ease-linear ring-inset",
          isDisabled && "bg-disabled_subtle cursor-not-allowed",
          isFocusWithin && "ring-brand ring-2",
          sizes[size].root
        )
      }
    >
      {({ isDisabled }) => (
        <>
          {Icon && <Icon className="text-fg-quaternary pointer-events-none size-5" />}
          <FocusScope contain={false} autoFocus={false} restoreFocus={false}>
            <InnerMultiSelect isDisabled={isDisabled} shortcut={shortcut} shortcutClassName={shortcutClassName} placeholder={placeholder} />
          </FocusScope>
        </>
      )}
    </AriaGroup>
  );
};

const MultiSelect = MultiSelectBase as typeof MultiSelectBase & {
  Item: typeof SelectItem;
};

MultiSelect.Item = SelectItem;

export { MultiSelect as MultiSelect };
