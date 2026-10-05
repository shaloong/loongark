import {
  createSignal,
  createUniqueId,
  createEffect,
  onCleanup,
  splitProps,
  For,
  type JSX,
} from "solid-js";
import {
  questionnaireVisibleQuestions,
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
import { LoongArkTextarea } from "./textarea";
import { LoongArkButton } from "./button";
export type LoongArkQuestionnaireProps = Omit<
  JSX.HTMLAttributes<HTMLFormElement>,
  "onSubmit" | "defaultValue"
> &
  QuestionnaireOptions;
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
  ]);
  const [internal, setInternal] = createSignal<QuestionnaireValue>(
      p.defaultValue ?? {},
    ),
    [page, setPage] = createSignal(0),
    [showError, setShowError] = createSignal(false);
  const uid = createUniqueId();
  let root!: HTMLFormElement,
    focusNext = false;
  createEffect(() => {
    page();
    if (focusNext) {
      focusNext = false;
      focusQuestion(root);
    }
  });
  const current = () => questionnaireValue(p.questions, p.value ?? internal());
  const visible = () => questionnaireVisibleQuestions(p.questions, current());
  const submitted = () => questionnaireValue(visible(), current());
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
  const move = (next: number) => {
    validation.cancel();
    setPage(next);
    setShowError(false);
    focusNext = true;
    queueMicrotask(() => focusQuestion(root));
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
        queueMicrotask(() => focusQuestion(root, ownedAtStart));
      } else focusQuestion(root, ownedAtStart);
    } else if (!last) move(index() + 1);
    else p.onComplete?.({ value: result.value! });
  };
  const err = () =>
    showError() && question()
      ? questionError(question(), current(), p, validationState().errors)
      : "";
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
            <legend data-scope="questionnaire" data-part="legend">
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
            {question().type === "text" ? (
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
            ) : (
              <For each={question().options ?? []}>
                {(o) => (
                  <label
                    data-scope="questionnaire"
                    data-part="option"
                    data-selected={
                      (
                        question().type === "multiple"
                          ? current()[question().id].includes(o.value)
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
                          ? current()[question().id].includes(o.value)
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
          {
            <For
              each={Object.entries(submitted()).filter(
                ([key]) => question().type === "text" || key !== question().id,
              )}
            >
              {(entry) => (
                <For
                  each={typeof entry[1] === "string" ? [entry[1]] : entry[1]}
                >
                  {(answer) => (
                    <input
                      type="hidden"
                      name={entry[0]}
                      value={answer}
                      disabled={blocked()}
                    />
                  )}
                </For>
              )}
            </For>
          }
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
                  focusQuestion(root);
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
