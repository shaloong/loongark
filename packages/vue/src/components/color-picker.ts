
import { withAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
import { styles as lkAutomaticColorPickerStyles } from "@shaloong/loongark-primitives/automatic-styles/color-picker";
import { renderPart } from "../render-part";
/**
 * Color Picker component - Vue wrapper.
 * Uses Ark UI Color Picker with data attributes for styling.
 */
import {
  resolveDynamicComponent,
  defineComponent,
  h,
  type PropType,
} from "vue";
import { ColorPicker as ArkColorPicker } from "@ark-ui/vue/color-picker";
import type { ColorPickerSize } from "@shaloong/loongark-primitives";

export const LoongArkColorPickerRoot = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkColorPickerRoot",
  props: {
    size: {
      type: String as PropType<ColorPickerSize>,
      default: "md",
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkColorPicker.Root,
        {
          ...attrs,
          ...props,
          "data-scope": "color-picker",
          "data-part": "root",
          "data-size": props.size,
        },
        slots,
      );
  },
}), lkAutomaticColorPickerStyles);

export const LoongArkColorPickerLabel = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkColorPickerLabel",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkColorPicker.Label,
        {
          ...attrs,
          "data-scope": "color-picker",
          "data-part": "label",
        },
        slots,
      );
  },
}), lkAutomaticColorPickerStyles);

export const LoongArkColorPickerControl = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkColorPickerControl",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkColorPicker.Control,
        {
          ...attrs,
          "data-scope": "color-picker",
          "data-part": "control",
        },
        slots,
      );
  },
}), lkAutomaticColorPickerStyles);

export const LoongArkColorPickerTrigger = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkColorPickerTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkColorPicker.Trigger,
        {
          ...attrs,
          "data-scope": "color-picker",
          "data-part": "trigger",
        },
        slots,
      );
  },
}), lkAutomaticColorPickerStyles);

export const LoongArkColorPickerPositioner = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkColorPickerPositioner",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkColorPicker.Positioner,
        {
          ...attrs,
          "data-scope": "color-picker",
          "data-part": "positioner",
        },
        slots,
      );
  },
}), lkAutomaticColorPickerStyles);

export const LoongArkColorPickerContent = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkColorPickerContent",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkColorPicker.Content,
        {
          ...attrs,
          "data-scope": "color-picker",
          "data-part": "content",
        },
        slots,
      );
  },
}), lkAutomaticColorPickerStyles);

export const LoongArkColorPickerView = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkColorPickerView",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkColorPicker.View,
        {
          ...attrs,
          "data-scope": "color-picker",
          "data-part": "view",
        },
        slots,
      );
  },
}), lkAutomaticColorPickerStyles);

export const LoongArkColorPickerArea = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkColorPickerArea",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkColorPicker.Area,
        {
          ...attrs,
          "data-scope": "color-picker",
          "data-part": "area",
        },
        slots,
      );
  },
}), lkAutomaticColorPickerStyles);

export const LoongArkColorPickerAreaBackground = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkColorPickerAreaBackground",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkColorPicker.AreaBackground,
        {
          ...attrs,
          "data-scope": "color-picker",
          "data-part": "area-background",
        },
        slots,
      );
  },
}), lkAutomaticColorPickerStyles);

export const LoongArkColorPickerAreaThumb = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkColorPickerAreaThumb",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkColorPicker.AreaThumb,
        {
          ...attrs,
          "data-scope": "color-picker",
          "data-part": "area-thumb",
        },
        slots,
      );
  },
}), lkAutomaticColorPickerStyles);

export const LoongArkColorPickerChannelSlider = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkColorPickerChannelSlider",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkColorPicker.ChannelSlider,
        {
          ...attrs,
          "data-scope": "color-picker",
          "data-part": "channel-slider",
        },
        slots,
      );
  },
}), lkAutomaticColorPickerStyles);

export const LoongArkColorPickerChannelSliderLabel = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkColorPickerChannelSliderLabel",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkColorPicker.ChannelSliderLabel,
        {
          ...attrs,
          "data-scope": "color-picker",
          "data-part": "channel-slider-label",
        },
        slots,
      );
  },
}), lkAutomaticColorPickerStyles);

export const LoongArkColorPickerChannelSliderTrack = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkColorPickerChannelSliderTrack",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkColorPicker.ChannelSliderTrack,
        {
          ...attrs,
          "data-scope": "color-picker",
          "data-part": "channel-slider-track",
        },
        slots,
      );
  },
}), lkAutomaticColorPickerStyles);

export const LoongArkColorPickerChannelSliderThumb = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkColorPickerChannelSliderThumb",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkColorPicker.ChannelSliderThumb,
        {
          ...attrs,
          "data-scope": "color-picker",
          "data-part": "channel-slider-thumb",
        },
        slots,
      );
  },
}), lkAutomaticColorPickerStyles);

export const LoongArkColorPickerChannelSliderValueText = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkColorPickerChannelSliderValueText",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkColorPicker.ChannelSliderValueText,
        {
          ...attrs,
          "data-scope": "color-picker",
          "data-part": "channel-slider-value-text",
        },
        slots,
      );
  },
}), lkAutomaticColorPickerStyles);

export const LoongArkColorPickerChannelInput = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkColorPickerChannelInput",
  setup(_, { attrs }) {
    return () =>
      renderPart(resolveDynamicComponent(ArkColorPicker.ChannelInput), {
        ...attrs,
        "data-scope": "color-picker",
        "data-part": "channel-input",
      });
  },
}), lkAutomaticColorPickerStyles);

export const LoongArkColorPickerSwatchGroup = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkColorPickerSwatchGroup",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkColorPicker.SwatchGroup,
        {
          ...attrs,
          "data-scope": "color-picker",
          "data-part": "swatch-group",
        },
        slots,
      );
  },
}), lkAutomaticColorPickerStyles);

export const LoongArkColorPickerSwatchTrigger = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkColorPickerSwatchTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkColorPicker.SwatchTrigger,
        {
          ...attrs,
          "data-scope": "color-picker",
          "data-part": "swatch-trigger",
        },
        slots,
      );
  },
}), lkAutomaticColorPickerStyles);

export const LoongArkColorPickerSwatchIndicator = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkColorPickerSwatchIndicator",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkColorPicker.SwatchIndicator,
        {
          ...attrs,
          "data-scope": "color-picker",
          "data-part": "swatch-indicator",
        },
        slots,
      );
  },
}), lkAutomaticColorPickerStyles);

export const LoongArkColorPickerSwatch = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkColorPickerSwatch",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkColorPicker.Swatch,
        {
          ...attrs,
          "data-scope": "color-picker",
          "data-part": "swatch",
        },
        slots,
      );
  },
}), lkAutomaticColorPickerStyles);

export const LoongArkColorPickerTransparencyGrid = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkColorPickerTransparencyGrid",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkColorPicker.TransparencyGrid,
        {
          ...attrs,
          "data-scope": "color-picker",
          "data-part": "transparency-grid",
        },
        slots,
      );
  },
}), lkAutomaticColorPickerStyles);

export const LoongArkColorPickerValueText = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkColorPickerValueText",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkColorPicker.ValueText,
        {
          ...attrs,
          "data-scope": "color-picker",
          "data-part": "value-text",
        },
        slots,
      );
  },
}), lkAutomaticColorPickerStyles);

export const LoongArkColorPickerValueSwatch = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkColorPickerValueSwatch",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkColorPicker.ValueSwatch,
        {
          ...attrs,
          "data-scope": "color-picker",
          "data-part": "value-swatch",
        },
        slots,
      );
  },
}), lkAutomaticColorPickerStyles);

export const LoongArkColorPickerEyeDropperTrigger = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkColorPickerEyeDropperTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkColorPicker.EyeDropperTrigger,
        {
          ...attrs,
          "data-scope": "color-picker",
          "data-part": "eye-dropper-trigger",
        },
        slots,
      );
  },
}), lkAutomaticColorPickerStyles);

export const LoongArkColorPickerFormatTrigger = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkColorPickerFormatTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkColorPicker.FormatTrigger,
        {
          ...attrs,
          "data-scope": "color-picker",
          "data-part": "format-trigger",
        },
        slots,
      );
  },
}), lkAutomaticColorPickerStyles);

export const LoongArkColorPickerFormatSelect = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkColorPickerFormatSelect",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkColorPicker.FormatSelect,
        {
          ...attrs,
          "data-scope": "color-picker",
          "data-part": "format-select",
        },
        slots,
      );
  },
}), lkAutomaticColorPickerStyles);

export const LoongArkColorPickerHiddenInput = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkColorPickerHiddenInput",
  setup(_, { attrs }) {
    return () =>
      renderPart(resolveDynamicComponent(ArkColorPicker.HiddenInput), {
        ...attrs,
        "data-scope": "color-picker",
        "data-part": "hidden-input",
      });
  },
}), lkAutomaticColorPickerStyles);
