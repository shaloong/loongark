<script lang="ts">
  import * as L from "@loongark/svelte";
  import {
    drawerSnapPoints,
    mountDrawerViewportFocus,
    type DrawerDirection,
    type DrawerTextDirection,
  } from "../shared/drawerDirectionsDemo";
  let {
    direction,
    dir,
  }: { direction: DrawerDirection; dir: DrawerTextDirection } = $props();
  const points = $derived(drawerSnapPoints(direction));
  const viewportFocus = (node: HTMLElement) => ({
    destroy: mountDrawerViewportFocus(node),
  });
  const drawer = L.useDrawer(() => ({
    swipeDirection: direction,
    snapPoints: points,
    defaultSnapPoint: points[1],
  }));
</script>

<L.LoongArkDrawerRootProvider value={drawer}>
  <L.LoongArkDrawerTrigger>Open {direction} {dir}</L.LoongArkDrawerTrigger>
  <L.LoongArkDrawerPortal
    ><L.LoongArkDrawerOverlay /><L.LoongArkDrawerPositioner>
      <L.LoongArkDrawerContent
        data-drawer-example
        style={`width:${direction === "start" || direction === "end" ? "320px" : ""};height:${direction === "up" || direction === "down" ? "480px" : ""}`}
      >
        <L.LoongArkDrawerGrabber role="group" aria-label="Drag drawer"
          ><L.LoongArkDrawerGrabberIndicator /></L.LoongArkDrawerGrabber
        >
        <div data-drawer-viewport use:viewportFocus>
          <L.LoongArkDrawerTitle>{direction} {dir} drawer</L.LoongArkDrawerTitle
          >
          <L.LoongArkDrawerDescription
            >Drag the handle toward the edge to close, or between two snap
            points. Escape returns to the opening button.</L.LoongArkDrawerDescription
          >
          <L.LoongArkInputRoot
            ><L.LoongArkInputLabel>Project name</L.LoongArkInputLabel
            ><L.LoongArkInputControl
              placeholder="Workspace"
            /></L.LoongArkInputRoot
          >
          <L.LoongArkButton
            variant="outline"
            onclick={() =>
              drawer().setSnapPoint(
                drawer().snapPoint === points[1] ? points[0] : points[1],
              )}>Toggle snap point</L.LoongArkButton
          >
          <output aria-label="Drawer snap point"
            >{String(drawer().snapPoint)}</output
          >
          <L.LoongArkDrawerCancel>Close drawer</L.LoongArkDrawerCancel>
        </div>
      </L.LoongArkDrawerContent>
    </L.LoongArkDrawerPositioner></L.LoongArkDrawerPortal
  >
</L.LoongArkDrawerRootProvider>
