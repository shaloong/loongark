import { SvelteComponent, type ComponentProps } from "svelte";
import { DatePicker } from "@ark-ui/svelte/date-picker";

export default class LoongArkDatePickerTableRow extends SvelteComponent<
  Omit<ComponentProps<typeof DatePicker.TableRow>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
