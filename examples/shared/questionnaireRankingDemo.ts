import type { Question, QuestionnaireValue } from "@loongark/kit";
import { createQuestionnaireTypesDemo } from "./questionnaireTypesDemo";
export const rankingQuestions: readonly Question[] = [
  {
    id: "priority",
    label: "Order your priorities",
    description:
      "Drag an item by its handle, or use the keyboard and move buttons.",
    type: "ranking",
    required: true,
    options: [
      { value: "access", label: "Accessibility and keyboard interaction" },
      {
        value: "layout",
        label:
          "Layout and alignment with longer descriptions on a narrow screen",
      },
      { value: "speed", label: "Responsiveness" },
    ],
  },
];
export function createQuestionnaireRankingDemo(notify: () => void) {
  const demo = createQuestionnaireTypesDemo(notify);
  let callbacks = 0,
    limited = false;
  return {
    ...demo,
    get snapshot() {
      return {
        ...demo.snapshot,
        callbacks,
        limited,
        questions: limited
          ? [
              {
                ...rankingQuestions[0],
                options: rankingQuestions[0].options?.slice(0, 2),
              },
            ]
          : rankingQuestions,
      };
    },
    change(details: { value: QuestionnaireValue }) {
      callbacks++;
      demo.change(details);
    },
    toggleOptions() {
      limited = !limited;
      notify();
    },
    replaceOrder() {
      demo.change({ value: { priority: ["speed", "layout", "access"] } });
    },
    reset() {
      callbacks = 0;
      limited = false;
      demo.reset();
    },
  };
}
