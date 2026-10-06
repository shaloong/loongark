/** @jsxImportSource solid-js */
import { createSignal } from "solid-js";
import * as L from "@loongark/solid";
import { createCodeEditorDemo } from "../shared/editorDemo";
export function CodeEditorExample() {
  const [version, redraw] = createSignal(0);
  const demo = createCodeEditorDemo(() => redraw((v) => v + 1));
  const snapshot = () => {
    version();
    return demo.snapshot();
  };
  return (
    <L.LoongArkStack gap="md" style={{ width: "100%", "max-width": "760px" }}>
      <L.LoongArkTypography as="h2">Code workspace</L.LoongArkTypography>
      <L.LoongArkStack orientation="horizontal" gap="sm">
        {demo.actions.slice(0, 3).map((action) => (
          <L.LoongArkButton variant="outline" onClick={action.run}>
            {(snapshot(), action.label())}
          </L.LoongArkButton>
        ))}
      </L.LoongArkStack>
      <details>
        <summary>More controls</summary>
        <L.LoongArkStack orientation="horizontal" gap="sm">
          {demo.actions.slice(3).map((action) => (
            <L.LoongArkButton variant="outline" onClick={action.run}>
              {(snapshot(), action.label())}
            </L.LoongArkButton>
          ))}
        </L.LoongArkStack>
      </details>
      <form onSubmit={demo.submit} aria-label="Editor form">
        {snapshot().shown && (
          <L.LoongArkCodeEditor {...demo.props(snapshot())} />
        )}
        <L.LoongArkStack
          orientation="horizontal"
          gap="sm"
          style={{ "margin-top": "var(--lk-space-component-md)" }}
        >
          <L.LoongArkButton type="submit">Submit document</L.LoongArkButton>
          <L.LoongArkButton type="reset" variant="outline">
            Reset form
          </L.LoongArkButton>
        </L.LoongArkStack>
      </form>
      <output aria-label="Editor lifecycle">
        {snapshot().changes} changes · {snapshot().mounted} mounted ·{" "}
        {snapshot().destroyed} destroyed · {snapshot().aborted} canceled
      </output>
      <output aria-label="Editor extensions">
        {snapshot().extensionRuns} shortcuts · {snapshot().pluginMounted}{" "}
        plugins mounted · {snapshot().pluginDisposed} plugins destroyed ·{" "}
        {snapshot().nodeViewsCleaned} node views destroyed
      </output>
      <output
        aria-label="Submitted value"
        style={{ "overflow-wrap": "anywhere", "white-space": "pre-wrap" }}
      >
        {snapshot().result}
      </output>
    </L.LoongArkStack>
  );
}
