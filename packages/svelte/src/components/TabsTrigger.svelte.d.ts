import { SvelteComponent, type ComponentProps } from "svelte";
import { Tabs } from "@ark-ui/svelte/tabs";
import type { TabTriggerProps } from "@ark-ui/svelte/tabs";

export default class LoongArkTabsTrigger extends SvelteComponent<
  Omit<
    ComponentProps<typeof Tabs.Trigger>,
    "children" | "value" | "disabled"
  > & {
    value: TabTriggerProps["value"];
    disabled?: TabTriggerProps["disabled"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
