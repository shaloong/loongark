import { SvelteComponent, type ComponentProps } from "svelte";
import { DatePicker } from "@ark-ui/svelte/date-picker";

export default class LoongArkDatePickerClearTrigger extends SvelteComponent<
  Omit<ComponentProps<typeof DatePicker.ClearTrigger>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
