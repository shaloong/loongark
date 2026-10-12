
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticRadioGroupStyles } from "@loongark/primitives/automatic-styles/radio-group";
import type { RadioGroupItemHiddenInputProps } from "@ark-ui/vue/radio-group";
import { nativeSelectionRef } from "../native-selection";
import {
  useRadioGroupContext,
  useRadioGroupItemContext,
} from "@ark-ui/vue/radio-group";
import { renderPart } from "../render-part";
import { RadioGroup } from "@ark-ui/vue/radio-group";
import { resolveDynamicComponent, defineComponent, h } from "vue";
import type { PropType } from "vue";
import type {
  RadioGroupSize,
  RadioGroupOrientation,
} from "@loongark/primitives";

// ============ 类型定义 ============

export interface ValueChangeDetails {
  value: string;
}

// ============ Root 组件 ============

export const LoongArkRadioGroupRoot = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkRadioGroupRoot",
  props: {
    size: {
      type: String as PropType<RadioGroupSize>,
      default: "md",
    },
    orientation: {
      type: String as PropType<RadioGroupOrientation>,
      default: "vertical",
    },
    defaultValue: {
      type: String,
    },
    value: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: undefined,
    },
    readOnly: {
      type: Boolean,
      default: undefined,
    },
    name: {
      type: String,
    },
    form: {
      type: String,
    },
    onValueChange: {
      type: Function as PropType<(details: ValueChangeDetails) => void>,
    },
  },
  setup(props, { slots }) {
    return () =>
      renderPart(
        RadioGroup.Root,
        {
          defaultValue: props.defaultValue,
          value: props.value,
          disabled: props.disabled,
          readOnly: props.readOnly,
          name: props.name,
          form: props.form,
          orientation: props.orientation,
          onValueChange: props.onValueChange,
          "data-scope": "radio-group",
          "data-part": "root",
          "data-size": props.size,
          "data-orientation": props.orientation,
        },
        slots,
      );
  },
}), lkAutomaticRadioGroupStyles);

// ============ Label 组件 ============

export const LoongArkRadioGroupLabel = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkRadioGroupLabel",
  setup(_, { slots }) {
    return () => renderPart(RadioGroup.Label, {}, slots);
  },
}), lkAutomaticRadioGroupStyles);

// ============ Item 组件 ============

export const LoongArkRadioGroupItem = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkRadioGroupItem",
  props: {
    value: {
      type: String as PropType<string>,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    invalid: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props, { slots }) {
    return () =>
      renderPart(
        RadioGroup.Item,
        {
          value: props.value,
          disabled: props.disabled,
          invalid: props.invalid,
        },
        slots,
      );
  },
}), lkAutomaticRadioGroupStyles);

// ============ ItemControl 组件 ============

export const LoongArkRadioGroupItemControl = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkRadioGroupItemControl",
  setup(_, { slots }) {
    return () => renderPart(RadioGroup.ItemControl, {}, slots);
  },
}), lkAutomaticRadioGroupStyles);

// ============ ItemText 组件 ============

export const LoongArkRadioGroupItemText = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkRadioGroupItemText",
  setup(_, { slots }) {
    return () => renderPart(RadioGroup.ItemText, {}, slots);
  },
}), lkAutomaticRadioGroupStyles);

// ============ Indicator 组件 ============

export const LoongArkRadioGroupIndicator = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkRadioGroupIndicator",
  setup(_, { slots }) {
    return () => renderPart(RadioGroup.Indicator, {}, slots);
  },
}), lkAutomaticRadioGroupStyles);

// ============ ItemHiddenInput 组件 ============

export const LoongArkRadioGroupItemHiddenInput =
  /*#__PURE__*/ withAutomaticStyles(defineComponent<RadioGroupItemHiddenInputProps>(
    (props, { attrs, slots }) => {
      const api = useRadioGroupContext();
      const item = useRadioGroupItemContext();
      const ref = nativeSelectionRef(() => ({
        radioValue: api.value.value,
        readOnly: String(api.value.getRootProps()["aria-readonly"]) === "true",
      }));
      return () =>
        renderPart(
          resolveDynamicComponent(RadioGroup.ItemHiddenInput),
          {
            ...attrs,
            ...props,
            ref,
            disabled: item.value.disabled || !!attrs.disabled,
          },
          slots,
        );
    },
    {
      name: "LoongArkRadioGroupItemHiddenInput",
      props: ["asChild"],
      inheritAttrs: false,
    },
  ), lkAutomaticRadioGroupStyles);
