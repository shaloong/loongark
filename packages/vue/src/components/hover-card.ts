import { renderPart } from "../render-part";
/**
 * Hover Card component - Vue wrapper.
 * Uses Ark UI Hover Card with data attributes for styling.
 */
import { defineComponent, h, type PropType } from "vue";
import { HoverCard as ArkHoverCard } from "@ark-ui/vue/hover-card";
import type { HoverCardSize } from "@loongark/primitives";

export const LoongArkHoverCardRoot = defineComponent({
  name: "LoongArkHoverCardRoot",
  props: {
    size: {
      type: String as PropType<HoverCardSize>,
      default: "md",
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkHoverCard.Root,
        {
          ...attrs,
          ...props,
          "data-scope": "hover-card",
          "data-part": "root",
          "data-size": props.size,
        },
        slots,
      );
  },
});

export const LoongArkHoverCardTrigger = defineComponent({
  name: "LoongArkHoverCardTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkHoverCard.Trigger,
        {
          ...attrs,
          "data-scope": "hover-card",
          "data-part": "trigger",
        },
        slots,
      );
  },
});

export const LoongArkHoverCardPositioner = defineComponent({
  name: "LoongArkHoverCardPositioner",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkHoverCard.Positioner,
        {
          ...attrs,
          "data-scope": "hover-card",
          "data-part": "positioner",
        },
        slots,
      );
  },
});

export const LoongArkHoverCardContent = defineComponent({
  name: "LoongArkHoverCardContent",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkHoverCard.Content,
        {
          ...attrs,
          "data-scope": "hover-card",
          "data-part": "content",
        },
        slots,
      );
  },
});

export const LoongArkHoverCardArrow = defineComponent({
  name: "LoongArkHoverCardArrow",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkHoverCard.Arrow,
        {
          ...attrs,
          "data-scope": "hover-card",
          "data-part": "arrow",
        },
        slots,
      );
  },
});

export const LoongArkHoverCardArrowTip = defineComponent({
  name: "LoongArkHoverCardArrowTip",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkHoverCard.ArrowTip,
        {
          ...attrs,
          "data-scope": "hover-card",
          "data-part": "arrow-tip",
        },
        slots,
      );
  },
});
