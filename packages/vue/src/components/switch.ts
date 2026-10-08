import { useFieldContext } from "@ark-ui/vue/field";
import { nativeSelectionFieldDescription } from "@loongark/kit";
import type { SwitchHiddenInputProps } from "@ark-ui/vue/switch";
import { nativeSelectionRef } from "../native-selection";
import { useSwitchContext } from "@ark-ui/vue/switch";
import { renderPart } from "../render-part";
import { resolveDynamicComponent, defineComponent, h } from "vue";
import type { PropType } from "vue";
import { Switch as ArkSwitch } from "@ark-ui/vue/switch";
import { ark } from "@ark-ui/vue";
import type { SwitchPrimitiveProps } from "@loongark/primitives";

export type SwitchSize = NonNullable<SwitchPrimitiveProps["size"]>;

const sizeProp = {
  type: {} as PropType<SwitchSize>,
  default: "md" as SwitchSize,
};

export const LoongArkSwitchRoot = defineComponent({
  name: "LoongArkSwitchRoot",
  props: {
    size: sizeProp,
    disabled: { type: Boolean, default: undefined },
    checked: { type: Boolean, default: undefined },
    defaultChecked: { type: Boolean, default: undefined },
    name: String,
    form: String,
    value: String,
    readOnly: { type: Boolean, default: undefined },
    required: { type: Boolean, default: undefined },
    invalid: { type: Boolean, default: undefined },
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
          ...(props.disabled ? { "data-disabled": "true" } : {}),
        },
        slots.default ? slots.default() : undefined,
      );
  },
});

export const LoongArkSwitchControl = defineComponent({
  name: "LoongArkSwitchControl",
  props: {
    size: sizeProp,
    disabled: { type: Boolean, default: undefined },
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
          ...(props.disabled ? { "data-disabled": "true" } : {}),
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
    disabled: { type: Boolean, default: undefined },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkSwitch.Label,
        {
          ...attrs,
          "data-scope": "switch",
          "data-part": "label",
          ...(props.disabled ? { "data-disabled": "true" } : {}),
        },
        slots.default ? slots.default() : undefined,
      );
  },
});

export const LoongArkSwitchHiddenInput =
  defineComponent<SwitchHiddenInputProps>(
    (props, { attrs, slots }) => {
      const field = useFieldContext();
      const api = useSwitchContext();

      const ref = nativeSelectionRef(() => ({ checked: api.value.checked }));
      return () =>
        renderPart(
          resolveDynamicComponent(ArkSwitch.HiddenInput),
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
          },
          slots,
        );
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
