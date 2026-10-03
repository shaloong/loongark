export interface TransferItem {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}
export interface TransferChangeDetails {
  value: string[];
  moved: string[];
  direction: "right" | "left";
}
export interface TransferListOptions {
  items: readonly TransferItem[];
  value?: readonly string[];
  defaultValue?: readonly string[];
  disabled?: boolean;
  name?: string;
  leftLabel?: string;
  rightLabel?: string;
  emptyLabel?: string;
  onValueChange?: (details: TransferChangeDetails) => void;
}
export function transferView(
  items: readonly TransferItem[],
  value: readonly string[] = [],
  selection: readonly string[] = [],
) {
  const keys = new Set<string>();
  for (const item of items) {
    if (!item.value || keys.has(item.value))
      throw new Error("TransferList requires unique non-empty item values");
    keys.add(item.value);
  }
  const assigned = new Set(value),
    selected = new Set(selection);
  const current = items
    .filter((item) => assigned.has(item.value))
    .map((item) => item.value);
  const left = items.filter((item) => !assigned.has(item.value)),
    right = items.filter((item) => assigned.has(item.value));
  return {
    value: current,
    left,
    right,
    leftSelected: left
      .filter((item) => !item.disabled && selected.has(item.value))
      .map((item) => item.value),
    rightSelected: right
      .filter((item) => !item.disabled && selected.has(item.value))
      .map((item) => item.value),
  };
}
export function moveTransferItems(
  items: readonly TransferItem[],
  value: readonly string[],
  selection: readonly string[],
  direction: "right" | "left",
): TransferChangeDetails {
  const view = transferView(items, value, selection),
    moved = direction === "right" ? view.leftSelected : view.rightSelected;
  const next = new Set(view.value);
  moved.forEach((key) =>
    direction === "right" ? next.add(key) : next.delete(key),
  );
  return {
    value: items
      .filter((item) => next.has(item.value))
      .map((item) => item.value),
    moved,
    direction,
  };
}
export function toggleTransferSelection(
  selection: readonly string[],
  key: string,
) {
  return selection.includes(key)
    ? selection.filter((v) => v !== key)
    : [...selection, key];
}
export function toggleTransferSide(
  selection: readonly string[],
  items: readonly TransferItem[],
) {
  const enabled = items
    .filter((item) => !item.disabled)
    .map((item) => item.value);
  return enabled.every((key) => selection.includes(key))
    ? selection.filter((key) => !enabled.includes(key))
    : [...new Set([...selection, ...enabled])];
}
export function focusTransferredItem(
  root: HTMLElement | undefined,
  details: TransferChangeDetails,
) {
  if (!root || !details.moved.length) return;
  requestAnimationFrame(() => {
    if (!root.isConnected) return;
    const inputs = root.querySelectorAll<HTMLInputElement>(
      '[data-side="' + details.direction + '"] input[type=checkbox]',
    );
    Array.from(inputs)
      .find((input) => input.value === details.moved[0])
      ?.focus();
  });
}
