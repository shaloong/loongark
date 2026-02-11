declare module "@ark-ui/react/file-upload" {
  import React, { type ReactNode } from "react";

  export interface FileUploadRootProps {
    accept?: Record<string, string[]>;
    acceptedFiles?: File[];
    defaultAcceptedFiles?: File[];
    allowDrop?: boolean;
    directory?: boolean;
    disabled?: boolean;
    maxFiles?: number;
    maxFileSize?: number;
    minFileSize?: number;
    name?: string;
    id?: string;
    ids?: any;
    required?: boolean;
    onFileAccept?: (details: any) => void;
    onFileChange?: (details: any) => void;
    onFileReject?: (details: any) => void;
    onFileValidate?: (details: any) => void;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface FileUploadLabelProps {
    ref?: React.Ref<HTMLLabelElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface FileUploadDropzoneProps
    extends React.HTMLAttributes<HTMLDivElement> {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface FileUploadTriggerProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    ref?: React.Ref<HTMLButtonElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface FileUploadHiddenInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    ref?: React.Ref<HTMLInputElement>;
    asChild?: boolean;
  }

  export interface FileUploadItemGroupProps
    extends React.HTMLAttributes<HTMLUListElement> {
    ref?: React.Ref<HTMLUListElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface FileUploadItemProps
    extends React.HTMLAttributes<HTMLLIElement> {
    ref?: React.Ref<HTMLLIElement>;
    file?: File;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface FileUploadItemPreviewProps
    extends React.HTMLAttributes<HTMLDivElement> {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface FileUploadItemPreviewImageProps
    extends React.ImgHTMLAttributes<HTMLImageElement> {
    ref?: React.Ref<HTMLImageElement>;
    asChild?: boolean;
  }

  export interface FileUploadItemNameProps
    extends React.HTMLAttributes<HTMLSpanElement> {
    ref?: React.Ref<HTMLSpanElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface FileUploadItemSizeTextProps
    extends React.HTMLAttributes<HTMLSpanElement> {
    ref?: React.Ref<HTMLSpanElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface FileUploadItemDeleteTriggerProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    ref?: React.Ref<HTMLButtonElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface FileUploadClearTriggerProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    ref?: React.Ref<HTMLButtonElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface FileUploadContextProps {
    children: (context: any) => ReactNode;
  }

  export const FileUploadContext: React.FC<FileUploadContextProps>;
  export const useFileUploadContext: () => any;

  export namespace FileUpload {
    export const Root: React.FC<FileUploadRootProps>;
    export const Label: React.FC<FileUploadLabelProps>;
    export const Dropzone: React.FC<FileUploadDropzoneProps>;
    export const Trigger: React.FC<FileUploadTriggerProps>;
    export const HiddenInput: React.FC<FileUploadHiddenInputProps>;
    export const ItemGroup: React.FC<FileUploadItemGroupProps>;
    export const Item: React.FC<FileUploadItemProps>;
    export const ItemPreview: React.FC<FileUploadItemPreviewProps>;
    export const ItemPreviewImage: React.FC<FileUploadItemPreviewImageProps>;
    export const ItemName: React.FC<FileUploadItemNameProps>;
    export const ItemSizeText: React.FC<FileUploadItemSizeTextProps>;
    export const ItemDeleteTrigger: React.FC<FileUploadItemDeleteTriggerProps>;
    export const ClearTrigger: React.FC<FileUploadClearTriggerProps>;
    export const Context: React.FC<FileUploadContextProps>;
  }
}
