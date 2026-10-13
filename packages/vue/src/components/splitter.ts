
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticSplitterStyles } from "@loongark/primitives/automatic-styles/splitter";
import { renderPart } from "../render-part";
/**
 * Splitter component - Vue wrapper.
 * Uses Ark UI Splitter with data attributes for styling.
 */
import { defineComponent, h, type PropType } from "vue";
import { Splitter as ArkSplitter } from "@ark-ui/vue/splitter";
import type { SplitterSize } from "@loongark/primitives";

export const LoongArkSplitterRoot = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkSplitterRoot",
  props: {
    size: {
      type: String as PropType<SplitterSize>,
      default: "md",
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkSplitter.Root,
        {
          ...attrs,
          ...props,
          "data-scope": "splitter",
          "data-part": "root",
          "data-size": props.size,
        },
        slots,
      );
  },
}), lkAutomaticSplitterStyles);

export const LoongArkSplitterPanel = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkSplitterPanel",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkSplitter.Panel,
        {
          ...attrs,
          "data-scope": "splitter",
          "data-part": "panel",
        },
        slots,
      );
  },
}), lkAutomaticSplitterStyles);

export const LoongArkSplitterResizeTrigger = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkSplitterResizeTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkSplitter.ResizeTrigger,
        {
          "aria-label": "Resize panels",
          ...attrs,
          "data-scope": "splitter",
          "data-part": "resize-trigger",
        },
        slots,
      );
  },
}), lkAutomaticSplitterStyles);

export const LoongArkSplitterResizeTriggerIndicator = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkSplitterResizeTriggerIndicator",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkSplitter.ResizeTriggerIndicator,
        {
          ...attrs,
          "data-scope": "splitter",
          "data-part": "resize-trigger-indicator",
        },
        slots,
      );
  },
}), lkAutomaticSplitterStyles);
