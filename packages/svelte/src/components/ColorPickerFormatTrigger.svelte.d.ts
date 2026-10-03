import { SvelteComponent, type ComponentProps } from "svelte";
import { ColorPicker } from "@ark-ui/svelte/color-picker";
import type { ColorPickerFormatTriggerProps } from "@ark-ui/svelte/color-picker";

export default class LoongArkColorPickerFormatTrigger extends SvelteComponent<
  Omit<ComponentProps<typeof ColorPicker.FormatTrigger>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
