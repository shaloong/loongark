import { SvelteComponent, type ComponentProps } from "svelte";
import { Steps } from "@ark-ui/svelte/steps";

export default class LoongArkStepsProgress extends SvelteComponent<
  Omit<ComponentProps<typeof Steps.Progress>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
