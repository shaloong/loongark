import type { SegmentGroupRootProps } from "@ark-ui/vue/segment-group";
import { renderPart } from "../render-part";
/**
 * Segment Group component - Vue wrapper.
 * 保留 Ark 原生 SegmentGroup 单选、表单与键盘语义。
 */
import { defineComponent, h, type PropType } from "vue";
import { SegmentGroup as ArkSegmentGroup } from "@ark-ui/vue/segment-group";
import type {
  SegmentGroupOrientation,
  SegmentGroupSize,
} from "@loongark/primitives";

export interface SegmentGroupValueChangeDetails {
  value: string | null;
}

export const LoongArkSegmentGroupRoot = defineComponent({
  name: "LoongArkSegmentGroupRoot",
  inheritAttrs: false,
  emits: ["valueChange", "update:value", "update:modelValue"],
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
      type: String as PropType<string | null>,
    },
    modelValue: { type: String as PropType<string | null> },
    defaultValue: {
      type: String as PropType<string | null>,
    },
    disabled: {
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
  setup(props, { slots, attrs, emit }) {
    return () => {
      const { size, value, modelValue, onValueChange, ...nativeProps } = props;
      return renderPart(
        ArkSegmentGroup.Root,
        {
          ...attrs,
          ...nativeProps,
          modelValue: modelValue !== undefined ? modelValue : value,
          onValueChange: (details: SegmentGroupValueChangeDetails) =>
            emit("valueChange", details),
          "onUpdate:modelValue": (next: string | null) => {
            emit("update:value", next);
            emit("update:modelValue", next);
          },
          orientation: props.orientation,
          "data-scope": "segment-group",
          "data-part": "root",
          "data-size": props.size,
          "data-orientation": props.orientation,
        },
        slots,
      );
    };
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
        ArkSegmentGroup.Item,
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
