import {
  questionnaireValue,
  questionnaireVisibleQuestions,
  questionGroups,
  questionError,
  renderQuestionControl,
  mountQuestionControls,
  restoreQuestionAnswers,
  type Question,
  type QuestionnaireValue,
  type QuestionnaireOptions,
} from "./questionnaire";
const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
export function resolveQuestionPath(
  question: Question,
  value: QuestionnaireValue,
  path: readonly string[],
) {
  if (path[0] !== question.id) return;
  let q = question,
    local = value;
  for (let index = 1; index < path.length; index += 2) {
    if (q.type !== "group") return;
    const instance = questionGroups(local[q.id]).find(
      (item) => item.id === path[index],
    );
    const child = q.questions?.find((item) => item.id === path[index + 1]);
    if (!instance || !child) return;
    q = child;
    local = instance.value;
  }
  return { question: q, value: local };
}
export function restoreQuestionGroups(
  root: HTMLElement,
  question: Question,
  value: QuestionnaireValue,
) {
  for (const field of Array.from(
    root.querySelectorAll<HTMLElement>('[data-part="group-question"]'),
  )) {
    let path: unknown;
    try {
      path = JSON.parse(field.dataset.questionPath ?? "null");
    } catch {
      continue;
    }
    if (!Array.isArray(path) || !path.every((item) => typeof item === "string"))
      continue;
    const local = resolveQuestionPath(
      question,
      value,
      path.filter((item): item is string => typeof item === "string"),
    );
    if (local && local.question.type !== "group")
      restoreQuestionAnswers(field, local.question, local.value);
  }
}
export function updateQuestionPath(
  question: Question,
  value: QuestionnaireValue,
  path: readonly string[],
  next: QuestionnaireValue,
): QuestionnaireValue {
  if (path.length === 1) return { ...value, [question.id]: next[question.id] };
  const id = path[1],
    child = question.questions?.find((item) => item.id === path[2]);
  if (!child) return value;
  return {
    ...value,
    [question.id]: questionGroups(value[question.id]).map((instance) =>
      instance.id === id
        ? {
            ...instance,
            value: updateQuestionPath(
              child,
              instance.value,
              path.slice(2),
              next,
            ),
          }
        : instance,
    ),
  };
}
export function nativeQuestionName(path: readonly string[]) {
  return (
    path[0] +
    path
      .slice(1)
      .map((part) => `[${part}]`)
      .join("")
  );
}
export function questionGroupShape(
  q: Question,
  value: QuestionnaireValue,
): unknown {
  return q.type === "group"
    ? questionGroups(value[q.id]).map((instance) => [
        instance.id,
        questionnaireVisibleQuestions(q.questions ?? [], instance.value).map(
          (child) => [child.id, questionGroupShape(child, instance.value)],
        ),
      ])
    : q.type === "ranking"
      ? value[q.id]
      : undefined;
}
export function renderQuestionGroup(
  q: Question,
  value: QuestionnaireValue,
  descriptionId: string,
  invalid: boolean,
  path: readonly string[] = [q.id],
  errors: Record<string, string> = {},
  labels: Pick<QuestionnaireOptions, "requiredLabel" | "invalidLabel"> = {},
): string {
  const groups = questionGroups(value[q.id]),
    base = descriptionId.split(/\s+/)[0],
    encoded = escape(JSON.stringify(path));
  return `<div data-part="groups" data-group-path="${encoded}" data-group-bounds-invalid="${groups.length < Math.max(q.required ? 1 : 0, q.minGroups ?? 0) || groups.length > (q.maxGroups ?? Infinity)}">${groups
    .map((instance, index) => {
      const instancePath = [...path, instance.id];
      return `<fieldset data-part="group-instance" data-group-instance="${escape(instance.id)}"><legend>${escape(q.groupLabels?.instance ?? "Group")} ${index + 1}</legend><div data-part="question-content">${questionnaireVisibleQuestions(
        q.questions ?? [],
        instance.value,
      )
        .map((child) => {
          const childPath = [...instancePath, child.id],
            key = JSON.stringify(childPath),
            id = base + "-" + encodeURIComponent(key),
            error =
              errors[key] ??
              (invalid ? questionError(child, instance.value, labels) : "");
          const content =
            child.type === "group"
              ? renderQuestionGroup(
                  child,
                  instance.value,
                  id + "-description " + id + "-error",
                  !!error,
                  childPath,
                  errors,
                  labels,
                )
              : renderQuestionControl(
                  child,
                  instance.value,
                  id + "-description " + id + "-error",
                  !!error,
                ).replace(
                  /name="([^\"]*)"/g,
                  (_, name: string) =>
                    `name="${escape(nativeQuestionName(childPath))}${name.slice(escape(child.id).length)}"`,
                );
          return `<fieldset data-scope="questionnaire" data-part="group-question" data-question-type="${child.type}" data-question-path="${escape(key)}" aria-invalid="${!!error}" tabindex="-1"><legend>${escape(child.label)}${child.required ? ' <span aria-hidden="true">*</span>' : ""}</legend><div data-part="question-content"><p data-scope="questionnaire" data-part="description" id="${escape(id)}-description">${escape(child.description ?? "")}</p>${content}<p data-scope="questionnaire" data-part="error" id="${escape(id)}-error"${error ? ' role="alert"' : ""}>${escape(error)}</p></div></fieldset>`;
        })
        .join(
          "",
        )}<button type="button" data-question-group="remove" data-group-path="${encoded}" data-instance-id="${escape(instance.id)}"${groups.length <= Math.max(q.required ? 1 : 0, q.minGroups ?? 0) ? " disabled" : ""}>${escape(q.groupLabels?.remove ?? "Remove group")} ${index + 1}</button></div></fieldset>`;
    })
    .join(
      "",
    )}<button type="button" data-question-group="add" data-group-path="${encoded}"${groups.length >= (q.maxGroups ?? Infinity) ? " disabled" : ""}>${escape(q.groupLabels?.add ?? "Add group")}</button></div>`;
}
/** 每个叶题持有独立排序/控件生命周期；实例路径更新根答案，不依赖数组位置。 */
/** 内部注册焦点桥；业务渲染继续由各框架负责。 */
export type QuestionGroupFocus = {
  focus(element: HTMLElement): boolean;
  subscribeControl(listener: () => void): () => void;
};
export function mountQuestionGroups(
  root: HTMLElement,
  get: () => {
    question?: Question;
    value: QuestionnaireValue;
    blocked: boolean;
  },
  change: (value: QuestionnaireValue) => void,
  customFocus?: QuestionGroupFocus,
) {
  const win = root.ownerDocument.defaultView;
  if (!win) return () => {};
  let disposed = false,
    serial = 0;
  const used = new Set<string>(),
    controls = new Map<HTMLElement, () => void>();
  let focusIntent:
    | {
        path: readonly string[];
        groupPath: readonly string[];
        instanceId: string;
        operation: "add" | "remove";
        origin: Element | null;
        trigger: HTMLElement;
        accepted: boolean;
      }
    | undefined;
  let focusFrame = 0;
  let ownedFocus:
    | {
        node: HTMLElement;
        path: readonly string[];
        control: string;
        key: string;
        row: string;
        direction: string;
        start: number | null;
        end: number | null;
      }
    | undefined;
  const pathOf = (node: HTMLElement, attribute: string) => {
    try {
      const value: unknown = JSON.parse(node.getAttribute(attribute) ?? "null");
      return Array.isArray(value) &&
        value.every((item) => typeof item === "string")
        ? value.filter((item): item is string => typeof item === "string")
        : undefined;
    } catch {
      return;
    }
  };
  const remember = (event: Event) => {
    if (!(event.target instanceof win.Element)) return;
    if (focusIntent && event.type !== "focusin") focusIntent = undefined;
    if (
      focusIntent &&
      event.target !== root.ownerDocument.body &&
      event.target !== root.ownerDocument.documentElement &&
      event.target !== focusIntent.origin &&
      event.target !== focusIntent.trigger
    )
      focusIntent = undefined;
    const node = event.target.closest<HTMLElement>("[data-question-control]");
    const field = node?.closest<HTMLElement>('[data-part="group-question"]');
    const path = field && pathOf(field, "data-question-path");
    if (node && root.contains(node) && path) {
      const text =
        node instanceof win.HTMLInputElement ||
        node instanceof win.HTMLTextAreaElement;
      ownedFocus = {
        node,
        path,
        control: node.dataset.questionControl!,
        key: node.dataset.key ?? "",
        row: node.dataset.row ?? "",
        direction: node.dataset.direction ?? "",
        start: text ? node.selectionStart : null,
        end: text ? node.selectionEnd : null,
      };
    } else if (!(
      event.target === root.ownerDocument.body &&
      ownedFocus &&
      !ownedFocus.node.isConnected
    ))
      ownedFocus = undefined;
  };
  const sync = () => {
    if (disposed) return;
    for (const [node, dispose] of controls)
      if (!root.contains(node)) {
        dispose();
        controls.delete(node);
      }
    const current = get();
    if (!current.question) return;
    if (current.question.type === "group")
      restoreQuestionGroups(root, current.question, current.value);
    for (const field of Array.from(
      root.querySelectorAll<HTMLElement>('[data-part="group-question"]'),
    )) {
      const path = pathOf(field, "data-question-path");
      const resolved =
        path && resolveQuestionPath(current.question, current.value, path);
      if (
        !resolved ||
        resolved.question.type === "group" ||
        controls.has(field)
      )
        continue;
      controls.set(
        field,
        mountQuestionControls(
          field,
          () => {
            const latest = get(),
              local =
                latest.question &&
                resolveQuestionPath(latest.question, latest.value, path!);
            return {
              question: local?.question,
              value: local?.value ?? {},
              blocked: latest.blocked,
            };
          },
          (next) => {
            const latest = get();
            if (latest.question)
              change(
                updateQuestionPath(latest.question, latest.value, path!, next),
              );
          },
          false,
        ),
      );
    }
    for (const container of Array.from(
      root.querySelectorAll<HTMLElement>(
        '[data-part="groups"][data-group-path]',
      ),
    )) {
      const path = pathOf(container, "data-group-path"),
        resolved =
          path && resolveQuestionPath(current.question, current.value, path);
      if (resolved)
        for (const instance of questionGroups(
          resolved.value[resolved.question.id],
        ))
          used.add(instance.id);
    }
    if (focusIntent) {
      const intent = focusIntent;
      const group = resolveQuestionPath(
        current.question,
        current.value,
        intent.groupPath,
      );
      if (!group || group.question.type !== "group" || current.blocked)
        focusIntent = undefined;
      else {
        const exists = questionGroups(group.value[group.question.id]).some(
          (instance) => instance.id === intent.instanceId,
        );
        if (intent.accepted && (intent.operation === "add" ? !exists : exists))
          focusIntent = undefined;
        intent.accepted = intent.operation === "add" ? exists : !exists;
        const active = root.ownerDocument.activeElement;
        const ownsFocus =
          active === root.ownerDocument.body ||
          active === root.ownerDocument.documentElement ||
          active === intent.origin ||
          active === intent.trigger;
        if (!ownsFocus) focusIntent = undefined;
        else if (intent.accepted && focusIntent) {
          const fields = Array.from(
            root.querySelectorAll<HTMLElement>('[data-part="group-question"]'),
          );
          const target = fields.find(
            (node) => node.dataset.questionPath === JSON.stringify(intent.path),
          );
          const local = resolveQuestionPath(
            current.question,
            current.value,
            intent.path,
          );
          if (!local) focusIntent = undefined;
          else if (local.question.type === "custom") {
            // 延迟注册只完成仍拥有焦点的已接受操作，避免装饰按钮或隐形表单字段。
            if (target && customFocus?.focus(target)) {
              focusIntent = undefined;
              ownedFocus = undefined;
            }
          } else {
            const container = Array.from(
              root.querySelectorAll<HTMLElement>(
                '[data-part="groups"][data-group-path]',
              ),
            ).find(
              (node) => node.dataset.groupPath === JSON.stringify(intent.path),
            );
            const control =
              target?.querySelector<HTMLElement>(
                "input:not([type=hidden]):not(:disabled),textarea:not(:disabled),select:not(:disabled),button:not(:disabled)",
              ) ??
              container?.querySelector<HTMLElement>(
                '[data-question-group="add"]:not(:disabled)',
              );
            if (control) {
              focusIntent = undefined;
              ownedFocus = undefined;
              control.focus({ preventScroll: true });
            }
          }
        }
      }
    }
    // 叶题重绘会销毁旧生命周期；按实例路径恢复，避免相同题 id 的实例串位。
    if (
      ownedFocus &&
      !ownedFocus.node.isConnected &&
      root.ownerDocument.activeElement === root.ownerDocument.body &&
      !current.blocked
    ) {
      const saved = ownedFocus;
      const field = Array.from(
        root.querySelectorAll<HTMLElement>('[data-part="group-question"]'),
      ).find(
        (node) => node.dataset.questionPath === JSON.stringify(saved.path),
      );
      let node = Array.from(
        field?.querySelectorAll<HTMLElement>("[data-question-control]") ?? [],
      ).find(
        (node) =>
          node.dataset.questionControl === saved.control &&
          (node.dataset.key ?? "") === saved.key &&
          (node.dataset.row ?? "") === saved.row &&
          (node.dataset.direction ?? "") === saved.direction &&
          !node.matches(":disabled"),
      );
      if (!node && saved.control === "rank")
        node = Array.from(
          field?.querySelectorAll<HTMLElement>(
            '[data-question-control="rank"]',
          ) ?? [],
        ).find(
          (candidate) =>
            candidate.dataset.key === saved.key &&
            !candidate.matches(":disabled"),
        );
      if (node) {
        node.focus({ preventScroll: true });
        if (
          (node instanceof win.HTMLInputElement ||
            node instanceof win.HTMLTextAreaElement) &&
          saved.start !== null
        )
          node.setSelectionRange(saved.start, saved.end);
      } else ownedFocus = undefined;
    }
  };
  const firstPath = (
    question: Question,
    value: QuestionnaireValue,
    path: readonly string[],
  ): readonly string[] => {
    if (question.type !== "group") return path;
    const instance = questionGroups(value[question.id])[0];
    const first =
      instance &&
      questionnaireVisibleQuestions(
        question.questions ?? [],
        instance.value,
      )[0];
    return first
      ? firstPath(first, instance.value, [...path, instance.id, first.id])
      : path;
  };
  const click = (event: Event) => {
    if (!(event.target instanceof win.Element)) return;
    const button = event.target.closest<HTMLButtonElement>(
      "[data-question-group]",
    );
    if (
      !button ||
      !root.contains(button) ||
      button.disabled ||
      button.closest(":disabled")
    )
      return;
    const current = get(),
      path = pathOf(button, "data-group-path");
    const local =
      current.question &&
      path &&
      resolveQuestionPath(current.question, current.value, path);
    if (!local || local.question.type !== "group" || current.blocked) return;
    const q = local.question,
      groups = questionGroups(local.value[q.id]);
    let next = [...groups];
    let targetPath: readonly string[] = path!,
      instanceId: string;
    if (button.dataset.questionGroup === "add") {
      if (groups.length >= (q.maxGroups ?? Infinity)) return;
      let id: string;
      do {
        id = `group-${++serial}`;
      } while (used.has(id));
      used.add(id);
      next.push({ id, value: questionnaireValue(q.questions ?? [], {}) });
      const first = questionnaireVisibleQuestions(
        q.questions ?? [],
        next[next.length - 1].value,
      )[0];
      instanceId = id;
      targetPath = first
        ? firstPath(first, next[next.length - 1].value, [
            ...path!,
            id,
            first.id,
          ])
        : [...path!];
    } else {
      if (groups.length <= Math.max(q.required ? 1 : 0, q.minGroups ?? 0))
        return;
      const index = groups.findIndex(
        (instance) => instance.id === button.dataset.instanceId,
      );
      if (index < 0) return;
      instanceId = groups[index].id;
      next.splice(index, 1);
      const neighbour = next[Math.min(index, next.length - 1)],
        first =
          neighbour &&
          questionnaireVisibleQuestions(q.questions ?? [], neighbour.value)[0];
      targetPath = first
        ? firstPath(first, neighbour!.value, [
            ...path!,
            neighbour!.id,
            first.id,
          ])
        : [...path!];
    }
    focusIntent = {
      path: targetPath,
      groupPath: path!,
      instanceId,
      operation: button.dataset.questionGroup === "add" ? "add" : "remove",
      origin: root.ownerDocument.activeElement,
      trigger: button,
      accepted: false,
    };
    change(
      updateQuestionPath(current.question!, current.value, path!, {
        ...local.value,
        [q.id]: next,
      }),
    );
    queueMicrotask(sync);
    win.cancelAnimationFrame(focusFrame);
    focusFrame = win.requestAnimationFrame(() => {
      sync();
      if (focusIntent && !focusIntent.accepted) focusIntent = undefined;
    });
  };
  const outside = (event: Event) => {
    focusIntent = undefined;
    if (event.target instanceof win.Node && !root.contains(event.target)) {
      focusIntent = undefined;
      ownedFocus = undefined;
    }
  };
  const unsubscribeControl = customFocus?.subscribeControl(sync);
  const observer = new win.MutationObserver(sync);
  observer.observe(root, {
    childList: true,
    subtree: true,
    characterData: true,
  });
  root.addEventListener("click", click);
  root.addEventListener("input", remember, true);
  root.addEventListener("keydown", remember, true);
  root.ownerDocument.addEventListener("focusin", remember);
  root.ownerDocument.addEventListener("pointerdown", outside, true);
  sync();
  return () => {
    disposed = true;
    win.cancelAnimationFrame(focusFrame);
    observer.disconnect();
    unsubscribeControl?.();
    root.removeEventListener("click", click);
    root.removeEventListener("input", remember, true);
    root.removeEventListener("keydown", remember, true);
    root.ownerDocument.removeEventListener("focusin", remember);
    root.ownerDocument.removeEventListener("pointerdown", outside, true);
    for (const dispose of controls.values()) dispose();
    controls.clear();
    focusIntent = undefined;
    ownedFocus = undefined;
  };
}
