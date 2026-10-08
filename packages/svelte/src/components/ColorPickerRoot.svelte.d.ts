import { SvelteComponent, type ComponentProps } from "svelte";
import { ColorPicker } from "@ark-ui/svelte/color-picker";
import type { ColorPickerRootProps } from "@ark-ui/svelte/color-picker";
import type { ColorPickerSize } from "@loongark/primitives";

export default class LoongArkColorPickerRoot extends SvelteComponent<
  Omit<ComponentProps<typeof ColorPicker.Root>, "children" | "size"> & {
    size?: ColorPickerSize;
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
