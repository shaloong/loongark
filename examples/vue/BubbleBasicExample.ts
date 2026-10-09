import { defineComponent, h } from "vue";
import { LoongArkBubble } from "@loongark/vue";
export const BubbleBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkBubble,
        {},
        { default: () => ["你好，我们开始讨论吧。"] },
      );
    };
  },
});
