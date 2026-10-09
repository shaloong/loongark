import { defineComponent, h } from "vue";
import {
  LoongArkStepsRoot,
  LoongArkStepsList,
  LoongArkStepsItem,
  LoongArkStepsTrigger,
  LoongArkStepsIndicator,
  LoongArkStepsSeparator,
  LoongArkStepsContent,
  LoongArkStepsCompletedContent,
  LoongArkStepsPrevTrigger,
  LoongArkStepsNextTrigger,
} from "@loongark/vue";
export const StepsBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkStepsRoot,
        { count: 2 },
        {
          default: () => [
            h(
              LoongArkStepsList,
              {},
              {
                default: () => [
                  h(
                    LoongArkStepsItem,
                    { index: 0 },
                    {
                      default: () => [
                        h(
                          LoongArkStepsTrigger,
                          {},
                          { default: () => ["填写信息"] },
                        ),
                        h(LoongArkStepsIndicator, {}, { default: () => ["1"] }),
                        h(LoongArkStepsSeparator, {}),
                      ],
                    },
                  ),
                  h(
                    LoongArkStepsItem,
                    { index: 1 },
                    {
                      default: () => [
                        h(
                          LoongArkStepsTrigger,
                          {},
                          { default: () => ["确认"] },
                        ),
                        h(LoongArkStepsIndicator, {}, { default: () => ["2"] }),
                      ],
                    },
                  ),
                ],
              },
            ),
            h(
              LoongArkStepsContent,
              { index: 0 },
              { default: () => ["填写项目名称。"] },
            ),
            h(
              LoongArkStepsContent,
              { index: 1 },
              { default: () => ["确认项目信息。"] },
            ),
            h(
              LoongArkStepsCompletedContent,
              {},
              { default: () => ["已完成。"] },
            ),
            h(LoongArkStepsPrevTrigger, {}, { default: () => ["上一步"] }),
            h(LoongArkStepsNextTrigger, {}, { default: () => ["下一步"] }),
          ],
        },
      );
    };
  },
});
