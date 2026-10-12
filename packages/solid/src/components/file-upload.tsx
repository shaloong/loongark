
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticFileUploadStyles } from "@loongark/primitives/automatic-styles/file-upload";
/**
 * File Upload component - Solid wrapper.
 * Uses Ark UI File Upload with data attributes for styling.
 */
import { type Component, type JSX, mergeProps, splitProps } from "solid-js";
import {
  FileUpload as ArkFileUpload,
  type FileUploadRootProps as ArkFileUploadRootProps,
  type FileUploadLabelProps as ArkFileUploadLabelProps,
  type FileUploadDropzoneProps as ArkFileUploadDropzoneProps,
  type FileUploadTriggerProps as ArkFileUploadTriggerProps,
  type FileUploadHiddenInputProps as ArkFileUploadHiddenInputProps,
  type FileUploadItemGroupProps as ArkFileUploadItemGroupProps,
  type FileUploadItemProps as ArkFileUploadItemProps,
  type FileUploadItemPreviewProps as ArkFileUploadItemPreviewProps,
  type FileUploadItemPreviewImageProps as ArkFileUploadItemPreviewImageProps,
  type FileUploadItemNameProps as ArkFileUploadItemNameProps,
  type FileUploadItemSizeTextProps as ArkFileUploadItemSizeTextProps,
  type FileUploadItemDeleteTriggerProps as ArkFileUploadItemDeleteTriggerProps,
  type FileUploadClearTriggerProps as ArkFileUploadClearTriggerProps,
} from "@ark-ui/solid/file-upload";
import type { FileUploadSize } from "@loongark/primitives";

export interface LoongArkFileUploadRootProps extends Omit<
  ArkFileUploadRootProps,
  "asChild"
> {
  size?: FileUploadSize;
  disabled?: boolean;
  children?: JSX.Element;
}

export const LoongArkFileUploadRoot: Component<LoongArkFileUploadRootProps> = /*#__PURE__*/ withAutomaticStyles((
  props,
) => {
  const merged = mergeProps(
    { size: "md" as FileUploadSize, disabled: false },
    props,
  );
  const [local, others] = splitProps(merged, ["children", "size", "disabled"]);

  return (
    <ArkFileUpload.Root
      {...others}
      disabled={local.disabled}
      data-scope="file-upload"
      data-part="root"
      data-size={local.size}
      data-disabled={local.disabled ? "true" : undefined}
    >
      {local.children}
    </ArkFileUpload.Root>
  );
}, lkAutomaticFileUploadStyles);

export interface LoongArkFileUploadLabelProps extends Omit<
  ArkFileUploadLabelProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkFileUploadLabel: Component<
  LoongArkFileUploadLabelProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkFileUpload.Label {...others} data-scope="file-upload" data-part="label">
      {local.children}
    </ArkFileUpload.Label>
  );
}, lkAutomaticFileUploadStyles);

export interface LoongArkFileUploadDropzoneProps extends Omit<
  ArkFileUploadDropzoneProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkFileUploadDropzone: Component<
  LoongArkFileUploadDropzoneProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkFileUpload.Dropzone
      {...others}
      data-scope="file-upload"
      data-part="dropzone"
    >
      {local.children}
    </ArkFileUpload.Dropzone>
  );
}, lkAutomaticFileUploadStyles);

export interface LoongArkFileUploadTriggerProps extends Omit<
  ArkFileUploadTriggerProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkFileUploadTrigger: Component<
  LoongArkFileUploadTriggerProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkFileUpload.Trigger
      {...others}
      data-scope="file-upload"
      data-part="trigger"
    >
      {local.children}
    </ArkFileUpload.Trigger>
  );
}, lkAutomaticFileUploadStyles);

export interface LoongArkFileUploadHiddenInputProps extends Omit<
  ArkFileUploadHiddenInputProps,
  "asChild"
> {}

export const LoongArkFileUploadHiddenInput: Component<
  LoongArkFileUploadHiddenInputProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkFileUpload.HiddenInput
      {...props}
      data-scope="file-upload"
      data-part="hidden-input"
    />
  );
}, lkAutomaticFileUploadStyles);

export interface LoongArkFileUploadItemGroupProps extends Omit<
  ArkFileUploadItemGroupProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkFileUploadItemGroup: Component<
  LoongArkFileUploadItemGroupProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkFileUpload.ItemGroup
      {...others}
      data-scope="file-upload"
      data-part="item-group"
    >
      {local.children}
    </ArkFileUpload.ItemGroup>
  );
}, lkAutomaticFileUploadStyles);

export interface LoongArkFileUploadItemProps extends Omit<
  ArkFileUploadItemProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkFileUploadItem: Component<LoongArkFileUploadItemProps> = /*#__PURE__*/ withAutomaticStyles((
  props,
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkFileUpload.Item {...others} data-scope="file-upload" data-part="item">
      {local.children}
    </ArkFileUpload.Item>
  );
}, lkAutomaticFileUploadStyles);

export interface LoongArkFileUploadItemPreviewProps extends Omit<
  ArkFileUploadItemPreviewProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkFileUploadItemPreview: Component<
  LoongArkFileUploadItemPreviewProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkFileUpload.ItemPreview
      {...others}
      data-scope="file-upload"
      data-part="item-preview"
    >
      {local.children}
    </ArkFileUpload.ItemPreview>
  );
}, lkAutomaticFileUploadStyles);

export interface LoongArkFileUploadItemPreviewImageProps extends Omit<
  ArkFileUploadItemPreviewImageProps,
  "asChild"
> {}

export const LoongArkFileUploadItemPreviewImage: Component<
  LoongArkFileUploadItemPreviewImageProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkFileUpload.ItemPreviewImage
      {...props}
      data-scope="file-upload"
      data-part="item-preview-image"
    />
  );
}, lkAutomaticFileUploadStyles);

export interface LoongArkFileUploadItemNameProps extends Omit<
  ArkFileUploadItemNameProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkFileUploadItemName: Component<
  LoongArkFileUploadItemNameProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkFileUpload.ItemName
      {...others}
      data-scope="file-upload"
      data-part="item-name"
    >
      {local.children}
    </ArkFileUpload.ItemName>
  );
}, lkAutomaticFileUploadStyles);

export interface LoongArkFileUploadItemSizeTextProps extends Omit<
  ArkFileUploadItemSizeTextProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkFileUploadItemSizeText: Component<
  LoongArkFileUploadItemSizeTextProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkFileUpload.ItemSizeText
      {...others}
      data-scope="file-upload"
      data-part="item-size-text"
    >
      {local.children}
    </ArkFileUpload.ItemSizeText>
  );
}, lkAutomaticFileUploadStyles);

export interface LoongArkFileUploadItemDeleteTriggerProps extends Omit<
  ArkFileUploadItemDeleteTriggerProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkFileUploadItemDeleteTrigger: Component<
  LoongArkFileUploadItemDeleteTriggerProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkFileUpload.ItemDeleteTrigger
      {...others}
      data-scope="file-upload"
      data-part="item-delete-trigger"
    >
      {local.children}
    </ArkFileUpload.ItemDeleteTrigger>
  );
}, lkAutomaticFileUploadStyles);

export interface LoongArkFileUploadClearTriggerProps extends Omit<
  ArkFileUploadClearTriggerProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkFileUploadClearTrigger: Component<
  LoongArkFileUploadClearTriggerProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkFileUpload.ClearTrigger
      {...others}
      data-scope="file-upload"
      data-part="clear-trigger"
    >
      {local.children}
    </ArkFileUpload.ClearTrigger>
  );
}, lkAutomaticFileUploadStyles);
