/** 与 Ark 的裁剪状态兼容，不要求调用方依赖某个框架的 Props。 */
export interface ImageCropperExportModel {
  crop: { x: number; y: number; width: number; height: number };
  zoom: number;
  rotation: number;
  offset: { x: number; y: number };
  flip: { horizontal: boolean; vertical: boolean };
  getRootProps(): { id?: string | null };
}
export interface ImageCropperExportOptions {
  output?: "blob" | "dataUrl";
  type?: string;
  quality?: number;
  /** 输出像素上限，有限且至少 1px；小数向下取整，避免超过指定范围。 */
  maxSize?: { width: number; height: number };
  /** 浮层、Shadow DOM 或独立 iframe 可显式指定实际根节点。 */
  rootNode?: Document | ShadowRoot | HTMLElement;
  signal?: AbortSignal;
}
/** 先捕获裁剪状态，再解码无样式源图；避免 SVG 的平台尺寸变化影响导出。 */
export async function exportImageCropper(
  model: ImageCropperExportModel,
  options: ImageCropperExportOptions = {},
): Promise<Blob | string | null> {
  const node =
    options.rootNode ??
    (typeof document === "undefined" ? undefined : document);
  if (!node || options.signal?.aborted) return null;
  const id = model.getRootProps().id;
  if (typeof id !== "string" || !id) return null;
  const root =
    "id" in node && node.id === id
      ? node
      : Array.from(
          node.querySelectorAll<HTMLElement>(
            '[data-scope="image-cropper"][data-part="root"]',
          ),
        ).find((element) => element.id === id);
  const image = root?.querySelector<HTMLImageElement>('[data-part="image"]');
  if (
    !image?.complete ||
    !image.naturalWidth ||
    !image.offsetWidth ||
    !image.offsetHeight
  )
    return null;
  const crop = { ...model.crop },
    offset = { ...model.offset },
    flip = { ...model.flip };
  const zoom = model.zoom,
    rotation = model.rotation;
  if (
    ![
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      zoom,
      rotation,
      offset.x,
      offset.y,
    ].every(Number.isFinite) ||
    crop.width <= 0 ||
    crop.height <= 0 ||
    zoom <= 0
  )
    return null;
  if (
    options.maxSize &&
    (![options.maxSize.width, options.maxSize.height].every(Number.isFinite) ||
      options.maxSize.width < 1 ||
      options.maxSize.height < 1)
  )
    throw new RangeError(
      "Crop export maxSize requires finite positive dimensions of at least one pixel",
    );
  const rect = {
    x: image.offsetLeft,
    y: image.offsetTop,
    width: image.offsetWidth,
    height: image.offsetHeight,
  };
  const source = image.ownerDocument.createElement("img");
  if (image.crossOrigin !== null) source.crossOrigin = image.crossOrigin;
  source.referrerPolicy = image.referrerPolicy;
  source.src = image.currentSrc || image.src;
  try {
    await source.decode();
    if (
      options.signal?.aborted ||
      !source.naturalWidth ||
      !source.naturalHeight
    )
      return null;
    const naturalWidth = source.naturalWidth,
      naturalHeight = source.naturalHeight;
    let width = Math.max(
      1,
      Math.round((crop.width * naturalWidth) / rect.width / zoom),
    );
    let height = Math.max(
      1,
      Math.round((crop.height * naturalHeight) / rect.height / zoom),
    );
    const scale = options.maxSize
      ? Math.min(
          1,
          Math.floor(options.maxSize.width) / width,
          Math.floor(options.maxSize.height) / height,
        )
      : 1;
    width = Math.max(1, Math.round(width * scale));
    height = Math.max(1, Math.round(height * scale));
    const canvas = image.ownerDocument.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    if (canvas.width !== width || canvas.height !== height) return null;
    const context = canvas.getContext("2d");
    if (!context) return null;
    // CSS 变换围绕图片中心；按源图尺寸构建相同的仿射变换。
    const angle = ((rotation % 360) * Math.PI) / 180;
    const sx = zoom * (flip.horizontal ? -1 : 1),
      sy = zoom * (flip.vertical ? -1 : 1);
    const a = (Math.cos(angle) * sx * rect.width) / naturalWidth;
    const b = (Math.sin(angle) * sx * rect.width) / naturalWidth;
    const c = (-Math.sin(angle) * sy * rect.height) / naturalHeight;
    const d = (Math.cos(angle) * sy * rect.height) / naturalHeight;
    const e =
      rect.x +
      rect.width / 2 +
      offset.x -
      (a * naturalWidth) / 2 -
      (c * naturalHeight) / 2;
    const f =
      rect.y +
      rect.height / 2 +
      offset.y -
      (b * naturalWidth) / 2 -
      (d * naturalHeight) / 2;
    context.setTransform(
      (a * width) / crop.width,
      (b * height) / crop.height,
      (c * width) / crop.width,
      (d * height) / crop.height,
      ((e - crop.x) * width) / crop.width,
      ((f - crop.y) * height) / crop.height,
    );
    context.drawImage(source, 0, 0, naturalWidth, naturalHeight);
    if (options.output === "dataUrl")
      return options.signal?.aborted
        ? null
        : canvas.toDataURL(options.type ?? "image/png", options.quality ?? 1);
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, options.type ?? "image/png", options.quality ?? 1),
    );
    return options.signal?.aborted ? null : blob;
  } catch {
    return null;
  }
}
