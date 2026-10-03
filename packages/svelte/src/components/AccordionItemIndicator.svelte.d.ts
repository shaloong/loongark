import { SvelteComponent, type ComponentProps } from "svelte";
import { Accordion } from "@ark-ui/svelte/accordion";

export default class LoongArkAccordionItemIndicator extends SvelteComponent<
  Omit<ComponentProps<typeof Accordion.ItemIndicator>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
