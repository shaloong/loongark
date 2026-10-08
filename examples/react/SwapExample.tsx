import { useState } from "react";
import * as L from "@loongark/react";
export function SwapExample() {
  const [expanded, setExpanded] = useState(false),
    [mounted, setMounted] = useState(true);
  return (
    <L.LoongArkStack gap="lg" style={{ width: "100%", maxWidth: 640 }}>
      <L.LoongArkTypography as="h2">
        Change a control indicator
      </L.LoongArkTypography>
      <L.LoongArkTypography variant="muted">
        Two indicators share the same slot. Hidden content stays out of keyboard
        navigation.
      </L.LoongArkTypography>
      <L.LoongArkButton variant="outline" onClick={() => setMounted(!mounted)}>
        {mounted ? "Unmount control" : "Mount control"}
      </L.LoongArkButton>
      {mounted && (
        <>
          <L.LoongArkButton
            aria-expanded={expanded}
            aria-controls="swap-details"
            onClick={() => setExpanded(!expanded)}
          >
            <L.LoongArkSwapRoot swap={expanded} lazyMount unmountOnExit>
              <L.LoongArkSwapIndicator type="off">
                Show details
              </L.LoongArkSwapIndicator>
              <L.LoongArkSwapIndicator type="on">
                Hide details
              </L.LoongArkSwapIndicator>
            </L.LoongArkSwapRoot>
          </L.LoongArkButton>
          <L.LoongArkPresence present={expanded} lazyMount unmountOnExit>
            <section id="swap-details" aria-label="Details">
              <p>One control, one accessible name, and a consistent layout.</p>
              <L.LoongArkButton variant="outline">
                Details action
              </L.LoongArkButton>
            </section>
          </L.LoongArkPresence>
        </>
      )}
    </L.LoongArkStack>
  );
}
