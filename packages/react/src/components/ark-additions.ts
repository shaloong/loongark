
import { withAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
import { styles as lkAutomaticImageCropperStyles } from "@shaloong/loongark-primitives/automatic-styles/image-cropper";
import { styles as lkAutomaticJsonTreeViewStyles } from "@shaloong/loongark-primitives/automatic-styles/json-tree-view";
// 保留 Ark 原生类型、状态机与生命周期；外观统一由 Primitives 提供。
import { ImageCropper } from "@ark-ui/react/image-cropper";
export const LoongArkImageCropper: typeof ImageCropper = /*#__PURE__*/ withAutomaticStyles(ImageCropper, lkAutomaticImageCropperStyles);
export const LoongArkImageCropperContext: typeof ImageCropper.Context =
  /*#__PURE__*/ withAutomaticStyles(ImageCropper.Context, lkAutomaticImageCropperStyles);
export const LoongArkImageCropperGrid: typeof ImageCropper.Grid =
  /*#__PURE__*/ withAutomaticStyles(ImageCropper.Grid, lkAutomaticImageCropperStyles);
export const LoongArkImageCropperHandle: typeof ImageCropper.Handle =
  /*#__PURE__*/ withAutomaticStyles(ImageCropper.Handle, lkAutomaticImageCropperStyles);
export const LoongArkImageCropperImage: typeof ImageCropper.Image =
  /*#__PURE__*/ withAutomaticStyles(ImageCropper.Image, lkAutomaticImageCropperStyles);
export const LoongArkImageCropperRoot: typeof ImageCropper.Root =
  /*#__PURE__*/ withAutomaticStyles(ImageCropper.Root, lkAutomaticImageCropperStyles);
export const LoongArkImageCropperRootProvider: typeof ImageCropper.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(ImageCropper.RootProvider, lkAutomaticImageCropperStyles);
export const LoongArkImageCropperSelection: typeof ImageCropper.Selection =
  /*#__PURE__*/ withAutomaticStyles(ImageCropper.Selection, lkAutomaticImageCropperStyles);
export const LoongArkImageCropperViewport: typeof ImageCropper.Viewport =
  /*#__PURE__*/ withAutomaticStyles(ImageCropper.Viewport, lkAutomaticImageCropperStyles);
import { JsonTreeView } from "@ark-ui/react/json-tree-view";
export const LoongArkJsonTreeView: typeof JsonTreeView = /*#__PURE__*/ withAutomaticStyles(JsonTreeView, lkAutomaticJsonTreeViewStyles);
export const LoongArkJsonTreeViewRoot: typeof JsonTreeView.Root =
  /*#__PURE__*/ withAutomaticStyles(JsonTreeView.Root, lkAutomaticJsonTreeViewStyles);
export const LoongArkJsonTreeViewRootProvider: typeof JsonTreeView.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(JsonTreeView.RootProvider, lkAutomaticJsonTreeViewStyles);
export const LoongArkJsonTreeViewTree: typeof JsonTreeView.Tree =
  /*#__PURE__*/ withAutomaticStyles(JsonTreeView.Tree, lkAutomaticJsonTreeViewStyles);
import { Format } from "@ark-ui/react/format";
export const LoongArkFormat: typeof Format = Format;
export const LoongArkFormatTime: typeof Format.Time = Format.Time;
export const LoongArkFormatByte: typeof Format.Byte = Format.Byte;
export const LoongArkFormatNumber: typeof Format.Number = Format.Number;
export const LoongArkFormatRelativeTime: typeof Format.RelativeTime =
  Format.RelativeTime;
export { ClientOnly as LoongArkClientOnly } from "@ark-ui/react/client-only";
export type { ClientOnlyProps } from "@ark-ui/react/client-only";
export { DownloadTrigger as LoongArkDownloadTrigger } from "@ark-ui/react/download-trigger";
export type { DownloadTriggerProps } from "@ark-ui/react/download-trigger";
export { FocusTrap as LoongArkFocusTrap } from "@ark-ui/react/focus-trap";
export type { FocusTrapProps } from "@ark-ui/react/focus-trap";
export { Frame as LoongArkFrame } from "@ark-ui/react/frame";
export type { FrameProps } from "@ark-ui/react/frame";
export { Highlight as LoongArkHighlight } from "@ark-ui/react/highlight";
export type { HighlightProps } from "@ark-ui/react/highlight";
export { Presence as LoongArkPresence } from "@ark-ui/react/presence";
export type { PresenceProps } from "@ark-ui/react/presence";
export { useImageCropper } from "@ark-ui/react/image-cropper";
export type {
  UseImageCropperProps,
  UseImageCropperReturn,
} from "@ark-ui/react/image-cropper";
export { useJsonTreeView } from "@ark-ui/react/json-tree-view";
export type {
  UseJsonTreeViewProps,
  UseJsonTreeViewReturn,
} from "@ark-ui/react/json-tree-view";
export { useHighlight } from "@ark-ui/react/highlight";
export type {
  UseHighlightProps,
  HighlightChunk,
} from "@ark-ui/react/highlight";
export { usePresence } from "@ark-ui/react/presence";
export type {
  UsePresenceProps,
  UsePresenceReturn,
} from "@ark-ui/react/presence";
export type {
  ImageCropperRootProps,
  ImageCropperCropChangeDetails,
  ImageCropperFlipChangeDetails,
  ImageCropperRotationChangeDetails,
  ImageCropperZoomChangeDetails,
} from "@ark-ui/react/image-cropper";
export type {
  JsonTreeViewRootProps,
  JsonTreeViewTreeProps,
} from "@ark-ui/react/json-tree-view";

export {
  LocaleProvider as LoongArkLocaleProvider,
  useLocaleContext,
  useFilter,
  useCollator,
} from "@ark-ui/react/locale";
export type { LocaleProviderProps } from "@ark-ui/react/locale";
export {
  EnvironmentProvider as LoongArkEnvironmentProvider,
  useEnvironmentContext,
} from "@ark-ui/react/environment";
export type { EnvironmentProviderProps } from "@ark-ui/react/environment";
export {
  createGridCollection,
  createFileTreeCollection,
} from "@ark-ui/react/collection";
export type {
  CollectionItem,
  CollectionOptions,
  GridCollectionOptions,
  TreeCollectionOptions,
} from "@ark-ui/react/collection";

export type { NumberFormatProps as LoongArkFormatNumberProps } from "@shaloong/loongark-kit";
