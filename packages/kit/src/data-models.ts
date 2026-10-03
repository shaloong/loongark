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
/** 使用归一化坐标避免有限的大数相减溢出；缺失值形成折线断点。 */
export const renderChartSVG = (options: ChartOptions): string => {
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
    for (const series of options.series) {
      const value = chartValue(row[series.key]);
      if (value === undefined) continue;
      hasValues = true;
      min = Math.min(min, value);
      max = Math.max(max, value);
    }
  const title = escapeXML(options.title ?? "Chart");
  const description = hasValues
    ? options.data
        .map(
          (row) =>
            `${String(row[options.labelKey] ?? "")} — ${options.series.map((series) => `${series.label ?? series.key}: ${chartValue(row[series.key]) ?? options.labels?.empty ?? "No data"}`).join("; ")}`,
        )
        .join(". ")
    : (options.labels?.empty ?? "No data");
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${title}" aria-description="${escapeXML(description)}" style="width:100%;height:auto"><title>${title}</title><desc>${escapeXML(description)}</desc>`;
  if (!hasValues) {
    const empty = escapeXML(description);
    return (
      svg +
      `<text data-part="empty" x="${width / 2}" y="${height / 2}" text-anchor="middle" fill="var(--lk-color-semantic-mutedforeground)" font-size="var(--lk-typography-fontsize-md)">${empty}</text></svg>`
    );
  }
  if (min === max) max = 1;
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
  options.series.forEach((series, seriesIndex) => {
    const color = chartColor(series.color, seriesIndex);
    const points = options.data.map((row, index) => {
      const value = chartValue(row[series.key]);
      return value === undefined
        ? undefined
        : { x: x(index), y: y(value), value, row };
    });
    const pointTitle = (point: NonNullable<(typeof points)[number]>) =>
      escapeXML(
        `${String(point.row[options.labelKey] ?? "")} — ${series.label ?? series.key}: ${point.value}`,
      );
    if (options.type === "bar") {
      const slot = plotWidth / Math.max(1, options.data.length),
        barWidth = slot / (options.series.length + 1),
        baseline = y(0);
      for (const point of points)
        if (point) {
          svg += `<rect data-part="bar" x="${point.x + (seriesIndex - options.series.length / 2) * barWidth}" y="${Math.min(baseline, point.y)}" width="${Math.max(0.1, barWidth - 2)}" height="${Math.abs(baseline - point.y)}" fill="${color}"><title>${pointTitle(point)}</title></rect>`;
        }
    } else {
      let connected = false;
      const path = points
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
      const dash = ["", "6 3", "2 3"][seriesIndex % 3];
      svg += `<path data-part="line" d="${path}" fill="none" stroke="${color}" stroke-width="2" stroke-dasharray="${dash}"/>`;
      for (const point of points)
        if (point)
          svg += `<circle data-part="point" cx="${point.x}" cy="${point.y}" r="3" fill="${color}"><title>${pointTitle(point)}</title></circle>`;
    }
  });
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
  const svg = renderChartSVG(options);
  if (
    !options.series.length ||
    !options.data.some((row) =>
      options.series.some(
        (series) => chartValue(row[series.key]) !== undefined,
      ),
    )
  )
    return svg;
  const legend = options.series
    .map((series, index) => {
      const color = chartColor(series.color, index),
        dash = options.type === "bar" ? "" : ["", "6 3", "2 3"][index % 3];
      return `<li data-part="legend-item"><svg aria-hidden="true" viewBox="0 0 24 12"><line x1="1" y1="6" x2="23" y2="6" stroke="${color}" stroke-width="${options.type === "bar" ? 8 : 2}" stroke-dasharray="${dash}"/></svg><span>${escapeXML(series.label ?? series.key)}</span></li>`;
    })
    .join("");
  return `${svg}<ul data-part="legend" aria-label="${escapeXML(options.labels?.series ?? "Chart series")}">${legend}</ul>`;
};
