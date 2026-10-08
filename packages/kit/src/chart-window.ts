import { chartSliceKey, chartSliceKeys } from "./chart-render";
import type { ChartOptions } from "./data-models";
export type ChartRange = readonly [number, number];
/** 分类窗口使用含两端的原始数据索引；数据收缩时裁剪，不在渲染中发出通知。 */
export function chartRange(options: ChartOptions): ChartRange {
  const last = Math.max(0, options.data.length - 1);
  const requested = options.range ?? options.defaultRange;
  if (!requested) return [0, last];
  const index = (value: number, fallback: number) =>
    Number.isFinite(value)
      ? Math.max(0, Math.min(last, Math.floor(value)))
      : fallback;
  const a = index(requested[0], 0),
    b = index(requested[1], last);
  return [Math.min(a, b), Math.max(a, b)];
}
export function chartWindow(options: ChartOptions): ChartOptions {
  const [start, end] = chartRange(options);
  return {
    ...options,
    data: options.data.slice(start, end + 1),
    range: undefined,
    defaultRange: undefined,
  };
}
export function chartZoomRange(
  options: ChartOptions,
  direction: "in" | "out" | "reset",
): ChartRange {
  const [start, end] = chartRange(options),
    count = options.data.length;
  if (direction === "reset" || !count) return [0, Math.max(0, count - 1)];
  const current = end - start + 1;
  const length =
    direction === "in"
      ? Math.max(1, Math.ceil(current / 2))
      : Math.min(count, current * 2);
  const next = Math.max(
    0,
    Math.min(count - length, Math.floor((start + end + 1 - length) / 2)),
  );
  return [next, next + length - 1];
}
const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]!,
  );
export function chartInspection(options: ChartOptions, index: number) {
  const current = chartWindow(options),
    row = current.data[index];
  if (!row) return options.labels?.empty ?? "No data";
  if (
    (options.type === "pie" || options.type === "donut") &&
    !chartSliceKeys(options).includes(chartSliceKey(options, row))
  )
    return options.labels?.empty ?? "No data";
  const selected = new Set(
    options.seriesKeys ??
      options.defaultSeriesKeys ??
      options.series.map((series) => series.key),
  );
  if (!options.series.some((series) => selected.has(series.key)))
    return options.labels?.empty ?? "No data";
  const axisKey = options.xAxis?.key;
  const coordinate =
    axisKey && axisKey !== options.labelKey
      ? `; ${axisKey}: ${String(row[axisKey] ?? options.labels?.empty ?? "No data")}`
      : "";
  return `${String(row[options.labelKey] ?? "")}${coordinate} — ${options.series
    .filter((series) => selected.has(series.key))
    .map(
      (series) =>
        `${series.label ?? series.key}: ${typeof row[series.key] === "number" && Number.isFinite(row[series.key]) ? row[series.key] : (options.labels?.empty ?? "No data")}`,
    )
    .join("; ")}`;
}
export function renderChartNavigation(options: ChartOptions) {
  const [start, end] = chartRange(options),
    last = Math.max(0, options.data.length - 1),
    blocked = options.disabled || !options.data.length;
  const attribute = blocked ? " disabled" : "";
  const labels = options.labels;
  const button = (part: string, label: string, disabled: boolean) =>
    `<button type="button" data-part="${part}"${disabled ? " disabled" : ""}>${escape(label)}</button>`;
  const zoom = options.zoomable
    ? `<fieldset data-part="brush"${attribute}><legend>${escape(labels?.brush ?? "Visible categories")}</legend><div data-part="zoom-actions">${button("zoom-in", labels?.zoomIn ?? "Zoom in", blocked || start === end)}${button("zoom-out", labels?.zoomOut ?? "Zoom out", blocked || end - start === last)}${button("zoom-reset", labels?.resetZoom ?? "Reset zoom", blocked || (start === 0 && end === last))}</div><label>${escape(labels?.rangeStart ?? "Start category")}<input type="range" data-part="range-start" min="0" max="${last}" step="1" value="${start}" aria-valuetext="${escape(String(options.data[start]?.[options.labelKey] ?? labels?.empty ?? "No data"))}"/></label><label>${escape(labels?.rangeEnd ?? "End category")}<input type="range" data-part="range-end" min="0" max="${last}" step="1" value="${end}" aria-valuetext="${escape(String(options.data[end]?.[options.labelKey] ?? labels?.empty ?? "No data"))}"/></label><output data-part="range-status">${escape(labels?.window?.([start, end], options.data.length) ?? (options.data.length ? `Categories ${start + 1}–${end + 1} of ${options.data.length}` : (labels?.empty ?? "No data")))}</output></fieldset>`
    : "";
  const data = chartWindow(options).data;
  const inspector = options.tooltip
    ? `<div data-part="inspector"><label>${escape(labels?.inspect ?? "Inspect category")}<select data-part="inspect-category"${attribute}>${data.length ? data.map((row, index) => `<option value="${index}">${escape(String(row[options.labelKey] ?? ""))}</option>`).join("") : `<option>${escape(labels?.empty ?? "No data")}</option>`}</select></label><output data-part="inspection" role="status">${escape(chartInspection(options, 0))}</output><div data-part="tooltip" role="tooltip" hidden></div></div>`
    : "";
  return zoom + inspector;
}
