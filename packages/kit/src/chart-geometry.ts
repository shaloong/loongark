export interface ChartPoint {
  x: number;
  y: number;
}
/** 在归一化域裁剪，再转换像素，避免巨大域外坐标溢出。 */
const edges = [
  { axis: "x", bound: 0, lower: true },
  { axis: "x", bound: 1, lower: false },
  { axis: "y", bound: 0, lower: true },
  { axis: "y", bound: 1, lower: false },
] as const;
const inside = (point: ChartPoint, edge: (typeof edges)[number]) =>
  edge.lower ? point[edge.axis] >= edge.bound : point[edge.axis] <= edge.bound;
function intersect(
  a: ChartPoint,
  b: ChartPoint,
  edge: (typeof edges)[number],
): ChartPoint {
  const scale = Math.max(1, Math.abs(a[edge.axis]), Math.abs(b[edge.axis]));
  const t = Math.min(
    1,
    Math.max(
      0,
      (edge.bound / scale - a[edge.axis] / scale) /
        (b[edge.axis] / scale - a[edge.axis] / scale),
    ),
  );
  const other = edge.axis === "x" ? "y" : "x";
  return {
    ...a,
    [edge.axis]: edge.bound,
    [other]: a[other] * (1 - t) + b[other] * t,
  };
}
export function clipChartLine(
  start: ChartPoint,
  end: ChartPoint,
): readonly [ChartPoint, ChartPoint] | undefined {
  let a = start,
    b = end;
  for (const edge of edges) {
    const first = inside(a, edge),
      last = inside(b, edge);
    if (!first && !last) return;
    if (first !== last) {
      const point = intersect(a, b, edge);
      if (first) b = point;
      else a = point;
    }
  }
  return [a, b];
}
export function clipChartPolygon(points: readonly ChartPoint[]): ChartPoint[] {
  let result = [...points];
  for (const edge of edges) {
    const input = result;
    result = [];
    if (!input.length) break;
    let previous = input[input.length - 1];
    for (const current of input) {
      const a = inside(previous, edge),
        b = inside(current, edge);
      if (a !== b) result.push(intersect(previous, current, edge));
      if (b) result.push(current);
      previous = current;
    }
  }
  return result;
}
