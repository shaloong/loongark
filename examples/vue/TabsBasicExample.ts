import { defineComponent, h } from "vue";
import {
  LoongArkTabsRoot,
  LoongArkTabsList,
  LoongArkTabsTrigger,
  LoongArkTabsContent,
} from "@loongark/vue";
export const TabsBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkTabsRoot,
        { defaultValue: "overview" },
        {
          default: () => [
            h(
              LoongArkTabsList,
              {},
              {
                default: () => [
                  h(
                    LoongArkTabsTrigger,
                    { value: "overview" },
                    { default: () => ["概览"] },
                  ),
                  h(
                    LoongArkTabsTrigger,
                    { value: "api" },
                    { default: () => ["API"] },
                  ),
                ],
              },
            ),
            h(
              LoongArkTabsContent,
              { value: "overview" },
              { default: () => ["组件概览"] },
            ),
            h(
              LoongArkTabsContent,
              { value: "api" },
              { default: () => ["组件的公开 API"] },
            ),
          ],
        },
      );
    };
  },
});
