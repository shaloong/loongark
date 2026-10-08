import { SvelteComponent, type ComponentProps } from "svelte";
import { Steps } from "@ark-ui/svelte/steps";

export default class LoongArkStepsTrigger extends SvelteComponent<
  Omit<ComponentProps<typeof Steps.Trigger>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
