import { defineComponent, h, createVNode, resolveDynamicComponent } from "vue";
import type { DateInputSegmentProps } from "@ark-ui/vue/date-input";
import * as L from "@loongark/vue";
export const DateInputBasicExample = defineComponent({
  setup() {
    return () =>
      h(
        L.LoongArkDateInputRoot,
        {
          name: "appointment",
          locale: "zh-CN",
          defaultValue: [L.parseDate("2026-10-09")],
        },
        () => [
          h(L.LoongArkDateInputLabel, {}, () => "预约日期"),
          h(L.LoongArkDateInputControl, {}, () =>
            h(L.LoongArkDateInputSegmentGroup, {}, () =>
              h(
                L.LoongArkDateInputSegmentContext,
                {},
                {
                  default: (segment: DateInputSegmentProps["segment"]) =>
                    h(
                      L.LoongArkDateInputSegment,
                      { segment },
                      () => segment.text,
                    ),
                },
              ),
            ),
          ),
          createVNode(resolveDynamicComponent(L.LoongArkDateInputHiddenInput)),
        ],
      );
  },
});
