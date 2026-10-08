import { SvelteComponent, type ComponentProps } from "svelte";
import { ColorPicker } from "@ark-ui/svelte/color-picker";
import type { ColorPickerChannelSliderTrackProps } from "@ark-ui/svelte/color-picker";

export default class LoongArkColorPickerChannelSliderTrack extends SvelteComponent<
  Omit<ComponentProps<typeof ColorPicker.ChannelSliderTrack>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
