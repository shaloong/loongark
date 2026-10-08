import { SvelteComponent, type ComponentProps } from "svelte";
import { Accordion } from "@ark-ui/svelte/accordion";

export default class LoongArkAccordionItemContent extends SvelteComponent<
  Omit<ComponentProps<typeof Accordion.ItemContent>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
