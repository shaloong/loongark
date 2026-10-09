import { defineComponent, h } from "vue";
import { LoongArkDialog } from "@loongark/vue";
export const DialogBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkDialog.Root,
        {},
        {
          default: () => [
            h(LoongArkDialog.Trigger, {}, { default: () => ["打开弹窗"] }),
            h(
              LoongArkDialog.Portal,
              {},
              {
                default: () => [
                  h(LoongArkDialog.Overlay, {}),
                  h(
                    LoongArkDialog.Positioner,
                    {},
                    {
                      default: () => [
                        h(
                          LoongArkDialog.Content,
                          {},
                          {
                            default: () => [
                              h(
                                LoongArkDialog.Title,
                                {},
                                { default: () => ["确认设置"] },
                              ),
                              h(
                                LoongArkDialog.Description,
                                {},
                                { default: () => ["关闭窗口后返回触发按钮。"] },
                              ),
                              h(
                                LoongArkDialog.CloseTrigger,
                                {},
                                { default: () => ["关闭"] },
                              ),
                            ],
                          },
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
