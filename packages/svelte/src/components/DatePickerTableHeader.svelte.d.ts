import { SvelteComponent, type ComponentProps } from "svelte";
import { DatePicker } from "@ark-ui/svelte/date-picker";

export default class LoongArkDatePickerTableHeader extends SvelteComponent<
  Omit<ComponentProps<typeof DatePicker.TableHeader>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
