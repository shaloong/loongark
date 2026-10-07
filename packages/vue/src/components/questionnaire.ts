import {
  defineComponent,
  h,
  ref,
  useId,
  nextTick,
  type PropType,
  watchEffect,
  onBeforeUnmount,
  onMounted,
} from "vue";
import {
  createQuestionnaireCustomRegistry,
  createQuestionnaireTreeRenderer,
  questionHasCustom,
  type QuestionnaireCustomState,
  questionIncludes,
  questionnaireFormEntries,
  createQuestionControlRenderer,
  mountQuestionControls,
  questionnaireVisibleQuestions,
  questionnaireSubmittedValue,
  questionnaireValue,
  questionError,
  createQuestionnaireValidationController,
  type QuestionnaireValidationState,
  toggleQuestionAnswer,
  focusQuestion,
  questionnaireSubmitOwned,
  restoreQuestionAnswers,
  type QuestionnaireOptions,
  type QuestionnaireValue,
} from "@loongark/kit";
import {
  renderQuestionnaireTree,
  type LoongArkQuestionnaireRenderers,
} from "./questionnaire-tree";
export type { LoongArkQuestionnaireRenderers } from "./questionnaire-tree";
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
    validatingLabel: String,
    cancelValidationLabel: String,
    validationErrorLabel: String,
    onValueChange: Function as PropType<QuestionnaireOptions["onValueChange"]>,
    renderers: Object as PropType<LoongArkQuestionnaireRenderers>,
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
      submitted = () => questionnaireSubmittedValue(p.questions, current()),
      index = () => Math.min(page.value, Math.max(0, visible().length - 1)),
      question = () => visible()[index()],
      blocked = () => p.disabled || p.submitting;
    const validationState = ref<QuestionnaireValidationState>({
      pending: false,
      errors: {},
    });
    const validation = createQuestionnaireValidationController((next) => {
      validationState.value = next;
    });
    watchEffect(() =>
      validation.sync(
        visible(),
        current(),
        question()?.id,
        !!(blocked() || p.completed),
      ),
    );
    onBeforeUnmount(() => validation.dispose());

    const change = (value: QuestionnaireValue) => {
      if (blocked()) return;
      validation.cancel();
      if (p.value === undefined && p.modelValue === undefined)
        internal.value = value;
      p.onValueChange?.({ value });
      emit("update:modelValue", value);
      nextTick(() => restoreQuestionAnswers(root.value, question(), current()));
      showError.value = false;
    };
    const customRegistry = createQuestionnaireCustomRegistry(
      () => ({
        question: question(),
        value: current(),
        disabled: !!(blocked() || p.completed),
        pending: validationState.value.pending,
        showError: showError.value,
        errors: validationState.value.errors,
        labels: p,
        renderers: p.renderers ?? {},
      }),
      change,
    );
    const renderTree = createQuestionnaireTreeRenderer();
    let disposeCustom: (() => void) | undefined;
    onMounted(() => {
      disposeCustom = customRegistry.mount(root.value!);
      customRegistry.sync();
    });
    onBeforeUnmount(() => disposeCustom?.());
    watchEffect(() => {
      const snapshot = customRegistry;
      question();
      current();
      p.renderers;
      p.disabled;
      p.submitting;
      p.completed;
      showError.value;
      validationState.value;
      nextTick(() => snapshot.sync());
    });
    const renderControl = createQuestionControlRenderer();
    watchEffect(() => {
      const q = question(),
        v = current();
      nextTick(() => restoreQuestionAnswers(root.value, q, v));
    });
    let disposeControls: (() => void) | undefined;
    onBeforeUnmount(() => disposeControls?.());
    onMounted(() => {
      disposeControls = mountQuestionControls(
        root.value!,
        () => ({
          question: question(),
          value: current(),
          blocked: !!(blocked() || p.completed),
        }),
        change,
        true,
        customRegistry,
      );
    });
    const move = (next: number) => {
      validation.cancel();
      page.value = next;
      showError.value = false;
      nextTick(() =>
        focusQuestion(root.value, undefined, customRegistry.focus),
      );
    };
    const submit = async (e: Event) => {
      e.preventDefault();
      if (blocked() || p.completed || validation.state.pending || !question())
        return;
      validation.sync(
        visible(),
        current(),
        question()?.id,
        !!(blocked() || p.completed),
      );
      const ownedAtStart = questionnaireSubmitOwned(root.value, e);
      const last = index() === visible().length - 1;
      const result = await validation.run(
        last ? visible() : [question()],
        current(),
        p,
      );
      if (!result) return;
      if (result.invalidId) {
        showError.value = true;
        const invalid = visible().findIndex((q) => q.id === result.invalidId);
        if (invalid !== index()) {
          page.value = invalid;
          nextTick(() =>
            focusQuestion(root.value, ownedAtStart, customRegistry.focus),
          );
        } else focusQuestion(root.value, ownedAtStart, customRegistry.focus);
      } else if (!last) move(index() + 1);
      else p.onComplete?.({ value: result.value! });
    };
    return () => {
      const q = question(),
        v = current(),
        err =
          showError.value && q
            ? questionError(q, v, p, validationState.value.errors)
            : "";
      return h(
        "form",
        {
          ...attrs,
          ...part("root"),
          ref: root,
          "aria-label": p.label,
          "aria-busy":
            p.submitting || validationState.value.pending ? "true" : undefined,
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
                        { ...part("legend"), id: uid + "-label" },
                        q.label + (q.required ? " *" : ""),
                      ),
                      h("div", part("question-content"), [
                        h(
                          "p",
                          { ...part("description"), id: uid + "-description" },
                          q.description,
                        ),
                        questionHasCustom(q)
                          ? renderQuestionnaireTree(
                              renderTree(
                                q,
                                current(),
                                uid,
                                !!err,
                                validationState.value.errors,
                                p,
                                customRegistry,
                              ),
                              p.renderers ?? {},
                            )
                          : q.type === "text"
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
                                    [q.id]: (e.target as HTMLTextAreaElement)
                                      .value,
                                  }),
                              })
                            : !["single", "multiple"].includes(q.type)
                              ? h("div", {
                                  "data-part": "advanced-answer",
                                  innerHTML: renderControl(
                                    q,
                                    current(),
                                    uid + "-description " + uid + "-error",
                                    !!err,
                                    validationState.value.errors,
                                    {
                                      requiredLabel: p.requiredLabel,
                                      invalidLabel: p.invalidLabel,
                                    },
                                  ),
                                })
                              : (q.options ?? []).map((o) =>
                                  h(
                                    "label",
                                    {
                                      ...part("option"),
                                      "data-selected": (
                                        q.type === "multiple"
                                          ? questionIncludes(v[q.id], o.value)
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
                                            ? questionIncludes(v[q.id], o.value)
                                            : v[q.id] === o.value,
                                        "aria-required": q.required,
                                        "aria-invalid": err
                                          ? "true"
                                          : undefined,
                                        "aria-describedby": uid + "-error",
                                        onChange: (e: Event) =>
                                          change(
                                            toggleQuestionAnswer(
                                              v,
                                              q,
                                              o.value,
                                              (e.target as HTMLInputElement)
                                                .checked,
                                            ),
                                          ),
                                      }),
                                      h("span", {}, o.label),
                                    ],
                                  ),
                                ),
                        h(
                          "div",
                          {
                            ...part("error"),
                            id: uid + "-error",
                            role: "alert",
                          },
                          err,
                        ),
                      ]),
                    ],
                  ),
                  ...questionnaireFormEntries(
                    submitted(),
                    q.type === "text" ? undefined : q.id,
                  ).map(([name, value]) =>
                    h("input", {
                      type: "hidden",
                      name,
                      value,
                      disabled: blocked(),
                    }),
                  ),
                  p.error &&
                    h("div", { ...part("error"), role: "alert" }, p.error),
                  validationState.value.pending &&
                    h(
                      "p",
                      { ...part("validation"), role: "status" },
                      p.validatingLabel ?? "Checking answers…",
                    ),
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
                    validationState.value.pending &&
                      h(
                        LoongArkButton,
                        {
                          type: "button",
                          variant: "outline",
                          disabled: blocked(),
                          onClick: () => {
                            validation.cancel();
                            focusQuestion(
                              root.value,
                              undefined,
                              customRegistry.focus,
                            );
                          },
                        },
                        () => p.cancelValidationLabel ?? "Cancel validation",
                      ),
                    h(
                      LoongArkButton,
                      {
                        type: "submit",
                        disabled: blocked() || validationState.value.pending,
                      },
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
