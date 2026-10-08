import { useEffect, useRef, useState } from "react";
import * as L from "@loongark/react";
import {
  createMessageScrollerDemo,
  messageScrollerInitialState,
  messagePreview,
} from "../shared/messageScrollerDemo";
export function MessageScrollerAdvancedExample() {
  const [view, setView] = useState(messageScrollerInitialState),
    [visible, setVisible] = useState(true),
    [following, setFollowing] = useState(true);
  const source =
      useRef<ReturnType<typeof createMessageScrollerDemo>>(undefined),
    host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const current = createMessageScrollerDemo(setView);
    source.current = current;
    setView(current.state);
    return () => {
      current.dispose();
      if (source.current === current) source.current = undefined;
    };
  }, []);
  const readEarlier = () => {
    const viewport = host.current?.querySelector<HTMLElement>(
        '[data-part="viewport"]',
      ),
      row = host.current?.querySelector<HTMLElement>(
        '[data-message-id="reply-4"]',
      );
    if (!viewport || !row) return;
    viewport.scrollTop +=
      row.getBoundingClientRect().top -
      viewport.getBoundingClientRect().top -
      viewport.clientTop;
    viewport.focus({ preventScroll: true });
  };
  return (
    <L.LoongArkStack gap="md" style={{ width: "100%", maxWidth: 640 }}>
      <L.LoongArkTypography as="h2">
        Keep the discussion in view
      </L.LoongArkTypography>
      <L.LoongArkTypography variant="muted">
        Read earlier replies while a shared preview loads and new notes arrive.
      </L.LoongArkTypography>
      <L.LoongArkStack orientation="horizontal" gap="sm">
        <L.LoongArkButton
          variant="outline"
          disabled={!visible}
          onClick={readEarlier}
        >
          Read earlier replies
        </L.LoongArkButton>
        <L.LoongArkButton
          variant="outline"
          disabled={!visible}
          aria-busy={view.preview === "loading" ? true : undefined}
          onClick={() =>
            view.preview === "idle"
              ? source.current?.loadPreview()
              : source.current?.hidePreview()
          }
        >
          {view.preview === "loaded"
            ? "Hide shared preview"
            : view.preview === "loading"
              ? "Cancel preview load"
              : "Load shared preview"}
        </L.LoongArkButton>
        <L.LoongArkButton
          variant="ghost"
          onClick={() => source.current?.insertHistoryAndReply()}
        >
          Insert history and reply
        </L.LoongArkButton>
        <L.LoongArkButton
          variant="ghost"
          onClick={() => source.current?.addReply()}
        >
          Add reply
        </L.LoongArkButton>
        <L.LoongArkButton
          variant="ghost"
          onClick={() => {
            source.current?.reset();
            setFollowing(true);
          }}
        >
          Reset thread
        </L.LoongArkButton>
        <L.LoongArkButton
          variant="ghost"
          onClick={() => {
            source.current?.cancelPreview();
            setVisible(!visible);
            setFollowing(true);
          }}
        >
          {visible ? "Hide conversation" : "Show conversation"}
        </L.LoongArkButton>
      </L.LoongArkStack>
      <output aria-label="Reading mode">
        {!visible
          ? "Conversation hidden"
          : following
            ? "Following latest replies"
            : "Reading earlier replies"}
      </output>
      <div ref={host}>
        {visible ? (
          <L.LoongArkMessageScroller
            key={view.generation}
            label="Workspace discussion"
            onAtBottomChange={(d) => setFollowing(d.atBottom)}
          >
            {view.rows.map((row) => (
              <L.LoongArkMessage
                key={row.id}
                data-message-id={row.id}
                author={row.author}
                side={row.side}
                timeLabel="09:30"
                dateTime="2026-10-03T09:30:00+08:00"
              >
                <L.LoongArkBubble
                  side={row.side}
                  style={{ whiteSpace: "normal" }}
                >
                  {row.id === "reply-0" && view.preview === "loaded" && (
                    <img
                      src={messagePreview.src}
                      alt={messagePreview.alt}
                      style={{
                        display: "block",
                        width: "100%",
                        maxWidth: 320,
                        height: "auto",
                        borderRadius: "var(--lk-radius-md)",
                        marginBottom: "var(--lk-space-component-sm)",
                      }}
                    />
                  )}
                  <L.LoongArkTypography as="p" style={{ margin: 0 }}>
                    {row.body}
                  </L.LoongArkTypography>
                </L.LoongArkBubble>
              </L.LoongArkMessage>
            ))}
          </L.LoongArkMessageScroller>
        ) : (
          <L.LoongArkTypography variant="muted" role="status">
            Show the conversation to continue reading.
          </L.LoongArkTypography>
        )}
      </div>
    </L.LoongArkStack>
  );
}
