"use client";

import type { ComponentPropsWithRef, HTMLAttributes, ReactNode, Ref, TdHTMLAttributes, ThHTMLAttributes } from "react";
import { createContext, isValidElement, useContext, useState } from "react";
import { ArrowDown, ChevronSelectorVertical, Copy01, Edit01, HelpCircle, Trash01 } from "@opus2-platform/icons";
import type {
  CellProps as AriaCellProps,
  CheckboxProps as AriaCheckboxProps,
  ColumnProps as AriaColumnProps,
  RowProps as AriaRowProps,
  TableHeaderProps as AriaTableHeaderProps,
  TableProps as AriaTableProps,
} from "react-aria-components";
import {
  Cell as AriaCell,
  Checkbox as AriaCheckbox,
  CheckboxContext,
  Collection as AriaCollection,
  Column as AriaColumn,
  Group as AriaGroup,
  Provider as AriaProvider,
  Row as AriaRow,
  Table as AriaTable,
  TableBody as AriaTableBody,
  TableHeader as AriaTableHeader,
  TableLayout,
  Virtualizer,
  useTableOptions,
} from "react-aria-components";
import { Badge } from "@/components/base/badges/badges";
import { Checkbox, CheckboxBase } from "@/components/base/checkbox/checkbox";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { cx } from "@/utils";

export const TableRowActionsDropdown = () => (
  <Dropdown.Root>
    <Dropdown.DotsButton />
    <Dropdown.Popover className="w-min">
      <Dropdown.Menu>
        <Dropdown.Item icon={Edit01}><span className="pr-4">Edit</span></Dropdown.Item>
        <Dropdown.Item icon={Copy01}><span className="pr-4">Copy link</span></Dropdown.Item>
        <Dropdown.Item icon={Trash01}><span className="pr-4">Delete</span></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown.Popover>
  </Dropdown.Root>
);

// ─── Context ─────────────────────────────────────────────────────────────────

interface TableContextValue {
  size: "sm" | "md";
  /** Signals that the whole table is in virtualized div-grid mode. */
  virtualized?: boolean;
  /**
   * CSS `grid-template-columns` shared between the header row and every data row.
   * When `selectionBehavior="toggle"` include the selection column first, e.g.
   * `"52px 1fr 80px 160px"`. Required when `virtualized=true`.
   */
  gridCols?: string;
  virtualSortDescriptor?: { column?: string; direction?: "ascending" | "descending" };
  virtualOnSortChange?: (col: string) => void;
  virtualOnRowAction?: (key: string) => void;
  virtualOnSelectAll?: () => void;
  virtualSelectionBehavior?: "toggle" | "replace";
}

const TableContext = createContext<TableContextValue>({ size: "md" });

// Separate context for selection state so only Table.Row re-renders on checkbox click,
// not Table.Head × 6 + Table.Cell × 90 + Table.Header.
interface VirtualSelectionContextValue {
  virtualSelectedKeys?: Set<string>;
  virtualDisabledKeys?: Set<string>;
  virtualOnSelectionChange?: (keys: Set<string>) => void;
}
const VirtualSelectionContext = createContext<VirtualSelectionContextValue>({});

// ─── Internal helpers ─────────────────────────────────────────────────────────

const TableSelectionCheckbox = ({ className, size = "md", ...props }: Omit<AriaCheckboxProps, "children"> & { size?: "sm" | "md" }) => (
  <AriaCheckbox
    {...props}
    className={(state) =>
      cx("flex items-start", !state.isDisabled && "cursor-pointer", state.isDisabled && "cursor-not-allowed",
        typeof className === "function" ? className(state) : className)
    }
  >
    {({ isSelected, isIndeterminate, isDisabled, isFocusVisible }) => (
      <CheckboxBase size={size} isSelected={isSelected} isIndeterminate={isIndeterminate} isDisabled={isDisabled} isFocusVisible={isFocusVisible} />
    )}
  </AriaCheckbox>
);

// ─── TableCard ────────────────────────────────────────────────────────────────

const TableCardRoot = ({ children, className, size = "md", ...props }: HTMLAttributes<HTMLDivElement> & { size?: "sm" | "md" }) => (
  <TableContext.Provider value={{ size }}>
    <div {...props} className={cx("overflow-hidden rounded-xl bg-primary shadow-xs ring-1 ring-secondary", className)}>
      {children}
    </div>
  </TableContext.Provider>
);

interface TableCardHeaderProps {
  title: string;
  badge?: ReactNode;
  description?: string;
  contentTrailing?: ReactNode;
  className?: string;
}

const TableCardHeader = ({ title, badge, description, contentTrailing, className }: TableCardHeaderProps) => {
  const { size } = useContext(TableContext);
  return (
    <div className={cx("relative flex flex-col items-start gap-4 border-b border-secondary bg-primary px-4 md:flex-row",
      size === "sm" ? "py-4 md:px-5" : "py-5 md:px-6", className)}>
      <div className="flex flex-1 flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <h2 className="text-md font-semibold text-primary">{title}</h2>
          {badge ? (isValidElement(badge) ? badge : <Badge color="gray" size="sm" type="modern">{badge}</Badge>) : null}
        </div>
        {description && <p className="text-sm text-tertiary">{description}</p>}
      </div>
      {contentTrailing}
    </div>
  );
};

// ─── Table (root) ─────────────────────────────────────────────────────────────

interface TableRootProps extends AriaTableProps, Omit<ComponentPropsWithRef<"table">, "className" | "slot" | "style"> {
  size?: "sm" | "md";
  /**
   * Enables virtual mode. The table renders as `<div role="grid">` + a windowed body,
   * so row re-renders on selection change are O(visible) instead of O(total).
   * Requires `gridCols`.
   */
  virtualized?: boolean;
  /**
   * CSS `grid-template-columns` shared by the header and every data row.
   * Include the selection column first when `selectionBehavior="toggle"`, e.g.
   * `"52px 1fr 80px 160px"`. Required when `virtualized=true`.
   */
  gridCols?: string;
  /**
   * Called when the select-all checkbox in the header is clicked (virtual mode only).
   * The caller is responsible for computing which IDs to select/deselect.
   */
  onSelectAll?: () => void;
}

const TableRoot = ({ className, size = "md", virtualized, gridCols, onSelectAll, ...props }: TableRootProps) => {
  const context = useContext(TableContext);

  if (virtualized) {
    // In virtual mode we bypass AriaTable (<table>) entirely.
    // A <div> inside <table> gets foster-parented out by browsers, breaking the
    // VirtualBodyScroller scroll container. Using <div role="grid"> avoids this.
    const {
      selectedKeys, disabledKeys, sortDescriptor, onSortChange, onRowAction,
      onSelectionChange, selectionBehavior = "toggle", "aria-label": ariaLabel, children,
    } = props as any;

    const handleSortChange = (col: string) => {
      if (!onSortChange) return;
      const cur = sortDescriptor as { column?: string; direction?: "ascending" | "descending" } | undefined;
      onSortChange({ column: col, direction: cur?.column === col && cur.direction === "ascending" ? "descending" : "ascending" });
    };

    return (
      <TableContext.Provider value={{
        size: context?.size ?? size,
        virtualized: true,
        gridCols,
        virtualSortDescriptor: sortDescriptor as any,
        virtualOnSortChange: handleSortChange,
        virtualOnRowAction: onRowAction as any,
        virtualOnSelectAll: onSelectAll,
        virtualSelectionBehavior: selectionBehavior as any,
      }}>
        {/* Selection state in a separate context so only Table.Row re-renders on click,
            not the 90+ Table.Cell/Table.Head components that don't need selection state. */}
        <VirtualSelectionContext.Provider value={{
          virtualSelectedKeys: selectedKeys as Set<string> | undefined,
          virtualDisabledKeys: disabledKeys as Set<string> | undefined,
          virtualOnSelectionChange: (keys: Set<string>) => onSelectionChange?.(keys as any),
        }}>
          <div
            role="grid"
            aria-label={ariaLabel as string | undefined}
            aria-multiselectable={props.selectionMode === "multiple" ? true : undefined}
            className={cx("flex flex-col overflow-x-auto", typeof className === "function" ? className({} as any) : className)}
          >
            {children as ReactNode}
          </div>
        </VirtualSelectionContext.Provider>
      </TableContext.Provider>
    );
  }

  // Standard (non-virtual) path — unchanged.
  return (
    <TableContext.Provider value={{ size: context?.size ?? size }}>
      <div className="overflow-x-auto">
        <AriaTable
          className={(state) => cx("w-full overflow-x-hidden", typeof className === "function" ? className(state) : className)}
          {...props}
        />
      </div>
    </TableContext.Provider>
  );
};
TableRoot.displayName = "Table";

// ─── TableHeader ──────────────────────────────────────────────────────────────

interface TableHeaderProps<T extends object>
  extends AriaTableHeaderProps<T>, Omit<ComponentPropsWithRef<"thead">, "children" | "className" | "slot" | "style"> {
  bordered?: boolean;
  size?: "sm" | "md";
}

const TableHeader = <T extends object>({ columns, children, bordered = true, className, size: sizeProp, ...props }: TableHeaderProps<T>) => {
  const context = useContext(TableContext);
  // ⚠ Always call hooks unconditionally. useTableOptions() returns null outside AriaTable.
  const { selectionBehavior = "none", selectionMode = "none" } = useTableOptions() ?? {};
  // Read selection count from VirtualSelectionContext (separate from TableContext so Table.Header
  // does NOT re-render on every checkbox click — only Table.Row needs to).
  const { virtualSelectedKeys } = useContext(VirtualSelectionContext);
  const size = sizeProp ?? context.size;

  if (context.virtualized) {
    const { virtualSelectionBehavior, virtualOnSelectAll, gridCols } = context;
    const hasSelections = (virtualSelectedKeys?.size ?? 0) > 0;

    return (
      <div
        role="rowgroup"
        className={cx("shrink-0 relative bg-secondary border-b border-secondary",
          size === "sm" ? "h-9" : "h-11",
          typeof className === "function" ? className({} as any) : className)}
      >
        <div role="row" className="grid h-full items-center" style={{ gridTemplateColumns: gridCols }}>
          {virtualSelectionBehavior === "toggle" && (
            <div role="columnheader" className="flex items-center justify-center h-full pl-4">
              {/* Using Checkbox (AriaCheckbox) gives role="checkbox" + aria-label for a11y. */}
              <Checkbox
                size="md"
                isSelected={false}
                isIndeterminate={hasSelections}
                onChange={virtualOnSelectAll}
                aria-label="select all"
              />
            </div>
          )}
          {children as ReactNode}
        </div>
      </div>
    );
  }

  // Standard path — unchanged.
  return (
    <AriaTableHeader
      {...props}
      className={(state) =>
        cx("relative bg-secondary", size === "sm" ? "h-9" : "h-11",
          bordered && "[&>tr>th]:after:pointer-events-none [&>tr>th]:after:absolute [&>tr>th]:after:inset-x-0 [&>tr>th]:after:bottom-0 [&>tr>th]:after:h-px [&>tr>th]:after:bg-border-secondary [&>tr>th]:focus-visible:after:bg-transparent",
          typeof className === "function" ? className(state) : className)
      }
    >
      {selectionBehavior === "toggle" && (
        <AriaColumn width={52} className={cx("relative py-2 pr-0 pl-4", size === "sm" ? "w-9 md:pl-5" : "w-11 md:pl-6")}>
          {selectionMode === "multiple" && (
            <div className="flex items-start">
              <TableSelectionCheckbox slot="selection" size="md" />
            </div>
          )}
        </AriaColumn>
      )}
      <AriaCollection items={columns}>{children}</AriaCollection>
    </AriaTableHeader>
  );
};
TableHeader.displayName = "TableHeader";

// ─── TableHead ────────────────────────────────────────────────────────────────

interface TableHeadProps extends AriaColumnProps, Omit<ThHTMLAttributes<HTMLTableCellElement>, "children" | "className" | "style" | "id"> {
  label?: string;
  tooltip?: string;
}

const TableHead = ({ className, tooltip, label, children, allowsSorting, ...props }: TableHeadProps) => {
  const context = useContext(TableContext);
  // ⚠ Always call hooks unconditionally.
  const { selectionBehavior = "none" } = useTableOptions() ?? {};

  if (context.virtualized) {
    const { virtualSortDescriptor, virtualOnSortChange } = context;
    const colId = props.id as string | undefined;
    const isSorted = Boolean(colId && virtualSortDescriptor?.column === colId);
    const sortDir = isSorted ? virtualSortDescriptor?.direction : undefined;

    return (
      <div
        role="columnheader"
        aria-sort={isSorted ? (sortDir === "ascending" ? "ascending" : "descending") : undefined}
        className={cx("relative px-6 py-2 flex items-center gap-1",
          allowsSorting && "cursor-pointer",
          typeof className === "function" ? className({} as any) : className)}
        onClick={allowsSorting && colId ? () => virtualOnSortChange?.(colId) : undefined}
      >
        {label && <span className="text-xs font-semibold whitespace-nowrap text-quaternary">{label}</span>}
        {allowsSorting && (sortDir
          ? <ArrowDown className={cx("size-3 stroke-[3px] text-fg-quaternary", sortDir === "ascending" && "rotate-180")} />
          : <ChevronSelectorVertical size={12} strokeWidth={3} className="text-fg-quaternary" />
        )}
        {tooltip && (
          <Tooltip title={tooltip} placement="top">
            <TooltipTrigger aria-label={tooltip} className="cursor-pointer text-fg-quaternary ml-1">
              <HelpCircle aria-hidden="true" className="size-4" />
            </TooltipTrigger>
          </Tooltip>
        )}
      </div>
    );
  }

  // Standard path — unchanged.
  return (
    <AriaColumn
      {...props}
      allowsSorting={allowsSorting}
      className={(state) =>
        cx("relative p-0 px-6 py-2 outline-hidden focus-visible:z-1 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-bg-primary focus-visible:ring-inset",
          selectionBehavior === "toggle" && "nth-2:pl-3",
          state.allowsSorting && "cursor-pointer",
          typeof className === "function" ? className(state) : className)
      }
    >
      {(state) => (
        <AriaGroup className="flex items-center gap-1">
          <AriaProvider values={[[CheckboxContext, null]]}>
            <div className="flex items-center gap-1">
              {label && <span className="text-xs font-semibold whitespace-nowrap text-quaternary">{label}</span>}
              {typeof children === "function" ? children(state) : children}
            </div>
          </AriaProvider>
          {tooltip && (
            <Tooltip title={tooltip} placement="top">
              <TooltipTrigger aria-label={tooltip} className="cursor-pointer text-fg-quaternary transition duration-100 ease-linear hover:text-fg-quaternary_hover focus:text-fg-quaternary_hover">
                <HelpCircle aria-hidden="true" className="size-4" />
              </TooltipTrigger>
            </Tooltip>
          )}
          {state.allowsSorting && (state.sortDirection
            ? <ArrowDown className={cx("size-3 stroke-[3px] text-fg-quaternary", state.sortDirection === "ascending" && "rotate-180")} />
            : <ChevronSelectorVertical size={12} strokeWidth={3} className="text-fg-quaternary" />
          )}
        </AriaGroup>
      )}
    </AriaColumn>
  );
};
TableHead.displayName = "TableHead";

// ─── TableRow ─────────────────────────────────────────────────────────────────

interface TableRowProps<T extends object>
  extends AriaRowProps<T>, Omit<ComponentPropsWithRef<"tr">, "children" | "className" | "onClick" | "slot" | "style" | "id"> {
  highlightSelectedRow?: boolean;
  size?: "sm" | "md";
}

const TableRow = <T extends object>({ columns, children, className, highlightSelectedRow = true, size: sizeProp, ...props }: TableRowProps<T>) => {
  const context = useContext(TableContext);
  // ⚠ Always call hooks unconditionally.
  const { selectionBehavior = "none" } = useTableOptions() ?? {};
  // Selection state from the isolated context — only Table.Row re-renders on checkbox click,
  // not the 90 Table.Cell or 6 Table.Head components that don't use selection state.
  const { virtualSelectedKeys, virtualDisabledKeys, virtualOnSelectionChange } = useContext(VirtualSelectionContext);
  const size = sizeProp ?? context.size;

  if (context.virtualized) {
    const { virtualSelectionBehavior, virtualOnRowAction, gridCols } = context;
    const rowId = props.id as string | undefined;
    const isSelected = Boolean(rowId && virtualSelectedKeys?.has(rowId));
    const isDisabled = Boolean(rowId && virtualDisabledKeys?.has(rowId));

    return (
      <div
        role="row"
        aria-selected={isSelected}
        aria-disabled={isDisabled || undefined}
        className={cx(
          "grid items-center border-b border-secondary transition-colors",
          size === "sm" ? "h-14" : "h-18",
          !isDisabled && "cursor-pointer hover:bg-secondary",
          isSelected && highlightSelectedRow && "bg-secondary",
          isDisabled && "opacity-50 cursor-not-allowed",
          typeof className === "function" ? className({} as any) : className,
        )}
        style={{ gridTemplateColumns: gridCols }}
        onClick={!isDisabled && virtualOnRowAction && rowId ? () => virtualOnRowAction(rowId) : undefined}
      >
        {virtualSelectionBehavior === "toggle" && (
          // stopPropagation so the checkbox click doesn't also fire onRowAction.
          // Checkbox (AriaCheckbox) gives role="checkbox" + aria-disabled for accessibility.
          <div role="gridcell" className="flex items-center justify-center h-full pl-4" onClick={(e) => e.stopPropagation()}>
            <Checkbox
              size="md"
              isSelected={isSelected}
              isDisabled={isDisabled}
              onChange={(checked) => {
                if (!isDisabled && rowId) {
                  const next = new Set(virtualSelectedKeys ?? []);
                  if (checked) next.add(rowId); else next.delete(rowId);
                  virtualOnSelectionChange?.(next);
                }
              }}
            />
          </div>
        )}
        {children as ReactNode}
      </div>
    );
  }

  // Standard path — unchanged.
  return (
    <AriaRow
      {...props}
      className={(state) =>
        cx("relative outline-hidden transition-colors after:pointer-events-none hover:bg-secondary focus-visible:outline-2 focus-visible:-outline-offset-2",
          size === "sm" ? "h-14" : "h-18",
          highlightSelectedRow && "selected:bg-secondary",
          "[&>td]:after:absolute [&>td]:after:inset-x-0 [&>td]:after:bottom-0 [&>td]:after:h-px [&>td]:after:w-full [&>td]:after:bg-border-secondary last:[&>td]:after:hidden focus-visible:[&>td]:after:opacity-0",
          typeof className === "function" ? className(state) : className)
      }
    >
      {selectionBehavior === "toggle" && (
        <AriaCell className={cx("relative py-2 pr-0 pl-4", size === "sm" ? "md:pl-5" : "md:pl-6")}>
          <div className="flex items-end">
            <TableSelectionCheckbox slot="selection" size="md" />
          </div>
        </AriaCell>
      )}
      <AriaCollection items={columns}>{children}</AriaCollection>
    </AriaRow>
  );
};
TableRow.displayName = "TableRow";

// ─── TableCell ────────────────────────────────────────────────────────────────

interface TableCellProps extends AriaCellProps, Omit<TdHTMLAttributes<HTMLTableCellElement>, "children" | "className" | "style" | "id"> {
  ref?: Ref<HTMLTableCellElement>;
  size?: "sm" | "md";
}

const TableCell = ({ className, children, size: sizeProp, ...props }: TableCellProps) => {
  const context = useContext(TableContext);
  // ⚠ Always call hooks unconditionally.
  const { selectionBehavior = "none" } = useTableOptions() ?? {};
  const size = sizeProp ?? context.size;

  if (context.virtualized) {
    return (
      <div
        role="gridcell"
        className={cx("relative text-sm text-tertiary min-w-0",
          size === "sm" && "px-5 py-3",
          size === "md" && "px-6 py-4",
          typeof className === "function" ? className({} as any) : className)}
      >
        {typeof children === "function" ? null : children}
      </div>
    );
  }

  // Standard path — unchanged.
  return (
    <AriaCell
      {...props}
      className={(state) =>
        cx("relative text-sm text-tertiary outline-hidden focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2",
          size === "sm" && "px-5 py-3",
          size === "md" && "px-6 py-4",
          selectionBehavior === "toggle" && "nth-2:pl-3",
          typeof className === "function" ? className(state) : className)
      }
    >
      {children}
    </AriaCell>
  );
};
TableCell.displayName = "TableCell";

// ─── TableBody ────────────────────────────────────────────────────────────────

interface TableBodyProps<T extends object = object> extends Omit<ComponentPropsWithRef<"tbody">, "children" | "className" | "slot" | "style"> {
  /** Array of row items. When `virtualized` is set on the parent Table and `containerHeight`
   *  is also provided, the body windows to only render visible rows. */
  items?: T[];
  /** Height of each row in pixels. Defaults to 56 (sm) or 72 (md) from context. */
  rowHeight?: number;
  /**
   * Height of the scrollable body in pixels. Required for virtualized windowing.
   * Typically measured with ResizeObserver on the container minus the header height.
   */
  containerHeight?: number;
  gap?: number;
  padding?: number;
  children?: ((item: T) => ReactNode) | ReactNode;
  className?: string | ((state: any) => string);
}

const OVERSCAN = 5;

const TableBodyComponent = <T extends object = object>({
  items,
  rowHeight: rowHeightProp,
  containerHeight,
  gap = 0,
  padding = 0,
  children,
  className,
  ...props
}: TableBodyProps<T>) => {
  const context = useContext(TableContext);
  const baseRowHeight = context.size === "sm" ? 56 : 72;
  const rowHeight = rowHeightProp ?? baseRowHeight;

  // Virtual mode + items + containerHeight → use the windowed scroller.
  if (context.virtualized && items && containerHeight && typeof children === "function") {
    return (
      <VirtualBodyScroller
        items={items}
        rowHeight={rowHeight}
        containerHeight={containerHeight}
        renderRow={children as (item: T) => ReactNode}
        className={typeof className === "function" ? className({} as any) : className}
      />
    );
  }

  // Non-virtual with items → existing Virtualizer + AriaTableBody (unchanged).
  if (items && items.length > 0) {
    return (
      <Virtualizer layout={TableLayout} layoutOptions={{ rowHeight, headingHeight: 0, padding, gap }}>
        <AriaTableBody
          {...props}
          items={items}
          className={(state) => cx(typeof className === "function" ? className(state) : className)}
          style={{ height: containerHeight, overflowY: "auto" }}
        >
          {(item) => (typeof children === "function" ? children(item as T) : null)}
        </AriaTableBody>
      </Virtualizer>
    );
  }

  // Static children (no items).
  return (
    <AriaTableBody {...props} className={(state) => cx(typeof className === "function" ? className(state) : className)}>
      {children}
    </AriaTableBody>
  );
};
TableBodyComponent.displayName = "TableBody";

// ─── VirtualBodyScroller ──────────────────────────────────────────────────────

/**
 * Renders only the rows visible in the scroll viewport.
 * Uses the exact same layout pattern as react-window's FixedSizeList:
 *   - outer: position:relative, overflow:auto, fixed height
 *   - spacer: full total height so the scrollbar reflects the real list length
 *   - each row: position:absolute, explicit top/height/width so the browser
 *     never has to infer width through nested layout contexts.
 */
function VirtualBodyScroller<T>({
  items,
  rowHeight,
  containerHeight,
  renderRow,
  className,
}: {
  items: T[];
  rowHeight: number;
  containerHeight: number;
  renderRow: (item: T) => ReactNode;
  className?: string;
}) {
  const [scrollTop, setScrollTop] = useState(0);

  const visStart = Math.max(0, Math.floor(scrollTop / rowHeight) - OVERSCAN);
  const visEnd   = Math.min(items.length, Math.ceil((scrollTop + containerHeight) / rowHeight) + OVERSCAN);
  const visible  = items.slice(visStart, visEnd);
  const totalH   = items.length * rowHeight;

  return (
    <div
      role="rowgroup"
      className={cx(className)}
      style={{
        position: "relative",
        overflow: "auto",
        height: containerHeight,
        width: "100%",
        willChange: "transform",
      }}
      onScroll={(e) => setScrollTop((e.currentTarget as HTMLDivElement).scrollTop)}
    >
      {/* Full-height inner div gives the scrollbar the correct proportions. */}
      <div style={{ height: totalH, width: "100%" }}>
        {visible.map((item, i) => (
          <div
            key={visStart + i}
            style={{
              position: "absolute",
              top: (visStart + i) * rowHeight,
              left: 0,
              width: "100%",
              height: rowHeight,
            }}
          >
            {renderRow(item)}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Exports ──────────────────────────────────────────────────────────────────

const TableCard = { Root: TableCardRoot, Header: TableCardHeader };

const Table = TableRoot as typeof TableRoot & {
  Body:   typeof TableBodyComponent;
  Cell:   typeof TableCell;
  Head:   typeof TableHead;
  Header: typeof TableHeader;
  Row:    typeof TableRow;
};
Table.Body   = TableBodyComponent;
Table.Cell   = TableCell;
Table.Head   = TableHead;
Table.Header = TableHeader;
Table.Row    = TableRow;

export { Table, TableCard };
