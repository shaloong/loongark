/** 为多个 Ark Menu 根节点提供菜单栏的横向焦点管理。 */
export const mountMenubar = (element: HTMLElement): (() => void) => {
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
    const rtl = getComputedStyle(element).direction === "rtl";
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
  const observer = new MutationObserver(synchronize);
  observer.observe(element, { childList: true, subtree: true });
  synchronize();
  return () => {
    observer.disconnect();
    element.removeEventListener("keydown", keydown);
    element.removeEventListener("focusin", focus);
  };
};
