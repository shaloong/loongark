import {
  clipChartLine,
  clipChartPolygon,
  type ChartPoint,
} from "./chart-geometry";
import type { ChartOptions, DataRow } from "./data-models";
import { chartAxisValue, createChartScale, chartAxisLabel } from "./chart-axis";
interface ChartRenderHelpers {
  escape: (value: string) => string;
  color: (value: string | undefined, index: number) => string;
  number: (value: number) => string;
  category: (value: string, maxWidth: number) => string;
  textWidth: (value: string) => number;
  keys: (options: ChartOptions) => string[];
}
export function chartSliceKey(options: ChartOptions, row: DataRow): string {
  return String(row[options.sliceKey ?? options.labelKey] ?? "");
}
export function chartSliceKeys(options: ChartOptions): string[] {
  const keys = options.data.map((row) => chartSliceKey(options, row));
  if (keys.some((key) => !key) || new Set(keys).size !== keys.length)
    throw new Error("Pie charts require unique non-empty category keys");
  const selected = options.sliceKeys ?? options.defaultSliceKeys;
  const chosen = selected === undefined ? undefined : new Set(selected);
  return chosen === undefined ? keys : keys.filter((key) => chosen.has(key));
}
export function renderChartExtended(
  options: ChartOptions,
  helpers: ChartRenderHelpers,
): string {
  const { escape, color, number, category, textWidth, keys } = helpers;
  const selectedSeries = new Set(keys(options));
  const series = options.series.filter((item) => selectedSeries.has(item.key));
  const width = Math.max(
      160,
      Number.isFinite(options.width) ? options.width! : 600,
    ),
    height = Math.max(
      120,
      Number.isFinite(options.height) ? options.height! : 260,
    );
  const title = escape(options.title ?? "Chart");
  const dataDescription = options.data
    .map(
      (row) =>
        `${String(row[options.labelKey] ?? "")}${options.xAxis?.key && options.xAxis.key !== options.labelKey ? `; ${options.xAxis.key}: ${row[options.xAxis.key] ?? options.labels?.empty ?? "No data"}` : ""} — ${series.map((item) => `${item.label ?? item.key}: ${row[item.key] ?? options.labels?.empty ?? "No data"}`).join("; ")}`,
    )
    .join(". ");
  const visibleDomain = options.yAxis?.domain ?? options.domain;
  const description =
    (visibleDomain
      ? `${options.labels?.range?.(visibleDomain) ?? `Visible range: ${visibleDomain[0]} to ${visibleDomain[1]}.`} `
      : "") + dataDescription;
  const header = (text: string) =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${title}" aria-description="${escape(text)}" style="width:100%;height:auto"><title>${title}</title><desc>${escape(text)}</desc>`;
  let svg = header(description);
  const empty = () =>
    header(options.labels?.empty ?? "No data") +
    `<text data-part="empty" x="${width / 2}" y="${height / 2}" text-anchor="middle" fill="var(--lk-color-semantic-mutedforeground)" font-size="var(--lk-typography-fontsize-md)">${escape(options.labels?.empty ?? "No data")}</text></svg>`;
  if (options.type === "pie" || options.type === "donut") {
    if (options.series.length !== 1)
      throw new Error("Pie charts require exactly one value series");
    if (options.stacked || options.xAxis || options.yAxis || options.domain)
      throw new Error("Pie charts do not have Cartesian axes or stacks");
    const chosen = new Set(chartSliceKeys(options));
    const slices = options.data
      .map((row, index) => ({
        row,
        index,
        key: chartSliceKey(options, row),
        value: chartAxisValue(row[options.series[0].key]),
      }))
      .filter(
        (item) =>
          series.length &&
          chosen.has(item.key) &&
          item.value !== undefined &&
          item.value > 0,
      );
    if (!slices.length) return empty();
    const maximum = slices.reduce((a, b) => Math.max(a, b.value!), 0),
      total = slices.reduce((a, b) => a + b.value! / maximum, 0);
    const radius = Math.max(1, Math.min(width, height) / 2 - 24),
      cx = width / 2,
      cy = height / 2;
    const ratio =
        options.type === "donut"
          ? Number.isFinite(options.innerRadius)
            ? Math.max(0, Math.min(0.9, options.innerRadius!))
            : 0.6
          : 0,
      inner = radius * ratio;
    const point = (r: number, angle: number) =>
      `${cx + r * Math.cos(angle)} ${cy + r * Math.sin(angle)}`;
    let angle = -Math.PI / 2;
    for (const slice of slices) {
      const fraction = slice.value! / maximum / total,
        end = angle + fraction * Math.PI * 2,
        middle = (angle + end) / 2,
        large = fraction > 0.5 ? 1 : 0;
      let path: string;
      if (fraction > 1 - 1e-12) {
        path = `M ${point(radius, angle)} A ${radius} ${radius} 0 1 1 ${point(radius, angle + Math.PI)} A ${radius} ${radius} 0 1 1 ${point(radius, end)} Z`;
        if (inner)
          path += ` M ${point(inner, angle)} A ${inner} ${inner} 0 1 0 ${point(inner, angle - Math.PI)} A ${inner} ${inner} 0 1 0 ${point(inner, angle - Math.PI * 2)} Z`;
      } else
        path = inner
          ? `M ${point(radius, angle)} A ${radius} ${radius} 0 ${large} 1 ${point(radius, end)} L ${point(inner, end)} A ${inner} ${inner} 0 ${large} 0 ${point(inner, angle)} Z`
          : `M ${cx} ${cy} L ${point(radius, angle)} A ${radius} ${radius} 0 ${large} 1 ${point(radius, end)} Z`;
      const sliceColor = options.sliceColors?.[slice.key];
      svg += `<path data-part="slice" data-chart-index="${slice.index}" data-slice-key="${escape(slice.key)}" d="${path}" fill="${color(sliceColor, slice.index)}" fill-rule="evenodd" stroke="var(--lk-color-semantic-background)" stroke-width="2"><title>${escape(`${String(slice.row[options.labelKey] ?? "")}: ${slice.value} (${Math.round(fraction * 100)}%)`)}</title></path>`;
      if (fraction >= 0.07)
        svg += `<text data-part="slice-label" x="${cx + (radius + 12) * Math.cos(middle)}" y="${cy + (radius + 12) * Math.sin(middle) + 4}" text-anchor="middle" fill="var(--lk-color-semantic-foreground)" font-size="var(--lk-typography-fontsize-xs)" pointer-events="none">${Math.round(fraction * 100)}%</text>`;
      angle = end;
    }
    return svg + "</svg>";
  }
  if (options.stacked && !["bar", "area"].includes(options.type ?? "line"))
    throw new Error("Only bar and area charts can be stacked");
  if (options.stacked && options.yAxis?.type === "log")
    throw new Error("Stacked charts require a linear value axis");
  if (options.yAxis?.type && !["linear", "log"].includes(options.yAxis.type))
    throw new TypeError("Value axis must be linear or logarithmic");
  const xAxis = options.xAxis
    ? { ...options.xAxis, type: options.xAxis.type ?? "linear" }
    : options.type === "scatter"
      ? { type: "linear" as const }
      : undefined;
  if (options.type === "scatter" && xAxis?.type === "category")
    throw new TypeError("Scatter charts require a continuous horizontal axis");
  const continuous = xAxis && xAxis.type !== "category";
  const xs = options.data.map((row, index) =>
    continuous
      ? chartAxisValue(row[xAxis?.key ?? options.labelKey], xAxis)
      : index,
  );
  const xScale = continuous
    ? createChartScale(
        xs.filter((value): value is number => value !== undefined),
        xAxis,
      )
    : undefined;
  const positive = new Array<number>(options.data.length).fill(0),
    negative = new Array<number>(options.data.length).fill(0);
  const sets = series.map((item) =>
    options.data.map((row, index) => {
      const value = chartAxisValue(row[item.key], options.yAxis);
      if (value === undefined || xs[index] === undefined) return;
      const bottom = options.stacked
          ? value >= 0
            ? positive[index]
            : negative[index]
          : 0,
        top = bottom + value;
      if (!Number.isFinite(top))
        throw new RangeError("Stacked totals exceed the finite numeric range");
      if (options.stacked) {
        if (value >= 0) positive[index] = top;
        else negative[index] = top;
      }
      return { row, index, value, bottom, top };
    }),
  );
  const values = sets.flatMap((points) =>
    points.flatMap((point) =>
      point
        ? options.stacked
          ? [point.bottom, point.top]
          : [point.value]
        : [],
    ),
  );
  const valueAxis = {
    ...options.yAxis,
    domain: options.yAxis?.domain ?? options.domain,
  };
  const yScale = createChartScale(
    values,
    valueAxis,
    options.type !== "scatter",
  );
  if (!values.length) return empty();
  const ticks = yScale.ticks.map((value) => ({
    value,
    label: chartAxisLabel(value, valueAxis, number),
  }));
  const left = Math.min(
      width * 0.4,
      Math.max(
        44,
        ticks.reduce((a, b) => Math.max(a, textWidth(b.label)), 0) + 16,
      ),
    ),
    right = 16,
    top = 20,
    bottom = 40;
  const plotWidth = Math.max(1, width - left - right),
    plotHeight = height - top - bottom;
  const finiteCoordinate = (value: number) =>
    Math.max(-Number.MAX_VALUE, Math.min(Number.MAX_VALUE, value));
  const coordinate = (value: number) => Math.max(-1e6, Math.min(1e6, value));
  const x = (index: number) =>
    left +
    plotWidth *
      (xScale
        ? coordinate(xScale.position(xs[index]!))
        : (index + 0.5) / Math.max(1, options.data.length));
  const y = (value: number) =>
    top + plotHeight * (1 - coordinate(yScale.position(value)));
  for (const tick of ticks)
    svg += `<line x1="${left}" y1="${y(tick.value)}" x2="${width - right}" y2="${y(tick.value)}" stroke="var(--lk-color-semantic-border)"/><text data-part="value-label" x="${left - 8}" y="${y(tick.value) + 4}" text-anchor="end" fill="var(--lk-color-semantic-mutedforeground)" font-size="var(--lk-typography-fontsize-xs)">${escape(category(tick.label, left - 16))}<title>${escape(tick.label)}</title></text>`;
  svg += `<svg data-part="plot" x="${left}" y="${top}" width="${plotWidth}" height="${plotHeight}" viewBox="${left} ${top} ${plotWidth} ${plotHeight}" overflow="hidden">`;
  let markers = "";
  sets.forEach((points, seriesIndex) => {
    const item = series[seriesIndex],
      itemColor = color(item.color, options.series.indexOf(item));
    const present = points.filter(
      (point): point is NonNullable<typeof point> => point !== undefined,
    );
    const pointTitle = (point: (typeof present)[number]) =>
      escape(
        `${String(point.row[options.labelKey] ?? "")} — ${item.label ?? item.key}: ${point.value}`,
      );
    if (options.type === "bar") {
      const sorted = present
          .map((point) => x(point.index))
          .sort((a, b) => a - b),
        deltas = sorted
          .slice(1)
          .map((value, index) => value - sorted[index])
          .filter((value) => value > 0);
      const slot = deltas.length
        ? deltas.reduce(
            (small, delta) => Math.min(small, delta),
            plotWidth / Math.max(1, options.data.length),
          )
        : plotWidth / Math.max(1, options.data.length);
      const barWidth = slot / (options.stacked ? 1.5 : series.length + 1);
      for (const point of present) {
        const base = options.stacked
          ? point.bottom
          : Math.max(
              yScale.min,
              Math.min(
                yScale.max,
                options.yAxis?.type === "log" ? yScale.min : 0,
              ),
            );
        const a = y(base),
          b = y(point.top);
        svg += `<rect data-part="bar" data-chart-index="${point.index}" x="${x(point.index) + (options.stacked ? -0.5 : seriesIndex - series.length / 2) * barWidth}" y="${Math.min(a, b)}" width="${Math.max(0.1, barWidth - 2)}" height="${Math.abs(a - b)}" fill="${itemColor}"><title>${pointTitle(point)}</title></rect>`;
      }
    } else {
      let group: typeof present = [],
        groups: (typeof present)[] = [];
      for (const point of points) {
        if (point) group.push(point);
        else if (group.length) {
          groups.push(group);
          group = [];
        }
      }
      if (group.length) groups.push(group);
      for (const group of groups) {
        if (continuous) group.sort((a, b) => xs[a.index]! - xs[b.index]!);
        const position = (
          point: (typeof group)[number],
          value = point.top,
        ): ChartPoint => ({
          x: xScale
            ? finiteCoordinate(xScale.position(xs[point.index]!))
            : (point.index + 0.5) / Math.max(1, options.data.length),
          y: finiteCoordinate(1 - yScale.position(value)),
        });
        const pixel = (point: ChartPoint) =>
          `${left + plotWidth * point.x} ${top + plotHeight * point.y}`;
        const upper = group
          .slice(1)
          .flatMap((point, index) => {
            const segment = clipChartLine(
              position(group[index]),
              position(point),
            );
            return segment
              ? [`M ${pixel(segment[0])} L ${pixel(segment[1])}`]
              : [];
          })
          .join(" ");
        if (options.type === "area") {
          const base = (point: (typeof group)[number]) =>
            options.stacked
              ? point.bottom
              : options.yAxis?.type === "log"
                ? yScale.min
                : Math.max(yScale.min, Math.min(yScale.max, 0));
          const polygon = clipChartPolygon([
            ...group.map((point) => position(point)),
            ...[...group]
              .reverse()
              .map((point) => position(point, base(point))),
          ]);
          const path = polygon
            .map((point, index) => `${index ? "L" : "M"} ${pixel(point)}`)
            .join(" ");
          svg += `<path data-part="area" d="${path}${polygon.length ? " Z" : ""}" fill="${itemColor}" fill-opacity="${options.stacked ? 0.5 : 0.16}" stroke="none"/>`;
        }
        if (options.type !== "scatter")
          svg += `<path data-part="line" d="${upper}" fill="none" stroke="${itemColor}" stroke-width="2" stroke-dasharray="${["", "6 3", "2 3"][options.series.indexOf(item) % 3]}"/>`;
      }
      for (const point of present)
        if (
          point.top >= yScale.min &&
          point.top <= yScale.max &&
          (!xScale ||
            (xs[point.index]! >= xScale.min && xs[point.index]! <= xScale.max))
        )
          markers += `<circle data-part="point" data-chart-index="${point.index}" cx="${x(point.index)}" cy="${y(point.top)}" r="${options.type === "scatter" ? 4 : 3}" fill="${itemColor}"><title>${pointTitle(point)}</title></circle>`;
    }
  });
  // 域内的边界点保留完整标记；曲线和面积继续裁切在绘图区。
  svg += "</svg>" + markers;
  if (xScale) {
    const allTicks = xScale.ticks.map((value) => ({
      value,
      label: chartAxisLabel(value, xAxis, number),
      position: left + xScale.position(value) * plotWidth,
    }));
    let stride = 1;
    const selectTicks = () =>
      allTicks.filter(
        (_, index) => index % stride === 0 || index === allTicks.length - 1,
      );
    const fits = (labels: typeof allTicks) =>
      labels.every((tick, index) => {
        if (!index) return true;
        const prior = labels[index - 1];
        const priorWidth = Math.min(96, textWidth(prior.label)),
          currentWidth = Math.min(96, textWidth(tick.label));
        const priorEnd =
          prior.position + (index === 1 ? priorWidth : priorWidth / 2);
        const currentStart =
          tick.position -
          (index === labels.length - 1 ? currentWidth : currentWidth / 2);
        return currentStart - priorEnd >= 12;
      });
    let selected = selectTicks();
    while (stride < allTicks.length - 1 && !fits(selected)) {
      stride *= 2;
      selected = selectTicks();
    }
    const available = Math.min(
      96,
      plotWidth / Math.max(1, selected.length - 1) - 16,
    );
    for (const { value, label, position } of selected)
      svg += `<text data-part="category-label" data-axis-value="${value}" x="${position}" y="${height - 14}" text-anchor="${value === xScale.min ? "start" : value === xScale.max ? "end" : "middle"}" fill="var(--lk-color-semantic-mutedforeground)" font-size="var(--lk-typography-fontsize-xs)">${escape(category(label, available))}<title>${escape(label)}</title></text>`;
  } else {
    const count = Math.min(
      options.data.length,
      Math.max(1, Math.floor(plotWidth / 96)),
    );
    for (let tick = 0; tick < count; tick++) {
      const index =
          count === 1
            ? Math.floor((options.data.length - 1) / 2)
            : Math.round((tick * (options.data.length - 1)) / (count - 1)),
        label = String(options.data[index][options.labelKey] ?? "");
      svg += `<text data-part="category-label" x="${x(index)}" y="${height - 14}" text-anchor="middle" fill="var(--lk-color-semantic-mutedforeground)" font-size="var(--lk-typography-fontsize-xs)">${escape(category(label, Math.min(96, plotWidth / Math.max(1, count) - 16, 2 * (x(index) - 4), 2 * (width - x(index) - 4))))}<title>${escape(label)}</title></text>`;
    }
  }
  return svg + "</svg>";
}
