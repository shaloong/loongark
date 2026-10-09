/** Recover from an upstream open-focus frame arriving after the menu has closed. */
export function recoverClosedMenuFocus(
  target: EventTarget | null,
  previous: EventTarget | null = null,
): void {
  if (typeof HTMLElement === "undefined" || !(target instanceof HTMLElement))
    return;
  const content = target;
  if (content.dataset.state !== "closed") return;
  queueMicrotask(() => {
    // An intervening user focus move or unmount owns the focus; never override it.
    if (!content.isConnected || content.dataset.state !== "closed") return;
    const document = content.ownerDocument;
    if (!content.contains(document.activeElement)) return;
    const triggerId = content.getAttribute("aria-labelledby")?.split(/\s+/)[0];
    const trigger = triggerId ? document.getElementById(triggerId) : null;
    // If a stale task stole focus from an outside control, restore that owner.
    const destination =
      previous instanceof HTMLElement &&
      previous.isConnected &&
      previous !== document.body &&
      !content.contains(previous)
        ? previous
        : trigger;
    if (destination instanceof HTMLElement && destination.isConnected)
      destination.focus({ preventScroll: true });
  });
}
