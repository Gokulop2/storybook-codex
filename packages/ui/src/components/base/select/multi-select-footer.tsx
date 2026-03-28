import type { Key } from "react-aria-components";
import type { ListData } from "react-stately";
import { Button } from "../buttons/button";
import type { SelectItemType } from "./select-shared";

export interface MultiSelectPopoverFooterProps {
  items?: SelectItemType[];
  selectedItems: ListData<SelectItemType>;
  onItemCleared?: (key: Key) => void;
  onItemInserted?: (key: Key) => void;
  clearFilter: () => void;
}

export function MultiSelectPopoverFooter({
  items,
  selectedItems,
  onItemCleared,
  onItemInserted,
  clearFilter,
}: MultiSelectPopoverFooterProps) {
  const handleReset = () => {
    for (const { id } of selectedItems.items) {
      selectedItems.remove(id);
      onItemCleared?.(id);
    }
    clearFilter();
  };

  const handleSelectAll = () => {
    if (!items?.length) {
      return;
    }
    const selectedIdSet = new Set(selectedItems.items.map((i) => i.id));
    for (const item of items) {
      if (item.isDisabled || selectedIdSet.has(item.id)) {
        continue;
      }
      selectedItems.append(item);
      onItemInserted?.(item.id);
    }
  };

  return (
    <div className="flex shrink-0 items-center justify-between border-t border-secondary p-3">
      <Button type="button" color="secondary" size="sm" onClick={handleReset}>
        Reset
      </Button>
      <Button type="button" color="secondary" size="sm" onClick={handleSelectAll}>
        Select all
      </Button>
    </div>
  );
}
