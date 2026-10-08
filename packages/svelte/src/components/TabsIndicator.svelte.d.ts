import { SvelteComponent, type ComponentProps } from "svelte";
import { Tabs } from "@ark-ui/svelte/tabs";

export default class LoongArkTabsIndicator extends SvelteComponent<
  Omit<ComponentProps<typeof Tabs.Indicator>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
