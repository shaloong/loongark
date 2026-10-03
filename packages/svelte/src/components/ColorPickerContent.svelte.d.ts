import { SvelteComponent, type ComponentProps } from "svelte";
import { ColorPicker } from "@ark-ui/svelte/color-picker";
import type { ColorPickerContentProps } from "@ark-ui/svelte/color-picker";

export default class LoongArkColorPickerContent extends SvelteComponent<
  Omit<ComponentProps<typeof ColorPicker.Content>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
