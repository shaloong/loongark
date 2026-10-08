/** iframe 先由浏览器解析文档，再挂载子树，避免向已替换的 body 传送内容。 */
export const frameDocument = '<!doctype html><html><head><style>*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}</style></head><body><div class="frame-root"></div></body></html>';
export function observeFrameSize(frame: HTMLIFrameElement, content: HTMLElement) {
  const win = frame.contentWindow;
  if (!win) return () => {};
  let pending = 0;
  const update = () => {
    if (pending) return;
    pending = win.requestAnimationFrame(() => {
      pending = 0;
      if (!frame.isConnected || !content.isConnected) return;
      frame.style.setProperty("--width", `${content.scrollWidth}px`);
      frame.style.setProperty("--height", `${content.scrollHeight}px`);
    });
  };
  const Observer = frame.contentDocument?.defaultView?.ResizeObserver;
  const observer = Observer ? new Observer(update) : undefined;
  observer?.observe(content); update();
  return () => { observer?.disconnect(); if (pending) win.cancelAnimationFrame(pending); };
}
