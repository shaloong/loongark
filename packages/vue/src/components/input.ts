import { defineComponent, h } from "vue";
import type { PropType } from "vue";
import { Field } from "@ark-ui/vue/field";
import { ark } from "@ark-ui/vue";
import type { InputPrimitiveProps } from "@loongark/primitives";

export type InputSize = NonNullable<InputPrimitiveProps["size"]>;
export type InputState = NonNullable<InputPrimitiveProps["state"]>;

const normalizeState = (state: InputState) =>
  state === "default" ? undefined : state;
const boolAttr = (value: boolean) => (value ? "true" : undefined);

const sizeProp = {
  type: {} as PropType<InputSize>,
  default: "md" as InputSize,
};

const stateProp = {
  type: {} as PropType<InputState>,
  default: "default" as InputState,
};

const boolProp = (defaultValue = false) => ({
  type: {} as PropType<boolean>,
  default: defaultValue,
});

export const LoongArkInputRoot = defineComponent({
  name: "LoongArkInputRoot",
  props: {
    size: sizeProp,
    state: stateProp,
    disabled: boolProp(false),
    readOnly: boolProp(false),
    multiline: boolProp(false),
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        Field.Root,
        {
          ...attrs,
          disabled: props.disabled,
          readonly: props.readOnly,
          "data-lk-input-wrapper": "",
          "data-size": props.size,
          "data-state": normalizeState(props.state),
          "data-disabled": boolAttr(props.disabled),
          "data-multiline": boolAttr(props.multiline),
        },
        slots.default ? slots.default() : undefined
      );
  },
});

export const LoongArkInputControl = defineComponent({
  name: "LoongArkInputControl",
  props: {
    size: sizeProp,
    state: stateProp,
    disabled: boolProp(false),
    readOnly: boolProp(false),
    multiline: boolProp(false),
  },
  setup(props, { attrs }) {
    return () =>
      h(Field.Input, {
        ...attrs,
        disabled: props.disabled,
        readonly: props.readOnly,
        "data-lk-input": "",
        "data-size": props.size,
        "data-state": normalizeState(props.state),
        "data-multiline": boolAttr(props.multiline),
      });
  },
});

export const LoongArkTextareaControl = defineComponent({
  name: "LoongArkTextareaControl",
  props: {
    size: sizeProp,
    state: stateProp,
    disabled: boolProp(false),
    readOnly: boolProp(false),
    multiline: boolProp(true),
  },
  setup(props, { attrs }) {
    return () =>
      h(Field.Textarea, {
        ...attrs,
        disabled: props.disabled,
        readonly: props.readOnly,
        "data-lk-input": "",
        "data-size": props.size,
        "data-state": normalizeState(props.state),
        "data-multiline": boolAttr(props.multiline),
      });
  },
});

export const LoongArkInputHelperText = defineComponent({
  name: "LoongArkInputHelperText",
  props: {
    variant: {
      type: {} as PropType<"default" | "error" | "success">,
      default: "default" as const,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        Field.HelperText,
        {
          ...attrs,
          "data-lk-input-helper": "",
          "data-variant":
            props.variant === "default" ? undefined : props.variant,
        },
        slots.default ? slots.default() : undefined
      );
  },
});

export const LoongArkInputLabel = defineComponent({
  name: "LoongArkInputLabel",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        Field.Label,
        {
          ...attrs,
          "data-lk-input-label": "",
        },
        slots.default ? slots.default() : undefined
      );
  },
});

export const LoongArkInputPrefix = defineComponent({
  name: "LoongArkInputPrefix",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ark.span,
        {
          ...attrs,
          "data-lk-input-prefix": "",
        },
        slots.default ? slots.default() : undefined
      );
  },
});

export const LoongArkInputSuffix = defineComponent({
  name: "LoongArkInputSuffix",
  props: {
    action: {
      type: {} as PropType<"button" | "text">,
      default: "text" as const,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ark.span,
        {
          ...attrs,
          "data-lk-input-suffix": "",
          "data-action": props.action === "button" ? "button" : undefined,
        },
        slots.default ? slots.default() : undefined
      );
  },
});
