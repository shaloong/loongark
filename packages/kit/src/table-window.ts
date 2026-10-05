import { virtualViewportHeight } from "./virtual-window";
import type { DataTableProps, dataTableView } from "./data-table";
import type {
  VirtualWindowState,
  VirtualWindowOptions,
} from "./virtual-window";
export function dataTableVirtualOptions(
  props: DataTableProps,
  view: ReturnType<typeof dataTableView>,
): VirtualWindowOptions {
  return {
    ...props.virtualization,
    height: virtualViewportHeight(props.virtualization),
    keys: props.virtualization ? view.rows.map((row) => row.id) : [],
    contextKey: JSON.stringify([
      view.query,
      view.sorts,
      view.filters,
      view.page,
    ]),
  };
}
export function dataTableVirtualRows(
  view: ReturnType<typeof dataTableView>,
  window?: VirtualWindowState,
) {
  if (!window)
    return view.rows.map((row, virtualIndex) => ({
      ...row,
      virtualIndex,
      gap: 0,
    }));
  const rows = new Map(view.rows.map((row) => [row.id, row]));
  return window.entries.flatMap((entry) => {
    const row = rows.get(entry.key);
    return row ? [{ ...row, virtualIndex: entry.index, gap: entry.gap }] : [];
  });
}
export function dataTableVirtualStyle(props: DataTableProps) {
  return props.virtualization
    ? {
        height: `${virtualViewportHeight(props.virtualization)}px`,
        "--lk-data-table-column-count": props.columns.filter(
          (column) =>
            props.columnKeys === undefined ||
            props.columnKeys.includes(column.key),
        ).length,
      }
    : undefined;
}
export function dataTableVirtualInset(viewport: HTMLElement) {
  const body = viewport.querySelector("tbody");
  return body
    ? Math.max(
        0,
        body.getBoundingClientRect().top -
          viewport.getBoundingClientRect().top -
          viewport.clientTop +
          viewport.scrollTop,
      )
    : 0;
}
