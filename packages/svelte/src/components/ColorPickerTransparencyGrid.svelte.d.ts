import { SvelteComponent, type ComponentProps } from "svelte";
import { ColorPicker } from "@ark-ui/svelte/color-picker";
import type { ColorPickerTransparencyGridProps } from "@ark-ui/svelte/color-picker";

export default class LoongArkColorPickerTransparencyGrid extends SvelteComponent<
  Omit<ComponentProps<typeof ColorPicker.TransparencyGrid>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
