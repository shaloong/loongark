import {
  onCleanup,
  createSignal,
  createEffect,
  createMemo,
  For,
  Show,
  splitProps,
  type JSX,
} from "solid-js";
import {
  mountMessageScroller,
  mountVirtualMessageScroller,
  createVirtualWindow,
  messageVirtualOptions,
  virtualViewportHeight,
  type VirtualRenderDetails,
  type MessageScrollerOptions,
} from "@loongark/kit";
export type LoongArkMessageScrollerProps = JSX.HTMLAttributes<HTMLDivElement> &
  MessageScrollerOptions & {
    renderItem?: (details: VirtualRenderDetails) => JSX.Element;
  };
export function LoongArkMessageScroller(props: LoongArkMessageScrollerProps) {
  const [p, attrs] = splitProps(props, [
    "label",
    "jumpLabel",
    "onAtBottomChange",
    "virtualization",
    "renderItem",
    "children",
  ]);
  let root!: HTMLDivElement;
  const model = createVirtualWindow(messageVirtualOptions(p), (value) =>
    setWindow(value),
  );
  const [window, setWindow] = createSignal(model.state);
  createEffect(() => model.setOptions(messageVirtualOptions(p)));
  const virtualEnabled = createMemo(() => !!p.virtualization);
  createEffect(() => {
    if (!root) return;
    const release = virtualEnabled()
      ? mountVirtualMessageScroller(root, model, (details) =>
          p.onAtBottomChange?.(details),
        )
      : mountMessageScroller(root, (details) => p.onAtBottomChange?.(details));
    onCleanup(release);
  });
  return (
    <div data-scope="message-scroller" data-part="root" {...attrs} ref={root}>
      <div
        data-scope="message-scroller"
        data-part="viewport"
        role="region"
        aria-label={p.label ?? "Messages"}
        tabindex="0"
        style={
          p.virtualization
            ? { height: `${virtualViewportHeight(p.virtualization)}px` }
            : undefined
        }
      >
        <div
          data-scope="message-scroller"
          data-part="content"
          data-virtualized={p.virtualization ? "true" : undefined}
          role={p.virtualization ? "list" : undefined}
        >
          <Show when={p.virtualization} fallback={p.children}>
            <For
              each={window()
                .entries.filter((entry) =>
                  props.virtualization?.keys.includes(entry.key),
                )
                .map((entry) => entry.key)}
            >
              {(key) => {
                const initial = window().entries.find(
                  (entry) => entry.key === key,
                )!;
                const entry = () =>
                  window().entries.find((entry) => entry.key === key) ??
                  initial;
                const details: VirtualRenderDetails = {
                  key,
                  get index() {
                    return entry().index;
                  },
                };
                const content = p.renderItem?.(details) ?? key;
                return (
                  <>
                    <Show when={entry().gap > 0}>
                      <div
                        data-part="virtual-spacer"
                        aria-hidden="true"
                        style={{ height: `${entry().gap}px` }}
                      />
                    </Show>
                    <div
                      data-part="virtual-item"
                      data-virtual-key={key}
                      role="listitem"
                      aria-posinset={entry().index + 1}
                      aria-setsize={window().count}
                    >
                      {content}
                    </div>
                  </>
                );
              }}
            </For>
            <Show when={window().after > 0}>
              <div
                data-part="virtual-spacer"
                aria-hidden="true"
                style={{ height: `${window().after}px` }}
              />
            </Show>
          </Show>
        </div>
      </div>
      <button
        data-scope="message-scroller"
        data-part="jump"
        type="button"
        hidden
      >
        {p.jumpLabel ?? "Jump to latest"}
      </button>
    </div>
  );
}
