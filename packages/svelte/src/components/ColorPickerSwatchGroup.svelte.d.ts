import { SvelteComponent, type ComponentProps } from "svelte";
import { ColorPicker } from "@ark-ui/svelte/color-picker";
import type { ColorPickerSwatchGroupProps } from "@ark-ui/svelte/color-picker";

export default class LoongArkColorPickerSwatchGroup extends SvelteComponent<
  Omit<ComponentProps<typeof ColorPicker.SwatchGroup>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
