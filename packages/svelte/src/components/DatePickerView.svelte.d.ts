import { SvelteComponent, type ComponentProps } from "svelte";
import { DatePicker } from "@ark-ui/svelte/date-picker";
import type { DatePickerViewProps } from "@ark-ui/svelte/date-picker";

export default class LoongArkDatePickerView extends SvelteComponent<
  Omit<ComponentProps<typeof DatePicker.View>, "children" | "view"> & {
    view?: DatePickerViewProps["view"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
