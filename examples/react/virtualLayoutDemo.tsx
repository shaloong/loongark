import React, { useState } from "react";
import * as L from "@loongark/react";
import { createVirtualLayoutDemo } from "../shared/virtualLayoutDemo";
import {
  groupsDisclosureCSS,
  groupsDisclosureIcon,
} from "../shared/questionnaireGroupsDemo";
export function VirtualLayoutDemo({ kind }: { kind: "grid" | "masonry" }) {
  const [, redraw] = useState(0),
    [demo] = useState(() =>
      createVirtualLayoutDemo(() => redraw((value) => value + 1)),
    ),
    state = demo.state;
  const button = (label: string, action: () => void) => (
    <L.LoongArkButton type="button" variant="outline" onClick={action}>
      {label}
    </L.LoongArkButton>
  );
  return (
    <L.LoongArkStack gap="md" style={{ width: "100%", maxWidth: "960px" }}>
      <style>{groupsDisclosureCSS}</style>
      <L.LoongArkTypography as="h2">
        {kind === "grid"
          ? "10,000 rows, 80 columns"
          : "10,000 items, measured heights"}
      </L.LoongArkTypography>
      <L.LoongArkTypography variant="muted">
        {kind === "grid"
          ? "Arrow keys navigate. Enter/F2 edits; Escape returns. Home/End and Page Up/Down jump."
          : "Scroll, resize and expand a card. Stable keys preserve the reading position."}
      </L.LoongArkTypography>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--lk-space-component-sm)",
        }}
      >
        {button("Go to first item", demo.jumpFirst)}
        {button("Go to item 5001", demo.jumpMiddle)}
      </div>
      <details data-groups-demo-controls>
        <summary>
          <L.LoongArkIcon
            icon={groupsDisclosureIcon}
            size="sm"
            aria-hidden="true"
          />
          More controls
        </summary>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--lk-space-component-sm)",
          }}
        >
          {button(state.rtl ? "Use LTR" : "Use RTL", demo.toggleRtl)}
          {button(
            state.narrow ? "Use full width" : "Use narrow width",
            demo.toggleNarrow,
          )}
          {button(
            state.shown ? "Hide layout" : "Show layout",
            demo.toggleShown,
          )}
          {button(state.empty ? "Restore data" : "Clear data", demo.toggleData)}
          {button("Prepend item", demo.prepend)}
          {button("Remove first item", demo.removeFirst)}
          {button("Remove last item", demo.removeLast)}
        </div>
      </details>
      <div style={{ width: state.narrow ? "320px" : "100%", maxWidth: "100%" }}>
        {state.shown &&
          (kind === "grid" ? (
            <L.LoongArkVirtualGrid
              rowKeys={state.rows}
              columnKeys={state.columns}
              rowSize={demo.rowSize}
              height={360}
              scrollToRow={state.index}
              dir={state.rtl ? "rtl" : "ltr"}
              label="Windowed cells"
              renderCell={(details) =>
                details.columnIndex === 1 ? (
                  <L.LoongArkInputRoot>
                    <L.LoongArkInputInput
                      aria-label={`Note for ${details.rowKey}`}
                      value={demo.note(details)}
                      onChange={(event) =>
                        demo.updateNote(details, event.currentTarget.value)
                      }
                    />
                  </L.LoongArkInputRoot>
                ) : (
                  <span>{`R${details.rowIndex + 1} · C${details.columnIndex + 1}`}</span>
                )
              }
            />
          ) : (
            <L.LoongArkVirtualMasonry
              keys={state.items}
              height={480}
              minColumnWidth={220}
              scrollToIndex={state.index}
              dir={state.rtl ? "rtl" : "ltr"}
              label="Windowed collection"
              renderItem={(entry) => (
                <L.LoongArkCard>
                  <L.LoongArkCardContent>
                    <L.LoongArkStack gap="sm">
                      <L.LoongArkCardTitle>
                        {demo.title(entry)}
                      </L.LoongArkCardTitle>
                      <L.LoongArkTypography variant="muted">
                        {demo.body(entry)}
                      </L.LoongArkTypography>
                      <L.LoongArkButton
                        type="button"
                        variant="outline"
                        aria-expanded={demo.isExpanded(entry.key)}
                        onClick={() => demo.toggleItem(entry.key)}
                      >
                        {demo.isExpanded(entry.key) ? "Collapse" : "Expand"}{" "}
                        {entry.key}
                      </L.LoongArkButton>
                    </L.LoongArkStack>
                  </L.LoongArkCardContent>
                </L.LoongArkCard>
              )}
            />
          ))}
      </div>
    </L.LoongArkStack>
  );
}
