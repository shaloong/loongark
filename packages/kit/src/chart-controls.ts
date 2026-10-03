import { chartSeriesKeys, type ChartOptions } from "./data-models";
/** 图例使用原生按钮；共享监听与重绘恢复不持有框架状态或业务请求。 */
export function mountChartControls(
  element: HTMLElement,
  getOptions: () => ChartOptions,
  change: (keys: string[]) => void,
) {
  const document = element.ownerDocument,
    view = document.defaultView;
  if (!view) return () => {};
  const ElementType = view.Element,
    HTMLElementType = view.HTMLElement;
  let open = !!element.querySelector<HTMLDetailsElement>(
    '[data-part="data-table"]',
  )?.open;
  let focused:
    | { node: HTMLElement; part: "toggle" | "summary" | "region"; key?: string }
    | undefined;
  const click = (event: Event) => {
    if (!(event.target instanceof ElementType)) return;
    const button = event.target.closest<HTMLButtonElement>(
      'button[data-part="legend-toggle"]',
    );
    const options = getOptions();
    if (
      !button ||
      !element.contains(button) ||
      !options.interactive ||
      options.disabled ||
      button.disabled
    )
      return;
    const key = button.dataset.seriesKey;
    if (!key || !options.series.some((series) => series.key === key)) return;
    const selected = chartSeriesKeys(options);
    const next = selected.includes(key)
      ? selected.filter((value) => value !== key)
      : [...selected, key];
    change(chartSeriesKeys({ ...options, seriesKeys: next }));
  };
  const toggle = (event: Event) => {
    if (
      event.target instanceof HTMLElementType &&
      element.contains(event.target) &&
      event.target.matches('details[data-part="data-table"]')
    )
      open = event.target.hasAttribute("open");
  };
  const focus = (event: FocusEvent) => {
    if (!(event.target instanceof HTMLElementType)) return;
    const node = event.target;
    if (node.matches('button[data-part="legend-toggle"]'))
      focused = { node, part: "toggle", key: node.dataset.seriesKey };
    else if (node.matches('[data-part="data-table"] > summary'))
      focused = { node, part: "summary" };
    else if (node.matches('[data-part="data-region"]'))
      focused = { node, part: "region" };
  };
  const blur = (event: FocusEvent) => {
    if (
      event.relatedTarget instanceof ElementType &&
      !element.contains(event.relatedTarget)
    )
      focused = undefined;
  };
  const pointer = (event: Event) => {
    if (event.target instanceof ElementType && !element.contains(event.target))
      focused = undefined;
  };
  const observer = new view.MutationObserver((records) => {
    for (const record of records)
      for (const node of Array.from(record.removedNodes))
        if (
          node instanceof HTMLElementType &&
          node.matches('details[data-part="data-table"]')
        )
          open = node.hasAttribute("open");
    if (!element.isConnected) return;
    const details = element.querySelector<HTMLDetailsElement>(
      '[data-part="data-table"]',
    );
    if (details && details.open !== open) details.open = open;
    if (!focused || focused.node.isConnected) return;
    const active = document.activeElement;
    if (
      active &&
      active !== document.body &&
      active !== document.documentElement
    )
      return;
    const node =
      focused.part === "toggle"
        ? Array.from(
            element.querySelectorAll<HTMLButtonElement>(
              'button[data-part="legend-toggle"]',
            ),
          ).find((button) => button.dataset.seriesKey === focused?.key)
        : element.querySelector<HTMLElement>(
            focused.part === "summary"
              ? '[data-part="data-table"] > summary'
              : '[data-part="data-region"]',
          );
    node?.focus({ preventScroll: true });
  });
  observer.observe(element, { childList: true });
  element.addEventListener("click", click);
  element.addEventListener("toggle", toggle, true);
  element.addEventListener("focusin", focus);
  element.addEventListener("focusout", blur);
  document.addEventListener("pointerdown", pointer, true);
  return () => {
    observer.disconnect();
    focused = undefined;
    element.removeEventListener("click", click);
    element.removeEventListener("toggle", toggle, true);
    element.removeEventListener("focusin", focus);
    element.removeEventListener("focusout", blur);
    document.removeEventListener("pointerdown", pointer, true);
  };
}
