
import { withAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
import { styles as lkAutomaticProgressStyles } from "@shaloong/loongark-primitives/automatic-styles/progress";
import type { ProgressRootProps as NativeProgressRootProps } from "@ark-ui/vue/progress";
import { renderPart } from "../render-part";
/**
 * Progress component - Vue wrapper.
 * Uses Ark UI Progress with data attributes for styling.
 */
import { defineComponent, h, type PropType } from "vue";
import { Progress as ArkProgress } from "@ark-ui/vue/progress";
import type { ProgressOrientation, ProgressSize } from "@shaloong/loongark-primitives";

export interface ProgressValueChangeDetails {
  value: number;
}

export const LoongArkProgressRoot = /*#__PURE__*/ withAutomaticStyles(defineComponent({
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
      type: Object as PropType<NativeProgressRootProps["translations"]>,
    },
    onValueChange: {
      type: Function as PropType<(details: ProgressValueChangeDetails) => void>,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkProgress.Root,
        {
          ...attrs,
          ...props,
          "data-scope": "progress",
          "data-part": "root",
          "data-size": props.size,
          "data-orientation": props.orientation,
        },
        slots,
      );
  },
}), lkAutomaticProgressStyles);

export const LoongArkProgressLabel = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkProgressLabel",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkProgress.Label,
        {
          ...attrs,
          "data-scope": "progress",
          "data-part": "label",
        },
        slots,
      );
  },
}), lkAutomaticProgressStyles);

export const LoongArkProgressTrack = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkProgressTrack",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkProgress.Track,
        {
          ...attrs,
          "data-scope": "progress",
          "data-part": "track",
        },
        slots,
      );
  },
}), lkAutomaticProgressStyles);

export const LoongArkProgressRange = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkProgressRange",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkProgress.Range,
        {
          ...attrs,
          "data-scope": "progress",
          "data-part": "range",
        },
        slots,
      );
  },
}), lkAutomaticProgressStyles);

export const LoongArkProgressValueText = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkProgressValueText",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkProgress.ValueText,
        {
          ...attrs,
          "data-scope": "progress",
          "data-part": "value-text",
        },
        slots,
      );
  },
}), lkAutomaticProgressStyles);

export const LoongArkProgressView = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkProgressView",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkProgress.View,
        {
          ...attrs,
          "data-scope": "progress",
          "data-part": "view",
        },
        slots,
      );
  },
}), lkAutomaticProgressStyles);

export const LoongArkProgressCircle = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkProgressCircle",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkProgress.Circle,
        {
          ...attrs,
          "data-scope": "progress",
          "data-part": "circle",
        },
        slots,
      );
  },
}), lkAutomaticProgressStyles);

export const LoongArkProgressCircleTrack = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkProgressCircleTrack",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkProgress.CircleTrack,
        {
          ...attrs,
          "data-scope": "progress",
          "data-part": "circle-track",
        },
        slots,
      );
  },
}), lkAutomaticProgressStyles);

export const LoongArkProgressCircleRange = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkProgressCircleRange",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkProgress.CircleRange,
        {
          ...attrs,
          "data-scope": "progress",
          "data-part": "circle-range",
        },
        slots,
      );
  },
}), lkAutomaticProgressStyles);
