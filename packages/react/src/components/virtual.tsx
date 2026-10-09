import React, { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import {
  createVirtualGrid,
  createVirtualMasonry,
  mountVirtualGrid,
  mountVirtualMasonry,
  type VirtualGridOptions,
  type VirtualGridCellDetails,
  type VirtualMasonryOptions,
  type VirtualMasonryEntry,
} from "@loongark/kit";
// 数据与 Tab 入口在绘制前同步，不能先更新 aria 计数再等待下一帧修复键盘入口。
const useGridLayoutEffect = typeof document === "undefined" ? useEffect : useLayoutEffect;
export interface VirtualGridProps extends VirtualGridOptions {
  renderCell(details: VirtualGridCellDetails): ReactNode;
}
export function LoongArkVirtualGrid(props: VirtualGridProps) {
  const [, redraw] = useState(0),
    [model] = useState(() =>
      createVirtualGrid(props, () => redraw((value) => value + 1)),
    ),
    root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (root.current) return mountVirtualGrid(root.current, model);
  }, [model]);
  useGridLayoutEffect(
    () => model.sync(props),
    [
      model,
      props.rowKeys,
      props.columnKeys,
      props.rowSize,
      props.columnSize,
      props.height,
      props.width,
      props.overscan,
      props.scrollToRow,
      props.scrollToColumn,
      props.dir,
    ],
  );
  const rows = model.rows.state,
    columns = model.columns.state;
  return (
    <div
      ref={root}
      data-scope="virtual-grid"
      role="grid"
      aria-label={props.label ?? "Data grid"}
      aria-rowcount={props.rowKeys.length}
      aria-colcount={props.columnKeys.length}
      dir={props.dir}
      tabIndex={rows.count && columns.count ? -1 : 0}
      style={{ height: props.height ?? 320 }}
    >
      <div
        data-part="canvas"
        style={{ height: rows.total, width: columns.total }}
      >
        {rows.entries.map((row) => (
          <div
            key={row.key}
            role="row"
            aria-rowindex={row.index + 1}
            data-part="row"
            style={{ top: row.offset, height: row.size, width: columns.total }}
          >
            {columns.entries.map((column) => (
              <div
                key={column.key}
                role="gridcell"
                data-part="cell"
                data-row-key={row.key}
                data-column-key={column.key}
                aria-colindex={column.index + 1}
                tabIndex={
                  row.key === model.cursor.rowKey && column.key === model.cursor.columnKey
                    ? 0
                    : -1
                }
                style={{
                  insetInlineStart: column.offset,
                  width: column.size,
                  height: row.size,
                }}
              >
                {props.renderCell({
                  rowKey: row.key,
                  columnKey: column.key,
                  rowIndex: row.index,
                  columnIndex: column.index,
                })}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
export interface VirtualMasonryProps extends VirtualMasonryOptions {
  renderItem(details: VirtualMasonryEntry): ReactNode;
}
export function LoongArkVirtualMasonry(props: VirtualMasonryProps) {
  const [, redraw] = useState(0),
    [model] = useState(() =>
      createVirtualMasonry(props, () => redraw((value) => value + 1)),
    ),
    root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (root.current) return mountVirtualMasonry(root.current, model);
  }, [model]);
  useEffect(
    () => model.setOptions(props),
    [
      model,
      props.keys,
      props.height,
      props.width,
      props.minColumnWidth,
      props.maxColumns,
      props.gap,
      props.estimateSize,
      props.overscan,
      props.scrollToIndex,
      props.dir,
    ],
  );
  const state = model.state;
  return (
    <div
      ref={root}
      data-scope="virtual-masonry"
      role="list"
      aria-label={props.label ?? "Collection"}
      dir={props.dir}
      style={{ height: props.height ?? 320 }}
    >
      <div data-part="canvas" style={{ height: state.total }}>
        {state.entries.map((entry) => (
          <div
            key={entry.key}
            data-part="item"
            data-virtual-key={entry.key}
            role="listitem"
            aria-posinset={entry.index + 1}
            aria-setsize={state.count}
            style={{
              top: entry.top,
              insetInlineStart: entry.inlineStart,
              width: entry.width,
            }}
          >
            {props.renderItem(entry)}
          </div>
        ))}
      </div>
    </div>
  );
}
