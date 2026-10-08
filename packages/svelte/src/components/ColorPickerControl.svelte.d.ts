import { SvelteComponent, type ComponentProps } from "svelte";
import { ColorPicker } from "@ark-ui/svelte/color-picker";
import type { ColorPickerControlProps } from "@ark-ui/svelte/color-picker";

export default class LoongArkColorPickerControl extends SvelteComponent<
  Omit<ComponentProps<typeof ColorPicker.Control>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
