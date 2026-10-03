import { SvelteComponent, type ComponentProps } from "svelte";
import { Menu } from "@ark-ui/svelte/menu";

export default class LoongArkMenuPositioner extends SvelteComponent<
  Omit<ComponentProps<typeof Menu.Positioner>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
