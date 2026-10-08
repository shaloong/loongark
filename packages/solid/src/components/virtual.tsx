import {
  createSignal,
  createEffect,
  createMemo,
  onMount,
  onCleanup,
  untrack,
  For,
  type JSX,
} from "solid-js";
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
export interface VirtualGridProps extends VirtualGridOptions {
  renderCell(details: VirtualGridCellDetails): JSX.Element;
}
export function LoongArkVirtualGrid(props: VirtualGridProps) {
  const [revision, redraw] = createSignal(0),
    model = untrack(() =>
      createVirtualGrid(props, () => redraw((value) => value + 1)),
    );
  const rows = createMemo(() => {
      revision();
      return model.rows.state;
    }),
    columns = createMemo(() => {
      revision();
      return model.columns.state;
    });
  const cursor = createMemo(() => {
    revision();
    return model.cursor;
  });
  let root!: HTMLDivElement;
  createEffect(() => model.sync({ ...props }));
  onMount(() => {
    const stop = mountVirtualGrid(root, model);
    onCleanup(stop);
  });
  return (
    <div
      ref={root}
      data-scope="virtual-grid"
      role="grid"
      aria-label={props.label ?? "Data grid"}
      aria-rowcount={props.rowKeys.length}
      aria-colcount={props.columnKeys.length}
      dir={props.dir}
      tabIndex={rows().count && columns().count ? -1 : 0}
      style={{ height: `${props.height ?? 320}px` }}
    >
      <div
        data-part="canvas"
        style={{ height: `${rows().total}px`, width: `${columns().total}px` }}
      >
        <For each={rows().entries.map((row) => row.key)}>
          {(key) => {
            const row = createMemo(() =>
              rows().entries.find((entry) => entry.key === key)!,
            );
            return (
              <div
                role="row"
                aria-rowindex={row().index + 1}
                data-part="row"
                style={{
                  top: `${row().offset}px`,
                  height: `${row().size}px`,
                  width: `${columns().total}px`,
                }}
              >
                <For each={columns().entries.map((column) => column.key)}>
                  {(columnKey) => {
                    const column = createMemo(() =>
                      columns().entries.find(
                        (entry) => entry.key === columnKey,
                      )!,
                    );
                    return (
                      <div
                        role="gridcell"
                        data-part="cell"
                        data-row-key={key}
                        data-column-key={columnKey}
                        aria-colindex={column().index + 1}
                        tabIndex={
                          key === cursor().rowKey &&
                          columnKey === cursor().columnKey
                            ? 0
                            : -1
                        }
                        style={{
                          "inset-inline-start": `${column().offset}px`,
                          width: `${column().size}px`,
                          height: `${row().size}px`,
                        }}
                      >
                        {props.renderCell({
                          rowKey: key,
                          columnKey,
                          get rowIndex() {
                            return row().index;
                          },
                          get columnIndex() {
                            return column().index;
                          },
                        })}
                      </div>
                    );
                  }}
                </For>
              </div>
            );
          }}
        </For>
      </div>
    </div>
  );
}
export interface VirtualMasonryProps extends VirtualMasonryOptions {
  renderItem(details: VirtualMasonryEntry): JSX.Element;
}
export function LoongArkVirtualMasonry(props: VirtualMasonryProps) {
  const [revision, redraw] = createSignal(0),
    model = untrack(() =>
      createVirtualMasonry(props, () => redraw((value) => value + 1)),
    ),
    state = createMemo(() => {
      revision();
      return model.state;
    });
  let root!: HTMLDivElement;
  createEffect(() => model.setOptions({ ...props }));
  onMount(() => {
    const stop = mountVirtualMasonry(root, model);
    onCleanup(stop);
  });
  return (
    <div
      ref={root}
      data-scope="virtual-masonry"
      role="list"
      aria-label={props.label ?? "Collection"}
      dir={props.dir}
      style={{ height: `${props.height ?? 320}px` }}
    >
      <div data-part="canvas" style={{ height: `${state().total}px` }}>
        <For each={state().entries.map((entry) => entry.key)}>
          {(key) => {
            const entry = createMemo(() =>
              state().entries.find((item) => item.key === key)!,
            );
            const details = new Proxy(
              untrack(() => ({ ...entry() })),
              { get: (_target, property) => Reflect.get(entry(), property) },
            );
            return (
              <div
                data-part="item"
                data-virtual-key={key}
                role="listitem"
                aria-posinset={entry().index + 1}
                aria-setsize={state().count}
                style={{
                  top: `${entry().top}px`,
                  "inset-inline-start": `${entry().inlineStart}px`,
                  width: `${entry().width}px`,
                }}
              >
                {props.renderItem(details)}
              </div>
            );
          }}
        </For>
      </div>
    </div>
  );
}
