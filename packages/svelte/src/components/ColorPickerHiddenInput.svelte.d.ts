import { SvelteComponent, type ComponentProps } from "svelte";
import { ColorPicker } from "@ark-ui/svelte/color-picker";
import type { ColorPickerHiddenInputProps } from "@ark-ui/svelte/color-picker";

export default class LoongArkColorPickerHiddenInput extends SvelteComponent<
  Omit<ComponentProps<typeof ColorPicker.HiddenInput>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
