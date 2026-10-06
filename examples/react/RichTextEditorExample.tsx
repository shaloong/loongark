import React, { useState } from "react";
import * as L from "@loongark/react";
import { createRichTextEditorDemo } from "../shared/editorDemo";
export function RichTextEditorExample() {
  const [, redraw] = useState(0);
  const [demo] = useState(() =>
    createRichTextEditorDemo(() => redraw((v) => v + 1)),
  );
  const snapshot = demo.snapshot();
  return (
    <L.LoongArkStack gap="md" style={{ width: "100%", maxWidth: "760px" }}>
      <L.LoongArkTypography as="h2">Write and revise</L.LoongArkTypography>
      <L.LoongArkStack orientation="horizontal" gap="sm">
        {demo.actions.slice(0, 3).map((action) => (
          <L.LoongArkButton variant="outline" onClick={action.run}>
            {action.label()}
          </L.LoongArkButton>
        ))}
      </L.LoongArkStack>
      <details>
        <summary>More controls</summary>
        <L.LoongArkStack orientation="horizontal" gap="sm">
          {demo.actions.slice(3).map((action) => (
            <L.LoongArkButton variant="outline" onClick={action.run}>
              {action.label()}
            </L.LoongArkButton>
          ))}
        </L.LoongArkStack>
      </details>
      <form onSubmit={demo.submit} aria-label="Editor form">
        {snapshot.shown && (
          <L.LoongArkRichTextEditor {...demo.props(snapshot)} />
        )}
        <L.LoongArkStack
          orientation="horizontal"
          gap="sm"
          style={{ marginTop: "var(--lk-space-component-md)" }}
        >
          <L.LoongArkButton type="submit">Submit document</L.LoongArkButton>
          <L.LoongArkButton type="reset" variant="outline">
            Reset form
          </L.LoongArkButton>
        </L.LoongArkStack>
      </form>
      <output aria-label="Editor lifecycle">
        {snapshot.changes} changes · {snapshot.mounted} mounted ·{" "}
        {snapshot.destroyed} destroyed · {snapshot.aborted} canceled
      </output>
      <output aria-label="Editor extensions">
        {snapshot.extensionRuns} shortcuts · {snapshot.pluginMounted} plugins
        mounted · {snapshot.pluginDisposed} plugins destroyed ·{" "}
        {snapshot.nodeViewsCleaned} node views destroyed
      </output>
      <output
        aria-label="Submitted value"
        style={{ overflowWrap: "anywhere", whiteSpace: "pre-wrap" }}
      >
        {snapshot.result}
      </output>
    </L.LoongArkStack>
  );
}
