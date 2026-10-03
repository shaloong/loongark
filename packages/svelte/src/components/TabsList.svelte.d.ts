import { SvelteComponent, type ComponentProps } from "svelte";
import { Tabs } from "@ark-ui/svelte/tabs";

export default class LoongArkTabsList extends SvelteComponent<
  Omit<ComponentProps<typeof Tabs.List>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
