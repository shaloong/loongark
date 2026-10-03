import { SvelteComponent, type ComponentProps } from "svelte";
import { ColorPicker } from "@ark-ui/svelte/color-picker";
import type { ColorPickerEyeDropperTriggerProps } from "@ark-ui/svelte/color-picker";

export default class LoongArkColorPickerEyeDropperTrigger extends SvelteComponent<
  Omit<ComponentProps<typeof ColorPicker.EyeDropperTrigger>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
