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
    let external = !startedInside;
    const moved = (event: Event) => {
      const target = event.target;
      if (
        target instanceof (view?.Element ?? Element) &&
        !root.contains(target) &&
        target !== document.body
      )
        external = true;
    };
    const pointer = (event: Event) => {
      if (
        event.target instanceof (view?.Element ?? Element) &&
        !root.contains(event.target)
      )
        external = true;
    };
    const cleanup = () => {
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
      cleanup();
      view?.requestAnimationFrame(() => {
        if (context.signal.aborted || !root.isConnected || external || !trigger)
          return;
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
      });
    }
  };
}
