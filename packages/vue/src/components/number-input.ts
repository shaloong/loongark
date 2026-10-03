import type { NumberInputRootProps as NativeNumberInputRootProps } from "@ark-ui/vue/number-input";
import { renderPart } from "../render-part";
/**
 * Number Input component - Vue wrapper.
 * Based on Ark UI Number Input with data-scope/data-part bindings.
 */
import { defineComponent, h, type PropType } from "vue";
import { NumberInput as ArkNumberInput } from "@ark-ui/vue/number-input";
import type { NumberInputSize, NumberInputState } from "@loongark/primitives";

export interface NumberInputValueChangeDetails {
  value: string;
  valueAsNumber?: number;
}

export interface NumberInputFocusChangeDetails {
  focusedValue?: string;
}

export interface NumberInputValueInvalidDetails {
  value?: string;
  reason?: string;
}

export const LoongArkNumberInputRoot = defineComponent({
  name: "LoongArkNumberInputRoot",
  props: {
    size: {
      type: String as PropType<NumberInputSize>,
      default: "md",
    },
    state: {
      type: String as PropType<NumberInputState>,
      default: "default",
    },
    modelValue: {
      type: String as PropType<string>,
    },
    defaultValue: {
      type: String as PropType<string>,
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
    disabled: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    readOnly: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    required: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    invalid: {
      type: Boolean as PropType<boolean>,
      default: undefined,
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
      type: Object as PropType<NativeNumberInputRootProps["ids"]>,
    },
    inputMode: {
      type: String as PropType<"text" | "tel" | "numeric" | "decimal">,
    },
    locale: {
      type: String as PropType<string>,
    },
    formatOptions: {
      type: Object as PropType<NativeNumberInputRootProps["formatOptions"]>,
    },
    translations: {
      type: Object as PropType<NativeNumberInputRootProps["translations"]>,
    },
    allowMouseWheel: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    allowOverflow: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    clampValueOnBlur: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    focusInputOnChange: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    spinOnPress: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    onValueChange: {
      type: Function as PropType<
        (details: NumberInputValueChangeDetails) => void
      >,
    },
    onValueInvalid: {
      type: Function as PropType<
        (details: NumberInputValueInvalidDetails) => void
      >,
    },
    onFocusChange: {
      type: Function as PropType<
        (details: NumberInputFocusChangeDetails) => void
      >,
    },
    "onUpdate:modelValue": {
      type: Function as PropType<(value: string) => void>,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkNumberInput.Root,
        {
          ...attrs,
          ...props,
          "data-scope": "number-input",
          "data-part": "root",
          "data-size": props.size,
          "data-state": props.state !== "default" ? props.state : undefined,
          "data-disabled": props.disabled ? "true" : undefined,
          "data-readonly": props.readOnly ? "true" : undefined,
        },
        slots,
      );
  },
});

export const LoongArkNumberInputLabel = defineComponent({
  name: "LoongArkNumberInputLabel",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkNumberInput.Label,
        {
          ...attrs,
          "data-scope": "number-input",
          "data-part": "label",
        },
        slots,
      );
  },
});

export const LoongArkNumberInputControl = defineComponent({
  name: "LoongArkNumberInputControl",
  props: {
    size: {
      type: String as PropType<NumberInputSize>,
      default: "md",
    },
    state: {
      type: String as PropType<NumberInputState>,
      default: "default",
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkNumberInput.Control,
        {
          ...attrs,
          ...props,
          "data-scope": "number-input",
          "data-part": "control",
          "data-size": props.size,
          "data-state": props.state !== "default" ? props.state : undefined,
          "data-disabled": props.disabled ? "true" : undefined,
        },
        slots,
      );
  },
});

export const LoongArkNumberInputInput = defineComponent({
  name: "LoongArkNumberInputInput",
  props: {
    size: {
      type: String as PropType<NumberInputSize>,
      default: "md",
    },
    state: {
      type: String as PropType<NumberInputState>,
      default: "default",
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    readOnly: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props, { attrs }) {
    return () =>
      renderPart(ArkNumberInput.Input, {
        ...attrs,
        ...props,
        "data-scope": "number-input",
        "data-part": "input",
        "data-size": props.size,
        "data-state": props.state !== "default" ? props.state : undefined,
        "data-disabled": props.disabled ? "true" : undefined,
        "data-readonly": props.readOnly ? "true" : undefined,
      });
  },
});

export const LoongArkNumberInputIncrementTrigger = defineComponent({
  name: "LoongArkNumberInputIncrementTrigger",
  props: {
    size: {
      type: String as PropType<NumberInputSize>,
      default: "md",
    },
    state: {
      type: String as PropType<NumberInputState>,
      default: "default",
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkNumberInput.IncrementTrigger,
        {
          ...attrs,
          ...props,
          "data-scope": "number-input",
          "data-part": "increment-trigger",
          "data-size": props.size,
          "data-state": props.state !== "default" ? props.state : undefined,
          "data-disabled": props.disabled ? "true" : undefined,
        },
        slots,
      );
  },
});

export const LoongArkNumberInputDecrementTrigger = defineComponent({
  name: "LoongArkNumberInputDecrementTrigger",
  props: {
    size: {
      type: String as PropType<NumberInputSize>,
      default: "md",
    },
    state: {
      type: String as PropType<NumberInputState>,
      default: "default",
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkNumberInput.DecrementTrigger,
        {
          ...attrs,
          ...props,
          "data-scope": "number-input",
          "data-part": "decrement-trigger",
          "data-size": props.size,
          "data-state": props.state !== "default" ? props.state : undefined,
          "data-disabled": props.disabled ? "true" : undefined,
        },
        slots,
      );
  },
});

export const LoongArkNumberInputValueText = defineComponent({
  name: "LoongArkNumberInputValueText",
  props: {
    size: {
      type: String as PropType<NumberInputSize>,
      default: "md",
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkNumberInput.ValueText,
        {
          ...attrs,
          ...props,
          "data-scope": "number-input",
          "data-part": "value-text",
          "data-size": props.size,
        },
        slots,
      );
  },
});

export const LoongArkNumberInputScrubber = defineComponent({
  name: "LoongArkNumberInputScrubber",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkNumberInput.Scrubber,
        {
          ...attrs,
          "data-scope": "number-input",
          "data-part": "scrubber",
        },
        slots,
      );
  },
});
