import { useFieldContext } from "@ark-ui/vue/field";
import { usePasswordInputContext } from "@ark-ui/vue/password-input";
import {
  nativeSelectionProps,
  nativeSelectionFieldDescription,
} from "@loongark/kit";
import type { PasswordInputRootProps as NativePasswordInputRootProps } from "@ark-ui/vue/password-input";
import { renderPart } from "../render-part";
/**
 * Password Input component - Vue wrapper.
 * Uses Ark UI Password Input with data attributes for styling.
 */
import { defineComponent, h, type PropType } from "vue";
import { PasswordInput as ArkPasswordInput } from "@ark-ui/vue/password-input";
import type {
  PasswordInputSize,
  PasswordInputState,
} from "@loongark/primitives";

export interface PasswordVisibilityChangeDetails {
  visible: boolean;
}

export const LoongArkPasswordInputRoot = defineComponent({
  name: "LoongArkPasswordInputRoot",
  props: {
    size: {
      type: String as PropType<PasswordInputSize>,
      default: "md",
    },
    state: {
      type: String as PropType<PasswordInputState>,
      default: "default",
    },
    value: {
      type: String as PropType<string>,
    },
    defaultValue: {
      type: String as PropType<string>,
    },
    visible: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    defaultVisible: {
      type: Boolean as PropType<boolean>,
      default: undefined,
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
      type: Object as PropType<NativePasswordInputRootProps["ids"]>,
    },
    onVisibilityChange: {
      type: Function as PropType<
        (details: PasswordVisibilityChangeDetails) => void
      >,
    },
    "onUpdate:visible": {
      type: Function as PropType<(visible: boolean) => void>,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkPasswordInput.Root,
        {
          ...attrs,
          ...nativeSelectionProps(props),
          "data-scope": "password-input",
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

export const LoongArkPasswordInputLabel = defineComponent({
  name: "LoongArkPasswordInputLabel",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkPasswordInput.Label,
        {
          ...attrs,
          "data-scope": "password-input",
          "data-part": "label",
        },
        slots,
      );
  },
});

export const LoongArkPasswordInputControl = defineComponent({
  name: "LoongArkPasswordInputControl",
  props: {
    size: {
      type: String as PropType<PasswordInputSize>,
      default: "md",
    },
    state: {
      type: String as PropType<PasswordInputState>,
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
        ArkPasswordInput.Control,
        {
          ...attrs,
          ...nativeSelectionProps(props),
          "data-scope": "password-input",
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

export const LoongArkPasswordInputInput = defineComponent({
  name: "LoongArkPasswordInputInput",
  inheritAttrs: false,
  props: {
    size: {
      type: String as PropType<PasswordInputSize>,
      default: "md",
    },
    state: {
      type: String as PropType<PasswordInputState>,
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
    const api = usePasswordInputContext();
    return () =>
      renderPart(ArkPasswordInput.Input, {
        ...attrs,
        ...nativeSelectionProps(props),
        "data-scope": "password-input",
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

export const LoongArkPasswordInputIndicator = defineComponent({
  name: "LoongArkPasswordInputIndicator",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkPasswordInput.Indicator,
        {
          ...attrs,
          "data-scope": "password-input",
          "data-part": "indicator",
        },
        slots,
      );
  },
});

export const LoongArkPasswordInputVisibilityTrigger = defineComponent({
  name: "LoongArkPasswordInputVisibilityTrigger",
  props: {
    disabled: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkPasswordInput.VisibilityTrigger,
        {
          ...attrs,
          ...nativeSelectionProps(props),
          "data-scope": "password-input",
          "data-part": "visibility-trigger",
          ...nativeSelectionProps({
            "data-disabled":
              props.disabled === undefined ? undefined : String(props.disabled),
          }),
        },
        slots,
      );
  },
});
