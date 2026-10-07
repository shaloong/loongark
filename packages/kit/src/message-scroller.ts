import { suspendScrollAnchoring } from "./scroll-anchoring";
import {
  mountVirtualWindow,
  virtualViewportHeight,
  type createVirtualWindow,
  type VirtualizationOptions,
  type VirtualWindowOptions,
} from "./virtual-window";
export interface MessageScrollerOptions {
  virtualization?: VirtualizationOptions & { keys: readonly string[] };
  label?: string;
  jumpLabel?: string;
  onAtBottomChange?: (details: { atBottom: boolean }) => void;
}
/** 跟随底部或保留阅读位置；范围测量不修改用户选择。 */
export function mountMessageScroller(
  root: HTMLElement,
  onChange?: MessageScrollerOptions["onAtBottomChange"],
) {
  const viewport = root.querySelector<HTMLElement>(
    ':scope > [data-part="viewport"]',
  );
  const content = viewport?.querySelector<HTMLElement>(
    ':scope > [data-part="content"]',
  );
  const jump = root.querySelector<HTMLButtonElement>(
    ':scope > [data-part="jump"]',
  );
  if (!viewport || !content || !jump) return () => {};
  const document = root.ownerDocument,
    win = document.defaultView;
  if (!win) return () => {};
  const restoreScrollAnchoring = suspendScrollAnchoring(viewport),
    previousAtBottom = root.dataset.atBottom,
    previousHidden = jump.hidden;
  let atBottom = true,
    disposed = false,
    frame = 0;
  let anchor:
    | {
        row: Element;
        rowOffset: number;
        text?: Text;
        offset?: number;
        textOffset?: number;
      }
    | undefined;
  let capturedHeight = 0,
    capturedViewportHeight = 0;
  const observedRows = new Set<Element>();
  const viewportTop = () =>
    viewport.getBoundingClientRect().top + viewport.clientTop;
  const rowOffset = (row: Element) =>
    row.getBoundingClientRect().top - viewportTop();
  const nearBottom = () =>
    viewport.scrollHeight - viewport.clientHeight - viewport.scrollTop <= 4;
  const report = (next: boolean) => {
    jump.hidden = next;
    root.dataset.atBottom = String(next);
    if (next !== atBottom) {
      atBottom = next;
      onChange?.({ atBottom: next });
    }
  };
  const textRect = (text: Text, offset: number) => {
    const range = document.createRange();
    range.setStart(text, offset);
    range.setEnd(text, offset + 1);
    return range.getBoundingClientRect();
  };
  const capture = () => {
    capturedHeight = content.getBoundingClientRect().height;
    capturedViewportHeight = viewport.clientHeight;
    const top = viewportTop(),
      bottom = top + viewport.clientHeight;
    const row = Array.from(content.children).find((child) => {
      const rect = child.getBoundingClientRect();
      return rect.height > 0 && rect.bottom > top + 1 && rect.top < bottom;
    });
    anchor = row ? { row, rowOffset: rowOffset(row) } : undefined;
    if (!row || !anchor) return;
    const walker = document.createTreeWalker(row, win.NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const text = node as Text;
      if (
        !text.length ||
        !text.data.trim() ||
        text.parentElement?.closest(
          'button,input,textarea,[aria-hidden="true"]',
        )
      )
        continue;
      const last = textRect(text, text.length - 1);
      if (last.height === 0 || last.bottom <= top + 1) continue;
      // 横排文字的行位置按 DOM 顺序递增；二分查找视口中的第一字形。
      let start = 0,
        end = text.length - 1;
      while (start < end) {
        const middle = Math.floor((start + end) / 2);
        if (textRect(text, middle).bottom > top + 1) end = middle;
        else start = middle + 1;
      }
      const rect = textRect(text, start);
      if (rect.height > 0 && rect.top < bottom) {
        anchor.text = text;
        anchor.offset = start;
        anchor.textOffset = rect.top - top;
        return;
      }
    }
  };
  const bottom = () => {
    viewport.scrollTop = viewport.scrollHeight;
    report(true);
    capture();
  };
  const restore = () => {
    if (atBottom) {
      bottom();
      return;
    }
    if (anchor?.row.parentElement === content) {
      const { text, offset, textOffset } = anchor;
      const textValid =
        text &&
        offset !== undefined &&
        textOffset !== undefined &&
        text.isConnected &&
        anchor.row.contains(text) &&
        offset < text.length;
      const rect = textValid ? textRect(text, offset) : undefined;
      const delta =
        rect && rect.height > 0
          ? rect.top - viewportTop() - textOffset!
          : rowOffset(anchor.row) - anchor.rowOffset;
      if (Math.abs(delta) > 0.5) viewport.scrollTop += delta;
    }
    report(nearBottom());
    capture();
  };
  const schedule = () => {
    if (disposed || frame) return;
    frame = win.requestAnimationFrame(() => {
      frame = 0;
      if (!disposed) restore();
    });
  };
  const observer = new win.ResizeObserver(schedule);
  const syncRows = () => {
    const rows = new Set(Array.from(content.children));
    for (const row of observedRows)
      if (!rows.has(row)) {
        observer.unobserve(row);
        observedRows.delete(row);
      }
    for (const row of rows)
      if (!observedRows.has(row)) {
        observedRows.add(row);
        observer.observe(row);
      }
  };
  const mutation = new win.MutationObserver(() => {
    syncRows();
    schedule();
  });
  const scroll = () => {
    // 媒体/字体布局产生的 scroll 可能先于 ResizeObserver，不覆盖旧阅读锚点。
    if (
      Math.abs(content.getBoundingClientRect().height - capturedHeight) > 0.5 ||
      viewport.clientHeight !== capturedViewportHeight
    ) {
      schedule();
      return;
    }
    report(nearBottom());
    capture();
  };
  const click = () => {
    bottom();
    viewport.focus({ preventScroll: true });
  };
  bottom();
  viewport.addEventListener("scroll", scroll, { passive: true });
  jump.addEventListener("click", click);
  mutation.observe(content, {
    childList: true,
    subtree: true,
    characterData: true,
  });
  observer.observe(content);
  observer.observe(viewport);
  syncRows();
  return () => {
    disposed = true;
    if (frame) win.cancelAnimationFrame(frame);
    mutation.disconnect();
    observer.disconnect();
    observedRows.clear();
    anchor = undefined;
    viewport.removeEventListener("scroll", scroll);
    jump.removeEventListener("click", click);
    restoreScrollAnchoring();
    if (root.dataset.atBottom === String(atBottom)) {
      if (previousAtBottom === undefined) delete root.dataset.atBottom;
      else root.dataset.atBottom = previousAtBottom;
    }
    if (jump.hidden === atBottom) jump.hidden = previousHidden;
  };
}
export const messageScrollerCSS = `
[data-scope=message-scroller][data-part=content][data-virtualized=true] { display:block;gap:0;padding:0; }
[data-scope=message-scroller] [data-part=virtual-item] { padding:var(--lk-space-component-sm) var(--lk-space-component-md); }
[data-scope=message-scroller] [data-part=virtual-spacer] { pointer-events:none; }

[data-scope=message-scroller][data-part=root] { position:relative;min-width:0; }
[data-scope=message-scroller][data-part=viewport] { height:calc(var(--lk-control-height-lg) * 8);overflow:auto;overscroll-behavior:contain;border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-lg);background:var(--lk-color-semantic-background); }
[data-scope=message-scroller][data-part=content] { display:flex;flex-direction:column;gap:var(--lk-space-component-md);padding:var(--lk-space-component-md); }
[data-scope=message-scroller][data-part=jump]:is(button) { position:absolute;bottom:var(--lk-space-component-sm);left:50%;transform:translateX(-50%);max-width:90%;min-height:var(--lk-control-height-md);padding:var(--lk-space-component-xs) var(--lk-space-component-compact);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-pill);background:var(--lk-color-semantic-card);color:var(--lk-color-semantic-cardforeground);box-shadow:var(--lk-shadow-sm);font:inherit;font-size:var(--lk-typography-fontsize-sm);cursor:pointer; }
[data-scope=message-scroller][data-part=jump][hidden] { display:none; }
`;

export function messageVirtualOptions(
  options: MessageScrollerOptions,
): VirtualWindowOptions {
  return {
    ...options.virtualization,
    keys: options.virtualization?.keys ?? [],
    height: virtualViewportHeight(options.virtualization),
    followEnd: true,
  };
}
export function mountVirtualMessageScroller(
  root: HTMLElement,
  model: ReturnType<typeof createVirtualWindow>,
  onChange?: MessageScrollerOptions["onAtBottomChange"],
) {
  const viewport = root.querySelector<HTMLElement>(
      ':scope > [data-part="viewport"]',
    ),
    content = viewport?.querySelector<HTMLElement>(
      ':scope > [data-part="content"]',
    ),
    jump = root.querySelector<HTMLButtonElement>(':scope > [data-part="jump"]');
  if (!viewport || !content || !jump) return () => {};
  const previousAtBottom = root.dataset.atBottom,
    previousHidden = jump.hidden;
  let atBottom = model.state.atBottom;
  const report = () => {
    const next = model.state.atBottom;
    jump.hidden = next;
    root.dataset.atBottom = String(next);
    if (next !== atBottom) {
      atBottom = next;
      onChange?.({ atBottom: next });
    }
  };
  const stop = model.subscribe(report);
  const release = mountVirtualWindow(viewport, model, () => content);
  const click = () => {
    model.scrollToIndex(model.state.count - 1, "end");
    viewport.focus({ preventScroll: true });
  };
  jump.addEventListener("click", click);
  report();
  return () => {
    stop();
    release();
    jump.removeEventListener("click", click);
    if (root.dataset.atBottom === String(atBottom)) {
      if (previousAtBottom === undefined) delete root.dataset.atBottom;
      else root.dataset.atBottom = previousAtBottom;
    }
    if (jump.hidden === atBottom) jump.hidden = previousHidden;
  };
}
