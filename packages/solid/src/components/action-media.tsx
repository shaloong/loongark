
import { styles as lkAutomaticFloatingActionButtonStyles } from "@shaloong/loongark-primitives/automatic-styles/floating-action-button";
import { styles as lkAutomaticSpeedDialStyles } from "@shaloong/loongark-primitives/automatic-styles/speed-dial";

import { withAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
import { styles as lkAutomaticImageListStyles } from "@shaloong/loongark-primitives/automatic-styles/image-list";
import { styles as lkAutomaticMasonryStyles } from "@shaloong/loongark-primitives/automatic-styles/masonry";
import { controlIcons } from "@shaloong/loongark-kit";
import { LoongArkIcon } from "./icon";
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
} from "@shaloong/loongark-kit";
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
export const LoongArkImageList = /*#__PURE__*/ withAutomaticStyles(make("ImageList"), lkAutomaticImageListStyles);
export const LoongArkImageListItem = /*#__PURE__*/ withAutomaticStyles(make("ImageListItem"), lkAutomaticImageListStyles);
export const LoongArkImageListCaption = /*#__PURE__*/ withAutomaticStyles(make("ImageListCaption"), lkAutomaticImageListStyles);
export const LoongArkMasonry = /*#__PURE__*/ withAutomaticStyles(make("Masonry"), lkAutomaticMasonryStyles);
export const LoongArkMasonryItem = /*#__PURE__*/ withAutomaticStyles(make("MasonryItem"), lkAutomaticMasonryStyles);
export type LoongArkFloatingActionButtonProps =
  JSX.ButtonHTMLAttributes<HTMLButtonElement> & FloatingActionButtonOptions;
function LoongArkFloatingActionButton(
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
function LoongArkSpeedDial(props: LoongArkSpeedDialProps) {
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
          <LoongArkIcon icon={controlIcons.plus} size="lg" />
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
                <span aria-hidden="true">
                  {typeof a.icon === "string" ? (
                    a.icon
                  ) : (
                    <LoongArkIcon icon={a.icon ?? controlIcons.circle} />
                  )}
                </span>
                {a.label}
              </button>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}

const lkStyledLoongArkFloatingActionButton = /*#__PURE__*/ withAutomaticStyles(LoongArkFloatingActionButton, lkAutomaticFloatingActionButtonStyles);
export { lkStyledLoongArkFloatingActionButton as LoongArkFloatingActionButton };
const lkStyledLoongArkSpeedDial = /*#__PURE__*/ withAutomaticStyles(LoongArkSpeedDial, lkAutomaticSpeedDialStyles);
export { lkStyledLoongArkSpeedDial as LoongArkSpeedDial };
