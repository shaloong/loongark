import { SvelteComponent, type ComponentProps } from "svelte";
import { DatePicker } from "@ark-ui/svelte/date-picker";
import type { DatePickerPresetTriggerProps } from "@ark-ui/svelte/date-picker";

export default class LoongArkDatePickerPresetTrigger extends SvelteComponent<
  Omit<
    ComponentProps<typeof DatePicker.PresetTrigger>,
    "children" | "value"
  > & { value: DatePickerPresetTriggerProps["value"] },
  Record<string, never>,
  { default: Record<string, never> }
> {}
