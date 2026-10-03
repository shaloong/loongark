import { SvelteComponent, type ComponentProps } from "svelte";
import { Menu } from "@ark-ui/svelte/menu";

export default class LoongArkMenuContent extends SvelteComponent<
  Omit<ComponentProps<typeof Menu.Content>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
