import { renderPart } from "../render-part";
import { resolveDynamicComponent, defineComponent, h } from "vue";
import type { PropType } from "vue";
import { PinInput as ArkPinInput } from "@ark-ui/vue/pin-input";
import type { PinInputPrimitiveProps } from "@loongark/primitives";

export type PinInputSize = NonNullable<PinInputPrimitiveProps["size"]>;
export type PinInputState = NonNullable<PinInputPrimitiveProps["state"]>;

const sizeProp = {
  type: {} as PropType<PinInputSize>,
  default: "md" as PinInputSize,
};

const stateProp = {
  type: {} as PropType<PinInputState>,
  default: "default" as PinInputState,
};

const boolProp = (defaultValue: boolean | undefined = false) => ({
  type: {} as PropType<boolean | undefined>,
  default: defaultValue,
});

export const LoongArkPinInputRoot = defineComponent({
  name: "LoongArkPinInputRoot",
  props: {
    size: sizeProp,
    state: stateProp,
    disabled: boolProp(false),
    value: {
      type: {} as PropType<string[]>,
      default: undefined,
    },
    defaultValue: {
      type: {} as PropType<string[]>,
      default: undefined,
    },
    type: {
      type: {} as PropType<"alphanumeric" | "numeric" | "alphabetic">,
      default: "alphanumeric" as const,
    },
    mask: boolProp(false),
    otp: boolProp(false),
    placeholder: {
      type: {} as PropType<string>,
      default: undefined,
    },
    autoFocus: boolProp(false),
    selectOnFocus: boolProp(undefined),
    blurOnComplete: boolProp(undefined),
    autoCapitalize: boolProp(false),
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkPinInput.Root,
        {
          ...attrs,
          value: props.value,
          defaultValue: props.defaultValue,
          disabled: props.disabled,
          type: props.type,
          mask: props.mask,
          otp: props.otp,
          placeholder: props.placeholder,
          autoFocus: props.autoFocus,
          selectOnFocus: props.selectOnFocus,
          blurOnComplete: props.blurOnComplete,
          "data-scope": "pin-input",
          "data-part": "root",
          "data-size": props.size,
          "data-state": props.state !== "default" ? props.state : undefined,
          "data-disabled": props.disabled ? "true" : undefined,
        },
        slots.default ? slots.default() : undefined,
      );
  },
});

export const LoongArkPinInputControl = defineComponent({
  name: "LoongArkPinInputControl",
  props: {
    size: sizeProp,
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkPinInput.Control,
        {
          ...attrs,
          "data-scope": "pin-input",
          "data-part": "control",
          "data-size": props.size,
        },
        slots.default ? slots.default() : undefined,
      );
  },
});

export const LoongArkPinInputInput = defineComponent({
  name: "LoongArkPinInputInput",
  props: {
    size: sizeProp,
    state: stateProp,
    index: {
      type: {} as PropType<number>,
      default: 0,
    },
    autoCapitalize: boolProp(false),
  },
  setup(props, { attrs }) {
    return () =>
      renderPart(resolveDynamicComponent(ArkPinInput.Input), {
        ...attrs,
        index: props.index,
        "data-scope": "pin-input",
        "data-part": "input",
        "data-size": props.size,
        "data-state": props.state !== "default" ? props.state : undefined,
      });
  },
});

export const LoongArkPinInputLabel = defineComponent({
  name: "LoongArkPinInputLabel",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkPinInput.Label,
        {
          ...attrs,
          "data-scope": "pin-input",
          "data-part": "label",
        },
        slots.default ? slots.default() : undefined,
      );
  },
});

export const LoongArkPinInputHiddenInput: typeof ArkPinInput.HiddenInput =
  ArkPinInput.HiddenInput;

export const LoongArkPinInput: {
  Root: typeof LoongArkPinInputRoot;
  Control: typeof LoongArkPinInputControl;
  Input: typeof LoongArkPinInputInput;
  Label: typeof LoongArkPinInputLabel;
  HiddenInput: typeof LoongArkPinInputHiddenInput;
} = {
  Root: LoongArkPinInputRoot,
  Control: LoongArkPinInputControl,
  Input: LoongArkPinInputInput,
  Label: LoongArkPinInputLabel,
  HiddenInput: LoongArkPinInputHiddenInput,
};
