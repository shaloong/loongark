import { SvelteComponent, type ComponentProps } from "svelte";
import { ColorPicker } from "@ark-ui/svelte/color-picker";
import type { ColorPickerFormatSelectProps } from "@ark-ui/svelte/color-picker";

export default class LoongArkColorPickerFormatSelect extends SvelteComponent<
  Omit<ComponentProps<typeof ColorPicker.FormatSelect>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
