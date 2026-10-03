import { SvelteComponent, type ComponentProps } from "svelte";
import { ColorPicker } from "@ark-ui/svelte/color-picker";
import type { ColorPickerAreaProps } from "@ark-ui/svelte/color-picker";

export default class LoongArkColorPickerArea extends SvelteComponent<
  Omit<ComponentProps<typeof ColorPicker.Area>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
