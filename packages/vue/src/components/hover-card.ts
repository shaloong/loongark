
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticHoverCardStyles } from "@loongark/primitives/automatic-styles/hover-card";
import { renderPart } from "../render-part";
/**
 * Hover Card component - Vue wrapper.
 * Uses Ark UI Hover Card with data attributes for styling.
 */
import { defineComponent, h, type PropType } from "vue";
import { HoverCard as ArkHoverCard } from "@ark-ui/vue/hover-card";
import type { HoverCardSize } from "@loongark/primitives";

export const LoongArkHoverCardRoot = /*#__PURE__*/ withAutomaticStyles(defineComponent({
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
}), lkAutomaticHoverCardStyles);

export const LoongArkHoverCardTrigger = /*#__PURE__*/ withAutomaticStyles(defineComponent({
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
}), lkAutomaticHoverCardStyles);

export const LoongArkHoverCardPositioner = /*#__PURE__*/ withAutomaticStyles(defineComponent({
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
}), lkAutomaticHoverCardStyles);

export const LoongArkHoverCardContent = /*#__PURE__*/ withAutomaticStyles(defineComponent({
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
}), lkAutomaticHoverCardStyles);

export const LoongArkHoverCardArrow = /*#__PURE__*/ withAutomaticStyles(defineComponent({
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
}), lkAutomaticHoverCardStyles);

export const LoongArkHoverCardArrowTip = /*#__PURE__*/ withAutomaticStyles(defineComponent({
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
}), lkAutomaticHoverCardStyles);
