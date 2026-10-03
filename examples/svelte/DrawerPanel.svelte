<script lang="ts">
  import * as L from "@loongark/svelte";
  const drawer = L.useDrawer(() => ({
    snapPoints: ["220px", "440px"],
    defaultSnapPoint: "220px",
  }));
</script>

<L.LoongArkDrawerRootProvider value={drawer}
  ><L.LoongArkDrawerTrigger>Open details drawer</L.LoongArkDrawerTrigger
  ><L.LoongArkDrawerPortal
    ><L.LoongArkDrawerOverlay /><L.LoongArkDrawerPositioner
      ><L.LoongArkDrawerContent style="height:440px"
        ><L.LoongArkDrawerGrabber aria-label="Drag drawer"
          ><L.LoongArkDrawerGrabberIndicator /></L.LoongArkDrawerGrabber
        ><L.LoongArkDrawerTitle>Project details</L.LoongArkDrawerTitle
        ><L.LoongArkDrawerDescription
          >Drag, resize and inspect a nested dialog.</L.LoongArkDrawerDescription
        ><L.LoongArkButton
          variant="outline"
          onclick={() =>
            drawer().setSnapPoint(
              drawer().snapPoint === "440px" ? "220px" : "440px",
            )}
          >{drawer().snapPoint === "440px"
            ? "Compact drawer"
            : "Expand drawer"}</L.LoongArkButton
        ><output aria-label="Drawer snap point"
          >{String(drawer().snapPoint)}</output
        >
        <L.LoongArkDrawerRoot
          ><L.LoongArkDrawerTrigger>Open nested drawer</L.LoongArkDrawerTrigger
          ><L.LoongArkDrawerPortal
            ><L.LoongArkDrawerOverlay /><L.LoongArkDrawerPositioner
              ><L.LoongArkDrawerContent
                ><L.LoongArkDrawerGrabber
                  ><L.LoongArkDrawerGrabberIndicator /></L.LoongArkDrawerGrabber
                ><L.LoongArkDrawerTitle
                  >Nested confirmation</L.LoongArkDrawerTitle
                ><L.LoongArkDrawerDescription
                  >Closing this drawer returns to project details.</L.LoongArkDrawerDescription
                ><L.LoongArkDrawerAction>Confirm nested</L.LoongArkDrawerAction
                ></L.LoongArkDrawerContent
              ></L.LoongArkDrawerPositioner
            ></L.LoongArkDrawerPortal
          ></L.LoongArkDrawerRoot
        ><L.LoongArkDrawerCancel>Close details</L.LoongArkDrawerCancel>
      </L.LoongArkDrawerContent></L.LoongArkDrawerPositioner
    ></L.LoongArkDrawerPortal
  ></L.LoongArkDrawerRootProvider
>
