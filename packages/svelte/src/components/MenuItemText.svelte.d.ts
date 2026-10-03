import { SvelteComponent, type ComponentProps } from "svelte";
import { Menu } from "@ark-ui/svelte/menu";

export default class LoongArkMenuItemText extends SvelteComponent<
  Omit<ComponentProps<typeof Menu.ItemText>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
