import { SvelteComponent, type ComponentProps } from "svelte";
import { Menu } from "@ark-ui/svelte/menu";
import type { MenuTriggerProps } from "@ark-ui/svelte/menu";

export default class LoongArkMenuTrigger extends SvelteComponent<
  Omit<
    ComponentProps<typeof Menu.Trigger>,
    "children" | "asChild" | "id" | "disabled"
  > & {
    asChild?: MenuTriggerProps["asChild"] | undefined;
    id?: MenuTriggerProps["id"];
    disabled?: MenuTriggerProps["disabled"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
