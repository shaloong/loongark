/**
 * Editable component - Vue wrapper.
 * Uses Ark UI Editable with data attributes for styling.
 */
import { defineComponent, h, type PropType } from "vue";
import { Editable as ArkEditable } from "@ark-ui/vue/editable";
import type { EditableSize, EditableState } from "@loongark/primitives";

export const LoongArkEditableRoot = defineComponent({
  name: "LoongArkEditableRoot",
  props: {
    size: {
      type: String as PropType<EditableSize>,
      default: "md",
    },
    state: {
      type: String as PropType<EditableState>,
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
        ArkEditable.Root,
        {
          ...attrs,
          ...props,
          disabled: props.disabled,
          "data-scope": "editable",
          "data-part": "root",
          "data-size": props.size,
          "data-state": props.state !== "default" ? props.state : undefined,
          "data-disabled": props.disabled ? "true" : undefined,
        },
        slots
      );
  },
});

export const LoongArkEditableLabel = defineComponent({
  name: "LoongArkEditableLabel",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkEditable.Label,
        {
          ...attrs,
          "data-scope": "editable",
          "data-part": "label",
        },
        slots
      );
  },
});

export const LoongArkEditableArea = defineComponent({
  name: "LoongArkEditableArea",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkEditable.Area,
        {
          ...attrs,
          "data-scope": "editable",
          "data-part": "area",
        },
        slots
      );
  },
});

export const LoongArkEditableControl = defineComponent({
  name: "LoongArkEditableControl",
  props: {
    state: {
      type: String as PropType<EditableState>,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ArkEditable.Control,
        {
          ...attrs,
          "data-scope": "editable",
          "data-part": "control",
          "data-state": props.state && props.state !== "default" ? props.state : undefined,
        },
        slots
      );
  },
});

export const LoongArkEditableInput = defineComponent({
  name: "LoongArkEditableInput",
  props: {
    state: {
      type: String as PropType<EditableState>,
    },
  },
  setup(props, { attrs }) {
    return () =>
      h(ArkEditable.Input, {
        ...attrs,
        "data-scope": "editable",
        "data-part": "input",
        "data-state": props.state && props.state !== "default" ? props.state : undefined,
      });
  },
});

export const LoongArkEditablePreview = defineComponent({
  name: "LoongArkEditablePreview",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkEditable.Preview,
        {
          ...attrs,
          "data-scope": "editable",
          "data-part": "preview",
        },
        slots
      );
  },
});

export const LoongArkEditableEditTrigger = defineComponent({
  name: "LoongArkEditableEditTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkEditable.EditTrigger,
        {
          ...attrs,
          "data-scope": "editable",
          "data-part": "edit-trigger",
        },
        slots
      );
  },
});

export const LoongArkEditableSubmitTrigger = defineComponent({
  name: "LoongArkEditableSubmitTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkEditable.SubmitTrigger,
        {
          ...attrs,
          "data-scope": "editable",
          "data-part": "submit-trigger",
        },
        slots
      );
  },
});

export const LoongArkEditableCancelTrigger = defineComponent({
  name: "LoongArkEditableCancelTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkEditable.CancelTrigger,
        {
          ...attrs,
          "data-scope": "editable",
          "data-part": "cancel-trigger",
        },
        slots
      );
  },
});
