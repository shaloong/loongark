import type { SegmentGroupItemHiddenInputProps } from "@ark-ui/vue/segment-group";
import {
  defineComponent,
  h,
  createVNode,
  resolveDynamicComponent,
  ref,
  type PropType,
} from "vue";
import {
  LoongArkButton,
  LoongArkSegmentGroupRoot,
  LoongArkSegmentGroupItem,
  LoongArkSegmentGroupItemHiddenInput,
  LoongArkSegmentGroupItemText,
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
    const value = ref<string | null>("overview");

    return () =>
      h(
        "form",
        { style: "display: flex; flex-direction: column; gap: 12px;" },
        [
          h(
            LoongArkSegmentGroupRoot,
            {
              size: props.size,
              "aria-label": "View",
              name: "view",
              orientation: props.orientation,
              disabled: props.disabled,
              value: value.value,
              "onUpdate:value": (next: string | null) => {
                value.value = next;
              },
            },
            {
              default: () =>
                options.map((option) =>
                  h(
                    LoongArkSegmentGroupItem,
                    { value: option.value, key: option.value },
                    {
                      default: () => [
                        createVNode(
                          resolveDynamicComponent(
                            LoongArkSegmentGroupItemHiddenInput,
                          ),
                        ),
                        h(LoongArkSegmentGroupItemText, {}, () => option.label),
                      ],
                    },
                  ),
                ),
            },
          ),
          h(
            "span",
            {
              style:
                "font-size: 14px; color: var(--lk-color-semantic-mutedforeground);",
            },
            `Selected: ${value.value || "None"}`,
          ),
          h(
            LoongArkButton,
            {
              type: "button",
              variant: "outline",
              onClick: () => {
                value.value = "overview";
              },
            },
            () => "Reset view",
          ),
        ],
      );
  },
});
