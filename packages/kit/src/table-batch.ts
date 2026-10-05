import {
  dataTableLabels,
  validateDataTableDraft,
  type DataTableProps,
} from "./data-table";
import type { CellValue, DataRow } from "./data-models";
export interface DataTableBatchChange {
  rowId: string;
  columnKey: string;
  value: CellValue | undefined;
  previousValue: CellValue | undefined;
  row: Readonly<DataRow>;
}
export interface DataTableBatchState {
  active: boolean;
  pending: boolean;
  enabled: string[];
  drafts: Record<string, string>;
  error?: string;
  errorColumn?: string;
  undo: boolean;
  redo: boolean;
  undoCount: number;
  redoCount: number;
  count: number;
}
/** 一次回调包含完整变更集。事务是否落盘仍由调用方负责。 */
export function createDataTableBatchEditor(
  notify: (state: DataTableBatchState) => void,
  beforeBegin?: () => void,
) {
  let state: DataTableBatchState = {
    active: false,
    pending: false,
    enabled: [],
    drafts: {},
    undo: false,
    redo: false,
    undoCount: 0,
    redoCount: 0,
    count: 0,
  };
  let revision = 0,
    controller: AbortController | undefined;
  let ids: string[] = [],
    snapshot = "",
    validators: NonNullable<
      DataTableProps["columns"][number]["editor"]
    >["validate"][] = [];
  let schema = "",
    callback: DataTableProps["onBatchCommit"];
  const schemaStamp = (props: DataTableProps) =>
    JSON.stringify([
      props.rowKey,
      props.columnKeys,
      props.columns.map((column) => [
        column.key,
        column.editor?.type,
        column.editor?.rows,
        column.editor?.options,
      ]),
    ]);
  const undoHistory: DataTableBatchChange[][] = [];
  const redoHistory: DataTableBatchChange[][] = [];
  let latestProps: DataTableProps | undefined;
  const listeners = new Set<(focus?: "field" | "trigger") => void>();
  const rows = (props: DataTableProps) =>
    props.data.map((row, index) => ({
      row,
      id: String(row[props.rowKey ?? "id"] ?? index),
    }));
  const columns = (props: DataTableProps) =>
    props.columns.filter(
      (column) =>
        column.editor &&
        column.key !== (props.rowKey ?? "id") &&
        (props.columnKeys === undefined ||
          props.columnKeys.includes(column.key)) &&
        (column.editor.type !== "select" ||
          column.editor.options?.some((option) => !option.disabled)),
    );
  const stamp = (props: DataTableProps) =>
    JSON.stringify([
      ids,
      rows(props).filter((entry) => ids.includes(entry.id)),
      columns(props).map((column) => [
        column.key,
        column.editor?.type,
        column.editor?.rows,
        column.editor?.options,
      ]),
      props.loading,
    ]);
  const expected = (
    props: DataTableProps,
    changes: readonly DataTableBatchChange[],
  ) => {
    const source = rows(props);
    return [...new Set(changes.map((change) => change.rowId))].every((id) => {
      const current = source.find((entry) => entry.id === id)?.row;
      const group = changes.filter((change) => change.rowId === id);
      const row = { ...group[0].row };
      for (const change of group) {
        if (change.value === undefined) delete row[change.columnKey];
        else row[change.columnKey] = change.value;
      }
      return (
        !!current &&
        Object.keys(row).length === Object.keys(current).length &&
        Object.keys(row).every((key) => Object.is(row[key], current[key]))
      );
    });
  };
  const historyState = (props: DataTableProps, pending = state.pending) => ({
    undo:
      !pending &&
      !props.loading &&
      !!props.onBatchCommit &&
      !!undoHistory.length &&
      expected(props, undoHistory[undoHistory.length - 1]),
    redo:
      !pending &&
      !props.loading &&
      !!props.onBatchCommit &&
      !!redoHistory.length &&
      expected(props, redoHistory[redoHistory.length - 1]),
    undoCount: undoHistory.length,
    redoCount: redoHistory.length,
  });
  const limitHistory = (props: DataTableProps) => {
    const limit = Number.isFinite(props.historyLimit)
      ? Math.max(1, Math.min(1000, Math.floor(props.historyLimit!)))
      : 50;
    // 两个分支合计遵守上限。优先保留即将重做的批次，淘汰最旧撤销项。
    const overflow = Math.max(
      0,
      undoHistory.length + redoHistory.length - limit,
    );
    const removedUndo = Math.min(overflow, undoHistory.length);
    if (removedUndo) undoHistory.splice(0, removedUndo);
    if (overflow > removedUndo) redoHistory.splice(0, overflow - removedUndo);
  };
  let pendingChanges: DataTableBatchChange[] | undefined;
  const emit = (
    patch: Partial<DataTableBatchState>,
    focus?: "field" | "trigger",
  ) => {
    state = { ...state, ...patch };
    for (const listener of listeners) listener(focus);
    notify(state);
  };
  const cancel = () => {
    revision++;
    controller?.abort();
    controller = undefined;
    pendingChanges = undefined;
    if (state.active || state.pending)
      emit(
        {
          active: false,
          pending: false,
          error: undefined,
          errorColumn: undefined,
          ...(latestProps ? historyState(latestProps, false) : {}),
        },
        "trigger",
      );
  };
  const api = {
    get state() {
      return state;
    },
    columns,
    subscribe(listener: (focus?: "field" | "trigger") => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    begin(props: DataTableProps, selected: readonly string[]) {
      latestProps = props;
      if (
        state.pending ||
        props.loading ||
        !props.onBatchCommit ||
        !columns(props).length
      )
        return;
      ids = [...new Set(selected)];
      const source = rows(props);
      if (
        !ids.length ||
        ids.some((id) => !source.some((entry) => entry.id === id))
      )
        return;
      beforeBegin?.();
      snapshot = stamp(props);
      validators = columns(props).map((column) => column.editor?.validate);
      schema = schemaStamp(props);
      callback = props.onBatchCommit;
      emit(
        {
          active: true,
          pending: false,
          enabled: [],
          drafts: {},
          error: undefined,
          errorColumn: undefined,
          count: ids.length,
        },
        "field",
      );
    },
    enable(key: string, enabled: boolean) {
      if (!state.active || state.pending) return;
      emit(
        {
          enabled: enabled
            ? [...new Set([...state.enabled, key])]
            : state.enabled.filter((value) => value !== key),
          error: undefined,
          errorColumn: undefined,
        },
        "field",
      );
    },
    change(key: string, draft: string) {
      // 原生输入在键入时保留节点和选择范围；保存/错误时才通知渲染。
      if (state.active && !state.pending)
        state = {
          ...state,
          drafts: { ...state.drafts, [key]: draft },
          error: undefined,
          errorColumn: undefined,
        };
    },
    sync(props: DataTableProps, selected: readonly string[]) {
      latestProps = props;
      const available = columns(props);
      if (
        (state.active || state.pending) &&
        ((state.active &&
          (selected.length !== ids.length ||
            selected.some((id) => !ids.includes(id)))) ||
          !props.onBatchCommit ||
          props.onBatchCommit !== callback ||
          schemaStamp(props) !== schema ||
          available.length !== validators.length ||
          props.loading ||
          available.some(
            (column, index) => column.editor?.validate !== validators[index],
          ) ||
          (stamp(props) !== snapshot &&
            !(
              state.pending &&
              pendingChanges &&
              expected(props, pendingChanges)
            )))
      )
        cancel();
      limitHistory(props);
      const next = historyState(props);
      if (
        Object.entries(next).some(
          ([key, value]) => state[key as keyof DataTableBatchState] !== value,
        )
      )
        emit(next);
    },
    cancel,
    async save(
      props: DataTableProps,
      operation: boolean | "apply" | "undo" | "redo" = "apply",
    ) {
      if (state.pending || props.loading || !props.onBatchCommit) return;
      latestProps = props;
      const action =
        operation === true ? "undo" : operation === false ? "apply" : operation;
      const replay = action !== "apply";
      const history =
        action === "redo"
          ? redoHistory[redoHistory.length - 1]
          : undoHistory[undoHistory.length - 1];
      const labels = dataTableLabels(props.labels);
      let changes: DataTableBatchChange[] = [];
      if (replay) {
        if (!history || !expected(props, history)) {
          emit({ error: labels.batchConflict });
          return;
        }
        changes = history.map((change) => ({
          ...change,
          row: Object.freeze({
            ...rows(props).find((entry) => entry.id === change.rowId)!.row,
          }),
          value: change.previousValue,
          previousValue: change.value,
        }));
      } else {
        if (!state.active || stamp(props) !== snapshot) {
          cancel();
          return;
        }
        for (const entry of rows(props).filter((entry) =>
          ids.includes(entry.id),
        )) {
          const row = Object.freeze({ ...entry.row });
          for (const column of columns(props).filter((column) =>
            state.enabled.includes(column.key),
          )) {
            const result = validateDataTableDraft(
              props,
              column,
              state.drafts[column.key] ?? "",
              row,
            );
            if (result.error) {
              emit(
                {
                  error: `${entry.id} · ${column.label}: ${result.error}`,
                  errorColumn: column.key,
                },
                "field",
              );
              return;
            }
            if (!Object.is(row[column.key], result.value))
              changes.push({
                rowId: entry.id,
                columnKey: column.key,
                value: result.value,
                previousValue: row[column.key],
                row,
              });
          }
        }
        if (!changes.length) {
          emit({ error: labels.batchNoChanges }, "field");
          return;
        }
      }
      if (replay) {
        ids = [...new Set(changes.map((change) => change.rowId))];
        snapshot = stamp(props);
        schema = schemaStamp(props);
        callback = props.onBatchCommit;
        validators = columns(props).map((column) => column.editor?.validate);
      }
      const current = ++revision,
        abort = new AbortController();
      controller = abort;
      pendingChanges = changes;
      emit({
        pending: true,
        error: undefined,
        errorColumn: undefined,
        undo: false,
        redo: false,
      });
      const result = await new Promise<{ error?: string; canceled?: boolean }>(
        (resolve) => {
          const canceled = () => resolve({ canceled: true });
          abort.signal.addEventListener("abort", canceled, { once: true });
          Promise.resolve()
            .then(() => {
              if (!abort.signal.aborted)
                return props.onBatchCommit!({
                  changes: Object.freeze(
                    changes.map((change) => Object.freeze(change)),
                  ),
                  signal: abort.signal,
                  operation: action,
                });
            })
            .then(
              (message) => resolve({ error: message || undefined }),
              () => resolve({ error: labels.commitError }),
            )
            .finally(() => abort.signal.removeEventListener("abort", canceled));
        },
      );
      if (current !== revision || result.canceled) return;
      controller = undefined;
      pendingChanges = undefined;
      if (result.error)
        emit(
          {
            pending: false,
            error: result.error,
            errorColumn: undefined,
            ...historyState(latestProps ?? props, false),
          },
          "field",
        );
      else {
        if (action === "undo") {
          undoHistory.pop();
          redoHistory.push(changes);
        } else if (action === "redo") {
          redoHistory.pop();
          undoHistory.push(changes);
        } else {
          undoHistory.push(changes);
          redoHistory.length = 0;
        }
        limitHistory(latestProps ?? props);
        emit(
          {
            active: false,
            pending: false,
            enabled: [],
            drafts: {},
            ...historyState(latestProps ?? props, false),
            error: undefined,
            errorColumn: undefined,
          },
          "trigger",
        );
      }
    },
    dispose() {
      cancel();
      listeners.clear();
      undoHistory.length = 0;
      redoHistory.length = 0;
    },
  };
  return api;
}
const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ]!,
  );
/** 与 Chart 一致：共享结构标记由适配层渲染，挂载函数只接管交互/生命周期。 */
export function renderDataTableBatchMarkup(
  props: DataTableProps,
  selected: readonly string[],
  state: DataTableBatchState,
  id: string,
) {
  if (!props.onBatchCommit) return "";
  const labels = dataTableLabels(props.labels),
    text = escape;
  const fields = props.columns.filter(
    (column) =>
      column.editor &&
      column.key !== (props.rowKey ?? "id") &&
      (props.columnKeys === undefined ||
        props.columnKeys.includes(column.key)) &&
      (column.editor.type !== "select" ||
        column.editor.options?.some((option) => !option.disabled)),
  );
  const available =
    selected.length > 0 &&
    selected.every((key) =>
      props.data.some(
        (row, index) => String(row[props.rowKey ?? "id"] ?? index) === key,
      ),
    );
  const disabled = props.loading || state.pending;
  let body = `<div data-part="batch-actions"><button type="button" data-part="batch-trigger" ${disabled || !available || !fields.length ? "disabled" : ""}>${text(labels.batchEdit)}</button><button type="button" data-part="batch-undo" ${!state.undo || disabled ? "disabled" : ""}>${text(labels.batchUndo)}</button><button type="button" data-part="batch-redo" ${!state.redo || disabled ? "disabled" : ""}>${text(labels.batchRedo)}</button></div>`;
  if (state.active)
    body += `<form novalidate data-part="batch-form" aria-label="${text(labels.batchTitle)}" aria-busy="${state.pending}"><p>${text(labels.batchCount(state.count))}</p><div data-part="batch-fields">${fields
      .map((column, index) => {
        const enabled = state.enabled.includes(column.key),
          inputId = `${id}-field-${index}`,
          errorId = `${id}-error`,
          draft = state.drafts[column.key] ?? "";
        const attrs = `id="${text(inputId)}" data-column-key="${text(column.key)}" data-part="batch-input" ${state.errorColumn === column.key ? 'aria-invalid="true"' : ""} aria-describedby="${text(errorId)}" ${!enabled || disabled ? "disabled" : ""}`;
        const editor = column.editor!;
        const field =
          editor.type === "select"
            ? `<select ${attrs}><option value="" disabled ${!editor.options?.some((option) => option.value === draft) ? "selected" : ""}>${text(labels.invalidOption)}</option>${editor.options?.map((option) => `<option value="${text(option.value)}" ${option.disabled ? "disabled" : ""} ${draft === option.value ? "selected" : ""}>${text(option.label)}</option>`).join("") ?? ""}</select>`
            : editor.type === "textarea"
              ? `<textarea ${attrs} rows="${Math.max(2, Math.min(10, editor.rows ?? 3))}">${text(draft)}</textarea>`
              : `<input ${attrs} type="${editor.type === "number" ? "number" : "text"}" ${editor.type === "number" ? 'step="any"' : ""} value="${text(draft)}">`;
        return `<div data-part="batch-field"><label><input type="checkbox" data-part="batch-enable" data-column-key="${text(column.key)}" ${enabled ? "checked" : ""} ${disabled ? "disabled" : ""}>${text(labels.batchEnable(column.label))}</label><label for="${text(inputId)}">${text(column.label)}</label>${field}</div>`;
      })
      .join(
        "",
      )}</div><p id="${text(id)}-error" ${state.error ? 'role="alert"' : "hidden"}>${text(state.error ?? "")}</p><div data-part="batch-actions"><button type="submit" ${disabled ? "disabled" : ""}>${text(state.pending ? labels.saving : labels.batchApply)}</button><button type="button" data-part="batch-cancel">${text(labels.cancel)}</button></div></form>`;
  else if (state.error) body += `<p role="alert">${text(state.error)}</p>`;
  return body;
}
export function mountDataTableBatch(
  host: HTMLElement,
  editor: ReturnType<typeof createDataTableBatchEditor>,
  props: () => DataTableProps,
  selected: () => readonly string[],
) {
  const win = host.ownerDocument.defaultView;
  if (!win) return () => {};
  let frame = 0;
  const stop = editor.subscribe((focus) => {
    if (
      !focus ||
      (!host.contains(host.ownerDocument.activeElement) &&
        host.ownerDocument.activeElement !== host.ownerDocument.body)
    )
      return;
    win.cancelAnimationFrame(frame);
    frame = win.requestAnimationFrame(() => {
      if (
        !host.isConnected ||
        (!host.contains(host.ownerDocument.activeElement) &&
          host.ownerDocument.activeElement !== host.ownerDocument.body)
      )
        return;
      const target =
        focus === "trigger"
          ? host.querySelector<HTMLElement>('[data-part="batch-trigger"]')
          : (host.querySelector<HTMLElement>(
              '[data-part="batch-input"][aria-invalid="true"]:not(:disabled)',
            ) ??
            host.querySelector<HTMLElement>(
              '[data-part="batch-input"]:not(:disabled)',
            ) ??
            host.querySelector<HTMLElement>(
              '[data-part="batch-enable"]:not(:disabled)',
            ));
      target?.focus();
    });
  });
  const input = (event: Event) => {
    const target = event.target;
    if (!(
      target instanceof win.HTMLInputElement ||
      target instanceof win.HTMLSelectElement ||
      target instanceof win.HTMLTextAreaElement
    ))
      return;
    const key = target.dataset.columnKey;
    if (!key) return;
    if (
      target instanceof win.HTMLInputElement &&
      target.dataset.part === "batch-enable"
    )
      editor.enable(key, target.checked);
    else if (target.dataset.part === "batch-input")
      editor.change(key, target.value);
  };
  const click = (event: Event) => {
    if (!(event.target instanceof win.Element)) return;
    const button = event.target.closest("button[data-part]");
    const part = button?.getAttribute("data-part");
    if (part === "batch-trigger") editor.begin(props(), selected());
    if (part === "batch-undo") void editor.save(props(), "undo");
    if (part === "batch-redo") void editor.save(props(), "redo");
    if (part === "batch-cancel") editor.cancel();
  };
  const submit = (event: Event) => {
    event.preventDefault();
    void editor.save(props());
  };
  const keydown = (event: KeyboardEvent) => {
    if (event.isComposing) return;
    // 保留输入控件自己的撤销历史，表格操作区使用平台惯例。
    const target = event.target;
    const typing =
      target instanceof win.Element &&
      !!target.closest(
        'input,textarea,select,[contenteditable]:not([contenteditable="false"])',
      );
    if (!typing && !editor.state.active && (event.ctrlKey || event.metaKey)) {
      const action =
        event.key.toLowerCase() === "z"
          ? event.shiftKey
            ? "redo"
            : "undo"
          : event.key.toLowerCase() === "y"
            ? "redo"
            : undefined;
      if (action && editor.state[action]) {
        event.preventDefault();
        void editor.save(props(), action);
      }
    }
    if (!editor.state.active) return;
    if (event.key === "Escape") {
      event.preventDefault();
      editor.cancel();
    }
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      void editor.save(props());
    }
  };
  host.addEventListener("change", input);
  host.addEventListener("input", input);
  host.addEventListener("click", click);
  host.addEventListener("submit", submit);
  host.addEventListener("keydown", keydown);
  return () => {
    stop();
    win.cancelAnimationFrame(frame);
    host.removeEventListener("change", input);
    host.removeEventListener("input", input);
    host.removeEventListener("click", click);
    host.removeEventListener("submit", submit);
    host.removeEventListener("keydown", keydown);
    editor.dispose();
  };
}
