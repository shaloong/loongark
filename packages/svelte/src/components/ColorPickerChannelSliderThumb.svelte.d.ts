import { SvelteComponent, type ComponentProps } from "svelte";
import { ColorPicker } from "@ark-ui/svelte/color-picker";
import type { ColorPickerChannelSliderThumbProps } from "@ark-ui/svelte/color-picker";

export default class LoongArkColorPickerChannelSliderThumb extends SvelteComponent<
  Omit<ComponentProps<typeof ColorPicker.ChannelSliderThumb>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
