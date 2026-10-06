import { defineComponent, h, ref } from "vue";
import * as L from "@loongark/vue";
import {
  matrixQuestions,
  createQuestionnaireMatrixDemo,
} from "../shared/questionnaireMatrixDemo";
export const QuestionnaireMatrixExample = defineComponent({
  setup() {
    const revision = ref(0),
      demo = createQuestionnaireMatrixDemo(() => revision.value++);
    return () => {
      revision.value;
      const snapshot = demo.snapshot;
      const button = (label: string, onClick: () => void) =>
        h(L.LoongArkButton, { variant: "outline", onClick }, () => label);
      return h(
        L.LoongArkStack,
        { gap: "md", style: { maxWidth: "640px", width: "100%" } },
        () => [
          h(
            L.LoongArkTypography,
            { as: "h2" },
            () => "Multiple answers per row",
          ),
          h(L.LoongArkStack, { orientation: "horizontal", gap: "sm" }, () => [
            button(
              snapshot.reject ? "Accept updates" : "Reject updates",
              demo.toggleReject,
            ),
            button(
              snapshot.disabled ? "Enable survey" : "Disable survey",
              demo.toggleDisabled,
            ),
            button(
              snapshot.shown ? "Hide survey" : "Show survey",
              demo.toggleShown,
            ),
            button("Reset survey", demo.reset),
          ]),
          snapshot.shown &&
            h(L.LoongArkQuestionnaire, {
              label: "Matrix review",
              questions: matrixQuestions,
              value: snapshot.value,
              disabled: snapshot.disabled,
              completed: !!snapshot.saved,
              onValueChange: demo.change,
              onComplete: demo.complete,
            }),
          h(
            "output",
            {
              "aria-label": "Saved matrix answers",
              style: {
                minWidth: 0,
                maxWidth: "100%",
                overflowWrap: "anywhere",
              },
            },
            snapshot.saved
              ? JSON.stringify(snapshot.saved)
              : "No answers saved",
          ),
        ],
      );
    };
  },
});
