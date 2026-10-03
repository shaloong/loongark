import { SvelteComponent, type ComponentProps } from "svelte";
import { ColorPicker } from "@ark-ui/svelte/color-picker";
import type { ColorPickerChannelInputProps } from "@ark-ui/svelte/color-picker";

export default class LoongArkColorPickerChannelInput extends SvelteComponent<
  Omit<
    ComponentProps<typeof ColorPicker.ChannelInput>,
    "children" | "channel"
  > & { channel: ColorPickerChannelInputProps["channel"] },
  Record<string, never>,
  { default: Record<string, never> }
> {}
