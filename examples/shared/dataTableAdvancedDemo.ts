import {
  createDataTableView,
  type DataRow,
  type DataTableState,
} from "@loongark/kit";
export const remoteColumns = [
  { key: "name", label: "Project" },
  { key: "owner", label: "Owner", sortable: false },
  { key: "amount", label: "Revenue" },
];
export const remoteRows: readonly DataRow[] = [
  { id: "a", name: "Alpha", owner: "Design", amount: 20 },
  { id: "b", name: "Beta", owner: "Engineering", amount: 10 },
  { id: "c", name: "Gamma", owner: "Research", amount: 35 },
  { id: "d", name: "Delta", owner: "Support", amount: 15 },
  { id: "e", name: "Epsilon", owner: "Design", amount: 28 },
  { id: "f", name: "Zeta", owner: "Engineering", amount: 8 },
];
export const initialRemoteState: DataTableState = { query: "", page: 1 };
export interface RemoteSnapshot {
  data: readonly DataRow[];
  totalRows: number;
  loading: boolean;
  error?: string;
}
export function remoteSnapshot(state: DataTableState): RemoteSnapshot {
  const model = createDataTableView(remoteRows, remoteColumns, {
    ...state,
    pageSize: 2,
  });
  return {
    data: model.rows.map((x) => x.row),
    totalRows: model.total,
    loading: false,
  };
}
/** 示例模拟服务端；请求取消与生命周期属于调用方，组件不持有业务接口。 */
export function createProjectSource(
  update: (snapshot: RemoteSnapshot) => void,
) {
  let controller: AbortController | undefined,
    version = 0,
    disposed = false;
  let snapshot = remoteSnapshot(initialRemoteState);
  return {
    request(state: DataTableState, fail = false, delay = 180) {
      if (disposed) return;
      controller?.abort();
      const abort = new AbortController();
      controller = abort;
      const request = ++version;
      update({ ...snapshot, loading: true, error: undefined });
      const timer = setTimeout(() => {
        if (disposed || abort.signal.aborted || request !== version) return;
        if (!fail) snapshot = remoteSnapshot(state);
        update(
          fail ? { ...snapshot, error: "Could not load projects." } : snapshot,
        );
      }, delay);
      abort.signal.addEventListener("abort", () => clearTimeout(timer), {
        once: true,
      });
    },
    dispose() {
      disposed = true;
      version++;
      controller?.abort();
      controller = undefined;
    },
  };
}
