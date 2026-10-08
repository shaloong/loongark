import { SvelteComponent, type ComponentProps } from "svelte";
import type { StepsContentProps } from "@ark-ui/svelte/steps";
import { Steps } from "@ark-ui/svelte/steps";

export default class LoongArkStepsContent extends SvelteComponent<
  Omit<ComponentProps<typeof Steps.Content>, "children" | "index"> & {
    index: StepsContentProps["index"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
