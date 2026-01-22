declare module "@ark-ui/react/date-picker" {
  import type {
    ReactNode,
    RefAttributes,
    ForwardRefExoticComponent,
  } from "react";

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
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface DatePickerLabelProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface DatePickerControlProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface DatePickerInputProps {
    index?: number;
    fixOnBlur?: boolean;
    placeholder?: string;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface DatePickerTriggerProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface DatePickerClearTriggerProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface DatePickerPositionerProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface DatePickerContentProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface DatePickerViewProps {
    view?: DatePickerView;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface DatePickerViewControlProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface DatePickerViewTriggerProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface DatePickerPrevTriggerProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface DatePickerNextTriggerProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface DatePickerMonthSelectProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface DatePickerYearSelectProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface DatePickerRangeTextProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface DatePickerPresetTriggerProps {
    value?: any;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface DatePickerTableProps {
    columns?: number;
    id?: string;
    view?: DatePickerView;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface DatePickerTableHeadProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface DatePickerTableBodyProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface DatePickerTableRowProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface DatePickerTableHeaderProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface DatePickerTableCellProps {
    value?: any;
    disabled?: boolean;
    columns?: number;
    visibleRange?: any;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface DatePickerTableCellTriggerProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export const Root: ForwardRefExoticComponent<
    DatePickerRootProps & RefAttributes<HTMLDivElement>
  >;
  export const Label: ForwardRefExoticComponent<
    DatePickerLabelProps & RefAttributes<HTMLLabelElement>
  >;
  export const Control: ForwardRefExoticComponent<
    DatePickerControlProps & RefAttributes<HTMLDivElement>
  >;
  export const Input: ForwardRefExoticComponent<
    DatePickerInputProps & RefAttributes<HTMLInputElement>
  >;
  export const Trigger: ForwardRefExoticComponent<
    DatePickerTriggerProps & RefAttributes<HTMLButtonElement>
  >;
  export const ClearTrigger: ForwardRefExoticComponent<
    DatePickerClearTriggerProps & RefAttributes<HTMLButtonElement>
  >;
  export const Positioner: ForwardRefExoticComponent<
    DatePickerPositionerProps & RefAttributes<HTMLDivElement>
  >;
  export const Content: ForwardRefExoticComponent<
    DatePickerContentProps & RefAttributes<HTMLDivElement>
  >;
  export const View: ForwardRefExoticComponent<
    DatePickerViewProps & RefAttributes<HTMLDivElement>
  >;
  export const ViewControl: ForwardRefExoticComponent<
    DatePickerViewControlProps & RefAttributes<HTMLDivElement>
  >;
  export const ViewTrigger: ForwardRefExoticComponent<
    DatePickerViewTriggerProps & RefAttributes<HTMLButtonElement>
  >;
  export const PrevTrigger: ForwardRefExoticComponent<
    DatePickerPrevTriggerProps & RefAttributes<HTMLButtonElement>
  >;
  export const NextTrigger: ForwardRefExoticComponent<
    DatePickerNextTriggerProps & RefAttributes<HTMLButtonElement>
  >;
  export const MonthSelect: ForwardRefExoticComponent<
    DatePickerMonthSelectProps & RefAttributes<HTMLSelectElement>
  >;
  export const YearSelect: ForwardRefExoticComponent<
    DatePickerYearSelectProps & RefAttributes<HTMLSelectElement>
  >;
  export const RangeText: ForwardRefExoticComponent<
    DatePickerRangeTextProps & RefAttributes<HTMLDivElement>
  >;
  export const PresetTrigger: ForwardRefExoticComponent<
    DatePickerPresetTriggerProps & RefAttributes<HTMLButtonElement>
  >;
  export const Table: ForwardRefExoticComponent<
    DatePickerTableProps & RefAttributes<HTMLTableElement>
  >;
  export const TableHead: ForwardRefExoticComponent<
    DatePickerTableHeadProps & RefAttributes<HTMLTableSectionElement>
  >;
  export const TableBody: ForwardRefExoticComponent<
    DatePickerTableBodyProps & RefAttributes<HTMLTableSectionElement>
  >;
  export const TableRow: ForwardRefExoticComponent<
    DatePickerTableRowProps & RefAttributes<HTMLTableRowElement>
  >;
  export const TableHeader: ForwardRefExoticComponent<
    DatePickerTableHeaderProps & RefAttributes<HTMLTableCellElement>
  >;
  export const TableCell: ForwardRefExoticComponent<
    DatePickerTableCellProps & RefAttributes<HTMLTableCellElement>
  >;
  export const TableCellTrigger: ForwardRefExoticComponent<
    DatePickerTableCellTriggerProps & RefAttributes<HTMLDivElement>
  >;

  export const DatePicker: {
    Root: typeof Root;
    Label: typeof Label;
    Control: typeof Control;
    Input: typeof Input;
    Trigger: typeof Trigger;
    ClearTrigger: typeof ClearTrigger;
    Positioner: typeof Positioner;
    Content: typeof Content;
    View: typeof View;
    ViewControl: typeof ViewControl;
    ViewTrigger: typeof ViewTrigger;
    PrevTrigger: typeof PrevTrigger;
    NextTrigger: typeof NextTrigger;
    MonthSelect: typeof MonthSelect;
    YearSelect: typeof YearSelect;
    RangeText: typeof RangeText;
    PresetTrigger: typeof PresetTrigger;
    Table: typeof Table;
    TableHead: typeof TableHead;
    TableBody: typeof TableBody;
    TableRow: typeof TableRow;
    TableHeader: typeof TableHeader;
    TableCell: typeof TableCell;
    TableCellTrigger: typeof TableCellTrigger;
  };

  export function parseDate(value: string | Date | Array<any>): any;
  export const useDatePickerContext: () => any;
}
