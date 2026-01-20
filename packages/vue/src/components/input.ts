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
          "data-scope": "input",
          "data-part": "root",
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
        "data-scope": "input",
        "data-part": "control",
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
        "data-scope": "input",
        "data-part": "control",
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
          "data-scope": "input",
          "data-part": "helper-text",
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
          "data-scope": "input",
          "data-part": "label",
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
          "data-scope": "input",
          "data-part": "prefix",
        },
        slots.default ? slots.default() : undefined
      );
  },
});

export const LoongArkInputSuffix = defineComponent({
  name: "LoongArkInputSuffix",
  props: {
    action: {
      type: {} as PropType<"clear" | "button" | "none" | "text">,
      default: "none" as const,
    },
  },
  setup(props, { slots, attrs }) {
    const isAction = () => props.action === "clear" || props.action === "button";
    return () =>
      h(
        isAction() ? ark.button : ark.span,
        {
          ...attrs,
          type: isAction() ? "button" : undefined,
          "data-scope": "input",
          "data-part": "suffix",
          "data-action": isAction() ? "clear" : undefined,
        },
        slots.default ? slots.default() : undefined
      );
  },
});
