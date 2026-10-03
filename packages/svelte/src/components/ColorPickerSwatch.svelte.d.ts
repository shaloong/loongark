import { SvelteComponent, type ComponentProps } from "svelte";
import { ColorPicker } from "@ark-ui/svelte/color-picker";
import type { ColorPickerSwatchProps } from "@ark-ui/svelte/color-picker";

export default class LoongArkColorPickerSwatch extends SvelteComponent<
  Omit<ComponentProps<typeof ColorPicker.Swatch>, "children" | "value"> & {
    value: ColorPickerSwatchProps["value"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
