import {
  createElement,
  forwardRef,
  useId,
  useRef,
  useEffect,
  useState,
  type AllHTMLAttributes,
  type ButtonHTMLAttributes,
} from "react";
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
export type LoongArkMediaLayoutProps = Omit<
  AllHTMLAttributes<HTMLElement>,
  "span"
> &
  MediaLayoutOptions;
const make = (part: MediaPart) =>
  forwardRef<HTMLElement, LoongArkMediaLayoutProps>(
    (
      {
        columns,
        gap,
        columnSpan,
        rowSpan,
        rowHeight,
        responsive,
        style,
        ...attrs
      },
      ref,
    ) =>
      createElement(mediaParts[part][0], {
        ...mediaAttributes(part, { responsive }),
        ...attrs,
        ref,
        style: {
          ...mediaStyles({ columns, gap, columnSpan, rowSpan, rowHeight }),
          ...style,
        },
      }),
  );
export const LoongArkImageList = make("ImageList");
export const LoongArkImageListItem = make("ImageListItem");
export const LoongArkImageListCaption = make("ImageListCaption");
export const LoongArkMasonry = make("Masonry");
export const LoongArkMasonryItem = make("MasonryItem");
export type LoongArkFloatingActionButtonProps =
  ButtonHTMLAttributes<HTMLButtonElement> & FloatingActionButtonOptions;
export const LoongArkFloatingActionButton = forwardRef<
  HTMLButtonElement,
  LoongArkFloatingActionButtonProps
>(({ size, variant, extended, type = "button", ...attrs }, ref) => (
  <button
    {...fabAttributes({ size, variant, extended })}
    type={type}
    {...attrs}
    ref={ref}
  />
));
export type LoongArkSpeedDialProps = Omit<
  AllHTMLAttributes<HTMLDivElement>,
  "onSelect"
> &
  SpeedDialOptions;
export function LoongArkSpeedDial({
  label,
  actions,
  direction = "up",
  disabled = false,
  open,
  defaultOpen = false,
  onOpenChange,
  onSelect,
  ...attrs
}: LoongArkSpeedDialProps) {
  const uid = useId(),
    root = useRef<HTMLDivElement>(null),
    [internal, setInternal] = useState(defaultOpen),
    callback = useRef<(next: boolean) => void>(() => {});
  const available = speedDialActions(actions),
    opened = !disabled && available.length > 0 && (open ?? internal);
  const change = (next: boolean) => {
    if (next && (disabled || !available.length)) return;
    if (next === opened) return;
    if (open === undefined) setInternal(next);
    onOpenChange?.({ open: next });
  };
  callback.current = change;
  useEffect(
    () =>
      root.current
        ? mountSpeedDial(root.current, (next) => callback.current(next))
        : undefined,
    [],
  );
  const select = (value: string) => {
    if (disabled) return;
    onSelect?.({ value });
    change(false);
    root.current
      ?.querySelector<HTMLButtonElement>("[data-part=trigger]")
      ?.focus();
  };
  return (
    <div
      data-scope="speed-dial"
      data-part="root"
      data-state={opened ? "open" : "closed"}
      data-direction={direction}
      {...attrs}
      ref={root}
    >
      <button
        {...fabAttributes()}
        data-scope="speed-dial"
        data-part="trigger"
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={opened}
        aria-controls={uid}
        disabled={disabled || !available.length}
        onClick={() => change(!opened)}
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
        aria-label={label}
        aria-orientation={
          direction === "up" || direction === "down" ? "vertical" : "horizontal"
        }
        hidden={!opened}
      >
        {actions.map((a) => (
          <li key={a.value} role="none">
            <button
              data-scope="speed-dial"
              data-part="action"
              role="menuitem"
              type="button"
              tabIndex={-1}
              disabled={disabled || a.disabled}
              onClick={() => select(a.value)}
            >
              <span aria-hidden="true">{a.icon ?? "•"}</span>
              {a.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
