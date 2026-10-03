import { renderPart } from "../render-part";
import { defineComponent, h, type PropType } from "vue";
import {
  CheckboxRoot,
  CheckboxControl,
  CheckboxLabel,
  CheckboxIndicator,
  CheckboxHiddenInput,
  type CheckboxCheckedState as CheckedState,
  type CheckboxCheckedChangeDetails as CheckedChangeDetails,
} from "@ark-ui/vue/checkbox";
import type { CheckboxSize } from "@loongark/primitives";

// ========== Root ==========
export const LoongArkCheckboxRoot = defineComponent({
  name: "LoongArkCheckboxRoot",
  props: {
    size: {
      type: String as PropType<CheckboxSize>,
      default: "md",
    },
    checked: {
      type: [Boolean, String] as PropType<CheckedState>,
    },
    defaultChecked: {
      type: [Boolean, String] as PropType<CheckedState>,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    invalid: {
      type: Boolean,
      default: false,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
    },
    value: {
      type: String,
    },
    onCheckedChange: {
      type: Function as PropType<(details: CheckedChangeDetails) => void>,
    },
  },
  setup(props, { slots }) {
    return () =>
      renderPart(
        CheckboxRoot,
        {
          checked: props.checked as CheckedState | undefined,
          defaultChecked: props.defaultChecked as CheckedState | undefined,
          disabled: props.disabled,
          invalid: props.invalid,
          readOnly: props.readOnly,
          required: props.required,
          name: props.name as string | undefined,
          value: props.value as string | undefined,
          onCheckedChange: props.onCheckedChange,
          "data-scope": "checkbox",
          "data-part": "root",
          "data-size": props.size,
        },
        slots.default ? { default: slots.default } : undefined,
      );
  },
});

// ========== Control ==========
export const LoongArkCheckboxControl = defineComponent({
  name: "LoongArkCheckboxControl",
  props: {
    size: {
      type: String as PropType<CheckboxSize>,
      default: "md",
    },
  },
  setup(props, { slots }) {
    return () =>
      renderPart(
        CheckboxControl,
        {
          "data-scope": "checkbox",
          "data-part": "control",
          "data-size": props.size,
        },
        slots.default ? { default: slots.default } : undefined,
      );
  },
});

// ========== Label ==========
export const LoongArkCheckboxLabel = defineComponent({
  name: "LoongArkCheckboxLabel",
  setup(props, { slots }) {
    return () =>
      renderPart(
        CheckboxLabel,
        {
          "data-scope": "checkbox",
          "data-part": "label",
        },
        slots.default ? { default: slots.default } : undefined,
      );
  },
});

// ========== Indicator ==========
export const LoongArkCheckboxIndicator = defineComponent({
  name: "LoongArkCheckboxIndicator",
  props: {
    indeterminate: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    return () =>
      renderPart(
        CheckboxIndicator,
        {
          indeterminate: props.indeterminate,
          "data-scope": "checkbox",
          "data-part": "indicator",
        },
        slots.default ? { default: slots.default } : undefined,
      );
  },
});

// ========== HiddenInput ==========
export const LoongArkCheckboxHiddenInput = defineComponent({
  name: "LoongArkCheckboxHiddenInput",
  setup() {
    return () =>
      renderPart(CheckboxHiddenInput, {
        "data-scope": "checkbox",
        "data-part": "hidden-input",
      });
  },
});
