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
      h(
        ArkSwitch.Root,
        {
          ...attrs,
          "data-lk-switch": "",
          "data-size": props.size,
          "data-disabled": props.disabled ? "true" : undefined,
        },
        slots.default ? slots.default() : undefined
      );
  },
});

export const LoongArkSwitchControl = defineComponent({
  name: "LoongArkSwitchControl",
  props: {
    size: sizeProp,
    disabled: boolProp(false),
  },
  setup(props, { attrs }) {
    return () =>
      h(ArkSwitch.Control, {
        ...attrs,
        "data-lk-switch-control": "",
        "data-size": props.size,
        "data-disabled": props.disabled ? "true" : undefined,
      });
  },
});

export const LoongArkSwitchThumb = defineComponent({
  name: "LoongArkSwitchThumb",
  props: {
    size: sizeProp,
  },
  setup(props, { attrs }) {
    return () =>
      h(ArkSwitch.Thumb, {
        ...attrs,
        "data-lk-switch-thumb": "",
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
      h(
        ArkSwitch.Label,
        {
          ...attrs,
          "data-lk-switch-label": "",
          "data-disabled": props.disabled ? "true" : undefined,
        },
        slots.default ? slots.default() : undefined
      );
  },
});

export const LoongArkSwitchHiddenInput = ArkSwitch.HiddenInput;

export const LoongArkSwitch = {
  Root: LoongArkSwitchRoot,
  Control: LoongArkSwitchControl,
  Thumb: LoongArkSwitchThumb,
  Label: LoongArkSwitchLabel,
  HiddenInput: LoongArkSwitchHiddenInput,
};
