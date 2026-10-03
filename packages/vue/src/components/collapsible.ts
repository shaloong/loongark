import type { CollapsibleRootProps as NativeCollapsibleRootProps } from "@ark-ui/vue/collapsible";
import { renderPart } from "../render-part";
/**
 * Collapsible component - Vue wrapper.
 * Based on Ark UI Collapsible.
 */
import { defineComponent, h, type PropType } from "vue";
import { Collapsible as ArkCollapsible } from "@ark-ui/vue/collapsible";
import type { CollapsibleSize } from "@loongark/primitives";

export interface CollapsibleOpenChangeDetails {
  open: boolean;
}

export const LoongArkCollapsibleRoot = defineComponent({
  name: "LoongArkCollapsibleRoot",
  props: {
    size: {
      type: String as PropType<CollapsibleSize>,
      default: "md",
    },
    open: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    defaultOpen: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    collapsedHeight: {
      type: Number as PropType<number>,
    },
    collapsedWidth: {
      type: Number as PropType<number>,
    },
    id: {
      type: String as PropType<string>,
    },
    ids: {
      type: Object as PropType<NativeCollapsibleRootProps["ids"]>,
    },
    lazyMount: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    unmountOnExit: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    onOpenChange: {
      type: Function as PropType<
        (details: CollapsibleOpenChangeDetails) => void
      >,
    },
    onExitComplete: {
      type: Function as PropType<() => void>,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkCollapsible.Root,
        {
          ...attrs,
          ...props,
          "data-scope": "collapsible",
          "data-part": "root",
          "data-size": props.size,
        },
        slots,
      );
  },
});

export const LoongArkCollapsibleTrigger = defineComponent({
  name: "LoongArkCollapsibleTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkCollapsible.Trigger,
        {
          ...attrs,
          "data-scope": "collapsible",
          "data-part": "trigger",
        },
        slots,
      );
  },
});

export const LoongArkCollapsibleContent = defineComponent({
  name: "LoongArkCollapsibleContent",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkCollapsible.Content,
        {
          ...attrs,
          "data-scope": "collapsible",
          "data-part": "content",
        },
        slots,
      );
  },
});

export const LoongArkCollapsibleIndicator = defineComponent({
  name: "LoongArkCollapsibleIndicator",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkCollapsible.Indicator,
        {
          ...attrs,
          "data-scope": "collapsible",
          "data-part": "indicator",
        },
        slots,
      );
  },
});
