import { SvelteComponent, type ComponentProps } from "svelte";
import { ColorPicker } from "@ark-ui/svelte/color-picker";
import type { ColorPickerViewProps } from "@ark-ui/svelte/color-picker";

export default class LoongArkColorPickerView extends SvelteComponent<
  Omit<ComponentProps<typeof ColorPicker.View>, "children" | "format"> & {
    format: ColorPickerViewProps["format"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
