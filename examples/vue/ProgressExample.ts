import { defineComponent, h, type PropType } from "vue";
import {
  LoongArkProgressRoot,
  LoongArkProgressLabel,
  LoongArkProgressTrack,
  LoongArkProgressRange,
  LoongArkProgressValueText,
  LoongArkProgressView,
  LoongArkProgressCircle,
  LoongArkProgressCircleTrack,
  LoongArkProgressCircleRange,
} from "@loongark/vue";
import type { ProgressOrientation, ProgressSize } from "@loongark/primitives";

export const ProgressExample = defineComponent({
  name: "ProgressExample",
  props: {
    size: {
      type: String as PropType<ProgressSize>,
      default: "md",
    },
    orientation: {
      type: String as PropType<ProgressOrientation>,
      default: "horizontal",
    },
    value: {
      type: Number as PropType<number>,
      default: 52,
    },
  },
  setup(props) {
    return () =>
      h("div", { style: "display: grid; gap: 20px;" }, [
        h(
          LoongArkProgressRoot,
          {
            value: props.value,
            size: props.size,
            orientation: props.orientation,
          },
          {
            default: () => [
              h(LoongArkProgressLabel, null, { default: () => "Upload" }),
              h(LoongArkProgressTrack, null, {
                default: () => h(LoongArkProgressRange),
              }),
              h(LoongArkProgressValueText),
            ],
          }
        ),
        h(
          LoongArkProgressRoot,
          { value: props.value, size: props.size },
          {
            default: () => [
              h(LoongArkProgressView, null, {
                default: () =>
                  h(
                    LoongArkProgressCircle,
                    null,
                    {
                      default: () => [
                        h(LoongArkProgressCircleTrack),
                        h(LoongArkProgressCircleRange),
                      ],
                    }
                  ),
              }),
              h(LoongArkProgressValueText),
            ],
          }
        ),
      ]);
  },
});
