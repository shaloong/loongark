import { controlIcons } from "@loongark/kit";
import { LoongArkIcon } from "./icon";
import { useState, useRef, type HTMLAttributes } from "react";
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
  HTMLAttributes<HTMLDivElement>,
  "defaultValue" | "onChange"
> &
  TransferListOptions;
export function LoongArkTransferList({
  items,
  value,
  defaultValue = [],
  disabled = false,
  name,
  leftLabel = "Available",
  rightLabel = "Selected",
  emptyLabel = "No items",
  onValueChange,
  ...attrs
}: LoongArkTransferListProps) {
  const [internal, setInternal] = useState<readonly string[]>(defaultValue),
    [selection, setSelection] = useState<string[]>([]),
    [status, setStatus] = useState("");
  const root = useRef<HTMLDivElement>(null),
    view = transferView(items, value ?? internal, selection);
  const move = (direction: "right" | "left") => {
    const details = moveTransferItems(items, view.value, selection, direction);
    if (!details.moved.length || disabled) return;
    if (value === undefined) setInternal(details.value);
    setSelection((selected) =>
      selected.filter((key) => !details.moved.includes(key)),
    );
    onValueChange?.(details);
    setStatus(
      details.moved.length +
        " item(s) moved to " +
        (direction === "right" ? rightLabel : leftLabel),
    );
    focusTransferredItem(root.current ?? undefined, details);
  };
  const panel = (
    side: "left" | "right",
    label: string,
    rows: readonly TransferItem[],
    selected: readonly string[],
  ) => {
    const enabled = rows.filter((item) => !item.disabled),
      all = enabled.length > 0 && selected.length === enabled.length;
    return (
      <fieldset {...part("panel")} data-side={side} disabled={disabled}>
        <legend {...part("legend")}>{label}</legend>
        <div {...part("toolbar")}>
          <span>
            {selected.length} / {enabled.length} selected
          </span>
          <button
            {...part("select-all")}
            type="button"
            disabled={disabled || !enabled.length}
            aria-label={
              (all ? "Clear selection in " : "Select all in ") + label
            }
            onClick={() => setSelection(toggleTransferSide(selection, rows))}
          >
            {all ? "Clear" : "Select all"}
          </button>
        </div>
        <ul {...part("list")}>
          {rows.map((item) => (
            <li key={item.value}>
              <label
                {...part("item")}
                data-selected={
                  selection.includes(item.value) ? "true" : undefined
                }
                data-disabled={disabled || item.disabled ? "true" : undefined}
              >
                <input
                  type="checkbox"
                  value={item.value}
                  checked={selection.includes(item.value)}
                  disabled={disabled || item.disabled}
                  onChange={() =>
                    setSelection(toggleTransferSelection(selection, item.value))
                  }
                />
                <span {...part("item-text")}>
                  <span>{item.label}</span>
                  {item.description && (
                    <span {...part("description")}>{item.description}</span>
                  )}
                </span>
              </label>
            </li>
          ))}
          {!rows.length && <li {...part("empty")}>{emptyLabel}</li>}
        </ul>
      </fieldset>
    );
  };
  return (
    <div {...part("root")} {...attrs} ref={root}>
      {panel("left", leftLabel, view.left, view.leftSelected)}
      <div {...part("actions")}>
        <button
          {...part("move")}
          type="button"
          aria-label={"Move selected to " + rightLabel}
          disabled={disabled || !view.leftSelected.length}
          onClick={() => move("right")}
        >
          <LoongArkIcon icon={controlIcons.arrowRight} mirrorInRtl />
        </button>
        <button
          {...part("move")}
          type="button"
          aria-label={"Move selected to " + leftLabel}
          disabled={disabled || !view.rightSelected.length}
          onClick={() => move("left")}
        >
          <LoongArkIcon icon={controlIcons.arrowLeft} mirrorInRtl />
        </button>
      </div>
      {panel("right", rightLabel, view.right, view.rightSelected)}
      {name &&
        view.value.map((key) => (
          <input
            key={key}
            type="hidden"
            name={name}
            value={key}
            disabled={disabled}
          />
        ))}
      <div {...part("status")} role="status" aria-live="polite">
        {status}
      </div>
    </div>
  );
}
