import { SvelteComponent, type ComponentProps } from "svelte";
import { DatePicker } from "@ark-ui/svelte/date-picker";

export default class LoongArkDatePickerNextTrigger extends SvelteComponent<
  Omit<ComponentProps<typeof DatePicker.NextTrigger>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
