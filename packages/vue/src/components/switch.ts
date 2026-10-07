import type { SwitchHiddenInputProps } from "@ark-ui/vue/switch";
import { nativeSelectionRef } from "../native-selection";
import { useSwitchContext } from "@ark-ui/vue/switch";
import { renderPart } from "../render-part";
import { defineComponent, h } from "vue";
import type { PropType } from "vue";
import { Switch as ArkSwitch } from "@ark-ui/vue/switch";
import { ark } from "@ark-ui/vue";
import type { SwitchPrimitiveProps } from "@loongark/primitives";

export type SwitchSize = NonNullable<SwitchPrimitiveProps["size"]>;

const sizeProp = {
  type: {} as PropType<SwitchSize>,
  default: "md" as SwitchSize,
};

const boolProp = (defaultValue = false) => ({
  type: {} as PropType<boolean>,
  default: defaultValue,
});

export const LoongArkSwitchRoot = defineComponent({
  name: "LoongArkSwitchRoot",
  props: {
    size: sizeProp,
    disabled: boolProp(false),
    checked: { type: Boolean, default: undefined },
    defaultChecked: { type: Boolean, default: undefined },
    name: String,
    form: String,
    value: String,
    readOnly: Boolean,
    required: Boolean,
    invalid: Boolean,
    onCheckedChange: Function as PropType<
      (details: { checked: boolean }) => void
    >,
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkSwitch.Root,
        {
          ...attrs,
          checked: props.checked,
          defaultChecked: props.defaultChecked,
          name: props.name,
          form: props.form,
          value: props.value,
          readOnly: props.readOnly,
          required: props.required,
          invalid: props.invalid,
          onCheckedChange: props.onCheckedChange,
          disabled: props.disabled,
          "data-scope": "switch",
          "data-part": "root",
          "data-size": props.size,
          "data-disabled": props.disabled ? "true" : undefined,
        },
        slots.default ? slots.default() : undefined,
      );
  },
});

export const LoongArkSwitchControl = defineComponent({
  name: "LoongArkSwitchControl",
  props: {
    size: sizeProp,
    disabled: boolProp(false),
  },
  setup(props, { attrs, slots }) {
    return () =>
      renderPart(
        ArkSwitch.Control,
        {
          ...attrs,
          disabled: props.disabled,
          "data-scope": "switch",
          "data-part": "control",
          "data-size": props.size,
          "data-disabled": props.disabled ? "true" : undefined,
        },
        slots,
      );
  },
});

export const LoongArkSwitchThumb = defineComponent({
  name: "LoongArkSwitchThumb",
  props: {
    size: sizeProp,
  },
  setup(props, { attrs }) {
    return () =>
      renderPart(ArkSwitch.Thumb, {
        ...attrs,
        "data-scope": "switch",
        "data-part": "thumb",
        "data-size": props.size,
      });
  },
});

export const LoongArkSwitchLabel = defineComponent({
  name: "LoongArkSwitchLabel",
  props: {
    disabled: boolProp(false),
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkSwitch.Label,
        {
          ...attrs,
          "data-scope": "switch",
          "data-part": "label",
          "data-disabled": props.disabled ? "true" : undefined,
        },
        slots.default ? slots.default() : undefined,
      );
  },
});

export const LoongArkSwitchHiddenInput =
  defineComponent<SwitchHiddenInputProps>(
    (props, { attrs, slots }) => {
      const api = useSwitchContext();

      const ref = nativeSelectionRef(() => ({ checked: api.value.checked }));
      return () =>
        renderPart(ArkSwitch.HiddenInput, { ...attrs, ...props, ref }, slots);
    },
    {
      name: "LoongArkSwitchHiddenInput",
      props: ["asChild"],
      inheritAttrs: false,
    },
  );

export const LoongArkSwitch: {
  Root: typeof LoongArkSwitchRoot;
  Control: typeof LoongArkSwitchControl;
  Thumb: typeof LoongArkSwitchThumb;
  Label: typeof LoongArkSwitchLabel;
  HiddenInput: typeof LoongArkSwitchHiddenInput;
} = {
  Root: LoongArkSwitchRoot,
  Control: LoongArkSwitchControl,
  Thumb: LoongArkSwitchThumb,
  Label: LoongArkSwitchLabel,
  HiddenInput: LoongArkSwitchHiddenInput,
};
