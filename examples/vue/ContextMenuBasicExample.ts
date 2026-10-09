import { defineComponent, h } from "vue";
import { LoongArkContextMenu } from "@loongark/vue";
export const ContextMenuBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkContextMenu.Root,
        {},
        {
          default: () => [
            h(
              LoongArkContextMenu.Trigger,
              {},
              { default: () => ["右键打开菜单"] },
            ),
            h(
              LoongArkContextMenu.Positioner,
              {},
              {
                default: () => [
                  h(
                    LoongArkContextMenu.Content,
                    {},
                    {
                      default: () => [
                        h(
                          LoongArkContextMenu.Item,
                          { value: "refresh" },
                          { default: () => ["刷新"] },
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
