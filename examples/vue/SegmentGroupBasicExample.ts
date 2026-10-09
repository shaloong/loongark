import {
  defineComponent,
  h,
  createVNode,
  resolveDynamicComponent,
  type VNodeProps,
} from "vue";
import {
  LoongArkSegmentGroupRoot,
  LoongArkSegmentGroupItem,
  LoongArkSegmentGroupItemHiddenInput,
  LoongArkSegmentGroupItemText,
} from "@loongark/vue";
import type { SegmentGroupItemProps } from "@ark-ui/vue/segment-group";
import type { SegmentGroupItemHiddenInputProps } from "@ark-ui/vue/segment-group";
export const SegmentGroupBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkSegmentGroupRoot,
        { "aria-label": "视图", name: "view", defaultValue: "overview" },
        {
          default: () => [
            createVNode(
              resolveDynamicComponent(LoongArkSegmentGroupItem),
              {
                ...({ value: "overview" } satisfies SegmentGroupItemProps &
                  VNodeProps),
              },
              {
                default: () => [
                  createVNode(
                    resolveDynamicComponent(
                      LoongArkSegmentGroupItemHiddenInput,
                    ),
                    {
                      ...({} satisfies SegmentGroupItemHiddenInputProps &
                        VNodeProps),
                    },
                  ),
                  h(
                    LoongArkSegmentGroupItemText,
                    {},
                    { default: () => ["概览"] },
                  ),
                ],
              },
            ),
            createVNode(
              resolveDynamicComponent(LoongArkSegmentGroupItem),
              {
                ...({ value: "activity" } satisfies SegmentGroupItemProps &
                  VNodeProps),
              },
              {
                default: () => [
                  createVNode(
                    resolveDynamicComponent(
                      LoongArkSegmentGroupItemHiddenInput,
                    ),
                    {
                      ...({} satisfies SegmentGroupItemHiddenInputProps &
                        VNodeProps),
                    },
                  ),
                  h(
                    LoongArkSegmentGroupItemText,
                    {},
                    { default: () => ["动态"] },
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
