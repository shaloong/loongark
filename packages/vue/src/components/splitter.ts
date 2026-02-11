/**
 * Splitter component - Vue wrapper.
 * Uses Ark UI Splitter with data attributes for styling.
 */
import { defineComponent, h, type PropType } from "vue";
import { Splitter as ArkSplitter } from "@ark-ui/vue/splitter";
import type { SplitterSize } from "@loongark/primitives";

export const LoongArkSplitterRoot = defineComponent({
  name: "LoongArkSplitterRoot",
  props: {
    size: {
      type: String as PropType<SplitterSize>,
      default: "md",
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ArkSplitter.Root,
        {
          ...attrs,
          ...props,
          "data-scope": "splitter",
          "data-part": "root",
          "data-size": props.size,
        },
        slots
      );
  },
});

export const LoongArkSplitterPanel = defineComponent({
  name: "LoongArkSplitterPanel",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkSplitter.Panel,
        {
          ...attrs,
          "data-scope": "splitter",
          "data-part": "panel",
        },
        slots
      );
  },
});

export const LoongArkSplitterResizeTrigger = defineComponent({
  name: "LoongArkSplitterResizeTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkSplitter.ResizeTrigger,
        {
          ...attrs,
          "data-scope": "splitter",
          "data-part": "resize-trigger",
        },
        slots
      );
  },
});

export const LoongArkSplitterResizeTriggerIndicator = defineComponent({
  name: "LoongArkSplitterResizeTriggerIndicator",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkSplitter.ResizeTriggerIndicator,
        {
          ...attrs,
          "data-scope": "splitter",
          "data-part": "resize-trigger-indicator",
        },
        slots
      );
  },
});
