import { SvelteComponent, type ComponentProps } from "svelte";
import { Menu } from "@ark-ui/svelte/menu";
import type { MenuContextTriggerProps } from "@ark-ui/svelte/menu";

export default class LoongArkMenuContextTrigger extends SvelteComponent<
  Omit<
    ComponentProps<typeof Menu.ContextTrigger>,
    "children" | "asChild" | "id"
  > & {
    asChild?: MenuContextTriggerProps["asChild"] | undefined;
    id?: MenuContextTriggerProps["id"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
