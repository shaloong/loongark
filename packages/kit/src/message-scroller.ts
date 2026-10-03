export interface MessageScrollerOptions {
  label?: string;
  jumpLabel?: string;
  onAtBottomChange?: (details: { atBottom: boolean }) => void;
}
/** 仅在用户仍跟随底部时自动滚动；上翻阅读与 prepend 保留视口。 */
export function mountMessageScroller(
  root: HTMLElement,
  onChange?: MessageScrollerOptions["onAtBottomChange"],
) {
  const viewport = root.querySelector<HTMLElement>('[data-part="viewport"]');
  const content = root.querySelector<HTMLElement>('[data-part="content"]');
  const jump = root.querySelector<HTMLButtonElement>('[data-part="jump"]');
  if (!viewport || !content || !jump) return () => {};
  const win = root.ownerDocument.defaultView;
  if (!win) return () => {};
  let atBottom = true,
    height = viewport.scrollHeight,
    first = content.firstElementChild;
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
  const bottom = () => {
    viewport.scrollTop = viewport.scrollHeight;
    report(true);
    height = viewport.scrollHeight;
  };
  const scroll = () => report(nearBottom());
  const resize = () => {
    if (atBottom) bottom();
    height = viewport.scrollHeight;
  };
  const mutations = () => {
    const nextFirst = content.firstElementChild;
    if (atBottom) bottom();
    else if (first && first !== nextFirst && content.contains(first)) {
      // prepend 的内容增长不应把读者正在查看的消息移出视口。
      viewport.scrollTop += viewport.scrollHeight - height;
    }
    first = nextFirst;
    height = viewport.scrollHeight;
  };
  const click = () => {
    bottom();
    viewport.focus({ preventScroll: true });
  };
  viewport.style.overflowAnchor = "none";
  bottom();
  viewport.addEventListener("scroll", scroll, { passive: true });
  jump.addEventListener("click", click);
  const mutation = new win.MutationObserver(mutations);
  mutation.observe(content, {
    childList: true,
    subtree: true,
    characterData: true,
  });
  const observer = new win.ResizeObserver(resize);
  observer.observe(content);
  observer.observe(viewport);
  return () => {
    mutation.disconnect();
    observer.disconnect();
    viewport.removeEventListener("scroll", scroll);
    jump.removeEventListener("click", click);
    viewport.style.overflowAnchor = "";
  };
}
export const messageScrollerCSS = `
[data-scope=message-scroller][data-part=root] { position:relative;min-width:0; }
[data-scope=message-scroller][data-part=viewport] { height:calc(var(--lk-control-height-lg) * 8);overflow:auto;overscroll-behavior:contain;border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-lg);background:var(--lk-color-semantic-background); }
[data-scope=message-scroller][data-part=content] { display:flex;flex-direction:column;gap:var(--lk-space-component-md);padding:var(--lk-space-component-md); }
[data-scope=message-scroller][data-part=jump]:is(button) { position:absolute;bottom:var(--lk-space-component-sm);left:50%;transform:translateX(-50%);max-width:90%;min-height:var(--lk-control-height-md);padding:var(--lk-space-component-xs) var(--lk-space-component-compact);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-pill);background:var(--lk-color-semantic-card);color:var(--lk-color-semantic-cardforeground);box-shadow:var(--lk-shadow-sm);font:inherit;font-size:var(--lk-typography-fontsize-sm);cursor:pointer; }
[data-scope=message-scroller][data-part=jump][hidden] { display:none; }
`;
