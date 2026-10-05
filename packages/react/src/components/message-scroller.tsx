import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import {
  mountMessageScroller,
  mountVirtualMessageScroller,
  createVirtualWindow,
  messageVirtualOptions,
  virtualViewportHeight,
  type VirtualRenderDetails,
  type MessageScrollerOptions,
} from "@loongark/kit";
export type LoongArkMessageScrollerProps = HTMLAttributes<HTMLDivElement> &
  MessageScrollerOptions & {
    renderItem?: (details: VirtualRenderDetails) => ReactNode;
  };
export function LoongArkMessageScroller({
  label = "Messages",
  jumpLabel = "Jump to latest",
  onAtBottomChange,
  virtualization,
  renderItem,
  children,
  ...attrs
}: LoongArkMessageScrollerProps) {
  const root = useRef<HTMLDivElement>(null),
    callback = useRef(onAtBottomChange);
  callback.current = onAtBottomChange;
  const [model] = useState(() =>
    createVirtualWindow(messageVirtualOptions({ virtualization }), (value) =>
      setWindow(value),
    ),
  );
  const [window, setWindow] = useState(model.state);
  useLayoutEffect(() =>
    model.setOptions(messageVirtualOptions({ virtualization })),
  );
  useEffect(
    () =>
      root.current
        ? virtualization
          ? mountVirtualMessageScroller(root.current, model, (details) =>
              callback.current?.(details),
            )
          : mountMessageScroller(root.current, (details) =>
              callback.current?.(details),
            )
        : undefined,
    [model, !!virtualization],
  );
  return (
    <div data-scope="message-scroller" data-part="root" {...attrs} ref={root}>
      <div
        data-scope="message-scroller"
        data-part="viewport"
        role="region"
        aria-label={label}
        tabIndex={0}
        style={
          virtualization
            ? { height: `${virtualViewportHeight(virtualization)}px` }
            : undefined
        }
      >
        <div
          data-scope="message-scroller"
          data-part="content"
          data-virtualized={virtualization ? "true" : undefined}
          role={virtualization ? "list" : undefined}
        >
          {virtualization ? (
            <>
              {window.entries
                .filter((entry) => virtualization.keys.includes(entry.key))
                .map((entry) => (
                  <React.Fragment key={entry.key}>
                    {entry.gap > 0 && (
                      <div
                        data-part="virtual-spacer"
                        aria-hidden="true"
                        style={{ height: `${entry.gap}px` }}
                      />
                    )}
                    <div
                      data-part="virtual-item"
                      data-virtual-key={entry.key}
                      role="listitem"
                      aria-posinset={entry.index + 1}
                      aria-setsize={window.count}
                    >
                      {renderItem?.({ key: entry.key, index: entry.index }) ??
                        entry.key}
                    </div>
                  </React.Fragment>
                ))}
              {window.after > 0 && (
                <div
                  data-part="virtual-spacer"
                  aria-hidden="true"
                  style={{ height: `${window.after}px` }}
                />
              )}
            </>
          ) : (
            children
          )}
        </div>
      </div>
      <button
        data-scope="message-scroller"
        data-part="jump"
        type="button"
        hidden
      >
        {jumpLabel}
      </button>
    </div>
  );
}
