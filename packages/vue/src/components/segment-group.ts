import type { SegmentGroupRootProps } from "@ark-ui/vue/segment-group";
import { renderPart } from "../render-part";
/**
 * Segment Group component - Vue wrapper.
 * Uses Ark UI Toggle Group under the hood.
 */
import { defineComponent, h, type PropType } from "vue";
import { ToggleGroup as ArkToggleGroup } from "@ark-ui/vue/toggle-group";
import type {
  SegmentGroupOrientation,
  SegmentGroupSize,
} from "@loongark/primitives";

export interface SegmentGroupValueChangeDetails {
  value: string[];
}

export const LoongArkSegmentGroupRoot = defineComponent({
  name: "LoongArkSegmentGroupRoot",
  props: {
    size: {
      type: String as PropType<SegmentGroupSize>,
      default: "md",
    },
    orientation: {
      type: String as PropType<SegmentGroupOrientation>,
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
      type: Object as PropType<SegmentGroupRootProps["ids"]>,
    },
    onValueChange: {
      type: Function as PropType<
        (details: SegmentGroupValueChangeDetails) => void
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
          "data-scope": "segment-group",
          "data-part": "root",
          "data-size": props.size,
          "data-orientation": props.orientation,
        },
        slots,
      );
  },
});

export const LoongArkSegmentGroupItem = defineComponent({
  name: "LoongArkSegmentGroupItem",
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
          "data-scope": "segment-group",
          "data-part": "item",
        },
        slots,
      );
  },
});
