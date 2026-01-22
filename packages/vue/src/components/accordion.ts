/**
 * Accordion component - Vue wrapper.
 * Based on Ark UI Accordion.
 */
import { defineComponent, h, type PropType } from "vue";
import { Accordion as ArkAccordion } from "@ark-ui/vue/accordion";
import type { AccordionOrientation, AccordionSize } from "@loongark/primitives";

export interface AccordionValueChangeDetails {
  value: string[];
}

export interface AccordionFocusChangeDetails {
  value: string | null;
}

export const LoongArkAccordionRoot = defineComponent({
  name: "LoongArkAccordionRoot",
  props: {
    size: {
      type: String as PropType<AccordionSize>,
      default: "md",
    },
    orientation: {
      type: String as PropType<AccordionOrientation>,
      default: "vertical",
    },
    value: {
      type: Array as PropType<string[]>,
    },
    defaultValue: {
      type: Array as PropType<string[]>,
    },
    multiple: {
      type: Boolean as PropType<boolean>,
    },
    collapsible: {
      type: Boolean as PropType<boolean>,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
    },
    id: {
      type: String as PropType<string>,
    },
    ids: {
      type: Object as PropType<Record<string, unknown>>,
    },
    onValueChange: {
      type: Function as PropType<(details: AccordionValueChangeDetails) => void>,
    },
    onFocusChange: {
      type: Function as PropType<(details: AccordionFocusChangeDetails) => void>,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ArkAccordion.Root,
        {
          ...attrs,
          ...props,
          orientation: props.orientation,
          "data-scope": "accordion",
          "data-part": "root",
          "data-size": props.size,
          "data-orientation": props.orientation,
        },
        slots
      );
  },
});

export const LoongArkAccordionItem = defineComponent({
  name: "LoongArkAccordionItem",
  props: {
    value: {
      type: String as PropType<string>,
      required: true,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ArkAccordion.Item,
        {
          ...attrs,
          value: props.value,
          disabled: props.disabled,
          "data-scope": "accordion",
          "data-part": "item",
        },
        slots
      );
  },
});

export const LoongArkAccordionItemTrigger = defineComponent({
  name: "LoongArkAccordionItemTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkAccordion.ItemTrigger,
        {
          ...attrs,
          "data-scope": "accordion",
          "data-part": "item-trigger",
        },
        slots
      );
  },
});

export const LoongArkAccordionItemContent = defineComponent({
  name: "LoongArkAccordionItemContent",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkAccordion.ItemContent,
        {
          ...attrs,
          "data-scope": "accordion",
          "data-part": "item-content",
        },
        slots
      );
  },
});

export const LoongArkAccordionItemIndicator = defineComponent({
  name: "LoongArkAccordionItemIndicator",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkAccordion.ItemIndicator,
        {
          ...attrs,
          "data-scope": "accordion",
          "data-part": "item-indicator",
        },
        slots
      );
  },
});
