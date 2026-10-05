export interface QuestionOption {
  value: string;
  label: string;
  disabled?: boolean;
}
export interface Question {
  id: string;
  label: string;
  description?: string;
  type: "text" | "single" | "multiple";
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  options?: readonly QuestionOption[];
  /** 基于归一化完整答案判断可见性；应保持纯函数。 */
  when?: (value: QuestionnaireValue) => boolean;
  /** 提交时执行的异步校验；调用方负责响应 AbortSignal。 */
  validateAsync?: (
    answer: string | readonly string[],
    value: QuestionnaireValue,
    context: { signal: AbortSignal },
  ) => Promise<string | undefined>;
  /** 内建校验通过后执行同步业务校验，返回错误说明或 undefined。 */
  validate?: (
    answer: string | readonly string[],
    value: QuestionnaireValue,
  ) => string | undefined;
}
export type QuestionnaireValue = Record<string, string | readonly string[]>;
export interface QuestionnaireOptions {
  label: string;
  questions: readonly Question[];
  value?: QuestionnaireValue;
  defaultValue?: QuestionnaireValue;
  disabled?: boolean;
  submitting?: boolean;
  completed?: boolean;
  error?: string;
  emptyLabel?: string;
  successLabel?: string;
  nextLabel?: string;
  backLabel?: string;
  submitLabel?: string;
  requiredLabel?: string;
  invalidLabel?: string;
  validatingLabel?: string;
  cancelValidationLabel?: string;
  validationErrorLabel?: string;
  onValueChange?: (details: { value: QuestionnaireValue }) => void;
  onComplete?: (details: { value: QuestionnaireValue }) => void;
}
export function questionnaireQuestions(questions: readonly Question[]) {
  const ids = new Set<string>();
  for (const q of questions) {
    if (!q.id || ids.has(q.id))
      throw Error("Questionnaire requires unique non-empty question ids");
    ids.add(q.id);
    if (q.type !== "text") {
      const values = new Set<string>();
      for (const option of q.options ?? []) {
        if (!option.value || values.has(option.value))
          throw Error("Questionnaire requires unique non-empty option values");
        values.add(option.value);
      }
    }
  }
  return questions;
}
export function questionnaireValue(
  questions: readonly Question[],
  value: QuestionnaireValue,
): QuestionnaireValue {
  return Object.fromEntries(
    questionnaireQuestions(questions).map((q) => {
      const answer = value[q.id];
      const enabled = (q.options ?? [])
        .filter((o) => !o.disabled)
        .map((o) => o.value);
      const normalized =
        q.type === "text"
          ? typeof answer === "string"
            ? answer
            : ""
          : q.type === "single"
            ? typeof answer === "string" && enabled.includes(answer)
              ? answer
              : ""
            : Array.isArray(answer)
              ? [...new Set(answer.filter((v) => enabled.includes(v)))]
              : [];
      return [q.id, normalized];
    }),
  );
}
/** 隐藏答案保留在编辑状态，但仅可见题目参与导航、序列化与提交校验。 */
export function questionnaireVisibleQuestions(
  questions: readonly Question[],
  value: QuestionnaireValue,
) {
  const normalized = questionnaireValue(questions, value);
  return questions.filter(
    (question) => !question.when || question.when(normalized),
  );
}
export function questionError(
  q: Question,
  value: QuestionnaireValue,
  options: Pick<QuestionnaireOptions, "requiredLabel" | "invalidLabel"> = {},
  asyncErrors?: Record<string, string>,
) {
  if (asyncErrors && Object.prototype.hasOwnProperty.call(asyncErrors, q.id))
    return asyncErrors[q.id];
  const answer = questionnaireValue([q], value)[q.id];
  const length =
    typeof answer === "string" ? answer.trim().length : answer.length;
  if (q.required && !length)
    return options.requiredLabel ?? "Please answer this question.";
  if (
    q.type === "text" &&
    length &&
    (length < (q.minLength ?? 0) || length > (q.maxLength ?? Infinity))
  )
    return options.invalidLabel ?? "Check the answer length.";
  return q.validate?.(answer, value) ?? "";
}
export function toggleQuestionAnswer(
  value: QuestionnaireValue,
  q: Question,
  option: string,
  checked: boolean,
) {
  if (!(q.options ?? []).some((o) => o.value === option && !o.disabled))
    return value;
  const current = questionnaireValue([q], value)[q.id];
  return {
    ...value,
    [q.id]:
      q.type === "multiple"
        ? checked
          ? [...new Set([...(Array.isArray(current) ? current : []), option])]
          : (Array.isArray(current) ? current : []).filter((v) => v !== option)
        : option,
  };
}
/** 拒绝受控更新后恢复真实控件；只触及当前题，不影响表单外的焦点。 */
export function restoreQuestionAnswers(
  root: HTMLElement | null | undefined,
  question: Question | undefined,
  value: QuestionnaireValue,
) {
  if (!root?.isConnected || !question) return;
  const answer = questionnaireValue([question], value)[question.id];
  if (question.type === "text") {
    const input = root.querySelector<HTMLTextAreaElement>(
      '[data-part="question"] textarea',
    );
    if (input && typeof answer === "string" && input.value !== answer)
      input.value = answer;
  } else {
    for (const input of Array.from(
      root.querySelectorAll<HTMLInputElement>('[data-part="question"] input'),
    )) {
      input.checked =
        question.type === "multiple"
          ? answer.includes(input.value)
          : answer === input.value;
    }
  }
}
/** ownedAtStart 用于异步恢复：允许禁用触发器失焦到 body，但不抢外部控件焦点。 */
export function focusQuestion(
  root?: HTMLElement | null,
  ownedAtStart?: boolean,
) {
  if (!root?.isConnected) return;
  const active = root.ownerDocument.activeElement;
  if (
    ownedAtStart !== undefined &&
    !root.contains(active) &&
    !(ownedAtStart && active === root.ownerDocument.body)
  )
    return;
  const input = root?.querySelector<HTMLElement>(
    '[data-part="question"] input:not(:disabled),[data-part="question"] textarea:not(:disabled)',
  );
  (
    input ?? root?.querySelector<HTMLElement>('[data-part="question"]')
  )?.focus();
}
export const questionnaireCSS = `
[data-scope=questionnaire][data-part=root] { display:grid;gap:var(--lk-space-component-md);width:100%;min-width:0; }
[data-scope=questionnaire][data-part=header] { display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:var(--lk-space-component-sm); }
[data-scope=questionnaire][data-part=title] { margin:0;font-size:var(--lk-typography-fontsize-lg);font-weight:var(--lk-typography-fontweight-semibold); }
[data-scope=questionnaire][data-part=count] { font-size:var(--lk-typography-fontsize-sm);color:var(--lk-color-semantic-mutedforeground); }
[data-scope=questionnaire][data-part=question] { min-width:0;margin:0;padding:var(--lk-space-component-md);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-lg);display:grid;gap:var(--lk-space-component-compact); }
[data-scope=questionnaire][data-part=legend] { font-weight:var(--lk-typography-fontweight-medium);padding-inline:var(--lk-space-component-xs);overflow-wrap:anywhere; }
[data-scope=questionnaire][data-part=description] { margin:0;font-size:var(--lk-typography-fontsize-sm);color:var(--lk-color-semantic-mutedforeground);overflow-wrap:anywhere; }
[data-scope=questionnaire][data-part=option] { display:flex;align-items:flex-start;line-height:var(--lk-typography-lineheight-base);gap:var(--lk-space-component-sm);min-height:var(--lk-control-height-md);padding:var(--lk-space-component-sm);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-md);cursor:pointer;overflow-wrap:anywhere; }
[data-scope=questionnaire][data-part=option][data-selected=true] { background:var(--lk-color-semantic-muted);border-color:var(--lk-color-semantic-foreground); }
[data-scope=questionnaire][data-part=option]:has(input:disabled) { opacity:.5;cursor:not-allowed; }
[data-scope=questionnaire][data-part=option] input { flex:none;font:inherit;margin:0;margin-block-start:calc((1em * var(--lk-typography-lineheight-base) - var(--lk-control-icon-sm)) / 2);width:var(--lk-control-icon-sm);height:var(--lk-control-icon-sm);accent-color:var(--lk-color-semantic-primary); }
[data-scope=questionnaire][data-part=option] span { min-width:0;flex:1; }
[data-scope=questionnaire][data-part=validation] { margin:0;color:var(--lk-color-semantic-mutedforeground);font-size:var(--lk-typography-fontsize-sm);overflow-wrap:anywhere; }
[data-scope=questionnaire][data-part=error] { color:var(--lk-color-semantic-destructive);font-size:var(--lk-typography-fontsize-sm);overflow-wrap:anywhere; }
[data-scope=questionnaire][data-part=actions] { display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:var(--lk-space-component-sm); }
[data-scope=questionnaire][data-part=actions] > :last-child { margin-inline-start:auto; }
`;

export interface QuestionnaireValidationState {
  pending: boolean;
  errors: Record<string, string>;
}
/** 共享请求互斥、答案快照与过期结果处理；适配层负责订阅和卸载。 */
export function createQuestionnaireValidationController(
  notify: (state: QuestionnaireValidationState) => void,
) {
  let state: QuestionnaireValidationState = { pending: false, errors: {} };
  let active: AbortController | undefined;
  let version = 0;
  let disposed = false;
  let signature = "";
  let currentQuestionId: string | undefined;
  let callbacks: Array<
    Question["validate"] | Question["validateAsync"] | Question["when"]
  > = [];
  const publish = (next: QuestionnaireValidationState) => {
    state = next;
    if (!disposed) notify(next);
  };
  const cancel = () => {
    version++;
    active?.abort();
    active = undefined;
    if (state.pending || Object.keys(state.errors).length)
      publish({ pending: false, errors: {} });
  };
  return {
    get state() {
      return state;
    },
    sync(
      questions: readonly Question[],
      value: QuestionnaireValue,
      questionId: string | undefined,
      blocked: boolean,
    ) {
      const next = JSON.stringify([questions, value, blocked]);
      const nextCallbacks = questions.flatMap((q) => [
        q.validate,
        q.validateAsync,
        q.when,
      ]);
      if (
        next !== signature ||
        nextCallbacks.length !== callbacks.length ||
        nextCallbacks.some((fn, i) => fn !== callbacks[i])
      )
        cancel();
      else if (questionId !== currentQuestionId && active) cancel();
      currentQuestionId = questionId;
      signature = next;
      callbacks = nextCallbacks;
    },
    cancel,
    async run(
      questions: readonly Question[],
      value: QuestionnaireValue,
      options: Pick<
        QuestionnaireOptions,
        "requiredLabel" | "invalidLabel" | "validationErrorLabel"
      > = {},
    ) {
      if (disposed || active || !questions.length) return;
      const request = new AbortController(),
        current = ++version;
      const snapshot = Object.fromEntries(
        Object.entries(value).map(([key, answer]) => [
          key,
          typeof answer === "string" ? answer : Object.freeze([...answer]),
        ]),
      );
      Object.freeze(snapshot);
      const valid = () =>
        !disposed && current === version && !request.signal.aborted;
      active = request;
      try {
        // 所有同步校验先通过，避免请求服务来验证空答案或无效格式。
        for (const q of questions) {
          let error: string;
          try {
            error = questionError(q, snapshot, options);
          } catch {
            error =
              options.validationErrorLabel ??
              "Validation failed. Please try again.";
          }
          if (!valid()) return;
          if (error) {
            publish({ pending: false, errors: { [q.id]: error } });
            return { invalidId: q.id };
          }
        }
        if (questions.some((q) => q.validateAsync))
          publish({ pending: true, errors: {} });
        for (const q of questions) {
          if (!q.validateAsync) continue;
          let error: string | undefined;
          try {
            const work = q.validateAsync(snapshot[q.id], snapshot, {
              signal: request.signal,
            });
            error = await new Promise<string | undefined>((resolve, reject) => {
              const cancel = () => {
                request.signal.removeEventListener("abort", cancel);
                reject(new DOMException("Cancelled", "AbortError"));
              };
              request.signal.addEventListener("abort", cancel, { once: true });
              if (request.signal.aborted) cancel();
              work.then(
                (answer) => {
                  request.signal.removeEventListener("abort", cancel);
                  resolve(answer);
                },
                (error) => {
                  request.signal.removeEventListener("abort", cancel);
                  reject(error);
                },
              );
            });
          } catch {
            error =
              options.validationErrorLabel ??
              "Validation failed. Please try again.";
          }
          if (!valid()) return;
          if (error) {
            publish({ pending: false, errors: { [q.id]: error } });
            return { invalidId: q.id };
          }
        }
        if (!valid()) return;
        publish({ pending: false, errors: {} });
        return { value: questionnaireValue(questions, snapshot) };
      } finally {
        if (current === version) active = undefined;
      }
    },
    dispose() {
      disposed = true;
      cancel();
    },
  };
}
