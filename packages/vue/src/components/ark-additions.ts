// 保留 Ark 原生类型、状态机与生命周期；外观统一由 Primitives 提供。
import { ImageCropper } from "@ark-ui/vue/image-cropper";
export const LoongArkImageCropper: typeof ImageCropper = ImageCropper;
export const LoongArkImageCropperContext: typeof ImageCropper.Context =
  ImageCropper.Context;
export const LoongArkImageCropperGrid: typeof ImageCropper.Grid =
  ImageCropper.Grid;
export const LoongArkImageCropperHandle: typeof ImageCropper.Handle =
  ImageCropper.Handle;
export const LoongArkImageCropperImage: typeof ImageCropper.Image =
  ImageCropper.Image;
export const LoongArkImageCropperRoot: typeof ImageCropper.Root =
  ImageCropper.Root;
export const LoongArkImageCropperRootProvider: typeof ImageCropper.RootProvider =
  ImageCropper.RootProvider;
export const LoongArkImageCropperSelection: typeof ImageCropper.Selection =
  ImageCropper.Selection;
export const LoongArkImageCropperViewport: typeof ImageCropper.Viewport =
  ImageCropper.Viewport;
import { JsonTreeView } from "@ark-ui/vue/json-tree-view";
import { LoongArkJsonTreeViewRoot } from "./json-view";
export { LoongArkJsonTreeViewRoot };
export const LoongArkJsonTreeView: Omit<typeof JsonTreeView, "Root"> & {
  Root: typeof LoongArkJsonTreeViewRoot;
} = {
  ...JsonTreeView,
  Root: LoongArkJsonTreeViewRoot,
};

export const LoongArkJsonTreeViewRootProvider: typeof JsonTreeView.RootProvider =
  JsonTreeView.RootProvider;
export const LoongArkJsonTreeViewTree: typeof JsonTreeView.Tree =
  JsonTreeView.Tree;
import { Format } from "@ark-ui/vue/format";
import { LoongArkFormatNumber } from "./format-number";
export { LoongArkFormatNumber };
export type { LoongArkFormatNumberProps } from "./format-number";
export const LoongArkFormat = { ...Format, Number: LoongArkFormatNumber };
export const LoongArkFormatTime: typeof Format.Time = Format.Time;
export const LoongArkFormatByte: typeof Format.Byte = Format.Byte;
export const LoongArkFormatRelativeTime: typeof Format.RelativeTime =
  Format.RelativeTime;
export { ClientOnly as LoongArkClientOnly } from "@ark-ui/vue/client-only";
export type { ClientOnlyProps } from "@ark-ui/vue/client-only";
export { DownloadTrigger as LoongArkDownloadTrigger } from "@ark-ui/vue/download-trigger";
export type { DownloadTriggerProps } from "@ark-ui/vue/download-trigger";
export { FocusTrap as LoongArkFocusTrap } from "@ark-ui/vue/focus-trap";
export type { FocusTrapProps } from "@ark-ui/vue/focus-trap";
export { Frame as LoongArkFrame } from "@ark-ui/vue/frame";
export type { FrameProps } from "@ark-ui/vue/frame";
export { Highlight as LoongArkHighlight } from "@ark-ui/vue/highlight";
export type { HighlightProps } from "@ark-ui/vue/highlight";
export { Presence as LoongArkPresence } from "@ark-ui/vue/presence";
export type { PresenceProps } from "@ark-ui/vue/presence";
export { useImageCropper } from "@ark-ui/vue/image-cropper";
export type {
  UseImageCropperProps,
  UseImageCropperReturn,
} from "@ark-ui/vue/image-cropper";
export { useJsonTreeView } from "./json-view";
export type {
  UseJsonTreeViewProps,
  UseJsonTreeViewReturn,
} from "@ark-ui/vue/json-tree-view";
export { useHighlight } from "@ark-ui/vue/highlight";
export type { UseHighlightProps, HighlightChunk } from "@ark-ui/vue/highlight";
export { usePresence } from "@ark-ui/vue/presence";
export type { UsePresenceProps, UsePresenceReturn } from "@ark-ui/vue/presence";
export type {
  ImageCropperRootProps,
  ImageCropperCropChangeDetails,
  ImageCropperFlipChangeDetails,
  ImageCropperRotationChangeDetails,
  ImageCropperZoomChangeDetails,
} from "@ark-ui/vue/image-cropper";
export type {
  JsonTreeViewRootProps,
  JsonTreeViewTreeProps,
} from "@ark-ui/vue/json-tree-view";

export {
  LocaleProvider as LoongArkLocaleProvider,
  useLocaleContext,
  useFilter,
  useCollator,
} from "@ark-ui/vue/locale";
export type { LocaleProviderProps } from "@ark-ui/vue/locale";
export {
  EnvironmentProvider as LoongArkEnvironmentProvider,
  useEnvironmentContext,
} from "@ark-ui/vue/environment";
export type { EnvironmentProviderProps } from "@ark-ui/vue/environment";
export {
  createGridCollection,
  createFileTreeCollection,
} from "@ark-ui/vue/collection";
export type {
  CollectionItem,
  CollectionOptions,
  GridCollectionOptions,
  TreeCollectionOptions,
} from "@ark-ui/vue/collection";
