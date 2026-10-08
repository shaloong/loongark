/** 为多个 Ark Menu 根节点提供菜单栏的横向焦点管理。 */
export const mountMenubar = (element: HTMLElement): (() => void) => {
  const document = element.ownerDocument,
    win = document.defaultView;
  if (!win) return () => {};
  let disposed = false,
    frame = 0;
  let closing:
    { trigger: HTMLElement; content: HTMLElement | null } | undefined;
  const restore = () => {
    frame = 0;
    if (!closing || disposed) return;
    const { trigger, content } = closing;
    if (
      !element.isConnected ||
      !trigger.isConnected ||
      trigger.hasAttribute("disabled") ||
      trigger.getAttribute("aria-disabled") === "true"
    ) {
      closing = undefined;
      return;
    }
    const hidden =
      !content?.isConnected ||
      content.hidden ||
      !content.getClientRects().length ||
      win.getComputedStyle(content).display === "none" ||
      win.getComputedStyle(content).visibility === "hidden";
    // 受控调用方可拒绝关闭；等待 aria-expanded 变更，不持续轮询仍打开的菜单。
    if (trigger.getAttribute("aria-expanded") === "true") return;
    if (!hidden) {
      schedule();
      return;
    }
    const active = document.activeElement;
    if (
      active === document.body ||
      active === document.documentElement ||
      content?.contains(active)
    )
      trigger.focus({ preventScroll: true });
    closing = undefined;
  };
  const schedule = () => {
    if (!frame && !disposed) frame = win.requestAnimationFrame(restore);
  };
  const escape = (event: KeyboardEvent) => {
    if (event.key !== "Escape") {
      closing = undefined;
      return;
    }
    if (event.defaultPrevented) return;
    const trigger = triggers().find(
      (node) => node.getAttribute("aria-expanded") === "true",
    );
    if (!trigger) return;
    const content = document.getElementById(
      trigger.getAttribute("aria-controls") ?? "",
    );
    if (
      !(event.target instanceof win.Node) ||
      !(trigger.contains(event.target) || content?.contains(event.target))
    )
      return;
    // 快速 Escape 可能早于 Ark 的展开焦点任务；退出实际隐藏后恢复原触发项。
    closing = { trigger, content };
    schedule();
  };
  const moved = (event: Event) => {
    if (!closing || !(event.target instanceof win.Node)) return;
    if (
      event.target !== document.body &&
      !closing.trigger.contains(event.target) &&
      !closing.content?.contains(event.target)
    )
      closing = undefined;
  };
  const triggers = () =>
    Array.from(
      element.querySelectorAll<HTMLElement>(
        '[data-scope="menu"][data-part="trigger"]',
      ),
    ).filter(
      (trigger) =>
        !trigger.hasAttribute("disabled") &&
        trigger.getAttribute("aria-disabled") !== "true",
    );
  const synchronize = () => {
    const items = triggers();
    const active =
      items.find((item) => item === element.ownerDocument.activeElement) ??
      items.find((item) => item.tabIndex === 0) ??
      items[0];
    for (const item of items) {
      item.tabIndex = item === active ? 0 : -1;
      item.setAttribute("role", "menuitem");
    }
  };
  const focus = () => synchronize();
  const keydown = (event: KeyboardEvent) => {
    if (
      event.defaultPrevented ||
      !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
    )
      return;
    const items = triggers();
    const current = items.findIndex((item) => item === event.target);
    if (current < 0) return;
    const rtl = win.getComputedStyle(element).direction === "rtl";
    const offset = (event.key === "ArrowRight" ? 1 : -1) * (rtl ? -1 : 1);
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? items.length - 1
          : (current + offset + items.length) % items.length;
    event.preventDefault();
    const wasOpen = items[current].getAttribute("aria-expanded") === "true";
    if (wasOpen) items[current].click();
    items[next].focus();
    if (wasOpen) items[next].click();
    synchronize();
  };
  element.setAttribute("role", "menubar");
  element.setAttribute("aria-orientation", "horizontal");
  element.addEventListener("keydown", keydown);
  element.addEventListener("focusin", focus);
  document.addEventListener("keydown", escape, true);
  document.addEventListener("focusin", moved);
  document.addEventListener("pointerdown", moved, true);
  const observer = new win.MutationObserver(() => {
    synchronize();
    if (closing) schedule();
  });
  observer.observe(element, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["aria-expanded", "data-state"],
  });
  synchronize();
  return () => {
    disposed = true;
    win.cancelAnimationFrame(frame);
    closing = undefined;
    document.removeEventListener("keydown", escape, true);
    document.removeEventListener("focusin", moved);
    document.removeEventListener("pointerdown", moved, true);
    observer.disconnect();
    element.removeEventListener("keydown", keydown);
    element.removeEventListener("focusin", focus);
  };
};
