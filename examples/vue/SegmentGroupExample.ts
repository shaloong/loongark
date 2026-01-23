import { defineComponent, h, ref, type PropType } from "vue";
import {
  LoongArkSegmentGroupRoot,
  LoongArkSegmentGroupItem,
} from "@loongark/vue";
import type {
  SegmentGroupOrientation,
  SegmentGroupSize,
} from "@loongark/primitives";

const options = [
  { label: "Overview", value: "overview" },
  { label: "Activity", value: "activity" },
  { label: "Settings", value: "settings" },
];

export const SegmentGroupExample = defineComponent({
  name: "SegmentGroupExample",
  props: {
    size: {
      type: String as PropType<SegmentGroupSize>,
      default: "md",
    },
    orientation: {
      type: String as PropType<SegmentGroupOrientation>,
      default: "horizontal",
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props) {
    const value = ref<string[]>(["overview"]);

    return () =>
      h(
        "div",
        { style: "display: flex; flex-direction: column; gap: 12px;" },
        [
          h(
            LoongArkSegmentGroupRoot,
            {
              size: props.size,
              orientation: props.orientation,
              disabled: props.disabled,
              value: value.value,
              onValueChange: (details: { value: string[] }) => {
                value.value = details.value;
              },
            },
            {
              default: () =>
                options.map((option) =>
                  h(
                    LoongArkSegmentGroupItem,
                    { value: option.value, key: option.value },
                    { default: () => option.label }
                  )
                ),
            }
          ),
          h(
            "span",
            { style: "font-size: 14px; color: #666;" },
            `Selected: ${value.value[0] || "None"}`
          ),
        ]
      );
  },
});
