import { SvelteComponent, type ComponentProps } from "svelte";
import { DatePicker } from "@ark-ui/svelte/date-picker";

export default class LoongArkDatePickerPrevTrigger extends SvelteComponent<
  Omit<ComponentProps<typeof DatePicker.PrevTrigger>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
