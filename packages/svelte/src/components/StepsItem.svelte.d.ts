import { SvelteComponent, type ComponentProps } from "svelte";
import { Steps } from "@ark-ui/svelte/steps";
import type { StepsItemProps } from "@ark-ui/svelte/steps";

export default class LoongArkStepsItem extends SvelteComponent<
  Omit<ComponentProps<typeof Steps.Item>, "children" | "index"> & {
    index: StepsItemProps["index"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
