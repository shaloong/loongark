import { SvelteComponent, type ComponentProps } from "svelte";
import { Menu } from "@ark-ui/svelte/menu";

export default class LoongArkMenuArrow extends SvelteComponent<
  Omit<ComponentProps<typeof Menu.Arrow>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
