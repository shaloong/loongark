import { SvelteComponent, type ComponentProps } from "svelte";
import { DatePicker } from "@ark-ui/svelte/date-picker";

export default class LoongArkDatePickerContent extends SvelteComponent<
  Omit<ComponentProps<typeof DatePicker.Content>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
