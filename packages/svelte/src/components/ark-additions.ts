// 保留 Ark 原生类型、状态机与生命周期；外观统一由 Primitives 提供。
import { ImageCropper } from "@ark-ui/svelte/image-cropper";
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
import { JsonTreeView } from "@ark-ui/svelte/json-tree-view";
import LoongArkJsonTreeViewRoot from "./JsonTreeViewRoot.svelte";
import LoongArkJsonTreeViewTree from "./JsonTreeViewTree.svelte";
export { LoongArkJsonTreeViewRoot, LoongArkJsonTreeViewTree };
export const LoongArkJsonTreeView: Omit<
  typeof JsonTreeView,
  "Root" | "Tree"
> & {
  Root: typeof LoongArkJsonTreeViewRoot;
  Tree: typeof LoongArkJsonTreeViewTree;
} = {
  ...JsonTreeView,
  Root: LoongArkJsonTreeViewRoot,
  Tree: LoongArkJsonTreeViewTree,
};

export const LoongArkJsonTreeViewRootProvider: typeof JsonTreeView.RootProvider =
  JsonTreeView.RootProvider;

import { Format } from "@ark-ui/svelte/format";
export const LoongArkFormat: typeof Format = Format;
export const LoongArkFormatTime: typeof Format.Time = Format.Time;
export const LoongArkFormatByte: typeof Format.Byte = Format.Byte;
export const LoongArkFormatNumber: typeof Format.Number = Format.Number;
export const LoongArkFormatRelativeTime: typeof Format.RelativeTime =
  Format.RelativeTime;
export { ClientOnly as LoongArkClientOnly } from "@ark-ui/svelte/client-only";
export type { ClientOnlyProps } from "@ark-ui/svelte/client-only";
export { DownloadTrigger as LoongArkDownloadTrigger } from "@ark-ui/svelte/download-trigger";
export type { DownloadTriggerProps } from "@ark-ui/svelte/download-trigger";
export { FocusTrap as LoongArkFocusTrap } from "@ark-ui/svelte/focus-trap";
export type { FocusTrapProps } from "@ark-ui/svelte/focus-trap";
export { default as LoongArkFrame } from "./Frame.svelte";
export type { FrameProps } from "@ark-ui/svelte/frame";
export { Highlight as LoongArkHighlight } from "@ark-ui/svelte/highlight";
export type { HighlightProps } from "@ark-ui/svelte/highlight";
export { Presence as LoongArkPresence } from "@ark-ui/svelte/presence";
export type { PresenceProps } from "@ark-ui/svelte/presence";
export { useImageCropper } from "@ark-ui/svelte/image-cropper";
export type {
  UseImageCropperProps,
  UseImageCropperReturn,
} from "@ark-ui/svelte/image-cropper";
export { useJsonTreeView } from "./use-json-tree-view.svelte.js";
export type {
  UseJsonTreeViewProps,
  UseJsonTreeViewReturn,
} from "@ark-ui/svelte/json-tree-view";
export { useHighlight } from "@ark-ui/svelte/highlight";
export type {
  UseHighlightProps,
  HighlightChunk,
} from "@ark-ui/svelte/highlight";
export { usePresence } from "@ark-ui/svelte/presence";
export type {
  UsePresenceProps,
  UsePresenceReturn,
} from "@ark-ui/svelte/presence";
export type {
  ImageCropperRootProps,
  ImageCropperCropChangeDetails,
  ImageCropperFlipChangeDetails,
  ImageCropperRotationChangeDetails,
  ImageCropperZoomChangeDetails,
} from "@ark-ui/svelte/image-cropper";
export type {
  JsonTreeViewRootProps,
  JsonTreeViewTreeProps,
} from "@ark-ui/svelte/json-tree-view";

export {
  LocaleProvider as LoongArkLocaleProvider,
  useLocaleContext,
  useFilter,
  useCollator,
} from "@ark-ui/svelte/locale";
export type { LocaleProviderProps } from "@ark-ui/svelte/locale";
export {
  EnvironmentProvider as LoongArkEnvironmentProvider,
  useEnvironmentContext,
} from "@ark-ui/svelte/environment";
export type { EnvironmentProviderProps } from "@ark-ui/svelte/environment";
export {
  createGridCollection,
  createFileTreeCollection,
} from "@ark-ui/svelte/collection";
export type {
  CollectionItem,
  CollectionOptions,
  GridCollectionOptions,
  TreeCollectionOptions,
} from "@ark-ui/svelte/collection";

export type { NumberFormatProps as LoongArkFormatNumberProps } from "@loongark/kit";
