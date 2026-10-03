import { SvelteComponent, type ComponentProps } from "svelte";
import { Menu } from "@ark-ui/svelte/menu";

export default class LoongArkMenuRadioItemGroup extends SvelteComponent<
  Omit<ComponentProps<typeof Menu.RadioItemGroup>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
