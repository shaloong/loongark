import type { DataColumn, DataRow } from "@loongark/kit";
export const columnLayoutColumns: readonly DataColumn[] = [
  { key: "name", label: "Project", minWidth: 120, maxWidth: 480 },
  { key: "owner", label: "Owner", minWidth: 96, maxWidth: 320 },
  { key: "status", label: "Status", minWidth: 96, maxWidth: 280 },
  {
    key: "revenue",
    label: "Revenue",
    align: "end",
    minWidth: 96,
    maxWidth: 320,
  },
];
export const columnLayoutRows: readonly DataRow[] = [
  {
    id: "atlas",
    name: "Atlas design system",
    owner: "Design",
    status: "Active",
    revenue: 2400,
    notes: "Ready for review",
  },
  {
    id: "mobile",
    name: "Mobile workspace with a longer project name",
    owner: "Platform",
    status: "Review",
    revenue: 1800,
    notes: "Keyboard and screen-reader checks",
  },
  {
    id: "docs",
    name: "Accessible component documentation",
    owner: "Design",
    status: "Planned",
    revenue: 900,
    notes: "Clear reading order",
  },
];
const initialKeys = () => columnLayoutColumns.map((column) => column.key);
export const columnLayoutDefaultWidths = {
  name: 240,
  owner: 160,
  status: 128,
  revenue: 140,
};
const initialWidths = () => ({ ...columnLayoutDefaultWidths });
const notesColumn: DataColumn = {
  key: "notes",
  label: "Notes",
  minWidth: 120,
  maxWidth: 360,
};
export function createColumnLayoutDemo(notify: () => void) {
  let keys = initialKeys(),
    widths: Record<string, number> = initialWidths();
  let reject = false,
    controlled = true,
    loading = false,
    rtl = false,
    shown = true,
    pinned = false,
    extra = false,
    hiddenRevenue = false;
  let count = 0,
    notice = "No column updates";
  const toggle =
    (key: "reject" | "controlled" | "loading" | "rtl" | "shown" | "pinned") =>
    () => {
      if (key === "reject") reject = !reject;
      if (key === "controlled") controlled = !controlled;
      if (key === "loading") loading = !loading;
      if (key === "rtl") rtl = !rtl;
      if (key === "shown") shown = !shown;
      if (key === "pinned") pinned = !pinned;
      notify();
    };
  return {
    get snapshot() {
      return {
        keys: hiddenRevenue ? keys.filter((key) => key !== "revenue") : keys,
        columns: extra
          ? [...columnLayoutColumns, notesColumn]
          : columnLayoutColumns,
        widths,
        reject,
        controlled,
        loading,
        rtl,
        shown,
        pinned,
        extra,
        hiddenRevenue,
        count,
        notice,
      };
    },
    order(next: string[]) {
      count++;
      if (reject && controlled) notice = "Rejected column order";
      else {
        keys = hiddenRevenue ? [...next, "revenue"] : [...next];
        notice = `Accepted order: ${next.join(", ")}`;
      }
      notify();
    },
    resize(next: Record<string, number>) {
      count++;
      if (reject && controlled) notice = "Rejected column widths";
      else {
        widths = { ...next };
        notice = "Accepted column widths";
      }
      notify();
    },
    toggleReject: toggle("reject"),
    toggleControlled: toggle("controlled"),
    toggleLoading: toggle("loading"),
    toggleRtl: toggle("rtl"),
    toggleShown: toggle("shown"),
    togglePinned: toggle("pinned"),
    toggleExtra() {
      extra = !extra;
      keys = extra
        ? [...keys.filter((key) => key !== "notes"), "notes"]
        : keys.filter((key) => key !== "notes");
      notify();
    },
    toggleRevenue() {
      hiddenRevenue = !hiddenRevenue;
      notify();
    },
    reset() {
      keys = initialKeys();
      widths = initialWidths();
      reject = false;
      controlled = true;
      loading = false;
      rtl = false;
      pinned = false;
      extra = false;
      hiddenRevenue = false;
      count = 0;
      notice = "No column updates";
      notify();
    },
  };
}
