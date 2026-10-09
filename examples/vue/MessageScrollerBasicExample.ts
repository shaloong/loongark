import { defineComponent, h } from "vue";
import {
  LoongArkMessageScroller,
  LoongArkMessage,
  LoongArkBubble,
} from "@loongark/vue";
export const MessageScrollerBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkMessageScroller,
        { label: "聊天记录", jumpLabel: "跳到最新消息" },
        {
          default: () => [
            h(
              LoongArkMessage,
              { author: "小林" },
              {
                default: () => [
                  h(LoongArkBubble, {}, { default: () => ["第一条消息。"] }),
                ],
              },
            ),
            h(
              LoongArkMessage,
              { author: "你", side: "outgoing" },
              {
                default: () => [
                  h(
                    LoongArkBubble,
                    { side: "outgoing" },
                    { default: () => ["收到。"] },
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
