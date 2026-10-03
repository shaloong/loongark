import { SvelteComponent, type ComponentProps } from "svelte";
import { Steps } from "@ark-ui/svelte/steps";
import type { StepsRootProps } from "@ark-ui/svelte/steps";
import type { StepsOrientation, StepsSize } from "@loongark/primitives";

export default class LoongArkStepsRoot extends SvelteComponent<
  Omit<
    ComponentProps<typeof Steps.Root>,
    | "children"
    | "size"
    | "orientation"
    | "step"
    | "defaultStep"
    | "count"
    | "linear"
    | "onStepChange"
  > & {
    size?: StepsSize;
    orientation?: StepsOrientation;
    step?: StepsRootProps["step"];
    defaultStep?: StepsRootProps["defaultStep"];
    count?: StepsRootProps["count"];
    linear?: StepsRootProps["linear"];
    onStepChange?: StepsRootProps["onStepChange"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
