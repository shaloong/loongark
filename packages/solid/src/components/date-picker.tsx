
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticDatePickerStyles } from "@loongark/primitives/automatic-styles/date-picker";
/**
 * Date Picker component - Solid wrapper.
 * Injects data-scope/data-part and size mapping.
 */
import {
  type Component,
  type JSX,
  mergeProps,
  createContext,
  useContext,
} from "solid-js";
import {
  DatePicker as ArkDatePicker,
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
} from "@ark-ui/solid/date-picker";
import {
  datePickerPositionerStyle,
  type DatePickerSize,
} from "@loongark/primitives";

const DatePickerContext = createContext<{ size: DatePickerSize }>({
  size: "md",
});

export interface LoongArkDatePickerRootProps extends Omit<
  ArkDatePickerRootProps,
  "asChild"
> {
  size?: DatePickerSize;
  children?: JSX.Element;
}

export const LoongArkDatePickerRoot: Component<LoongArkDatePickerRootProps> = /*#__PURE__*/ withAutomaticStyles((
  props,
) => {
  const merged = mergeProps({ size: "md" as DatePickerSize }, props);
  return (
    <DatePickerContext.Provider value={{ size: merged.size }}>
      <ArkDatePicker.Root
        {...props}
        data-scope="date-picker"
        data-part="root"
        data-size={merged.size}
      >
        {props.children}
      </ArkDatePicker.Root>
    </DatePickerContext.Provider>
  );
}, lkAutomaticDatePickerStyles);

export const LoongArkDatePickerLabel: Component<
  ArkDatePickerLabelProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkDatePicker.Label {...props} data-scope="date-picker" data-part="label">
      {props.children}
    </ArkDatePicker.Label>
  );
}, lkAutomaticDatePickerStyles);

export const LoongArkDatePickerControl: Component<
  ArkDatePickerControlProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkDatePicker.Control
      {...props}
      data-scope="date-picker"
      data-part="control"
    >
      {props.children}
    </ArkDatePicker.Control>
  );
}, lkAutomaticDatePickerStyles);

export const LoongArkDatePickerInput: Component<
  ArkDatePickerInputProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkDatePicker.Input {...props} data-scope="date-picker" data-part="input">
      {props.children}
    </ArkDatePicker.Input>
  );
}, lkAutomaticDatePickerStyles);

export const LoongArkDatePickerTrigger: Component<
  ArkDatePickerTriggerProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkDatePicker.Trigger
      {...props}
      data-scope="date-picker"
      data-part="trigger"
    >
      {props.children}
    </ArkDatePicker.Trigger>
  );
}, lkAutomaticDatePickerStyles);

export const LoongArkDatePickerClearTrigger: Component<
  ArkDatePickerClearTriggerProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkDatePicker.ClearTrigger
      {...props}
      data-scope="date-picker"
      data-part="clear-trigger"
    >
      {props.children}
    </ArkDatePicker.ClearTrigger>
  );
}, lkAutomaticDatePickerStyles);

export const LoongArkDatePickerPositioner: Component<
  ArkDatePickerPositionerProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkDatePicker.Positioner
      {...props}
      data-scope="date-picker"
      data-part="positioner"
      style={
        typeof props.style === "string"
          ? `${Object.entries(datePickerPositionerStyle(props.style))
              .map(([key, value]) => `${key}:${value}`)
              .join(";")};${props.style}`
          : { ...datePickerPositionerStyle(props.style), ...props.style }
      }
    >
      {props.children}
    </ArkDatePicker.Positioner>
  );
}, lkAutomaticDatePickerStyles);

export const LoongArkDatePickerContent: Component<
  ArkDatePickerContentProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const { size } = useContext(DatePickerContext);
  return (
    <ArkDatePicker.Content
      {...props}
      data-scope="date-picker"
      data-part="content"
      data-size={size}
    >
      {props.children}
    </ArkDatePicker.Content>
  );
}, lkAutomaticDatePickerStyles);

export const LoongArkDatePickerView: Component<
  ArkDatePickerViewProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkDatePicker.View {...props} data-scope="date-picker" data-part="view">
      {props.children}
    </ArkDatePicker.View>
  );
}, lkAutomaticDatePickerStyles);

export const LoongArkDatePickerViewControl: Component<
  ArkDatePickerViewControlProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkDatePicker.ViewControl
      {...props}
      data-scope="date-picker"
      data-part="view-control"
    >
      {props.children}
    </ArkDatePicker.ViewControl>
  );
}, lkAutomaticDatePickerStyles);

export const LoongArkDatePickerViewTrigger: Component<
  ArkDatePickerViewTriggerProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkDatePicker.ViewTrigger
      {...props}
      data-scope="date-picker"
      data-part="view-trigger"
    >
      {props.children}
    </ArkDatePicker.ViewTrigger>
  );
}, lkAutomaticDatePickerStyles);

export const LoongArkDatePickerPrevTrigger: Component<
  ArkDatePickerPrevTriggerProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkDatePicker.PrevTrigger
      {...props}
      data-scope="date-picker"
      data-part="prev-trigger"
    >
      {props.children}
    </ArkDatePicker.PrevTrigger>
  );
}, lkAutomaticDatePickerStyles);

export const LoongArkDatePickerNextTrigger: Component<
  ArkDatePickerNextTriggerProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkDatePicker.NextTrigger
      {...props}
      data-scope="date-picker"
      data-part="next-trigger"
    >
      {props.children}
    </ArkDatePicker.NextTrigger>
  );
}, lkAutomaticDatePickerStyles);

export const LoongArkDatePickerMonthSelect: Component<
  ArkDatePickerMonthSelectProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkDatePicker.MonthSelect
      {...props}
      data-scope="date-picker"
      data-part="month-select"
    >
      {props.children}
    </ArkDatePicker.MonthSelect>
  );
}, lkAutomaticDatePickerStyles);

export const LoongArkDatePickerYearSelect: Component<
  ArkDatePickerYearSelectProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkDatePicker.YearSelect
      {...props}
      data-scope="date-picker"
      data-part="year-select"
    >
      {props.children}
    </ArkDatePicker.YearSelect>
  );
}, lkAutomaticDatePickerStyles);

export const LoongArkDatePickerRangeText: Component<
  ArkDatePickerRangeTextProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkDatePicker.RangeText
      {...props}
      data-scope="date-picker"
      data-part="range-text"
    >
      {props.children}
    </ArkDatePicker.RangeText>
  );
}, lkAutomaticDatePickerStyles);

export const LoongArkDatePickerPresetTrigger: Component<
  ArkDatePickerPresetTriggerProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkDatePicker.PresetTrigger
      {...props}
      data-scope="date-picker"
      data-part="preset-trigger"
    >
      {props.children}
    </ArkDatePicker.PresetTrigger>
  );
}, lkAutomaticDatePickerStyles);

export const LoongArkDatePickerTable: Component<
  ArkDatePickerTableProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkDatePicker.Table {...props} data-scope="date-picker" data-part="table">
      {props.children}
    </ArkDatePicker.Table>
  );
}, lkAutomaticDatePickerStyles);

export const LoongArkDatePickerTableHead: Component<
  ArkDatePickerTableHeadProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkDatePicker.TableHead
      {...props}
      data-scope="date-picker"
      data-part="table-head"
    >
      {props.children}
    </ArkDatePicker.TableHead>
  );
}, lkAutomaticDatePickerStyles);

export const LoongArkDatePickerTableBody: Component<
  ArkDatePickerTableBodyProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkDatePicker.TableBody
      {...props}
      data-scope="date-picker"
      data-part="table-body"
    >
      {props.children}
    </ArkDatePicker.TableBody>
  );
}, lkAutomaticDatePickerStyles);

export const LoongArkDatePickerTableRow: Component<
  ArkDatePickerTableRowProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkDatePicker.TableRow
      {...props}
      data-scope="date-picker"
      data-part="table-row"
    >
      {props.children}
    </ArkDatePicker.TableRow>
  );
}, lkAutomaticDatePickerStyles);

export const LoongArkDatePickerTableHeader: Component<
  ArkDatePickerTableHeaderProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkDatePicker.TableHeader
      {...props}
      data-scope="date-picker"
      data-part="table-header"
    >
      {props.children}
    </ArkDatePicker.TableHeader>
  );
}, lkAutomaticDatePickerStyles);

export const LoongArkDatePickerTableCell: Component<
  ArkDatePickerTableCellProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkDatePicker.TableCell
      {...props}
      data-scope="date-picker"
      data-part="table-cell"
    >
      {props.children}
    </ArkDatePicker.TableCell>
  );
}, lkAutomaticDatePickerStyles);

export const LoongArkDatePickerTableCellTrigger: Component<
  ArkDatePickerTableCellTriggerProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkDatePicker.TableCellTrigger
      {...props}
      data-scope="date-picker"
      data-part="table-cell-trigger"
    >
      {props.children}
    </ArkDatePicker.TableCellTrigger>
  );
}, lkAutomaticDatePickerStyles);
