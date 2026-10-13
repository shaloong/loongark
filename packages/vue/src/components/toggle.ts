
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticToggleStyles } from "@loongark/primitives/automatic-styles/toggle";
import { renderPart } from "../render-part";
/**
 * Toggle component - Vue wrapper.
 * Based on Ark UI Toggle.
 */
import { defineComponent, h, type PropType } from "vue";
import { Toggle as ArkToggle } from "@ark-ui/vue/toggle";
import type { ToggleSize } from "@loongark/primitives";

export const LoongArkToggleRoot = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkToggleRoot",
  props: {
    size: {
      type: String as PropType<ToggleSize>,
      default: "md",
    },
    pressed: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    defaultPressed: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    onPressedChange: {
      type: Function as PropType<(pressed: boolean) => void>,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkToggle.Root,
        {
          ...attrs,
          ...props,
          "data-scope": "toggle",
          "data-part": "root",
          "data-size": props.size,
        },
        slots,
      );
  },
}), lkAutomaticToggleStyles);

export const LoongArkToggleIndicator = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkToggleIndicator",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkToggle.Indicator,
        {
          ...attrs,
          "data-scope": "toggle",
          "data-part": "indicator",
        },
        slots,
      );
  },
}), lkAutomaticToggleStyles);
