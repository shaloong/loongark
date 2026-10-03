import type { SvelteComponent } from "svelte";
import type { DataRow, DataColumn } from "@loongark/kit";
export default class DataTable extends SvelteComponent<{
  data: readonly DataRow[];
  columns: readonly DataColumn[];
  pageSize?: number;
  rowKey?: string;
  onSelectionChange?: (ids: string[]) => void;
}> {}
