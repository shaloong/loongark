import { SvelteComponent, type ComponentProps } from "svelte";
import { Collapsible } from "@ark-ui/svelte/collapsible";

export default class LoongArkCollapsibleTrigger extends SvelteComponent<
  Omit<ComponentProps<typeof Collapsible.Trigger>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
