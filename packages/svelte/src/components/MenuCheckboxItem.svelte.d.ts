import { SvelteComponent, type ComponentProps } from "svelte";
import type { MenuCheckboxItemProps } from "@ark-ui/svelte/menu";
import { Menu } from "@ark-ui/svelte/menu";

export default class LoongArkMenuCheckboxItem extends SvelteComponent<
  Omit<
    ComponentProps<typeof Menu.CheckboxItem>,
    "children" | "value" | "checked"
  > & {
    value: MenuCheckboxItemProps["value"];
    checked: MenuCheckboxItemProps["checked"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
