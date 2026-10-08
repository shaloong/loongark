import { controlIcons } from "@loongark/kit";
import { LoongArkIcon } from "./icon";
import { createSignal, For, Show, splitProps, type JSX } from "solid-js";
import {
  transferView,
  moveTransferItems,
  toggleTransferSelection,
  toggleTransferSide,
  focusTransferredItem,
  type TransferListOptions,
  type TransferItem,
} from "@loongark/kit";
const part = (name: string) => ({
  "data-scope": "transfer-list",
  "data-part": name,
});
export type LoongArkTransferListProps = Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  "onChange"
> &
  TransferListOptions;
export function LoongArkTransferList(props: LoongArkTransferListProps) {
  const [local, attrs] = splitProps(props, [
    "items",
    "value",
    "defaultValue",
    "disabled",
    "name",
    "leftLabel",
    "rightLabel",
    "emptyLabel",
    "onValueChange",
  ]);
  const [internal, setInternal] = createSignal<readonly string[]>(
      local.defaultValue ?? [],
    ),
    [selection, setSelection] = createSignal<string[]>([]),
    [status, setStatus] = createSignal("");
  let root!: HTMLDivElement;
  const view = () =>
      transferView(local.items, local.value ?? internal(), selection()),
    leftLabel = () => local.leftLabel ?? "Available",
    rightLabel = () => local.rightLabel ?? "Selected";
  const move = (direction: "right" | "left") => {
    const details = moveTransferItems(
      local.items,
      view().value,
      selection(),
      direction,
    );
    if (!details.moved.length || local.disabled) return;
    if (local.value === undefined) setInternal(details.value);
    setSelection((selected) =>
      selected.filter((key) => !details.moved.includes(key)),
    );
    local.onValueChange?.(details);
    setStatus(
      details.moved.length +
        " item(s) moved to " +
        (direction === "right" ? rightLabel() : leftLabel()),
    );
    focusTransferredItem(root, details);
  };
  const panel = (
    side: "left" | "right",
    label: () => string,
    rows: () => readonly TransferItem[],
    selected: () => readonly string[],
  ) => {
    const enabled = () => rows().filter((item) => !item.disabled),
      all = () =>
        enabled().length > 0 && selected().length === enabled().length;
    return (
      <fieldset {...part("panel")} data-side={side} disabled={local.disabled}>
        <legend {...part("legend")}>{label()}</legend>
        <div {...part("toolbar")}>
          <span>
            {selected().length} / {enabled().length} selected
          </span>
          <button
            {...part("select-all")}
            type="button"
            disabled={local.disabled || !enabled().length}
            aria-label={
              (all() ? "Clear selection in " : "Select all in ") + label()
            }
            onClick={() =>
              setSelection(toggleTransferSide(selection(), rows()))
            }
          >
            {all() ? "Clear" : "Select all"}
          </button>
        </div>
        <ul {...part("list")}>
          <For each={rows()}>
            {(item) => (
              <li>
                <label
                  {...part("item")}
                  data-selected={
                    selection().includes(item.value) ? "true" : undefined
                  }
                  data-disabled={
                    local.disabled || item.disabled ? "true" : undefined
                  }
                >
                  <input
                    type="checkbox"
                    value={item.value}
                    checked={selection().includes(item.value)}
                    disabled={local.disabled || item.disabled}
                    onChange={() =>
                      setSelection(
                        toggleTransferSelection(selection(), item.value),
                      )
                    }
                  />
                  <span {...part("item-text")}>
                    <span>{item.label}</span>
                    <Show when={item.description}>
                      <span {...part("description")}>{item.description}</span>
                    </Show>
                  </span>
                </label>
              </li>
            )}
          </For>
          <Show when={!rows().length}>
            <li {...part("empty")}>{local.emptyLabel ?? "No items"}</li>
          </Show>
        </ul>
      </fieldset>
    );
  };
  return (
    <div {...part("root")} {...attrs} ref={root}>
      {panel(
        "left",
        leftLabel,
        () => view().left,
        () => view().leftSelected,
      )}
      <div {...part("actions")}>
        <button
          {...part("move")}
          type="button"
          aria-label={"Move selected to " + rightLabel()}
          disabled={local.disabled || !view().leftSelected.length}
          onClick={() => move("right")}
        >
          <LoongArkIcon icon={controlIcons.arrowRight} mirrorInRtl />
        </button>
        <button
          {...part("move")}
          type="button"
          aria-label={"Move selected to " + leftLabel()}
          disabled={local.disabled || !view().rightSelected.length}
          onClick={() => move("left")}
        >
          <LoongArkIcon icon={controlIcons.arrowLeft} mirrorInRtl />
        </button>
      </div>
      {panel(
        "right",
        rightLabel,
        () => view().right,
        () => view().rightSelected,
      )}
      <Show when={local.name}>
        <For each={view().value}>
          {(key) => (
            <input
              type="hidden"
              name={local.name}
              value={key}
              disabled={local.disabled}
            />
          )}
        </For>
      </Show>
      <div {...part("status")} role="status" aria-live="polite">
        {status()}
      </div>
    </div>
  );
}
