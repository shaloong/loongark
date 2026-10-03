import { SvelteComponent, type ComponentProps } from "svelte";
import { Accordion } from "@ark-ui/svelte/accordion";
import type { AccordionItemProps } from "@ark-ui/svelte/accordion";

export default class LoongArkAccordionItem extends SvelteComponent<
  Omit<
    ComponentProps<typeof Accordion.Item>,
    "children" | "value" | "disabled"
  > & {
    value: AccordionItemProps["value"];
    disabled?: AccordionItemProps["disabled"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
