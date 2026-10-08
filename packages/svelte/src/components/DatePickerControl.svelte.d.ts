import { SvelteComponent, type ComponentProps } from "svelte";
import { DatePicker } from "@ark-ui/svelte/date-picker";

export default class LoongArkDatePickerControl extends SvelteComponent<
  Omit<ComponentProps<typeof DatePicker.Control>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
