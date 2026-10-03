import {
  useState,
  useRef,
  useId,
  useLayoutEffect,
  type FormEvent,
  type HTMLAttributes,
} from "react";
import {
  questionnaireVisibleQuestions,
  questionnaireValue,
  questionError,
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
      focusQuestion(root.current);
    }
  }, [page]);
  const current = () => questionnaireValue(questions, value ?? internal);
  const visible = () => questionnaireVisibleQuestions(questions, current());
  const submitted = () => questionnaireValue(visible(), current());
  const index = () => Math.min(page, Math.max(0, visible().length - 1));
  const question = () => visible()[index()];
  const latest = useRef({ question: question(), value: current() });
  latest.current = { question: question(), value: current() };
  const blocked = () => disabled || submitting;
  const change = (next: QuestionnaireValue) => {
    if (blocked()) return;
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
  const move = (next: number) => {
    setPage(next);
    setShowError(false);
    focusNext.current = true;
  };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (blocked() || !question()) return;
    setShowError(true);
    if (questionError(question(), current(), { requiredLabel, invalidLabel })) {
      focusQuestion(root.current);
      return;
    }
    if (index() < visible().length - 1) move(index() + 1);
    else {
      const invalid = visible().findIndex(
        (q) => !!questionError(q, current(), { requiredLabel, invalidLabel }),
      );
      if (invalid >= 0) {
        setPage(invalid);
        focusNext.current = true;
      } else onComplete?.({ value: submitted() });
    }
  };
  const err = () =>
    showError && question()
      ? questionError(question(), current(), { requiredLabel, invalidLabel })
      : "";
  return (
    <form
      data-scope="questionnaire"
      data-part="root"
      aria-label={label}
      aria-busy={submitting ? "true" : undefined}
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
            ) : (
              (question().options ?? []).map((o) => (
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
                  key={o.value}
                >
                  <input
                    type={question().type === "multiple" ? "checkbox" : "radio"}
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
          {Object.entries(submitted())
            .filter(
              ([key]) => question().type === "text" || key !== question().id,
            )
            .flatMap((entry) =>
              (typeof entry[1] === "string" ? [entry[1]] : entry[1]).map(
                (answer) => (
                  <input
                    type="hidden"
                    name={entry[0]}
                    value={answer}
                    disabled={blocked()}
                    key={entry[0] + "-" + answer}
                  />
                ),
              ),
            )}
          {error && (
            <div data-scope="questionnaire" data-part="error" role="alert">
              {error}
            </div>
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
            <LoongArkButton type="submit" disabled={blocked()}>
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
