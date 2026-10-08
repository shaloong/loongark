import { SvelteComponent, type ComponentProps } from "svelte";
import { Toggle } from "@ark-ui/svelte/toggle";

export default class LoongArkToggleIndicator extends SvelteComponent<
  Omit<ComponentProps<typeof Toggle.Indicator>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
