import {
  defineComponent,
  h,
  createVNode,
  resolveDynamicComponent,
  type VNodeProps,
} from "vue";
import {
  createTreeCollection,
  LoongArkTreeViewRoot,
  LoongArkTreeViewLabel,
  LoongArkTreeViewTree,
  LoongArkTreeViewNodeProvider,
  LoongArkTreeViewItem,
  LoongArkTreeViewItemText,
} from "@loongark/vue";
import type { TreeViewRootProps } from "@ark-ui/vue/tree-view";
import type { TreeViewNodeProviderProps } from "@ark-ui/vue/tree-view";
export const TreeViewBasicExample = defineComponent({
  setup() {
    interface FileNode {
      id: string;
      name: string;
      children?: FileNode[];
    }
    const nodes: FileNode[] = [
      { id: "docs", name: "文档" },
      { id: "examples", name: "示例" },
    ];
    const collection = createTreeCollection<FileNode>({
      nodeToValue: (node) => node.id,
      nodeToString: (node) => node.name,
      rootNode: { id: "root", name: "", children: nodes },
    });
    return () => {
      return createVNode(
        resolveDynamicComponent(LoongArkTreeViewRoot),
        {
          ...({ collection: collection } satisfies TreeViewRootProps<
            (typeof nodes)[number]
          > &
            VNodeProps),
        },
        {
          default: () => [
            h(LoongArkTreeViewLabel, {}, { default: () => ["文件"] }),
            h(
              LoongArkTreeViewTree,
              {},
              {
                default: () => [
                  nodes.map((node, index) =>
                    createVNode(
                      resolveDynamicComponent(LoongArkTreeViewNodeProvider),
                      {
                        ...({
                          key: node.id,
                          node: node,
                          indexPath: [index],
                        } satisfies TreeViewNodeProviderProps<
                          (typeof nodes)[number]
                        > &
                          VNodeProps),
                      },
                      {
                        default: () => [
                          h(
                            LoongArkTreeViewItem,
                            {},
                            {
                              default: () => [
                                h(
                                  LoongArkTreeViewItemText,
                                  {},
                                  { default: () => [node.name] },
                                ),
                              ],
                            },
                          ),
                        ],
                      },
                    ),
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
