import { SvelteComponent, type ComponentProps } from "svelte";
import { Steps } from "@ark-ui/svelte/steps";

export default class LoongArkStepsList extends SvelteComponent<
  Omit<ComponentProps<typeof Steps.List>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
