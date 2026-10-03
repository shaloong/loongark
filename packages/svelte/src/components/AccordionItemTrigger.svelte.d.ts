import { SvelteComponent, type ComponentProps } from "svelte";
import { Accordion } from "@ark-ui/svelte/accordion";

export default class LoongArkAccordionItemTrigger extends SvelteComponent<
  Omit<ComponentProps<typeof Accordion.ItemTrigger>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
