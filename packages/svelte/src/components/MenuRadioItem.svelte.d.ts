import { SvelteComponent, type ComponentProps } from "svelte";
import type { MenuRadioItemProps } from "@ark-ui/svelte/menu";
import { Menu } from "@ark-ui/svelte/menu";

export default class LoongArkMenuRadioItem extends SvelteComponent<
  Omit<ComponentProps<typeof Menu.RadioItem>, "children" | "value"> & {
    value: MenuRadioItemProps["value"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
