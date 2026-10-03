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
  let rows = data
    .map((row, index) => ({
      row,
      id: String(row[options.rowKey ?? "id"] ?? index),
      index,
    }))
    .filter(
      ({ row }) =>
        !query ||
        columns.some(({ key }) =>
          String(row[key] ?? "")
            .toLocaleLowerCase()
            .includes(query),
        ),
    );
  const sort = options.sort;
  if (sort)
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
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const page = Math.min(
    pageCount,
    Math.max(1, Math.floor(Number.isFinite(options.page) ? options.page! : 1)),
  );
  return {
    rows: rows.slice((page - 1) * pageSize, page * pageSize),
    total: rows.length,
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
export interface ChartOptions {
  data: readonly DataRow[];
  series: readonly ChartSeries[];
  labelKey: string;
  type?: "line" | "bar";
  title?: string;
  width?: number;
  height?: number;
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
    : index % 2
      ? "var(--lk-color-semantic-mutedforeground)"
      : "var(--lk-color-semantic-primary)";
export const renderChartSVG = (options: ChartOptions): string => {
  const width = Math.max(
      160,
      Number.isFinite(options.width) ? options.width! : 600,
    ),
    height = Math.max(
      120,
      Number.isFinite(options.height) ? options.height! : 260,
    ),
    left = 44,
    right = 16,
    top = 20,
    bottom = 40;
  const values = options.data.flatMap((row) =>
    options.series.map((s) =>
      typeof row[s.key] === "number" && Number.isFinite(row[s.key])
        ? Number(row[s.key])
        : 0,
    ),
  );
  const min = Math.min(0, ...values),
    max = Math.max(1, ...values),
    span = max - min;
  const x = (index: number) =>
      left +
      ((width - left - right) * (index + 0.5)) /
        Math.max(1, options.data.length),
    y = (value: number) =>
      top + ((height - top - bottom) * (max - value)) / span;
  const title = escapeXML(options.title ?? "Chart");
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${title}" style="width:100%;height:auto"><title>${title}</title>`;
  for (let tick = 0; tick <= 4; tick++) {
    const value = min + (span * tick) / 4,
      pos = y(value);
    svg += `<line x1="${left}" y1="${pos}" x2="${width - right}" y2="${pos}" stroke="var(--lk-color-semantic-border)"/><text x="${left - 8}" y="${pos + 4}" text-anchor="end" fill="var(--lk-color-semantic-mutedforeground)" font-size="11">${Number(value.toFixed(2))}</text>`;
  }
  options.series.forEach((series, seriesIndex) => {
    const color = chartColor(series.color, seriesIndex),
      points = options.data.map((row, index) => ({
        x: x(index),
        y: y(
          typeof row[series.key] === "number" &&
            Number.isFinite(row[series.key])
            ? Number(row[series.key])
            : 0,
        ),
        row,
      }));
    if (options.type === "bar") {
      const barWidth =
        (width - left - right) /
        Math.max(1, options.data.length) /
        (options.series.length + 1);
      for (const point of points) {
        const baseline = y(0);
        svg += `<rect x="${point.x + (seriesIndex - options.series.length / 2) * barWidth}" y="${Math.min(baseline, point.y)}" width="${Math.max(0.1, barWidth - 2)}" height="${Math.abs(baseline - point.y)}" rx="3" fill="${color}"><title>${escapeXML(String(point.row[options.labelKey] ?? ""))}: ${escapeXML(String(point.row[series.key] ?? 0))}</title></rect>`;
      }
    } else {
      svg += `<path d="${points.map((p, i) => `${i ? "L" : "M"} ${p.x} ${p.y}`).join(" ")}" fill="none" stroke="${color}" stroke-width="2"/>`;
      for (const p of points)
        svg += `<circle cx="${p.x}" cy="${p.y}" r="3" fill="${color}"><title>${escapeXML(String(p.row[options.labelKey] ?? ""))}: ${escapeXML(String(p.row[series.key] ?? 0))}</title></circle>`;
    }
  });
  options.data.forEach((row, index) => {
    svg += `<text x="${x(index)}" y="${height - 14}" text-anchor="middle" fill="var(--lk-color-semantic-mutedforeground)" font-size="11">${escapeXML(String(row[options.labelKey] ?? ""))}</text>`;
  });
  return svg + "</svg>";
};
