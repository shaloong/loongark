import { SvelteComponent, type ComponentProps } from "svelte";
import { DatePicker } from "@ark-ui/svelte/date-picker";

export default class LoongArkDatePickerTableHead extends SvelteComponent<
  Omit<ComponentProps<typeof DatePicker.TableHead>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
