import { useFieldContext } from "@ark-ui/vue/field";
import { useNumberInputContext } from "@ark-ui/vue/number-input";
import {
  nativeSelectionProps,
  nativeSelectionFieldDescription,
} from "@loongark/kit";
import { controlIcons } from "@loongark/kit";
import { LoongArkIcon } from "./icon";
import type { NumberInputRootProps as NativeNumberInputRootProps } from "@ark-ui/vue/number-input";
import { renderPart } from "../render-part";
/**
 * Number Input component - Vue wrapper.
 * Based on Ark UI Number Input with data-scope/data-part bindings.
 */
import {
  resolveDynamicComponent,
  defineComponent,
  h,
  type PropType,
} from "vue";
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
          ...nativeSelectionProps(props),
          "data-scope": "number-input",
          "data-part": "root",
          "data-size": props.size,
          "data-state": props.state !== "default" ? props.state : undefined,
          ...nativeSelectionProps({
            "data-disabled":
              props.disabled === undefined ? undefined : String(props.disabled),
          }),
          ...nativeSelectionProps({
            "data-readonly":
              props.readOnly === undefined ? undefined : String(props.readOnly),
          }),
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
      default: undefined,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkNumberInput.Control,
        {
          ...attrs,
          ...nativeSelectionProps(props),
          "data-scope": "number-input",
          "data-part": "control",
          "data-size": props.size,
          "data-state": props.state !== "default" ? props.state : undefined,
          ...nativeSelectionProps({
            "data-disabled":
              props.disabled === undefined ? undefined : String(props.disabled),
          }),
        },
        slots,
      );
  },
});

export const LoongArkNumberInputInput = defineComponent({
  name: "LoongArkNumberInputInput",
  inheritAttrs: false,
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
      default: undefined,
    },
    readOnly: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
  },
  setup(props, { attrs }) {
    const field = useFieldContext();
    const api = useNumberInputContext();
    return () =>
      renderPart(resolveDynamicComponent(ArkNumberInput.Input), {
        ...attrs,
        ...nativeSelectionProps(props),
        "data-scope": "number-input",
        "data-part": "input",
        "aria-describedby": nativeSelectionFieldDescription(
          typeof attrs["aria-describedby"] === "string"
            ? attrs["aria-describedby"]
            : undefined,
          field?.value,
          api.value.getInputProps()["aria-invalid"],
        ),
        "data-size": props.size,
        "data-state": props.state !== "default" ? props.state : undefined,
        ...nativeSelectionProps({
          "data-disabled":
            props.disabled === undefined ? undefined : String(props.disabled),
        }),
        ...nativeSelectionProps({
          "data-readonly":
            props.readOnly === undefined ? undefined : String(props.readOnly),
        }),
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
      default: undefined,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkNumberInput.IncrementTrigger,
        {
          ...attrs,
          ...nativeSelectionProps(props),
          "data-scope": "number-input",
          "data-part": "increment-trigger",
          "data-size": props.size,
          "data-state": props.state !== "default" ? props.state : undefined,
          ...nativeSelectionProps({
            "data-disabled":
              props.disabled === undefined ? undefined : String(props.disabled),
          }),
        },
        {
          ...slots,
          default: () =>
            slots.default?.() ??
            h(LoongArkIcon, { icon: controlIcons.plus, size: "sm" }),
        },
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
      default: undefined,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkNumberInput.DecrementTrigger,
        {
          ...attrs,
          ...nativeSelectionProps(props),
          "data-scope": "number-input",
          "data-part": "decrement-trigger",
          "data-size": props.size,
          "data-state": props.state !== "default" ? props.state : undefined,
          ...nativeSelectionProps({
            "data-disabled":
              props.disabled === undefined ? undefined : String(props.disabled),
          }),
        },
        {
          ...slots,
          default: () =>
            slots.default?.() ??
            h(LoongArkIcon, { icon: controlIcons.minus, size: "sm" }),
        },
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
          ...nativeSelectionProps(props),
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
