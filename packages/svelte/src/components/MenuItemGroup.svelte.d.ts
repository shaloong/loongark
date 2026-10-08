import { SvelteComponent, type ComponentProps } from "svelte";
import { Menu } from "@ark-ui/svelte/menu";

export default class LoongArkMenuItemGroup extends SvelteComponent<
  Omit<ComponentProps<typeof Menu.ItemGroup>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
