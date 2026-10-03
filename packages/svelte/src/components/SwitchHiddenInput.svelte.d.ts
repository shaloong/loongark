import { SvelteComponent, type ComponentProps } from "svelte";
import { Switch } from "@ark-ui/svelte/switch";

export default class LoongArkSwitchHiddenInput extends SvelteComponent<
  Omit<ComponentProps<typeof Switch.HiddenInput>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
