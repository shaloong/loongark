import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import {
  checkCropperGeometry,
  checkCropperImageGeometry,
  checkImageCropper,
} from "./arkAdditionsChecks";
for (const framework of ["react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375])
      test(`cropper platform ${framework} ${mode} ${width}`, async ({
        page,
      }) => {
        test.skip(!process.env.STATIC_DIR, "四端消费构建后运行");
        const errors: string[] = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await page.setViewportSize({ width, height: 900 });
        await page.goto(
          `/examples-${framework}/?example=ImageCropperExample&mode=${mode}`,
        );
        await expect
          .poll(() =>
            page
              .locator("[data-scope=image-cropper][data-part=image]")
              .evaluate(
                (image: HTMLImageElement) =>
                  image.complete && image.naturalWidth > 0,
              ),
          )
          .toBe(true);
        await checkCropperGeometry(page);
        await checkCropperImageGeometry(page);
        // 保留真实视口；全页截图会临时调整 Chromium 的容器布局并触发 Ark 测量。
        await page.screenshot({
          path: `.artifacts/gap-completion/cropper-default-${framework}-${mode}-${width}.png`,
          fullPage: false,
        });
        await checkImageCropper(page, framework, async () => {
          await page.screenshot({
            path: `.artifacts/gap-completion/cropper-exported-${framework}-${mode}-${width}.png`,
            fullPage: false,
          });
        });
        await page.setViewportSize({ width, height: 900 });
        await checkCropperGeometry(page);
        expect(errors).toEqual([]);
        expect((await new AxeBuilder({ page }).analyze()).violations).toEqual(
          [],
        );
        await page.screenshot({
          path: `.artifacts/gap-completion/cropper-tested-${framework}-${mode}-${width}.png`,
          fullPage: false,
        });
      });

test("cropper shared export formats, bounds, cancellation and explicit root", async ({
  page,
}) => {
  test.skip(!process.env.STATIC_DIR, "四端消费构建后运行");
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/examples-react/?example=ImageCropperExample&mode=light");
  await checkCropperGeometry(page);
  await expect
    .poll(() =>
      page
        .locator("[data-scope=image-cropper][data-part=image]")
        .evaluate(
          (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
        ),
    )
    .toBe(true);
  await checkCropperImageGeometry(page);
  const result = await page.evaluate(async () => {
    const modulePath = "/cropper-export.js";
    const {
      exportImageCropper,
    }: typeof import("../packages/kit/src/cropper-export") = await import(
      modulePath
    );
    const root = document.querySelector<HTMLElement>(
      "[data-scope=image-cropper][data-part=root]",
    )!;
    const style = getComputedStyle(root);
    const model = {
      crop: {
        x: parseFloat(style.getPropertyValue("--crop-x")),
        y: parseFloat(style.getPropertyValue("--crop-y")),
        width: parseFloat(style.getPropertyValue("--crop-width")),
        height: parseFloat(style.getPropertyValue("--crop-height")),
      },
      zoom: 1,
      rotation: 0,
      offset: { x: 0, y: 0 },
      flip: { horizontal: false, vertical: false },
      getRootProps: () => ({ id: root.id }),
    };
    const png = await exportImageCropper(model, {
      rootNode: root,
      maxSize: { width: 64, height: 48 },
    });
    if (!(png instanceof Blob)) throw Error("Expected PNG Blob");
    const url = URL.createObjectURL(png),
      preview = new Image();
    preview.src = url;
    await preview.decode();
    const size = [preview.naturalWidth, preview.naturalHeight];
    URL.revokeObjectURL(url);
    const tinyPng = await exportImageCropper(model, {
      output: "dataUrl",
      maxSize: { width: 1.5, height: 1.5 },
    });
    if (typeof tinyPng !== "string") throw Error("Expected bounded PNG");
    const tinyPreview = new Image();
    tinyPreview.src = tinyPng;
    await tinyPreview.decode();
    const tinySize = [tinyPreview.naturalWidth, tinyPreview.naturalHeight];
    const jpeg = await exportImageCropper(model, {
      output: "dataUrl",
      type: "image/jpeg",
      quality: 0.8,
      maxSize: { width: 80, height: 80 },
    });
    const expectedSnapshot = await exportImageCropper(model, {
      output: "dataUrl",
      maxSize: { width: 32, height: 32 },
    });
    const snapshotPending = exportImageCropper(model, {
      output: "dataUrl",
      maxSize: { width: 32, height: 32 },
    });
    const previousX = model.crop.x;
    model.crop.x += 500;
    const snapshotStable = (await snapshotPending) === expectedSnapshot;
    model.crop.x = previousX;
    const controller = new AbortController();
    const pending = exportImageCropper(model, { signal: controller.signal });
    controller.abort();
    const cancelled = await pending;
    let invalid = "";
    try {
      await exportImageCropper(model, { maxSize: { width: 0.5, height: 10 } });
    } catch (error) {
      invalid = error instanceof Error ? error.message : "unexpected";
    }
    const missing = await exportImageCropper({
      ...model,
      getRootProps: () => ({ id: "missing-cropper" }),
    });
    const host = document.createElement("div"),
      shadow = host.attachShadow({ mode: "open" });
    document.body.append(host);
    const clone = root.cloneNode(true);
    if (!(clone instanceof HTMLElement)) throw Error("Expected cropper clone");
    clone.id += "-shadow";
    shadow.append(clone);
    const original = root.querySelector<HTMLImageElement>("[data-part=image]")!,
      image = clone.querySelector<HTMLImageElement>("[data-part=image]")!;
    image.style.width = original.offsetWidth + "px";
    image.style.height = original.offsetHeight + "px";
    await image.decode();
    const shadowPng = await exportImageCropper(
      { ...model, getRootProps: () => ({ id: clone.id }) },
      { rootNode: shadow, maxSize: { width: 32, height: 32 } },
    );
    host.remove();
    return {
      pngType: png.type,
      size,
      tinySize,
      jpeg:
        typeof jpeg === "string" && jpeg.startsWith("data:image/jpeg;base64,"),
      cancelled,
      invalid,
      missing,
      shadow: shadowPng instanceof Blob,
      snapshotStable,
    };
  });
  expect(result.pngType).toBe("image/png");
  expect(result.size[0]).toBeGreaterThan(0);
  expect(result.size[0]).toBeLessThanOrEqual(64);
  expect(result.size[1]).toBeGreaterThan(0);
  expect(result.size[1]).toBeLessThanOrEqual(48);
  expect(result.tinySize).toEqual([1, 1]);
  expect(result.jpeg).toBe(true);
  expect(result.cancelled).toBeNull();
  expect(result.invalid).toContain("finite positive");
  expect(result.missing).toBeNull();
  expect(result.shadow).toBe(true);
  expect(result.snapshotStable).toBe(true);
});
