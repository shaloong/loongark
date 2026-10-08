import type { DataColumn, DataRow } from "@loongark/kit";
export const frozenColumns: readonly DataColumn[] = [
  { key: "name", label: "Project" },
  { key: "owner", label: "Owner" },
  { key: "status", label: "Status" },
  { key: "notes", label: "Release notes", sortable: false },
  { key: "amount", label: "Revenue" },
];
export const frozenRows: readonly DataRow[] = [
  {
    id: "a",
    name: "Alpha",
    owner: "Maya Chen",
    status: "In review",
    notes: "Accessibility audit complete · waiting for the product review",
    amount: 2400,
  },
  {
    id: "b",
    name: "Beta",
    owner: "Alex Morgan",
    status: "Ready",
    notes: "Keyboard navigation verified · release scheduled for Friday",
    amount: 1800,
  },
  {
    id: "c",
    name: "Gamma",
    owner: "Sam Rivera",
    status: "In progress",
    notes: "Responsive layout refinements · mobile screenshots reviewed",
    amount: 3600,
  },
];
export const frozenTitle = "Keep projects in view";
export const frozenDescription =
  "Scroll across release details while project names and revenue stay visible.";
export const frozenKeys = (owner: boolean, reversed: boolean) =>
  (reversed
    ? ["name", "notes", "status", "owner", "amount"]
    : frozenColumns.map((c) => c.key)
  ).filter((key) => owner || key !== "owner");
export const frozenPins = (enabled: boolean, extra: boolean) =>
  enabled
    ? { start: extra ? ["name", "owner"] : ["name"], end: ["amount"] }
    : undefined;
