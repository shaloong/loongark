import { SvelteComponent, type ComponentProps } from "svelte";
import { ColorPicker } from "@ark-ui/svelte/color-picker";
import type { ColorPickerTriggerProps } from "@ark-ui/svelte/color-picker";

export default class LoongArkColorPickerTrigger extends SvelteComponent<
  Omit<ComponentProps<typeof ColorPicker.Trigger>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
