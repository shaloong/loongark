/** 保留 Ark 指针拖动，阻止鼠标兼容事件在移动柄下方启动页面文本选择。 */
export function preventDrawerGrabberSelection(event: {
  button: number;
  pointerType: string;
  cancelable: boolean;
  preventDefault(): void;
}): void {
  if (
    event.button === 0 &&
    (event.pointerType === "mouse" || event.pointerType === "pen") &&
    event.cancelable
  )
    event.preventDefault();
}
