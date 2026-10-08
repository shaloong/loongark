import { SvelteComponent, type ComponentProps } from "svelte";
import { ColorPicker } from "@ark-ui/svelte/color-picker";
import type { ColorPickerSwatchTriggerProps } from "@ark-ui/svelte/color-picker";

export default class LoongArkColorPickerSwatchTrigger extends SvelteComponent<
  Omit<
    ComponentProps<typeof ColorPicker.SwatchTrigger>,
    "children" | "value"
  > & { value: ColorPickerSwatchTriggerProps["value"] },
  Record<string, never>,
  { default: Record<string, never> }
> {}
