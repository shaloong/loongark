import { SvelteComponent, type ComponentProps } from "svelte";
import { ColorPicker } from "@ark-ui/svelte/color-picker";
import type { ColorPickerChannelSliderValueTextProps } from "@ark-ui/svelte/color-picker";

export default class LoongArkColorPickerChannelSliderValueText extends SvelteComponent<
  Omit<
    ComponentProps<typeof ColorPicker.ChannelSliderValueText>,
    "children"
  > & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
