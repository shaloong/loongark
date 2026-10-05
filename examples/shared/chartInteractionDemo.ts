import type { ChartOptions, ChartRange, DataRow } from "@loongark/kit";
const initial = (): readonly DataRow[] =>
  Array.from({ length: 12 }, (_, index) => ({
    id: `sample-${index}`,
    label: `Sample ${String(index + 1).padStart(2, "0")}${index % 4 === 0 ? " · Longer category for compact layouts" : ""}`,
    primary: index === 3 ? null : 30 + index * 4,
    secondary: 18 + index * 3,
  }));
export function createChartInteractionDemo(changed: () => void) {
  let data = initial(),
    range: ChartRange = [0, 11],
    controlled = true,
    reject = false,
    disabled = false,
    shown = true,
    type: NonNullable<ChartOptions["type"]> = "line",
    next = 12,
    status = "All categories",
    timer: ReturnType<typeof setInterval> | undefined;
  const append = () => {
    const index = next++;
    data = [
      ...data,
      {
        id: `sample-${index}`,
        label: `Sample ${String(index + 1).padStart(2, "0")}`,
        primary: 30 + index * 4,
        secondary: 18 + index * 3,
      },
    ];
    changed();
  };
  const stop = () => {
    if (timer !== undefined) clearInterval(timer);
    timer = undefined;
  };
  return {
    series: [
      { key: "primary", label: "Primary" },
      { key: "secondary", label: "Secondary" },
    ] satisfies ChartOptions["series"],
    get state() {
      return {
        data,
        range,
        controlled,
        reject,
        disabled,
        shown,
        type,
        status,
        streaming: timer !== undefined,
      };
    },
    onRangeChange(nextRange: ChartRange) {
      if (reject) {
        status = "Range change rejected";
        changed();
        return;
      }
      range = nextRange;
      status = `Accepted indices ${nextRange[0]}–${nextRange[1]}`;
      changed();
    },
    append,
    trim() {
      data = data.slice(0, Math.max(1, Math.floor(data.length / 2)));
      changed();
    },
    toggleData() {
      data = data.length ? [] : initial();
      if (data.length) {
        next = 12;
        range = [0, data.length - 1];
      }
      changed();
    },
    toggleControlled() {
      controlled = !controlled;
      changed();
    },
    toggleReject() {
      reject = !reject;
      changed();
    },
    toggleDisabled() {
      disabled = !disabled;
      changed();
    },
    toggleShown() {
      shown = !shown;
      changed();
    },
    toggleType() {
      type = type === "line" ? "bar" : "line";
      changed();
    },
    toggleStream() {
      if (timer !== undefined) stop();
      else timer = setInterval(append, 800);
      changed();
    },
    dispose() {
      stop();
    },
  };
}
