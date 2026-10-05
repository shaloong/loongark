import type { DataColumn, DataRow, DataTableState } from "@loongark/kit";
export const queryColumns: readonly DataColumn[] = [
  { key: "name", label: "Project", filter: { type: "text" } },
  {
    key: "team",
    label: "Team",
    filter: {
      type: "select",
      options: [
        { value: "Design", label: "Design" },
        { value: "Engineering", label: "Engineering" },
        { value: "", label: "Unassigned" },
        { value: "Archived", label: "Archived", disabled: true },
      ],
    },
  },
  { key: "amount", label: "Revenue", align: "end", filter: { type: "number" } },
];
export const queryRows: readonly DataRow[] = [
  { id: "a", name: "Alpha", team: "Design", amount: 20 },
  { id: "b", name: "Beta", team: "Engineering", amount: 10 },
  { id: "c", name: "Gamma", team: "Design", amount: 35 },
  { id: "d", name: "Delta", team: "Engineering", amount: 15 },
  { id: "e", name: "Epsilon", team: "Design", amount: 20 },
  { id: "f", name: "Zeta", team: "", amount: 8 },
];
export function createDataTableQueryDemo(update: () => void) {
  let state: DataTableState = { query: "", page: 1 },
    locked = false,
    loading = false,
    shown = true;
  return {
    get snapshot() {
      return { state, locked, loading, shown };
    },
    change(next: DataTableState) {
      if (!locked) {
        state = next;
        update();
      }
    },
    reset() {
      state = { query: "", page: 1 };
      update();
    },
    toggleLocked() {
      locked = !locked;
      update();
    },
    toggleLoading() {
      loading = !loading;
      update();
    },
    toggleShown() {
      shown = !shown;
      update();
    },
  };
}
