import { SvelteComponent, type ComponentProps } from "svelte";
import { Menu } from "@ark-ui/svelte/menu";

export default class LoongArkMenuItemGroupLabel extends SvelteComponent<
  Omit<ComponentProps<typeof Menu.ItemGroupLabel>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
