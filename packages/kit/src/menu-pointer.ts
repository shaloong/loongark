/** 只有已知触摸或触控笔启动长按；空类型鼠标由原生 contextmenu 处理。 */
export function contextMenuPointerHandler<E extends { pointerType: string }>(
  handler: ((event: E) => void) | null | undefined,
): ((event: E) => void) | undefined {
  if (!handler) return undefined;
  return (event) => {
    if (event.pointerType === "touch" || event.pointerType === "pen")
      handler(event);
  };
}
