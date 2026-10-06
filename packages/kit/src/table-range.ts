import {
  dataTableLabels,
  dataTableCellText,
  type DataTableProps,
  type dataTableView,
  type createDataTableEditor,
} from "./data-table";
import type { createDataTableBatchEditor } from "./table-batch";
import type { createVirtualWindow } from "./virtual-window";
import { controlIcons } from "./icon";
export interface DataTableCellSelectionOptions {
  cellSelection?: boolean;
  cellRange?: DataTableCellRange | null;
  defaultCellRange?: DataTableCellRange | null;
  onCellRangeChange?: (range: DataTableCellRange | null) => void;
}
export interface DataTableCellSelectionLabels {
  rangeHint: string;
  rangeSelected: (count: number) => string;
  pasteInvalid: string;
  pasteMismatch: string;
  pasteOutside: string;
  pasteTooLarge: string;
  pasteReadonly: string;
  copiedCells: (count: number) => string;
  pastedCells: (count: number) => string;
  pasteCanceled: string;
}
class TableClipboardError extends Error {
  constructor(
    readonly code:
      | "pasteTooLarge"
      | "pasteInvalid"
      | "pasteMismatch"
      | "pasteOutside"
      | "batchConflict",
  ) {
    super(code);
  }
}
export interface DataTableCellAddress {
  rowId: string;
  columnKey: string;
}
export interface DataTableCellRange {
  anchor: DataTableCellAddress;
  focus: DataTableCellAddress;
}
type View = ReturnType<typeof dataTableView>;
export const copyDataTableCellRange = (range?: DataTableCellRange | null) =>
  range
    ? { anchor: { ...range.anchor }, focus: { ...range.focus } }
    : undefined;
export function resolveDataTableCellRange(
  view: View,
  range?: DataTableCellRange | null,
) {
  const rows = view.rows.filter((entry) => entry.structure?.kind !== "group");
  if (!range) return undefined;
  const aRow = rows.findIndex((entry) => entry.id === range.anchor.rowId),
    bRow = rows.findIndex((entry) => entry.id === range.focus.rowId),
    aCol = view.columns.findIndex(
      (column) => column.key === range.anchor.columnKey,
    ),
    bCol = view.columns.findIndex(
      (column) => column.key === range.focus.columnKey,
    );
  if (Math.min(aRow, bRow, aCol, bCol) < 0) return undefined;
  const top = Math.min(aRow, bRow),
    bottom = Math.max(aRow, bRow),
    left = Math.min(aCol, bCol),
    right = Math.max(aCol, bCol);
  return {
    rows,
    top,
    bottom,
    left,
    right,
    count: (bottom - top + 1) * (right - left + 1),
  };
}
/** 文本长度按 UTF-16 码元计，避免不受限复制和粘贴分配。 */
export function parseDataTableClipboard(text: string) {
  if (text.length > 1048576) throw new TableClipboardError("pasteTooLarge");
  const rows: string[][] = [];
  let row: string[] = [],
    cell = "",
    quoted = false,
    closed = false,
    cells = 0,
    width = 0;
  const field = () => {
    if (++cells > 10000) throw new TableClipboardError("pasteTooLarge");
    row.push(cell);
    cell = "";
    closed = false;
  };
  const line = () => {
    field();
    width = Math.max(width, row.length);
    rows.push(row);
    row = [];
  };
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i++;
        } else {
          quoted = false;
          closed = true;
        }
      } else cell += c;
      continue;
    }
    if (c === "\t") {
      field();
      continue;
    }
    if (c === "\r" || c === "\n") {
      line();
      if (c === "\r" && text[i + 1] === "\n") i++;
      continue;
    }
    if (closed) throw new TableClipboardError("pasteInvalid");
    if (c === '"' && !cell) {
      quoted = true;
      continue;
    }
    cell += c;
  }
  if (quoted) throw new TableClipboardError("pasteInvalid");
  if (row.length || cell || closed || !rows.length) line();
  if (rows.length * width > 10000)
    throw new TableClipboardError("pasteTooLarge");
  return rows.map((row) =>
    Array.from({ length: width }, (_, i) => row[i] ?? ""),
  );
}
export const formatDataTableClipboard = (
  rows: readonly (readonly string[])[],
) =>
  rows
    .map((row) =>
      row
        .map((text) =>
          /[\t\r\n"]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text,
        )
        .join("\t"),
    )
    .join("\n");
/** 不截断越界内容；大范围只允许恰好平铺，所有字段统一交给事务校验。 */
export function createDataTablePaste(
  view: View,
  range: DataTableCellRange,
  text: string,
) {
  const bounds = resolveDataTableCellRange(view, range);
  if (!bounds) throw new TableClipboardError("batchConflict");
  const matrix = parseDataTableClipboard(text),
    height = matrix.length,
    width = matrix[0].length;
  const selectionHeight = bounds.bottom - bounds.top + 1,
    selectionWidth = bounds.right - bounds.left + 1;
  const tile = bounds.count > 1;
  if (tile && (selectionHeight % height || selectionWidth % width))
    throw new TableClipboardError("pasteMismatch");
  const targetHeight = tile ? selectionHeight : height,
    targetWidth = tile ? selectionWidth : width;
  if (
    bounds.top + targetHeight > bounds.rows.length ||
    bounds.left + targetWidth > view.columns.length
  )
    throw new TableClipboardError("pasteOutside");
  if (targetHeight * targetWidth > 10000)
    throw new TableClipboardError("pasteTooLarge");
  const cells = [];
  for (let row = 0; row < targetHeight; row++)
    for (let column = 0; column < targetWidth; column++)
      cells.push({
        rowId: bounds.rows[bounds.top + row].id,
        columnKey: view.columns[bounds.left + column].key,
        draft: matrix[row % height][column % width],
      });
  return {
    cells,
    range: {
      anchor: {
        rowId: bounds.rows[bounds.top].id,
        columnKey: view.columns[bounds.left].key,
      },
      focus: {
        rowId: bounds.rows[bounds.top + targetHeight - 1].id,
        columnKey: view.columns[bounds.left + targetWidth - 1].key,
      },
    },
  };
}
const escapeCell = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ]!,
  );
/** SSR 与挂载共用范围边界；一次建立索引，避免每个单元格遍历全部行。 */
export function dataTableCellSelectionView(props: DataTableProps, view: View) {
  if (!props.cellSelection) return undefined;
  const rows = view.rows.filter((entry) => entry.structure?.kind !== "group"),
    rowIndex = new Map(rows.map((entry, index) => [entry.id, index])),
    columnIndex = new Map(
      view.columns.map((column, index) => [column.key, index]),
    );
  const range =
      props.cellRange === undefined ? props.defaultCellRange : props.cellRange,
    bounds = resolveDataTableCellRange(view, range),
    active = bounds
      ? range!.focus
      : rows.length && view.columns.length
        ? { rowId: rows[0].id, columnKey: view.columns[0].key }
        : undefined;
  return {
    attributes(rowId: string, columnKey: string) {
      const row = rowIndex.get(rowId),
        column = columnIndex.get(columnKey);
      if (row === undefined || column === undefined) return {};
      const selected =
        !!bounds &&
        row >= bounds.top &&
        row <= bounds.bottom &&
        column >= bounds.left &&
        column <= bounds.right;
      return {
        role: "gridcell" as const,
        "data-cell-row": rowId,
        "data-cell-column": columnKey,
        "aria-colindex": column + 2,
        "aria-selected": selected,
        "data-cell-selected": selected ? "true" : undefined,
        "data-range-edge": selected
          ? [
              row === bounds!.top ? "top" : "",
              row === bounds!.bottom ? "bottom" : "",
              column === bounds!.left ? "start" : "",
              column === bounds!.right ? "end" : "",
            ]
              .filter(Boolean)
              .join(" ")
          : undefined,
        tabIndex:
          !props.loading &&
          active?.rowId === rowId &&
          active.columnKey === columnKey
            ? 0
            : -1,
      };
    },
  };
}
/** 文本区域可框选，编辑按钮保留真实原生操作；所有动态文字均转义。 */
export function renderDataTableRangeCell(
  props: DataTableProps,
  row: Readonly<import("./data-models").DataRow>,
  column: import("./data-models").DataColumn,
  rowId: string,
  disabled: boolean,
) {
  const labels = dataTableLabels(props.labels),
    text = dataTableCellText(row, column) || labels.emptyCell;
  const icon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${controlIcons.pencil
    .map(
      ([tag, attributes]) =>
        `<${tag} ${Object.entries(attributes)
          .map(([key, value]) => `${key}="${escapeCell(String(value))}"`)
          .join(" ")}/>`,
    )
    .join("")}</svg>`;
  return `<span data-part="cell-range-display"><span data-part="cell-range-text">${escapeCell(text)}</span><button type="button" data-part="cell-trigger" data-row-id="${escapeCell(rowId)}" data-column-key="${escapeCell(column.key)}" tabindex="-1" aria-label="${escapeCell(`${labels.editCell(column.label, rowId)}: ${text}`)}" ${disabled ? "disabled" : ""}>${icon}</button></span>`;
}
const sameCell = (
  left: DataTableCellAddress | undefined,
  right: DataTableCellAddress | undefined,
) => left?.rowId === right?.rowId && left?.columnKey === right?.columnKey;
/** 框架负责标记与状态提交；共享控制器仅管理指针、剪贴板、虚拟定位和焦点。 */
export function mountDataTableCellSelection(
  region: HTMLElement,
  get: () => { props: DataTableProps; view: View },
  change: (range: DataTableCellRange | null) => void,
  editor: ReturnType<typeof createDataTableEditor>,
  batch: ReturnType<typeof createDataTableBatchEditor>,
  virtualizer: ReturnType<typeof createVirtualWindow>,
  columnVirtualizer?: ReturnType<typeof createVirtualWindow>,
) {
  const root = region.parentElement ?? region;
  const doc = region.ownerDocument,
    win = doc.defaultView;
  if (!win) return () => {};
  let disposed = false,
    frame = 0,
    internal = copyDataTableCellRange(get().props.defaultCellRange),
    active: DataTableCellAddress | undefined,
    focusIntent: DataTableCellAddress | undefined,
    pasteRevision = 0,
    ownPaste = false,
    focusOwned = false,
    pasteFocusOwned = false,
    pasteContext = "",
    notice = "",
    selectionNotice = false;
  let drag:
      | {
          id: number;
          type: string;
          anchor: DataTableCellAddress;
          previous: DataTableCellRange | undefined;
          x: number;
          y: number;
          startX: number;
          startY: number;
          scrollTop: number;
          scrollLeft: number;
          moved: boolean;
        }
      | undefined,
    dragFrame = 0;
  const current = () =>
    get().props.cellRange === undefined ? internal : get().props.cellRange;
  const cells = () =>
    Array.from(
      region.querySelectorAll<HTMLElement>(
        "td[data-cell-row][data-cell-column]",
      ),
    );
  const address = (node: Element | null): DataTableCellAddress | undefined => {
    const td = node?.closest<HTMLElement>(
      "td[data-cell-row][data-cell-column]",
    );
    return td && region.contains(td)
      ? { rowId: td.dataset.cellRow!, columnKey: td.dataset.cellColumn! }
      : undefined;
  };
  const find = (cell: DataTableCellAddress) =>
    cells().find(
      (td) =>
        td.dataset.cellRow === cell.rowId &&
        td.dataset.cellColumn === cell.columnKey,
    );
  const interactive = (node: Element) =>
    !!node.closest(
      'button,input,textarea,select,[contenteditable]:not([contenteditable="false"])',
    );
  const announce = (message: string) => {
    notice = message;
    selectionNotice = false;
    const status = root.querySelector('[data-part="range-status"]');
    if (status && status.textContent !== message) status.textContent = message;
    schedule();
  };
  const context = () => {
    const { props, view } = get();
    return JSON.stringify([
      props.cellSelection,
      props.loading,
      view.query,
      view.sorts,
      view.filters,
      props.state?.page ?? view.page,
      view.columns.map((c) => c.key),
      props.groupBy,
      props.tree,
      view.expandedRowIds,
    ]);
  };
  const attr = (node: HTMLElement, key: string, value: string | undefined) => {
    if (value === undefined) {
      if (node.hasAttribute(key)) node.removeAttribute(key);
    } else if (node.getAttribute(key) !== value) node.setAttribute(key, value);
  };
  const schedule = () => {
    if (!disposed && !frame) frame = win.requestAnimationFrame(sync);
  };
  const endDrag = () => {
    const previous = drag;
    drag = undefined;
    if (previous && region.hasPointerCapture(previous.id))
      region.releasePointerCapture(previous.id);
    win.cancelAnimationFrame(dragFrame);
    dragFrame = 0;
  };
  const choose = (
    range: DataTableCellRange | null,
    focus?: DataTableCellAddress,
  ) => {
    if (disposed || !get().props.cellSelection || get().props.loading) return;
    if (focus) {
      active = { ...focus };
      focusIntent = { ...focus };
      // 明确的指针/键盘导航应立即接管焦点；异步恢复仍保留外部焦点保护。
      find(focus)?.focus({ preventScroll: true });
    }
    if (get().props.cellRange === undefined)
      internal = copyDataTableCellRange(range);
    change(copyDataTableCellRange(range) ?? null);
    selectionNotice = true;
    schedule();
  };
  function sync() {
    frame = 0;
    if (disposed || !region.isConnected) return;
    const { props, view } = get();
    const controls = root.querySelector<HTMLElement>(
      '[data-part="range-controls"]',
    );
    if (selectionNotice) {
      notice = dataTableLabels(props.labels).rangeSelected(
        resolveDataTableCellRange(view, current())?.count ?? 0,
      );
      const status = root.querySelector('[data-part="range-status"]');
      if (status && status.textContent !== notice) status.textContent = notice;
    }
    if (controls) controls.hidden = !notice && !batch.state.pending;
    if (
      props.loading ||
      (drag &&
        (!view.rows.some((entry) => entry.id === drag!.anchor.rowId) ||
          !view.columns.some(
            (column) => column.key === drag!.anchor.columnKey,
          )))
    )
      endDrag();
    if (ownPaste && (context() !== pasteContext || !props.cellSelection)) {
      pasteRevision++;
      ownPaste = false;
      batch.cancel();
      announce(dataTableLabels(props.labels).pasteCanceled);
    }
    if (!props.cellSelection) {
      endDrag();
      focusIntent = undefined;
      return;
    }
    const selected = current(),
      model = dataTableCellSelectionView(
        { ...props, cellRange: selected ?? null, defaultCellRange: undefined },
        view,
      )!;
    const visibleRows = view.rows.filter(
      (entry) => entry.structure?.kind !== "group",
    );
    if (
      !active ||
      !visibleRows.some((entry) => entry.id === active!.rowId) ||
      !view.columns.some((column) => column.key === active!.columnKey)
    ) {
      const old = active;
      active =
        selected && resolveDataTableCellRange(view, selected)
          ? { ...selected.focus }
          : visibleRows.length && view.columns.length
            ? { rowId: visibleRows[0].id, columnKey: view.columns[0].key }
            : undefined;
      if (old && focusOwned && doc.activeElement === doc.body && active)
        focusIntent = { ...active };
    }
    for (const td of cells()) {
      const cell = address(td)!,
        attributes = model.attributes(cell.rowId, cell.columnKey);
      for (const [key, value] of Object.entries(attributes))
        if (key !== "tabIndex")
          attr(td, key, value === undefined ? undefined : String(value));
      attr(
        td,
        "tabindex",
        !props.loading && sameCell(cell, active) ? "0" : "-1",
      );
    }
    if (!focusIntent) return;
    const now = doc.activeElement;
    const cancelButton = root.querySelector<HTMLButtonElement>(
      '[data-part="range-cancel"]',
    );
    if (cancelButton && now === cancelButton && !cancelButton.hidden) return;
    if (now !== doc.body && !region.contains(now) && now !== cancelButton) {
      focusIntent = undefined;
      return;
    }
    if (editor.state) return;
    const target = find(focusIntent);
    if (!target) {
      if (props.columnVirtualization && columnVirtualizer) {
        const index = view.columns.findIndex(
          (column) => column.key === focusIntent!.columnKey,
        );
        if (index >= 0) {
          columnVirtualizer.focus(focusIntent.columnKey);
          columnVirtualizer.scrollToIndex(index);
        }
      }
      if (props.virtualization) {
        const index = view.rows.findIndex(
          (entry) => entry.id === focusIntent!.rowId,
        );
        if (index >= 0) {
          virtualizer.focus(focusIntent.rowId);
          virtualizer.scrollToIndex(index);
        }
      }
      return;
    }
    focusIntent = undefined;
    target.focus({ preventScroll: true });
    target.scrollIntoView({ block: "nearest", inline: "nearest" });
  }
  const observer = new win.MutationObserver(schedule);
  observer.observe(root, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: [
      "aria-selected",
      "aria-busy",
      "data-virtualized",
      "role",
      "disabled",
      "hidden",
    ],
  });
  const batchStop = batch.subscribe(() => {
    if (ownPaste && batch.state.pending)
      announce(dataTableLabels(get().props.labels).saving);
    schedule();
  });
  const editorStop = editor.subscribe(() => {
    const state = editor.state;
    if (state && !sameCell(active, state)) {
      active = { rowId: state.rowId, columnKey: state.columnKey };
      queueMicrotask(() => {
        if (
          !disposed &&
          editor.state?.rowId === state.rowId &&
          editor.state.columnKey === state.columnKey
        )
          choose({ anchor: active!, focus: active! });
      });
    }
    schedule();
  });
  const abandon = (event: Event) => {
    if (event.target instanceof win.Element && !region.contains(event.target)) {
      if (
        root.contains(event.target) &&
        event.target.closest('[data-part="range-cancel"]')
      )
        return;
      focusIntent = undefined;
      focusOwned = false;
      pasteFocusOwned = false;
      endDrag();
    }
  };
  const focus = (event: FocusEvent) => {
    if (event.target instanceof win.Element && region.contains(event.target))
      focusOwned = true;
    if (event.target instanceof win.Element && !interactive(event.target)) {
      const cell = address(event.target);
      if (cell) {
        active = cell;
        schedule();
      }
    }
  };
  const moveSelection = (cell: DataTableCellAddress, extend: boolean) => {
    if (batch.state.active || batch.state.pending || editor.state?.pending)
      return;
    editor.cancel();
    const anchor = extend ? (current()?.anchor ?? active ?? cell) : cell;
    choose({ anchor: { ...anchor }, focus: { ...cell } }, cell);
  };
  const hit = () => {
    if (!drag) return undefined;
    const rect = region.getBoundingClientRect();
    return address(
      doc.elementFromPoint(
        Math.max(rect.left + 1, Math.min(rect.right - 2, drag.x)),
        Math.max(rect.top + 1, Math.min(rect.bottom - 2, drag.y)),
      ),
    );
  };
  const extendDrag = () => {
    const cell = hit();
    if (cell && drag) {
      const previous = current();
      if (!sameCell(previous?.focus, cell))
        choose({ anchor: { ...drag.anchor }, focus: cell }, cell);
    }
  };
  const scrollDrag = () => {
    dragFrame = 0;
    if (!drag || drag.type === "touch") return;
    const rect = region.getBoundingClientRect(),
      edge = 24;
    const velocity = (position: number, start: number, end: number) =>
      position < start + edge
        ? -Math.min(14, (start + edge - position) / 2)
        : position > end - edge
          ? Math.min(14, (position - end + edge) / 2)
          : 0;
    const x = velocity(drag.x, rect.left, rect.right),
      y = velocity(drag.y, rect.top, rect.bottom);
    if (x || y) {
      region.scrollBy({ left: x, top: y });
      extendDrag();
      dragFrame = win.requestAnimationFrame(scrollDrag);
    }
  };
  const pointerdown = (event: PointerEvent) => {
    if (
      !get().props.cellSelection ||
      get().props.loading ||
      event.button !== 0 ||
      !event.isPrimary ||
      batch.state.active ||
      batch.state.pending ||
      editor.state?.pending ||
      !(event.target instanceof win.Element) ||
      interactive(event.target)
    )
      return;
    const cell = address(event.target);
    if (!cell) return;
    drag = {
      id: event.pointerId,
      type: event.pointerType,
      anchor: event.shiftKey ? (current()?.anchor ?? cell) : cell,
      previous: copyDataTableCellRange(current()),
      x: event.clientX,
      y: event.clientY,
      startX: event.clientX,
      startY: event.clientY,
      scrollTop: region.scrollTop,
      scrollLeft: region.scrollLeft,
      moved: false,
    };
    if (event.pointerType === "touch") return;
    event.preventDefault();
    moveSelection(cell, event.shiftKey);
    region.setPointerCapture(event.pointerId);
    dragFrame = win.requestAnimationFrame(scrollDrag);
  };
  const pointermove = (event: PointerEvent) => {
    if (!drag || drag.id !== event.pointerId) return;
    drag.x = event.clientX;
    drag.y = event.clientY;
    drag.moved ||= Math.hypot(drag.x - drag.startX, drag.y - drag.startY) > 6;
    if (drag.type !== "touch") {
      event.preventDefault();
      extendDrag();
      if (!dragFrame) dragFrame = win.requestAnimationFrame(scrollDrag);
    }
  };
  const pointerup = (event: PointerEvent) => {
    if (!drag || drag.id !== event.pointerId) return;
    const previous = drag;
    if (previous.type === "touch") {
      if (
        !previous.moved &&
        region.scrollTop === previous.scrollTop &&
        region.scrollLeft === previous.scrollLeft
      )
        moveSelection(previous.anchor, false);
    } else extendDrag();
    endDrag();
  };
  const pointercancel = (event: PointerEvent) => {
    if (drag?.id !== event.pointerId) return;
    const previous = drag.previous;
    endDrag();
    choose(previous ?? null);
  };
  const cancel = () => {
    if (!batch.state.pending) return;
    pasteRevision++;
    ownPaste = false;
    batch.cancel();
    announce(dataTableLabels(get().props.labels).pasteCanceled);
    if (active) focusIntent = { ...active };
    schedule();
  };
  const click = (event: MouseEvent) => {
    if (
      event.target instanceof win.Element &&
      event.target.closest('[data-part="range-cancel"]')
    )
      cancel();
  };
  const dblclick = (event: MouseEvent) => {
    if (
      !(event.target instanceof win.Element) ||
      interactive(event.target) ||
      batch.state.active ||
      batch.state.pending
    )
      return;
    const cell = address(event.target);
    if (cell) editor.begin(get().props, get().view, cell.rowId, cell.columnKey);
  };
  const paste = async (event: ClipboardEvent) => {
    if (
      !get().props.cellSelection ||
      !(event.target instanceof win.Element) ||
      interactive(event.target) ||
      !address(event.target) ||
      !event.clipboardData
    )
      return;
    event.preventDefault();
    const { props, view } = get(),
      labels = dataTableLabels(props.labels);
    if (
      props.loading ||
      batch.state.active ||
      batch.state.pending ||
      editor.state?.pending
    )
      return;
    if (!props.onBatchCommit) {
      announce(labels.pasteReadonly);
      return;
    }
    const selection =
      current() ?? (active ? { anchor: active, focus: active } : undefined);
    if (!selection) return;
    let transaction: ReturnType<typeof createDataTablePaste>;
    try {
      transaction = createDataTablePaste(
        view,
        selection,
        event.clipboardData.getData("text/plain"),
      );
    } catch (error) {
      announce(
        error instanceof TableClipboardError
          ? labels[error.code]
          : labels.pasteInvalid,
      );
      return;
    }
    editor.cancel();
    const revision = ++pasteRevision;
    ownPaste = true;
    pasteFocusOwned = region.contains(doc.activeElement);
    pasteContext = context();
    const result = await batch.saveCells(props, transaction.cells);
    if (disposed || revision !== pasteRevision) return;
    ownPaste = false;
    if (result === "applied") {
      choose(transaction.range);
      announce(labels.pastedCells(transaction.cells.length));
      if (
        pasteFocusOwned &&
        (region.contains(doc.activeElement) || doc.activeElement === doc.body)
      ) {
        focusIntent = active;
        schedule();
      }
    } else if (result === "canceled") announce(labels.pasteCanceled);
    else announce(batch.state.error ?? labels.batchNoChanges);
  };
  const copy = (event: ClipboardEvent) => {
    if (
      !get().props.cellSelection ||
      !(event.target instanceof win.Element) ||
      interactive(event.target) ||
      !address(event.target) ||
      !event.clipboardData
    )
      return;
    const { props, view } = get(),
      labels = dataTableLabels(props.labels),
      bounds = resolveDataTableCellRange(view, current());
    if (!bounds) return;
    event.preventDefault();
    if (bounds.count > 10000) {
      announce(labels.pasteTooLarge);
      return;
    }
    const text = formatDataTableClipboard(
      bounds.rows
        .slice(bounds.top, bounds.bottom + 1)
        .map((entry) =>
          view.columns
            .slice(bounds.left, bounds.right + 1)
            .map((column) => String(entry.row[column.key] ?? "")),
        ),
    );
    if (text.length > 1048576) {
      announce(labels.pasteTooLarge);
      return;
    }
    event.clipboardData.setData("text/plain", text);
    announce(labels.copiedCells(bounds.count));
  };
  const keydown = (event: KeyboardEvent) => {
    if (
      !get().props.cellSelection ||
      event.isComposing ||
      !(event.target instanceof win.Element) ||
      interactive(event.target)
    )
      return;
    // 虚拟列尚未挂载时，连续方向键仍从已请求的位置推进，避免重复消费旧 DOM 游标。
    const navigation = [
      "ArrowDown",
      "ArrowUp",
      "ArrowRight",
      "ArrowLeft",
      "Home",
      "End",
    ].includes(event.key);
    const cell = navigation
      ? (focusIntent ?? address(event.target))
      : address(event.target);
    if (!cell) return;
    if (event.key === "Escape" && batch.state.pending) {
      event.preventDefault();
      cancel();
      return;
    }
    if ((event.ctrlKey || event.metaKey) && !event.altKey) {
      const action =
        event.key.toLowerCase() === "z"
          ? event.shiftKey
            ? "redo"
            : "undo"
          : event.key.toLowerCase() === "y"
            ? "redo"
            : undefined;
      if (action && batch.state[action]) {
        event.preventDefault();
        void batch.save(get().props, action);
        return;
      }
    }
    if (batch.state.active || batch.state.pending || get().props.loading)
      return;
    const { props, view } = get(),
      rows = view.rows.filter((entry) => entry.structure?.kind !== "group"),
      row = rows.findIndex((entry) => entry.id === cell.rowId),
      column = view.columns.findIndex((c) => c.key === cell.columnKey);
    if (row < 0 || column < 0) return;
    if (event.key === "Enter" || event.key === "F2") {
      event.preventDefault();
      editor.begin(props, view, cell.rowId, cell.columnKey);
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      choose({ anchor: cell, focus: cell }, cell);
      return;
    }
    if (
      (event.ctrlKey || event.metaKey) &&
      event.key.toLowerCase() === "a" &&
      rows.length &&
      view.columns.length
    ) {
      event.preventDefault();
      choose({
        anchor: { rowId: rows[0].id, columnKey: view.columns[0].key },
        focus: {
          rowId: rows[rows.length - 1].id,
          columnKey: view.columns[view.columns.length - 1].key,
        },
      });
      return;
    }
    let r = row,
      c = column;
    const rtl = win.getComputedStyle(region).direction === "rtl";
    if (event.key === "ArrowDown") r++;
    else if (event.key === "ArrowUp") r--;
    else if (event.key === "ArrowRight") c += rtl ? -1 : 1;
    else if (event.key === "ArrowLeft") c += rtl ? 1 : -1;
    else if (event.key === "Home") {
      c = 0;
      if (event.ctrlKey || event.metaKey) r = 0;
    } else if (event.key === "End") {
      c = view.columns.length - 1;
      if (event.ctrlKey || event.metaKey) r = rows.length - 1;
    } else return;
    event.preventDefault();
    r = Math.max(0, Math.min(rows.length - 1, r));
    c = Math.max(0, Math.min(view.columns.length - 1, c));
    moveSelection(
      { rowId: rows[r].id, columnKey: view.columns[c].key },
      event.shiftKey,
    );
  };
  region.addEventListener("pointerdown", pointerdown);
  region.addEventListener("pointermove", pointermove);
  region.addEventListener("pointerup", pointerup);
  region.addEventListener("pointercancel", pointercancel);
  region.addEventListener("lostpointercapture", pointercancel);
  root.addEventListener("click", click);
  region.addEventListener("dblclick", dblclick);
  region.addEventListener("keydown", keydown);
  region.addEventListener("paste", paste);
  region.addEventListener("copy", copy);
  region.addEventListener("focusin", focus);
  doc.addEventListener("pointerdown", abandon, true);
  doc.addEventListener("focusin", abandon, true);
  schedule();
  return () => {
    disposed = true;
    pasteRevision++;
    if (ownPaste) batch.cancel();
    endDrag();
    win.cancelAnimationFrame(frame);
    observer.disconnect();
    batchStop();
    editorStop();
    doc.removeEventListener("pointerdown", abandon, true);
    doc.removeEventListener("focusin", abandon, true);
    region.removeEventListener("pointerdown", pointerdown);
    region.removeEventListener("pointermove", pointermove);
    region.removeEventListener("pointerup", pointerup);
    region.removeEventListener("pointercancel", pointercancel);
    region.removeEventListener("lostpointercapture", pointercancel);
    root.removeEventListener("click", click);
    region.removeEventListener("dblclick", dblclick);
    region.removeEventListener("keydown", keydown);
    region.removeEventListener("paste", paste);
    region.removeEventListener("copy", copy);
    region.removeEventListener("focusin", focus);
  };
}
