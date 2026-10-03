/**
 * File Upload component - React wrapper.
 * Uses Ark UI File Upload with data attributes for styling.
 */
import React, { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { FileUpload } from "@ark-ui/react/file-upload";
import type { FileUploadSize } from "@loongark/primitives";

type ArkFileUploadRootProps = ComponentPropsWithoutRef<typeof FileUpload.Root>;
type ArkFileUploadLabelProps = ComponentPropsWithoutRef<
  typeof FileUpload.Label
>;
type ArkFileUploadDropzoneProps = ComponentPropsWithoutRef<
  typeof FileUpload.Dropzone
>;
type ArkFileUploadTriggerProps = ComponentPropsWithoutRef<
  typeof FileUpload.Trigger
>;
type ArkFileUploadHiddenInputProps = ComponentPropsWithoutRef<
  typeof FileUpload.HiddenInput
>;
type ArkFileUploadItemGroupProps = ComponentPropsWithoutRef<
  typeof FileUpload.ItemGroup
>;
type ArkFileUploadItemProps = ComponentPropsWithoutRef<typeof FileUpload.Item>;
type ArkFileUploadItemPreviewProps = ComponentPropsWithoutRef<
  typeof FileUpload.ItemPreview
>;
type ArkFileUploadItemPreviewImageProps = ComponentPropsWithoutRef<
  typeof FileUpload.ItemPreviewImage
>;
type ArkFileUploadItemNameProps = ComponentPropsWithoutRef<
  typeof FileUpload.ItemName
>;
type ArkFileUploadItemSizeTextProps = ComponentPropsWithoutRef<
  typeof FileUpload.ItemSizeText
>;
type ArkFileUploadItemDeleteTriggerProps = ComponentPropsWithoutRef<
  typeof FileUpload.ItemDeleteTrigger
>;
type ArkFileUploadClearTriggerProps = ComponentPropsWithoutRef<
  typeof FileUpload.ClearTrigger
>;

export interface LoongArkFileUploadRootProps extends Omit<
  ArkFileUploadRootProps,
  "asChild"
> {
  size?: FileUploadSize;
  children?: ReactNode;
}

export interface LoongArkFileUploadLabelProps extends Omit<
  ArkFileUploadLabelProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkFileUploadDropzoneProps extends Omit<
  ArkFileUploadDropzoneProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkFileUploadTriggerProps extends Omit<
  ArkFileUploadTriggerProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkFileUploadHiddenInputProps extends Omit<
  ArkFileUploadHiddenInputProps,
  "asChild"
> {}

export interface LoongArkFileUploadItemGroupProps extends Omit<
  ArkFileUploadItemGroupProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkFileUploadItemProps extends Omit<
  ArkFileUploadItemProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkFileUploadItemPreviewProps extends Omit<
  ArkFileUploadItemPreviewProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkFileUploadItemPreviewImageProps extends Omit<
  ArkFileUploadItemPreviewImageProps,
  "asChild"
> {}

export interface LoongArkFileUploadItemNameProps extends Omit<
  ArkFileUploadItemNameProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkFileUploadItemSizeTextProps extends Omit<
  ArkFileUploadItemSizeTextProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkFileUploadItemDeleteTriggerProps extends Omit<
  ArkFileUploadItemDeleteTriggerProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkFileUploadClearTriggerProps extends Omit<
  ArkFileUploadClearTriggerProps,
  "asChild"
> {
  children?: ReactNode;
}

export const LoongArkFileUploadRoot = forwardRef<
  HTMLDivElement,
  LoongArkFileUploadRootProps
>(({ children, size = "md", disabled = false, ...props }, ref) => {
  return (
    <FileUpload.Root
      {...props}
      ref={ref}
      disabled={disabled}
      data-scope="file-upload"
      data-part="root"
      data-size={size}
      data-disabled={disabled ? "true" : undefined}
    >
      {children}
    </FileUpload.Root>
  );
});

LoongArkFileUploadRoot.displayName = "LoongArkFileUploadRoot";

export const LoongArkFileUploadLabel = forwardRef<
  HTMLLabelElement,
  LoongArkFileUploadLabelProps
>(({ children, ...props }, ref) => {
  return (
    <FileUpload.Label
      {...props}
      ref={ref}
      data-scope="file-upload"
      data-part="label"
    >
      {children}
    </FileUpload.Label>
  );
});

LoongArkFileUploadLabel.displayName = "LoongArkFileUploadLabel";

export const LoongArkFileUploadDropzone = forwardRef<
  HTMLDivElement,
  LoongArkFileUploadDropzoneProps
>(({ children, ...props }, ref) => {
  return (
    <FileUpload.Dropzone
      {...props}
      ref={ref}
      data-scope="file-upload"
      data-part="dropzone"
    >
      {children}
    </FileUpload.Dropzone>
  );
});

LoongArkFileUploadDropzone.displayName = "LoongArkFileUploadDropzone";

export const LoongArkFileUploadTrigger = forwardRef<
  HTMLButtonElement,
  LoongArkFileUploadTriggerProps
>(({ children, ...props }, ref) => {
  return (
    <FileUpload.Trigger
      {...props}
      ref={ref}
      data-scope="file-upload"
      data-part="trigger"
    >
      {children}
    </FileUpload.Trigger>
  );
});

LoongArkFileUploadTrigger.displayName = "LoongArkFileUploadTrigger";

export const LoongArkFileUploadHiddenInput = forwardRef<
  HTMLInputElement,
  LoongArkFileUploadHiddenInputProps
>((props, ref) => {
  return (
    <FileUpload.HiddenInput
      {...props}
      ref={ref}
      data-scope="file-upload"
      data-part="hidden-input"
    />
  );
});

LoongArkFileUploadHiddenInput.displayName = "LoongArkFileUploadHiddenInput";

export const LoongArkFileUploadItemGroup = forwardRef<
  HTMLUListElement,
  LoongArkFileUploadItemGroupProps
>(({ children, ...props }, ref) => {
  return (
    <FileUpload.ItemGroup
      {...props}
      ref={ref}
      data-scope="file-upload"
      data-part="item-group"
    >
      {children}
    </FileUpload.ItemGroup>
  );
});

LoongArkFileUploadItemGroup.displayName = "LoongArkFileUploadItemGroup";

export const LoongArkFileUploadItem = forwardRef<
  HTMLLIElement,
  LoongArkFileUploadItemProps
>(({ children, ...props }, ref) => {
  return (
    <FileUpload.Item
      {...props}
      ref={ref}
      data-scope="file-upload"
      data-part="item"
    >
      {children}
    </FileUpload.Item>
  );
});

LoongArkFileUploadItem.displayName = "LoongArkFileUploadItem";

export const LoongArkFileUploadItemPreview = forwardRef<
  HTMLImageElement,
  LoongArkFileUploadItemPreviewProps
>(({ children, ...props }, ref) => {
  return (
    <FileUpload.ItemPreview
      {...props}
      ref={ref}
      data-scope="file-upload"
      data-part="item-preview"
    >
      {children}
    </FileUpload.ItemPreview>
  );
});

LoongArkFileUploadItemPreview.displayName = "LoongArkFileUploadItemPreview";

export const LoongArkFileUploadItemPreviewImage = forwardRef<
  HTMLImageElement,
  LoongArkFileUploadItemPreviewImageProps
>((props, ref) => {
  return (
    <FileUpload.ItemPreviewImage
      {...props}
      ref={ref}
      data-scope="file-upload"
      data-part="item-preview-image"
    />
  );
});

LoongArkFileUploadItemPreviewImage.displayName =
  "LoongArkFileUploadItemPreviewImage";

export const LoongArkFileUploadItemName = forwardRef<
  HTMLDivElement,
  LoongArkFileUploadItemNameProps
>(({ children, ...props }, ref) => {
  return (
    <FileUpload.ItemName
      {...props}
      ref={ref}
      data-scope="file-upload"
      data-part="item-name"
    >
      {children}
    </FileUpload.ItemName>
  );
});

LoongArkFileUploadItemName.displayName = "LoongArkFileUploadItemName";

export const LoongArkFileUploadItemSizeText = forwardRef<
  HTMLDivElement,
  LoongArkFileUploadItemSizeTextProps
>(({ children, ...props }, ref) => {
  return (
    <FileUpload.ItemSizeText
      {...props}
      ref={ref}
      data-scope="file-upload"
      data-part="item-size-text"
    >
      {children}
    </FileUpload.ItemSizeText>
  );
});

LoongArkFileUploadItemSizeText.displayName = "LoongArkFileUploadItemSizeText";

export const LoongArkFileUploadItemDeleteTrigger = forwardRef<
  HTMLButtonElement,
  LoongArkFileUploadItemDeleteTriggerProps
>(({ children, ...props }, ref) => {
  return (
    <FileUpload.ItemDeleteTrigger
      {...props}
      ref={ref}
      data-scope="file-upload"
      data-part="item-delete-trigger"
    >
      {children}
    </FileUpload.ItemDeleteTrigger>
  );
});

LoongArkFileUploadItemDeleteTrigger.displayName =
  "LoongArkFileUploadItemDeleteTrigger";

export const LoongArkFileUploadClearTrigger = forwardRef<
  HTMLButtonElement,
  LoongArkFileUploadClearTriggerProps
>(({ children, ...props }, ref) => {
  return (
    <FileUpload.ClearTrigger
      {...props}
      ref={ref}
      data-scope="file-upload"
      data-part="clear-trigger"
    >
      {children}
    </FileUpload.ClearTrigger>
  );
});

LoongArkFileUploadClearTrigger.displayName = "LoongArkFileUploadClearTrigger";
