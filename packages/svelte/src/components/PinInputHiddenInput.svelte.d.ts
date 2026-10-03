import { SvelteComponent, type ComponentProps } from "svelte";
import { PinInput } from "@ark-ui/svelte/pin-input";

export default class LoongArkPinInputHiddenInput extends SvelteComponent<
  Omit<ComponentProps<typeof PinInput.HiddenInput>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
