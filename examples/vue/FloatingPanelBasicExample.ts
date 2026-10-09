import { defineComponent, h } from "vue";
import { LoongArkFloatingPanel } from "@loongark/vue";
export const FloatingPanelBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkFloatingPanel.Root,
        {},
        {
          default: () => [
            h(
              LoongArkFloatingPanel.Trigger,
              {},
              { default: () => ["打开检查面板"] },
            ),
            h(
              LoongArkFloatingPanel.Positioner,
              {},
              {
                default: () => [
                  h(
                    LoongArkFloatingPanel.Content,
                    {},
                    {
                      default: () => [
                        h(
                          LoongArkFloatingPanel.Header,
                          {},
                          {
                            default: () => [
                              h(
                                LoongArkFloatingPanel.Title,
                                {},
                                { default: () => ["检查面板"] },
                              ),
                              h(
                                LoongArkFloatingPanel.CloseTrigger,
                                {},
                                { default: () => ["关闭"] },
                              ),
                            ],
                          },
                        ),
                        h(
                          LoongArkFloatingPanel.Body,
                          {},
                          { default: () => ["拖动标题栏或右下角调整面板。"] },
                        ),
                        h(LoongArkFloatingPanel.ResizeTrigger, { axis: "se" }),
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
