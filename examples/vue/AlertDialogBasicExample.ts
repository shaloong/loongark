import { defineComponent, h } from "vue";
import {
  LoongArkAlertDialogRoot,
  LoongArkDialogTrigger,
  LoongArkDialogPortal,
  LoongArkDialogOverlay,
  LoongArkDialogPositioner,
  LoongArkDialogContent,
  LoongArkDialogTitle,
  LoongArkDialogDescription,
  LoongArkDialogCloseTrigger,
} from "@loongark/vue";
export const AlertDialogBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkAlertDialogRoot,
        {},
        {
          default: () => [
            h(LoongArkDialogTrigger, {}, { default: () => ["确认操作"] }),
            h(
              LoongArkDialogPortal,
              {},
              {
                default: () => [
                  h(LoongArkDialogOverlay, {}),
                  h(
                    LoongArkDialogPositioner,
                    {},
                    {
                      default: () => [
                        h(
                          LoongArkDialogContent,
                          {},
                          {
                            default: () => [
                              h(
                                LoongArkDialogTitle,
                                {},
                                { default: () => ["继续操作？"] },
                              ),
                              h(
                                LoongArkDialogDescription,
                                {},
                                {
                                  default: () => ["关闭窗口不会修改任何数据。"],
                                },
                              ),
                              h(
                                LoongArkDialogCloseTrigger,
                                {},
                                { default: () => ["取消"] },
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
