import { defineComponent, h } from "vue";
import {
  LoongArkEditableRoot,
  LoongArkEditableLabel,
  LoongArkEditableArea,
  LoongArkEditablePreview,
  LoongArkEditableInput,
  LoongArkEditableControl,
  LoongArkEditableEditTrigger,
  LoongArkEditableSubmitTrigger,
  LoongArkEditableCancelTrigger,
} from "@loongark/vue";
export const EditableBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkEditableRoot,
        { defaultValue: "项目名称" },
        {
          default: () => [
            h(LoongArkEditableLabel, {}, { default: () => ["名称"] }),
            h(
              LoongArkEditableArea,
              {},
              {
                default: () => [
                  h(LoongArkEditablePreview, {}),
                  h(LoongArkEditableInput, {}),
                ],
              },
            ),
            h(
              LoongArkEditableControl,
              {},
              {
                default: () => [
                  h(
                    LoongArkEditableEditTrigger,
                    {},
                    { default: () => ["编辑"] },
                  ),
                  h(
                    LoongArkEditableSubmitTrigger,
                    {},
                    { default: () => ["保存"] },
                  ),
                  h(
                    LoongArkEditableCancelTrigger,
                    {},
                    { default: () => ["取消"] },
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
