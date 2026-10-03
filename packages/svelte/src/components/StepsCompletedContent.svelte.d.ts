import { SvelteComponent, type ComponentProps } from "svelte";
import { Steps } from "@ark-ui/svelte/steps";

export default class LoongArkStepsCompletedContent extends SvelteComponent<
  Omit<ComponentProps<typeof Steps.CompletedContent>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
