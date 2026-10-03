import type { DataRow, DataColumn } from "@loongark/kit";
export const projectRows: readonly DataRow[] = [
  {
    id: "a",
    name: "Alpha — International-accessibility-workspace-with-a-long-project-name",
    owner: "Design",
    amount: 20,
  },
  { id: "b", name: "Beta", owner: "Engineering", amount: 10 },
  { id: "c", name: "Gamma", owner: "Research", amount: 35 },
  { id: "d", name: "Delta", owner: "Support", amount: 15 },
];
export const projectColumns: readonly DataColumn[] = [
  { key: "name", label: "Project" },
  { key: "owner", label: "Owner", sortable: false },
  { key: "amount", label: "Revenue" },
];
export const queueRows: readonly DataRow[] = [
  { id: "a", name: "Alpha", amount: 20 },
  { id: "b", name: "Beta", amount: 10 },
  { id: "c", name: "Gamma", amount: 35 },
];
export const queueColumns: readonly DataColumn[] = [
  { key: "name", label: "Project" },
  { key: "amount", label: "Revenue" },
];
