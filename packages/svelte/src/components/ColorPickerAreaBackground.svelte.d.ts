import { SvelteComponent, type ComponentProps } from "svelte";
import { ColorPicker } from "@ark-ui/svelte/color-picker";
import type { ColorPickerAreaBackgroundProps } from "@ark-ui/svelte/color-picker";

export default class LoongArkColorPickerAreaBackground extends SvelteComponent<
  Omit<ComponentProps<typeof ColorPicker.AreaBackground>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
