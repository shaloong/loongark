/** @jsxImportSource solid-js */
import { createSignal, Show } from "solid-js";
import {
  LoongArkDataTable,
  LoongArkMessageScroller,
  LoongArkMessage,
  LoongArkBubble,
  LoongArkButton,
  LoongArkTypography,
} from "@loongark/solid";
import { createVirtualizationDemo } from "../shared/virtualizationDemo";
export const VirtualizationExample = (
  props: { mode?: "table" | "messages" | "both" } = {},
) => {
  const [version, redraw] = createSignal(0),
    demo = createVirtualizationDemo(() => redraw((value) => value + 1));
  const state = () => {
    version();
    return demo.state;
  };
  const button = (label: string, action: () => void) => (
    <LoongArkButton type="button" variant="outline" onClick={action}>
      {label}
    </LoongArkButton>
  );
  return (
    <div
      style={{
        "max-width": "960px",
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
          "flex-wrap": "wrap",
          gap: "var(--lk-space-component-sm)",
        }}
      >
        <LoongArkButton
          type="button"
          variant="outline"
          onClick={demo.toggleShown}
        >
          {state().shown ? "Hide windows" : "Show windows"}
        </LoongArkButton>
      </div>
      <Show when={props.mode !== "messages"}>
        <LoongArkTypography as="h3">1,000 editable rows</LoongArkTypography>
        <div
          style={{
            display: "flex",
            "flex-wrap": "wrap",
            gap: "var(--lk-space-component-sm)",
          }}
        >
          {button("Scroll to first row", demo.firstRow)}
          {button("Scroll to row 501", demo.middleRow)}
        </div>
        <Show when={state().shown}>
          <LoongArkDataTable
            label="Virtual projects"
            data={state().rows}
            columns={demo.columns}
            pageSize={1000}
            virtualization={{
              height: 360,
              estimateSize: 56,
              overscan: 3,
              scrollToIndex: state().rowIndex,
            }}
            defaultSelectedIds={["row-0", "row-1"]}
            onCellCommit={demo.onCellCommit}
            onBatchCommit={demo.onBatchCommit}
            pinnedColumns={{ start: ["name"] }}
          />
        </Show>
        <output>{state().status}</output>
      </Show>
      <Show when={props.mode !== "table"}>
        <LoongArkTypography as="h3">
          500 variable height messages
        </LoongArkTypography>
        <div
          style={{
            display: "flex",
            "flex-wrap": "wrap",
            gap: "var(--lk-space-component-sm)",
          }}
        >
          {button("Read middle messages", demo.middleMessages)}
          {button("Add earlier message", demo.prepend)}
          {button("Append message", demo.append)}
          {button("Expand message 251", demo.expand)}
          {button("Remove message 251", demo.removeMessage)}
        </div>
        <Show when={state().shown}>
          <LoongArkMessageScroller
            label="Virtual messages"
            virtualization={{
              keys: state().messages.map((message) => message.key),
              height: 360,
              estimateSize: 96,
              overscan: 3,
              scrollToIndex: state().messageIndex,
            }}
            onAtBottomChange={demo.onAtBottomChange}
            renderItem={({ key }) => (
              <LoongArkMessage author={state().messageMap.get(key)!.author}>
                <LoongArkBubble style={{ "white-space": "normal" }}>
                  <p>{state().messageMap.get(key)!.text}</p>
                  <LoongArkButton
                    type="button"
                    variant="ghost"
                    aria-label={`Inspect ${key}`}
                  >
                    Inspect
                  </LoongArkButton>
                </LoongArkBubble>
              </LoongArkMessage>
            )}
          />
        </Show>
        <output>
          {state().atBottom ? "Following latest" : "Reading earlier messages"}
        </output>
      </Show>
    </div>
  );
};
