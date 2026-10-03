import { SvelteComponent, type ComponentProps } from "svelte";
import { Accordion } from "@ark-ui/svelte/accordion";
import type { AccordionRootProps } from "@ark-ui/svelte/accordion";
import type { AccordionOrientation, AccordionSize } from "@loongark/primitives";

export default class LoongArkAccordionRoot extends SvelteComponent<
  Omit<
    ComponentProps<typeof Accordion.Root>,
    | "children"
    | "size"
    | "orientation"
    | "value"
    | "defaultValue"
    | "multiple"
    | "collapsible"
    | "disabled"
    | "id"
    | "ids"
    | "onValueChange"
    | "onFocusChange"
  > & {
    size?: AccordionSize;
    orientation?: AccordionOrientation;
    value?: AccordionRootProps["value"];
    defaultValue?: AccordionRootProps["defaultValue"];
    multiple?: AccordionRootProps["multiple"];
    collapsible?: AccordionRootProps["collapsible"];
    disabled?: AccordionRootProps["disabled"];
    id?: AccordionRootProps["id"];
    ids?: AccordionRootProps["ids"];
    onValueChange?: AccordionRootProps["onValueChange"];
    onFocusChange?: AccordionRootProps["onFocusChange"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
