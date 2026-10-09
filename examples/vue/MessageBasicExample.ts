import { defineComponent, h } from "vue";
import { LoongArkMessage, LoongArkBubble } from "@loongark/vue";
export const MessageBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkMessage,
        {
          author: "小林",
          dateTime: "2026-10-09T09:30:00+08:00",
          timeLabel: "09:30",
        },
        {
          default: () => [
            h(
              LoongArkBubble,
              {},
              { default: () => ["你好，请查看项目说明。"] },
            ),
          ],
        },
      );
    };
  },
});
