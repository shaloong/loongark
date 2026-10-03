import { SvelteComponent, type ComponentProps } from "svelte";
import { ColorPicker } from "@ark-ui/svelte/color-picker";
import type { ColorPickerValueSwatchProps } from "@ark-ui/svelte/color-picker";

export default class LoongArkColorPickerValueSwatch extends SvelteComponent<
  Omit<ComponentProps<typeof ColorPicker.ValueSwatch>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
