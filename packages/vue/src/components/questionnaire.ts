import { defineComponent, h, ref, useId, nextTick, type PropType } from "vue";
import {
  questionnaireVisibleQuestions,
  questionnaireValue,
  questionError,
  toggleQuestionAnswer,
  focusQuestion,
  restoreQuestionAnswers,
  type QuestionnaireOptions,
  type QuestionnaireValue,
} from "@loongark/kit";
import { LoongArkTextarea } from "./textarea";
import { LoongArkButton } from "./button";
const part = (name: string) => ({
  "data-scope": "questionnaire",
  "data-part": name,
});
export const LoongArkQuestionnaire = defineComponent({
  name: "LoongArkQuestionnaire",
  inheritAttrs: false,
  props: {
    label: { type: String, required: true },
    questions: {
      type: Array as PropType<QuestionnaireOptions["questions"]>,
      required: true,
    },
    value: Object as PropType<QuestionnaireValue>,
    modelValue: Object as PropType<QuestionnaireValue>,
    defaultValue: Object as PropType<QuestionnaireValue>,
    disabled: Boolean,
    submitting: Boolean,
    completed: Boolean,
    error: String,
    emptyLabel: String,
    successLabel: String,
    nextLabel: String,
    backLabel: String,
    submitLabel: String,
    requiredLabel: String,
    invalidLabel: String,
    onValueChange: Function as PropType<QuestionnaireOptions["onValueChange"]>,
    onComplete: Function as PropType<QuestionnaireOptions["onComplete"]>,
  },
  emits: ["update:modelValue"],
  setup(p, { attrs, emit }) {
    const uid = useId(),
      root = ref<HTMLFormElement>(),
      internal = ref(p.defaultValue ?? {}),
      page = ref(0),
      showError = ref(false);
    const current = () =>
        questionnaireValue(
          p.questions,
          p.value ?? p.modelValue ?? internal.value,
        ),
      visible = () => questionnaireVisibleQuestions(p.questions, current()),
      submitted = () => questionnaireValue(visible(), current()),
      index = () => Math.min(page.value, Math.max(0, visible().length - 1)),
      question = () => visible()[index()],
      blocked = () => p.disabled || p.submitting;
    const change = (value: QuestionnaireValue) => {
      if (blocked()) return;
      if (p.value === undefined && p.modelValue === undefined)
        internal.value = value;
      p.onValueChange?.({ value });
      emit("update:modelValue", value);
      nextTick(() => restoreQuestionAnswers(root.value, question(), current()));
      showError.value = false;
    };
    const move = (next: number) => {
      page.value = next;
      showError.value = false;
      nextTick(() => focusQuestion(root.value));
    };
    const submit = (e: Event) => {
      e.preventDefault();
      if (blocked() || !question()) return;
      showError.value = true;
      if (questionError(question(), current(), p)) {
        focusQuestion(root.value);
        return;
      }
      if (index() < visible().length - 1) move(index() + 1);
      else {
        const invalid = visible().findIndex(
          (q) => !!questionError(q, current(), p),
        );
        if (invalid >= 0) {
          page.value = invalid;
          nextTick(() => focusQuestion(root.value));
        } else p.onComplete?.({ value: submitted() });
      }
    };
    return () => {
      const q = question(),
        v = current(),
        err = showError.value && q ? questionError(q, v, p) : "";
      return h(
        "form",
        {
          ...attrs,
          ...part("root"),
          ref: root,
          "aria-label": p.label,
          "aria-busy": p.submitting ? "true" : undefined,
          novalidate: true,
          onSubmit: submit,
        },
        [
          h("header", part("header"), [
            h("h2", part("title"), p.label),
            !p.completed &&
              visible().length > 0 &&
              h(
                "span",
                { ...part("count"), "aria-live": "polite" },
                `${index() + 1} / ${visible().length}`,
              ),
          ]),
          p.completed
            ? h(
                "p",
                { role: "status" },
                p.successLabel ?? "Thank you for your answers.",
              )
            : !q
              ? h("p", {}, p.emptyLabel ?? "No questions available.")
              : [
                  h(
                    "fieldset",
                    {
                      ...part("question"),
                      key: q.id,
                      disabled: blocked(),
                      tabindex: -1,
                      "aria-describedby":
                        uid + "-description " + uid + "-error",
                    },
                    [
                      h(
                        "legend",
                        part("legend"),
                        q.label + (q.required ? " *" : ""),
                      ),
                      h(
                        "p",
                        { ...part("description"), id: uid + "-description" },
                        q.description,
                      ),
                      q.type === "text"
                        ? h(LoongArkTextarea, {
                            "aria-label": q.label,
                            "aria-required": q.required,
                            "aria-invalid": err ? "true" : undefined,
                            "aria-describedby":
                              uid + "-description " + uid + "-error",
                            value:
                              typeof v[q.id] === "string"
                                ? String(v[q.id])
                                : "",
                            maxlength: q.maxLength,
                            onInput: (e: Event) =>
                              change({
                                ...v,
                                [q.id]: (e.target as HTMLTextAreaElement).value,
                              }),
                          })
                        : (q.options ?? []).map((o) =>
                            h(
                              "label",
                              {
                                ...part("option"),
                                "data-selected": (
                                  q.type === "multiple"
                                    ? v[q.id].includes(o.value)
                                    : v[q.id] === o.value
                                )
                                  ? "true"
                                  : undefined,
                              },
                              [
                                h("input", {
                                  type:
                                    q.type === "multiple"
                                      ? "checkbox"
                                      : "radio",
                                  name: q.id,
                                  value: o.value,
                                  disabled: o.disabled,
                                  checked:
                                    q.type === "multiple"
                                      ? v[q.id].includes(o.value)
                                      : v[q.id] === o.value,
                                  "aria-required": q.required,
                                  "aria-invalid": err ? "true" : undefined,
                                  "aria-describedby": uid + "-error",
                                  onChange: (e: Event) =>
                                    change(
                                      toggleQuestionAnswer(
                                        v,
                                        q,
                                        o.value,
                                        (e.target as HTMLInputElement).checked,
                                      ),
                                    ),
                                }),
                                h("span", {}, o.label),
                              ],
                            ),
                          ),
                      h(
                        "div",
                        { ...part("error"), id: uid + "-error", role: "alert" },
                        err,
                      ),
                    ],
                  ),
                  ...Object.entries(submitted())
                    .filter(([key]) => q.type === "text" || key !== q.id)
                    .flatMap(([name, answer]) =>
                      (typeof answer === "string" ? [answer] : answer).map(
                        (value) =>
                          h("input", {
                            type: "hidden",
                            name,
                            value,
                            disabled: blocked(),
                          }),
                      ),
                    ),
                  p.error &&
                    h("div", { ...part("error"), role: "alert" }, p.error),
                  h("div", part("actions"), [
                    h(
                      LoongArkButton,
                      {
                        type: "button",
                        variant: "outline",
                        disabled: blocked() || index() === 0,
                        onClick: () => move(index() - 1),
                      },
                      () => p.backLabel ?? "Back",
                    ),
                    h(
                      LoongArkButton,
                      { type: "submit", disabled: blocked() },
                      () =>
                        p.submitting
                          ? "Submitting…"
                          : index() < visible().length - 1
                            ? (p.nextLabel ?? "Next")
                            : (p.submitLabel ?? "Submit"),
                    ),
                  ]),
                ],
        ],
      );
    };
  },
});
