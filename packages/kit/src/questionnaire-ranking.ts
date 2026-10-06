import type { Question, QuestionnaireValue } from "./questionnaire";
import { questionnaireValue, questionStrings } from "./questionnaire";

/** 排序预览仅移动现有节点；放下后提交一次完整顺序，取消不发出答案。 */
export function mountQuestionRanking(
  root: HTMLElement,
  get: () => {
    question?: Question;
    value: QuestionnaireValue;
    blocked: boolean;
  },
  change: (value: QuestionnaireValue) => void,
) {
  const win = root.ownerDocument.defaultView;
  if (!win) return () => {};
  let disposed = false,
    frame = 0,
    scrollFrame = 0;
  type Session = {
    id: string;
    key: string;
    original: string[];
    preview: string[];
    pointer?: number;
    y: number;
  };
  let session: Session | undefined;
  let focusAllowed = false;
  const order = (): string[] => {
    const { question, value } = get();
    if (!question || question.type !== "ranking") return [];
    const answer = questionnaireValue([question], value)[question.id];
    return questionStrings(answer);
  };
  const rows = () =>
    Array.from(
      root.querySelectorAll<HTMLElement>('[data-part="rank-row"][data-key]'),
    );
  const handle = (key: string) =>
    Array.from(
      root.querySelectorAll<HTMLButtonElement>(
        '[data-question-control="rank-drag"]',
      ),
    ).find((node) => node.dataset.key === key);
  const paint = (keys: readonly string[]) => {
    const list = root.querySelector('[data-part="ranking"]');
    if (!list) return;
    const current = rows();
    if (current.map((row) => row.dataset.key).join("\0") !== keys.join("\0"))
      for (const key of keys) {
        const row = current.find((row) => row.dataset.key === key);
        if (row) list.append(row);
      }
    for (const [index, key] of keys.entries()) {
      const row = current.find((row) => row.dataset.key === key);
      for (const button of Array.from(
        row?.querySelectorAll<HTMLButtonElement>(
          '[data-question-control="rank"]',
        ) ?? [],
      )) {
        const target = index + Number(button.dataset.direction);
        const disabled = target < 0 || target >= keys.length;
        if (button.disabled !== disabled) button.disabled = disabled;
      }
    }
    for (const node of Array.from(
      root.querySelectorAll('[data-question-control="rank-drag"]'),
    )) {
      const pressed = String(node.getAttribute("data-key") === session?.key);
      if (node.getAttribute("aria-pressed") !== pressed)
        node.setAttribute("aria-pressed", pressed);
    }
  };
  const announce = (
    key: string,
    state: "pickedUp" | "moved" | "dropped" | "cancelled" | "rejected",
    keys: readonly string[],
  ) => {
    const q = get().question,
      node = root.querySelector('[data-part="rank-status"]');
    if (!q || !node) return;
    const label =
      q.options?.find((option) => option.value === key)?.label ?? key;
    const labels = {
      pickedUp: "Picked up",
      moved: "Moved",
      dropped: "Dropped",
      cancelled: "Cancelled",
      rejected: "Change rejected",
      ...q.rankingLabels,
    };
    const index = keys.indexOf(key);
    const text =
      index < 0
        ? `${label}: ${labels[state]}`
        : `${label}: ${index + 1} / ${keys.length}. ${labels[state]}`;
    if (node.textContent !== text) node.textContent = text;
  };
  const focus = (key: string) => {
    const active = root.ownerDocument.activeElement;
    if (
      root.contains(active) ||
      (focusAllowed && active === root.ownerDocument.body)
    )
      handle(key)?.focus({ preventScroll: true });
  };
  const same = (left: readonly string[], right: readonly string[]) =>
    left.length === right.length && left.every((key, i) => key === right[i]);
  const stopCapture = (previous: Session) => {
    win.cancelAnimationFrame(scrollFrame);
    scrollFrame = 0;
    if (
      previous.pointer !== undefined &&
      root.hasPointerCapture(previous.pointer)
    )
      root.releasePointerCapture(previous.pointer);
  };
  const cancel = (restoreFocus = false) => {
    const previous = session;
    session = undefined;
    if (!previous) return;
    stopCapture(previous);
    paint(order());
    if (get().question?.id === previous.id) {
      announce(previous.key, "cancelled", order());
      if (restoreFocus && !get().blocked) {
        const keys = order();
        const key = keys.includes(previous.key)
          ? previous.key
          : keys[
              Math.min(previous.original.indexOf(previous.key), keys.length - 1)
            ];
        if (key) focus(key);
      }
    }
  };
  const reconcile = () => {
    frame = 0;
    if (disposed) return;
    const q = get().question;
    if (
      session &&
      (get().blocked ||
        q?.id !== session.id ||
        !same(order(), session.original))
    )
      cancel(true);
    paint(session?.preview ?? order());
  };
  const schedule = () => {
    if (!frame && !disposed) frame = win.requestAnimationFrame(reconcile);
  };
  const start = (key: string, pointer?: number, y = 0) => {
    if (disposed || get().blocked || get().question?.type !== "ranking") return;
    cancel();
    const keys = order();
    if (!keys.includes(key)) return;
    session = {
      id: get().question!.id,
      key,
      original: keys,
      preview: [...keys],
      pointer,
      y,
    };
    focusAllowed = true;
    paint(keys);
    handle(key)?.focus({ preventScroll: true });
    announce(key, "pickedUp", keys);
  };
  const moveTo = (index: number) => {
    const current = session;
    if (!current) return;
    const from = current.preview.indexOf(current.key),
      target = Math.max(0, Math.min(current.preview.length - 1, index));
    if (from === target || from < 0) return;
    current.preview.splice(from, 1);
    current.preview.splice(target, 0, current.key);
    paint(current.preview);
    announce(current.key, "moved", current.preview);
    focus(current.key);
  };
  const drop = () => {
    const previous = session;
    if (!previous) return;
    if (
      get().blocked ||
      get().question?.id !== previous.id ||
      !same(order(), previous.original)
    ) {
      cancel();
      return;
    }
    session = undefined;
    stopCapture(previous);
    paint(previous.preview);
    if (!same(previous.original, previous.preview))
      change({ ...get().value, [previous.id]: [...previous.preview] });
    win.cancelAnimationFrame(frame);
    frame = win.requestAnimationFrame(() => {
      frame = 0;
      if (disposed || get().question?.id !== previous.id) return;
      const accepted = order();
      paint(accepted);
      focus(previous.key);
      announce(
        previous.key,
        same(accepted, previous.preview) ? "dropped" : "rejected",
        accepted,
      );
    });
  };
  const previewPointer = () => {
    const current = session;
    if (!current || current.pointer === undefined) return;
    const entries = rows().filter((row) => row.dataset.key !== current.key);
    if (!entries.length) return;
    let index = entries.findIndex((row) => {
      const rect = row.getBoundingClientRect();
      return current.y < rect.top + rect.height / 2;
    });
    if (index < 0) index = entries.length;
    moveTo(index);
  };
  const scrollTarget = () => {
    let node = root.parentElement;
    while (node) {
      if (
        /(auto|scroll)/.test(win.getComputedStyle(node).overflowY) &&
        node.scrollHeight > node.clientHeight
      )
        return node;
      node = node.parentElement;
    }
    return root.ownerDocument.scrollingElement;
  };
  const autoScroll = () => {
    scrollFrame = 0;
    const current = session;
    if (disposed || !current || current.pointer === undefined) return;
    if (get().blocked || get().question?.id !== current.id) {
      cancel();
      return;
    }
    const target = scrollTarget();
    if (target) {
      const rect =
        target === root.ownerDocument.scrollingElement
          ? { top: 0, bottom: win.innerHeight }
          : target.getBoundingClientRect();
      const delta =
        current.y < rect.top + 32 ? -12 : current.y > rect.bottom - 32 ? 12 : 0;
      if (delta) {
        target.scrollTop += delta;
        previewPointer();
      }
    }
    scrollFrame = win.requestAnimationFrame(autoScroll);
  };
  const down = (event: PointerEvent) => {
    const target = event.target;
    if (!(target instanceof win.Element) || event.button !== 0) return;
    const button = target.closest<HTMLButtonElement>(
      '[data-question-control="rank-drag"]',
    );
    if (!button || !root.contains(button) || button.matches(":disabled"))
      return;
    event.preventDefault();
    start(button.dataset.key!, event.pointerId, event.clientY);
    if (session) {
      root.setPointerCapture(event.pointerId);
      scrollFrame = win.requestAnimationFrame(autoScroll);
    }
  };
  const move = (event: PointerEvent) => {
    if (session?.pointer !== event.pointerId) return;
    event.preventDefault();
    session.y = event.clientY;
    previewPointer();
  };
  const up = (event: PointerEvent) => {
    if (session?.pointer === event.pointerId) {
      event.preventDefault();
      drop();
    }
  };
  const lost = (event: PointerEvent) => {
    if (session?.pointer === event.pointerId) cancel();
  };
  const keydown = (event: KeyboardEvent) => {
    const target = event.target;
    if (!(target instanceof win.Element)) return;
    const button = target.closest<HTMLButtonElement>(
      '[data-question-control="rank-drag"]',
    );
    if (
      !button ||
      !root.contains(button) ||
      button.matches(":disabled") ||
      get().blocked
    )
      return;
    if (event.key === "Escape" && session) {
      event.preventDefault();
      cancel(true);
      return;
    }
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      if (session?.key === button.dataset.key) drop();
      else start(button.dataset.key!);
      return;
    }
    if (
      !session ||
      session.pointer !== undefined ||
      session.key !== button.dataset.key
    )
      return;
    const current = session.preview.indexOf(session.key);
    const next =
      event.key === "ArrowUp"
        ? current - 1
        : event.key === "ArrowDown"
          ? current + 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? session.preview.length - 1
              : undefined;
    if (next !== undefined) {
      event.preventDefault();
      moveTo(next);
    }
  };
  const outside = (event: Event) => {
    if (event.target instanceof win.Node && !root.contains(event.target)) {
      focusAllowed = false;
      cancel();
    }
  };
  const otherAction = (event: Event) => {
    if (
      session &&
      event.target instanceof win.Element &&
      event.target.closest(
        '[data-question-control="rank"], [data-part="actions"]',
      )
    )
      cancel();
  };
  const observer = new win.MutationObserver(schedule);
  observer.observe(root, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ["disabled"],
  });
  root.addEventListener("pointerdown", down);
  root.addEventListener("pointermove", move);
  root.addEventListener("pointerup", up);
  root.addEventListener("pointercancel", lost);
  root.addEventListener("lostpointercapture", lost);
  root.addEventListener("keydown", keydown);
  root.addEventListener("click", otherAction, true);
  root.ownerDocument.addEventListener("focusin", outside);
  root.ownerDocument.addEventListener("pointerdown", outside, true);
  return () => {
    if (disposed) return;
    disposed = true;
    cancel();
    observer.disconnect();
    win.cancelAnimationFrame(frame);
    win.cancelAnimationFrame(scrollFrame);
    root.removeEventListener("pointerdown", down);
    root.removeEventListener("pointermove", move);
    root.removeEventListener("pointerup", up);
    root.removeEventListener("pointercancel", lost);
    root.removeEventListener("lostpointercapture", lost);
    root.removeEventListener("keydown", keydown);
    root.removeEventListener("click", otherAction, true);
    root.ownerDocument.removeEventListener("focusin", outside);
    root.ownerDocument.removeEventListener("pointerdown", outside, true);
  };
}
