import { SvelteComponent, type ComponentProps } from "svelte";
import { DatePicker } from "@ark-ui/svelte/date-picker";

export default class LoongArkDatePickerTrigger extends SvelteComponent<
  Omit<ComponentProps<typeof DatePicker.Trigger>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
