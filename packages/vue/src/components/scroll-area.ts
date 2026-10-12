
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticScrollAreaStyles } from "@loongark/primitives/automatic-styles/scroll-area";
import { renderPart } from "../render-part";
/**
 * Scroll Area component - Vue wrapper.
 * Uses Ark UI Scroll Area with data attributes for styling.
 */
import { defineComponent, h, type PropType } from "vue";
import { ScrollArea as ArkScrollArea } from "@ark-ui/vue/scroll-area";
import type { ScrollAreaSize } from "@loongark/primitives";

export const LoongArkScrollAreaRoot = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkScrollAreaRoot",
  props: {
    size: {
      type: String as PropType<ScrollAreaSize>,
      default: "md",
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkScrollArea.Root,
        {
          ...attrs,
          ...props,
          "data-scope": "scroll-area",
          "data-part": "root",
          "data-size": props.size,
        },
        slots,
      );
  },
}), lkAutomaticScrollAreaStyles);

export const LoongArkScrollAreaViewport = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkScrollAreaViewport",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkScrollArea.Viewport,
        {
          tabindex: 0,
          ...attrs,
          "data-scope": "scroll-area",
          "data-part": "viewport",
        },
        slots,
      );
  },
}), lkAutomaticScrollAreaStyles);

export const LoongArkScrollAreaContent = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkScrollAreaContent",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkScrollArea.Content,
        {
          ...attrs,
          "data-scope": "scroll-area",
          "data-part": "content",
        },
        slots,
      );
  },
}), lkAutomaticScrollAreaStyles);

export const LoongArkScrollAreaScrollbar = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkScrollAreaScrollbar",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkScrollArea.Scrollbar,
        {
          ...attrs,
          "data-scope": "scroll-area",
          "data-part": "scrollbar",
        },
        slots,
      );
  },
}), lkAutomaticScrollAreaStyles);

export const LoongArkScrollAreaThumb = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkScrollAreaThumb",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkScrollArea.Thumb,
        {
          ...attrs,
          "data-scope": "scroll-area",
          "data-part": "thumb",
        },
        slots,
      );
  },
}), lkAutomaticScrollAreaStyles);

export const LoongArkScrollAreaCorner = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkScrollAreaCorner",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkScrollArea.Corner,
        {
          ...attrs,
          "data-scope": "scroll-area",
          "data-part": "corner",
        },
        slots,
      );
  },
}), lkAutomaticScrollAreaStyles);
