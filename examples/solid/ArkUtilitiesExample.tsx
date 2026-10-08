/** @jsxImportSource solid-js */
import { createSignal } from "solid-js";
import * as L from "@loongark/solid";
export function ArkUtilitiesExample() {
  const [present, setPresent] = createSignal(true),
    [trapped, setTrapped] = createSignal(false),
    [frameVisible, setFrameVisible] = createSignal(true);
  return (
    <L.LoongArkStack gap="lg" style={{ width: "100%", "max-width": "640px" }}>
      <L.LoongArkTypography as="h2">Accessible utilities</L.LoongArkTypography>
      <p>
        <L.LoongArkHighlight
          text="Find LoongArk in your component workspace."
          query="LoongArk"
        />
      </p>
      <dl>
        <dt>File size</dt>
        <dd>
          <L.LoongArkFormatByte value={2048} unitSystem="binary" />
        </dd>
        <dt>Budget</dt>
        <dd>
          <L.LoongArkFormatNumber
            value={1250.5}
            style="currency"
            currency="USD"
          />
        </dd>
      </dl>
      <L.LoongArkClientOnly fallback={<p>Waiting for client…</p>}>
        <p>Client is ready</p>
      </L.LoongArkClientOnly>
      <L.LoongArkDownloadTrigger
        fileName="loongark-notes.txt"
        mimeType="text/plain"
        data="LoongArk component notes"
        data-scope="button"
        data-part="root"
        data-size="md"
        data-variant="outline"
      >
        Download notes
      </L.LoongArkDownloadTrigger>
      <L.LoongArkButton
        type="button"
        variant="outline"
        onClick={() => setPresent(!present())}
      >
        Toggle presence
      </L.LoongArkButton>
      <L.LoongArkPresence present={present()} lazyMount unmountOnExit>
        <p>Optional details</p>
      </L.LoongArkPresence>
      <L.LoongArkButton
        type="button"
        variant="outline"
        onClick={() => setTrapped(true)}
      >
        Start focus task
      </L.LoongArkButton>
      {trapped() && (
        <L.LoongArkFocusTrap
          initialFocus="#focus-task-input"
          returnFocusOnDeactivate
        >
          <L.LoongArkStack gap="sm">
            <label for="focus-task-input">Task name</label>
            <L.LoongArkInputInput id="focus-task-input" />
            <L.LoongArkButton type="button" onClick={() => setTrapped(false)}>
              Finish focus task
            </L.LoongArkButton>
          </L.LoongArkStack>
        </L.LoongArkFocusTrap>
      )}
      <L.LoongArkButton
        type="button"
        variant="outline"
        onClick={() => setFrameVisible(!frameVisible())}
      >
        Toggle frame
      </L.LoongArkButton>
      {frameVisible() && (
        <L.LoongArkFrame
          title="Isolated dark preview"
          style={{
            width: "100%",
            height: "120px",
            border:
              "var(--lk-control-borderwidth) solid var(--lk-color-semantic-border)",
            "border-radius": "var(--lk-radius-md)",
          }}
        >
          <L.LoongArkProvider mode="dark">
            <main
              aria-label="Isolated preview content"
              style={{
                padding: "var(--lk-space-component-md)",
                "min-height": "120px",
                background: "var(--lk-color-semantic-background)",
                color: "var(--lk-color-semantic-foreground)",
              }}
            >
              <L.LoongArkTypography as="h1">Frame content</L.LoongArkTypography>
              <L.LoongArkButton type="button">Inside frame</L.LoongArkButton>
            </main>
          </L.LoongArkProvider>
        </L.LoongArkFrame>
      )}
    </L.LoongArkStack>
  );
}
