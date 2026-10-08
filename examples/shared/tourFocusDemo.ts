// Tour 保留 Ark 的结束契约，不强制选择业务流程的下一焦点。
// 此组合示例通过状态回调返回启动按钮，并尊重调用方已经移动的焦点。
export function createTourFocusDemo() {
  let trigger: HTMLElement | undefined;
  let frame: number | undefined;
  const dispose = () => {
    if (frame !== undefined) cancelAnimationFrame(frame);
    frame = undefined;
    trigger = undefined;
  };
  return {
    start(event: { currentTarget: EventTarget | null }, start: () => void) {
      dispose();
      if (event.currentTarget instanceof HTMLElement)
        trigger = event.currentTarget;
      start();
    },
    onStatusChange({ status }: { status: string }) {
      if (!["dismissed", "skipped", "completed"].includes(status) || !trigger)
        return;
      const document = trigger.ownerDocument;
      const owned = () =>
        document.activeElement === document.body ||
        !!document.activeElement?.closest(
          '[data-scope="tour"][data-part="content"]',
        );
      if (!owned()) return;
      if (frame !== undefined) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = undefined;
        if (
          owned() &&
          trigger?.isConnected &&
          !trigger.matches(':disabled,[aria-disabled="true"]')
        )
          trigger.focus({ preventScroll: true });
      });
    },
    dispose,
  };
}
