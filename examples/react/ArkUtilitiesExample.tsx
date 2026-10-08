import { useState } from "react";
import * as L from "@loongark/react";
export function ArkUtilitiesExample() {
  const [present, setPresent] = useState(true),
    [trapped, setTrapped] = useState(false),
    [frameVisible, setFrameVisible] = useState(true);
  return (
    <L.LoongArkStack gap="lg" style={{ width: "100%", maxWidth: 640 }}>
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
        onClick={() => setPresent(!present)}
      >
        Toggle presence
      </L.LoongArkButton>
      <L.LoongArkPresence present={present} lazyMount unmountOnExit>
        <p>Optional details</p>
      </L.LoongArkPresence>
      <L.LoongArkButton
        type="button"
        variant="outline"
        onClick={() => setTrapped(true)}
      >
        Start focus task
      </L.LoongArkButton>
      {trapped && (
        <L.LoongArkFocusTrap
          initialFocus="#focus-task-input"
          returnFocusOnDeactivate
        >
          <L.LoongArkStack gap="sm">
            <L.LoongArkInputRoot>
              <L.LoongArkInputLabel htmlFor="focus-task-input">
                Task name
              </L.LoongArkInputLabel>
              <L.LoongArkInputInput id="focus-task-input" />
            </L.LoongArkInputRoot>
            <L.LoongArkButton type="button" onClick={() => setTrapped(false)}>
              Finish focus task
            </L.LoongArkButton>
          </L.LoongArkStack>
        </L.LoongArkFocusTrap>
      )}
      <L.LoongArkButton
        type="button"
        variant="outline"
        onClick={() => setFrameVisible(!frameVisible)}
      >
        Toggle frame
      </L.LoongArkButton>
      {frameVisible && (
        <L.LoongArkFrame
          title="Isolated dark preview"
          style={{
            width: "100%",
            height: 120,
            border:
              "var(--lk-control-borderwidth) solid var(--lk-color-semantic-border)",
            borderRadius: "var(--lk-radius-md)",
          }}
        >
          <L.LoongArkProvider mode="dark">
            <main
              aria-label="Isolated preview content"
              style={{
                padding: "var(--lk-space-component-md)",
                minHeight: 120,
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
