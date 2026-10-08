import { SvelteComponent, type ComponentProps } from "svelte";
import { NumberInput } from "@ark-ui/svelte/number-input";

export default class LoongArkNumberInputScrubber extends SvelteComponent<
  Omit<ComponentProps<typeof NumberInput.Scrubber>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
