<script lang="ts">
  import * as L from "@loongark/svelte";
  import { cropSource } from "../shared/arkAdditionsDemo";
  const cropper = L.useImageCropper(() => ({ aspectRatio: 1, maxZoom: 3 }));
  let preview = $state<string>(),
    busy = $state(false),
    error = $state("");
  async function exportCrop() {
    busy = true;
    error = "";
    try {
      const result = await L.exportImageCropper(cropper(), { output: "dataUrl" });
      if (typeof result === "string") preview = result;
      else error = "Image is not ready.";
    } catch {
      error = "Unable to export this image.";
    } finally {
      busy = false;
    }
  }
</script>

<L.LoongArkStack gap="md" style="width:100%;max-width:640px">
  <L.LoongArkTypography as="h2">Crop an image</L.LoongArkTypography>
  <L.LoongArkTypography variant="muted"
    >Drag the selection or use arrow keys. Shift moves faster.</L.LoongArkTypography
  >
  <L.LoongArkImageCropperRootProvider value={cropper}>
    <L.LoongArkImageCropperViewport
      ><L.LoongArkImageCropperImage
        src={cropSource}
        alt="Blue mountains with a coral sun"
      /><L.LoongArkImageCropperSelection
        >{#each L.LoongArkImageCropper.handles as position}<L.LoongArkImageCropperHandle
            {position}
          />{/each}<L.LoongArkImageCropperGrid
          axis="horizontal"
        /><L.LoongArkImageCropperGrid
          axis="vertical"
        /></L.LoongArkImageCropperSelection
      ></L.LoongArkImageCropperViewport
    >
  </L.LoongArkImageCropperRootProvider>
  <L.LoongArkStack orientation="horizontal" gap="sm">
    <L.LoongArkButton
      type="button"
      variant="outline"
      onclick={() => cropper().zoomBy(-0.25)}
      disabled={cropper().zoom <= 1}>Zoom out</L.LoongArkButton
    >
    <L.LoongArkButton
      type="button"
      variant="outline"
      onclick={() => cropper().zoomBy(0.25)}
      disabled={cropper().zoom >= 3}>Zoom in</L.LoongArkButton
    >
    <L.LoongArkButton
      type="button"
      variant="outline"
      onclick={() => cropper().rotateBy(90)}>Rotate</L.LoongArkButton
    >
    <L.LoongArkButton
      type="button"
      variant="outline"
      onclick={() => cropper().flipHorizontally()}>Flip</L.LoongArkButton
    >
    <L.LoongArkButton
      type="button"
      variant="outline"
      onclick={() => {
        cropper().reset();
        preview = undefined;
      }}>Reset</L.LoongArkButton
    >
  </L.LoongArkStack>
  <output aria-label="Image transformations"
    >Zoom {cropper().zoom.toFixed(2)} · Rotation {cropper().rotation}° · Flipped {String(
      cropper().flip.horizontal,
    )}</output
  >
  <L.LoongArkButton type="button" onclick={exportCrop} disabled={busy}
    >{busy ? "Exporting…" : "Export crop"}</L.LoongArkButton
  >
  {#if error}<p role="alert">{error}</p>{/if}{#if preview}<img
      src={preview}
      alt="Cropped preview"
      style="max-width:100%;width:160px;border-radius:var(--lk-radius-md)"
    />{/if}
</L.LoongArkStack>
