import { renderPart } from "../render-part";
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
      renderPart(
        Field.Root,
        {
          ...attrs,
          disabled: props.disabled,
          invalid: props.state === "invalid",
          readonly: props.readOnly,
          "data-scope": "input",
          "data-part": "root",
          "data-size": props.size,
          "data-state": normalizeState(props.state),
          "data-disabled": boolAttr(props.disabled),
          "data-multiline": boolAttr(props.multiline),
        },
        slots.default ? slots.default() : undefined,
      );
  },
});

export const LoongArkInputControl = defineComponent({
  name: "LoongArkInputControl",
  emits: ["update:modelValue"],
  inheritAttrs: false,
  props: {
    modelValue: { type: {} as PropType<string | number | undefined> },
    size: sizeProp,
    state: stateProp,
    disabled: boolProp(false),
    readOnly: boolProp(false),
    multiline: boolProp(false),
  },
  setup(props, { attrs, emit }) {
    return () =>
      renderPart(Field.Input, {
        ...attrs,
        value: props.modelValue ?? attrs.value,
        onInput: (event: Event) => {
          emit(
            "update:modelValue",
            (event.currentTarget as HTMLInputElement).value,
          );
          if (typeof attrs.onInput === "function") attrs.onInput(event);
        },
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

export const LoongArkInputInput = LoongArkInputControl;

export const LoongArkInputGroup = defineComponent({
  name: "LoongArkInputGroup",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        "div",
        { ...attrs, "data-scope": "input", "data-part": "group" },
        slots.default?.(),
      );
  },
});

export const LoongArkTextareaControl = defineComponent({
  name: "LoongArkTextareaControl",
  emits: ["update:modelValue"],
  inheritAttrs: false,
  props: {
    modelValue: { type: {} as PropType<string | undefined> },
    size: sizeProp,
    state: stateProp,
    disabled: boolProp(false),
    readOnly: boolProp(false),
    multiline: boolProp(true),
  },
  setup(props, { attrs, emit }) {
    return () =>
      renderPart(Field.Textarea, {
        ...attrs,
        value: props.modelValue ?? attrs.value,
        onInput: (event: Event) => {
          emit(
            "update:modelValue",
            (event.currentTarget as HTMLTextAreaElement).value,
          );
          if (typeof attrs.onInput === "function") attrs.onInput(event);
        },
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
      renderPart(
        props.variant === "error" ? Field.ErrorText : Field.HelperText,
        {
          ...attrs,
          "data-scope": "input",
          "data-part": "helper-text",
          "data-variant":
            props.variant === "default" ? undefined : props.variant,
        },
        slots.default ? slots.default() : undefined,
      );
  },
});

export const LoongArkInputErrorText = defineComponent({
  name: "LoongArkInputErrorText",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        Field.ErrorText,
        {
          ...attrs,
          "data-scope": "input",
          "data-part": "helper-text",
          "data-variant": "error",
        },
        slots.default ? slots.default() : undefined,
      );
  },
});

export const LoongArkInputLabel = defineComponent({
  name: "LoongArkInputLabel",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        Field.Label,
        {
          ...attrs,
          "data-scope": "input",
          "data-part": "label",
        },
        slots.default ? slots.default() : undefined,
      );
  },
});

export const LoongArkInputPrefix = defineComponent({
  name: "LoongArkInputPrefix",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ark.span,
        {
          ...attrs,
          "data-scope": "input",
          "data-part": "prefix",
        },
        slots.default ? slots.default() : undefined,
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
    const isAction = () =>
      (props.action === "clear" || props.action === "button") &&
      typeof attrs.onClick === "function";
    return () =>
      renderPart(
        isAction() ? ark.button : ark.span,
        {
          ...attrs,
          type: isAction() ? "button" : undefined,
          "data-scope": "input",
          "data-part": "suffix",
          "data-action": isAction() ? "clear" : undefined,
        },
        slots.default ? slots.default() : undefined,
      );
  },
});
