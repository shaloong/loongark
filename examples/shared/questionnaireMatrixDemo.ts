import type { Question, QuestionnaireValue } from "@loongark/kit";
export const matrixQuestions: readonly Question[] = [
  {
    id: "review",
    label: "Review each area",
    description: "Select one or two improvements in every available row.",
    type: "matrix",
    multiple: true,
    required: true,
    minSelections: 1,
    maxSelections: 2,
    rows: [
      { id: "navigation", label: "Navigation and keyboard focus" },
      {
        id: "content",
        label: "Content clarity and longer labels on a narrow screen",
      },
      { id: "retired", label: "Retired area", disabled: true },
    ],
    options: [
      { value: "keyboard", label: "Keyboard interaction" },
      { value: "layout", label: "Layout and alignment" },
      { value: "contrast", label: "Readable contrast" },
      { value: "retired", label: "Unavailable improvement", disabled: true },
    ],
  },
  {
    id: "notes",
    label: "Additional notes",
    description: "Optional context for the selected improvements.",
    type: "text",
    maxLength: 120,
  },
];
export function createQuestionnaireMatrixDemo(notify: () => void) {
  let value: QuestionnaireValue = {},
    saved: QuestionnaireValue | undefined,
    reject = false,
    disabled = false,
    shown = true;
  return {
    get snapshot() {
      return { value, saved, reject, disabled, shown };
    },
    change(details: { value: QuestionnaireValue }) {
      if (!reject) value = details.value;
      notify();
    },
    complete(details: { value: QuestionnaireValue }) {
      saved = details.value;
      notify();
    },
    toggleReject() {
      reject = !reject;
      notify();
    },
    toggleDisabled() {
      disabled = !disabled;
      notify();
    },
    toggleShown() {
      shown = !shown;
      notify();
    },
    reset() {
      value = {};
      saved = undefined;
      reject = false;
      disabled = false;
      shown = false;
      notify();
      queueMicrotask(() => {
        shown = true;
        notify();
      });
    },
  };
}
