import { SvelteComponent, type ComponentProps } from "svelte";
import { Tabs } from "@ark-ui/svelte/tabs";
import type { TabContentProps } from "@ark-ui/svelte/tabs";

export default class LoongArkTabsContent extends SvelteComponent<
  Omit<ComponentProps<typeof Tabs.Content>, "children" | "value"> & {
    value: TabContentProps["value"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
