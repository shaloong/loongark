import { defineComponent, h, ref } from "vue";
import * as L from "@loongark/vue";
import { cropSource } from "../shared/arkAdditionsDemo";
export const ImageCropperExample = defineComponent({
  setup() {
    const cropper = L.useImageCropper({ aspectRatio: 1, maxZoom: 3 }),
      preview = ref<string>(),
      busy = ref(false),
      error = ref("");
    async function exportCrop() {
      busy.value = true;
      error.value = "";
      try {
        const result = await cropper.value.getCroppedImage({
          output: "dataUrl",
        });
        if (typeof result === "string") preview.value = result;
        else error.value = "Image is not ready.";
      } catch {
        error.value = "Unable to export this image.";
      } finally {
        busy.value = false;
      }
    }
    const button = (label: string, click: () => void, disabled = false) =>
      h(
        L.LoongArkButton,
        { type: "button", variant: "outline", onClick: click, disabled },
        () => label,
      );
    return () =>
      h(
        L.LoongArkStack,
        { gap: "md", style: "width:100%;max-width:640px" },
        () => [
          h(L.LoongArkTypography, { as: "h2" }, () => "Crop an image"),
          h(
            L.LoongArkTypography,
            { variant: "muted" },
            () => "Drag the selection or use arrow keys. Shift moves faster.",
          ),
          h(L.LoongArkImageCropperRootProvider, { value: cropper.value }, () =>
            h(L.LoongArkImageCropperViewport, {}, () => [
              h(L.LoongArkImageCropperImage, {
                src: cropSource,
                alt: "Blue mountains with a coral sun",
              }),
              h(L.LoongArkImageCropperSelection, {}, () => [
                ...L.LoongArkImageCropper.handles.map((position) =>
                  h(L.LoongArkImageCropperHandle, { position, key: position }),
                ),
                h(L.LoongArkImageCropperGrid, { axis: "horizontal" }),
                h(L.LoongArkImageCropperGrid, { axis: "vertical" }),
              ]),
            ]),
          ),
          h(L.LoongArkStack, { orientation: "horizontal", gap: "sm" }, () => [
            button(
              "Zoom out",
              () => cropper.value.zoomBy(-0.25),
              cropper.value.zoom <= 1,
            ),
            button(
              "Zoom in",
              () => cropper.value.zoomBy(0.25),
              cropper.value.zoom >= 3,
            ),
            button("Rotate", () => cropper.value.rotateBy(90)),
            button("Flip", () => cropper.value.flipHorizontally()),
            button("Reset", () => {
              cropper.value.reset();
              preview.value = undefined;
            }),
          ]),
          h(
            "output",
            { "aria-label": "Image transformations" },
            `Zoom ${cropper.value.zoom.toFixed(2)} · Rotation ${cropper.value.rotation}° · Flipped ${String(cropper.value.flip.horizontal)}`,
          ),
          h(
            L.LoongArkButton,
            { type: "button", onClick: exportCrop, disabled: busy.value },
            () => (busy.value ? "Exporting…" : "Export crop"),
          ),
          error.value ? h("p", { role: "alert" }, error.value) : null,
          preview.value
            ? h("img", {
                src: preview.value,
                alt: "Cropped preview",
                style:
                  "max-width:100%;width:160px;border-radius:var(--lk-radius-md)",
              })
            : null,
        ],
      );
  },
});
