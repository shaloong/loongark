import { SvelteComponent, type ComponentProps } from "svelte";
import { DatePicker } from "@ark-ui/svelte/date-picker";

export default class LoongArkDatePickerYearSelect extends SvelteComponent<
  Omit<ComponentProps<typeof DatePicker.YearSelect>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
