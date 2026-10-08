/** @jsxImportSource solid-js */
import { createSignal } from "solid-js";
import * as L from "@loongark/solid";
import { contextMenuDemoCSS } from "../shared/contextMenuDemo";
export function ContextMenuExample() {
  const [selection, setSelection] = createSignal("No action selected");
  return (
    <section
      data-context-demo
      style={{ display: "grid", gap: "var(--lk-space-component-md)" }}
    >
      <style>{contextMenuDemoCSS}</style>
      <h2>Context actions</h2>
      <p>
        Right-click or press and hold the target. The actions button also
        supports keyboard navigation.
      </p>
      <L.LoongArkMenuRoot onSelect={(details) => setSelection(details.value)}>
        <L.LoongArkContextMenu.Trigger
          tabIndex={0}
          style={{
            padding: "var(--lk-space-component-lg)",
            border:
              "var(--lk-control-borderwidth) solid var(--lk-color-semantic-border)",
            "border-radius": "var(--lk-radius-lg)",
          }}
        >
          Context target
        </L.LoongArkContextMenu.Trigger>
        <L.LoongArkMenuTrigger data-context-actions>
          Open actions
        </L.LoongArkMenuTrigger>
        <L.LoongArkPortal>
          <L.LoongArkMenuPositioner>
            <L.LoongArkMenuContent>
              <L.LoongArkMenuItem value="refresh">Refresh</L.LoongArkMenuItem>
              <L.LoongArkMenuItem value="archive">Archive</L.LoongArkMenuItem>
            </L.LoongArkMenuContent>
          </L.LoongArkMenuPositioner>
        </L.LoongArkPortal>
      </L.LoongArkMenuRoot>
      <output aria-label="Selected action">{selection()}</output>
    </section>
  );
}
