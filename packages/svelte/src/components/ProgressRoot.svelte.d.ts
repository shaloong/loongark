import { SvelteComponent, type ComponentProps } from "svelte";
import { Progress } from "@ark-ui/svelte/progress";
import type { ProgressRootProps } from "@ark-ui/svelte/progress";
import type { ProgressOrientation, ProgressSize } from "@loongark/primitives";

export default class LoongArkProgressRoot extends SvelteComponent<
  Omit<
    ComponentProps<typeof Progress.Root>,
    | "children"
    | "size"
    | "orientation"
    | "value"
    | "defaultValue"
    | "min"
    | "max"
    | "translations"
    | "onValueChange"
  > & {
    size?: ProgressSize;
    orientation?: ProgressOrientation;
    value?: ProgressRootProps["value"];
    defaultValue?: ProgressRootProps["defaultValue"];
    min?: ProgressRootProps["min"];
    max?: ProgressRootProps["max"];
    translations?: ProgressRootProps["translations"];
    onValueChange?: ProgressRootProps["onValueChange"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
