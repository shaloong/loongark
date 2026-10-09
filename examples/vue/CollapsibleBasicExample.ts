import { defineComponent, h } from "vue";
import {
  LoongArkCollapsibleRoot,
  LoongArkCollapsibleTrigger,
  LoongArkCollapsibleContent,
} from "@loongark/vue";
export const CollapsibleBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkCollapsibleRoot,
        {},
        {
          default: () => [
            h(
              LoongArkCollapsibleTrigger,
              {},
              { default: () => ["查看详细信息"] },
            ),
            h(
              LoongArkCollapsibleContent,
              {},
              { default: () => ["展开内容保留组件的键盘和焦点行为。"] },
            ),
          ],
        },
      );
    };
  },
});
