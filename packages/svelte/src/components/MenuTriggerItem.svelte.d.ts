import { SvelteComponent, type ComponentProps } from "svelte";
import { Menu } from "@ark-ui/svelte/menu";

export default class LoongArkMenuTriggerItem extends SvelteComponent<
  Omit<ComponentProps<typeof Menu.TriggerItem>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
