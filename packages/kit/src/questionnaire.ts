const escapeHtml = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
export interface QuestionOption {
  value: string;
  label: string;
  disabled?: boolean;
}
export interface QuestionRow {
  id: string;
  label: string;
  disabled?: boolean;
}
export type QuestionAnswer = string | readonly string[] | Readonly<Record<string, string>>;
export function questionMap(answer: QuestionAnswer | undefined): Readonly<Record<string, string>> {
  return answer && typeof answer === "object" && !Array.isArray(answer) ? Object.fromEntries(Object.entries(answer)) : {};
}
export function questionIncludes(answer: QuestionAnswer, value: string) {
  return Array.isArray(answer) && answer.includes(value);
}
export interface Question {
  id: string;
  label: string;
  description?: string;
  type: "text" | "single" | "multiple" | "number" | "date" | "select" | "matrix" | "ranking";
  required?: boolean;
  min?: number | string;
  max?: number | string;
  step?: number;
  rows?: readonly QuestionRow[];
  placeholder?: string;
  moveUpLabel?: string;
  moveDownLabel?: string;
  minLength?: number;
  maxLength?: number;
  options?: readonly QuestionOption[];
  /** 基于归一化完整答案判断可见性；应保持纯函数。 */
  when?: (value: QuestionnaireValue) => boolean;
  /** 提交时执行的异步校验；调用方负责响应 AbortSignal。 */
  validateAsync?: (
    answer: QuestionAnswer,
    value: QuestionnaireValue,
    context: { signal: AbortSignal },
  ) => Promise<string | undefined>;
  /** 内建校验通过后执行同步业务校验，返回错误说明或 undefined。 */
  validate?: (
    answer: QuestionAnswer,
    value: QuestionnaireValue,
  ) => string | undefined;
}
export type QuestionnaireValue = Record<string, QuestionAnswer>;
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
    if (q.type === "matrix") {
      const rows = new Set<string>();
      for (const row of q.rows ?? []) {
        if (!row.id || rows.has(row.id)) throw Error("Questionnaire requires unique non-empty matrix row ids");
        rows.add(row.id);
      }
    }
    if (q.type === "number" && q.step !== undefined && (!Number.isFinite(q.step) || q.step <= 0)) throw Error("Questionnaire requires a finite positive number step");
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
      let normalized: QuestionAnswer;
      if (["text", "number", "date"].includes(q.type)) normalized = typeof answer === "string" ? answer : "";
      else if (q.type === "single" || q.type === "select") normalized = typeof answer === "string" && enabled.includes(answer) ? answer : "";
      else if (q.type === "matrix") {
        const map = questionMap(answer);
        normalized = Object.fromEntries((q.rows ?? []).filter(r => !r.disabled && enabled.includes(map[r.id])).map(r => [r.id, map[r.id]]));
      } else {
        const order = Array.isArray(answer) ? [...new Set(answer.filter(v => enabled.includes(v)))] : [];
        normalized = q.type === "ranking" ? [...order, ...enabled.filter(v => !order.includes(v))] : order;
      }
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
    typeof answer === "string" ? answer.trim().length : Array.isArray(answer) ? answer.length : Object.keys(answer).length;
  if (q.required && (q.type === "matrix" ? length < (q.rows ?? []).filter(r => !r.disabled).length : !length))
    return options.requiredLabel ?? "Please answer this question.";
  if (
    q.type === "text" &&
    length &&
    (length < (q.minLength ?? 0) || length > (q.maxLength ?? Infinity))
  )
    return options.invalidLabel ?? "Check the answer length.";
  if (typeof answer === "string" && answer.trim() && q.type === "number") {
    const number = Number(answer), base = typeof q.min === "number" ? q.min : 0;
    const distance = q.step ? (number - base) / q.step : 0;
    if (!Number.isFinite(number) || !/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(answer.trim()) || (typeof q.min === "number" && number < q.min) || (typeof q.max === "number" && number > q.max) || (q.step && Math.abs(distance - Math.round(distance)) > 1e-8))
      return options.invalidLabel ?? "Enter a number within the allowed range and step.";
  }
  if (typeof answer === "string" && answer && q.type === "date") {
    const date = /^\d{4}-\d{2}-\d{2}$/.test(answer) ? new Date(answer + "T00:00:00Z") : undefined;
    if (!date || !Number.isFinite(date.valueOf()) || date.toISOString().slice(0, 10) !== answer || (typeof q.min === "string" && answer < q.min) || (typeof q.max === "string" && answer > q.max))
      return options.invalidLabel ?? "Enter a valid date within the allowed range.";
  }
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
  if (["number", "date", "select", "matrix", "ranking"].includes(question.type)) {
    restoreQuestionControl(root, question, value);
  } else if (question.type === "text") {
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
          ? questionIncludes(answer, input.value)
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
    '[data-part="question"] input:not([type=hidden]):not(:disabled),[data-part="question"] textarea:not(:disabled),[data-part="question"] select:not(:disabled),[data-part="question"] button:not(:disabled)',
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
[data-scope=questionnaire] [data-part=advanced-answer] { min-width:0; }
[data-scope=questionnaire] [data-part=answer] { box-sizing:border-box;width:100%;min-width:0;height:var(--lk-control-height-md);padding-inline:var(--lk-space-component-compact);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-md);background:var(--lk-color-semantic-background);color:var(--lk-color-semantic-foreground);font:inherit; }
[data-scope=questionnaire] [data-part=matrix] { display:grid;gap:var(--lk-space-component-md); }
[data-scope=questionnaire] [data-part=matrix-row] { margin:0;padding:0;border:0;min-width:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,10em),1fr));gap:var(--lk-space-component-sm); }
[data-scope=questionnaire] [data-part=matrix-row] legend { margin-block-end:var(--lk-space-component-sm);font-weight:var(--lk-typography-fontweight-medium);overflow-wrap:anywhere; }
[data-scope=questionnaire] [data-part=ranking] { margin:0;padding:0;list-style:none;counter-reset:rank;display:grid;gap:var(--lk-space-component-sm); }
[data-scope=questionnaire] [data-part=rank-row] { counter-increment:rank;display:flex;align-items:center;flex-wrap:wrap;gap:var(--lk-space-component-sm);padding:var(--lk-space-component-sm);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-md); }
[data-scope=questionnaire] [data-part=rank-row]::before { content:counter(rank);color:var(--lk-color-semantic-mutedforeground);font-variant-numeric:tabular-nums; }
[data-scope=questionnaire] [data-part=rank-row] > span { flex:1;min-width:0;overflow-wrap:anywhere; }
[data-scope=questionnaire] [data-part=rank-actions] { display:flex;flex-wrap:wrap;gap:var(--lk-space-component-xs); }
[data-scope=questionnaire] [data-part=rank-actions] button { height:var(--lk-control-height-sm);padding-inline:var(--lk-space-component-sm);font:inherit;font-size:var(--lk-typography-fontsize-sm);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-md);background:var(--lk-color-semantic-background);color:var(--lk-color-semantic-foreground);cursor:pointer; }
[data-scope=questionnaire] [data-part=rank-actions] button:hover:enabled { background:var(--lk-color-semantic-muted); }
[data-scope=questionnaire] [data-part=rank-actions] button:disabled,[data-scope=questionnaire] [data-part=answer]:disabled { opacity:.5;cursor:not-allowed; }
[data-scope=questionnaire] [data-part=answer]:focus-visible,[data-scope=questionnaire] [data-part=rank-actions] button:focus-visible { outline:var(--lk-control-focuswidth) solid var(--lk-color-semantic-ring);outline-offset:var(--lk-control-focuswidth); }
[data-scope=questionnaire] [data-part=answer][aria-invalid=true] { border-color:var(--lk-color-semantic-destructive); }

@media (max-width:480px) { [data-scope=questionnaire] [data-part=rank-row] { display:grid;grid-template-columns:auto minmax(0,1fr); } [data-scope=questionnaire] [data-part=rank-actions] { grid-column:2;justify-self:start; } }
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
          typeof answer === "string" ? answer : Array.isArray(answer) ? Object.freeze([...answer]) : Object.freeze({ ...answer }),
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

/** 使用真实表单名称；矩阵展开为 question[row]，排序按当前顺序重复名称。 */
export function questionnaireFormEntries(value: QuestionnaireValue, exclude?: string): Array<[string, string]> {
  return Object.entries(value).filter(([name]) => name !== exclude).flatMap(([name, answer]) =>
    typeof answer === "string" ? [[name, answer] as [string, string]] : Array.isArray(answer) ? answer.map(text => [name, text] as [string, string]) : Object.entries(answer).map(([row, text]) => [`${name}[${row}]`, text] as [string, string]));
}
export function renderQuestionControl(q: Question, value: QuestionnaireValue, descriptionId: string, invalid: boolean) {
  const answer = questionnaireValue([q], value)[q.id], e = escapeHtml;
  const common = `aria-describedby="${e(descriptionId)}" aria-required="${!!q.required}" aria-invalid="${invalid}"`;
  const options = (q.options ?? []).filter(o => !o.disabled);
  if (q.type === "number" || q.type === "date") return `<input data-question-control="value" data-part="answer" name="${e(q.id)}" type="${q.type}" aria-label="${e(q.label)}" value="${e(String(answer))}" ${common}${q.min !== undefined ? ` min="${e(String(q.min))}"` : ""}${q.max !== undefined ? ` max="${e(String(q.max))}"` : ""}${q.type === "number" ? ` step="${q.step ?? "any"}"` : ""}>`;
  if (q.type === "select") return `<select data-question-control="value" data-part="answer" name="${e(q.id)}" aria-label="${e(q.label)}" ${common}><option value="">${e(q.placeholder ?? "Choose an option")}</option>${(q.options ?? []).map(o => `<option value="${e(o.value)}"${answer === o.value ? " selected" : ""}${o.disabled ? " disabled" : ""}>${e(o.label)}</option>`).join("")}</select>`;
  if (q.type === "matrix") return `<div data-part="matrix">${(q.rows ?? []).map(row => `<fieldset data-part="matrix-row"${row.disabled ? " disabled" : ""}><legend>${e(row.label)}</legend>${options.map(o => `<label data-scope="questionnaire" data-part="option"${questionMap(answer)[row.id] === o.value ? ' data-selected="true"' : ""}><input data-question-control="matrix" data-key="${e(o.value)}" data-row="${e(row.id)}" type="radio" name="${e(q.id)}[${e(row.id)}]" value="${e(o.value)}" ${common}${questionMap(answer)[row.id] === o.value ? " checked" : ""}><span>${e(o.label)}</span></label>`).join("")}</fieldset>`).join("")}</div>`;
  if (q.type === "ranking") return `<ol data-part="ranking">${(Array.isArray(answer) ? answer : []).map((key, index, order) => {
    const label = options.find(o => o.value === key)?.label ?? key;
    return `<li data-part="rank-row"><span>${e(label)}</span><input type="hidden" name="${e(q.id)}" value="${e(key)}"><div data-part="rank-actions">${[-1, 1].map(direction => `<button type="button" data-question-control="rank" data-key="${e(key)}" data-direction="${direction}" aria-label="${e((direction < 0 ? q.moveUpLabel ?? "Move up" : q.moveDownLabel ?? "Move down") + ": " + label)}"${index + direction < 0 || index + direction >= order.length ? " disabled" : ""}>${e(direction < 0 ? q.moveUpLabel ?? "Move up" : q.moveDownLabel ?? "Move down")}</button>`).join("")}</div></li>`;
  }).join("")}</ol>`;
  return "";
}
function restoreQuestionControl(root: HTMLElement, q: Question, value: QuestionnaireValue) {
  const answer = questionnaireValue([q], value)[q.id];
  for (const input of Array.from(root.querySelectorAll<HTMLInputElement | HTMLSelectElement>("[data-question-control]"))) {
    if (input.dataset.questionControl === "value") input.setAttribute("aria-invalid", root.querySelector('[data-part="error"]')?.textContent?.trim() ? "true" : "false");
    if (input.dataset.questionControl === "value" && typeof answer === "string" && input.value !== answer) input.value = answer;
    if (input instanceof HTMLInputElement && input.dataset.questionControl === "matrix") {
      input.checked = questionMap(answer)[input.dataset.row ?? ""] === input.value;
      input.closest("label")?.toggleAttribute("data-selected", input.checked);
      if (input.checked) input.closest("label")?.setAttribute("data-selected", "true");
    }
  }
}
/** 只委托新增题型；捕获被替换的原生控件，恢复其逻辑焦点而不抢外部焦点。 */
export function mountQuestionControls(root: HTMLElement, get: () => { question?: Question; value: QuestionnaireValue; blocked: boolean }, change: (value: QuestionnaireValue) => void) {
  let disposed = false;
  let focus: { id: string; part: string; key: string; row: string; direction: string; start: number | null; end: number | null; node: HTMLElement } | undefined;
  const capture = (node: HTMLElement) => {
    const q = get().question;
    if (!q || !node.dataset.questionControl) return;
    focus = { id: q.id, part: node.dataset.questionControl, key: node.dataset.key ?? "", row: node.dataset.row ?? "", direction: node.dataset.direction ?? "", start: node instanceof HTMLInputElement ? node.selectionStart : null, end: node instanceof HTMLInputElement ? node.selectionEnd : null, node };
  };
  const input = (event: Event) => {
    const node = event.target;
    if (!(node instanceof HTMLInputElement || node instanceof HTMLSelectElement) || !node.dataset.questionControl) return;
    const { question: q, value, blocked } = get();
    if (!q || blocked || node.disabled || node.closest(":disabled")) return;
    capture(node);
    if (node.dataset.questionControl === "value" && event.type === "input") change({ ...value, [q.id]: node.value });
    if (node.dataset.questionControl === "matrix" && event.type === "change" && node instanceof HTMLInputElement && node.checked) change({ ...value, [q.id]: { ...questionMap(value[q.id]), [node.dataset.row!]: node.value } });
  };
  const click = (event: Event) => {
    const node = event.target;
    if (!(node instanceof HTMLElement)) return;
    const button = node.closest<HTMLButtonElement>('button[data-question-control="rank"]');
    const { question: q, value, blocked } = get();
    if (!button || !q || blocked || button.disabled || button.closest(":disabled")) return;
    const answer = questionnaireValue([q], value)[q.id];
    if (!Array.isArray(answer)) return;
    const order = [...answer], from = order.indexOf(button.dataset.key!), to = from + Number(button.dataset.direction);
    if (from < 0 || to < 0 || to >= order.length) return;
    capture(button);
    [order[from], order[to]] = [order[to], order[from]];
    change({ ...value, [q.id]: order });
  };
  const focusin = (event: Event) => { if (event.target instanceof HTMLElement && root.contains(event.target) && event.target.dataset.questionControl) capture(event.target); else focus = undefined; };
  const pointer = (event: Event) => { if (event.target instanceof Node && !root.contains(event.target)) focus = undefined; };
  const observer = new MutationObserver(() => {
    const { question, value } = get();
    if (question) restoreQuestionControl(root, question, value);
    if (!focus || disposed || focus.node.isConnected || get().question?.id !== focus.id || get().blocked || root.ownerDocument.activeElement !== root.ownerDocument.body) return;
    const descriptor = focus;
    let node = Array.from(root.querySelectorAll<HTMLElement>("[data-question-control]")).find(n => n.dataset.questionControl === descriptor.part && (n.dataset.key ?? "") === descriptor.key && (n.dataset.row ?? "") === descriptor.row && (n.dataset.direction ?? "") === descriptor.direction);
    if (node?.matches(":disabled") && descriptor.part === "rank") node = Array.from(root.querySelectorAll<HTMLElement>('[data-question-control="rank"]')).find(n => n.dataset.key === descriptor.key && !n.matches(":disabled"));
    if (!node || node.matches(":disabled")) return;
    node.focus();
    if (node instanceof HTMLInputElement && descriptor.start !== null) node.setSelectionRange(descriptor.start, descriptor.end);
  });
  observer.observe(root, { childList: true, subtree: true, characterData: true });
  root.addEventListener("input", input);root.addEventListener("change", input);root.addEventListener("click", click);root.ownerDocument.addEventListener("focusin", focusin);root.ownerDocument.addEventListener("pointerdown", pointer);
  return () => { disposed = true;observer.disconnect();root.removeEventListener("input", input);root.removeEventListener("change", input);root.removeEventListener("click", click);root.ownerDocument.removeEventListener("focusin", focusin);root.ownerDocument.removeEventListener("pointerdown", pointer);focus = undefined; };
}

/** 标量控件保留原生节点与编辑中的光标/日期段；值由生命周期同步而非 HTML 重建。 */
export function createQuestionControlRenderer() {
  let signature = "", html = "";
  return (q: Question, value: QuestionnaireValue, descriptionId: string, invalid: boolean) => {
    if (!["number", "date", "select"].includes(q.type)) return renderQuestionControl(q, value, descriptionId, invalid);
    const next = JSON.stringify([q, descriptionId]);
    if (signature !== next) { signature = next;html = renderQuestionControl(q, value, descriptionId, invalid); }
    return html;
  };
}
