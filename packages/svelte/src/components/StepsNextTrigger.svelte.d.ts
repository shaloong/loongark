import { SvelteComponent, type ComponentProps } from "svelte";
import { Steps } from "@ark-ui/svelte/steps";

export default class LoongArkStepsNextTrigger extends SvelteComponent<
  Omit<ComponentProps<typeof Steps.NextTrigger>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
