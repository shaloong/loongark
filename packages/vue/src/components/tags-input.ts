
import { withAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
import { styles as lkAutomaticTagsInputStyles } from "@shaloong/loongark-primitives/automatic-styles/tags-input";
import { useFieldContext } from "@ark-ui/vue/field";
import { nativeSelectionFieldDescription } from "@shaloong/loongark-kit";
import type { TagsInputHiddenInputProps } from "@ark-ui/vue/tags-input";
import { nativeSelectionRef } from "../native-selection";
import { useTagsInputContext } from "@ark-ui/vue/tags-input";
import type { TagsInputRootProps as NativeTagsInputRootProps } from "@ark-ui/vue/tags-input";
import { renderPart } from "../render-part";
/**
 * Tags Input component - Vue wrapper.
 * Uses Ark UI Tags Input with data attributes for styling.
 */
import {
  resolveDynamicComponent,
  defineComponent,
  h,
  type PropType,
} from "vue";
import { TagsInput as ArkTagsInput } from "@ark-ui/vue/tags-input";
import type { TagsInputSize, TagsInputState } from "@shaloong/loongark-primitives";

export interface TagsInputValueChangeDetails {
  value: string[];
}

export interface TagsInputInputValueChangeDetails {
  inputValue: string;
}

export const LoongArkTagsInputRoot = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkTagsInputRoot",
  props: {
    size: {
      type: String as PropType<TagsInputSize>,
      default: "md",
    },
    state: {
      type: String as PropType<TagsInputState>,
      default: "default",
    },
    modelValue: {
      type: Array as PropType<string[]>,
    },
    defaultValue: {
      type: Array as PropType<string[]>,
    },
    inputValue: {
      type: String as PropType<string>,
    },
    defaultInputValue: {
      type: String as PropType<string>,
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
      type: Object as PropType<NativeTagsInputRootProps["ids"]>,
    },
    onValueChange: {
      type: Function as PropType<
        (details: TagsInputValueChangeDetails) => void
      >,
    },
    onInputValueChange: {
      type: Function as PropType<
        (details: TagsInputInputValueChangeDetails) => void
      >,
    },
    "onUpdate:modelValue": {
      type: Function as PropType<(value: string[]) => void>,
    },
    "onUpdate:inputValue": {
      type: Function as PropType<(value: string) => void>,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkTagsInput.Root,
        {
          ...attrs,
          ...props,
          "data-scope": "tags-input",
          "data-part": "root",
          "data-size": props.size,
          "data-state": props.state !== "default" ? props.state : undefined,
          ...(props.disabled ? { "data-disabled": "true" } : {}),
          "data-readonly": props.readOnly ? "true" : undefined,
        },
        slots,
      );
  },
}), lkAutomaticTagsInputStyles);

export const LoongArkTagsInputLabel = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkTagsInputLabel",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkTagsInput.Label,
        {
          ...attrs,
          "data-scope": "tags-input",
          "data-part": "label",
        },
        slots,
      );
  },
}), lkAutomaticTagsInputStyles);

export const LoongArkTagsInputControl = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkTagsInputControl",
  props: {
    size: {
      type: String as PropType<TagsInputSize>,
      default: "md",
    },
    state: {
      type: String as PropType<TagsInputState>,
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
        ArkTagsInput.Control,
        {
          ...attrs,
          ...props,
          "data-scope": "tags-input",
          "data-part": "control",
          "data-size": props.size,
          "data-state": props.state !== "default" ? props.state : undefined,
          ...(props.disabled ? { "data-disabled": "true" } : {}),
        },
        slots,
      );
  },
}), lkAutomaticTagsInputStyles);

export const LoongArkTagsInputInput = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkTagsInputInput",
  props: {
    size: {
      type: String as PropType<TagsInputSize>,
      default: "md",
    },
    state: {
      type: String as PropType<TagsInputState>,
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
    const api = useTagsInputContext();
    return () => {
      const disabled =
        props.disabled ?? !!api.value.getHiddenInputProps().disabled;
      const readOnly =
        props.readOnly ?? !!api.value.getHiddenInputProps().readonly;
      return renderPart(resolveDynamicComponent(ArkTagsInput.Input), {
        ...attrs,
        ...props,
        disabled,
        readOnly,
        "aria-describedby": nativeSelectionFieldDescription(
          typeof attrs["aria-describedby"] === "string"
            ? attrs["aria-describedby"]
            : undefined,
          field?.value,
          api.value.getInputProps()["aria-invalid"],
        ),
        "data-scope": "tags-input",
        "data-part": "input",
        "data-size": props.size,
        "data-state": props.state !== "default" ? props.state : undefined,
        ...(disabled ? { "data-disabled": "true" } : {}),
        "data-readonly": readOnly ? "true" : undefined,
      });
    };
  },
}), lkAutomaticTagsInputStyles);

export const LoongArkTagsInputItem = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkTagsInputItem",
  props: {
    value: {
      type: String as PropType<string>,
    },
    index: {
      type: Number as PropType<number>,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkTagsInput.Item,
        {
          ...attrs,
          ...props,
          "data-scope": "tags-input",
          "data-part": "item",
        },
        slots,
      );
  },
}), lkAutomaticTagsInputStyles);

export const LoongArkTagsInputItemPreview = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkTagsInputItemPreview",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkTagsInput.ItemPreview,
        {
          ...attrs,
          "data-scope": "tags-input",
          "data-part": "item-preview",
        },
        slots,
      );
  },
}), lkAutomaticTagsInputStyles);

export const LoongArkTagsInputItemText = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkTagsInputItemText",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkTagsInput.ItemText,
        {
          ...attrs,
          "data-scope": "tags-input",
          "data-part": "item-text",
        },
        slots,
      );
  },
}), lkAutomaticTagsInputStyles);

export const LoongArkTagsInputItemInput = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkTagsInputItemInput",
  setup(_, { attrs }) {
    return () =>
      renderPart(resolveDynamicComponent(ArkTagsInput.ItemInput), {
        ...attrs,
        "data-scope": "tags-input",
        "data-part": "item-input",
      });
  },
}), lkAutomaticTagsInputStyles);

export const LoongArkTagsInputItemDeleteTrigger = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkTagsInputItemDeleteTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkTagsInput.ItemDeleteTrigger,
        {
          ...attrs,
          "data-scope": "tags-input",
          "data-part": "item-delete-trigger",
        },
        slots,
      );
  },
}), lkAutomaticTagsInputStyles);

export const LoongArkTagsInputClearTrigger = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkTagsInputClearTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkTagsInput.ClearTrigger,
        {
          ...attrs,
          "data-scope": "tags-input",
          "data-part": "clear-trigger",
        },
        slots,
      );
  },
}), lkAutomaticTagsInputStyles);

export const LoongArkTagsInputHiddenInput =
  /*#__PURE__*/ withAutomaticStyles(defineComponent<TagsInputHiddenInputProps>(
    (props, { attrs, slots }) => {
      const api = useTagsInputContext();

      const ref = nativeSelectionRef(() => ({
        formValue: api.value.valueAsString,
      }));
      return () =>
        renderPart(
          resolveDynamicComponent(ArkTagsInput.HiddenInput),
          {
            ...attrs,
            ...props,
            ref,
            "data-scope": "tags-input",
            "data-part": "hidden-input",
          },
          slots,
        );
    },
    {
      name: "LoongArkTagsInputHiddenInput",
      props: ["asChild"],
      inheritAttrs: false,
    },
  ), lkAutomaticTagsInputStyles);
