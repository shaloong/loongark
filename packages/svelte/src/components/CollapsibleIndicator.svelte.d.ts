import { SvelteComponent, type ComponentProps } from "svelte";
import { Collapsible } from "@ark-ui/svelte/collapsible";

export default class LoongArkCollapsibleIndicator extends SvelteComponent<
  Omit<ComponentProps<typeof Collapsible.Indicator>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
