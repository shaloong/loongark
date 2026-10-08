import { SvelteComponent, type ComponentProps } from "svelte";
import { DatePicker } from "@ark-ui/svelte/date-picker";
import type { DatePickerTableCellProps } from "@ark-ui/svelte/date-picker";

export default class LoongArkDatePickerTableCell extends SvelteComponent<
  Omit<
    ComponentProps<typeof DatePicker.TableCell>,
    "children" | "value" | "disabled" | "columns" | "visibleRange"
  > & {
    value: DatePickerTableCellProps["value"];
    disabled?: DatePickerTableCellProps["disabled"];
    columns?: DatePickerTableCellProps["columns"];
    visibleRange?: DatePickerTableCellProps["visibleRange"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
