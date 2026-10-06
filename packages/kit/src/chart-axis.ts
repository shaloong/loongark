import type { CellValue } from "./data-models";
export interface ChartAxis {
  type?: "category" | "linear" | "time" | "log";
  key?: string;
  domain?: readonly [number, number];
  locale?: string;
  timeZone?: string;
  format?: (value: number) => string;
}
export function chartAxisValue(
  value: CellValue | undefined,
  axis?: ChartAxis,
): number | undefined {
  if (axis?.type === "time" && typeof value === "string") {
    if (
      !/^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?(?:Z|[+-]\d{2}:\d{2}))?$/.test(
        value,
      )
    )
      return;
    const timestamp = Date.parse(value);
    if (!Number.isFinite(timestamp)) return;
    const day = value.slice(0, 10),
      date = new Date(day + "T00:00:00Z");
    if (
      !Number.isFinite(date.getTime()) ||
      date.toISOString().slice(0, 10) !== day
    )
      return;
    return timestamp;
  }
  if (typeof value !== "number" || !Number.isFinite(value)) return;
  if (axis?.type === "time" && !Number.isFinite(new Date(value).getTime()))
    return;
  return axis?.type === "log" && value <= 0 ? undefined : value;
}
/** 连续轴在归一化空间内计算，避免极大有限值相减溢出。 */
export function createChartScale(
  values: readonly number[],
  axis?: ChartAxis,
  includeZero = false,
) {
  if (axis?.type === "category")
    throw new TypeError("Category axis cannot use a continuous scale");
  const valid = values.filter(
    (value) => Number.isFinite(value) && (axis?.type !== "log" || value > 0),
  );
  let min = valid.length
    ? valid.reduce((a, b) => Math.min(a, b), Infinity)
    : axis?.type === "log"
      ? 1
      : 0;
  let max = valid.length
    ? valid.reduce((a, b) => Math.max(a, b), -Infinity)
    : axis?.type === "log"
      ? 10
      : 1;
  if (includeZero && axis?.type !== "log") {
    min = Math.min(0, min);
    max = Math.max(0, max);
  }
  if (axis?.domain) [min, max] = axis.domain;
  else if (min === max) {
    if (axis?.type === "time") {
      min = Math.max(-8640000000000000, min - 86400000);
      max = Math.min(8640000000000000, max + 86400000);
    } else if (axis?.type === "log") {
      min = min / 10 || min;
      max = Math.min(Number.MAX_VALUE, max * 10);
    } else if (min === 0) max = 1;
    else {
      const delta = Math.max(Math.abs(min) / 10, Number.MIN_VALUE);
      min = Math.max(-Number.MAX_VALUE, min - delta);
      max = Math.min(Number.MAX_VALUE, max + delta);
    }
  }
  if (
    !Number.isFinite(min) ||
    !Number.isFinite(max) ||
    min >= max ||
    (axis?.type === "log" && min <= 0)
  )
    throw new RangeError(
      "Chart axis requires finite ascending bounds; logarithmic bounds must be positive",
    );
  if (
    axis?.type === "time" &&
    (!Number.isFinite(new Date(min).getTime()) ||
      !Number.isFinite(new Date(max).getTime()))
  )
    throw new RangeError("Time axis bounds must be valid timestamps");
  const magnitude = Math.max(Math.abs(min), Math.abs(max)),
    transform =
      axis?.type === "log"
        ? (value: number) => {
            const ratio = (value - min) / min;
            return Number.isFinite(ratio) && ratio > -1
              ? Math.log1p(ratio)
              : Math.log(value) - Math.log(min);
          }
        : (value: number) => value / magnitude,
    low = transform(min),
    high = transform(max);
  const position = (value: number) => (transform(value) - low) / (high - low);
  const ticks = Array.from({ length: 5 }, (_, index) => {
    const t = index / 4;
    return index === 0
      ? min
      : index === 4
        ? max
        : axis?.type === "log"
          ? Math.exp(Math.log(min) * (1 - t) + Math.log(max) * t)
          : min * (1 - t) + max * t;
  });
  return { min, max, position, ticks };
}
export function chartAxisLabel(
  value: number,
  axis: ChartAxis | undefined,
  fallback: (value: number) => string,
): string {
  if (axis?.format) return axis.format(value);
  if (axis?.type === "time")
    return new Intl.DateTimeFormat(axis.locale ?? "en", {
      month: "short",
      day: "numeric",
      timeZone: axis.timeZone ?? "UTC",
    }).format(value);
  if (axis?.locale)
    return new Intl.NumberFormat(axis.locale, {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  return fallback(value);
}
