/// <reference lib="es2022.intl" />
export type CellValue = string | number | boolean | null;
export const observeChartWidth = (
  element: HTMLElement,
  update: (width: number) => void,
): (() => void) => {
  const report = (width: number) => {
    if (width > 0) update(Math.round(width));
  };
  report(element.getBoundingClientRect().width);
  if (typeof ResizeObserver === "undefined") return () => {};
  const observer = new ResizeObserver((entries) =>
    report(entries[0].contentRect.width),
  );
  observer.observe(element);
  return () => observer.disconnect();
};
export type DataRow = Record<string, CellValue>;
export interface DataColumn {
  key: string;
  label: string;
  sortable?: boolean;
  /** 逻辑对齐；表头、只读值与编辑器共用。 */
  align?: "start" | "center" | "end";
  /** 只有提供 onCellCommit 时才允许编辑；不编辑行身份字段。 */
  editor?: {
    type?: "text" | "number" | "textarea" | "select";
    rows?: number;
    options?: readonly { value: string; label: string; disabled?: boolean }[];
    validate?: (
      value: string | number,
      row: Readonly<DataRow>,
    ) => string | undefined;
  };
}
export interface DataSort {
  key: string;
  direction: "asc" | "desc";
}
export interface DataTableOptions {
  query?: string;
  sort?: DataSort;
  page?: number;
  pageSize?: number;
  rowKey?: string;
  mode?: "client" | "server";
  totalRows?: number;
}
const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
});
export const createDataTableView = (
  data: readonly DataRow[],
  columns: readonly DataColumn[],
  options: DataTableOptions = {},
) => {
  const query = options.query?.trim().toLocaleLowerCase() ?? "";
  const allRows = data.map((row, index) => ({
    row,
    id: String(row[options.rowKey ?? "id"] ?? index),
    index,
  }));
  if (
    options.mode === "server" &&
    allRows.some(
      ({ row, id }) => row[options.rowKey ?? "id"] == null || id === "",
    )
  )
    throw Error("Server DataTable requires stable row ids");
  const allIds = allRows.map(({ id }) => id);
  if (new Set(allIds).size !== allIds.length)
    throw Error("DataTable requires unique row ids");
  const columnKeys = columns.map(({ key }) => key);
  if (
    columnKeys.some((key) => !key) ||
    new Set(columnKeys).size !== columnKeys.length
  )
    throw Error("DataTable requires unique non-empty column keys");
  let rows =
    options.mode === "server"
      ? allRows
      : allRows.filter(
          ({ row }) =>
            !query ||
            columns.some(({ key }) =>
              String(row[key] ?? "")
                .toLocaleLowerCase()
                .includes(query),
            ),
        );
  const sort = columns.some(
    (column) => column.key === options.sort?.key && column.sortable !== false,
  )
    ? options.sort
    : undefined;
  if (sort && options.mode !== "server")
    rows = rows.sort((a, b) => {
      const left = a.row[sort.key],
        right = b.row[sort.key];
      const comparison =
        typeof left === "number" && typeof right === "number"
          ? left - right
          : collator.compare(String(left ?? ""), String(right ?? ""));
      return (
        (sort.direction === "asc" ? comparison : -comparison) ||
        a.index - b.index
      );
    });
  const pageSize = Math.max(
    1,
    Math.floor(Number.isFinite(options.pageSize) ? options.pageSize! : 10),
  );
  const total =
    options.mode === "server" && Number.isFinite(options.totalRows)
      ? Math.max(0, Math.floor(options.totalRows!))
      : rows.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(
    pageCount,
    Math.max(1, Math.floor(Number.isFinite(options.page) ? options.page! : 1)),
  );
  return {
    allIds,
    sort,
    rows:
      options.mode === "server"
        ? rows
        : rows.slice((page - 1) * pageSize, page * pageSize),
    total,
    page,
    pageSize,
    pageCount,
  };
};
export const nextDataSort = (
  sort: DataSort | undefined,
  key: string,
): DataSort | undefined =>
  sort?.key !== key
    ? { key, direction: "asc" }
    : sort.direction === "asc"
      ? { key, direction: "desc" }
      : undefined;
export interface ChartSeries {
  key: string;
  label?: string;
  color?: string;
}
export interface ChartLabels {
  empty: string;
  series: string;
  dataTable: string;
  category: string;
  range: (domain: readonly [number, number]) => string;
}
export interface ChartOptions {
  data: readonly DataRow[];
  series: readonly ChartSeries[];
  labelKey: string;
  type?: "line" | "bar";
  title?: string;
  width?: number;
  height?: number;
  labels?: Partial<ChartLabels>;
  interactive?: boolean;
  seriesKeys?: readonly string[];
  defaultSeriesKeys?: readonly string[];
  onSeriesKeysChange?: (keys: string[]) => void;
  disabled?: boolean;
  domain?: readonly [number, number];
  showDataTable?: boolean;
}
const escapeXML = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[char] ?? char,
  );
const chartColor = (value: string | undefined, index: number) =>
  value && /^(#[\da-f]{3,8}|var\(--lk-[\w-]+\))$/i.test(value)
    ? value
    : [
        "var(--lk-color-semantic-primary)",
        "var(--lk-color-semantic-mutedforeground)",
        "var(--lk-color-vi-skyblue)",
      ][index % 3];
const chartValue = (value: CellValue | undefined): number | undefined =>
  typeof value === "number" && Number.isFinite(value) ? value : undefined;
const compactNumber = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});
const chartNumber = (value: number) => {
  if (value === 0 || Object.is(value, -0)) return "0";
  const size = Math.abs(value);
  if (size >= 1e15 || size < 0.01)
    return value.toExponential(1).replace(/\.0e/, "e");
  return compactNumber.format(value);
};
const chartSegmenter =
  typeof Intl.Segmenter === "function"
    ? new Intl.Segmenter("en", { granularity: "grapheme" })
    : undefined;
const chartCategory = (label: string, maxWidth: number) => {
  const characters = chartSegmenter
    ? Array.from(chartSegmenter.segment(label), ({ segment }) => segment)
    : Array.from(label);
  const size = (segment: string) =>
    /[^\x00-\x7f]/.test(segment)
      ? Array.from(segment).length > 1
        ? 16
        : 12
      : /[MWmw]/.test(segment)
        ? 12
        : 8;
  if (
    characters.reduce((width, segment) => width + size(segment), 0) <= maxWidth
  )
    return label;
  if (!chartSegmenter) return "…";
  let width = 0,
    text = "";
  for (const segment of characters) {
    if (width + size(segment) > maxWidth - 12) break;
    text += segment;
    width += size(segment);
  }
  return text + "…";
};
export function chartSeriesKeys(
  options: Pick<ChartOptions, "series" | "seriesKeys" | "defaultSeriesKeys">,
) {
  const keys = options.series.map((series) => series.key);
  if (keys.some((key) => !key) || new Set(keys).size !== keys.length)
    throw Error("Chart requires unique non-empty series keys");
  const selected = options.seriesKeys ?? options.defaultSeriesKeys;
  return selected === undefined
    ? keys
    : keys.filter((key) => selected.includes(key));
}
function clipChartSegment(
  a: { x: number; value: number },
  b: { x: number; value: number },
  min: number,
  max: number,
) {
  if ((a.value < min && b.value < min) || (a.value > max && b.value > max))
    return undefined;
  const scale = Math.max(
    Math.abs(a.value),
    Math.abs(b.value),
    Math.abs(min),
    Math.abs(max),
  );
  const position = (point: { x: number; value: number }) => {
    const value = Math.min(max, Math.max(min, point.value));
    if (value === point.value) return point;
    const delta = b.value / scale - a.value / scale;
    const t =
      delta === 0
        ? 0
        : Math.min(1, Math.max(0, (value / scale - a.value / scale) / delta));
    return { x: a.x * (1 - t) + b.x * t, value };
  };
  return [position(a), position(b)] as const;
}

/** 使用归一化坐标避免有限的大数相减溢出；缺失值形成折线断点。 */
export const renderChartSVG = (options: ChartOptions): string => {
  const selectedKeys = new Set(chartSeriesKeys(options));
  const visibleSeries = options.series.filter((series) =>
    selectedKeys.has(series.key),
  );
  if (
    options.domain &&
    (!Number.isFinite(options.domain[0]) ||
      !Number.isFinite(options.domain[1]) ||
      options.domain[0] >= options.domain[1])
  )
    throw Error("Chart domain requires finite ascending bounds");
  const width = Math.max(
      160,
      Number.isFinite(options.width) ? options.width! : 600,
    ),
    height = Math.max(
      120,
      Number.isFinite(options.height) ? options.height! : 260,
    ),
    right = 16,
    top = 20,
    bottom = 40;
  let min = 0,
    max = 0,
    hasValues = false;
  for (const row of options.data)
    for (const series of visibleSeries) {
      const value = chartValue(row[series.key]);
      if (value === undefined) continue;
      hasValues = true;
      min = Math.min(min, value);
      max = Math.max(max, value);
    }
  const title = escapeXML(options.title ?? "Chart");
  const dataDescription = hasValues
    ? options.data
        .map(
          (row) =>
            `${String(row[options.labelKey] ?? "")} — ${visibleSeries.map((series) => `${series.label ?? series.key}: ${chartValue(row[series.key]) ?? options.labels?.empty ?? "No data"}`).join("; ")}`,
        )
        .join(". ")
    : (options.labels?.empty ?? "No data");
  const description = options.domain
    ? `${options.labels?.range?.(options.domain) ?? `Visible range: ${options.domain[0]} to ${options.domain[1]}.`} ${dataDescription}`
    : dataDescription;
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${title}" aria-description="${escapeXML(description)}" style="width:100%;height:auto"><title>${title}</title><desc>${escapeXML(description)}</desc>`;
  if (!hasValues) {
    const empty = escapeXML(options.labels?.empty ?? "No data");
    return (
      svg +
      `<text data-part="empty" x="${width / 2}" y="${height / 2}" text-anchor="middle" fill="var(--lk-color-semantic-mutedforeground)" font-size="var(--lk-typography-fontsize-md)">${empty}</text></svg>`
    );
  }
  if (options.domain) [min, max] = options.domain;
  else if (min === max) max = 1;
  const scale = Math.max(Math.abs(min), Math.abs(max)),
    low = min / scale,
    high = max / scale,
    span = high - low;
  const ticks = Array.from({ length: 5 }, (_, index) => {
    const value = min * (1 - index / 4) + max * (index / 4);
    return { value, label: chartNumber(value) };
  });
  const left = Math.max(
      44,
      Math.max(...ticks.map((t) => t.label.length)) * 7 + 12,
    ),
    plotWidth = width - left - right;
  const x = (index: number) =>
    left + (plotWidth * (index + 0.5)) / Math.max(1, options.data.length);
  const y = (value: number) =>
    top + ((height - top - bottom) * (high - value / scale)) / span;
  for (const tick of ticks) {
    const pos = y(tick.value);
    svg += `<line x1="${left}" y1="${pos}" x2="${width - right}" y2="${pos}" stroke="var(--lk-color-semantic-border)"/><text data-part="value-label" x="${left - 8}" y="${pos + 4}" text-anchor="end" fill="var(--lk-color-semantic-mutedforeground)" font-size="var(--lk-typography-fontsize-xs)">${tick.label}</text>`;
  }
  if (options.domain)
    svg += `<svg data-part="plot" x="${left}" y="${top}" width="${plotWidth}" height="${height - top - bottom}" viewBox="${left} ${top} ${plotWidth} ${height - top - bottom}" overflow="hidden">`;
  visibleSeries.forEach((series, seriesIndex) => {
    const originalIndex = options.series.indexOf(series);
    const color = chartColor(series.color, originalIndex);
    const points = options.data.map((row, index) => {
      const value = chartValue(row[series.key]);
      return value === undefined
        ? undefined
        : {
            x: x(index),
            y: y(Math.min(max, Math.max(min, value))),
            value,
            row,
          };
    });
    const pointTitle = (point: NonNullable<(typeof points)[number]>) =>
      escapeXML(
        `${String(point.row[options.labelKey] ?? "")} — ${series.label ?? series.key}: ${point.value}`,
      );
    if (options.type === "bar") {
      const slot = plotWidth / Math.max(1, options.data.length),
        barWidth = slot / (visibleSeries.length + 1),
        baseline = y(Math.min(max, Math.max(min, 0)));
      for (const point of points)
        if (point) {
          svg += `<rect data-part="bar" x="${point.x + (seriesIndex - visibleSeries.length / 2) * barWidth}" y="${Math.min(baseline, point.y)}" width="${Math.max(0.1, barWidth - 2)}" height="${Math.abs(baseline - point.y)}" fill="${color}"><title>${pointTitle(point)}</title></rect>`;
        }
    } else {
      let connected = false;
      let path = points
        .map((point) => {
          if (!point) {
            connected = false;
            return "";
          }
          const command = connected ? "L" : "M";
          connected = true;
          return `${command} ${point.x} ${point.y}`;
        })
        .join(" ");
      if (options.domain) {
        path = points
          .flatMap((point, index) => {
            const previous = points[index - 1];
            if (!point || !previous) return [];
            const segment = clipChartSegment(previous, point, min, max);
            return segment
              ? [
                  `M ${segment[0].x} ${y(segment[0].value)} L ${segment[1].x} ${y(segment[1].value)}`,
                ]
              : [];
          })
          .join(" ");
      }
      const dash = ["", "6 3", "2 3"][originalIndex % 3];
      svg += `<path data-part="line" d="${path}" fill="none" stroke="${color}" stroke-width="2" stroke-dasharray="${dash}"/>`;
      for (const point of points)
        if (
          point &&
          (!options.domain || (point.value >= min && point.value <= max))
        )
          svg += `<circle data-part="point" cx="${point.x}" cy="${point.y}" r="3" fill="${color}"><title>${pointTitle(point)}</title></circle>`;
    }
  });
  if (options.domain) svg += "</svg>";
  const longestCategory = options.data.reduce(
    (length, row) =>
      Math.max(length, Array.from(String(row[options.labelKey] ?? "")).length),
    0,
  );
  const categorySpacing = Math.min(112, Math.max(56, longestCategory * 8));
  const count = Math.min(
    options.data.length,
    Math.max(1, Math.floor(plotWidth / categorySpacing)),
  );
  const labelWidth = Math.max(
    24,
    Math.min(96, plotWidth / Math.max(1, count)) - 16,
  );
  for (let tick = 0; tick < count; tick++) {
    const index =
      count === 1
        ? Math.floor((options.data.length - 1) / 2)
        : Math.round((tick * (options.data.length - 1)) / (count - 1));
    const label = String(options.data[index][options.labelKey] ?? "");
    const pos = x(index);
    const availableWidth = Math.min(
      labelWidth,
      2 * (pos - 4),
      2 * (width - pos - 4),
    );
    svg += `<text data-part="category-label" x="${pos}" y="${height - 14}" text-anchor="middle" fill="var(--lk-color-semantic-mutedforeground)" font-size="var(--lk-typography-fontsize-xs)">${escapeXML(chartCategory(label, availableWidth))}<title>${escapeXML(label)}</title></text>`;
  }
  return svg + "</svg>";
};
/** 共享 HTML 图例保留完整序列名称并自然换行，SVG 输出仍可单独消费。 */
export const renderChartMarkup = (options: ChartOptions): string => {
  const svg = renderChartSVG(options),
    keys = new Set(chartSeriesKeys(options));
  const hasValues = options.data.some((row) =>
    options.series.some((series) => chartValue(row[series.key]) !== undefined),
  );
  const legend = options.series
    .map((series, index) => {
      if (!options.interactive && !keys.has(series.key)) return "";
      const color = chartColor(series.color, index),
        dash = options.type === "bar" ? "" : ["", "6 3", "2 3"][index % 3];
      const content = `<svg aria-hidden="true" viewBox="0 0 24 12"><line x1="1" y1="6" x2="23" y2="6" stroke="${color}" stroke-width="${options.type === "bar" ? 8 : 2}" stroke-dasharray="${dash}"/></svg><span>${escapeXML(series.label ?? series.key)}</span>`;
      return `<li data-part="legend-item">${options.interactive ? `<button type="button" data-part="legend-toggle" data-series-key="${escapeXML(series.key)}" aria-pressed="${keys.has(series.key)}"${options.disabled ? " disabled" : ""}>${content}</button>` : content}</li>`;
    })
    .join("");
  const legendMarkup =
    options.series.length && (hasValues || options.interactive)
      ? `<ul data-part="legend" aria-label="${escapeXML(options.labels?.series ?? "Chart series")}">${legend}</ul>`
      : "";
  const visible = options.series.filter((series) => keys.has(series.key));
  const title = escapeXML(options.title ?? "Chart");
  const table = options.showDataTable
    ? `<details data-part="data-table"><summary>${escapeXML(options.labels?.dataTable ?? "View chart data")}</summary><div data-part="data-region" role="region" aria-label="${title}" tabindex="0"><table><caption>${title}</caption><thead><tr><th scope="col">${escapeXML(options.labels?.category ?? "Category")}</th>${visible.map((series) => `<th scope="col">${escapeXML(series.label ?? series.key)}</th>`).join("")}</tr></thead><tbody>${options.data.map((row) => `<tr><th scope="row">${escapeXML(String(row[options.labelKey] ?? ""))}</th>${visible.map((series) => `<td>${escapeXML(String(chartValue(row[series.key]) ?? options.labels?.empty ?? "No data"))}</td>`).join("")}</tr>`).join("")}</tbody></table></div></details>`
    : "";
  return svg + legendMarkup + table;
};
