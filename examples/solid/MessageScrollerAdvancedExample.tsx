/** @jsxImportSource solid-js */
import { createSignal, For, Show, onCleanup } from "solid-js";
import * as L from "@loongark/solid";
import {
  createMessageScrollerDemo,
  messageScrollerInitialState,
  messagePreview,
} from "../shared/messageScrollerDemo";
export function MessageScrollerAdvancedExample() {
  const [view, setView] = createSignal(messageScrollerInitialState()),
    [visible, setVisible] = createSignal(true),
    [following, setFollowing] = createSignal(true);
  const source = createMessageScrollerDemo(setView);
  onCleanup(() => source.dispose());
  let host: HTMLDivElement | undefined;
  const readEarlier = () => {
    const viewport = host?.querySelector<HTMLElement>('[data-part="viewport"]'),
      row = host?.querySelector<HTMLElement>('[data-message-id="reply-4"]');
    if (!viewport || !row) return;
    viewport.scrollTop +=
      row.getBoundingClientRect().top -
      viewport.getBoundingClientRect().top -
      viewport.clientTop;
    viewport.focus({ preventScroll: true });
  };
  return (
    <L.LoongArkStack gap="md" style={{ width: "100%", "max-width": "640px" }}>
      <L.LoongArkTypography as="h2">
        Keep the discussion in view
      </L.LoongArkTypography>
      <L.LoongArkTypography variant="muted">
        Read earlier replies while a shared preview loads and new notes arrive.
      </L.LoongArkTypography>
      <L.LoongArkStack orientation="horizontal" gap="sm">
        <L.LoongArkButton
          variant="outline"
          disabled={!visible()}
          onClick={readEarlier}
        >
          Read earlier replies
        </L.LoongArkButton>
        <L.LoongArkButton
          variant="outline"
          disabled={!visible()}
          aria-busy={view().preview === "loading" ? true : undefined}
          onClick={() =>
            view().preview === "idle"
              ? source.loadPreview()
              : source.hidePreview()
          }
        >
          {view().preview === "loaded"
            ? "Hide shared preview"
            : view().preview === "loading"
              ? "Cancel preview load"
              : "Load shared preview"}
        </L.LoongArkButton>
        <L.LoongArkButton
          variant="ghost"
          onClick={() => source.insertHistoryAndReply()}
        >
          Insert history and reply
        </L.LoongArkButton>
        <L.LoongArkButton variant="ghost" onClick={() => source.addReply()}>
          Add reply
        </L.LoongArkButton>
        <L.LoongArkButton
          variant="ghost"
          onClick={() => {
            source.reset();
            setFollowing(true);
          }}
        >
          Reset thread
        </L.LoongArkButton>
        <L.LoongArkButton
          variant="ghost"
          onClick={() => {
            source.cancelPreview();
            setVisible(!visible());
            setFollowing(true);
          }}
        >
          {visible() ? "Hide conversation" : "Show conversation"}
        </L.LoongArkButton>
      </L.LoongArkStack>
      <output aria-label="Reading mode">
        {!visible()
          ? "Conversation hidden"
          : following()
            ? "Following latest replies"
            : "Reading earlier replies"}
      </output>
      <div ref={host}>
        <Show
          when={visible() ? view().generation + 1 : false}
          keyed
          fallback={
            <L.LoongArkTypography variant="muted" role="status">
              Show the conversation to continue reading.
            </L.LoongArkTypography>
          }
        >
          {(_generation) => (
            <L.LoongArkMessageScroller
              label="Workspace discussion"
              onAtBottomChange={(d) => setFollowing(d.atBottom)}
            >
              <For each={view().rows}>
                {(row) => (
                  <L.LoongArkMessage
                    data-message-id={row.id}
                    author={row.author}
                    side={row.side}
                    timeLabel="09:30"
                    dateTime="2026-10-03T09:30:00+08:00"
                  >
                    <L.LoongArkBubble
                      side={row.side}
                      style={{ "white-space": "normal" }}
                    >
                      {row.id === "reply-0" && view().preview === "loaded" && (
                        <img
                          src={messagePreview.src}
                          alt={messagePreview.alt}
                          style={{
                            display: "block",
                            width: "100%",
                            "max-width": "320px",
                            height: "auto",
                            "border-radius": "var(--lk-radius-md)",
                            "margin-bottom": "var(--lk-space-component-sm)",
                          }}
                        />
                      )}
                      <L.LoongArkTypography as="p" style={{ margin: 0 }}>
                        {row.body}
                      </L.LoongArkTypography>
                    </L.LoongArkBubble>
                  </L.LoongArkMessage>
                )}
              </For>
            </L.LoongArkMessageScroller>
          )}
        </Show>
      </div>
    </L.LoongArkStack>
  );
}
