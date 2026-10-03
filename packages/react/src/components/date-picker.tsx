/**
 * Date Picker component - React wrapper.
 * Injects data-scope/data-part and size mapping.
 */
import React, {
  forwardRef,
  createContext,
  useContext,
  createElement,
  type ReactNode,
  type FC,
} from "react";
import {
  DatePicker,
  type DatePickerRootProps as ArkDatePickerRootProps,
  type DatePickerLabelProps as ArkDatePickerLabelProps,
  type DatePickerControlProps as ArkDatePickerControlProps,
  type DatePickerInputProps as ArkDatePickerInputProps,
  type DatePickerTriggerProps as ArkDatePickerTriggerProps,
  type DatePickerClearTriggerProps as ArkDatePickerClearTriggerProps,
  type DatePickerPositionerProps as ArkDatePickerPositionerProps,
  type DatePickerContentProps as ArkDatePickerContentProps,
  type DatePickerViewProps as ArkDatePickerViewProps,
  type DatePickerViewControlProps as ArkDatePickerViewControlProps,
  type DatePickerViewTriggerProps as ArkDatePickerViewTriggerProps,
  type DatePickerPrevTriggerProps as ArkDatePickerPrevTriggerProps,
  type DatePickerNextTriggerProps as ArkDatePickerNextTriggerProps,
  type DatePickerMonthSelectProps as ArkDatePickerMonthSelectProps,
  type DatePickerYearSelectProps as ArkDatePickerYearSelectProps,
  type DatePickerRangeTextProps as ArkDatePickerRangeTextProps,
  type DatePickerPresetTriggerProps as ArkDatePickerPresetTriggerProps,
  type DatePickerTableProps as ArkDatePickerTableProps,
  type DatePickerTableHeadProps as ArkDatePickerTableHeadProps,
  type DatePickerTableBodyProps as ArkDatePickerTableBodyProps,
  type DatePickerTableRowProps as ArkDatePickerTableRowProps,
  type DatePickerTableHeaderProps as ArkDatePickerTableHeaderProps,
  type DatePickerTableCellProps as ArkDatePickerTableCellProps,
  type DatePickerTableCellTriggerProps as ArkDatePickerTableCellTriggerProps,
} from "@ark-ui/react/date-picker";
import type { DatePickerSize } from "@loongark/primitives";
import { Portal as ArkPortal } from "./portal";

const SafePortal: FC<{ children?: ReactNode }> = ({ children }) =>
  createElement(ArkPortal, null, children);

const DatePickerSizeContext = createContext<{ size: DatePickerSize }>({
  size: "md",
});

export interface LoongArkDatePickerRootProps extends Omit<
  ArkDatePickerRootProps,
  "asChild"
> {
  size?: DatePickerSize;
  children?: ReactNode;
}

export const LoongArkDatePickerRoot = forwardRef<
  HTMLDivElement,
  LoongArkDatePickerRootProps
>(({ size = "md", children, ...props }, ref) => {
  return (
    <DatePickerSizeContext.Provider value={{ size }}>
      <DatePicker.Root
        {...props}
        ref={ref}
        data-scope="date-picker"
        data-part="root"
        data-size={size}
      >
        {children}
      </DatePicker.Root>
    </DatePickerSizeContext.Provider>
  );
});

LoongArkDatePickerRoot.displayName = "LoongArkDatePickerRoot";

export const LoongArkDatePickerLabel = forwardRef<
  HTMLLabelElement,
  ArkDatePickerLabelProps
>((props, ref) => {
  return (
    <DatePicker.Label
      {...props}
      ref={ref}
      data-scope="date-picker"
      data-part="label"
    />
  );
});

LoongArkDatePickerLabel.displayName = "LoongArkDatePickerLabel";

export const LoongArkDatePickerControl = forwardRef<
  HTMLDivElement,
  ArkDatePickerControlProps
>((props, ref) => {
  return (
    <DatePicker.Control
      {...props}
      ref={ref}
      data-scope="date-picker"
      data-part="control"
    />
  );
});

LoongArkDatePickerControl.displayName = "LoongArkDatePickerControl";

export const LoongArkDatePickerInput = forwardRef<
  HTMLInputElement,
  ArkDatePickerInputProps
>((props, ref) => {
  return (
    <DatePicker.Input
      {...props}
      ref={ref}
      data-scope="date-picker"
      data-part="input"
    />
  );
});

LoongArkDatePickerInput.displayName = "LoongArkDatePickerInput";

export const LoongArkDatePickerTrigger = forwardRef<
  HTMLButtonElement,
  ArkDatePickerTriggerProps
>((props, ref) => {
  return (
    <DatePicker.Trigger
      {...props}
      ref={ref}
      data-scope="date-picker"
      data-part="trigger"
    />
  );
});

LoongArkDatePickerTrigger.displayName = "LoongArkDatePickerTrigger";

export const LoongArkDatePickerClearTrigger = forwardRef<
  HTMLButtonElement,
  ArkDatePickerClearTriggerProps
>((props, ref) => {
  return (
    <DatePicker.ClearTrigger
      {...props}
      ref={ref}
      data-scope="date-picker"
      data-part="clear-trigger"
    />
  );
});

LoongArkDatePickerClearTrigger.displayName = "LoongArkDatePickerClearTrigger";

export const LoongArkDatePickerPositioner = forwardRef<
  HTMLDivElement,
  ArkDatePickerPositionerProps
>((props, ref) => {
  return (
    <SafePortal>
      <DatePicker.Positioner
        {...props}
        ref={ref}
        data-scope="date-picker"
        data-part="positioner"
      />
    </SafePortal>
  );
});

LoongArkDatePickerPositioner.displayName = "LoongArkDatePickerPositioner";

export const LoongArkDatePickerContent = forwardRef<
  HTMLDivElement,
  ArkDatePickerContentProps
>((props, ref) => {
  const { size } = useContext(DatePickerSizeContext);
  return (
    <DatePicker.Content
      {...props}
      ref={ref}
      data-scope="date-picker"
      data-part="content"
      data-size={size}
    />
  );
});

LoongArkDatePickerContent.displayName = "LoongArkDatePickerContent";

export const LoongArkDatePickerView = forwardRef<
  HTMLDivElement,
  ArkDatePickerViewProps
>((props, ref) => {
  return (
    <DatePicker.View
      {...props}
      ref={ref}
      data-scope="date-picker"
      data-part="view"
    />
  );
});

LoongArkDatePickerView.displayName = "LoongArkDatePickerView";

export const LoongArkDatePickerViewControl = forwardRef<
  HTMLDivElement,
  ArkDatePickerViewControlProps
>((props, ref) => {
  return (
    <DatePicker.ViewControl
      {...props}
      ref={ref}
      data-scope="date-picker"
      data-part="view-control"
    />
  );
});

LoongArkDatePickerViewControl.displayName = "LoongArkDatePickerViewControl";

export const LoongArkDatePickerViewTrigger = forwardRef<
  HTMLButtonElement,
  ArkDatePickerViewTriggerProps
>((props, ref) => {
  return (
    <DatePicker.ViewTrigger
      {...props}
      ref={ref}
      data-scope="date-picker"
      data-part="view-trigger"
    />
  );
});

LoongArkDatePickerViewTrigger.displayName = "LoongArkDatePickerViewTrigger";

export const LoongArkDatePickerPrevTrigger = forwardRef<
  HTMLButtonElement,
  ArkDatePickerPrevTriggerProps
>((props, ref) => {
  return (
    <DatePicker.PrevTrigger
      {...props}
      ref={ref}
      data-scope="date-picker"
      data-part="prev-trigger"
    />
  );
});

LoongArkDatePickerPrevTrigger.displayName = "LoongArkDatePickerPrevTrigger";

export const LoongArkDatePickerNextTrigger = forwardRef<
  HTMLButtonElement,
  ArkDatePickerNextTriggerProps
>((props, ref) => {
  return (
    <DatePicker.NextTrigger
      {...props}
      ref={ref}
      data-scope="date-picker"
      data-part="next-trigger"
    />
  );
});

LoongArkDatePickerNextTrigger.displayName = "LoongArkDatePickerNextTrigger";

export const LoongArkDatePickerMonthSelect = forwardRef<
  HTMLSelectElement,
  ArkDatePickerMonthSelectProps
>((props, ref) => {
  return (
    <DatePicker.MonthSelect
      {...props}
      ref={ref}
      data-scope="date-picker"
      data-part="month-select"
    />
  );
});

LoongArkDatePickerMonthSelect.displayName = "LoongArkDatePickerMonthSelect";

export const LoongArkDatePickerYearSelect = forwardRef<
  HTMLSelectElement,
  ArkDatePickerYearSelectProps
>((props, ref) => {
  return (
    <DatePicker.YearSelect
      {...props}
      ref={ref}
      data-scope="date-picker"
      data-part="year-select"
    />
  );
});

LoongArkDatePickerYearSelect.displayName = "LoongArkDatePickerYearSelect";

export const LoongArkDatePickerRangeText = forwardRef<
  HTMLDivElement,
  ArkDatePickerRangeTextProps
>((props, ref) => {
  return (
    <DatePicker.RangeText
      {...props}
      ref={ref}
      data-scope="date-picker"
      data-part="range-text"
    />
  );
});

LoongArkDatePickerRangeText.displayName = "LoongArkDatePickerRangeText";

export const LoongArkDatePickerPresetTrigger = forwardRef<
  HTMLButtonElement,
  ArkDatePickerPresetTriggerProps
>((props, ref) => {
  return (
    <DatePicker.PresetTrigger
      {...props}
      ref={ref}
      data-scope="date-picker"
      data-part="preset-trigger"
    />
  );
});

LoongArkDatePickerPresetTrigger.displayName = "LoongArkDatePickerPresetTrigger";

export const LoongArkDatePickerTable = forwardRef<
  HTMLTableElement,
  ArkDatePickerTableProps
>((props, ref) => {
  return (
    <DatePicker.Table
      {...props}
      ref={ref}
      data-scope="date-picker"
      data-part="table"
    />
  );
});

LoongArkDatePickerTable.displayName = "LoongArkDatePickerTable";

export const LoongArkDatePickerTableHead = forwardRef<
  HTMLTableSectionElement,
  ArkDatePickerTableHeadProps
>((props, ref) => {
  return (
    <DatePicker.TableHead
      {...props}
      ref={ref}
      data-scope="date-picker"
      data-part="table-head"
    />
  );
});

LoongArkDatePickerTableHead.displayName = "LoongArkDatePickerTableHead";

export const LoongArkDatePickerTableBody = forwardRef<
  HTMLTableSectionElement,
  ArkDatePickerTableBodyProps
>((props, ref) => {
  return (
    <DatePicker.TableBody
      {...props}
      ref={ref}
      data-scope="date-picker"
      data-part="table-body"
    />
  );
});

LoongArkDatePickerTableBody.displayName = "LoongArkDatePickerTableBody";

export const LoongArkDatePickerTableRow = forwardRef<
  HTMLTableRowElement,
  ArkDatePickerTableRowProps
>((props, ref) => {
  return (
    <DatePicker.TableRow
      {...props}
      ref={ref}
      data-scope="date-picker"
      data-part="table-row"
    />
  );
});

LoongArkDatePickerTableRow.displayName = "LoongArkDatePickerTableRow";

export const LoongArkDatePickerTableHeader = forwardRef<
  HTMLTableCellElement,
  ArkDatePickerTableHeaderProps
>((props, ref) => {
  return (
    <DatePicker.TableHeader
      {...props}
      ref={ref}
      data-scope="date-picker"
      data-part="table-header"
    />
  );
});

LoongArkDatePickerTableHeader.displayName = "LoongArkDatePickerTableHeader";

export const LoongArkDatePickerTableCell = forwardRef<
  HTMLTableCellElement,
  ArkDatePickerTableCellProps
>((props, ref) => {
  return (
    <DatePicker.TableCell
      {...props}
      ref={ref}
      data-scope="date-picker"
      data-part="table-cell"
    />
  );
});

LoongArkDatePickerTableCell.displayName = "LoongArkDatePickerTableCell";

export const LoongArkDatePickerTableCellTrigger = forwardRef<
  HTMLDivElement,
  ArkDatePickerTableCellTriggerProps
>((props, ref) => {
  return (
    <DatePicker.TableCellTrigger
      {...props}
      ref={ref}
      data-scope="date-picker"
      data-part="table-cell-trigger"
    />
  );
});

LoongArkDatePickerTableCellTrigger.displayName =
  "LoongArkDatePickerTableCellTrigger";
