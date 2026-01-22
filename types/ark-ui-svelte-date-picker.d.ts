declare module "@ark-ui/svelte/date-picker" {
  type SvelteComponent<P = any> = new (...args: any[]) => { $$prop_def: P };

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
    asChild?: boolean;
  }

  export interface DatePickerLabelProps {
    asChild?: boolean;
  }

  export interface DatePickerControlProps {
    asChild?: boolean;
  }

  export interface DatePickerInputProps {
    index?: number;
    fixOnBlur?: boolean;
    placeholder?: string;
    asChild?: boolean;
  }

  export interface DatePickerTriggerProps {
    asChild?: boolean;
  }

  export interface DatePickerClearTriggerProps {
    asChild?: boolean;
  }

  export interface DatePickerPositionerProps {
    asChild?: boolean;
  }

  export interface DatePickerContentProps {
    asChild?: boolean;
  }

  export interface DatePickerViewProps {
    view?: DatePickerView;
    asChild?: boolean;
  }

  export interface DatePickerViewControlProps {
    asChild?: boolean;
  }

  export interface DatePickerViewTriggerProps {
    asChild?: boolean;
  }

  export interface DatePickerPrevTriggerProps {
    asChild?: boolean;
  }

  export interface DatePickerNextTriggerProps {
    asChild?: boolean;
  }

  export interface DatePickerMonthSelectProps {
    asChild?: boolean;
  }

  export interface DatePickerYearSelectProps {
    asChild?: boolean;
  }

  export interface DatePickerRangeTextProps {
    asChild?: boolean;
  }

  export interface DatePickerPresetTriggerProps {
    value?: any;
    asChild?: boolean;
  }

  export interface DatePickerTableProps {
    columns?: number;
    id?: string;
    view?: DatePickerView;
    asChild?: boolean;
  }

  export interface DatePickerTableHeadProps {
    asChild?: boolean;
  }

  export interface DatePickerTableBodyProps {
    asChild?: boolean;
  }

  export interface DatePickerTableRowProps {
    asChild?: boolean;
  }

  export interface DatePickerTableHeaderProps {
    asChild?: boolean;
  }

  export interface DatePickerTableCellProps {
    value?: any;
    disabled?: boolean;
    columns?: number;
    visibleRange?: any;
    asChild?: boolean;
  }

  export interface DatePickerTableCellTriggerProps {
    asChild?: boolean;
  }

  export const DatePicker: {
    Root: SvelteComponent<DatePickerRootProps>;
    Label: SvelteComponent<DatePickerLabelProps>;
    Control: SvelteComponent<DatePickerControlProps>;
    Input: SvelteComponent<DatePickerInputProps>;
    Trigger: SvelteComponent<DatePickerTriggerProps>;
    ClearTrigger: SvelteComponent<DatePickerClearTriggerProps>;
    Positioner: SvelteComponent<DatePickerPositionerProps>;
    Content: SvelteComponent<DatePickerContentProps>;
    View: SvelteComponent<DatePickerViewProps>;
    ViewControl: SvelteComponent<DatePickerViewControlProps>;
    ViewTrigger: SvelteComponent<DatePickerViewTriggerProps>;
    PrevTrigger: SvelteComponent<DatePickerPrevTriggerProps>;
    NextTrigger: SvelteComponent<DatePickerNextTriggerProps>;
    MonthSelect: SvelteComponent<DatePickerMonthSelectProps>;
    YearSelect: SvelteComponent<DatePickerYearSelectProps>;
    RangeText: SvelteComponent<DatePickerRangeTextProps>;
    PresetTrigger: SvelteComponent<DatePickerPresetTriggerProps>;
    Table: SvelteComponent<DatePickerTableProps>;
    TableHead: SvelteComponent<DatePickerTableHeadProps>;
    TableBody: SvelteComponent<DatePickerTableBodyProps>;
    TableRow: SvelteComponent<DatePickerTableRowProps>;
    TableHeader: SvelteComponent<DatePickerTableHeaderProps>;
    TableCell: SvelteComponent<DatePickerTableCellProps>;
    TableCellTrigger: SvelteComponent<DatePickerTableCellTriggerProps>;
  };
}
