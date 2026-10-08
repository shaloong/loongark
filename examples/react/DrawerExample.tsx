import * as L from "@loongark/react";
function DrawerPanel() {
  const drawer = L.useDrawer({
    snapPoints: ["220px", "440px"],
    defaultSnapPoint: "220px",
  });
  return (
    <L.LoongArkStack gap="lg" style={{ width: "100%", maxWidth: 640 }}>
      <L.LoongArkTypography as="h2">An interactive drawer</L.LoongArkTypography>
      <L.LoongArkTypography variant="muted">
        Drag the handle between two snap points, or down to dismiss. Escape
        restores focus to the trigger.
      </L.LoongArkTypography>

      <L.LoongArkDrawerRootProvider value={drawer}>
        <L.LoongArkDrawerTrigger>Open details drawer</L.LoongArkDrawerTrigger>
        <L.LoongArkDrawerPortal>
          <L.LoongArkDrawerOverlay />
          <L.LoongArkDrawerPositioner>
            <L.LoongArkDrawerContent style={{ height: 440 }}>
              <L.LoongArkDrawerGrabber role="group" aria-label="Drag drawer">
                <L.LoongArkDrawerGrabberIndicator />
              </L.LoongArkDrawerGrabber>
              <L.LoongArkDrawerTitle>Project details</L.LoongArkDrawerTitle>
              <L.LoongArkDrawerDescription>
                Drag, resize and inspect a nested dialog.
              </L.LoongArkDrawerDescription>
              <L.LoongArkButton
                variant="outline"
                onClick={() =>
                  drawer.setSnapPoint(
                    drawer.snapPoint === "440px" ? "220px" : "440px",
                  )
                }
              >
                {drawer.snapPoint === "440px"
                  ? "Compact drawer"
                  : "Expand drawer"}
              </L.LoongArkButton>
              <output aria-label="Drawer snap point">
                {String(drawer.snapPoint)}
              </output>
              <L.LoongArkDrawerRoot>
                <L.LoongArkDrawerTrigger>
                  Open nested drawer
                </L.LoongArkDrawerTrigger>
                <L.LoongArkDrawerPortal>
                  <L.LoongArkDrawerOverlay />
                  <L.LoongArkDrawerPositioner>
                    <L.LoongArkDrawerContent>
                      <L.LoongArkDrawerGrabber>
                        <L.LoongArkDrawerGrabberIndicator />
                      </L.LoongArkDrawerGrabber>
                      <L.LoongArkDrawerTitle>
                        Nested confirmation
                      </L.LoongArkDrawerTitle>
                      <L.LoongArkDrawerDescription>
                        Closing this drawer returns to project details.
                      </L.LoongArkDrawerDescription>
                      <L.LoongArkDrawerAction>
                        Confirm nested
                      </L.LoongArkDrawerAction>
                    </L.LoongArkDrawerContent>
                  </L.LoongArkDrawerPositioner>
                </L.LoongArkDrawerPortal>
              </L.LoongArkDrawerRoot>
              <L.LoongArkDrawerCancel>Close details</L.LoongArkDrawerCancel>
            </L.LoongArkDrawerContent>
          </L.LoongArkDrawerPositioner>
        </L.LoongArkDrawerPortal>
      </L.LoongArkDrawerRootProvider>
    </L.LoongArkStack>
  );
}

export function DrawerExample() {
  return (
    <L.LoongArkDrawerStack>
      <DrawerPanel />
    </L.LoongArkDrawerStack>
  );
}
