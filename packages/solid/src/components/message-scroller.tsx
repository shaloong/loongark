import { onMount, onCleanup, splitProps, type JSX } from "solid-js";
import {
  mountMessageScroller,
  type MessageScrollerOptions,
} from "@loongark/kit";
export type LoongArkMessageScrollerProps = JSX.HTMLAttributes<HTMLDivElement> &
  MessageScrollerOptions;
export function LoongArkMessageScroller(props: LoongArkMessageScrollerProps) {
  const [p, attrs] = splitProps(props, [
    "label",
    "jumpLabel",
    "onAtBottomChange",
    "children",
  ]);
  let root!: HTMLDivElement, release: (() => void) | undefined;
  onMount(
    () =>
      (release = mountMessageScroller(root, (d) => p.onAtBottomChange?.(d))),
  );
  onCleanup(() => release?.());
  return (
    <div data-scope="message-scroller" data-part="root" {...attrs} ref={root}>
      <div
        data-scope="message-scroller"
        data-part="viewport"
        role="region"
        aria-label={p.label ?? "Messages"}
        tabIndex={0}
      >
        <div data-scope="message-scroller" data-part="content">
          {p.children}
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
