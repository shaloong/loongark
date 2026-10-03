import { renderPart } from "../render-part";
import { defineComponent, h } from "vue";
import { ark } from "@ark-ui/vue";
import type { ButtonPrimitiveProps } from "@loongark/primitives";
import type { PropType } from "vue";

export type ButtonVariant = NonNullable<ButtonPrimitiveProps["variant"]>;
export type ButtonSize = NonNullable<ButtonPrimitiveProps["size"]>;

const truthy = (value: boolean) => (value ? "true" : undefined);

export const LoongArkButton = defineComponent({
  name: "LoongArkButton",
  props: {
    variant: {
      type: {} as PropType<ButtonVariant>,
      default: "solid" as ButtonVariant,
    },
    size: {
      type: {} as PropType<ButtonSize>,
      default: "md" as ButtonSize,
    },
    block: {
      type: {} as PropType<boolean>,
      default: false,
    },
    loading: {
      type: {} as PropType<boolean>,
      default: false,
    },
    disabled: {
      type: {} as PropType<boolean>,
      default: false,
    },
    type: {
      type: {} as PropType<"button" | "submit" | "reset">,
      default: "button",
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ark.button,
        {
          ...attrs,
          type: props.type,
          disabled: props.disabled || props.loading,
          "aria-disabled": props.disabled || props.loading ? "true" : undefined,
          "aria-busy": props.loading ? "true" : undefined,
          "data-scope": "button",
          "data-part": "root",
          "data-variant": props.variant,
          "data-size": props.size,
          "data-block": truthy(props.block),
          "data-loading": truthy(props.loading),
        },
        slots.default ? slots.default() : undefined,
      );
  },
});
