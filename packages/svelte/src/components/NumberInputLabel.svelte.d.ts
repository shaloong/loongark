import { SvelteComponent, type ComponentProps } from "svelte";
import { NumberInput } from "@ark-ui/svelte/number-input";

export default class LoongArkNumberInputLabel extends SvelteComponent<
  Omit<ComponentProps<typeof NumberInput.Label>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
