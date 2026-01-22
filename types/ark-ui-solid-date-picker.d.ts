declare module "@ark-ui/solid/date-picker" {
  import type { Component, JSX } from "solid-js";

  export type DatePickerView = "day" | "month" | "year";

  export interface DatePickerRootProps {
    closeOnSelect?: boolean;
    defaultFocusedValue?: any;
    defaultOpen?: boolean;
    defaultValue?: any[];
    defaultView?: DatePickerView;
    disabled?: boolean;
    fixedWeeks?: boolean;
    focusedValue?: any;
    format?: (value: any, details: any) => string;
    id?: string;
    ids?: any;
    inline?: boolean;
    invalid?: boolean;
    isDateUnavailable?: (value: any) => boolean;
    locale?: string;
    max?: any;
    maxView?: DatePickerView;
    min?: any;
    minView?: DatePickerView;
    name?: string;
    numOfMonths?: number;
    onFocusChange?: (details: any) => void;
    onOpenChange?: (details: any) => void;
    onValueChange?: (details: any) => void;
    onViewChange?: (details: any) => void;
    open?: boolean;
    outsideDaySelectable?: boolean;
    parse?: (value: string, details: any) => any;
    placeholder?: string;
    positioning?: any;
    readOnly?: boolean;
    required?: boolean;
    selectionMode?: "single" | "multiple" | "range";
    startOfWeek?: number;
    timeZone?: string;
    translations?: any;
    value?: any[];
    view?: DatePickerView;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface DatePickerLabelProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface DatePickerControlProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface DatePickerInputProps {
    index?: number;
    fixOnBlur?: boolean;
    placeholder?: string;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface DatePickerTriggerProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface DatePickerClearTriggerProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface DatePickerPositionerProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface DatePickerContentProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface DatePickerViewProps {
    view?: DatePickerView;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface DatePickerViewControlProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface DatePickerViewTriggerProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface DatePickerPrevTriggerProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface DatePickerNextTriggerProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface DatePickerMonthSelectProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface DatePickerYearSelectProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface DatePickerRangeTextProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface DatePickerPresetTriggerProps {
    value?: any;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface DatePickerTableProps {
    columns?: number;
    id?: string;
    view?: DatePickerView;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface DatePickerTableHeadProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface DatePickerTableBodyProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface DatePickerTableRowProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface DatePickerTableHeaderProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface DatePickerTableCellProps {
    value?: any;
    disabled?: boolean;
    columns?: number;
    visibleRange?: any;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface DatePickerTableCellTriggerProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export namespace DatePicker {
    export const Root: Component<DatePickerRootProps>;
    export const Label: Component<DatePickerLabelProps>;
    export const Control: Component<DatePickerControlProps>;
    export const Input: Component<DatePickerInputProps>;
    export const Trigger: Component<DatePickerTriggerProps>;
    export const ClearTrigger: Component<DatePickerClearTriggerProps>;
    export const Positioner: Component<DatePickerPositionerProps>;
    export const Content: Component<DatePickerContentProps>;
    export const View: Component<DatePickerViewProps>;
    export const ViewControl: Component<DatePickerViewControlProps>;
    export const ViewTrigger: Component<DatePickerViewTriggerProps>;
    export const PrevTrigger: Component<DatePickerPrevTriggerProps>;
    export const NextTrigger: Component<DatePickerNextTriggerProps>;
    export const MonthSelect: Component<DatePickerMonthSelectProps>;
    export const YearSelect: Component<DatePickerYearSelectProps>;
    export const RangeText: Component<DatePickerRangeTextProps>;
    export const PresetTrigger: Component<DatePickerPresetTriggerProps>;
    export const Table: Component<DatePickerTableProps>;
    export const TableHead: Component<DatePickerTableHeadProps>;
    export const TableBody: Component<DatePickerTableBodyProps>;
    export const TableRow: Component<DatePickerTableRowProps>;
    export const TableHeader: Component<DatePickerTableHeaderProps>;
    export const TableCell: Component<DatePickerTableCellProps>;
    export const TableCellTrigger: Component<DatePickerTableCellTriggerProps>;
  }
}
