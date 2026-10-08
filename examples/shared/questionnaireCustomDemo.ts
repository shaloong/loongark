import type {
  Question,
  QuestionnaireCustomContext,
  QuestionnaireValue,
} from "@loongark/kit";
const initial = (): QuestionnaireValue => ({
  rating: "3",
  people: [
    { id: "alpha", value: { name: "Alex Chen", rating: "2", note: "" } },
    { id: "beta", value: { name: "Morgan Lee", rating: "4", note: "" } },
  ],
});
export function createQuestionnaireCustomDemo(notify: () => void) {
  let value = initial(),
    saved: QuestionnaireValue | undefined;
  const state = {
    reject: false,
    disabled: false,
    shown: true,
    nested: false,
    compact: false,
    async: false,
    callbacks: 0,
    revision: 0,
  };
  const timers = new Set<ReturnType<typeof setTimeout>>();
  const validateAsync: Question["validateAsync"] = async (
    answer,
    _value,
    { signal },
  ) => {
    if (!state.async) return;
    await new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => {
        signal.removeEventListener("abort", cancel);
        resolve();
      }, 300);
      const cancel = () => {
        clearTimeout(timer);
        signal.removeEventListener("abort", cancel);
        reject(new DOMException("Cancelled", "AbortError"));
      };
      signal.addEventListener("abort", cancel, { once: true });
      if (signal.aborted) cancel();
    });
    return answer === "1" ? "Choose at least two stars." : undefined;
  };
  const validateRating: Question["validate"] = (answer) =>
    typeof answer === "string" && /^[1-5]$/.test(answer)
      ? undefined
      : "Choose a rating.";
  const rating = (): Question => ({
    id: "rating",
    label: "Experience rating",
    description: "Choose one to five stars with the arrow keys.",
    type: "custom",
    customKind: state.compact ? "compact-rating" : "rating",
    required: true,
    validate: validateRating,
    validateAsync: state.async ? validateAsync : undefined,
  });
  const definitions = (): readonly Question[] =>
    state.nested
      ? [
          {
            id: "people",
            label: "People",
            type: "group",
            required: true,
            minGroups: 1,
            maxGroups: 3,
            groupLabels: {
              instance: "Person",
              add: "Add person",
              remove: "Remove person",
            },
            questions: [
              {
                id: "name",
                label: "Person name",
                type: "text",
                required: true,
              },
              rating(),
              {
                id: "note",
                label: "What worked well?",
                type: "text",
                required: true,
                when: (local) => local.rating === "5",
              },
            ],
          },
        ]
      : [rating()];
  const toggle =
    (key: "reject" | "disabled" | "shown" | "compact" | "async") => () => {
      state[key] = !state[key];
      saved = undefined;
      notify();
    };
  return {
    get snapshot() {
      return { ...state, value, saved, questions: definitions() };
    },
    change({ value: next }: { value: QuestionnaireValue }) {
      state.callbacks++;
      if (!state.reject) value = next;
      notify();
    },
    complete({ value: next }: { value: QuestionnaireValue }) {
      saved = next;
      notify();
    },
    toggleReject: toggle("reject"),
    toggleDisabled: toggle("disabled"),
    toggleShown: toggle("shown"),
    toggleCompact: toggle("compact"),
    toggleAsync: toggle("async"),
    toggleNested() {
      state.nested = !state.nested;
      value = initial();
      saved = undefined;
      state.callbacks = 0;
      state.revision++;
      notify();
    },
    reset() {
      value = initial();
      saved = undefined;
      state.callbacks = 0;
      state.revision++;
      notify();
    },
    /** 模拟无法取消的第三方建议：契约须忽略已卸载/替换/禁用题目的旧回调。 */
    suggest(context: QuestionnaireCustomContext) {
      const answer = context.onAnswerChange;
      const timer = setTimeout(() => {
        timers.delete(timer);
        answer("5");
      }, 400);
      timers.add(timer);
    },
    dispose() {
      for (const timer of timers) clearTimeout(timer);
      timers.clear();
    },
  };
}
