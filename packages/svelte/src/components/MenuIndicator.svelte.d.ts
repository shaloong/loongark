import { SvelteComponent, type ComponentProps } from "svelte";
import { Menu } from "@ark-ui/svelte/menu";

export default class LoongArkMenuIndicator extends SvelteComponent<
  Omit<ComponentProps<typeof Menu.Indicator>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
