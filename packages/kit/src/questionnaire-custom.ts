import {
  questionnaireValue,
  questionnaireVisibleQuestions,
  questionnaireFormEntries,
  questionGroups,
  questionError,
  renderQuestionControl,
  type Question,
  type QuestionAnswer,
  type QuestionnaireValue,
  type QuestionnaireOptions,
} from "./questionnaire";
import { updateQuestionPath, nativeQuestionName } from "./questionnaire-groups";

const escapeHTML = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export interface QuestionnaireCustomControl {
  element: HTMLElement;
  /** 将控件内部状态恢复为已接受答案；由契约抑制同步过程中产生的回调。 */
  restore?: (answer: QuestionAnswer) => void;
  focus?: () => void;
  dispose?: () => void;
}
export interface QuestionnaireCustomContext {
  readonly question: Question;
  readonly answer: QuestionAnswer;
  /** 所属实例的冻结局部答案；不暴露其他实例的可变数据。 */
  readonly value: Readonly<QuestionnaireValue>;
  readonly path: readonly string[];
  readonly disabled: boolean;
  readonly pending: boolean;
  readonly invalid: boolean;
  readonly error: string;
  readonly controlId: string;
  readonly labelId: string;
  readonly descriptionId: string;
  readonly errorId: string;
  readonly signal: AbortSignal;
  onAnswerChange: (answer: QuestionAnswer) => void;
  registerControl: (control: QuestionnaireCustomControl) => () => void;
}
export interface QuestionnaireCustomState {
  question?: Question;
  value: QuestionnaireValue;
  disabled: boolean;
  pending: boolean;
  showError: boolean;
  errors: Record<string, string>;
  labels: Pick<QuestionnaireOptions, "requiredLabel" | "invalidLabel">;
  renderers: Readonly<Record<string, object>>;
}
function freezeValue(value: QuestionnaireValue): Readonly<QuestionnaireValue> {
  return Object.freeze(
    Object.fromEntries(
      Object.entries(value).map(([key, answer]) => {
        if (typeof answer === "string") return [key, answer];
        if (Array.isArray(answer))
          return [
            key,
            Object.freeze(
              answer.map((item) =>
                typeof item === "string"
                  ? item
                  : Object.freeze({
                      id: item.id,
                      value: freezeValue(item.value),
                    }),
              ),
            ),
          ];
        return [
          key,
          Object.freeze(
            Object.fromEntries(
              Object.entries(answer).map(([row, item]) => [
                row,
                typeof item === "string" ? item : Object.freeze([...item]),
              ]),
            ),
          ),
        ];
      }),
    ),
  );
}
/** 不在 SSR 注册 DOM；旧路径/类型、禁用与卸载后的回调不会再修改答案。 */
export function createQuestionnaireCustomRegistry(
  get: () => QuestionnaireCustomState,
  change: (value: QuestionnaireValue) => void,
) {
  type Entry = {
    path: readonly string[];
    kind: string;
    shape: string;
    renderer: object;
    disabled: boolean;
    controller: AbortController;
    context: QuestionnaireCustomContext;
    control?: QuestionnaireCustomControl;
  };
  const entries = new Map<string, Entry>(),
    retired = new Set<Entry>();
  const controlListeners = new Set<() => void>();
  let root: HTMLElement | undefined,
    active = false,
    restoring = false,
    frame = 0,
    mountEpoch = 0;
  const local = (path: readonly string[]) => {
    const state = get();
    if (!state.question) return;
    let q = state.question,
      value = state.value;
    if (path[0] !== q.id) return;
    for (let i = 1; i < path.length; i += 2) {
      if (q.type !== "group") return;
      const instance = questionGroups(value[q.id]).find(
        (item) => item.id === path[i],
      );
      if (!instance) return;
      const child = questionnaireVisibleQuestions(
        q.questions ?? [],
        instance.value,
      ).find((item) => item.id === path[i + 1]);
      if (!child) return;
      q = child;
      value = instance.value;
    }
    return { question: q, value };
  };
  const valid = (entry: Entry) =>
    entries.get(JSON.stringify(entry.path)) === entry &&
    local(entry.path)?.question.type === "custom" &&
    local(entry.path)?.question.customKind === entry.kind &&
    (local(entry.path)?.question.answerKind ?? "string") === entry.shape &&
    get().renderers[entry.kind] === entry.renderer &&
    get().disabled === entry.disabled;
  const retire = (entry: Entry) => {
    entry.controller.abort();
    const control = entry.control;
    entry.control = undefined;
    control?.dispose?.();
  };
  const restore = () => {
    if (!active || !root?.isConnected) return;
    restoring = true;
    try {
      for (const entry of entries.values()) {
        const current = local(entry.path);
        if (current && valid(entry) && entry.control?.element.isConnected)
          entry.control.restore?.(current.value[current.question.id]);
      }
    } finally {
      restoring = false;
    }
  };
  return {
    context(path: readonly string[], base: string): QuestionnaireCustomContext {
      const key = JSON.stringify(path),
        current = local(path);
      if (!current || current.question.type !== "custom")
        throw Error(
          "Questionnaire custom renderer requires a visible custom question",
        );
      const kind = current.question.customKind!;
      let entry = entries.get(key);
      const renderer = get().renderers[kind];
      if (!renderer)
        throw Error(
          `Questionnaire requires a renderer for custom kind: ${kind}`,
        );
      if (
        entry?.kind === kind &&
        entry.shape === (current.question.answerKind ?? "string") &&
        entry.renderer === renderer &&
        entry.disabled === get().disabled
      )
        return entry.context;
      if (entry) retired.add(entry);
      const initial = current;
      let answerController: AbortController | undefined;
      let answerChange:
        QuestionnaireCustomContext["onAnswerChange"] | undefined;
      let registrationController: AbortController | undefined;
      let registration:
        QuestionnaireCustomContext["registerControl"] | undefined;
      const context: QuestionnaireCustomContext = {
        path: Object.freeze([...path]),
        get question() {
          return local(path)?.question ?? initial.question;
        },
        get answer() {
          const x = local(path) ?? initial;
          return freezeValue(x.value)[x.question.id];
        },
        get value() {
          return freezeValue((local(path) ?? initial).value);
        },
        get disabled() {
          return get().disabled;
        },
        get pending() {
          return get().pending;
        },
        get error() {
          const x = local(path) ?? initial,
            s = get();
          return s.showError
            ? (s.errors[path.length === 1 ? path[0] : key] ??
                questionError(x.question, x.value, s.labels))
            : "";
        },
        get invalid() {
          return !!context.error;
        },
        controlId: base + "-control",
        labelId: base + "-label",
        descriptionId: base + "-description",
        errorId: base + "-error",
        get signal() {
          return owned.controller.signal;
        },
        get onAnswerChange() {
          const controller = owned.controller;
          if (answerController !== controller) {
            answerController = controller;
            answerChange = (answer) => {
              if (
                !active ||
                restoring ||
                !valid(owned) ||
                get().disabled ||
                controller.signal.aborted ||
                controller !== owned.controller
              )
                return;
              const x = local(path),
                s = get();
              if (!x || !s.question) return;
              const next = questionnaireValue([x.question], {
                ...x.value,
                [x.question.id]: answer,
              });
              change(updateQuestionPath(s.question, s.value, path, next));
              const win = root?.ownerDocument.defaultView;
              if (win) {
                win.cancelAnimationFrame(frame);
                frame = win.requestAnimationFrame(() => {
                  frame = 0;
                  restore();
                });
              }
            };
          }
          return answerChange!;
        },
        get registerControl() {
          const controller = owned.controller;
          if (registrationController !== controller) {
            registrationController = controller;
            registration = (control) => {
              if (
                controller.signal.aborted ||
                controller !== owned.controller ||
                !valid(owned) ||
                (root && !root.contains(control.element))
              )
                return () => {};
              const previous = owned.control;
              owned.control = control;
              if (previous !== control) previous?.dispose?.();
              restore();
              queueMicrotask(() => {
                if (
                  active &&
                  root?.isConnected &&
                  root.contains(control.element) &&
                  owned.control === control &&
                  valid(owned)
                )
                  for (const listener of controlListeners) listener();
              });
              return () => {
                if (owned.control === control) {
                  owned.control = undefined;
                  control.dispose?.();
                }
              };
            };
          }
          return registration!;
        },
      };
      const owned: Entry = {
        path: context.path,
        kind,
        shape: current.question.answerKind ?? "string",
        renderer,
        disabled: get().disabled,
        controller: new AbortController(),
        context,
      };
      entry = owned;
      entries.set(key, entry);
      return context;
    },
    mount(element: HTMLElement) {
      const epoch = ++mountEpoch;
      if (active) {
        root?.ownerDocument.defaultView?.cancelAnimationFrame(frame);
        frame = 0;
        for (const entry of [...entries.values(), ...retired]) retire(entry);
        retired.clear();
      }
      root = element;
      active = true;
      for (const entry of entries.values())
        if (entry.controller.signal.aborted)
          entry.controller = new AbortController();
      return () => {
        if (epoch !== mountEpoch || !active) return;
        active = false;
        root?.ownerDocument.defaultView?.cancelAnimationFrame(frame);
        frame = 0;
        for (const entry of [...entries.values(), ...retired]) retire(entry);
        retired.clear();
        root = undefined;
      };
    },
    sync() {
      if (!active) return;
      for (const entry of retired) retire(entry);
      retired.clear();
      for (const [key, entry] of entries) {
        if (!valid(entry)) {
          retire(entry);
          entries.delete(key);
        } else if (get().disabled) {
          entry.controller.abort();
        } else if (entry.controller.signal.aborted)
          entry.controller = new AbortController();
      }
      restore();
    },
    subscribeControl(listener: () => void) {
      controlListeners.add(listener);
      return () => {
        controlListeners.delete(listener);
      };
    },
    focus(element: HTMLElement) {
      for (const entry of entries.values())
        if (
          entry.control &&
          element.contains(entry.control.element) &&
          valid(entry)
        ) {
          if (entry.control.focus) entry.control.focus();
          else
            (
              entry.control.element.querySelector<HTMLElement>(
                '[tabindex="0"],input:not([type=hidden]):not(:disabled),textarea:not(:disabled),select:not(:disabled),button:not(:disabled)',
              ) ?? entry.control.element
            ).focus();
          return true;
        }
      return false;
    },
  };
}
export type QuestionnaireRenderNode =
  | {
      kind: "element";
      key: string;
      tag: "div" | "fieldset" | "legend" | "p" | "button" | "input";
      attrs: Record<string, string | number | boolean | undefined>;
      children: readonly QuestionnaireRenderNode[];
    }
  | { kind: "text"; key: string; text: string }
  | { kind: "html"; key: string; html: string }
  | { kind: "custom"; key: string; context: QuestionnaireCustomContext };
export function questionHasCustom(q?: Question): boolean {
  return (
    !!q &&
    (q.type === "custom" ||
      (q.type === "group" && (q.questions ?? []).some(questionHasCustom)))
  );
}
/** 共享语义树只描述数据与部件，原生框架负责渲染自定义控件和 SSR。 */
export function createQuestionnaireTreeRenderer() {
  const cache = new Map<string, { signature: string; html: string }>();
  return function render(
    q: Question,
    value: QuestionnaireValue,
    base: string,
    invalid: boolean,
    errors: Record<string, string>,
    labels: Pick<QuestionnaireOptions, "requiredLabel" | "invalidLabel">,
    registry: ReturnType<typeof createQuestionnaireCustomRegistry>,
    path: readonly string[] = [q.id],
  ): QuestionnaireRenderNode {
    if (path.length === 1) {
      const available = new Set<string>();
      const collect = (
        question: Question,
        local: QuestionnaireValue,
        at: readonly string[],
      ) => {
        available.add(JSON.stringify(at));
        if (question.type === "group")
          for (const instance of questionGroups(local[question.id]))
            for (const child of questionnaireVisibleQuestions(
              question.questions ?? [],
              instance.value,
            ))
              collect(child, instance.value, [...at, instance.id, child.id]);
      };
      collect(q, value, path);
      for (const cached of cache.keys())
        if (!available.has(cached)) cache.delete(cached);
    }
    const key = JSON.stringify(path);
    const text = (
      suffix: string,
      content: string,
    ): QuestionnaireRenderNode => ({
      kind: "text",
      key: key + suffix,
      text: content,
    });
    const element = (
      suffix: string,
      tag: Extract<QuestionnaireRenderNode, { kind: "element" }>["tag"],
      attrs: Record<string, string | number | boolean | undefined>,
      children: readonly QuestionnaireRenderNode[] = [],
    ): QuestionnaireRenderNode => ({
      kind: "element",
      key: key + suffix,
      tag,
      attrs,
      children,
    });
    if (q.type === "custom") {
      const context = registry.context(path, base);
      const fields = questionnaireFormEntries({ [q.id]: value[q.id] }).map(
        ([name, answer], index) =>
          element("hidden" + index, "input", {
            type: "hidden",
            name: nativeQuestionName(path) + name.slice(q.id.length),
            value: answer,
            disabled: context.disabled,
          }),
      );
      return element(
        "custom-root",
        "div",
        { "data-question-custom": key, "data-part": "custom-answer" },
        [{ kind: "custom", key, context }, ...fields],
      );
    }
    if (q.type !== "group") {
      const signature = JSON.stringify([
          q,
          base,
          invalid,
          q.type === "ranking" ? value[q.id] : undefined,
        ]),
        previous = cache.get(key);
      const html =
        previous?.signature === signature
          ? previous.html
          : renderQuestionControl(
              q,
              value,
              base + "-description " + base + "-error",
              invalid,
            ).replace(
              /name="([^\"]*)"/g,
              (_, name: string) =>
                `name="${escapeHTML(nativeQuestionName(path))}${name.slice(escapeHTML(q.id).length)}"`,
            );
      cache.set(key, { signature, html });
      return { kind: "html", key, html };
    }
    const groups = questionGroups(value[q.id]),
      minimum = Math.max(q.required ? 1 : 0, q.minGroups ?? 0);
    const instances = groups.map((instance, index) => {
      const children = questionnaireVisibleQuestions(
        q.questions ?? [],
        instance.value,
      ).map((child) => {
        const childPath = [...path, instance.id, child.id],
          childKey = JSON.stringify(childPath),
          id = base + "-" + encodeURIComponent(childKey),
          error =
            errors[childKey] ??
            (invalid ? questionError(child, instance.value, labels) : "");
        return {
          kind: "element",
          key: childKey,
          tag: "fieldset",
          attrs: {
            "data-scope": "questionnaire",
            "data-part": "group-question",
            "data-question-type": child.type,
            "data-question-path": childKey,
            "aria-invalid": !!error,
            tabindex: -1,
          },
          children: [
            {
              kind: "element",
              key: childKey + "label",
              tag: "legend",
              attrs: { id: id + "-label" },
              children: [
                {
                  kind: "text",
                  key: childKey + "text",
                  text: child.label + (child.required ? " *" : ""),
                },
              ],
            },
            {
              kind: "element",
              key: childKey + "desc",
              tag: "p",
              attrs: {
                "data-scope": "questionnaire",
                "data-part": "description",
                id: id + "-description",
              },
              children: [
                {
                  kind: "text",
                  key: childKey + "desc-text",
                  text: child.description ?? "",
                },
              ],
            },
            render(
              child,
              instance.value,
              id,
              !!error,
              errors,
              labels,
              registry,
              childPath,
            ),
            {
              kind: "element",
              key: childKey + "error",
              tag: "p",
              attrs: {
                "data-scope": "questionnaire",
                "data-part": "error",
                id: id + "-error",
                role: error ? "alert" : undefined,
              },
              children: [
                { kind: "text", key: childKey + "error-text", text: error },
              ],
            },
          ],
        } satisfies QuestionnaireRenderNode;
      });
      return element(
        "instance:" + JSON.stringify(instance.id),
        "fieldset",
        { "data-part": "group-instance", "data-group-instance": instance.id },
        [
          element(instance.id + "legend", "legend", {}, [
            text(
              instance.id + "label",
              (q.groupLabels?.instance ?? "Group") + " " + (index + 1),
            ),
          ]),
          ...children,
          element(
            instance.id + "remove",
            "button",
            {
              type: "button",
              "data-question-group": "remove",
              "data-group-path": key,
              "data-instance-id": instance.id,
              disabled: groups.length <= minimum,
            },
            [
              text(
                instance.id + "remove-label",
                (q.groupLabels?.remove ?? "Remove group") + " " + (index + 1),
              ),
            ],
          ),
        ],
      );
    });
    return element(
      "groups",
      "div",
      {
        "data-part": "groups",
        "data-group-path": key,
        "data-group-bounds-invalid":
          groups.length < minimum || groups.length > (q.maxGroups ?? Infinity),
      },
      [
        ...instances,
        element(
          "add",
          "button",
          {
            type: "button",
            "data-question-group": "add",
            "data-group-path": key,
            disabled: groups.length >= (q.maxGroups ?? Infinity),
          },
          [text("add-label", q.groupLabels?.add ?? "Add group")],
        ),
      ],
    );
  };
}
