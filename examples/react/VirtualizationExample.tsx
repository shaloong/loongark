import React, { useState } from "react";
import {
  LoongArkDataTable,
  LoongArkMessageScroller,
  LoongArkMessage,
  LoongArkBubble,
  LoongArkButton,
  LoongArkTypography,
} from "@loongark/react";
import { createVirtualizationDemo } from "../shared/virtualizationDemo";
export const VirtualizationExample = ({
  mode = "both",
}: { mode?: "table" | "messages" | "both" } = {}) => {
  const [, redraw] = useState(0),
    [demo] = useState(() =>
      createVirtualizationDemo(() => redraw((value) => value + 1)),
    );
  const state = demo.state;
  const button = (label: string, action: () => void) => (
    <LoongArkButton type="button" variant="outline" onClick={action}>
      {label}
    </LoongArkButton>
  );
  return (
    <div
      style={{
        maxWidth: "960px",
        display: "grid",
        gap: "var(--lk-space-component-md)",
      }}
    >
      <LoongArkTypography as="h2">Measured windows</LoongArkTypography>
      <LoongArkTypography variant="muted">
        Only the visible items and focused item stay mounted. Long content is
        measured as it changes.
      </LoongArkTypography>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--lk-space-component-sm)",
        }}
      >
        {button(
          state.shown ? "Hide windows" : "Show windows",
          demo.toggleShown,
        )}
      </div>
      {mode !== "messages" && (
        <>
          <LoongArkTypography as="h3">1,000 editable rows</LoongArkTypography>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--lk-space-component-sm)",
            }}
          >
            {button("Scroll to first row", demo.firstRow)}
            {button("Scroll to row 501", demo.middleRow)}
          </div>
          {state.shown && (
            <LoongArkDataTable
              label="Virtual projects"
              data={state.rows}
              columns={demo.columns}
              pageSize={1000}
              virtualization={{
                height: 360,
                estimateSize: 56,
                overscan: 3,
                scrollToIndex: state.rowIndex,
              }}
              defaultSelectedIds={["row-0", "row-1"]}
              onCellCommit={demo.onCellCommit}
              onBatchCommit={demo.onBatchCommit}
              pinnedColumns={{ start: ["name"] }}
            />
          )}
          <output>{state.status}</output>
        </>
      )}
      {mode !== "table" && (
        <>
          <LoongArkTypography as="h3">
            500 variable height messages
          </LoongArkTypography>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--lk-space-component-sm)",
            }}
          >
            {button("Read middle messages", demo.middleMessages)}
            {button("Add earlier message", demo.prepend)}
            {button("Append message", demo.append)}
            {button("Expand message 251", demo.expand)}
            {button("Remove message 251", demo.removeMessage)}
          </div>
          {state.shown && (
            <LoongArkMessageScroller
              label="Virtual messages"
              virtualization={{
                keys: state.messages.map((message) => message.key),
                height: 360,
                estimateSize: 96,
                overscan: 3,
                scrollToIndex: state.messageIndex,
              }}
              onAtBottomChange={demo.onAtBottomChange}
              renderItem={({ key }) => {
                const message = state.messageMap.get(key)!;
                return (
                  <LoongArkMessage author={message.author}>
                    <LoongArkBubble style={{ whiteSpace: "normal" }}>
                      <p>{message.text}</p>
                      <LoongArkButton
                        type="button"
                        variant="ghost"
                        aria-label={`Inspect ${key}`}
                      >
                        Inspect
                      </LoongArkButton>
                    </LoongArkBubble>
                  </LoongArkMessage>
                );
              }}
            />
          )}
          <output>
            {state.atBottom ? "Following latest" : "Reading earlier messages"}
          </output>
        </>
      )}
    </div>
  );
};
