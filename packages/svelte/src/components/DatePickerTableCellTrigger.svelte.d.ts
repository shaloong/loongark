import { SvelteComponent, type ComponentProps } from "svelte";
import { DatePicker } from "@ark-ui/svelte/date-picker";

export default class LoongArkDatePickerTableCellTrigger extends SvelteComponent<
  Omit<ComponentProps<typeof DatePicker.TableCellTrigger>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
