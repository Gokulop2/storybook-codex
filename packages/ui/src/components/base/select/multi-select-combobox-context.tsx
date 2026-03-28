import { createContext } from "react";
import type { Key } from "react-aria-components";
import type { ListData } from "react-stately";
import type { MultiSelectTriggerDisplay, SelectItemType } from "./select-shared";

export const MultiSelectComboboxContext = createContext<{
  size: "sm" | "md";
  selectedKeys: Key[];
  selectedItems: ListData<SelectItemType>;
  onRemove: (keys: Set<Key>) => void;
  onInputChange: (value: string) => void;
  filterText: string;
  triggerDisplay: MultiSelectTriggerDisplay;
  summarySupportingText?: string;
  summaryMemberLabel: string;
}>({
  size: "sm",
  selectedKeys: [],
  selectedItems: {} as ListData<SelectItemType>,
  onRemove: () => {},
  onInputChange: () => {},
  filterText: "",
  triggerDisplay: "tags",
  summarySupportingText: undefined,
  summaryMemberLabel: "users",
});
