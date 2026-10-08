import { SvelteComponent, type ComponentProps } from "svelte";
import { Menu } from "@ark-ui/svelte/menu";

export default class LoongArkMenuArrowTip extends SvelteComponent<
  Omit<ComponentProps<typeof Menu.ArrowTip>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
