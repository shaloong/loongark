import { SvelteComponent, type ComponentProps } from "svelte";
import { ColorPicker } from "@ark-ui/svelte/color-picker";

export default class LoongArkColorPickerValueText extends SvelteComponent<
  ComponentProps<typeof ColorPicker.ValueText>,
  Record<string, never>,
  { default: Record<string, never> }
> {}
