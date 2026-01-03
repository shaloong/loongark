import { RadioGroup } from "@ark-ui/vue/radio-group";
import { defineComponent, h } from "vue";
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

export const LoongArkRadioGroupRoot = defineComponent({
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
      default: false,
    },
    readOnly: {
      type: Boolean,
      default: false,
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
      h(
        RadioGroup.Root as any,
        {
          defaultValue: props.defaultValue,
          value: props.value,
          disabled: props.disabled,
          readOnly: props.readOnly,
          name: props.name,
          form: props.form,
          orientation: props.orientation,
          onValueChange: props.onValueChange,
          "data-size": props.size,
          "data-orientation": props.orientation,
        },
        slots
      );
  },
});

// ============ Label 组件 ============

export const LoongArkRadioGroupLabel = defineComponent({
  name: "LoongArkRadioGroupLabel",
  setup(_, { slots }) {
    return () => h(RadioGroup.Label as any, {}, slots);
  },
});

// ============ Item 组件 ============

export const LoongArkRadioGroupItem = defineComponent({
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
      h(
        RadioGroup.Item as any,
        {
          value: props.value,
          disabled: props.disabled,
          invalid: props.invalid,
        },
        slots
      );
  },
});

// ============ ItemControl 组件 ============

export const LoongArkRadioGroupItemControl = defineComponent({
  name: "LoongArkRadioGroupItemControl",
  setup(_, { slots }) {
    return () => h(RadioGroup.ItemControl as any, {}, slots);
  },
});

// ============ ItemText 组件 ============

export const LoongArkRadioGroupItemText = defineComponent({
  name: "LoongArkRadioGroupItemText",
  setup(_, { slots }) {
    return () => h(RadioGroup.ItemText as any, {}, slots);
  },
});

// ============ Indicator 组件 ============

export const LoongArkRadioGroupIndicator = defineComponent({
  name: "LoongArkRadioGroupIndicator",
  setup(_, { slots }) {
    return () => h(RadioGroup.Indicator as any, {}, slots);
  },
});

// ============ ItemHiddenInput 组件 ============

export const LoongArkRadioGroupItemHiddenInput = defineComponent({
  name: "LoongArkRadioGroupItemHiddenInput",
  setup() {
    return () => h(RadioGroup.ItemHiddenInput as any);
  },
});
