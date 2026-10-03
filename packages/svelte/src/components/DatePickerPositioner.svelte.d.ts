import { SvelteComponent, type ComponentProps } from "svelte";
import { DatePicker } from "@ark-ui/svelte/date-picker";

export default class LoongArkDatePickerPositioner extends SvelteComponent<
  Omit<ComponentProps<typeof DatePicker.Positioner>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
