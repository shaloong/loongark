import { defineComponent, h } from "vue";
import {
  LoongArkJsonTreeViewRoot,
  LoongArkJsonTreeViewTree,
} from "@loongark/vue";
export const JsonTreeViewBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkJsonTreeViewRoot,
        { data: { project: "示例项目", members: 2 }, defaultExpandedDepth: 1 },
        {
          default: () => [
            h(LoongArkJsonTreeViewTree, { "aria-label": "项目数据" }),
          ],
        },
      );
    };
  },
});
