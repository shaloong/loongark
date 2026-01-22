/**
 * Toggle component - Vue wrapper.
 * Based on Ark UI Toggle.
 */
import { defineComponent, h, type PropType } from "vue";
import { Toggle as ArkToggle } from "@ark-ui/vue/toggle";
import type { ToggleSize } from "@loongark/primitives";

export const LoongArkToggleRoot = defineComponent({
  name: "LoongArkToggleRoot",
  props: {
    size: {
      type: String as PropType<ToggleSize>,
      default: "md",
    },
    pressed: {
      type: Boolean as PropType<boolean>,
    },
    defaultPressed: {
      type: Boolean as PropType<boolean>,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
    },
    onPressedChange: {
      type: Function as PropType<(pressed: boolean) => void>,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ArkToggle.Root,
        {
          ...attrs,
          ...props,
          "data-scope": "toggle",
          "data-part": "root",
          "data-size": props.size,
        },
        slots
      );
  },
});

export const LoongArkToggleIndicator = defineComponent({
  name: "LoongArkToggleIndicator",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkToggle.Indicator,
        {
          ...attrs,
          "data-scope": "toggle",
          "data-part": "indicator",
        },
        slots
      );
  },
});
