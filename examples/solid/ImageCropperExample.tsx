/** @jsxImportSource solid-js */
import { createSignal } from "solid-js";
import * as L from "@loongark/solid";
import { cropSource } from "../shared/arkAdditionsDemo";
export function ImageCropperExample() {
  const cropper = L.useImageCropper(() => ({ aspectRatio: 1, maxZoom: 3 }));
  const [preview, setPreview] = createSignal<string>(),
    [busy, setBusy] = createSignal(false),
    [error, setError] = createSignal("");
  async function exportCrop() {
    setBusy(true);
    setError("");
    try {
      const result = await L.exportImageCropper(cropper(), { output: "dataUrl" });
      if (typeof result === "string") setPreview(result);
      else setError("Image is not ready.");
    } catch {
      setError("Unable to export this image.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <L.LoongArkStack gap="md" style={{ width: "100%", "max-width": "640px" }}>
      <L.LoongArkTypography as="h2">Crop an image</L.LoongArkTypography>
      <L.LoongArkTypography variant="muted">
        Drag the selection or use arrow keys. Shift moves faster.
      </L.LoongArkTypography>
      <L.LoongArkImageCropperRootProvider value={cropper}>
        <L.LoongArkImageCropperViewport>
          <L.LoongArkImageCropperImage
            src={cropSource}
            alt="Blue mountains with a coral sun"
          />
          <L.LoongArkImageCropperSelection>
            {L.LoongArkImageCropper.handles.map((position) => (
              <L.LoongArkImageCropperHandle position={position} />
            ))}
            <L.LoongArkImageCropperGrid axis="horizontal" />
            <L.LoongArkImageCropperGrid axis="vertical" />
          </L.LoongArkImageCropperSelection>
        </L.LoongArkImageCropperViewport>
      </L.LoongArkImageCropperRootProvider>
      <L.LoongArkStack orientation="horizontal" gap="sm">
        <L.LoongArkButton
          type="button"
          variant="outline"
          onClick={() => cropper().zoomBy(-0.25)}
          disabled={cropper().zoom <= 1}
        >
          Zoom out
        </L.LoongArkButton>
        <L.LoongArkButton
          type="button"
          variant="outline"
          onClick={() => cropper().zoomBy(0.25)}
          disabled={cropper().zoom >= 3}
        >
          Zoom in
        </L.LoongArkButton>
        <L.LoongArkButton
          type="button"
          variant="outline"
          onClick={() => cropper().rotateBy(90)}
        >
          Rotate
        </L.LoongArkButton>
        <L.LoongArkButton
          type="button"
          variant="outline"
          onClick={() => cropper().flipHorizontally()}
        >
          Flip
        </L.LoongArkButton>
        <L.LoongArkButton
          type="button"
          variant="outline"
          onClick={() => {
            cropper().reset();
            setPreview(undefined);
          }}
        >
          Reset
        </L.LoongArkButton>
      </L.LoongArkStack>
      <output aria-label="Image transformations">
        Zoom {cropper().zoom.toFixed(2)} · Rotation {cropper().rotation}° ·
        Flipped {String(cropper().flip.horizontal)}
      </output>
      <L.LoongArkButton type="button" onClick={exportCrop} disabled={busy()}>
        {busy() ? "Exporting…" : "Export crop"}
      </L.LoongArkButton>
      {error() && <p role="alert">{error()}</p>}
      {preview() && (
        <img
          src={preview()}
          alt="Cropped preview"
          style={{
            "max-width": "100%",
            width: "160px",
            "border-radius": "var(--lk-radius-md)",
          }}
        />
      )}
    </L.LoongArkStack>
  );
}
