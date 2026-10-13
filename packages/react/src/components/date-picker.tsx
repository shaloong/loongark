"use client";
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticDatePickerStyles } from "@loongark/primitives/automatic-styles/date-picker";


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
import {
  datePickerPositionerStyle,
  type DatePickerSize,
} from "@loongark/primitives";
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

export const LoongArkDatePickerRoot = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticDatePickerStyles);

LoongArkDatePickerRoot.displayName = "LoongArkDatePickerRoot";

export const LoongArkDatePickerLabel = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticDatePickerStyles);

LoongArkDatePickerLabel.displayName = "LoongArkDatePickerLabel";

export const LoongArkDatePickerControl = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticDatePickerStyles);

LoongArkDatePickerControl.displayName = "LoongArkDatePickerControl";

export const LoongArkDatePickerInput = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticDatePickerStyles);

LoongArkDatePickerInput.displayName = "LoongArkDatePickerInput";

export const LoongArkDatePickerTrigger = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticDatePickerStyles);

LoongArkDatePickerTrigger.displayName = "LoongArkDatePickerTrigger";

export const LoongArkDatePickerClearTrigger = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticDatePickerStyles);

LoongArkDatePickerClearTrigger.displayName = "LoongArkDatePickerClearTrigger";

export const LoongArkDatePickerPositioner = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkDatePickerPositionerProps
>((props, ref) => {
  return (
    <SafePortal>
      <DatePicker.Positioner
        {...props}
        ref={ref}
        style={{ ...datePickerPositionerStyle(props.style), ...props.style }}
        data-scope="date-picker"
        data-part="positioner"
      />
    </SafePortal>
  );
}), lkAutomaticDatePickerStyles);

LoongArkDatePickerPositioner.displayName = "LoongArkDatePickerPositioner";

export const LoongArkDatePickerContent = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticDatePickerStyles);

LoongArkDatePickerContent.displayName = "LoongArkDatePickerContent";

export const LoongArkDatePickerView = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticDatePickerStyles);

LoongArkDatePickerView.displayName = "LoongArkDatePickerView";

export const LoongArkDatePickerViewControl = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticDatePickerStyles);

LoongArkDatePickerViewControl.displayName = "LoongArkDatePickerViewControl";

export const LoongArkDatePickerViewTrigger = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticDatePickerStyles);

LoongArkDatePickerViewTrigger.displayName = "LoongArkDatePickerViewTrigger";

export const LoongArkDatePickerPrevTrigger = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticDatePickerStyles);

LoongArkDatePickerPrevTrigger.displayName = "LoongArkDatePickerPrevTrigger";

export const LoongArkDatePickerNextTrigger = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticDatePickerStyles);

LoongArkDatePickerNextTrigger.displayName = "LoongArkDatePickerNextTrigger";

export const LoongArkDatePickerMonthSelect = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticDatePickerStyles);

LoongArkDatePickerMonthSelect.displayName = "LoongArkDatePickerMonthSelect";

export const LoongArkDatePickerYearSelect = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticDatePickerStyles);

LoongArkDatePickerYearSelect.displayName = "LoongArkDatePickerYearSelect";

export const LoongArkDatePickerRangeText = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticDatePickerStyles);

LoongArkDatePickerRangeText.displayName = "LoongArkDatePickerRangeText";

export const LoongArkDatePickerPresetTrigger = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticDatePickerStyles);

LoongArkDatePickerPresetTrigger.displayName = "LoongArkDatePickerPresetTrigger";

export const LoongArkDatePickerTable = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticDatePickerStyles);

LoongArkDatePickerTable.displayName = "LoongArkDatePickerTable";

export const LoongArkDatePickerTableHead = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticDatePickerStyles);

LoongArkDatePickerTableHead.displayName = "LoongArkDatePickerTableHead";

export const LoongArkDatePickerTableBody = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticDatePickerStyles);

LoongArkDatePickerTableBody.displayName = "LoongArkDatePickerTableBody";

export const LoongArkDatePickerTableRow = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticDatePickerStyles);

LoongArkDatePickerTableRow.displayName = "LoongArkDatePickerTableRow";

export const LoongArkDatePickerTableHeader = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticDatePickerStyles);

LoongArkDatePickerTableHeader.displayName = "LoongArkDatePickerTableHeader";

export const LoongArkDatePickerTableCell = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticDatePickerStyles);

LoongArkDatePickerTableCell.displayName = "LoongArkDatePickerTableCell";

export const LoongArkDatePickerTableCellTrigger = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticDatePickerStyles);

LoongArkDatePickerTableCellTrigger.displayName =
  "LoongArkDatePickerTableCellTrigger";
