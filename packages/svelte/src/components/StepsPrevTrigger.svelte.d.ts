import { SvelteComponent, type ComponentProps } from "svelte";
import { Steps } from "@ark-ui/svelte/steps";

export default class LoongArkStepsPrevTrigger extends SvelteComponent<
  Omit<ComponentProps<typeof Steps.PrevTrigger>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
