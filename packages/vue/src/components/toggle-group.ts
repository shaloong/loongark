import type { ToggleGroupRootProps as NativeToggleGroupRootProps } from "@ark-ui/vue/toggle-group";
import { renderPart } from "../render-part";
/**
 * Toggle Group component - Vue wrapper.
 * Based on Ark UI Toggle Group.
 */
import { defineComponent, h, type PropType } from "vue";
import { ToggleGroup as ArkToggleGroup } from "@ark-ui/vue/toggle-group";
import type {
  ToggleGroupOrientation,
  ToggleGroupSize,
} from "@loongark/primitives";

export interface ToggleGroupValueChangeDetails {
  value: string[];
}

export const LoongArkToggleGroupRoot = defineComponent({
  name: "LoongArkToggleGroupRoot",
  props: {
    size: {
      type: String as PropType<ToggleGroupSize>,
      default: "md",
    },
    orientation: {
      type: String as PropType<ToggleGroupOrientation>,
      default: "horizontal",
    },
    value: {
      type: Array as PropType<string[]>,
    },
    defaultValue: {
      type: Array as PropType<string[]>,
    },
    multiple: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    loopFocus: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    rovingFocus: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    deselectable: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    id: {
      type: String as PropType<string>,
    },
    ids: {
      type: Object as PropType<NativeToggleGroupRootProps["ids"]>,
    },
    onValueChange: {
      type: Function as PropType<
        (details: ToggleGroupValueChangeDetails) => void
      >,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkToggleGroup.Root,
        {
          ...attrs,
          ...props,
          orientation: props.orientation,
          "data-scope": "toggle-group",
          "data-part": "root",
          "data-size": props.size,
          "data-orientation": props.orientation,
        },
        slots,
      );
  },
});

export const LoongArkToggleGroupItem = defineComponent({
  name: "LoongArkToggleGroupItem",
  props: {
    value: {
      type: String as PropType<string>,
      required: true,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkToggleGroup.Item,
        {
          ...attrs,
          value: props.value,
          disabled: props.disabled,
          "data-scope": "toggle-group",
          "data-part": "item",
        },
        slots,
      );
  },
});
