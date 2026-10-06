import {
  createSignal,
  createMemo,
  createUniqueId,
  createEffect,
  onCleanup,
  onMount,
  splitProps,
  For,
  type JSX,
} from "solid-js";
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
  restoreQuestionAnswers,
  type QuestionnaireValue,
  type QuestionnaireOptions,
} from "@loongark/kit";
import {
  QuestionnaireTree,
  type LoongArkQuestionnaireRenderers,
} from "./questionnaire-tree";
export type { LoongArkQuestionnaireRenderers } from "./questionnaire-tree";
import { LoongArkTextarea } from "./textarea";
import { LoongArkButton } from "./button";
export type LoongArkQuestionnaireProps = Omit<
  JSX.HTMLAttributes<HTMLFormElement>,
  "onSubmit" | "defaultValue"
> &
  QuestionnaireOptions & { renderers?: LoongArkQuestionnaireRenderers };
export function LoongArkQuestionnaire(props: LoongArkQuestionnaireProps) {
  const [p, attrs] = splitProps(props, [
    "label",
    "questions",
    "value",
    "defaultValue",
    "disabled",
    "submitting",
    "completed",
    "error",
    "emptyLabel",
    "successLabel",
    "nextLabel",
    "backLabel",
    "submitLabel",
    "requiredLabel",
    "invalidLabel",
    "validatingLabel",
    "cancelValidationLabel",
    "validationErrorLabel",
    "onValueChange",
    "onComplete",
    "renderers",
  ]);
  const [internal, setInternal] = createSignal<QuestionnaireValue>(
      p.defaultValue ?? {},
    ),
    [page, setPage] = createSignal(0),
    [showError, setShowError] = createSignal(false);
  const uid = createUniqueId();
  let root!: HTMLFormElement;
  const current = () => questionnaireValue(p.questions, p.value ?? internal());
  const visible = () => questionnaireVisibleQuestions(p.questions, current());
  const submitted = () => questionnaireSubmittedValue(p.questions, current());
  const index = () => Math.min(page(), Math.max(0, visible().length - 1));
  const question = () => visible()[index()];
  const blocked = () => p.disabled || p.submitting;
  const [validationState, setValidationState] =
    createSignal<QuestionnaireValidationState>({ pending: false, errors: {} });
  const validation =
    createQuestionnaireValidationController(setValidationState);
  createEffect(() =>
    validation.sync(
      visible(),
      current(),
      question()?.id,
      !!(blocked() || p.completed),
    ),
  );
  onCleanup(() => validation.dispose());

  const change = (next: QuestionnaireValue) => {
    if (blocked()) return;
    validation.cancel();
    if (p.value === undefined) setInternal(next);
    p.onValueChange?.({ value: next });
    queueMicrotask(() => restoreQuestionAnswers(root, question(), current()));
    setShowError(false);
  };
  const customRegistry = createQuestionnaireCustomRegistry(
    () => ({
      question: question(),
      value: current(),
      disabled: !!(blocked() || p.completed),
      pending: validationState().pending,
      showError: showError(),
      errors: validationState().errors,
      labels: p,
      renderers: p.renderers ?? {},
    }),
    change,
  );
  const renderTree = createQuestionnaireTreeRenderer();
  onMount(() => onCleanup(customRegistry.mount(root)));
  createEffect(() => customRegistry.sync());
  const renderControl = createQuestionControlRenderer();
  createEffect(() => restoreQuestionAnswers(root, question(), current()));
  onMount(() => {
    const dispose = mountQuestionControls(
      root,
      () => ({
        question: question(),
        value: current(),
        blocked: !!(blocked() || p.completed),
      }),
      change,
    );
    onCleanup(dispose);
  });
  const move = (next: number) => {
    validation.cancel();
    setPage(next);
    setShowError(false);
    queueMicrotask(() => focusQuestion(root, undefined, customRegistry.focus));
  };
  const submit = async (event: SubmitEvent) => {
    event.preventDefault();
    if (blocked() || p.completed || validation.state.pending || !question())
      return;
    validation.sync(
      visible(),
      current(),
      question()?.id,
      !!(blocked() || p.completed),
    );
    const ownedAtStart = !!root?.contains(document.activeElement);
    const last = index() === visible().length - 1;
    const result = await validation.run(
      last ? visible() : [question()],
      current(),
      p,
    );
    if (!result) return;
    if (result.invalidId) {
      setShowError(true);
      const invalid = visible().findIndex((q) => q.id === result.invalidId);
      if (invalid !== index()) {
        setPage(invalid);
        queueMicrotask(() =>
          focusQuestion(root, ownedAtStart, customRegistry.focus),
        );
      } else focusQuestion(root, ownedAtStart, customRegistry.focus);
    } else if (!last) move(index() + 1);
    else p.onComplete?.({ value: result.value! });
  };
  const err = () =>
    showError() && question()
      ? questionError(question(), current(), p, validationState().errors)
      : "";
  const controlHTML = createMemo(() =>
    question() && !questionHasCustom(question())
      ? renderControl(
          question(),
          current(),
          uid + "-description " + uid + "-error",
          !!err(),
          validationState().errors,
          { requiredLabel: p.requiredLabel, invalidLabel: p.invalidLabel },
        )
      : "",
  );
  return (
    <form
      data-scope="questionnaire"
      data-part="root"
      aria-label={p.label}
      aria-busy={p.submitting || validationState().pending ? "true" : undefined}
      noValidate
      onSubmit={submit}
      {...attrs}
      ref={root}
    >
      <header data-scope="questionnaire" data-part="header">
        <h2 data-scope="questionnaire" data-part="title">
          {p.label}
        </h2>
        {!p.completed && visible().length > 0 && (
          <span data-scope="questionnaire" data-part="count" aria-live="polite">
            {`${index() + 1} / ${visible().length}`}
          </span>
        )}
      </header>
      {p.completed ? (
        <p role="status">{p.successLabel ?? "Thank you for your answers."}</p>
      ) : !question() ? (
        <p>{p.emptyLabel ?? "No questions available."}</p>
      ) : (
        <>
          <fieldset
            data-scope="questionnaire"
            data-part="question"
            disabled={blocked()}
            tabIndex={-1}
            aria-describedby={uid + "-description " + uid + "-error"}
          >
            <legend
              id={uid + "-label"}
              data-scope="questionnaire"
              data-part="legend"
            >
              {question().label}
              {question().required ? " *" : ""}
            </legend>
            <p
              id={uid + "-description"}
              data-scope="questionnaire"
              data-part="description"
            >
              {question().description}
            </p>
            {questionHasCustom(question()) ? (
              <QuestionnaireTree
                node={() =>
                  renderTree(
                    question(),
                    current(),
                    uid,
                    !!err(),
                    validationState().errors,
                    p,
                    customRegistry,
                  )
                }
                renderers={p.renderers ?? {}}
              />
            ) : question().type === "text" ? (
              <LoongArkTextarea
                aria-label={question().label}
                aria-required={question().required}
                aria-invalid={err() ? "true" : undefined}
                aria-describedby={uid + "-description " + uid + "-error"}
                value={
                  typeof current()[question().id] === "string"
                    ? String(current()[question().id])
                    : ""
                }
                maxLength={question().maxLength}
                onInput={(e) =>
                  change({
                    ...current(),
                    [question().id]: e.currentTarget.value,
                  })
                }
              />
            ) : !["single", "multiple"].includes(question().type) ? (
              <div data-part="advanced-answer" innerHTML={controlHTML()} />
            ) : (
              <For each={question().options ?? []}>
                {(o) => (
                  <label
                    data-scope="questionnaire"
                    data-part="option"
                    data-selected={
                      (
                        question().type === "multiple"
                          ? questionIncludes(current()[question().id], o.value)
                          : current()[question().id] === o.value
                      )
                        ? "true"
                        : undefined
                    }
                  >
                    <input
                      type={
                        question().type === "multiple" ? "checkbox" : "radio"
                      }
                      name={question().id}
                      value={o.value}
                      disabled={o.disabled}
                      checked={
                        question().type === "multiple"
                          ? questionIncludes(current()[question().id], o.value)
                          : current()[question().id] === o.value
                      }
                      aria-required={question().required}
                      aria-invalid={err() ? "true" : undefined}
                      aria-describedby={uid + "-error"}
                      onChange={(e) =>
                        change(
                          toggleQuestionAnswer(
                            current(),
                            question(),
                            o.value,
                            e.currentTarget.checked,
                          ),
                        )
                      }
                    />
                    <span>{o.label}</span>
                  </label>
                )}
              </For>
            )}
            <div
              id={uid + "-error"}
              data-scope="questionnaire"
              data-part="error"
              role="alert"
            >
              {err()}
            </div>
          </fieldset>
          <For
            each={questionnaireFormEntries(
              submitted(),
              question().type === "text" ? undefined : question().id,
            )}
          >
            {([name, answer]) => (
              <input
                type="hidden"
                name={name}
                value={answer}
                disabled={blocked()}
              />
            )}
          </For>
          {p.error && (
            <div data-scope="questionnaire" data-part="error" role="alert">
              {p.error}
            </div>
          )}
          {validationState().pending && (
            <p data-scope="questionnaire" data-part="validation" role="status">
              {p.validatingLabel ?? "Checking answers…"}
            </p>
          )}
          <div data-scope="questionnaire" data-part="actions">
            <LoongArkButton
              type="button"
              variant="outline"
              disabled={blocked() || index() === 0}
              onClick={() => move(index() - 1)}
            >
              {p.backLabel ?? "Back"}
            </LoongArkButton>
            {validationState().pending && (
              <LoongArkButton
                type="button"
                variant="outline"
                disabled={blocked()}
                onClick={() => {
                  validation.cancel();
                  focusQuestion(root, undefined, customRegistry.focus);
                }}
              >
                {p.cancelValidationLabel ?? "Cancel validation"}
              </LoongArkButton>
            )}
            <LoongArkButton
              type="submit"
              disabled={blocked() || validationState().pending}
            >
              {p.submitting
                ? "Submitting…"
                : index() < visible().length - 1
                  ? (p.nextLabel ?? "Next")
                  : (p.submitLabel ?? "Submit")}
            </LoongArkButton>
          </div>
        </>
      )}
    </form>
  );
}
