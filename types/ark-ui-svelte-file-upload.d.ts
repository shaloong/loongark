declare module "@ark-ui/svelte/file-upload" {
  type SvelteComponent<P = any> = new (...args: any[]) => { $$prop_def: P };

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
    asChild?: boolean;
  }

  export interface FileUploadLabelProps {
    asChild?: boolean;
  }

  export interface FileUploadDropzoneProps {
    asChild?: boolean;
  }

  export interface FileUploadTriggerProps {
    asChild?: boolean;
  }

  export interface FileUploadHiddenInputProps {
    asChild?: boolean;
  }

  export interface FileUploadItemGroupProps {
    asChild?: boolean;
  }

  export interface FileUploadItemProps {
    file?: File;
    asChild?: boolean;
  }

  export interface FileUploadItemPreviewProps {
    asChild?: boolean;
  }

  export interface FileUploadItemPreviewImageProps {
    asChild?: boolean;
  }

  export interface FileUploadItemNameProps {
    asChild?: boolean;
  }

  export interface FileUploadItemSizeTextProps {
    asChild?: boolean;
  }

  export interface FileUploadItemDeleteTriggerProps {
    asChild?: boolean;
  }

  export interface FileUploadClearTriggerProps {
    asChild?: boolean;
  }

  export const FileUpload: {
    Root: SvelteComponent<FileUploadRootProps>;
    Label: SvelteComponent<FileUploadLabelProps>;
    Dropzone: SvelteComponent<FileUploadDropzoneProps>;
    Trigger: SvelteComponent<FileUploadTriggerProps>;
    HiddenInput: SvelteComponent<FileUploadHiddenInputProps>;
    ItemGroup: SvelteComponent<FileUploadItemGroupProps>;
    Item: SvelteComponent<FileUploadItemProps>;
    ItemPreview: SvelteComponent<FileUploadItemPreviewProps>;
    ItemPreviewImage: SvelteComponent<FileUploadItemPreviewImageProps>;
    ItemName: SvelteComponent<FileUploadItemNameProps>;
    ItemSizeText: SvelteComponent<FileUploadItemSizeTextProps>;
    ItemDeleteTrigger: SvelteComponent<FileUploadItemDeleteTriggerProps>;
    ClearTrigger: SvelteComponent<FileUploadClearTriggerProps>;
  };
}
