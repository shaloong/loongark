import { SvelteComponent, type ComponentProps } from "svelte";
import { DatePicker } from "@ark-ui/svelte/date-picker";

export default class LoongArkDatePickerRangeText extends SvelteComponent<
  ComponentProps<typeof DatePicker.RangeText>,
  Record<string, never>,
  { default: Record<string, never> }
> {}
