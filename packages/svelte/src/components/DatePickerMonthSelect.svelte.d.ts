import { SvelteComponent, type ComponentProps } from "svelte";
import { DatePicker } from "@ark-ui/svelte/date-picker";

export default class LoongArkDatePickerMonthSelect extends SvelteComponent<
  Omit<ComponentProps<typeof DatePicker.MonthSelect>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
