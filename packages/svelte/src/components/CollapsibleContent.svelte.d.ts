import { SvelteComponent, type ComponentProps } from "svelte";
import { Collapsible } from "@ark-ui/svelte/collapsible";

export default class LoongArkCollapsibleContent extends SvelteComponent<
  Omit<ComponentProps<typeof Collapsible.Content>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
