import {
  renderQuestionGroup,
  mountQuestionGroups,
  questionGroupShape,
  restoreQuestionGroups,
} from "./questionnaire-groups";
import { GripVertical } from "lucide";
import { decorativeIconMarkup } from "./icon-markup";
import { mountQuestionRanking } from "./questionnaire-ranking";
const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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
/** 重复题组以稳定实例 id 识别答案；增删不会改变其他实例的路径。 */
export interface QuestionGroupInstance {
  id: string;
  value: QuestionnaireValue;
}
export type QuestionAnswer =
  | string
  | readonly string[]
  | readonly QuestionGroupInstance[]
  | Readonly<Record<string, string | readonly string[]>>;
export function questionMap(
  answer: QuestionAnswer | undefined,
): Readonly<Record<string, string>> {
  return answer && typeof answer === "object" && !Array.isArray(answer)
    ? Object.fromEntries(
        Object.entries(answer).filter(
          (entry): entry is [string, string] => typeof entry[1] === "string",
        ),
      )
    : {};
}
export function questionStrings(answer: QuestionAnswer | undefined): string[] {
  return Array.isArray(answer)
    ? answer.filter((entry): entry is string => typeof entry === "string")
    : [];
}
export function questionGroups(
  answer: QuestionAnswer | undefined,
): readonly QuestionGroupInstance[] {
  return Array.isArray(answer)
    ? answer.filter(
        (entry): entry is QuestionGroupInstance =>
          !!entry &&
          typeof entry === "object" &&
          typeof entry.id === "string" &&
          !!entry.value &&
          typeof entry.value === "object" &&
          !Array.isArray(entry.value),
      )
    : [];
}
export function questionIncludes(answer: QuestionAnswer, value: string) {
  return questionStrings(answer).includes(value);
}
export interface Question {
  id: string;
  label: string;
  description?: string;
  type:
    | "text"
    | "single"
    | "multiple"
    | "number"
    | "date"
    | "select"
    | "matrix"
    | "ranking"
    | "group"
    | "custom";
  /** 自定义渲染器的稳定名称；答案仍使用通用表单数据。 */
  customKind?: string;
  answerKind?: "string" | "strings" | "map";
  /** 重复题组内的题目；子题条件读取本实例的局部完整答案。 */
  questions?: readonly Question[];
  minGroups?: number;
  maxGroups?: number;
  groupLabels?: { add?: string; remove?: string; instance?: string };

  required?: boolean;
  /** 矩阵题的每一行允许多个选项；默认仍是独立单选组。 */
  multiple?: boolean;
  /** 多选题或矩阵多选的每行选项数量边界；空的可选答案不触发最小值。 */
  minSelections?: number;
  maxSelections?: number;
  min?: number | string;
  max?: number | string;
  step?: number;
  rows?: readonly QuestionRow[];
  placeholder?: string;
  moveUpLabel?: string;
  moveDownLabel?: string;
  /** 排序手柄的操作说明和实时播报；不改变答案数据。 */
  rankingLabels?: {
    handle?: string;
    instructions?: string;
    pickedUp?: string;
    moved?: string;
    dropped?: string;
    cancelled?: string;
    rejected?: string;
  };
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
function matrixAnswers(
  answer: QuestionAnswer | undefined,
): Readonly<Record<string, string | readonly string[]>> {
  return answer && typeof answer === "object" && !Array.isArray(answer)
    ? Object.fromEntries(Object.entries(answer))
    : {};
}
function selectionError(
  q: Question,
  answer: readonly string[],
  options: Pick<QuestionnaireOptions, "requiredLabel" | "invalidLabel">,
) {
  if (q.required && !answer.length)
    return options.requiredLabel ?? "Please answer this question.";
  if (
    answer.length &&
    (answer.length < (q.minSelections ?? 0) ||
      answer.length > (q.maxSelections ?? Infinity))
  )
    return options.invalidLabel ?? "Check the number of selected options.";
  return "";
}
export function questionnaireQuestions(
  questions: readonly Question[],
  ancestors: readonly Question[] = [],
) {
  const ids = new Set<string>();
  for (const q of questions) {
    if (!q.id || ids.has(q.id))
      throw Error("Questionnaire requires unique non-empty question ids");
    ids.add(q.id);
    if (ancestors.includes(q))
      throw Error("Questionnaire group schema cannot contain cycles");
    if (q.type === "group") {
      if (!q.questions?.length)
        throw Error("Questionnaire group requires nested questions");
      for (const bound of [q.minGroups, q.maxGroups])
        if (bound !== undefined && (!Number.isSafeInteger(bound) || bound < 0))
          throw Error(
            "Questionnaire group bounds require non-negative safe integers",
          );
      if (
        Math.max(q.required ? 1 : 0, q.minGroups ?? 0) >
        (q.maxGroups ?? Infinity)
      )
        throw Error("Questionnaire group bounds must be ascending");
      questionnaireQuestions(q.questions ?? [], [...ancestors, q]);
    } else if (
      q.questions !== undefined ||
      q.minGroups !== undefined ||
      q.maxGroups !== undefined
    )
      throw Error(
        "Questionnaire nested questions and group bounds require group type",
      );
    if (q.type === "custom") {
      if (!q.customKind?.trim() || !["string", "strings", "map"].includes(q.answerKind ?? "string"))
        throw Error("Questionnaire custom questions require a kind and valid answer shape");
    } else if (q.customKind !== undefined || q.answerKind !== undefined)
      throw Error("Questionnaire custom kind and answer shape require custom type");
    if (q.multiple !== undefined && q.type !== "matrix")
      throw Error("Questionnaire multiple applies only to matrix questions");
    if (
      (q.minSelections !== undefined || q.maxSelections !== undefined) &&
      q.type !== "multiple" &&
      !(q.type === "matrix" && q.multiple)
    )
      throw Error("Questionnaire selection bounds require multiple selection");
    for (const bound of [q.minSelections, q.maxSelections])
      if (bound !== undefined && (!Number.isSafeInteger(bound) || bound < 0))
        throw Error(
          "Questionnaire selection bounds require non-negative safe integers",
        );
    if ((q.minSelections ?? 0) > (q.maxSelections ?? Infinity))
      throw Error("Questionnaire selection bounds must be ascending");
    if (q.type === "matrix") {
      const rows = new Set<string>();
      for (const row of q.rows ?? []) {
        if (!row.id || rows.has(row.id))
          throw Error("Questionnaire requires unique non-empty matrix row ids");
        rows.add(row.id);
      }
    }
    if (
      q.type === "number" &&
      q.step !== undefined &&
      (!Number.isFinite(q.step) || q.step <= 0)
    )
      throw Error("Questionnaire requires a finite positive number step");
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
      if (q.type === "group") {
        const ids = new Set<string>();
        normalized = questionGroups(answer).map((instance) => {
          if (!instance.id || ids.has(instance.id))
            throw Error(
              "Questionnaire requires unique non-empty group instance ids",
            );
          ids.add(instance.id);
          return {
            id: instance.id,
            value: questionnaireValue(q.questions ?? [], instance.value),
          };
        });
      } else if (q.type === "custom") {
        normalized = q.answerKind === "strings"
          ? [...new Set(questionStrings(answer).filter((item) => item.trim()))]
          : q.answerKind === "map"
            ? Object.fromEntries(Object.entries(matrixAnswers(answer)).flatMap(([key, item]) => {
                if (!key) return [];
                const normalized = typeof item === "string" ? item : [...new Set(item.filter((entry) => entry.trim()))];
                return (typeof normalized === "string" ? normalized.trim().length : normalized.length) ? [[key, normalized]] : [];
              }))
            : typeof answer === "string" ? answer : "";
      } else if (["text", "number", "date"].includes(q.type))
        normalized = typeof answer === "string" ? answer : "";
      else if (q.type === "single" || q.type === "select")
        normalized =
          typeof answer === "string" && enabled.includes(answer) ? answer : "";
      else if (q.type === "matrix") {
        const map = matrixAnswers(answer);
        normalized = Object.fromEntries(
          (q.rows ?? [])
            .filter((r) => !r.disabled)
            .flatMap<[string, string | readonly string[]]>((r) => {
              const entry = map[r.id];
              if (!q.multiple)
                return typeof entry === "string" && enabled.includes(entry)
                  ? [[r.id, entry]]
                  : [];
              const selected = enabled.filter(
                (key) => Array.isArray(entry) && entry.includes(key),
              );
              return selected.length ? [[r.id, selected]] : [];
            }),
        );
      } else {
        const order = [
          ...new Set(
            questionStrings(answer).filter((v) => enabled.includes(v)),
          ),
        ];
        normalized =
          q.type === "ranking"
            ? [...order, ...enabled.filter((v) => !order.includes(v))]
            : order;
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
/** 隐藏子题仅保留在编辑状态；递归提交和 FormData 不泄漏其答案。 */
export function questionnaireSubmittedValue(
  questions: readonly Question[],
  value: QuestionnaireValue,
): QuestionnaireValue {
  const current = questionnaireValue(questions, value);
  return Object.fromEntries(
    questionnaireVisibleQuestions(questions, current).map((q) => [
      q.id,
      q.type === "group"
        ? questionGroups(current[q.id]).map((instance) => ({
            id: instance.id,
            value: questionnaireSubmittedValue(
              q.questions ?? [],
              instance.value,
            ),
          }))
        : current[q.id],
    ]),
  );
}
export function questionnaireValidationEntries(
  questions: readonly Question[],
  value: QuestionnaireValue,
  path: readonly string[] = [],
  rootId?: string,
): Array<{
  question: Question;
  value: QuestionnaireValue;
  path: readonly string[];
  rootId: string;
}> {
  return questionnaireVisibleQuestions(questions, value).flatMap((q) => {
    const next = [...path, q.id],
      root = rootId ?? q.id;
    return [
      { question: q, value, path: next, rootId: root },
      ...(q.type === "group"
        ? questionGroups(value[q.id]).flatMap((instance) =>
            questionnaireValidationEntries(
              q.questions ?? [],
              instance.value,
              [...next, instance.id],
              root,
            ),
          )
        : []),
    ];
  });
}
function freezeQuestionnaireValue(
  value: QuestionnaireValue,
): QuestionnaireValue {
  return Object.freeze(
    Object.fromEntries(
      Object.entries(value).map(([key, answer]) => {
        let frozen: QuestionAnswer;
        if (typeof answer === "string") frozen = answer;
        else if (Array.isArray(answer)) {
          const groups = questionGroups(answer);
          frozen = groups.length
            ? Object.freeze(
                groups.map((instance) =>
                  Object.freeze({
                    id: instance.id,
                    value: freezeQuestionnaireValue(instance.value),
                  }),
                ),
              )
            : Object.freeze(questionStrings(answer));
        } else
          frozen = Object.freeze(
            Object.fromEntries(
              Object.entries(answer).map(([row, entry]) => [
                row,
                typeof entry === "string" ? entry : Object.freeze([...entry]),
              ]),
            ),
          );
        return [key, frozen];
      }),
    ),
  );
}
export function questionError(
  q: Question,
  value: QuestionnaireValue,
  options: Pick<QuestionnaireOptions, "requiredLabel" | "invalidLabel"> = {},
  asyncErrors?: Record<string, string>,
): string {
  if (asyncErrors && Object.prototype.hasOwnProperty.call(asyncErrors, q.id))
    return asyncErrors[q.id];
  const answer = questionnaireValue([q], value)[q.id];
  if (q.type === "group") {
    const groups = questionGroups(answer);
    if (
      groups.length < Math.max(q.required ? 1 : 0, q.minGroups ?? 0) ||
      groups.length > (q.maxGroups ?? Infinity)
    )
      return options.invalidLabel ?? "Check the number of groups.";
    for (const instance of groups)
      for (const child of questionnaireVisibleQuestions(
        q.questions ?? [],
        instance.value,
      )) {
        const error = questionError(child, instance.value, options);
        if (error) return error;
      }
    return q.validate?.(answer, value) ?? "";
  }
  const length =
    typeof answer === "string"
      ? answer.trim().length
      : Array.isArray(answer)
        ? answer.length
        : Object.keys(answer).length;
  if (
    q.required &&
    (q.type === "matrix"
      ? length < (q.rows ?? []).filter((r) => !r.disabled).length
      : !length)
  )
    return options.requiredLabel ?? "Please answer this question.";
  if (q.type === "multiple" && Array.isArray(answer)) {
    const error = selectionError(q, questionStrings(answer), options);
    if (error) return error;
  }
  if (q.type === "matrix" && q.multiple) {
    const map = matrixAnswers(answer);
    for (const row of (q.rows ?? []).filter((row) => !row.disabled)) {
      const entry = map[row.id],
        error = selectionError(q, Array.isArray(entry) ? entry : [], options);
      if (error) return error;
    }
  }
  if (
    q.type === "text" &&
    length &&
    (length < (q.minLength ?? 0) || length > (q.maxLength ?? Infinity))
  )
    return options.invalidLabel ?? "Check the answer length.";
  if (typeof answer === "string" && answer.trim() && q.type === "number") {
    const number = Number(answer),
      base = typeof q.min === "number" ? q.min : 0;
    const distance = q.step ? (number - base) / q.step : 0;
    if (
      !Number.isFinite(number) ||
      !/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(answer.trim()) ||
      (typeof q.min === "number" && number < q.min) ||
      (typeof q.max === "number" && number > q.max) ||
      (q.step && Math.abs(distance - Math.round(distance)) > 1e-8)
    )
      return (
        options.invalidLabel ??
        "Enter a number within the allowed range and step."
      );
  }
  if (typeof answer === "string" && answer && q.type === "date") {
    const date = /^\d{4}-\d{2}-\d{2}$/.test(answer)
      ? new Date(answer + "T00:00:00Z")
      : undefined;
    if (
      !date ||
      !Number.isFinite(date.valueOf()) ||
      date.toISOString().slice(0, 10) !== answer ||
      (typeof q.min === "string" && answer < q.min) ||
      (typeof q.max === "string" && answer > q.max)
    )
      return (
        options.invalidLabel ?? "Enter a valid date within the allowed range."
      );
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
          ? [...new Set([...questionStrings(current), option])]
          : questionStrings(current).filter((v) => v !== option)
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
  if (question.type === "group") {
    restoreQuestionGroups(root, question, value);
    return;
  }
  const scope =
    root.dataset.part === "group-question"
      ? root
      : root.querySelector<HTMLElement>('[data-part="question"]');
  const answer = questionnaireValue([question], value)[question.id];
  if (
    ["number", "date", "select", "matrix", "ranking"].includes(question.type)
  ) {
    restoreQuestionControl(root, question, value);
  } else if (question.type === "text") {
    const input = scope?.querySelector<HTMLTextAreaElement>("textarea");
    if (input && typeof answer === "string" && input.value !== answer)
      input.value = answer;
  } else {
    for (const input of Array.from(
      scope?.querySelectorAll<HTMLInputElement>("input") ?? [],
    )) {
      input.checked =
        question.type === "multiple"
          ? questionIncludes(answer, input.value)
          : answer === input.value;
      input.closest("label")?.toggleAttribute("data-selected", input.checked);
      if (input.checked)
        input.closest("label")?.setAttribute("data-selected", "true");
    }
  }
}
/** ownedAtStart 用于异步恢复：允许禁用触发器失焦到 body，但不抢外部控件焦点。 */
export function focusQuestion(
  root?: HTMLElement | null,
  ownedAtStart?: boolean,
  focusCustom?: (element: HTMLElement) => boolean,
) {
  if (!root?.isConnected) return;
  const owner = root.ownerDocument,
    win = owner.defaultView;
  if (!win) return;
  // 框架在校验结果之后提交错误状态，下一帧再定位首个无效矩阵行。
  win.requestAnimationFrame(() => {
    if (!root.isConnected) return;
    const active = owner.activeElement;
    if (
      ownedAtStart !== undefined &&
      !root.contains(active) &&
      !(ownedAtStart && active === owner.body)
    )
      return;
    const bounds=root.querySelector<HTMLElement>('[data-part="groups"][data-group-bounds-invalid=true] > [data-question-group]:not(:disabled)');
    const firstInvalid=root.querySelector<HTMLElement>('[data-part="group-question"][aria-invalid=true]:not([data-question-type="group"])') ?? root.querySelector<HTMLElement>('[data-part="group-question"]:not([data-question-type="group"])') ?? root.querySelector<HTMLElement>('[data-part="question"]');
    if (!bounds && firstInvalid?.querySelector('[data-question-custom]') && focusCustom?.(firstInvalid)) return;
    const input =
      root.querySelector<HTMLElement>(
        '[data-part="groups"][data-group-bounds-invalid=true] > [data-question-group]:not(:disabled)',
      ) ??
      root.querySelector<HTMLElement>(
        '[data-part="group-question"][aria-invalid=true]:not([data-question-type="group"]) [data-part="matrix-row"][aria-invalid=true] input:not(:disabled),[data-part="group-question"][aria-invalid=true]:not([data-question-type="group"]) input:not([type=hidden]):not(:disabled),[data-part="group-question"][aria-invalid=true]:not([data-question-type="group"]) textarea:not(:disabled),[data-part="group-question"][aria-invalid=true]:not([data-question-type="group"]) select:not(:disabled),[data-part="group-question"][aria-invalid=true]:not([data-question-type="group"]) button:not(:disabled)',
      ) ??
      root.querySelector<HTMLElement>(
        '[data-part="matrix-row"][aria-invalid=true]:not(:disabled) input:not(:disabled)',
      ) ??
      root.querySelector<HTMLElement>(
        '[data-part="question"] input:not([type=hidden]):not(:disabled),[data-part="question"] textarea:not(:disabled),[data-part="question"] select:not(:disabled),[data-part="question"] button:not(:disabled)',
      );
    (
      input ?? root.querySelector<HTMLElement>('[data-part="question"]')
    )?.focus();
  });
}
export const questionnaireCSS = `
[data-scope=questionnaire][data-part=root] { display:grid;gap:var(--lk-space-component-md);width:100%;min-width:0; }
[data-scope=questionnaire] [data-part=groups] { display:grid;gap:var(--lk-space-component-md);min-width:0; }
[data-scope=questionnaire] :is([data-part=group-instance],[data-part=group-question]) { display:grid;gap:var(--lk-space-component-sm);min-width:0;margin:0;padding:var(--lk-space-component-compact);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-md); }
[data-scope=questionnaire] [data-part=group-question] { padding:0;border:0;border-radius:0; }
[data-scope=questionnaire] [data-part=group-question] textarea[data-part=answer] { height:auto;min-height:calc(2 * var(--lk-control-height-md));padding-block:var(--lk-space-component-sm);resize:vertical; }
[data-scope=questionnaire] :is([data-part=group-instance],[data-part=group-question]) > legend { padding-inline:var(--lk-space-component-xs);font-weight:var(--lk-typography-fontweight-medium);overflow-wrap:anywhere; }
[data-scope=questionnaire] [data-part=group-question] :is([data-part=description],[data-part=error]):empty { display:none; }
[data-scope=questionnaire] [data-question-group] { justify-self:start;min-height:var(--lk-control-height-md);padding:var(--lk-space-component-xs) var(--lk-space-component-compact);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-md);background:var(--lk-color-semantic-background);color:inherit;font:inherit;cursor:pointer; }
[data-scope=questionnaire] [data-question-group]:hover:not(:disabled) { background:var(--lk-color-semantic-muted); }
[data-scope=questionnaire] [data-question-group]:focus-visible { outline:var(--lk-control-focuswidth) solid var(--lk-color-semantic-ring);outline-offset:var(--lk-control-focuswidth); }
[data-scope=questionnaire] [data-question-group]:disabled { opacity:.5;cursor:not-allowed; }
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
      const nextCallbacks = questionnaireValidationEntries(
        questions,
        value,
      ).flatMap(({ question: q }) => [q.validate, q.validateAsync, q.when]);
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
      const snapshot = freezeQuestionnaireValue(value);
      const entries = questionnaireValidationEntries(questions, snapshot);
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
        if (entries.some(({ question: q }) => q.validateAsync))
          publish({ pending: true, errors: {} });
        for (const {
          question: q,
          value: localValue,
          rootId,
          path,
        } of entries) {
          if (!q.validateAsync) continue;
          let error: string | undefined;
          try {
            const work = q.validateAsync(localValue[q.id], localValue, {
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
            publish({
              pending: false,
              errors: {
                [rootId]: error,
                ...(path.length > 1 ? { [JSON.stringify(path)]: error } : {}),
              },
            });
            return { invalidId: rootId };
          }
        }
        if (!valid()) return;
        publish({ pending: false, errors: {} });
        return { value: questionnaireSubmittedValue(questions, snapshot) };
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
export function questionnaireFormEntries(
  value: QuestionnaireValue,
  exclude?: string,
): Array<[string, string]> {
  const entries: Array<[string, string]> = [];
  const visit = (name: string, answer: QuestionAnswer) => {
    if (typeof answer === "string") entries.push([name, answer]);
    else if (Array.isArray(answer)) {
      const groups = questionGroups(answer);
      if (groups.length)
        for (const instance of groups)
          for (const [key, child] of Object.entries(instance.value))
            visit(`${name}[${instance.id}][${key}]`, child);
      else
        for (const text of questionStrings(answer)) entries.push([name, text]);
    } else
      for (const [row, entry] of Object.entries(answer))
        visit(`${name}[${row}]`, entry);
  };
  for (const [name, answer] of Object.entries(value))
    if (name !== exclude) visit(name, answer);
  return entries;
}
export function renderQuestionControl(
  q: Question,
  value: QuestionnaireValue,
  descriptionId: string,
  invalid: boolean,
) {
  if (q.type === "group")
    return renderQuestionGroup(
      q,
      questionnaireValue([q], value),
      descriptionId,
      invalid,
    );
  const answer = questionnaireValue([q], value)[q.id],
    e = escapeHtml;
  const common = `aria-describedby="${e(descriptionId)}" aria-required="${!!q.required}" aria-invalid="${invalid}"`;
  const options = (q.options ?? []).filter((o) => !o.disabled);
  if (q.type === "text")
    return `<textarea data-question-control="value" data-part="answer" name="${e(q.id)}" aria-label="${e(q.label)}" ${common}${q.minLength !== undefined ? ` minlength="${q.minLength}"` : ""}${q.maxLength !== undefined ? ` maxlength="${q.maxLength}"` : ""}>${e(typeof answer === "string" ? answer : "")}</textarea>`;
  if (q.type === "single" || q.type === "multiple")
    return (q.options ?? [])
      .map(
        (o) =>
          `<label data-scope="questionnaire" data-part="option"${(q.type === "multiple" ? questionIncludes(answer, o.value) : answer === o.value) ? ' data-selected="true"' : ""}><input data-question-control="choice" data-key="${e(o.value)}" type="${q.type === "multiple" ? "checkbox" : "radio"}" name="${e(q.id)}" value="${e(o.value)}" ${common}${o.disabled ? " disabled" : ""}${(q.type === "multiple" ? questionIncludes(answer, o.value) : answer === o.value) ? " checked" : ""}><span>${e(o.label)}</span></label>`,
      )
      .join("");
  if (q.type === "number" || q.type === "date")
    return `<input data-question-control="value" data-part="answer" name="${e(q.id)}" type="${q.type}" aria-label="${e(q.label)}" value="${e(String(answer))}" ${common}${q.min !== undefined ? ` min="${e(String(q.min))}"` : ""}${q.max !== undefined ? ` max="${e(String(q.max))}"` : ""}${q.type === "number" ? ` step="${q.step ?? "any"}"` : ""}>`;
  if (q.type === "select")
    return `<select data-question-control="value" data-part="answer" name="${e(q.id)}" aria-label="${e(q.label)}" ${common}><option value="">${e(q.placeholder ?? "Choose an option")}</option>${(q.options ?? []).map((o) => `<option value="${e(o.value)}"${answer === o.value ? " selected" : ""}${o.disabled ? " disabled" : ""}>${e(o.label)}</option>`).join("")}</select>`;
  if (q.type === "matrix") {
    const map = matrixAnswers(answer);
    return `<div data-part="matrix">${(q.rows ?? [])
      .map((row) => {
        const entry = map[row.id],
          selected = (key: string) =>
            q.multiple
              ? Array.isArray(entry) && entry.includes(key)
              : entry === key;
        const rowInvalid =
          invalid &&
          !row.disabled &&
          (q.multiple
            ? !!selectionError(q, Array.isArray(entry) ? entry : [], {})
            : !!q.required && !entry);
        const attributes = `aria-describedby="${e(descriptionId)}" aria-invalid="${rowInvalid}"${q.multiple ? "" : ` aria-required="${!!q.required}"`}`;
        return `<fieldset data-part="matrix-row" data-row="${e(row.id)}" aria-invalid="${rowInvalid}"${row.disabled ? " disabled" : ""}><legend>${e(row.label)}${q.multiple && q.required && !row.disabled ? '<span aria-hidden="true"> *</span>' : ""}</legend>${(q.multiple ? (q.options ?? []) : options).map((o) => `<label data-scope="questionnaire" data-part="option"${selected(o.value) ? ' data-selected="true"' : ""}><input data-question-control="matrix" data-key="${e(o.value)}" data-row="${e(row.id)}" type="${q.multiple ? "checkbox" : "radio"}" name="${e(q.id)}[${e(row.id)}]" value="${e(o.value)}" ${attributes}${selected(o.value) ? " checked" : ""}${o.disabled ? " disabled" : ""}><span>${e(o.label)}</span></label>`).join("")}</fieldset>`;
      })
      .join("")}</div>`;
  }
  if (q.type === "ranking") {
    const description = descriptionId.split(/\s+/)[0];
    const instructions = description + "-rank-instructions";
    return `<p data-part="rank-instructions" id="${e(instructions)}">${e(q.rankingLabels?.instructions ?? "Press Space to pick up, use arrow keys to move, Enter to drop, Escape to cancel.")}</p><ol data-part="ranking">${questionStrings(
      answer,
    )
      .map((key, index, order) => {
        const label = options.find((o) => o.value === key)?.label ?? key;
        return `<li data-part="rank-row" data-key="${e(key)}"><button type="button" data-part="rank-handle" data-question-control="rank-drag" data-key="${e(key)}" aria-label="${e((q.rankingLabels?.handle ?? "Reorder") + ": " + label)}" aria-describedby="${e(descriptionId)} ${e(instructions)}" aria-pressed="false">${decorativeIconMarkup(GripVertical, e)}</button><span>${e(label)}</span><input type="hidden" name="${e(q.id)}" value="${e(key)}"><div data-part="rank-actions">${[-1, 1].map((direction) => `<button type="button" data-question-control="rank" data-key="${e(key)}" data-direction="${direction}" aria-label="${e((direction < 0 ? (q.moveUpLabel ?? "Move up") : (q.moveDownLabel ?? "Move down")) + ": " + label)}"${index + direction < 0 || index + direction >= order.length ? " disabled" : ""}>${e(direction < 0 ? (q.moveUpLabel ?? "Move up") : (q.moveDownLabel ?? "Move down"))}</button>`).join("")}</div></li>`;
      })
      .join(
        "",
      )}</ol><p data-part="rank-status" aria-live="polite" aria-atomic="true"></p>`;
  }
  return "";
}
function restoreQuestionControl(
  root: HTMLElement,
  q: Question,
  value: QuestionnaireValue,
) {
  if (q.type === "group") return;
  const answer = questionnaireValue([q], value)[q.id];
  for (const input of Array.from(
    root.querySelectorAll<HTMLInputElement | HTMLSelectElement>(
      "[data-question-control]",
    ),
  )) {
    if (input.dataset.questionControl === "value")
      input.setAttribute(
        "aria-invalid",
        root.querySelector('[data-part="error"]')?.textContent?.trim()
          ? "true"
          : "false",
      );
    if (
      input.dataset.questionControl === "value" &&
      typeof answer === "string" &&
      input.value !== answer
    )
      input.value = answer;
    if (
      input instanceof HTMLInputElement &&
      input.dataset.questionControl === "matrix"
    ) {
      const entry = matrixAnswers(answer)[input.dataset.row ?? ""];
      input.checked = q.multiple
        ? Array.isArray(entry) && entry.includes(input.value)
        : entry === input.value;
      input.closest("label")?.toggleAttribute("data-selected", input.checked);
      if (input.checked)
        input.closest("label")?.setAttribute("data-selected", "true");
    }
  }
}
/** 只委托新增题型；捕获被替换的原生控件，恢复其逻辑焦点而不抢外部焦点。 */
export function mountQuestionControls(
  root: HTMLElement,
  get: () => {
    question?: Question;
    value: QuestionnaireValue;
    blocked: boolean;
  },
  change: (value: QuestionnaireValue) => void,
  groups = true,
) {
  const cleanupGroups = groups
    ? mountQuestionGroups(root, get, change)
    : () => {};
  const cleanupRanking = mountQuestionRanking(root, get, change);
  let disposed = false;
  let focus:
    | {
        id: string;
        part: string;
        key: string;
        row: string;
        direction: string;
        start: number | null;
        end: number | null;
        node: HTMLElement;
      }
    | undefined;
  const capture = (node: HTMLElement) => {
    const q = get().question;
    if (!q || q.type === "group" || !node.dataset.questionControl) return;
    focus = {
      id: q.id,
      part: node.dataset.questionControl,
      key: node.dataset.key ?? "",
      row: node.dataset.row ?? "",
      direction: node.dataset.direction ?? "",
      start:
        node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement
          ? node.selectionStart
          : null,
      end:
        node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement
          ? node.selectionEnd
          : null,
      node,
    };
  };
  const input = (event: Event) => {
    const node = event.target;
    if (
      !(
        node instanceof HTMLInputElement ||
        node instanceof HTMLSelectElement ||
        node instanceof HTMLTextAreaElement
      ) ||
      !node.dataset.questionControl
    )
      return;
    const { question: q, value, blocked } = get();
    if (
      !q ||
      q.type === "group" ||
      blocked ||
      node.disabled ||
      node.closest(":disabled")
    )
      return;
    capture(node);
    if (
      node.dataset.questionControl === "choice" &&
      event.type === "change" &&
      node instanceof HTMLInputElement
    )
      change(toggleQuestionAnswer(value, q, node.value, node.checked));
    if (node.dataset.questionControl === "value" && event.type === "input")
      change({ ...value, [q.id]: node.value });
    if (
      node.dataset.questionControl === "matrix" &&
      event.type === "change" &&
      node instanceof HTMLInputElement &&
      (q.multiple || node.checked)
    ) {
      if (
        !(q.rows ?? []).some(
          (row) => row.id === node.dataset.row && !row.disabled,
        ) ||
        !(q.options ?? []).some(
          (option) => option.value === node.value && !option.disabled,
        )
      )
        return;
      const map = matrixAnswers(questionnaireValue([q], value)[q.id]),
        entry = map[node.dataset.row!];
      const next = q.multiple
        ? node.checked
          ? [...(Array.isArray(entry) ? entry : []), node.value]
          : (Array.isArray(entry) ? entry : []).filter(
              (key) => key !== node.value,
            )
        : node.value;
      change({
        ...value,
        ...questionnaireValue([q], {
          [q.id]: { ...map, [node.dataset.row!]: next },
        }),
      });
    }
  };
  const click = (event: Event) => {
    const node = event.target;
    if (!(node instanceof HTMLElement)) return;
    const button = node.closest<HTMLButtonElement>(
      'button[data-question-control="rank"]',
    );
    const { question: q, value, blocked } = get();
    if (
      !button ||
      !q ||
      q.type === "group" ||
      blocked ||
      button.disabled ||
      button.closest(":disabled")
    )
      return;
    const answer = questionnaireValue([q], value)[q.id];
    if (!Array.isArray(answer)) return;
    const order = questionStrings(answer),
      from = order.indexOf(button.dataset.key!),
      to = from + Number(button.dataset.direction);
    if (from < 0 || to < 0 || to >= order.length) return;
    capture(button);
    [order[from], order[to]] = [order[to], order[from]];
    change({ ...value, [q.id]: order });
  };
  const focusin = (event: Event) => {
    if (
      event.target instanceof HTMLElement &&
      root.contains(event.target) &&
      event.target.dataset.questionControl
    )
      capture(event.target);
    else focus = undefined;
  };
  const pointer = (event: Event) => {
    if (event.target instanceof Node && !root.contains(event.target))
      focus = undefined;
  };
  const observer = new MutationObserver(() => {
    const { question, value } = get();
    if (question) restoreQuestionControl(root, question, value);
    if (
      !focus ||
      disposed ||
      focus.node.isConnected ||
      get().question?.id !== focus.id ||
      get().blocked ||
      root.ownerDocument.activeElement !== root.ownerDocument.body
    )
      return;
    const descriptor = focus;
    let node = Array.from(
      root.querySelectorAll<HTMLElement>("[data-question-control]"),
    ).find(
      (n) =>
        n.dataset.questionControl === descriptor.part &&
        (n.dataset.key ?? "") === descriptor.key &&
        (n.dataset.row ?? "") === descriptor.row &&
        (n.dataset.direction ?? "") === descriptor.direction,
    );
    if (node?.matches(":disabled") && descriptor.part === "rank")
      node = Array.from(
        root.querySelectorAll<HTMLElement>('[data-question-control="rank"]'),
      ).find(
        (n) => n.dataset.key === descriptor.key && !n.matches(":disabled"),
      );
    if (!node || node.matches(":disabled")) return;
    node.focus();
    if (
      (node instanceof HTMLInputElement ||
        node instanceof HTMLTextAreaElement) &&
      descriptor.start !== null
    )
      node.setSelectionRange(descriptor.start, descriptor.end);
  });
  observer.observe(root, {
    childList: true,
    subtree: true,
    characterData: true,
  });
  root.addEventListener("input", input);
  root.addEventListener("change", input);
  root.addEventListener("click", click);
  root.ownerDocument.addEventListener("focusin", focusin);
  root.ownerDocument.addEventListener("pointerdown", pointer);
  return () => {
    disposed = true;
    cleanupGroups();
    cleanupRanking();
    observer.disconnect();
    root.removeEventListener("input", input);
    root.removeEventListener("change", input);
    root.removeEventListener("click", click);
    root.ownerDocument.removeEventListener("focusin", focusin);
    root.ownerDocument.removeEventListener("pointerdown", pointer);
    focus = undefined;
  };
}

/** 标量控件保留原生节点与编辑中的光标/日期段；值由生命周期同步而非 HTML 重建。 */
export function createQuestionControlRenderer() {
  let signature = "",
    html = "";
  return (
    q: Question,
    value: QuestionnaireValue,
    descriptionId: string,
    invalid: boolean,
    errors: Record<string, string> = {},
    labels: Pick<QuestionnaireOptions, "requiredLabel" | "invalidLabel"> = {},
  ) => {
    if (!["number", "date", "select", "group"].includes(q.type))
      return renderQuestionControl(q, value, descriptionId, invalid);
    const next = JSON.stringify([
      q,
      descriptionId,
      q.type === "group"
        ? [questionGroupShape(q, value), invalid, errors, labels]
        : undefined,
    ]);
    if (signature !== next) {
      signature = next;
      html =
        q.type === "group"
          ? renderQuestionGroup(
              q,
              questionnaireValue([q], value),
              descriptionId,
              invalid,
              [q.id],
              errors,
              labels,
            )
          : renderQuestionControl(q, value, descriptionId, invalid);
    }
    return html;
  };
}
