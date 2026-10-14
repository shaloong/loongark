"use client";
import { withAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
import { styles as lkAutomaticFileUploadStyles } from "@shaloong/loongark-primitives/automatic-styles/file-upload";


/**
 * File Upload component - React wrapper.
 * Uses Ark UI File Upload with data attributes for styling.
 */
import React, { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { FileUpload } from "@ark-ui/react/file-upload";
import type { FileUploadSize } from "@shaloong/loongark-primitives";

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

export const LoongArkFileUploadRoot = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticFileUploadStyles);

LoongArkFileUploadRoot.displayName = "LoongArkFileUploadRoot";

export const LoongArkFileUploadLabel = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticFileUploadStyles);

LoongArkFileUploadLabel.displayName = "LoongArkFileUploadLabel";

export const LoongArkFileUploadDropzone = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticFileUploadStyles);

LoongArkFileUploadDropzone.displayName = "LoongArkFileUploadDropzone";

export const LoongArkFileUploadTrigger = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticFileUploadStyles);

LoongArkFileUploadTrigger.displayName = "LoongArkFileUploadTrigger";

export const LoongArkFileUploadHiddenInput = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticFileUploadStyles);

LoongArkFileUploadHiddenInput.displayName = "LoongArkFileUploadHiddenInput";

export const LoongArkFileUploadItemGroup = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticFileUploadStyles);

LoongArkFileUploadItemGroup.displayName = "LoongArkFileUploadItemGroup";

export const LoongArkFileUploadItem = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticFileUploadStyles);

LoongArkFileUploadItem.displayName = "LoongArkFileUploadItem";

export const LoongArkFileUploadItemPreview = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticFileUploadStyles);

LoongArkFileUploadItemPreview.displayName = "LoongArkFileUploadItemPreview";

export const LoongArkFileUploadItemPreviewImage = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticFileUploadStyles);

LoongArkFileUploadItemPreviewImage.displayName =
  "LoongArkFileUploadItemPreviewImage";

export const LoongArkFileUploadItemName = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticFileUploadStyles);

LoongArkFileUploadItemName.displayName = "LoongArkFileUploadItemName";

export const LoongArkFileUploadItemSizeText = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticFileUploadStyles);

LoongArkFileUploadItemSizeText.displayName = "LoongArkFileUploadItemSizeText";

export const LoongArkFileUploadItemDeleteTrigger = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticFileUploadStyles);

LoongArkFileUploadItemDeleteTrigger.displayName =
  "LoongArkFileUploadItemDeleteTrigger";

export const LoongArkFileUploadClearTrigger = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticFileUploadStyles);

LoongArkFileUploadClearTrigger.displayName = "LoongArkFileUploadClearTrigger";
