import { SvelteComponent, type ComponentProps } from "svelte";
import { ColorPicker } from "@ark-ui/svelte/color-picker";
import type { ColorPickerChannelSliderLabelProps } from "@ark-ui/svelte/color-picker";

export default class LoongArkColorPickerChannelSliderLabel extends SvelteComponent<
  Omit<ComponentProps<typeof ColorPicker.ChannelSliderLabel>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
