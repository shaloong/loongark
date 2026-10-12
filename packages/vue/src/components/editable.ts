
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticEditableStyles } from "@loongark/primitives/automatic-styles/editable";
import { renderPart } from "../render-part";
/**
 * Editable component - Vue wrapper.
 * Uses Ark UI Editable with data attributes for styling.
 */
import {
  resolveDynamicComponent,
  defineComponent,
  h,
  type PropType,
} from "vue";
import { Editable as ArkEditable } from "@ark-ui/vue/editable";
import type { EditableSize, EditableState } from "@loongark/primitives";

export const LoongArkEditableRoot = /*#__PURE__*/ withAutomaticStyles(defineComponent({
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
      renderPart(
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
        slots,
      );
  },
}), lkAutomaticEditableStyles);

export const LoongArkEditableLabel = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkEditableLabel",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkEditable.Label,
        {
          ...attrs,
          "data-scope": "editable",
          "data-part": "label",
        },
        slots,
      );
  },
}), lkAutomaticEditableStyles);

export const LoongArkEditableArea = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkEditableArea",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkEditable.Area,
        {
          ...attrs,
          "data-scope": "editable",
          "data-part": "area",
        },
        slots,
      );
  },
}), lkAutomaticEditableStyles);

export const LoongArkEditableControl = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkEditableControl",
  props: {
    state: {
      type: String as PropType<EditableState>,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkEditable.Control,
        {
          ...attrs,
          "data-scope": "editable",
          "data-part": "control",
          "data-state":
            props.state && props.state !== "default" ? props.state : undefined,
        },
        slots,
      );
  },
}), lkAutomaticEditableStyles);

export const LoongArkEditableInput = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkEditableInput",
  props: {
    state: {
      type: String as PropType<EditableState>,
    },
  },
  setup(props, { attrs }) {
    return () =>
      renderPart(resolveDynamicComponent(ArkEditable.Input), {
        ...attrs,
        "data-scope": "editable",
        "data-part": "input",
        "data-state":
          props.state && props.state !== "default" ? props.state : undefined,
      });
  },
}), lkAutomaticEditableStyles);

export const LoongArkEditablePreview = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkEditablePreview",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkEditable.Preview,
        {
          ...attrs,
          "data-scope": "editable",
          "data-part": "preview",
        },
        slots,
      );
  },
}), lkAutomaticEditableStyles);

export const LoongArkEditableEditTrigger = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkEditableEditTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkEditable.EditTrigger,
        {
          ...attrs,
          "data-scope": "editable",
          "data-part": "edit-trigger",
        },
        slots,
      );
  },
}), lkAutomaticEditableStyles);

export const LoongArkEditableSubmitTrigger = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkEditableSubmitTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkEditable.SubmitTrigger,
        {
          ...attrs,
          "data-scope": "editable",
          "data-part": "submit-trigger",
        },
        slots,
      );
  },
}), lkAutomaticEditableStyles);

export const LoongArkEditableCancelTrigger = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkEditableCancelTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkEditable.CancelTrigger,
        {
          ...attrs,
          "data-scope": "editable",
          "data-part": "cancel-trigger",
        },
        slots,
      );
  },
}), lkAutomaticEditableStyles);
