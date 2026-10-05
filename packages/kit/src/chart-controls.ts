import { chartSeriesKeys, type ChartOptions } from "./data-models";
import {
  chartRange,
  chartWindow,
  chartZoomRange,
  chartInspection,
  type ChartRange,
} from "./chart-window";
/** 原生图例、分类刷选与可访问检查；适配层持有受控状态。 */
export function mountChartControls(
  element: HTMLElement,
  getOptions: () => ChartOptions,
  change: (keys: string[]) => void,
  changeRange?: (range: ChartRange) => void,
) {
  const document = element.ownerDocument,
    view = document.defaultView;
  if (!view) return () => {};
  const ElementType = view.Element,
    HTMLElementType = view.HTMLElement;
  let disposed = false,
    open = !!element.querySelector<HTMLDetailsElement>(
      '[data-part="data-table"]',
    )?.open;
  let focused: { node: HTMLElement; part: string; key?: string } | undefined;
  let inspectedKey: string | undefined;
  const keyFor = (options: ChartOptions, index: number) => {
    const row = options.data[chartRange(options)[0] + index];
    return row?.id !== undefined
      ? `id:${row.id}`
      : `index:${chartRange(options)[0] + index}`;
  };
  const hideTooltip = () => {
    const tooltip = element.querySelector<HTMLElement>('[data-part="tooltip"]');
    if (tooltip) tooltip.hidden = true;
  };
  const inspect = (index?: number) => {
    const options = getOptions(),
      data = chartWindow(options).data;
    let selected =
      index ??
      (inspectedKey
        ? data.findIndex(
            (_, position) => keyFor(options, position) === inspectedKey,
          )
        : 0);
    selected = Math.max(
      0,
      Math.min(data.length - 1, Number.isFinite(selected) ? selected : 0),
    );
    if (data.length) inspectedKey = keyFor(options, selected);
    else inspectedKey = undefined;
    const select = element.querySelector<HTMLSelectElement>(
      '[data-part="inspect-category"]',
    );
    if (select) select.value = String(selected);
    const output = element.querySelector<HTMLOutputElement>(
      '[data-part="inspection"]',
    );
    const text = chartInspection(options, selected);
    if (output) output.textContent = text;
    return text;
  };
  const restoreControls = () => {
    if (disposed || !element.isConnected) return;
    const [start, end] = chartRange(getOptions());
    const a = element.querySelector<HTMLInputElement>(
        '[data-part="range-start"]',
      ),
      b = element.querySelector<HTMLInputElement>('[data-part="range-end"]');
    const options = getOptions();
    if (a) {
      a.value = String(start);
      a.setAttribute(
        "aria-valuetext",
        String(
          options.data[start]?.[options.labelKey] ??
            options.labels?.empty ??
            "No data",
        ),
      );
    }
    if (b) {
      b.value = String(end);
      b.setAttribute(
        "aria-valuetext",
        String(
          options.data[end]?.[options.labelKey] ??
            options.labels?.empty ??
            "No data",
        ),
      );
    }
    if (getOptions().tooltip) inspect();
  };
  const requestRange = (range: ChartRange) => {
    const options = getOptions();
    if (options.disabled || !options.zoomable || !options.data.length) return;
    const next = chartRange({ ...options, range, defaultRange: undefined });
    if (changeRange) changeRange(next);
    else options.onRangeChange?.(next);
    queueMicrotask(restoreControls);
  };
  const click = (event: Event) => {
    if (!(event.target instanceof ElementType)) return;
    const button = event.target.closest<HTMLButtonElement>("button[data-part]"),
      options = getOptions();
    if (
      !button ||
      !element.contains(button) ||
      options.disabled ||
      button.disabled
    )
      return;
    const part = button.dataset.part;
    if (part === "legend-toggle" && options.interactive) {
      const key = button.dataset.seriesKey;
      if (!key || !options.series.some((series) => series.key === key)) return;
      const selected = chartSeriesKeys(options),
        next = selected.includes(key)
          ? selected.filter((value) => value !== key)
          : [...selected, key];
      change(chartSeriesKeys({ ...options, seriesKeys: next }));
    }
    if (part === "zoom-in" || part === "zoom-out" || part === "zoom-reset")
      requestRange(
        chartZoomRange(
          options,
          part === "zoom-in" ? "in" : part === "zoom-out" ? "out" : "reset",
        ),
      );
  };
  const input = (event: Event) => {
    if (
      !(event.target instanceof view.HTMLInputElement) ||
      !element.contains(event.target)
    )
      return;
    const target = event.target,
      options = getOptions();
    if (target.disabled || options.disabled) return;
    const [start, end] = chartRange(options),
      index = Number(target.value);
    if (target.dataset.part === "range-start")
      requestRange([Math.min(index, end), end]);
    if (target.dataset.part === "range-end")
      requestRange([start, Math.max(start, index)]);
  };
  const changeInspection = (event: Event) => {
    if (
      event.target instanceof view.HTMLSelectElement &&
      event.target.dataset.part === "inspect-category" &&
      element.contains(event.target) &&
      !getOptions().disabled
    ) {
      inspect(Number(event.target.value));
      hideTooltip();
    }
  };
  const pointerOver = (event: PointerEvent) => {
    if (!(event.target instanceof ElementType)) return;
    const point = event.target.closest<SVGElement>("[data-chart-index]"),
      options = getOptions();
    if (
      !options.tooltip ||
      options.disabled ||
      !point ||
      !element.contains(point)
    )
      return;
    const tooltip = element.querySelector<HTMLElement>('[data-part="tooltip"]');
    if (!tooltip) return;
    tooltip.textContent = inspect(Number(point.dataset.chartIndex));
    tooltip.hidden = false;
    const bounds = element.getBoundingClientRect(),
      tip = tooltip.getBoundingClientRect(),
      gap = parseFloat(view.getComputedStyle(tooltip).paddingLeft) || 0;
    tooltip.style.left = `${Math.max(0, Math.min(Math.max(0, bounds.width - tip.width), event.clientX - bounds.left + gap))}px`;
    tooltip.style.top = `${Math.max(0, Math.min(event.clientY - bounds.top + gap, view.innerHeight - bounds.top - tip.height - gap))}px`;
  };
  const pointerOut = (event: PointerEvent) => {
    if (
      !(event.relatedTarget instanceof ElementType) ||
      !event.relatedTarget.closest("[data-chart-index]")
    )
      hideTooltip();
  };
  const keydown = (event: KeyboardEvent) => {
    if (event.key === "Escape") hideTooltip();
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
    hideTooltip();
    if (node.matches('button[data-part="legend-toggle"]'))
      focused = { node, part: "legend-toggle", key: node.dataset.seriesKey };
    else if (node.matches('[data-part="data-table"] > summary'))
      focused = { node, part: "summary" };
    else if (
      node.matches(
        '[data-part="data-region"],input[data-part="range-start"],input[data-part="range-end"],select[data-part="inspect-category"],button[data-part="zoom-in"],button[data-part="zoom-out"],button[data-part="zoom-reset"]',
      )
    )
      focused = { node, part: node.dataset.part! };
    else focused = undefined;
  };
  const blur = (event: FocusEvent) => {
    if (
      event.relatedTarget instanceof ElementType &&
      !element.contains(event.relatedTarget)
    )
      focused = undefined;
  };
  const pointer = (event: Event) => {
    if (
      event.target instanceof ElementType &&
      !element.contains(event.target)
    ) {
      focused = undefined;
      hideTooltip();
    }
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
    restoreControls();
    hideTooltip();
    if (!focused || focused.node.isConnected) return;
    const active = document.activeElement;
    if (
      active &&
      active !== document.body &&
      active !== document.documentElement
    )
      return;
    const node =
      focused.part === "legend-toggle"
        ? Array.from(
            element.querySelectorAll<HTMLButtonElement>(
              'button[data-part="legend-toggle"]',
            ),
          ).find((button) => button.dataset.seriesKey === focused?.key)
        : element.querySelector<HTMLElement>(
            focused.part === "summary"
              ? '[data-part="data-table"] > summary'
              : `[data-part="${focused.part}"]`,
          );
    if (!node?.matches(":disabled")) node?.focus({ preventScroll: true });
  });
  observer.observe(element, { childList: true });
  element.addEventListener("click", click);
  element.addEventListener("input", input);
  element.addEventListener("change", changeInspection);
  element.addEventListener("pointerover", pointerOver);
  element.addEventListener("pointerout", pointerOut);
  element.addEventListener("keydown", keydown);
  element.addEventListener("toggle", toggle, true);
  element.addEventListener("focusin", focus);
  element.addEventListener("focusout", blur);
  document.addEventListener("pointerdown", pointer, true);
  restoreControls();
  return () => {
    disposed = true;
    observer.disconnect();
    focused = undefined;
    hideTooltip();
    element.removeEventListener("click", click);
    element.removeEventListener("input", input);
    element.removeEventListener("change", changeInspection);
    element.removeEventListener("pointerover", pointerOver);
    element.removeEventListener("pointerout", pointerOut);
    element.removeEventListener("keydown", keydown);
    element.removeEventListener("toggle", toggle, true);
    element.removeEventListener("focusin", focus);
    element.removeEventListener("focusout", blur);
    document.removeEventListener("pointerdown", pointer, true);
  };
}
