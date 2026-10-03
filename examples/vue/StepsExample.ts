import { defineComponent, h, ref, type PropType } from "vue";
import {
  LoongArkStepsRoot,
  LoongArkStepsList,
  LoongArkStepsItem,
  LoongArkStepsIndicator,
  LoongArkStepsSeparator,
  LoongArkStepsTrigger,
  LoongArkStepsContent,
  LoongArkStepsCompletedContent,
  LoongArkStepsNextTrigger,
  LoongArkStepsPrevTrigger,
} from "@loongark/vue";
import type { StepsOrientation, StepsSize } from "@loongark/primitives";

const steps = [
  { title: "Account", description: "Create your profile" },
  { title: "Workspace", description: "Add team settings" },
  { title: "Review", description: "Confirm and launch" },
];

export const StepsExample = defineComponent({
  name: "StepsExample",
  props: {
    size: {
      type: String as PropType<StepsSize>,
      default: "md",
    },
    orientation: {
      type: String as PropType<StepsOrientation>,
      default: "horizontal",
    },
  },
  setup(props) {
    const value = ref(0);

    return () =>
      h("div", { style: "display: grid; gap: 16px;" }, [
        h(
          LoongArkStepsRoot,
          {
            step: value.value,
            count: steps.length,
            size: props.size,
            orientation: props.orientation,
            onStepChange: (details: { step: number }) => {
              value.value = details.step;
            },
          },
          {
            default: () => [
              h(LoongArkStepsList, null, {
                default: () =>
                  steps.flatMap((step, index) => [
                    h(
                      LoongArkStepsItem,
                      { index, key: step.title },
                      {
                        default: () => [
                          h(LoongArkStepsIndicator, null, {
                            default: () => `${index + 1}`,
                          }),
                          h("div", null, [
                            h(LoongArkStepsTrigger, null, {
                              default: () => step.title,
                            }),
                            h("span", null, step.description),
                          ]),
                          index < steps.length - 1
                            ? h(LoongArkStepsSeparator)
                            : null,
                        ],
                      },
                    ),
                  ]),
              }),
              ...steps.map((step, index) =>
                h(
                  LoongArkStepsContent,
                  { index, key: step.title },
                  { default: () => step.description },
                ),
              ),
              h(LoongArkStepsCompletedContent, null, {
                default: () => "All steps completed.",
              }),
              h("div", { style: "display: flex; gap: 8px;" }, [
                h(LoongArkStepsPrevTrigger, null, { default: () => "Back" }),
                h(LoongArkStepsNextTrigger, null, { default: () => "Next" }),
              ]),
            ],
          },
        ),
      ]);
  },
});
