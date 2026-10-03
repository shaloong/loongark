import { renderPart } from "../render-part";
/**
 * Color Picker component - Vue wrapper.
 * Uses Ark UI Color Picker with data attributes for styling.
 */
import { defineComponent, h, type PropType } from "vue";
import { ColorPicker as ArkColorPicker } from "@ark-ui/vue/color-picker";
import type { ColorPickerSize } from "@loongark/primitives";

export const LoongArkColorPickerRoot = defineComponent({
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
});

export const LoongArkColorPickerLabel = defineComponent({
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
});

export const LoongArkColorPickerControl = defineComponent({
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
});

export const LoongArkColorPickerTrigger = defineComponent({
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
});

export const LoongArkColorPickerPositioner = defineComponent({
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
});

export const LoongArkColorPickerContent = defineComponent({
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
});

export const LoongArkColorPickerView = defineComponent({
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
});

export const LoongArkColorPickerArea = defineComponent({
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
});

export const LoongArkColorPickerAreaBackground = defineComponent({
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
});

export const LoongArkColorPickerAreaThumb = defineComponent({
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
});

export const LoongArkColorPickerChannelSlider = defineComponent({
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
});

export const LoongArkColorPickerChannelSliderLabel = defineComponent({
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
});

export const LoongArkColorPickerChannelSliderTrack = defineComponent({
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
});

export const LoongArkColorPickerChannelSliderThumb = defineComponent({
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
});

export const LoongArkColorPickerChannelSliderValueText = defineComponent({
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
});

export const LoongArkColorPickerChannelInput = defineComponent({
  name: "LoongArkColorPickerChannelInput",
  setup(_, { attrs }) {
    return () =>
      renderPart(ArkColorPicker.ChannelInput, {
        ...attrs,
        "data-scope": "color-picker",
        "data-part": "channel-input",
      });
  },
});

export const LoongArkColorPickerSwatchGroup = defineComponent({
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
});

export const LoongArkColorPickerSwatchTrigger = defineComponent({
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
});

export const LoongArkColorPickerSwatchIndicator = defineComponent({
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
});

export const LoongArkColorPickerSwatch = defineComponent({
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
});

export const LoongArkColorPickerTransparencyGrid = defineComponent({
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
});

export const LoongArkColorPickerValueText = defineComponent({
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
});

export const LoongArkColorPickerValueSwatch = defineComponent({
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
});

export const LoongArkColorPickerEyeDropperTrigger = defineComponent({
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
});

export const LoongArkColorPickerFormatTrigger = defineComponent({
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
});

export const LoongArkColorPickerFormatSelect = defineComponent({
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
});

export const LoongArkColorPickerHiddenInput = defineComponent({
  name: "LoongArkColorPickerHiddenInput",
  setup(_, { attrs }) {
    return () =>
      renderPart(ArkColorPicker.HiddenInput, {
        ...attrs,
        "data-scope": "color-picker",
        "data-part": "hidden-input",
      });
  },
});
