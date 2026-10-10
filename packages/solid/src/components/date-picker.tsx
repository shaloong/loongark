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

export const LoongArkDatePickerRoot: Component<LoongArkDatePickerRootProps> = (
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
};

export const LoongArkDatePickerLabel: Component<
  ArkDatePickerLabelProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkDatePicker.Label {...props} data-scope="date-picker" data-part="label">
      {props.children}
    </ArkDatePicker.Label>
  );
};

export const LoongArkDatePickerControl: Component<
  ArkDatePickerControlProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkDatePicker.Control
      {...props}
      data-scope="date-picker"
      data-part="control"
    >
      {props.children}
    </ArkDatePicker.Control>
  );
};

export const LoongArkDatePickerInput: Component<
  ArkDatePickerInputProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkDatePicker.Input {...props} data-scope="date-picker" data-part="input">
      {props.children}
    </ArkDatePicker.Input>
  );
};

export const LoongArkDatePickerTrigger: Component<
  ArkDatePickerTriggerProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkDatePicker.Trigger
      {...props}
      data-scope="date-picker"
      data-part="trigger"
    >
      {props.children}
    </ArkDatePicker.Trigger>
  );
};

export const LoongArkDatePickerClearTrigger: Component<
  ArkDatePickerClearTriggerProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkDatePicker.ClearTrigger
      {...props}
      data-scope="date-picker"
      data-part="clear-trigger"
    >
      {props.children}
    </ArkDatePicker.ClearTrigger>
  );
};

export const LoongArkDatePickerPositioner: Component<
  ArkDatePickerPositionerProps & { children?: JSX.Element }
> = (props) => {
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
};

export const LoongArkDatePickerContent: Component<
  ArkDatePickerContentProps & { children?: JSX.Element }
> = (props) => {
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
};

export const LoongArkDatePickerView: Component<
  ArkDatePickerViewProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkDatePicker.View {...props} data-scope="date-picker" data-part="view">
      {props.children}
    </ArkDatePicker.View>
  );
};

export const LoongArkDatePickerViewControl: Component<
  ArkDatePickerViewControlProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkDatePicker.ViewControl
      {...props}
      data-scope="date-picker"
      data-part="view-control"
    >
      {props.children}
    </ArkDatePicker.ViewControl>
  );
};

export const LoongArkDatePickerViewTrigger: Component<
  ArkDatePickerViewTriggerProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkDatePicker.ViewTrigger
      {...props}
      data-scope="date-picker"
      data-part="view-trigger"
    >
      {props.children}
    </ArkDatePicker.ViewTrigger>
  );
};

export const LoongArkDatePickerPrevTrigger: Component<
  ArkDatePickerPrevTriggerProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkDatePicker.PrevTrigger
      {...props}
      data-scope="date-picker"
      data-part="prev-trigger"
    >
      {props.children}
    </ArkDatePicker.PrevTrigger>
  );
};

export const LoongArkDatePickerNextTrigger: Component<
  ArkDatePickerNextTriggerProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkDatePicker.NextTrigger
      {...props}
      data-scope="date-picker"
      data-part="next-trigger"
    >
      {props.children}
    </ArkDatePicker.NextTrigger>
  );
};

export const LoongArkDatePickerMonthSelect: Component<
  ArkDatePickerMonthSelectProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkDatePicker.MonthSelect
      {...props}
      data-scope="date-picker"
      data-part="month-select"
    >
      {props.children}
    </ArkDatePicker.MonthSelect>
  );
};

export const LoongArkDatePickerYearSelect: Component<
  ArkDatePickerYearSelectProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkDatePicker.YearSelect
      {...props}
      data-scope="date-picker"
      data-part="year-select"
    >
      {props.children}
    </ArkDatePicker.YearSelect>
  );
};

export const LoongArkDatePickerRangeText: Component<
  ArkDatePickerRangeTextProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkDatePicker.RangeText
      {...props}
      data-scope="date-picker"
      data-part="range-text"
    >
      {props.children}
    </ArkDatePicker.RangeText>
  );
};

export const LoongArkDatePickerPresetTrigger: Component<
  ArkDatePickerPresetTriggerProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkDatePicker.PresetTrigger
      {...props}
      data-scope="date-picker"
      data-part="preset-trigger"
    >
      {props.children}
    </ArkDatePicker.PresetTrigger>
  );
};

export const LoongArkDatePickerTable: Component<
  ArkDatePickerTableProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkDatePicker.Table {...props} data-scope="date-picker" data-part="table">
      {props.children}
    </ArkDatePicker.Table>
  );
};

export const LoongArkDatePickerTableHead: Component<
  ArkDatePickerTableHeadProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkDatePicker.TableHead
      {...props}
      data-scope="date-picker"
      data-part="table-head"
    >
      {props.children}
    </ArkDatePicker.TableHead>
  );
};

export const LoongArkDatePickerTableBody: Component<
  ArkDatePickerTableBodyProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkDatePicker.TableBody
      {...props}
      data-scope="date-picker"
      data-part="table-body"
    >
      {props.children}
    </ArkDatePicker.TableBody>
  );
};

export const LoongArkDatePickerTableRow: Component<
  ArkDatePickerTableRowProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkDatePicker.TableRow
      {...props}
      data-scope="date-picker"
      data-part="table-row"
    >
      {props.children}
    </ArkDatePicker.TableRow>
  );
};

export const LoongArkDatePickerTableHeader: Component<
  ArkDatePickerTableHeaderProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkDatePicker.TableHeader
      {...props}
      data-scope="date-picker"
      data-part="table-header"
    >
      {props.children}
    </ArkDatePicker.TableHeader>
  );
};

export const LoongArkDatePickerTableCell: Component<
  ArkDatePickerTableCellProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkDatePicker.TableCell
      {...props}
      data-scope="date-picker"
      data-part="table-cell"
    >
      {props.children}
    </ArkDatePicker.TableCell>
  );
};

export const LoongArkDatePickerTableCellTrigger: Component<
  ArkDatePickerTableCellTriggerProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkDatePicker.TableCellTrigger
      {...props}
      data-scope="date-picker"
      data-part="table-cell-trigger"
    >
      {props.children}
    </ArkDatePicker.TableCellTrigger>
  );
};
