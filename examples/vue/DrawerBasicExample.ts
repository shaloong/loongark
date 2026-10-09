import { defineComponent, h } from "vue";
import { LoongArkDrawer } from "@loongark/vue";
export const DrawerBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkDrawer.Root,
        {},
        {
          default: () => [
            h(LoongArkDrawer.Trigger, {}, { default: () => ["打开抽屉"] }),
            h(
              LoongArkDrawer.Portal,
              {},
              {
                default: () => [
                  h(LoongArkDrawer.Overlay, {}),
                  h(
                    LoongArkDrawer.Positioner,
                    {},
                    {
                      default: () => [
                        h(
                          LoongArkDrawer.Content,
                          {},
                          {
                            default: () => [
                              h(
                                LoongArkDrawer.Title,
                                {},
                                { default: () => ["偏好设置"] },
                              ),
                              h(
                                LoongArkDrawer.Description,
                                {},
                                { default: () => ["查看或修改偏好。"] },
                              ),
                              h(
                                LoongArkDrawer.Action,
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
