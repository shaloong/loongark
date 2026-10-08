import { useFieldContext } from "@ark-ui/vue/field";
import { nativeSelectionFieldDescription } from "@loongark/kit";
import type { CheckboxHiddenInputProps } from "@ark-ui/vue/checkbox";
import { nativeSelectionRef } from "../native-selection";
import { useCheckboxContext } from "@ark-ui/vue/checkbox";
import { controlIcons } from "@loongark/kit";
import { LoongArkIcon } from "./icon";
import { renderPart } from "../render-part";
import {
  resolveDynamicComponent,
  defineComponent,
  h,
  type PropType,
} from "vue";
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
      default: undefined,
    },
    defaultChecked: {
      type: [Boolean, String] as PropType<CheckedState>,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: undefined,
    },
    invalid: {
      type: Boolean,
      default: undefined,
    },
    readOnly: {
      type: Boolean,
      default: undefined,
    },
    required: {
      type: Boolean,
      default: undefined,
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
        {
          default:
            slots.default ??
            (() => [
              h(LoongArkIcon, {
                icon: props.indeterminate
                  ? controlIcons.minus
                  : controlIcons.check,
                size: "sm",
              }),
            ]),
        },
      );
  },
});

// ========== HiddenInput ==========
export const LoongArkCheckboxHiddenInput =
  defineComponent<CheckboxHiddenInputProps>(
    (props, { attrs, slots }) => {
      const field = useFieldContext();
      const api = useCheckboxContext();

      const ref = nativeSelectionRef(() => ({
        checked: api.value.checked,
        indeterminate: api.value.indeterminate,
      }));
      return () =>
        renderPart(
          resolveDynamicComponent(CheckboxHiddenInput),
          {
            ...attrs,
            ...props,
            ref,
            "aria-describedby": nativeSelectionFieldDescription(
              typeof attrs["aria-describedby"] === "string"
                ? attrs["aria-describedby"]
                : props["aria-describedby"],
              field?.value,
              api.value.getHiddenInputProps()["aria-invalid"],
            ),
            "data-scope": "checkbox",
            "data-part": "hidden-input",
          },
          slots,
        );
    },
    {
      name: "LoongArkCheckboxHiddenInput",
      props: ["asChild"],
      inheritAttrs: false,
    },
  );
