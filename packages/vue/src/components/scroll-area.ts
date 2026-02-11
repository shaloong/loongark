/**
 * Scroll Area component - Vue wrapper.
 * Uses Ark UI Scroll Area with data attributes for styling.
 */
import { defineComponent, h, type PropType } from "vue";
import { ScrollArea as ArkScrollArea } from "@ark-ui/vue/scroll-area";
import type { ScrollAreaSize } from "@loongark/primitives";

export const LoongArkScrollAreaRoot = defineComponent({
  name: "LoongArkScrollAreaRoot",
  props: {
    size: {
      type: String as PropType<ScrollAreaSize>,
      default: "md",
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ArkScrollArea.Root,
        {
          ...attrs,
          ...props,
          "data-scope": "scroll-area",
          "data-part": "root",
          "data-size": props.size,
        },
        slots
      );
  },
});

export const LoongArkScrollAreaViewport = defineComponent({
  name: "LoongArkScrollAreaViewport",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkScrollArea.Viewport,
        {
          ...attrs,
          "data-scope": "scroll-area",
          "data-part": "viewport",
        },
        slots
      );
  },
});

export const LoongArkScrollAreaContent = defineComponent({
  name: "LoongArkScrollAreaContent",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkScrollArea.Content,
        {
          ...attrs,
          "data-scope": "scroll-area",
          "data-part": "content",
        },
        slots
      );
  },
});

export const LoongArkScrollAreaScrollbar = defineComponent({
  name: "LoongArkScrollAreaScrollbar",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkScrollArea.Scrollbar,
        {
          ...attrs,
          "data-scope": "scroll-area",
          "data-part": "scrollbar",
        },
        slots
      );
  },
});

export const LoongArkScrollAreaThumb = defineComponent({
  name: "LoongArkScrollAreaThumb",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkScrollArea.Thumb,
        {
          ...attrs,
          "data-scope": "scroll-area",
          "data-part": "thumb",
        },
        slots
      );
  },
});

export const LoongArkScrollAreaCorner = defineComponent({
  name: "LoongArkScrollAreaCorner",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkScrollArea.Corner,
        {
          ...attrs,
          "data-scope": "scroll-area",
          "data-part": "corner",
        },
        slots
      );
  },
});
