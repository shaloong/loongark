export interface TextareaAutosizeOptions {
  autoSize?: boolean;
  minRows?: number;
  maxRows?: number;
}
export function textareaRows(options: TextareaAutosizeOptions = {}) {
  const min = Number.isFinite(options.minRows)
    ? Math.max(1, Math.floor(options.minRows!))
    : 3;
  const max = Number.isFinite(options.maxRows)
    ? Math.max(min, Math.floor(options.maxRows!))
    : Infinity;
  return { min, max };
}
/** Observers run only while autoSize is enabled. Native values and focus remain untouched. */
export function mountTextareaAutosize(
  element: HTMLTextAreaElement,
  getOptions: () => TextareaAutosizeOptions,
) {
  const original = {
    height: element.style.height,
    minHeight: element.style.minHeight,
    maxHeight: element.style.maxHeight,
    overflowY: element.style.overflowY,
    resize: element.style.resize,
  };
  let frame = 0,
    lastWidth = -1,
    active = false,
    disposed = false,
    resize: ResizeObserver | undefined;
  const form = element.form,
    restore = () => Object.assign(element.style, original);
  const schedule = () => {
    if (disposed || !active) return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(update);
  };
  const stop = () => {
    cancelAnimationFrame(frame);
    resize?.disconnect();
    element.removeEventListener("input", update);
    window.removeEventListener("resize", schedule);
    form?.removeEventListener("reset", schedule);
    active = false;
    restore();
  };
  const start = () => {
    active = true;
    lastWidth = -1;
    resize =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver((entries) => {
            const width = entries[0]?.contentRect.width ?? 0;
            if (width !== lastWidth) {
              lastWidth = width;
              schedule();
            }
          })
        : undefined;
    resize?.observe(element);
    element.addEventListener("input", update);
    window.addEventListener("resize", schedule);
    form?.addEventListener("reset", schedule);
    document.fonts?.ready.then(schedule);
  };
  function update() {
    if (disposed) return;
    const options = getOptions();
    if (!options.autoSize) {
      if (active) stop();
      return;
    }
    if (!active) start();
    if (!element.isConnected || element.getBoundingClientRect().width === 0)
      return;
    const style = getComputedStyle(element),
      line = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.5,
      padding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom),
      border =
        parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
    const rows = textareaRows(options),
      min = rows.min * line + padding + border,
      max = rows.max * line + padding + border,
      scroll = element.scrollTop;
    element.style.minHeight = min + "px";
    element.style.maxHeight = Number.isFinite(max) ? max + "px" : "none";
    element.style.height = "0px";
    const content = element.scrollHeight + border,
      height = Math.max(min, Math.min(max, content));
    element.style.height = height + "px";
    element.style.overflowY = content > max ? "auto" : "hidden";
    element.style.resize = "none";
    element.scrollTop = scroll;
  }
  update();
  return {
    update,
    destroy() {
      disposed = true;
      if (active) stop();
    },
  };
}
