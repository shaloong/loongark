import { SvelteComponent, type ComponentProps } from "svelte";
import { DatePicker } from "@ark-ui/svelte/date-picker";
import type { DatePickerInputProps } from "@ark-ui/svelte/date-picker";

export default class LoongArkDatePickerInput extends SvelteComponent<
  Omit<
    ComponentProps<typeof DatePicker.Input>,
    "children" | "index" | "fixOnBlur"
  > & {
    index?: DatePickerInputProps["index"];
    fixOnBlur?: DatePickerInputProps["fixOnBlur"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
