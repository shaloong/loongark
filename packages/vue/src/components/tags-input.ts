/**
 * Tags Input component - Vue wrapper.
 * Uses Ark UI Tags Input with data attributes for styling.
 */
import { defineComponent, h, type PropType } from "vue";
import { TagsInput as ArkTagsInput } from "@ark-ui/vue/tags-input";
import type { TagsInputSize, TagsInputState } from "@loongark/primitives";

export interface TagsInputValueChangeDetails {
  value: string[];
}

export interface TagsInputInputValueChangeDetails {
  inputValue: string;
}

export const LoongArkTagsInputRoot = defineComponent({
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
    onValueChange: {
      type: Function as PropType<(details: TagsInputValueChangeDetails) => void>,
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
      h(
        ArkTagsInput.Root,
        {
          ...attrs,
          ...props,
          "data-scope": "tags-input",
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

export const LoongArkTagsInputLabel = defineComponent({
  name: "LoongArkTagsInputLabel",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkTagsInput.Label,
        {
          ...attrs,
          "data-scope": "tags-input",
          "data-part": "label",
        },
        slots
      );
  },
});

export const LoongArkTagsInputControl = defineComponent({
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
      h(
        ArkTagsInput.Control,
        {
          ...attrs,
          ...props,
          "data-scope": "tags-input",
          "data-part": "control",
          "data-size": props.size,
          "data-state": props.state !== "default" ? props.state : undefined,
          "data-disabled": props.disabled ? "true" : undefined,
        },
        slots
      );
  },
});

export const LoongArkTagsInputInput = defineComponent({
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
      default: false,
    },
    readOnly: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props, { attrs }) {
    return () =>
      h(ArkTagsInput.Input, {
        ...attrs,
        ...props,
        "data-scope": "tags-input",
        "data-part": "input",
        "data-size": props.size,
        "data-state": props.state !== "default" ? props.state : undefined,
        "data-disabled": props.disabled ? "true" : undefined,
        "data-readonly": props.readOnly ? "true" : undefined,
      });
  },
});

export const LoongArkTagsInputItem = defineComponent({
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
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ArkTagsInput.Item,
        {
          ...attrs,
          ...props,
          "data-scope": "tags-input",
          "data-part": "item",
        },
        slots
      );
  },
});

export const LoongArkTagsInputItemPreview = defineComponent({
  name: "LoongArkTagsInputItemPreview",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkTagsInput.ItemPreview,
        {
          ...attrs,
          "data-scope": "tags-input",
          "data-part": "item-preview",
        },
        slots
      );
  },
});

export const LoongArkTagsInputItemText = defineComponent({
  name: "LoongArkTagsInputItemText",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkTagsInput.ItemText,
        {
          ...attrs,
          "data-scope": "tags-input",
          "data-part": "item-text",
        },
        slots
      );
  },
});

export const LoongArkTagsInputItemInput = defineComponent({
  name: "LoongArkTagsInputItemInput",
  setup(_, { attrs }) {
    return () =>
      h(ArkTagsInput.ItemInput, {
        ...attrs,
        "data-scope": "tags-input",
        "data-part": "item-input",
      });
  },
});

export const LoongArkTagsInputItemDeleteTrigger = defineComponent({
  name: "LoongArkTagsInputItemDeleteTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkTagsInput.ItemDeleteTrigger,
        {
          ...attrs,
          "data-scope": "tags-input",
          "data-part": "item-delete-trigger",
        },
        slots
      );
  },
});

export const LoongArkTagsInputClearTrigger = defineComponent({
  name: "LoongArkTagsInputClearTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkTagsInput.ClearTrigger,
        {
          ...attrs,
          "data-scope": "tags-input",
          "data-part": "clear-trigger",
        },
        slots
      );
  },
});

export const LoongArkTagsInputHiddenInput = defineComponent({
  name: "LoongArkTagsInputHiddenInput",
  setup(_, { attrs }) {
    return () =>
      h(ArkTagsInput.HiddenInput, {
        ...attrs,
        "data-scope": "tags-input",
        "data-part": "hidden-input",
      });
  },
});
