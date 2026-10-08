import { SvelteComponent, type ComponentProps } from "svelte";
import { CheckboxControl } from "@ark-ui/svelte/checkbox";
import type { CheckboxSize } from "@loongark/primitives";

export default class LoongArkCheckboxControl extends SvelteComponent<
  Omit<ComponentProps<typeof CheckboxControl>, "children" | "size"> & {
    size?: CheckboxSize;
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
