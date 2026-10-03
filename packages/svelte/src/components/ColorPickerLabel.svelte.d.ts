import { SvelteComponent, type ComponentProps } from "svelte";
import { ColorPicker } from "@ark-ui/svelte/color-picker";
import type { ColorPickerLabelProps } from "@ark-ui/svelte/color-picker";

export default class LoongArkColorPickerLabel extends SvelteComponent<
  Omit<ComponentProps<typeof ColorPicker.Label>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
