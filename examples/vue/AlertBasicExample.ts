import { defineComponent, h } from "vue";
import {
  LoongArkAlert,
  LoongArkAlertTitle,
  LoongArkAlertDescription,
} from "@loongark/vue";
export const AlertBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkAlert,
        {},
        {
          default: () => [
            h(LoongArkAlertTitle, {}, { default: () => ["设置已保存"] }),
            h(
              LoongArkAlertDescription,
              {},
              { default: () => ["当前修改已经生效。"] },
            ),
          ],
        },
      );
    };
  },
});
