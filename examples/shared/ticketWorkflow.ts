import type { DataColumn, DataRow } from "@shaloong/loongark-kit";

export interface Ticket extends DataRow {
  id: string;
  title: string;
  email: string;
  status: "待处理" | "已解决";
}
export const ticketColumns: readonly DataColumn[] = [
  { key: "id", label: "工单编号" },
  { key: "title", label: "标题" },
  { key: "email", label: "联系邮箱" },
  { key: "status", label: "状态" },
];
const initialTickets: readonly Ticket[] = [
  {
    id: "T-101",
    title: "更新项目文档",
    email: "docs@example.com",
    status: "待处理",
  },
  {
    id: "T-102",
    title: "完善移动端导航",
    email: "design@example.com",
    status: "待处理",
  },
  {
    id: "T-103",
    title: "补齐主题说明",
    email: "theme@example.com",
    status: "已解决",
  },
];
type Errors = Partial<Record<"title" | "email", string>>;
interface State {
  rows: readonly Ticket[];
  query: string;
  status: string;
  selectedIds: string[];
  draft: Ticket | null;
  open: boolean;
  pending: boolean;
  errors: Errors;
  failure: string;
  notification: string;
  failNext: boolean;
}
type SaveTicket = (ticket: Ticket, signal: AbortSignal) => Promise<void>;

const localSave: SaveTicket = (_ticket, signal) =>
  new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      signal.removeEventListener("abort", abort);
      resolve();
    }, 250);
    function abort() {
      clearTimeout(timer);
      reject(new DOMException("已取消", "AbortError"));
    }
    if (signal.aborted) abort();
    else signal.addEventListener("abort", abort, { once: true });
  });

export function createTicketWorkflow(
  changed: () => void,
  saveTicket: SaveTicket = localSave,
) {
  let state: State = {
    rows: initialTickets,
    query: "",
    status: "",
    selectedIds: [],
    draft: null,
    open: false,
    pending: false,
    errors: {},
    failure: "",
    notification: "",
    failNext: false,
  };
  let active: AbortController | undefined;
  let disposed = false;
  const update = (patch: Partial<State>) => {
    if (!disposed) {
      state = { ...state, ...patch };
      changed();
    }
  };
  const visibleRows = () =>
    state.rows.filter(
      (row) =>
        (!state.status || row.status === state.status) &&
        `${row.id} ${row.title} ${row.email}`
          .toLocaleLowerCase()
          .includes(state.query.trim().toLocaleLowerCase()),
    );
  function setOpen(open: boolean) {
    if (!open) {
      active?.abort();
      active = undefined;
      update({
        open: false,
        pending: false,
        draft: null,
        errors: {},
        failure: "",
      });
      return;
    }
    const row = state.rows.find((row) => row.id === state.selectedIds[0]);
    if (state.selectedIds.length === 1 && row)
      update({ open: true, draft: { ...row }, errors: {}, failure: "" });
  }
  return {
    get state() {
      return state;
    },
    get visibleRows() {
      return visibleRows();
    },
    activate() {
      disposed = false;
    },
    setQuery: (query: string) => update({ query, selectedIds: [] }),
    setStatus: (status: string) => update({ status, selectedIds: [] }),
    select: (selectedIds: string[]) => update({ selectedIds }),
    setOpen,
    setDraft: (key: "title" | "email", value: string) => {
      if (state.draft && !state.pending)
        update({
          draft: { ...state.draft, [key]: value },
          errors: { ...state.errors, [key]: undefined },
          failure: "",
        });
    },
    reset() {
      if (!state.pending && state.draft) {
        const original = state.rows.find((row) => row.id === state.draft?.id);
        if (original)
          update({ draft: { ...original }, errors: {}, failure: "" });
      }
    },
    failNext: () => update({ failNext: !state.failNext }),
    async submit() {
      if (!state.draft || state.pending || disposed) return;
      const draft = {
        ...state.draft,
        title: state.draft.title.trim(),
        email: state.draft.email.trim(),
      };
      const errors: Errors = {};
      if (draft.title.length < 3) errors.title = "标题至少需要 3 个字符";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email))
        errors.email = "请输入有效的联系邮箱";
      update({ errors, failure: "" });
      if (Object.keys(errors).length) return "invalid";
      const controller = new AbortController();
      active = controller;
      const fail = state.failNext;
      update({ pending: true, failNext: false });
      try {
        if (fail) await localSave(draft, controller.signal);
        else await saveTicket(draft, controller.signal);
        if (disposed || active !== controller || controller.signal.aborted)
          return "aborted";
        if (fail) throw Error("模拟服务暂不可用");
        active = undefined;
        update({
          rows: state.rows.map((row) => (row.id === draft.id ? draft : row)),
          open: false,
          pending: false,
          draft: null,
          notification: `已保存工单 ${draft.id}`,
        });
        return "saved";
      } catch {
        if (disposed || active !== controller || controller.signal.aborted)
          return "aborted";
        active = undefined;
        update({ pending: false, failure: "保存失败，草稿已保留，请重试" });
        return "failed";
      }
    },
    focusError(form: HTMLFormElement) {
      const name = state.errors.title
        ? "title"
        : state.errors.email
          ? "email"
          : undefined;
      const control = name ? form.elements.namedItem(name) : null;
      if (control instanceof HTMLElement) control.focus();
    },
    dispose() {
      disposed = true;
      active?.abort();
      active = undefined;
    },
  };
}
