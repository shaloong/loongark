import { defineComponent, h } from "vue";
import {
  LoongArkSheetRoot,
  LoongArkSheetTrigger,
  LoongArkSheetPortal,
  LoongArkSheetOverlay,
  LoongArkSheetPositioner,
  LoongArkSheetContent,
  LoongArkSheetTitle,
  LoongArkSheetDescription,
  LoongArkSheetAction,
} from "@loongark/vue";
export const SheetBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkSheetRoot,
        {},
        {
          default: () => [
            h(LoongArkSheetTrigger, {}, { default: () => ["打开侧边面板"] }),
            h(
              LoongArkSheetPortal,
              {},
              {
                default: () => [
                  h(LoongArkSheetOverlay, {}),
                  h(
                    LoongArkSheetPositioner,
                    {},
                    {
                      default: () => [
                        h(
                          LoongArkSheetContent,
                          {},
                          {
                            default: () => [
                              h(
                                LoongArkSheetTitle,
                                {},
                                { default: () => ["编辑偏好"] },
                              ),
                              h(
                                LoongArkSheetDescription,
                                {},
                                { default: () => ["关闭后恢复触发器焦点。"] },
                              ),
                              h(
                                LoongArkSheetAction,
                                {},
                                { default: () => ["完成"] },
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
