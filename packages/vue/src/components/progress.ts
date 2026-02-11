/**
 * Progress component - Vue wrapper.
 * Uses Ark UI Progress with data attributes for styling.
 */
import { defineComponent, h, type PropType } from "vue";
import { Progress as ArkProgress } from "@ark-ui/vue/progress";
import type { ProgressOrientation, ProgressSize } from "@loongark/primitives";

export interface ProgressValueChangeDetails {
  value: number;
}

export const LoongArkProgressRoot = defineComponent({
  name: "LoongArkProgressRoot",
  props: {
    size: {
      type: String as PropType<ProgressSize>,
      default: "md",
    },
    orientation: {
      type: String as PropType<ProgressOrientation>,
      default: "horizontal",
    },
    value: {
      type: Number as PropType<number>,
    },
    defaultValue: {
      type: Number as PropType<number>,
    },
    min: {
      type: Number as PropType<number>,
    },
    max: {
      type: Number as PropType<number>,
    },
    translations: {
      type: Object as PropType<any>,
    },
    onValueChange: {
      type: Function as PropType<(details: ProgressValueChangeDetails) => void>,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ArkProgress.Root,
        {
          ...attrs,
          ...props,
          "data-scope": "progress",
          "data-part": "root",
          "data-size": props.size,
          "data-orientation": props.orientation,
        },
        slots
      );
  },
});

export const LoongArkProgressLabel = defineComponent({
  name: "LoongArkProgressLabel",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkProgress.Label,
        {
          ...attrs,
          "data-scope": "progress",
          "data-part": "label",
        },
        slots
      );
  },
});

export const LoongArkProgressTrack = defineComponent({
  name: "LoongArkProgressTrack",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkProgress.Track,
        {
          ...attrs,
          "data-scope": "progress",
          "data-part": "track",
        },
        slots
      );
  },
});

export const LoongArkProgressRange = defineComponent({
  name: "LoongArkProgressRange",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkProgress.Range,
        {
          ...attrs,
          "data-scope": "progress",
          "data-part": "range",
        },
        slots
      );
  },
});

export const LoongArkProgressValueText = defineComponent({
  name: "LoongArkProgressValueText",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkProgress.ValueText,
        {
          ...attrs,
          "data-scope": "progress",
          "data-part": "value-text",
        },
        slots
      );
  },
});

export const LoongArkProgressView = defineComponent({
  name: "LoongArkProgressView",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkProgress.View,
        {
          ...attrs,
          "data-scope": "progress",
          "data-part": "view",
        },
        slots
      );
  },
});

export const LoongArkProgressCircle = defineComponent({
  name: "LoongArkProgressCircle",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkProgress.Circle,
        {
          ...attrs,
          "data-scope": "progress",
          "data-part": "circle",
        },
        slots
      );
  },
});

export const LoongArkProgressCircleTrack = defineComponent({
  name: "LoongArkProgressCircleTrack",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkProgress.CircleTrack,
        {
          ...attrs,
          "data-scope": "progress",
          "data-part": "circle-track",
        },
        slots
      );
  },
});

export const LoongArkProgressCircleRange = defineComponent({
  name: "LoongArkProgressCircleRange",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkProgress.CircleRange,
        {
          ...attrs,
          "data-scope": "progress",
          "data-part": "circle-range",
        },
        slots
      );
  },
});
