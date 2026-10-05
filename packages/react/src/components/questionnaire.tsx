import {
  useState,
  useMemo,
  useRef,
  useId,
  useLayoutEffect,
  type FormEvent,
  type HTMLAttributes,
} from "react";
import {
  questionIncludes,
  questionnaireFormEntries,
  createQuestionControlRenderer,
  mountQuestionControls,
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
  HTMLAttributes<HTMLFormElement>,
  "onSubmit" | "defaultValue"
> &
  QuestionnaireOptions;
export function LoongArkQuestionnaire({
  label,
  questions,
  value,
  defaultValue,
  disabled,
  submitting,
  completed,
  error,
  emptyLabel,
  successLabel,
  nextLabel,
  backLabel,
  submitLabel,
  requiredLabel,
  invalidLabel,
  validatingLabel,
  cancelValidationLabel,
  validationErrorLabel,
  onValueChange,
  onComplete,
  ...attrs
}: LoongArkQuestionnaireProps) {
  const [internal, setInternal] = useState(defaultValue ?? {}),
    [page, setPage] = useState(0),
    [showError, setShowError] = useState(false);
  const root = useRef<HTMLFormElement>(null),
    uid = useId(),
    focusNext = useRef(false);
  useLayoutEffect(() => {
    if (focusNext.current) {
      focusNext.current = false;
      focusQuestion(root.current, true);
    }
  }, [page]);
  const current = () => questionnaireValue(questions, value ?? internal);
  const visible = () => questionnaireVisibleQuestions(questions, current());
  const submitted = () => questionnaireValue(visible(), current());
  const index = () => Math.min(page, Math.max(0, visible().length - 1));
  const question = () => visible()[index()];
  const latest = useRef({ question: question(), value: current(), onComplete });
  latest.current = { question: question(), value: current(), onComplete };
  const blocked = () => disabled || submitting;
  const [validationState, setValidationState] =
    useState<QuestionnaireValidationState>({ pending: false, errors: {} });
  const [validation] = useState(() =>
    createQuestionnaireValidationController(setValidationState),
  );
  useLayoutEffect(() => {
    validation.sync(
      visible(),
      current(),
      question()?.id,
      !!(blocked() || completed),
    );
  });
  // cancel 保持 StrictMode 再挂载可用，并使卸载前的请求失效。
  useLayoutEffect(() => () => validation.cancel(), [validation]);

  const change = (next: QuestionnaireValue) => {
    if (blocked()) return;
    validation.cancel();
    if (value === undefined) setInternal(next);
    onValueChange?.({ value: next });
    queueMicrotask(() =>
      restoreQuestionAnswers(
        root.current,
        latest.current.question,
        latest.current.value,
      ),
    );
    setShowError(false);
  };
  const [renderControl] = useState(createQuestionControlRenderer);
  useLayoutEffect(() => restoreQuestionAnswers(root.current, latest.current.question, latest.current.value));
  const changeRef = useRef(change);
  changeRef.current = change;
  useLayoutEffect(() => mountQuestionControls(root.current!, () => ({ ...latest.current, blocked: !!(disabled || submitting || completed) }), next => changeRef.current(next)), [disabled, submitting, completed]);
  const move = (next: number) => {
    validation.cancel();
    setPage(next);
    setShowError(false);
    focusNext.current = true;
  };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (blocked() || completed || validation.state.pending || !question())
      return;
    validation.sync(
      visible(),
      current(),
      question()?.id,
      !!(blocked() || completed),
    );
    const ownedAtStart = !!root.current?.contains(document.activeElement);
    const last = index() === visible().length - 1;
    const result = await validation.run(
      last ? visible() : [question()],
      current(),
      { requiredLabel, invalidLabel, validationErrorLabel },
    );
    if (!result) return;
    if (result.invalidId) {
      setShowError(true);
      const invalid = visible().findIndex((q) => q.id === result.invalidId);
      if (invalid !== index()) {
        setPage(invalid);
        focusNext.current = ownedAtStart;
      } else focusQuestion(root.current, ownedAtStart);
    } else if (!last) move(index() + 1);
    else latest.current.onComplete?.({ value: result.value! });
  };
  const err = () =>
    showError && question()
      ? questionError(
          question(),
          current(),
          { requiredLabel, invalidLabel },
          validationState.errors,
        )
      : "";
  const controlHTML = question() ? renderControl(question(), current(), uid + "-description " + uid + "-error", !!err()) : "";
  const controlMarkup = useMemo(() => ({ __html: controlHTML }), [controlHTML]);
  return (
    <form
      data-scope="questionnaire"
      data-part="root"
      aria-label={label}
      aria-busy={submitting || validationState.pending ? "true" : undefined}
      noValidate
      onSubmit={submit}
      {...attrs}
      ref={root}
    >
      <header data-scope="questionnaire" data-part="header">
        <h2 data-scope="questionnaire" data-part="title">
          {label}
        </h2>
        {!completed && visible().length > 0 && (
          <span data-scope="questionnaire" data-part="count" aria-live="polite">
            {`${index() + 1} / ${visible().length}`}
          </span>
        )}
      </header>
      {completed ? (
        <p role="status">{successLabel ?? "Thank you for your answers."}</p>
      ) : !question() ? (
        <p>{emptyLabel ?? "No questions available."}</p>
      ) : (
        <>
          <fieldset
            data-scope="questionnaire"
            data-part="question"
            key={question().id}
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
                onChange={(e) =>
                  change({
                    ...current(),
                    [question().id]: e.currentTarget.value,
                  })
                }
              />
            ) : !["single", "multiple"].includes(question().type) ? (
              <div data-part="advanced-answer" dangerouslySetInnerHTML={controlMarkup} />
            ) : (
              (question().options ?? []).map((o) => (
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
                  key={o.value}
                >
                  <input
                    type={question().type === "multiple" ? "checkbox" : "radio"}
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
              ))
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
          {questionnaireFormEntries(submitted(), question().type === "text" ? undefined : question().id).map(([name, answer], i) => <input type="hidden" name={name} value={answer} disabled={blocked()} key={name + "-" + i} />)}
          {error && (
            <div data-scope="questionnaire" data-part="error" role="alert">
              {error}
            </div>
          )}
          {validationState.pending && (
            <p data-scope="questionnaire" data-part="validation" role="status">
              {validatingLabel ?? "Checking answers…"}
            </p>
          )}
          <div data-scope="questionnaire" data-part="actions">
            <LoongArkButton
              type="button"
              variant="outline"
              disabled={blocked() || index() === 0}
              onClick={() => move(index() - 1)}
            >
              {backLabel ?? "Back"}
            </LoongArkButton>
            {validationState.pending && (
              <LoongArkButton
                type="button"
                variant="outline"
                disabled={blocked()}
                onClick={() => {
                  validation.cancel();
                  focusQuestion(root.current);
                }}
              >
                {cancelValidationLabel ?? "Cancel validation"}
              </LoongArkButton>
            )}
            <LoongArkButton
              type="submit"
              disabled={blocked() || validationState.pending}
            >
              {submitting
                ? "Submitting…"
                : index() < visible().length - 1
                  ? (nextLabel ?? "Next")
                  : (submitLabel ?? "Submit")}
            </LoongArkButton>
          </div>
        </>
      )}
    </form>
  );
}
