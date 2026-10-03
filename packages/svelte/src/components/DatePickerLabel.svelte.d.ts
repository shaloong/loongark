import { SvelteComponent, type ComponentProps } from "svelte";
import { DatePicker } from "@ark-ui/svelte/date-picker";

export default class LoongArkDatePickerLabel extends SvelteComponent<
  Omit<ComponentProps<typeof DatePicker.Label>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
