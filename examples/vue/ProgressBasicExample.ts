import { defineComponent, h } from "vue";
import {
  LoongArkProgressRoot,
  LoongArkProgressLabel,
  LoongArkProgressTrack,
  LoongArkProgressRange,
  LoongArkProgressValueText,
} from "@loongark/vue";
export const ProgressBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkProgressRoot,
        { value: 60 },
        {
          default: () => [
            h(LoongArkProgressLabel, {}, { default: () => ["上传进度"] }),
            h(
              LoongArkProgressTrack,
              {},
              { default: () => [h(LoongArkProgressRange, {})] },
            ),
            h(LoongArkProgressValueText, {}),
          ],
        },
      );
    };
  },
});
