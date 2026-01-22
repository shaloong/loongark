/**
 * Slider component - Vue wrapper
 * Based on Ark UI Slider with data-scope/data-part bindings
 */
import { defineComponent, h, type PropType } from "vue";
import { Slider as ArkSlider } from "@ark-ui/vue/slider";
import type { SliderOrientation, SliderSize } from "@loongark/primitives";

export interface SliderValueChangeDetails {
  value: number[];
}

export interface SliderFocusChangeDetails {
  focusedIndex: number;
  value: number[];
}

export const LoongArkSliderRoot = defineComponent({
  name: "LoongArkSliderRoot",
  props: {
    size: {
      type: String as PropType<SliderSize>,
      default: "md",
    },
    orientation: {
      type: String as PropType<SliderOrientation>,
      default: "horizontal",
    },
    value: {
      type: Array as PropType<number[]>,
    },
    defaultValue: {
      type: Array as PropType<number[]>,
    },
    min: {
      type: Number as PropType<number>,
    },
    max: {
      type: Number as PropType<number>,
    },
    step: {
      type: Number as PropType<number>,
    },
    minStepsBetweenThumbs: {
      type: Number as PropType<number>,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
    },
    readOnly: {
      type: Boolean as PropType<boolean>,
    },
    invalid: {
      type: Boolean as PropType<boolean>,
    },
    name: {
      type: String as PropType<string>,
    },
    form: {
      type: String as PropType<string>,
    },
    id: {
      type: String as PropType<string>,
    },
    ids: {
      type: Object as PropType<any>,
    },
    origin: {
      type: String as PropType<"start" | "center" | "end">,
    },
    thumbAlignment: {
      type: String as PropType<"contain" | "center">,
    },
    thumbSize: {
      type: Object as PropType<{ width: number; height: number }>,
    },
    onValueChange: {
      type: Function as PropType<(details: SliderValueChangeDetails) => void>,
    },
    onValueChangeEnd: {
      type: Function as PropType<(details: SliderValueChangeDetails) => void>,
    },
    onFocusChange: {
      type: Function as PropType<(details: SliderFocusChangeDetails) => void>,
    },
    getAriaValueText: {
      type: Function as PropType<(details: { value: number; index: number }) => string>,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ArkSlider.Root,
        {
          ...attrs,
          ...props,
          orientation: props.orientation,
          "data-scope": "slider",
          "data-part": "root",
          "data-size": props.size,
          "data-orientation": props.orientation,
        },
        slots
      );
  },
});

export const LoongArkSliderLabel = defineComponent({
  name: "LoongArkSliderLabel",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkSlider.Label,
        {
          ...attrs,
          "data-scope": "slider",
          "data-part": "label",
        },
        slots
      );
  },
});

export const LoongArkSliderValueText = defineComponent({
  name: "LoongArkSliderValueText",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkSlider.ValueText,
        {
          ...attrs,
          "data-scope": "slider",
          "data-part": "value-text",
        },
        slots
      );
  },
});

export const LoongArkSliderControl = defineComponent({
  name: "LoongArkSliderControl",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkSlider.Control,
        {
          ...attrs,
          "data-scope": "slider",
          "data-part": "control",
        },
        slots
      );
  },
});

export const LoongArkSliderTrack = defineComponent({
  name: "LoongArkSliderTrack",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkSlider.Track,
        {
          ...attrs,
          "data-scope": "slider",
          "data-part": "track",
        },
        slots
      );
  },
});

export const LoongArkSliderRange = defineComponent({
  name: "LoongArkSliderRange",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkSlider.Range,
        {
          ...attrs,
          "data-scope": "slider",
          "data-part": "range",
        },
        slots
      );
  },
});

export const LoongArkSliderThumb = defineComponent({
  name: "LoongArkSliderThumb",
  props: {
    index: {
      type: Number as PropType<number>,
      default: 0,
    },
    name: {
      type: String as PropType<string>,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ArkSlider.Thumb,
        {
          ...attrs,
          index: props.index,
          name: props.name,
          "data-scope": "slider",
          "data-part": "thumb",
        },
        slots
      );
  },
});

export const LoongArkSliderMarkerGroup = defineComponent({
  name: "LoongArkSliderMarkerGroup",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkSlider.MarkerGroup,
        {
          ...attrs,
          "data-scope": "slider",
          "data-part": "marker-group",
        },
        slots
      );
  },
});

export const LoongArkSliderMarker = defineComponent({
  name: "LoongArkSliderMarker",
  props: {
    value: {
      type: Number as PropType<number>,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ArkSlider.Marker,
        {
          ...attrs,
          value: props.value,
          "data-scope": "slider",
          "data-part": "marker",
        },
        slots
      );
  },
});

export const LoongArkSliderDraggingIndicator = defineComponent({
  name: "LoongArkSliderDraggingIndicator",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkSlider.DraggingIndicator,
        {
          ...attrs,
          "data-scope": "slider",
          "data-part": "dragging-indicator",
        },
        slots
      );
  },
});

export const LoongArkSliderHiddenInput = defineComponent({
  name: "LoongArkSliderHiddenInput",
  setup(_, { attrs }) {
    return () =>
      h(ArkSlider.HiddenInput, {
        ...attrs,
        "data-scope": "slider",
        "data-part": "hidden-input",
      });
  },
});
