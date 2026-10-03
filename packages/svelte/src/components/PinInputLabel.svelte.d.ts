import { SvelteComponent, type ComponentProps } from "svelte";
import { PinInput } from "@ark-ui/svelte/pin-input";

export default class LoongArkPinInputLabel extends SvelteComponent<
  Omit<ComponentProps<typeof PinInput.Label>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
