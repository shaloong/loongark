import * as L from "@loongark/react";
import {
  drawerDirections,
  drawerDirectionsCSS,
  drawerSnapPoints,
  type DrawerDirection,
  type DrawerTextDirection,
} from "../shared/drawerDirectionsDemo";
function DirectionPanel({
  direction,
  dir,
}: {
  direction: DrawerDirection;
  dir: DrawerTextDirection;
}) {
  const points = drawerSnapPoints(direction);
  const drawer = L.useDrawer({
    swipeDirection: direction,
    snapPoints: points,
    defaultSnapPoint: points[1],
  });
  return (
    <L.LoongArkDrawerRootProvider value={drawer}>
      <L.LoongArkDrawerTrigger>
        Open {direction} {dir}
      </L.LoongArkDrawerTrigger>
      <L.LoongArkDrawerPortal>
        <L.LoongArkDrawerOverlay />
        <L.LoongArkDrawerPositioner>
          <L.LoongArkDrawerContent
            data-drawer-example
            style={{
              width:
                direction === "start" || direction === "end" ? 320 : undefined,
              height:
                direction === "up" || direction === "down" ? 480 : undefined,
            }}
          >
            <L.LoongArkDrawerGrabber role="group" aria-label="Drag drawer">
              <L.LoongArkDrawerGrabberIndicator />
            </L.LoongArkDrawerGrabber>
            <div data-drawer-viewport>
              <L.LoongArkDrawerTitle>
                {direction} {dir} drawer
              </L.LoongArkDrawerTitle>
              <L.LoongArkDrawerDescription>
                Drag the handle toward the edge to close, or between two snap
                points. Escape returns to the opening button.
              </L.LoongArkDrawerDescription>
              <L.LoongArkInputRoot>
                <L.LoongArkInputLabel>Project name</L.LoongArkInputLabel>
                <L.LoongArkInputControl placeholder="Workspace" />
              </L.LoongArkInputRoot>
              <L.LoongArkButton
                variant="outline"
                onClick={() =>
                  drawer.setSnapPoint(
                    drawer.snapPoint === points[1] ? points[0] : points[1],
                  )
                }
              >
                Toggle snap point
              </L.LoongArkButton>
              <output aria-label="Drawer snap point">
                {String(drawer.snapPoint)}
              </output>
              <L.LoongArkDrawerCancel>Close drawer</L.LoongArkDrawerCancel>
            </div>
          </L.LoongArkDrawerContent>
        </L.LoongArkDrawerPositioner>
      </L.LoongArkDrawerPortal>
    </L.LoongArkDrawerRootProvider>
  );
}
export function DrawerDirectionsExample() {
  return (
    <L.LoongArkStack gap="lg" style={{ width: "100%", maxWidth: 640 }}>
      <style>{drawerDirectionsCSS}</style>
      <L.LoongArkTypography as="h2">
        Drawers from every edge
      </L.LoongArkTypography>
      <L.LoongArkTypography variant="muted">
        Logical start and end mirror in right-to-left layouts. Native drag, snap
        points and keyboard focus share one contract.
      </L.LoongArkTypography>
      {(["ltr", "rtl"] as const).map((dir) => (
        <L.LoongArkLocaleProvider
          key={dir}
          locale={dir === "rtl" ? "ar-EG" : "en-US"}
        >
          <section dir={dir} aria-label={dir.toUpperCase()}>
            <L.LoongArkStack gap="md">
              <L.LoongArkTypography as="h3">
                {dir.toUpperCase()}
              </L.LoongArkTypography>
              <L.LoongArkDrawerStack>
                <div
                  style={{
                    display: "flex",
                    gap: "var(--lk-space-component-sm)",
                    flexWrap: "wrap",
                  }}
                >
                  {drawerDirections.map((direction) => (
                    <DirectionPanel
                      key={direction}
                      direction={direction}
                      dir={dir}
                    />
                  ))}
                </div>
              </L.LoongArkDrawerStack>
            </L.LoongArkStack>
          </section>
        </L.LoongArkLocaleProvider>
      ))}
    </L.LoongArkStack>
  );
}
