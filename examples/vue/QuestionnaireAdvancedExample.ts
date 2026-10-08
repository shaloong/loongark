import { defineComponent, h, ref, shallowRef } from "vue";
import * as L from "@loongark/vue";
import {
  workspaceQuestions,
  workspaceDefaults,
  workspaceSummary,
} from "../shared/questionnaireAdvancedDemo";
export const QuestionnaireAdvancedExample = defineComponent({
  setup() {
    const answers = shallowRef<L.QuestionnaireValue>(workspaceDefaults()),
      saved = shallowRef<L.QuestionnaireValue>(),
      locked = ref(false),
      revision = ref(0);
    return () =>
      h(
        L.LoongArkStack,
        { gap: "lg", style: { width: "100%", maxWidth: "640px" } },
        () => [
          h(L.LoongArkTypography, { as: "h2" }, () => "A workspace that fits"),
          h(
            L.LoongArkTypography,
            { variant: "muted" },
            () =>
              "Team details stay saved when you switch to a personal project. Only relevant answers are submitted.",
          ),
          h(L.LoongArkStack, { orientation: "horizontal", gap: "sm" }, () => [
            h(
              L.LoongArkButton,
              {
                variant: "outline",
                onClick: () => (locked.value = !locked.value),
              },
              () =>
                locked.value ? "Allow answer updates" : "Lock answer updates",
            ),
            h(
              L.LoongArkButton,
              {
                variant: "outline",
                onClick: () => {
                  answers.value = workspaceDefaults();
                  saved.value = undefined;
                  locked.value = false;
                  revision.value++;
                },
              },
              () => "Reset survey",
            ),
          ]),
          h(L.LoongArkQuestionnaire, {
            key: revision.value,
            label: "Workspace setup",
            questions: workspaceQuestions,
            value: answers.value,
            completed: saved.value !== undefined,
            onValueChange: (details: { value: L.QuestionnaireValue }) => {
              if (!locked.value) answers.value = details.value;
            },
            onComplete: (details: { value: L.QuestionnaireValue }) =>
              (saved.value = details.value),
          }),
          h(
            "output",
            {
              "aria-label": "Saved answers",
              "data-answer-keys": Object.keys(saved.value ?? {}).join(","),
            },
            workspaceSummary(saved.value),
          ),
        ],
      );
  },
});
