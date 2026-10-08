import {
  defineComponent,
  h,
  ref,
  onMounted,
  onBeforeUnmount,
  watch,
  nextTick,
  type PropType,
} from "vue";
import * as L from "@loongark/vue";
import { controlIcons, type QuestionnaireCustomContext } from "@loongark/kit";
const Registration = defineComponent({
  props: {
    context: {
      type: Object as PropType<QuestionnaireCustomContext>,
      required: true,
    },
    element: {
      type: Function as PropType<() => HTMLElement | undefined>,
      required: true,
    },
  },
  setup(p) {
    let cleanup: (() => void) | undefined;
    const register = () => {
      cleanup?.();
      const element = p.element();
      if (element)
        cleanup = p.context.registerControl({
          element,
          focus: () =>
            element
              .querySelector<HTMLElement>('[role="radio"][tabindex="0"]')
              ?.focus(),
        });
    };
    onMounted(register);
    watch(
      () => p.context,
      () => nextTick(register),
    );
    onBeforeUnmount(() => cleanup?.());
    return () => null;
  },
});
export const QuestionnaireRatingControl = defineComponent({
  props: {
    context: {
      type: Object as PropType<QuestionnaireCustomContext>,
      required: true,
    },
    suggest: {
      type: Function as PropType<(context: QuestionnaireCustomContext) => void>,
      required: true,
    },
  },
  setup(p) {
    const root = ref<HTMLDivElement>();
    return () =>
      h(
        L.LoongArkStack,
        { gap: "sm" },
        {
          default: () => [
            h("div", { ref: root }, [
              h(
                L.LoongArkRatingGroupRoot,
                {
                  modelValue: Number(p.context.answer) || 0,
                  disabled: p.context.disabled,
                  count: 5,
                  required: p.context.question.required,
                  size:
                    p.context.question.customKind === "compact-rating"
                      ? "sm"
                      : "md",
                  ids: {
                    label: p.context.labelId,
                    control: p.context.controlId,
                  },
                  onValueChange: ({ value }: { value: number }) =>
                    p.context.onAnswerChange(String(value)),
                },
                {
                  default: () => [
                    h(
                      L.LoongArkRatingGroupControl,
                      {
                        "aria-required": p.context.question.required
                          ? "true"
                          : undefined,
                        "aria-describedby":
                          p.context.descriptionId + " " + p.context.errorId,
                        "aria-invalid": p.context.invalid ? "true" : undefined,
                      },
                      {
                        default: () =>
                          [1, 2, 3, 4, 5].map((index) =>
                            h(
                              L.LoongArkRatingGroupItem,
                              {
                                index,
                                key: index,
                                ...(Number(p.context.answer) === 0 &&
                                index === 1 &&
                                !p.context.disabled
                                  ? { tabindex: 0 }
                                  : {}),
                              },
                              {
                                default: () =>
                                  h(L.LoongArkIcon, {
                                    icon: controlIcons.star,
                                    size: "lg",
                                  }),
                              },
                            ),
                          ),
                      },
                    ),
                    h(Registration, {
                      context: p.context,
                      element: () => root.value,
                    }),
                  ],
                },
              ),
            ]),
            h(
              L.LoongArkButton,
              {
                variant: "outline",
                size: "sm",
                disabled: p.context.disabled,
                onClick: () => p.suggest(p.context),
              },
              { default: () => "Suggest five stars" },
            ),
          ],
        },
      );
  },
});
