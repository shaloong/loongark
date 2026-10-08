import type { ConversationActionHandler } from "./conversation-actions";
/** 动作删去触发按钮后恢复到组件；用户已移到外部时不抢回焦点。 */
export function withConversationActionFocus(
  root: HTMLElement | undefined,
  handler: ConversationActionHandler,
): ConversationActionHandler {
  const initialTrigger = root?.ownerDocument.activeElement;
  const startedInside = !!(
    root &&
    initialTrigger &&
    root.contains(initialTrigger)
  );
  const actionId = initialTrigger?.getAttribute("data-action-id");
  return async (context) => {
    if (!root) return handler(context);
    const document = root.ownerDocument,
      view = document.defaultView,
      trigger = initialTrigger;
    let external = !startedInside,
      finished = false,
      frame = 0;
    let observer: MutationObserver | undefined;
    const moved = (event: Event) => {
      const target = event.target;
      if (
        target instanceof (view?.Element ?? Element) &&
        !root.contains(target) &&
        target !== document.body
      ) {
        external = true;
        cleanup();
      }
    };
    const pointer = (event: Event) => {
      if (
        event.target instanceof (view?.Element ?? Element) &&
        !root.contains(event.target)
      ) {
        external = true;
        cleanup();
      }
    };
    const cleanup = () => {
      finished = true;
      if (frame) view?.cancelAnimationFrame(frame);
      frame = 0;
      observer?.disconnect();
      document.removeEventListener("focusin", moved);
      document.removeEventListener("pointerdown", pointer, true);
      context.signal.removeEventListener("abort", cleanup);
    };
    document.addEventListener("focusin", moved);
    document.addEventListener("pointerdown", pointer, true);
    context.signal.addEventListener("abort", cleanup, { once: true });
    try {
      await handler(context);
    } finally {
      const restore = () => {
        frame = 0;
        if (finished) return;
        if (
          context.signal.aborted ||
          !root.isConnected ||
          external ||
          !trigger
        ) {
          cleanup();
          return;
        }
        // handler 完成先于控制器 publish；等待适配层清除忙碌状态。
        if (root.getAttribute("aria-busy") === "true") {
          schedule();
          return;
        }
        const active = document.activeElement;
        if (
          !active ||
          active === document.body ||
          active === document.documentElement
        ) {
          const current = actionId
            ? Array.from(
                root.querySelectorAll<HTMLButtonElement>(
                  "button[data-action-id]",
                ),
              ).find(
                (button) =>
                  button.dataset.actionId === actionId && !button.disabled,
              )
            : undefined;
          const restored =
            current ??
            (trigger instanceof (view?.HTMLElement ?? HTMLElement) &&
            trigger.isConnected &&
            root.contains(trigger) &&
            !(
              trigger instanceof
                (view?.HTMLButtonElement ?? HTMLButtonElement) &&
              trigger.disabled
            )
              ? trigger
              : root);
          restored.focus({ preventScroll: true });
        }
        cleanup();
      };
      const schedule = () => {
        if (!finished && !frame && view)
          frame = view.requestAnimationFrame(restore);
      };
      if (view && !finished) {
        observer = new view.MutationObserver(schedule);
        observer.observe(root, {
          attributes: true,
          childList: true,
          subtree: true,
        });
        schedule();
      } else cleanup();
    }
  };
}
