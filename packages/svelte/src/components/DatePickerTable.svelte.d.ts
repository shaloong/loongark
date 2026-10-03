import { SvelteComponent, type ComponentProps } from "svelte";
import { DatePicker } from "@ark-ui/svelte/date-picker";
import type { DatePickerTableProps } from "@ark-ui/svelte/date-picker";

export default class LoongArkDatePickerTable extends SvelteComponent<
  Omit<
    ComponentProps<typeof DatePicker.Table>,
    "children" | "columns" | "id"
  > & {
    columns?: DatePickerTableProps["columns"];
    id?: DatePickerTableProps["id"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
