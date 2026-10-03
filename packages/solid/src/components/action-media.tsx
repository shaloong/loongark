import {
  splitProps,
  onMount,
  onCleanup,
  createSignal,
  createUniqueId,
  For,
  type JSX,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import {
  mediaParts,
  mediaAttributes,
  mediaStyles,
  fabAttributes,
  mountSpeedDial,
  speedDialActions,
  type MediaPart,
  type MediaLayoutOptions,
  type FloatingActionButtonOptions,
  type SpeedDialOptions,
} from "@loongark/kit";
export type LoongArkMediaLayoutProps = JSX.HTMLAttributes<HTMLElement> &
  MediaLayoutOptions;
const make = (part: MediaPart) => (props: LoongArkMediaLayoutProps) => {
  const [local, rest] = splitProps(props, [
    "columns",
    "gap",
    "columnSpan",
    "rowSpan",
    "rowHeight",
    "responsive",
    "style",
  ]);
  return (
    <Dynamic
      component={mediaParts[part][0]}
      {...mediaAttributes(part, local)}
      {...rest}
      style={{
        ...mediaStyles(local),
        ...(typeof local.style === "object" ? local.style : {}),
      }}
    />
  );
};
export const LoongArkImageList = make("ImageList");
export const LoongArkImageListItem = make("ImageListItem");
export const LoongArkImageListCaption = make("ImageListCaption");
export const LoongArkMasonry = make("Masonry");
export const LoongArkMasonryItem = make("MasonryItem");
export type LoongArkFloatingActionButtonProps =
  JSX.ButtonHTMLAttributes<HTMLButtonElement> & FloatingActionButtonOptions;
export function LoongArkFloatingActionButton(
  props: LoongArkFloatingActionButtonProps,
) {
  const [local, rest] = splitProps(props, ["size", "variant", "extended"]);
  return <button type="button" {...fabAttributes(local)} {...rest} />;
}
export type LoongArkSpeedDialProps = Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  "onSelect"
> &
  SpeedDialOptions;
export function LoongArkSpeedDial(props: LoongArkSpeedDialProps) {
  const [local, rest] = splitProps(props, [
      "label",
      "actions",
      "direction",
      "disabled",
      "open",
      "defaultOpen",
      "onOpenChange",
      "onSelect",
    ]),
    uid = createUniqueId(),
    [internal, setInternal] = createSignal(local.defaultOpen ?? false);
  let root!: HTMLDivElement, release: (() => void) | undefined;
  const available = () => speedDialActions(local.actions),
    opened = () =>
      !local.disabled && available().length > 0 && (local.open ?? internal());
  const change = (next: boolean) => {
    if (next && (local.disabled || !available().length)) return;
    if (next === opened()) return;
    if (local.open === undefined) setInternal(next);
    local.onOpenChange?.({ open: next });
  };
  onMount(() => (release = mountSpeedDial(root, change)));
  onCleanup(() => release?.());
  const select = (value: string) => {
    if (local.disabled) return;
    local.onSelect?.({ value });
    change(false);
    root.querySelector<HTMLButtonElement>("[data-part=trigger]")?.focus();
  };
  return (
    <div
      data-scope="speed-dial"
      data-part="root"
      data-state={opened() ? "open" : "closed"}
      data-direction={local.direction ?? "up"}
      {...rest}
      ref={root}
    >
      <button
        {...fabAttributes()}
        data-scope="speed-dial"
        data-part="trigger"
        type="button"
        aria-label={local.label}
        aria-haspopup="menu"
        aria-expanded={opened()}
        aria-controls={uid}
        disabled={local.disabled || !available().length}
        onClick={() => change(!opened())}
      >
        <span data-scope="speed-dial" data-part="icon" aria-hidden="true">
          ＋
        </span>
      </button>
      <ul
        data-scope="speed-dial"
        data-part="actions"
        id={uid}
        role="menu"
        aria-label={local.label}
        aria-orientation={
          local.direction === "left" || local.direction === "right"
            ? "horizontal"
            : "vertical"
        }
        hidden={!opened()}
      >
        <For each={local.actions}>
          {(a) => (
            <li role="none">
              <button
                data-scope="speed-dial"
                data-part="action"
                role="menuitem"
                type="button"
                tabIndex={-1}
                disabled={local.disabled || a.disabled}
                onClick={() => select(a.value)}
              >
                <span aria-hidden="true">{a.icon ?? "•"}</span>
                {a.label}
              </button>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}
