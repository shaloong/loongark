import { SvelteComponent, type ComponentProps } from "svelte";
import { DatePicker } from "@ark-ui/svelte/date-picker";

export default class LoongArkDatePickerViewTrigger extends SvelteComponent<
  Omit<ComponentProps<typeof DatePicker.ViewTrigger>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
