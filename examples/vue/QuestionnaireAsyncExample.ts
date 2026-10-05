import { defineComponent, h, ref, shallowRef } from "vue";
import * as L from "@loongark/vue";
import {
  createQuestionnaireAsyncDemo,
  asyncSurveyDefaults,
  asyncSurveySummary,
} from "../shared/questionnaireAsyncDemo";
export const QuestionnaireAsyncExample = defineComponent({
  setup() {
    const answers = shallowRef<L.QuestionnaireValue>(asyncSurveyDefaults()),
      saved = shallowRef<L.QuestionnaireValue>(),
      aborted = ref(0),
      short = ref(false),
      shown = ref(true);
    const demo = createQuestionnaireAsyncDemo((n) => {
      aborted.value = n;
    });
    return () =>
      h(
        L.LoongArkStack,
        { gap: "lg", style: { width: "100%", maxWidth: "640px" } },
        () => [
          h(
            L.LoongArkTypography,
            { as: "h2" },
            () => "Check answers without losing your place",
          ),
          h(
            L.LoongArkTypography,
            { variant: "muted" },
            () =>
              "Checks belong to your service. Editing, cancelling or hiding the survey aborts pending work.",
          ),
          h(L.LoongArkStack, { orientation: "horizontal", gap: "sm" }, () => [
            h(
              L.LoongArkButton,
              { variant: "outline", onClick: () => demo.failNext() },
              () => "Fail next check",
            ),
            h(
              L.LoongArkButton,
              {
                variant: "outline",
                onClick: () => {
                  short.value = !short.value;
                },
              },
              () => (short.value ? "Restore questions" : "Use shorter survey"),
            ),
            h(
              L.LoongArkButton,
              {
                variant: "outline",
                onClick: () => {
                  shown.value = !shown.value;
                },
              },
              () => (shown.value ? "Hide survey" : "Show survey"),
            ),
          ]),
          shown.value &&
            h(L.LoongArkQuestionnaire, {
              label: "Async workspace setup",
              questions: short.value ? demo.questions.slice(1) : demo.questions,
              value: answers.value,
              completed: saved.value !== undefined,
              onValueChange: (d: { value: L.QuestionnaireValue }) => {
                answers.value = d.value;
              },
              onComplete: (d: { value: L.QuestionnaireValue }) => {
                saved.value = d.value;
              },
            }),
          h(
            "output",
            { "aria-label": "Cancelled checks" },
            "Cancelled checks: " + aborted.value,
          ),
          h(
            "output",
            { "aria-label": "Saved async answers" },
            asyncSurveySummary(saved.value),
          ),
        ],
      );
  },
});
