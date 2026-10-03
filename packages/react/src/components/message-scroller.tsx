import { useEffect, useRef, type HTMLAttributes } from "react";
import {
  mountMessageScroller,
  type MessageScrollerOptions,
} from "@loongark/kit";
export type LoongArkMessageScrollerProps = HTMLAttributes<HTMLDivElement> &
  MessageScrollerOptions;
export function LoongArkMessageScroller({
  label = "Messages",
  jumpLabel = "Jump to latest",
  onAtBottomChange,
  children,
  ...attrs
}: LoongArkMessageScrollerProps) {
  const root = useRef<HTMLDivElement>(null),
    callback = useRef(onAtBottomChange);
  callback.current = onAtBottomChange;
  useEffect(
    () =>
      root.current
        ? mountMessageScroller(root.current, (d) => callback.current?.(d))
        : undefined,
    [],
  );
  return (
    <div data-scope="message-scroller" data-part="root" {...attrs} ref={root}>
      <div
        data-scope="message-scroller"
        data-part="viewport"
        role="region"
        aria-label={label}
        tabIndex={0}
      >
        <div data-scope="message-scroller" data-part="content">
          {children}
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
