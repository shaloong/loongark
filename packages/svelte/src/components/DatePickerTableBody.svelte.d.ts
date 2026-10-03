import { SvelteComponent, type ComponentProps } from "svelte";
import { DatePicker } from "@ark-ui/svelte/date-picker";

export default class LoongArkDatePickerTableBody extends SvelteComponent<
  Omit<ComponentProps<typeof DatePicker.TableBody>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
