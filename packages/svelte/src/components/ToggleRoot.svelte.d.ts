import { SvelteComponent, type ComponentProps } from "svelte";
import { Toggle } from "@ark-ui/svelte/toggle";
import type { ToggleRootProps } from "@ark-ui/svelte/toggle";
import type { ToggleSize } from "@loongark/primitives";

export default class LoongArkToggleRoot extends SvelteComponent<
  Omit<
    ComponentProps<typeof Toggle.Root>,
    | "children"
    | "size"
    | "pressed"
    | "defaultPressed"
    | "disabled"
    | "onPressedChange"
  > & {
    size?: ToggleSize;
    pressed?: ToggleRootProps["pressed"];
    defaultPressed?: ToggleRootProps["defaultPressed"];
    disabled?: ToggleRootProps["disabled"];
    onPressedChange?: ToggleRootProps["onPressedChange"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
