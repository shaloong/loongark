import { SvelteComponent, type ComponentProps } from "svelte";
import { ColorPicker } from "@ark-ui/svelte/color-picker";
import type { ColorPickerChannelSliderProps } from "@ark-ui/svelte/color-picker";

export default class LoongArkColorPickerChannelSlider extends SvelteComponent<
  Omit<
    ComponentProps<typeof ColorPicker.ChannelSlider>,
    "children" | "channel"
  > & { channel: ColorPickerChannelSliderProps["channel"] },
  Record<string, never>,
  { default: Record<string, never> }
> {}
