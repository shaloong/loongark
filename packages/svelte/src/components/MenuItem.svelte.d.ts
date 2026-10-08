import { SvelteComponent, type ComponentProps } from "svelte";
import type { MenuItemProps } from "@ark-ui/svelte/menu";
import { Menu } from "@ark-ui/svelte/menu";

export default class LoongArkMenuItem extends SvelteComponent<
  Omit<ComponentProps<typeof Menu.Item>, "children" | "value"> & {
    value: MenuItemProps["value"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
