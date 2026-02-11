declare module "@ark-ui/solid/file-upload" {
  import type { Component, JSX } from "solid-js";

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
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface FileUploadLabelProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface FileUploadDropzoneProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface FileUploadTriggerProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface FileUploadHiddenInputProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface FileUploadItemGroupProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface FileUploadItemProps {
    file?: File;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface FileUploadItemPreviewProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface FileUploadItemPreviewImageProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface FileUploadItemNameProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface FileUploadItemSizeTextProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface FileUploadItemDeleteTriggerProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface FileUploadClearTriggerProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export const FileUpload: {
    Root: Component<FileUploadRootProps>;
    Label: Component<FileUploadLabelProps>;
    Dropzone: Component<FileUploadDropzoneProps>;
    Trigger: Component<FileUploadTriggerProps>;
    HiddenInput: Component<FileUploadHiddenInputProps>;
    ItemGroup: Component<FileUploadItemGroupProps>;
    Item: Component<FileUploadItemProps>;
    ItemPreview: Component<FileUploadItemPreviewProps>;
    ItemPreviewImage: Component<FileUploadItemPreviewImageProps>;
    ItemName: Component<FileUploadItemNameProps>;
    ItemSizeText: Component<FileUploadItemSizeTextProps>;
    ItemDeleteTrigger: Component<FileUploadItemDeleteTriggerProps>;
    ClearTrigger: Component<FileUploadClearTriggerProps>;
  };
}
