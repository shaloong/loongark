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
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkSwitch.Root,
        {
          ...attrs,
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

export const LoongArkSwitchHiddenInput: typeof ArkSwitch.HiddenInput =
  ArkSwitch.HiddenInput;

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
