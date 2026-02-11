/**
 * Password Input component - Vue wrapper.
 * Uses Ark UI Password Input with data attributes for styling.
 */
import { defineComponent, h, type PropType } from "vue";
import { PasswordInput as ArkPasswordInput } from "@ark-ui/vue/password-input";
import type { PasswordInputSize, PasswordInputState } from "@loongark/primitives";

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
    },
    defaultVisible: {
      type: Boolean as PropType<boolean>,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
    },
    readOnly: {
      type: Boolean as PropType<boolean>,
    },
    required: {
      type: Boolean as PropType<boolean>,
    },
    invalid: {
      type: Boolean as PropType<boolean>,
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
      type: Object as PropType<any>,
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
      h(
        ArkPasswordInput.Root,
        {
          ...attrs,
          ...props,
          "data-scope": "password-input",
          "data-part": "root",
          "data-size": props.size,
          "data-state": props.state !== "default" ? props.state : undefined,
          "data-disabled": props.disabled ? "true" : undefined,
          "data-readonly": props.readOnly ? "true" : undefined,
        },
        slots
      );
  },
});

export const LoongArkPasswordInputLabel = defineComponent({
  name: "LoongArkPasswordInputLabel",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkPasswordInput.Label,
        {
          ...attrs,
          "data-scope": "password-input",
          "data-part": "label",
        },
        slots
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
      default: false,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ArkPasswordInput.Control,
        {
          ...attrs,
          ...props,
          "data-scope": "password-input",
          "data-part": "control",
          "data-size": props.size,
          "data-state": props.state !== "default" ? props.state : undefined,
          "data-disabled": props.disabled ? "true" : undefined,
        },
        slots
      );
  },
});

export const LoongArkPasswordInputInput = defineComponent({
  name: "LoongArkPasswordInputInput",
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
      default: false,
    },
    readOnly: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props, { attrs }) {
    return () =>
      h(ArkPasswordInput.Input, {
        ...attrs,
        ...props,
        "data-scope": "password-input",
        "data-part": "input",
        "data-size": props.size,
        "data-state": props.state !== "default" ? props.state : undefined,
        "data-disabled": props.disabled ? "true" : undefined,
        "data-readonly": props.readOnly ? "true" : undefined,
      });
  },
});

export const LoongArkPasswordInputIndicator = defineComponent({
  name: "LoongArkPasswordInputIndicator",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkPasswordInput.Indicator,
        {
          ...attrs,
          "data-scope": "password-input",
          "data-part": "indicator",
        },
        slots
      );
  },
});

export const LoongArkPasswordInputVisibilityTrigger = defineComponent({
  name: "LoongArkPasswordInputVisibilityTrigger",
  props: {
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ArkPasswordInput.VisibilityTrigger,
        {
          ...attrs,
          ...props,
          "data-scope": "password-input",
          "data-part": "visibility-trigger",
          "data-disabled": props.disabled ? "true" : undefined,
        },
        slots
      );
  },
});
