import { SvelteComponent, type ComponentProps } from "svelte";
import { Steps } from "@ark-ui/svelte/steps";

export default class LoongArkStepsIndicator extends SvelteComponent<
  Omit<ComponentProps<typeof Steps.Indicator>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
