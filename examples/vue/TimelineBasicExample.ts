import { defineComponent, h } from "vue";
import {
  LoongArkTimeline,
  LoongArkTimelineItem,
  LoongArkTimelineIndicator,
  LoongArkTimelineContent,
  LoongArkTimelineTitle,
  LoongArkTimelineDescription,
  LoongArkTimelineTime,
} from "@loongark/vue";
export const TimelineBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkTimeline,
        {},
        {
          default: () => [
            h(
              LoongArkTimelineItem,
              {},
              {
                default: () => [
                  h(LoongArkTimelineIndicator, {}, { default: () => ["1"] }),
                  h(
                    LoongArkTimelineContent,
                    {},
                    {
                      default: () => [
                        h(
                          LoongArkTimelineTitle,
                          {},
                          { default: () => ["创建项目"] },
                        ),
                        h(
                          LoongArkTimelineDescription,
                          {},
                          { default: () => ["项目已经创建。"] },
                        ),
                        h(
                          LoongArkTimelineTime,
                          { dateTime: "2026-10-09T09:00:00+08:00" },
                          { default: () => ["09:00"] },
                        ),
                      ],
                    },
                  ),
                ],
              },
            ),
          ],
        },
      );
    };
  },
});
