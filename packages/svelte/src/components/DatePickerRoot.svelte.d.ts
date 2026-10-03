import { SvelteComponent, type ComponentProps } from "svelte";
import { DatePicker } from "@ark-ui/svelte/date-picker";
import type { DatePickerRootProps } from "@ark-ui/svelte/date-picker";
import type { DatePickerSize } from "@loongark/primitives";

export default class LoongArkDatePickerRoot extends SvelteComponent<
  Omit<
    ComponentProps<typeof DatePicker.Root>,
    | "children"
    | "size"
    | "closeOnSelect"
    | "defaultFocusedValue"
    | "defaultOpen"
    | "defaultValue"
    | "defaultView"
    | "disabled"
    | "fixedWeeks"
    | "focusedValue"
    | "format"
    | "id"
    | "ids"
    | "inline"
    | "invalid"
    | "isDateUnavailable"
    | "locale"
    | "max"
    | "maxView"
    | "min"
    | "minView"
    | "name"
    | "numOfMonths"
    | "onFocusChange"
    | "onOpenChange"
    | "onValueChange"
    | "onViewChange"
    | "open"
    | "outsideDaySelectable"
    | "parse"
    | "placeholder"
    | "positioning"
    | "readOnly"
    | "required"
    | "selectionMode"
    | "startOfWeek"
    | "timeZone"
    | "translations"
    | "value"
    | "view"
  > & {
    size?: DatePickerSize;
    closeOnSelect?: DatePickerRootProps["closeOnSelect"];
    defaultFocusedValue?: DatePickerRootProps["defaultFocusedValue"];
    defaultOpen?: DatePickerRootProps["defaultOpen"];
    defaultValue?: DatePickerRootProps["defaultValue"];
    defaultView?: DatePickerRootProps["defaultView"];
    disabled?: DatePickerRootProps["disabled"];
    fixedWeeks?: DatePickerRootProps["fixedWeeks"];
    focusedValue?: DatePickerRootProps["focusedValue"];
    format?: DatePickerRootProps["format"];
    id?: DatePickerRootProps["id"];
    ids?: DatePickerRootProps["ids"];
    inline?: DatePickerRootProps["inline"];
    invalid?: DatePickerRootProps["invalid"];
    isDateUnavailable?: DatePickerRootProps["isDateUnavailable"];
    locale?: DatePickerRootProps["locale"];
    max?: DatePickerRootProps["max"];
    maxView?: DatePickerRootProps["maxView"];
    min?: DatePickerRootProps["min"];
    minView?: DatePickerRootProps["minView"];
    name?: DatePickerRootProps["name"];
    numOfMonths?: DatePickerRootProps["numOfMonths"];
    onFocusChange?: DatePickerRootProps["onFocusChange"];
    onOpenChange?: DatePickerRootProps["onOpenChange"];
    onValueChange?: DatePickerRootProps["onValueChange"];
    onViewChange?: DatePickerRootProps["onViewChange"];
    open?: DatePickerRootProps["open"];
    outsideDaySelectable?: DatePickerRootProps["outsideDaySelectable"];
    parse?: DatePickerRootProps["parse"];
    placeholder?: DatePickerRootProps["placeholder"];
    positioning?: DatePickerRootProps["positioning"];
    readOnly?: DatePickerRootProps["readOnly"];
    required?: DatePickerRootProps["required"];
    selectionMode?: DatePickerRootProps["selectionMode"];
    startOfWeek?: DatePickerRootProps["startOfWeek"];
    timeZone?: DatePickerRootProps["timeZone"];
    translations?: DatePickerRootProps["translations"];
    value?: DatePickerRootProps["value"];
    view?: DatePickerRootProps["view"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
