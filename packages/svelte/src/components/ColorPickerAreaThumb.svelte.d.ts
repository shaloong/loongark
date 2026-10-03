import { SvelteComponent, type ComponentProps } from "svelte";
import { ColorPicker } from "@ark-ui/svelte/color-picker";
import type { ColorPickerAreaThumbProps } from "@ark-ui/svelte/color-picker";

export default class LoongArkColorPickerAreaThumb extends SvelteComponent<
  Omit<ComponentProps<typeof ColorPicker.AreaThumb>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
