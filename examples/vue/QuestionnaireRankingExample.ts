import { defineComponent, h, ref } from "vue";
import * as L from "@loongark/vue";
import { createQuestionnaireRankingDemo } from "../shared/questionnaireRankingDemo";
export const QuestionnaireRankingExample = defineComponent({
  setup() {
    const revision = ref(0),
      demo = createQuestionnaireRankingDemo(() => revision.value++);
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
            () => "Reorder your priorities",
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
            button(
              snapshot.limited ? "Restore final option" : "Remove final option",
              demo.toggleOptions,
            ),
            button("External order", demo.replaceOrder),
          ]),
          snapshot.shown &&
            h(L.LoongArkQuestionnaire, {
              label: "Ranking review",
              questions: snapshot.questions,
              value: snapshot.value,
              disabled: snapshot.disabled,
              completed: !!snapshot.saved,
              onValueChange: demo.change,
              onComplete: demo.complete,
            }),
          h(
            "output",
            { "aria-label": "Ranking updates" },
            `${snapshot.callbacks} callbacks`,
          ),
          h(
            "output",
            {
              "aria-label": "Saved ranking answers",
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
