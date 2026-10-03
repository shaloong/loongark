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
) {
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
export function focusQuestion(root?: HTMLElement | null) {
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
[data-scope=questionnaire][data-part=option] { display:flex;align-items:center;gap:var(--lk-space-component-sm);min-height:var(--lk-control-height-md);padding:var(--lk-space-component-sm);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-md);cursor:pointer;overflow-wrap:anywhere; }
[data-scope=questionnaire][data-part=option][data-selected=true] { background:var(--lk-color-semantic-muted);border-color:var(--lk-color-semantic-foreground); }
[data-scope=questionnaire][data-part=option]:has(input:disabled) { opacity:.5;cursor:not-allowed; }
[data-scope=questionnaire][data-part=option] input { flex:none;accent-color:var(--lk-color-semantic-primary); }
[data-scope=questionnaire][data-part=error] { color:var(--lk-color-semantic-destructive);font-size:var(--lk-typography-fontsize-sm);overflow-wrap:anywhere; }
[data-scope=questionnaire][data-part=actions] { display:flex;flex-wrap:wrap;justify-content:space-between;gap:var(--lk-space-component-sm); }
`;
